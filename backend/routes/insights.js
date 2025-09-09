const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const insightController = require('../controllers/insight.controller');

router.use(auth);
router.get('/', insightController.getInsights);

module.exports = router;
