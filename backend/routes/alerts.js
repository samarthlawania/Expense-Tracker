const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const alertController = require('../controllers/alert.controller');

router.use(auth);
router.get('/', alertController.getAlerts);

module.exports = router;
