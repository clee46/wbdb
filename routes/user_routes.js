const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const jsonParser = require('body-parser').json();
const User = require(__dirname + '/../models/user');
const Challenge = require(__dirname + '/../models/challenge');
const Favorite = require(__dirname + '/../models/favorite');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const userRouter = module.exports = exports = express.Router();

userRouter.get('/currentuser', jwtAuth, jsonParser, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.json({ username: data.username });
  });
});


// Retrieves all challenges favorited by the user
userRouter.get('/favorites', jwtAuth, jsonParser, (req, res) => {
  var favs = [];  // stores all the challenges favorited by the user

  // find all favorites with the user's ID
  Favorite.find({ userId: req.user._id }, (err, data) => {

    if (err) console.log(err);

    // for each favorite, find the challenge that matches the favorite's challenge Id
    data.forEach((justOne) => {
      Challenge.findOne({ _id: justOne.challengeId }, (err, result) => {
        if (err) return handleDBError(err, res);
        favs.push(result);  // add the challenge to the favorites array
      });
    });

    res.status(200).json(favs); // attach favorites array to the server response
  });
});


// Retrieves all challenges created by the user
// this route is unnecessary if we decide to use the /pending and /approved routes instead
userRouter.get('/mychallenges', jwtAuth, jsonParser, (req, res) => {
  Challenge.find({ _id: req.user._id }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

// Retrieve all challenges created by the user that have not yet been approved by admin
userRouter.get('/pending', jwtAuth, jsonParser, (req, res) => {
  Challenge.find({ _id: req.user._id, isPublished: false }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

// Retrieve all challenges created by the user that have been approved by admin
userRouter.get('/approved', jwtAuth, jsonParser, (req, res) => {
  Challenge.find({ _id: req.user._id, isPublished: true }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
