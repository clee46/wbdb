const mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
  title: String,
  question: String,
  rating: Number,
  difficulty: Number,
  tags: [String],
  language: String,
  createdOn: String,
  author: String,
  userId: mongoose.Schema.Types.ObjectId,
  published: { type: Boolean, default: false }
});

module.exports = mongoose.model('Challenge', challengeSchema);
