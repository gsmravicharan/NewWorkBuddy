const mongoose = require('mongoose');
const User = require('./User');

const WorkerSchema = new mongoose.Schema({
  // Add worker-specific fields here
  skills: { type: [String], default: [] },
});

module.exports = User.discriminator('Worker', WorkerSchema);
