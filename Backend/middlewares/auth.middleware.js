const { verifyToken } = require('../utils/jwt');
const userService = require('../services/user.service');

/**
 * JWT authentication middleware.
 * Verifies Bearer token and attaches user to req.user
 */
module.exports = async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    const user = await userService.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    if (!user.isActive) return res.status(403).json({ message: 'User is inactive' });
    req.user = user; // attach full user for downstream handlers
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
