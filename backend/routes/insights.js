const express = require('express');
const insightController = require('../controllers/insight.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', insightController.getInsights);

module.exports = router;