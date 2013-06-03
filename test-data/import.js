/**
 * Run `node import.js` to import the test data into the db.
 */

var weapons = require('./weapons.json');
var asteroid = require('asteroid');
var app = asteroid();

// define a data source
var dataSource = app.dataSource('db', {
  adapter: require('jugglingdb-oracle'),
  host: '127.0.0.1',
  database: 'XE',
  username: 'strongloop',
  password: 'password',
  debug: false
});

dataSource.discoverSchema(null, 'PRODUCT', function (err, schema) {
  var Weapon = app.model('weapon', schema.properties, schema.options);
  Weapon.dataSource('db');
  
  Weapon.destroyAll(function () {
    weapons.forEach(function (obj) {
      obj.name = obj.title;
      delete obj.title;
      delete obj.slot;
      delete obj.source;
      delete obj.damage;
      delete obj.rawDamage;
      if(Array.isArray(obj.fireModes)) obj.fireModes = JSON.stringify(obj.fireModes);
      if(Array.isArray(obj.extras)) obj.extras = JSON.stringify(obj.extras);
      if(Array.isArray(obj.magazines)) obj.magazines = JSON.stringify(obj.magazines);
    
      Weapon.create(obj, function (err, w) {
        if(err) {
          console.log(err);
        } else {
          console.log('added', w.id);
        }
      });
    });
  });
});
