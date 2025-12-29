const nodemailer = require('nodemailer');

// Create reusable transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(to, otp, expiryMinutes, purpose) {
  const subject = `Your ${purpose === 'register' ? 'registration' : 'password reset'} OTP`;
  const text = `Your one-time code is: ${otp}\nIt will expire in ${expiryMinutes} minutes.\n\nIf you did not request this, please ignore this email.`;
  const html = `<p>Your one-time code is: <strong>${otp}</strong></p><p>It will expire in <strong>${expiryMinutes} minutes</strong>.</p><p>If you did not request this, please ignore this email.</p>`;

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
  return info;
}

module.exports = { sendOtpEmail };
