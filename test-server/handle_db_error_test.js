const chai = require('chai');
const expect = chai.expect;
var handleDBError = require(__dirname + '/../lib/handle_db_error');

describe('handleDBError test', () => {
  it('should return server error message', (done) => {
    var res = {
      status: function(statusCode) {
        expect(statusCode).to.equal(500);
        return {
          json: function(obj) {
            expect(obj.msg).to.equal('Server Error');
            done();
          }
        };
      }
    };

    handleDBError('err', res);
  });
});
