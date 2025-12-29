const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    otpHash: { type: String, required: true },
    purpose: { type: String, required: true, enum: ['register', 'forgot_password'] },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create TTL index on expiresAt so documents are removed when the date passes.
// expireAfterSeconds: 0 makes MongoDB expire at the time stored in expiresAt.
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Otp', OtpSchema);
