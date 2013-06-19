/**
 * Force Test Mode
 */

process.env.NODE_ENV = 'test';

/**
 * Utils
 */

request = require('supertest');
app = require('../app');
assert = require('assert');

/**
 * Test Data
 */

testData = {
  weapons: require('../test-data/weapons')
};