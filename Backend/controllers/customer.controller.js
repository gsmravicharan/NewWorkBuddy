// Customer-specific controllers
async function getDashboard(req, res) {
  return res.json({ message: 'Customer dashboard', user: { id: req.user._id, role: req.user.role } });
}

module.exports = { getDashboard };
