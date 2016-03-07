const zeroBuffer = require(__dirname + '/zero_buffer');

module.exports = exports = function(req, res, next) {
  try {
    const authString = req.headers.authorization;
    const base64String = authString.split(' ')[1];
    const authBuf = new Buffer(base64String, 'base64');
    const utf8AuthString = authBuf.toString();
    const authArr = utf8AuthString.split(':');
    zeroBuffer(authBuf);
    if (authArr[0].length && authArr[1].length) {
      req.basicHTTP = {
        email: authArr[0],
        password: authArr[1]
      };
      return next();
    }
  } catch (e) {
    console.log(e);
  }
  res.status(401).json({ msg: 'could not authenticat' });
};
