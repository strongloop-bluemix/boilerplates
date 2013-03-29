/**
 * Expose `MyService`.
 */

module.exports = MyService;

/**
 * Module dependencies.
 */
 
var Service = require('asteroid').Service
  , debug = require('debug')('my-service')
  , util = require('util')
  , inherits = util.inherits
  , assert = require('assert');
  
/**
 * Create a new `MyService` with the given `options`.
 *
 * @param {Object} options
 * @return {MyService}
 */

function MyService(config) {
  Service.apply(this, arguments);

  this.config = config;
  
  debug('created with options', options);
}

/**
 * Inherit from `Service`.
 */

inherits(MyService, Service);

/**
 * A simple logging service.
 */
 
MyService.prototype.log = function () {
  console.log.apply(console, arguments);
}