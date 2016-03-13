module.exports = exports = function(req, res, next) {
  if (!req.user || !req.user.authentication.isAdmin) {
    return res.status(401).json({ msg: 'Only admins are allows to do this!' });
  }
  next();
};
