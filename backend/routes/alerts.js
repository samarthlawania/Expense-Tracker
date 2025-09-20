const express = require('express');
const alertController = require('../controllers/alert.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', alertController.getAlerts);

module.exports = router;