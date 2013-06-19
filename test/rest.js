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
  
  /**
   * Expected Input Tests
   */
  
  describe('Expected Usage', function(){
    
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
    
    describe('POST /weapons', function(){
      it('should create a new weapon', function(done) {
        json('post', '/weapons')
          .send({data: {
            "title": "M1911-2",
            "audibleRange": 52.8,
            "effectiveRange": 50,
            "rounds": 7,
            "fireModes": "Single"
          }})
          .expect(200)
          .end(function (err, res) {
            assert(typeof res.body === 'object');
            assert(res.body.id, 'must have an id');
            done();
          });
      });
    });
  });
  
  describe('Unexpected Usage', function(){
    describe('POST /weapons/:id', function(){
      it('should not crash the server when posting a bad id', function(done) {
        json('post', '/weapons/foobar').send({}).expect(404, done);
      });
    });
  });

});