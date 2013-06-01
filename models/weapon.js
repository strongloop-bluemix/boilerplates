/**
 * Dependencies.
 */

var asteroid = require('asteroid');
var oracle = require('../data-sources/oracle');

/**
 * Define a model.
 */

var Weapon = module.exports = asteroid.createModel('weapon');
var discoveredSchema = oracle.discoverSchema(null, 'PRODUCT');