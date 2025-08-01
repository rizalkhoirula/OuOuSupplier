const Review = require('../Models/Review');
const path = require('path');
const supabase = require('../utils/supabaseClient');

// @desc    Create a review with multiple photos
// @route   POST /api/reviews
exports.createReview = async (req, res) => {
  try {
    const { name, description, product } = req.body;
    let photoUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const folder = 'review';
        const ext = path.extname(file.originalname);
        const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;

        const { error } = await supabase
          .storage
          .from(process.env.SUPABASE_BUCKET)
          .upload(filename, file.buffer, {
            contentType: file.mimetype,
          });

        if (error) throw error;

        const { publicUrl } = supabase
          .storage
          .from(process.env.SUPABASE_BUCKET)
          .getPublicUrl(filename).data;

        photoUrls.push(publicUrl);
      }
    }

    const review = new Review({
      name,
      description,
      product,
      photos: photoUrls
    });

    const saved = await review.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all reviews
// @route   GET /api/reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('product');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
