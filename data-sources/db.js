/**
 * Dependencies
 */

var loopback = require('loopback');

// use the memory connector by default
var DB = (process.env.DB = process.env.DB || 'memory');
var config = require('./db.json')[DB];

if(!config) {
  console.log('No config exists for %s. Add it to the db.json file and try again.', DB);
  throw new Error('Could not load config for DB');
}

console.log('Using the %s connector.', DB);
console.log('To specify another connector:')
console.log('  DB=oracle node app');

switch(DB) {
  case 'oracle':
  case 'mongodb':
    var m = 'loopback-connector-' + DB;
    try {
      config.connector = require(m);
    } catch(e) {
      console.log('could not require %s', m);
      console.log('make sure it is listed in package.json');
      console.log('then run');
      console.log('  npm install');
      
      throw e;
    }
  break;
  default:
    config.connector = loopback.Memory;
  break;
}

module.exports = loopback.createDataSource(config);

if(DB === 'memory') {
  // import data
  require('../test-data/import');
}