/**                                                 
 * Module Dependencies                              
 */                                                 
                                                    
var db = require("../data-sources/db");     
var config = require("./location.json");
var loopback = require('loopback');
var GeoPoint = loopback.GeoPoint;
var TaskEmitter = require('sl-task-emitter');
var rest = require("../data-sources/rest-geocode");

/**                                                 
 * location Model                                     
 */                                                 
                                                    
var RentalLocation = module.exports = db.createModel(   
  "location",                                         
  config.properties,                                
  config.options                                    
);                                                  

/**
 * Find nearby locations.
 */

RentalLocation.nearby = function (here, page, max, fn) {
  if(typeof page === 'function') {
    fn = page;
    page = 0;
    max = 0;
  }
  
  if(typeof max === 'function') {
    fn = max;
    max = 0;
  }
  
  var limit = 10;
  page = page || 0;
  max = Number(max || 100000);
  
  RentalLocation.find({
    // find locations near the provided GeoPoint
    where: {geo: {near: here, maxDistance: max}},
    // paging
    skip: limit * page,
    limit: limit
  }, fn);
}

/**
 * Expose nearby as a remote method.
 */

loopback.remoteMethod(
  RentalLocation.nearby,
  {
    accepts: [
      {arg: 'here', type: 'GeoPoint', required: true},
      {arg: 'page', type: 'Number'},
      {arg: 'max', type: 'Number', description: 'max distance in miles'}
    ]
  }
);

RentalLocation.beforeSave = function (next, loc) {
  // geo code the address
  if(!loc.geo) {
    rest.geocode(loc.street, loc.city, loc.zipcode, function (err, res, result) {
      if(result && result[0]) {
        loc.geo = result[0].lng + ',' + result[0].lat;
        next();
      } else {
        next(new Error('could not find location'));
      }
    });
  } else {
    next();
  }
}