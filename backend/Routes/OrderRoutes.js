const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders } = require('../Controller/OrderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);

module.exports = router;
