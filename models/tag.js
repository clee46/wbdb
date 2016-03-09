const mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
  tag: String,
  challengeId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  published: { type: Boolean, default: false }
});

module.exports = mongoose.model('Tag', tagSchema);
