const User = require("../models/User.model");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error("ERROR 👉", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
