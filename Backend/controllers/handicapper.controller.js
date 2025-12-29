// Handicapper-specific controllers
async function getDashboard(req, res) {
  return res.json({ message: 'Handicapper dashboard', user: { id: req.user._id, role: req.user.role } });
}

module.exports = { getDashboard };
