var expect = require('chai').expect;

var User = require('../../models/user');

describe('user', function() {
  it('should be invalid if name is empty', function(done) {
    var u = new User();
    u.validate(function(err) {
      console.log('err.errors[0]='+err.errors.name);
      expect(err.errors.name).to.exist;
      done();
    });
  });


});
