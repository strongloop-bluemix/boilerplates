var asteroid = require('asteroid');
var app = asteroid();
var request = require('request');
// var TaskEmitter = require('sl-task-emitter');

// expose models over rest
app.use(asteroid.rest());

// define a data source
var dataSource = app.dataSource('db', {
  adapter: require('jugglingdb-oracle'),
  host: '127.0.0.1',
  database: 'XE',
  username: 'strongloop',
  password: 'password',
  debug: false
});

dataSource.discoverSchema(null, 'INVENTORY_VIEW', function (err, schema) {
  schema.options.plural = 'inventory';
  var Inventory = app.model('inventory', schema.properties, schema.options);
  Inventory.dataSource('db');
});

dataSource.discoverSchema(null, 'LOCATION', function (err, schema) {
  var RentalLocation = app.model('location', schema.properties, schema.options);
  RentalLocation.nearby = function (lat, long, fn) {
    RentalLocation.all(function (err, locations) {
      var te = new TaskEmitter();
      var result = [];
      
      locations.forEach(function (loc) {
        te.task('geocode', geocode);
      });
      
      te
        .on('geocode', function (loc) {
          result.push(loc);
        })
        .on('error', fn)
        .on('done', function () {
          fn(null, sortedLocations.sort(sortByDistanceTo({lat: lat, long: long})));
        });
    });
  };
  RentalLocation.nearby.shared = true;
  RentalLocation.nearby.accepts = [
    {arg: 'lat', type: 'number', required: true},
    {arg: 'long', type: 'number', required: true}
  ];
  RentalLocation.dataSource('db');
  
  RentalLocation.prototype.distanceTo = function (loc) {
    return 0;
  }
});

function geocode(location, fn) {
  var address = [loc.street, loc.city, loc.zipcode].join(',+');
  var url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + address;

  request(url, {json: true}, function (err, res, body) {
    if(body && body.results) {
      fn(null, body.results[0].geometry.location);
    } else {
      fn(new Error('could not find location'));
    }
  });
}

function sortByDistanceTo(origin) {
  return function (locA, locB) {
    return origin.distanceTo(locA) > origin.distanceTo(locB) ? 1 : -1; 
  }
}

dataSource.discoverSchema(null, 'PRODUCT', function (err, schema) {
  var Weapon = app.model('weapon', schema.properties, schema.options);
  Weapon.dataSource('db');
});

// start the server
app.listen(3000);
