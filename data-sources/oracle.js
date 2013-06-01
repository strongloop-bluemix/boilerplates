/**
 * Dependencies
 */

var asteroid = require('asteroid');

// export the oracle data source
module.exports = asteroid.createDataSource({
  adapter: 'oracle',
  host: '127.0.0.1',
  database: 'XE',
  username: 'strongloop',
  password: 'password',
  debug: false
});

var Location = require('../models/location');
