const mongoose = require('mongoose');

var hintSchema = new mongoose.Schema({
  hint: String,
  challengeId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  createdOn: String,
  published: { type: Boolean, default: false }
});

module.exports = mongoose.model('Hint', hintSchema);
