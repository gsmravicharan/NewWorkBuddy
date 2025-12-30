const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  skills: [String],
  location: String
});

module.exports = mongoose.model('Worker', workerSchema);
