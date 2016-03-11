const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const jsonParser = require('body-parser').json();
const Solution = require(__dirname + '/../models/solution');
const Challenge = require(__dirname + '/../models/challenge');
const Hint = require(__dirname + '/../models/hint');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const solutionRouter = module.exports = exports = express.Router();

solutionRouter.get('/solutions', jsonParser, (req, res) => {
  Solution.find({ challengeId: req.body.challengeId }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

solutionRouter.get('/solutions/:id', (req, res) => {
  console.log('Inside Challenges/id route');
  Solution.find({ challengeId: req.params.id, published: true }).exec()
    .then((solutions) => {
      res.status(200).json(solutions);
    })
    .catch((err) => handleDBError(err, res));
});

solutionRouter.post('/solutions', jwtAuth, jsonParser, (req, res) => {
  var newSolution = new Solution(req.body);
  newSolution.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

solutionRouter.put('/solutions/:id', jwtAuth, jsonParser, (req, res) => {
  var newData = req.body;
  delete newData._id;
  Solution.update({ _id: req.params.id }, newData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Updated Solution' });
  });
});

solutionRouter.delete('/solutions/:id', jwtAuth, jsonParser, (req, res) => {
  Solution.remove({ _id: req.params.id }, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Deleted Solution' });
  });
});
