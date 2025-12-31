const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
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

    address: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Customer', customerSchema);
