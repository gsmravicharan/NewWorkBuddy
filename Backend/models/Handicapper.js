const mongoose = require('mongoose');

const handicapperSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  assistanceType: String
});

module.exports = mongoose.model('Handicapper', handicapperSchema);
