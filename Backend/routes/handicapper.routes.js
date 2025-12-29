const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const allowRoles = require('../middlewares/role.middleware');
const roles = require('../config/roles');
const controller = require('../controllers/handicapper.controller');

router.get('/dashboard', authMiddleware, allowRoles([roles.HANDICAPPER]), controller.getDashboard);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middlewares/auth.middleware');
// const role = require('../middlewares/role.middleware');
// const rolesConst = require('../config/roles');
// const controller = require('../controllers/handicapper.controller');

// router.get('/dashboard', authMiddleware, role([rolesConst.HANDICAPPER]), controller.getDashboard);

// module.exports = router;
