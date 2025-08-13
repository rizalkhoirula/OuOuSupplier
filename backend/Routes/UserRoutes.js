const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../Controller/UserController");
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get('/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

// Optional: For test/dev only
router.get("/", getUsers);

module.exports = router;
