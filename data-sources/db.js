/**
 * Dependencies
 */

var asteroid = require('asteroid');

// use the memory connector by default
var DB = (process.env.DB = process.env.DB || 'memory');
var config = require('./db.json')[DB];

console.log('Using the %s connector.', DB);

switch(DB) {
  case 'memory':
    config.connector = asteroid.Memory;
  break;
  case 'oracle':
    config.connector = require('asteroid-connector-oracle');
  break;
  case 'mongodb':
    config.connector = require('asteroid-connector-mongodb');
  break;
}

module.exports = asteroid.createDataSource(config);

if(DB === 'memory') {
  // import data
  require('../test-data/import');
}