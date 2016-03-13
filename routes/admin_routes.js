const express = require('express');
const Challenge = require(__dirname + '/../models/challenge');
const Solution = require(__dirname + '/../models/solution');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const checkAdmin = require(__dirname + '/../lib/check_admin');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

const adminRouter = module.exports = exports = express.Router();

adminRouter.get('/admin/challenges', jwtAuth, checkAdmin, (req, res) => {
  Challenge.find({ published: false }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

adminRouter.get('/admin/solutions', jwtAuth, checkAdmin, (req, res) => {
  Solution.find({ published: false }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

adminRouter.put('/admin/:id', jwtAuth, checkAdmin, (req, res) => {
  Challenge.update({ _id: req.params.id }, { published: true }, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Published Challenge' });
  });
});

adminRouter.delete('/admin/:id', jwtAuth, checkAdmin, (req, res) => {
  Challenge.remove({ _id: req.params.id }, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Rejected Challenge' });
  });
});
