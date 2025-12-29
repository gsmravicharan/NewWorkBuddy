const mongoose = require('mongoose');
const User = require('./User');

const HandicapperSchema = new mongoose.Schema({
  // Add handicapper-specific fields here
  certifications: { type: [String], default: [] },
});

module.exports = User.discriminator('Handicapper', HandicapperSchema);
