const mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
  challengeId: mongoose.Schema.Type.ObjectId,
  userId: mongoose.Schema.Type.ObjectId
});

module.exports = mongoose.model('Favorite', favoriteSchema);
