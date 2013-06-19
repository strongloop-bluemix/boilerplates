/**
 * Dependencies
 */

var asteroid = require('asteroid');
var db;

if(process.env.NODE_ENV === 'test') {
  console.log('-----Using Memory Connector-----');
  
  // use memory adapter
  db = asteroid.createDataSource({
    connector: require('asteroid').Memory
  });
  
  // import data
  require('../test-data/import');
} else {
  // export the oracle data source
  db = asteroid.createDataSource({
    connector: require('jugglingdb-oracle'),
    host: '127.0.0.1',
    database: 'XE',
    username: 'blackpool',
    password: 'password',
    debug: false
  });
}

module.exports = db;
