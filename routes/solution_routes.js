const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const jsonParser = require('body-parser').json();
const Solution = require(__dirname + '/../models/solution');
const Challenge = require(__dirname + '/../models/challenge');
const Hint = require(__dirname + '/../models/hint');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const solutionRouter = module.exports = exports = express.Router();

// future goal: threshold get request
solutionRouter.get('/solutions', jsonParser, (req, res) => {
  Solution.find({ challengeId: req.body.challengeId }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

// solutionRouter.get('/solutions/:id', (req, res) => {
//   Solution.find({ challengeId: req.params.id }, (err, data) => {
//     if (err) return handleDBError(err, res);
//     res.status(200).json(data);
//   });
// });

solutionRouter.get('/solutions/:id', (req, res) => {
  console.log('Inside Challenges/id route');
  Challenge.findOne({ _id: req.params.id}).exec()
    .then((challenge) => {
      const challengeId = challenge._id;
      const solutionProm = Solution.find({ challengeId }).exec();
      const hintProm = Hint.find({ challengeId }).exec();
      // const tagProm = Tag.find({ challengeId }).exec();

      return Promise.all([solutionProm, hintProm])
        .then((resolutions) => {
          const solutions = resolutions[0];
          const hints = resolutions[1];
          // const tags = resolutions[2];
          res.status(200).json(Object.assign(challenge.toObject(),
            { solutions, hints }));
        });
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

// Add Middleware to check admin privileges

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
