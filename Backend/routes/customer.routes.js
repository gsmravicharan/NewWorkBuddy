const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const allowRoles = require('../middlewares/role.middleware');
const roles = require('../config/roles');
const controller = require('../controllers/customer.controller');

router.get('/dashboard', authMiddleware, allowRoles([roles.CUSTOMER]), controller.getDashboard);

module.exports = router;
