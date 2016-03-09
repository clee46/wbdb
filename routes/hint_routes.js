const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const jsonParser = require('body-parser').json();
const Hint = require(__dirname + '/../models/hint');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const hintRouter = module.exports = exports = express.Router();

// future goal: threshold get request
hintRouter.get('/hints', (req, res) => {
  Hint.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

hintRouter.get('/hints/:id', (req, res) => {
  Hint.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

hintRouter.post('/hints', jwtAuth, jsonParser, (req, res) => {
  var newHint = new Hint(req.body);
  newHint.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

// Add Middleware to check admin privileges

hintRouter.put('/hints/:id', jwtAuth, jsonParser, (req, res) => {
  var newData = req.body;
  delete newData._id;
  Hint.update({ _id: req.params.id }, newData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Updated Hint' });
  });
});

hintRouter.delete('/hints/:id', jwtAuth, jsonParser, (req, res) => {
  Hint.remove({ _id: req.params.id }, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Deleted Hint' });
  });
});
