const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const jsonParser = require('body-parser').json();
const Tag = require(__dirname + '/../models/tag');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const tagRouter = module.exports = exports = express.Router();

tagRouter.get('/hints', (req, res) => {
  Tag.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

tagRouter.get('/hints/:id', (req, res) => {
  Tag.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

tagRouter.post('/tags', jwtAuth, jsonParser, (req, res) => {
  var newTag = new Tag(req.body);
  newTag.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

tagRouter.put('/tags/:id', jwtAuth, jsonParser, (req, res) => {
  var newData = req.body;
  delete newData._id;
  Tag.update({ _id: req.params.id }, newData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Updated Tag' });
  });
});

tagRouter.delete('/tags/:id', jwtAuth, jsonParser, (req, res) => {
  Tag.remove({ _id: req.params.id }, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Deleted Tag' });
  });
});
