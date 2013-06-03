var asteroid = require('asteroid');
var app = asteroid();
var request = require('request');
var TaskEmitter = require('sl-task-emitter');

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
        te.task('geocode', geocode, loc);
      });
       
      te
        .on('geocode', function (loc) {
          result.push(loc);
        })
        .on('error', fn)
        .on('done', function () {
          fn(null, result.sort(sortByDistanceTo(lat, long)));
        });
    });
  };
  RentalLocation.nearby.shared = true;
  RentalLocation.nearby.accepts = [
    {arg: 'lat', type: 'number', required: true},
    {arg: 'long', type: 'number', required: true}
  ];
  RentalLocation.dataSource('db');
  
  RentalLocation.prototype.distanceTo = function (lat, long) {
    var xs = 0;
    var ys = 0;
    xs = this.lat - lat;
    xs = xs * xs;
    ys = this.long - long;
    ys = ys * ys;
    
    return Math.sqrt( xs + ys );
  }
});

dataSource.discoverSchema(null, 'PRODUCT', function (err, schema) {
  var Weapon = app.model('weapon', schema.properties, schema.options);
  Weapon.dataSource('db');
});

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

// start the server
app.listen(3000);
