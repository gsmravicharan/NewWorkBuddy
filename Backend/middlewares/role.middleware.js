/**
 * Role-based authorization middleware generator.
 * Accepts an array of allowed roles and returns middleware.
 */
module.exports = function allowRoles(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) return next();
    if (allowedRoles.includes(req.user.role)) return next();
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  };
};
