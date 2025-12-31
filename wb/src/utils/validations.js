export const isValidEmail = (email) => {
  if (!email) return false;
  return /\S+@\S+\.\S+/.test(String(email).toLowerCase());
};

export const isValidPassword = (pw, { minLength = 6 } = {}) => {
  if (!pw) return false;
  return String(pw).length >= minLength;
};

export const isPhoneNumber = (phone) => {
  if (!phone) return false;
  return /^\+?\d{7,15}$/.test(String(phone));
};

export default {
  isValidEmail,
  isValidPassword,
  isPhoneNumber,
};
