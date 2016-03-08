module.exports = exports = function(req, res, next) {
  // check if user's isAdmin flag is true
  // if not, return status 401 not authorized
  if (!req.user || !req.user.authentication.isAdmin) {
    return res.status(401).json({ msg: 'Only admins are allows to do this!' });
  }
  next();
};
