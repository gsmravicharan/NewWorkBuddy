const User = require('../models/User');

async function createUser(data) {
  const user = new User(data);
  await user.save();
  return user;
}

async function findByEmail(email) {
  if (!email) return null;
  return User.findOne({ email: email.toLowerCase().trim() });
}

async function findById(id) {
  return User.findById(id);
}

async function updatePasswordById(id, newPassword) {
  const user = await User.findById(id);
  if (!user) return null;
  user.password = newPassword;
  await user.save();
  return user;
}

async function markVerified(email) {
  return User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
}

module.exports = { createUser, findByEmail, findById, updatePasswordById, markVerified };
