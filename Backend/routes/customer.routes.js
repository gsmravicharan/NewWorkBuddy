const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const allowRoles = require('../middlewares/role.middleware');
const roles = require('../config/roles');
const controller = require('../controllers/customer.controller');

// dashboard
router.get(
  '/dashboard',
  authMiddleware,
  allowRoles([roles.CUSTOMER]),
  controller.getDashboard
);

// ✅ ADD THIS POST API (create/update customer profile)
router.post(
  '/profile',
  authMiddleware,
  allowRoles([roles.CUSTOMER]),
  controller.upsertCustomer
);

router.put(
  '/update-all',
  authMiddleware,
  allowRoles([roles.CUSTOMER]),
  controller.updateAllCustomerFields
);

module.exports = router;
