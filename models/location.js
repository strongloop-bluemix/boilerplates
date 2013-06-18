/**                                                 
 * Module Dependencies                              
 */                                                 
                                                    
var oracle = require("../data-sources/oracle");     
var config = require("./location.json");
var asteroid = require('asteroid');
var TaskEmitter = require('sl-task-emitter');
var request = require('request');        
                                                    
/**                                                 
 * location Model                                     
 */                                                 
                                                    
var RentalLocation = module.exports = oracle.createModel(   
  "location",                                         
  config.properties,                                
  config.options                                    
);                                                  

/**
 * Find nearby locations.
 */

RentalLocation.nearby = function (lat, long, fn) {
  RentalLocation.all(function (err, locations) {
    var te = new TaskEmitter();
    var result = [];
     
    te
      .on('error', fn)
      .on('geocode', function (loc) {
        result.push(loc);
      })
      .on('done', function () {
        fn(null, result.sort(sortByDistanceTo(lat, long)));
      });
      
    locations.forEach(function (loc) {
      te.task('geocode', geocode, loc);
    });
  });
}

/**
 * Expose nearby as a remote method.
 */

asteroid.remoteMethod(
  RentalLocation.nearby,
  {
    accepts: [
      {arg: 'lat', type: 'number', required: true},
      {arg: 'long', type: 'number', required: true}
    ]
  }
);

RentalLocation.prototype.distanceTo = function (lat, long) {
  var xs = 0;
  var ys = 0;
  xs = this.lat - lat;
  xs = xs * xs;
  ys = this.long - long;
  ys = ys * ys;
  
  return Math.sqrt( xs + ys );
}

function geocode(loc, fn) {
  var address = [loc.street, loc.city, loc.zipcode].join(',+');
  var url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + address;

  request(url, {json: true}, function (err, res, body) {
    if(body && body.results) {
      var geo = body.results[0].geometry.location;
      
      loc.lat = geo.lat;
      loc.long = geo.lng;
      
      fn(null);
    } else {
      fn(new Error('could not find location'));
    }
  });
}

function sortByDistanceTo(lat, long) {
  return function (locA, locB) {
    return locA.distanceTo(lat, long) > locB.distanceTo(lat, long) ? 1 : -1; 
  }
}