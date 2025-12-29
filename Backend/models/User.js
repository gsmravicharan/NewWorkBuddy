const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const roles = require('../config/roles');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: [roles.AUTH, roles.CUSTOMER, roles.WORKER, roles.HANDICAPPER], default: roles.AUTH },
      isActive: { type: Boolean, default: true },
      isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, discriminatorKey: 'kind' }
);

// Hash password before saving if modified
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Compare password helper
UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', UserSchema);
