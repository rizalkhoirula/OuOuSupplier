const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getProductsByCategory,
} = require("../Controller/CategoryController");

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id/products", getProductsByCategory);

module.exports = router;
