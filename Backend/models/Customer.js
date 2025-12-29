const mongoose = require('mongoose');
const User = require('./User');

const CustomerSchema = new mongoose.Schema({
  // Add customer-specific fields here
  preferences: { type: Object, default: {} },
});

module.exports = User.discriminator('Customer', CustomerSchema);
