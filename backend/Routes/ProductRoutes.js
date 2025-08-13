const express = require("express");
const router = express.Router();
const upload = require("../utils/uploads");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controller/ProductController");
const reviewRouter = require('./ReviewRoutes');

router.use('/:id/reviews', reviewRouter);

router.post("/", upload.array("photos", 5), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
