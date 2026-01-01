const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const allowRoles = require('../middlewares/role.middleware');
const roles = require('../config/roles');
const controller = require('../controllers/handicapper.controller');

// DASHBOARD
router.get(
  '/dashboard',
  authMiddleware,
  allowRoles([roles.HANDICAPPER]),
  controller.getDashboard
);

// CREATE / UPDATE HANDICAPPER PROFILE (NO fullName)
router.post(
  '/profile',
  authMiddleware,
  allowRoles([roles.HANDICAPPER]),
  controller.upsertHandicapper
);

// UPDATE ALL HANDICAPPER FIELDS
router.put(
  '/update-all',
  authMiddleware,
  allowRoles([roles.HANDICAPPER]),
  controller.updateAllHandicapperFields
);

// get handicapper details
router.get(
  '/details',
  authMiddleware,
  allowRoles([roles.HANDICAPPER]),
  controller.getHandicapperDetails
);


module.exports = router;
