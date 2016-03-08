const mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
  challengeId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Favorite', favoriteSchema);
