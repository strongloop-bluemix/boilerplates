/**
 * Run `node import.js` to import the test data into the db.
 */

var weapons = require('./weapons.json');
var asteroid = require('asteroid');
var app = asteroid();
var db = require('../data-sources/db');
var Weapon = require('../models/weapon');

var i = 1;

Weapon.destroyAll(function () {
  weapons.forEach(function (obj) {
    obj.name = obj.title;
    delete obj.title;
    delete obj.slot;
    delete obj.source;
    delete obj.damage;
    delete obj.rawDamage;
    obj.id = i++;
    
    if(Array.isArray(obj.audibleRange)) obj.audibleRange = obj.audibleRange[0];
    if(Array.isArray(obj.rounds)) obj.rounds = obj.rounds[0];
    if(Array.isArray(obj.fireModes)) obj.fireModes = JSON.stringify(obj.fireModes);
    if(Array.isArray(obj.extras)) obj.extras = JSON.stringify(obj.extras);
    if(Array.isArray(obj.magazines)) obj.magazines = JSON.stringify(obj.magazines);
  
    Weapon.create(obj, function (err, w) {
      if(err) {
        console.log(err, w);
      } else {
        console.log('added', w.id);
      }
    });
  });
});
