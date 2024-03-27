const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');
const { auth } = require('../middleware/authMiddleware');

router.post('/create', auth, trackingController.create);

module.exports = router;
