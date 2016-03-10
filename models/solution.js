const mongoose = require('mongoose');

var solutionSchema = new mongoose.Schema({
  solution: String,
  challengeId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  author: String,
  published: { type: Boolean, default: false }
});

module.exports = mongoose.model('Solution', solutionSchema);
