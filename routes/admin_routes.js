const express = require('express');
const User = require(__dirname + '/../models/user');
const Challenge = require(__dirname + '/../models/challenge');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const saveUserDB = require(__dirname + '/../lib/save_new_user');
const emailValidation = require(__dirname + '/../lib/email_validation.js');

var adminRouter = module.exports = exports = express.Router();

// checkAdmin middleware determines if user has admin privileges
adminRouter.get('/queue', checkAdmin, (req, res) => {
  // find challenges with isPublished = false;
  // returns data, which is an array of all database challenges not yet published
  Challenge.find({ isPublished: false }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

// Publish submitted challenge from the queue
// This route will only be called with req.body containing { isPublished: true }
adminRouter.put('/queue/:id', checkAdmin, (req, res) => {
  var newData = req.body;
  delete newData._id;
  Challenge.update({ _id: req.params.id }, newData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Published Challenge' });
  });
});


// Delete submitted challenge from the queue (i.e. reject it)
adminRouter.delete('/queue/:id', checkAdmin, (req, res) => {
  Challenge.remove({ _id: req.params.id }, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Rejected Challenge' });
  });
});
