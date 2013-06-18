/**
 * App Dependencies.
 */

var asteroid = require('asteroid')
  , app = module.exports = asteroid()
  , fs = require('fs')
  , path = require('path')
  , request = require('request')
  , TaskEmitter = require('sl-task-emitter');

// expose a rest api
app.use(asteroid.rest());

// require models
fs
  .readdirSync('./models')
  .filter(function (m) {
    return path.extname(m) === '.js';
  })
  .forEach(function (m) {
    // expose model over rest
    app.model(require('./models/' + m));
  });

// start the server
app.listen(3000);
