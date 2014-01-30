/**
 * Run `node import.js` to import the test data into the db.
 */

var db = require('../data-sources/db');
var cars = require('./cars.json');
var customers = require('./customers.json');
var inventory = require('./inventory.json');
var locations = require('./locations.json');
var loopback = require('loopback');
var Inventory = require('../models/inventory');
var Location = require('../models/location');
var Customer = require('../models/customer');
var Car = require('../models/car');
var TaskEmitter = require('strong-task-emitter');

var ids = {
  location: 1,
  car: 1,
  inventory: 1,
  customer: 1
};

var importer = module.exports = new TaskEmitter();
importer.on('error', function (err) {
  console.error('error', err);
});

db.autoupdate(function () {
  Location.destroyAll(function (err) {
    if(err) {
      console.error('Could not destroy locations.');
      throw err;
    }

    Car.destroyAll(function (err) {
      if(err) {
        console.error('Could not destroy cars (PRODUCT).');
        throw err;
      }
      
      cars.forEach(function (car) {
        car.id = ids.car++;
        delete car.dealerId;
        importer.task(Car, 'create', car);
      });
      
      locations.forEach(function (loc) {
        loc.id = ids.location++;
        importer.task(Location, 'create', loc);
      });
    });
    
    Inventory.destroyAll(function (err) {
      if(err) {
        console.error('Could not destroy inventory.');
        throw err;
      }
      
      inventory.forEach(function (inv) {
        inv.id = ids.inventory++;
        importer.task(Inventory, 'create', inv);
      });
    });
    
    
    
    Customer.destroyAll(function (err) {
      if(err) {
        console.error('Could not destroy customers.');
        throw err;
      }
      
      customers.forEach(function (obj) {
        obj.id = ids.customer++;
        
        importer.task(Customer, 'create', obj);
      });
    });
   
  });
});
