const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../Controller/UserController");
const authenticateUser = require('../middleware/authMiddleware');
// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get('/me', authenticateUser, (req, res) => {
  res.json({ user: req.user });
});
// Optional: For test/dev only
router.get("/", getUsers);

module.exports = router;
