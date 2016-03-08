const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const jsonParser = require('body-parser').json();
const Challenge = require(__dirname + '/../models/challenge');
const Favorite = require(__dirname + '/../models/favorite');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const favoriteRouter = module.exports = exports = express.Router();

// Retrieves all challenges favorited by the user
favoriteRouter.get('/favorites', jwtAuth, jsonParser, (req, res) => {
  var favs = [];

  // find all favorites with the user's ID
  Favorite.find({ userId: req.user._id }, (err, data) => {

    if (err) console.log(err);

    // for each fav, find the challenge that matches the favorite's challenge Id
    data.forEach((justOne) => {
      Challenge.findOne({ _id: justOne.challengeId }, (err, result) => {
        if (err) return handleDBError(err, res);
        favs.push(result);
      });
    });

    res.status(200).json(favs);
  });
});

favoriteRouter.post('/favorites', jwtAuth, jsonParser, (req, res) => {
  var newFavorite = new Favorite(req.body);
  newFavorite.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

favoriteRouter.delete('/favorites/:id', jwtAuth, jsonParser, (req, res) => {
  Favorite.remove({ challengeId: req.params.id }, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'Successfully Deleted Challenge' });
  });
});
