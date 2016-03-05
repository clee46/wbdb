const mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
  title: String,
  question: String,
  solutions: [String],
  hints: [String],
  tags: [String],
  rating: Number,
  difficulty: Number,
  language: String,
  userId: mongoose.Schema.Type.ObjectId
});

module.exports = mongoose.model('Challenge', challengeSchema);
