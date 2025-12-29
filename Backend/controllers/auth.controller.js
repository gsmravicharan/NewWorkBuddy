const userService = require('../services/user.service');
const otpService = require('../services/otp.service');
const { sendOtpEmail } = require('../utils/email');
const { signToken } = require('../utils/jwt');

const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '10', 10);

/**
 * Registers a user of any supported role.
 * Body: { name, email, password, role }
 */

// NOTE: Registration now uses email OTP verification.
// Clients should call `/register/send-otp` to receive an OTP, then call
// `/register/verify-otp` with the OTP and desired user data to complete registration.

async function register(req, res) {
  return res.status(400).json({ message: 'Direct registration disabled. Use /register/send-otp and /register/verify-otp' });
}

// Send registration OTP
async function sendRegisterOtp(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const existing = await userService.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    try {
      const { otp, expiresAt } = await otpService.generateOtp(email, 'register');
      // Send email (do not include OTP in API response)
      await sendOtpEmail(email, otp, OTP_EXPIRY_MINUTES, 'register');
      return res.json({ message: 'OTP sent to email', expiresAt });
    } catch (err) {
      if (err && err.status === 429) return res.status(429).json({ message: err.message });
      throw err;
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// Verify registration OTP and create user
async function verifyRegisterOtp(req, res) {
  try {
    const { name, email, password, role, otp } = req.body;
    if (!name || !email || !password || !otp) return res.status(400).json({ message: 'Missing required fields' });
    const existing = await userService.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const verified = await otpService.verifyOtp(email, 'register', otp);
    if (!verified.success) return res.status(400).json({ message: verified.message });

    // Create user and mark verified
    const user = await userService.createUser({ name, email, password, role, isVerified: true });
    const token = signToken({ id: user._id, role: user.role });
    return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}

/**
 * Login and return JWT.
 * Body: { email, password }
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await userService.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await user.comparePassword(password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = signToken({ id: user._id, role: user.role });
    return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
}



function me(req, res) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const user = req.user;
  return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

// Forgot password: send OTP if email exists
async function sendForgotPasswordOtp(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const user = await userService.findByEmail(email);
    if (!user) {
      // Do not reveal whether the email exists
      return res.status(200).json({ message: 'If the email exists, an OTP has been sent' });
    }

    try {
      const { otp, expiresAt } = await otpService.generateOtp(email, 'forgot_password');
      await sendOtpEmail(email, otp, OTP_EXPIRY_MINUTES, 'forgot_password');
      return res.json({ message: 'OTP sent to email', expiresAt });
    } catch (err) {
      // Respect rate-limit errors from the service
      if (err && err.status === 429) return res.status(429).json({ message: err.message });
      throw err;
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ message: 'Missing required fields' });
    const user = await userService.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid request' });

    const verified = await otpService.verifyOtp(email, 'forgot_password', otp);
    if (!verified.success) return res.status(400).json({ message: verified.message });

    // Update password (pre-save hook will hash it)
    await userService.updatePasswordById(user._id, newPassword);
    return res.json({ message: 'Password updated' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to reset password', error: err.message });
  }
}

module.exports = { register, sendRegisterOtp, verifyRegisterOtp, login, me, sendForgotPasswordOtp, verifyForgotPasswordOtp };
