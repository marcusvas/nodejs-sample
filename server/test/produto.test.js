var superagent = require('superagent')
var expect = require('expect.js')


describe('homepage', function(){
  it('should respond to GET',function(done){
    superagent
      .get('https://ecommerce-marcusvas.c9.io')
      .end(function(res){
        expect(res.status).to.equal(200);
        done();
    })
  })
});