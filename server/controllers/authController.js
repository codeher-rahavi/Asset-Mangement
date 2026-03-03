const User = require("../models/User");

// 1. THIS IS FOR THE DEBOUNCED "REAL-TIME" CHECK
exports.checkEmailAvailability = async (req, res) => {
  try {
    const { email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const userExists = await User.exists({ email }).collation({ locale: 'en', strength: 2 });

    if (userExists) {
      return res.status(409).json({ available: false, message: "Email already registered" });
    }

    res.status(200).json({ available: true, message: "Email is available" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 2. THIS IS FOR THE FINAL SIGNUP BUTTON CLICK
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // We don't need to manually hash here because 
    // the User.js "pre-save" hook handles it automatically!
    const newUser = new User({ email, password });
    
    await newUser.save();

    res.status(201).json({ 
      success: true, 
      message: "User created successfully" 
    });
  } catch (error) {
    // Final safety check: If the email was taken between the "check" and the "save"
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};