var asteroid = require('asteroid');
var app = asteroid();

// expose models over rest
app.use(asteroid.rest());

// define a data source
app.dataSource('db', {adapter: 'memory'});

// define models
var RentalLocation = app.model('location', {
  address: String,
  zip: Number,
  city: String,
  state: String,
  name: String
});

// attach to the db DataSource
RentalLocation.dataSource('db');

var Weapon = app.model('weapon', {
  name: String,
  product: Number,
  audibleRange: Number,
  effectiveRange: Number,
  rounds: Number,
  extras: String,
  fireModes: String
});

Weapon.nearby = function (lat, long, fn) {
  // TODO ~ replace this with geo lookup
  Weapon.all(fn);
};
Weapon.nearby.shared = true;
Weapon.nearby.accepts = [
  {arg: 'lat', type: 'number', required: true},
  {arg: 'long', type: 'number', required: true}
];

// attach to the db DataSource
Weapon.dataSource('db');

// relationships
RentalLocation.hasMany(Weapon);

Weapon.destroyAll();
RentalLocation.destroyAll();

// create test data
RentalLocation.create({
  address: '360 El Camino Real',
  zip: 94066,
  city: 'San Mateo',
  state: 'CA',
  name: 'Peninsula Guns and Tactical'
}, function (err, loc) {
  if(err) throw err;
  
  loc.weapons.create({
    name: 'DMR',
    audibleRange: 180,
    effectiveRange: 800,
    rounds: 20,
    extras: 'Scope',
    fireModes: 'Single'
  });

  loc.weapons.create({
    name: 'G36C-SD',
    audibleRange: 10,
    effectiveRange: 800,
    rounds: 30,
    extras: 'Aimpoint sight',
    fireModes: 'Single, Burst, Full auto'
  });
});

// start the server
app.listen(3000);