const Otp = require('../models/otp.model');
const bcrypt = require('bcryptjs');

const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '10', 10);
const MIN_SECONDS_BETWEEN_OTPS = 60; // basic rate-limit per email+purpose
const MAX_ATTEMPTS = 5;

function generateNumericOtp(length = 6) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

// Normalize email for consistent storage and queries
function normalizeEmail(email) {
  if (!email) return '';
  return String(email).toLowerCase().trim();
}

async function generateOtp(email, purpose) {
  const normalizedEmail = normalizeEmail(email);

  // Basic rate limiting per (email, purpose): prevent frequent sends
  const recent = await Otp.findOne({ email: normalizedEmail, purpose }).sort({ createdAt: -1 });
  if (recent) {
    const secondsSince = (Date.now() - new Date(recent.createdAt).getTime()) / 1000;
    if (secondsSince < MIN_SECONDS_BETWEEN_OTPS) {
      const err = new Error('OTP requests are too frequent. Please wait before requesting another OTP.');
      err.status = 429;
      throw err;
    }
  }

  const plain = generateNumericOtp(6);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plain, salt);

  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  // Save hashed OTP; plain OTP is returned to caller for sending via email only
  await Otp.create({ email: normalizedEmail, otpHash: hash, purpose, expiresAt });
  return { otp: plain, expiresAt };
}

async function verifyOtp(email, purpose, otp) {
  const normalizedEmail = normalizeEmail(email);

  // Always verify the most recent OTP for this email+purpose
  const record = await Otp.findOne({ email: normalizedEmail, purpose }).sort({ createdAt: -1 });
  if (!record) {
    return { success: false, message: 'OTP not found' };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    // invalidate all and inform the caller
    await Otp.deleteMany({ email: normalizedEmail, purpose });
    return { success: false, message: 'OTP invalidated due to too many attempts' };
  }

  if (record.expiresAt < new Date()) {
    // expired — remove related records
    await Otp.deleteMany({ email: normalizedEmail, purpose });
    return { success: false, message: 'OTP expired' };
  }

  const valid = await bcrypt.compare(String(otp), record.otpHash);
  if (!valid) {
    record.attempts = (record.attempts || 0) + 1;
    await record.save();
    return { success: false, message: 'Invalid OTP' };
  }

  // OTP valid: remove all matching OTPs for this email & purpose (one-time use)
  await Otp.deleteMany({ email: normalizedEmail, purpose });
  return { success: true };
}

async function deleteOtps(email, purpose) {
  const normalizedEmail = normalizeEmail(email);
  return Otp.deleteMany({ email: normalizedEmail, purpose });
}

module.exports = { generateOtp, verifyOtp, deleteOtps };
