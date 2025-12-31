const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    phoneNumber: {
      type: String,
      trim: true
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      lowercase: true
    },

    skills: {
      type: [String],
      default: []
    },

    location: {
      type: String,
      trim: true
    },
    totalRequests: {
      type: Number,
      trim: true
    },
    ongoingRequests: {
      type: Number,
      trim: true
    },
    completedRequests: {
      type: Number,
      trim: true
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('Worker', workerSchema);
