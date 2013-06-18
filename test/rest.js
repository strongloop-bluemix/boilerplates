/**
 * REST API Tests
 */

function json(verb, url) {
  return request(app)
  [verb](url)
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .expect('Content-Type', /json/)
}

describe('REST', function(){
  this.timeout(10000);
  
  describe('GET /weapons', function(){
    it('should return a list of all weapons', function(done) {
      json('get', '/weapons')
        .expect(200)
        .end(function (err, res) {
          assert(Array.isArray(res.body));
          assert.equal(res.body.length, testData.weapons.length);

          done();
        });
    });
  });
});