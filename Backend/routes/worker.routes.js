const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const allowRoles = require('../middlewares/role.middleware');
const roles = require('../config/roles');
const controller = require('../controllers/worker.controller');

router.get('/dashboard', authMiddleware, allowRoles([roles.WORKER]), controller.getDashboard);

router.post(
  '/profile',
  authMiddleware,
  allowRoles([roles.WORKER]),
  controller.upsertWorker
);

router.put(
  '/update-all',
  authMiddleware,
  allowRoles([roles.WORKER]),
  controller.updateAllWorkerFields
);

module.exports = router;
