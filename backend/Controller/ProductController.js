const Product = require('../Models/Product');
const Review = require('../Models/Review');
const supabase = require('../utils/supabaseClient');
const path = require('path');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, spec, color, category } = req.body;
    let photoUrls = [];

    // Upload semua file ke Supabase
    for (const file of req.files) {
      const folder = 'product';
      const ext = path.extname(file.originalname);
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
      const { data, error } = await supabase
        .storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(filename, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;

      // Ambil public URL
      const { publicUrl } = supabase
        .storage
        .from(process.env.SUPABASE_BUCKET)
        .getPublicUrl(filename).data;

      photoUrls.push(publicUrl);
    }

    const product = new Product({
      name,
      price,
      description,
      spec,
      color,
      category,
      photos: photoUrls,
    });

    const saved = await product.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductWithReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    const reviews = await Review.find({ product: product._id });
    res.json({ product, reviews });
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
};
