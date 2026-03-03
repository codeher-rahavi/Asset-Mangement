const User = require("../models/User");

exports.checkEmailAvailability = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Regex Validation (Standard Email Pattern)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 2. Efficient Index Check using .exists()
    // Among 20k users, this hits the IXSCAN (Index Scan) and stops immediately
    const userExists = await User.exists({ email }).collation({ locale: 'en', strength: 2 });

    if (userExists) {
      return res.status(409).json({ available: false, message: "Email already registered" });
    }

    res.status(200).json({ available: true, message: "Email is available" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};