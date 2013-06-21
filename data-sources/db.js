/**
 * Dependencies
 */

var asteroid = require('asteroid');

if(process.env.NODE_ENV === 'test') {
  console.log('-----Using Memory Connector-----');
  
  // use memory adapter
  module.exports = asteroid.createDataSource({
    connector: require('asteroid').Memory
  });

  // import data
  require('../test-data/import');
} else {
  // export the oracle data source
  module.exports = asteroid.createDataSource({
    connector: require('asteroid-connector-oracle'),
    host: '127.0.0.1',
    database: 'XE',
    username: 'blackpool',
    password: 'password',
    debug: false
  });
}
