const mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
  title: String,
  question: String,
  rating: Number,
  difficulty: Number,
  language: String,
  createdOn: String,
  userId: mongoose.Schema.Types.ObjectId,
  published: { type: Boolean, default: false }
});

module.exports = mongoose.model('Challenge', challengeSchema);
