const express = require('express');
const router = express.Router();
const { initiatePayment } = require('../Controller/PaymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/initiate').post(protect, initiatePayment);

module.exports = router;