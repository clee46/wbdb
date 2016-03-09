const chai = require('chai');
const expect = chai.expect;
var zeroBuffer = require(__dirname + '/../lib/zero_buffer');

describe('Zeror Buffer Test', () => {
  it('should set the input buffer to be zero', () => {
    var buff = new Buffer([3, 6, 0, 7, 8]);
    var zerobuff = new Buffer([0, 0, 0, 0, 0]);
    expect(zeroBuffer(buff).equals(zerobuff)).to.eql(true);
  });
});
