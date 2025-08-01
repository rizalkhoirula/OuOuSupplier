// routes/ReviewRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/uploads');
const {
  createReview,
  getAllReviews,
} = require('../Controller/ReviewController');

router.post('/', upload.array('photos',5), createReview); // multiple photos
router.get('/', getAllReviews);

module.exports = router;
