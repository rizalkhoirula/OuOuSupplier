const express = require("express");
const router = express.Router();
const upload = require("../utils/uploads");
const {
  createProduct,
  getAllProducts,
  getProductWithReviews,
} = require("../Controller/ProductController");

router.post("/", upload.array("photos", 5), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductWithReviews);

module.exports = router;
