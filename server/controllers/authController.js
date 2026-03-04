const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 1. Helper function to create JWT
// Use a strong secret key in your .env file
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "SUPER_SECRET_KEY_2026", {
    expiresIn: "1d", 
  });
};

// 2. Helper to send token via Cookie (Enhanced Security)
const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    httpOnly: true, // Prevents XSS (JavaScript can't read this)
    secure: process.env.NODE_ENV === "production", // Only over HTTPS in production
    sameSite: "Strict", // Prevents CSRF
  };

  res.status(statusCode).cookie("jwt", token, cookieOptions).json({
    success: true,
    token, // Optional: send in body too for convenience
    user: { id: user._id, email: user.email },
  });
};

// --- ROUTES ---

exports.checkEmailAvailability = async (req, res) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Using your optimized index check
    const userExists = await User.exists({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(409).json({ available: false, message: "Email taken" });
    }

    res.status(200).json({ available: true, message: "Email available" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = new User({ email, password });
    await newUser.save();

    // Give them a token immediately so they are logged in after signing up
    sendTokenResponse(newUser, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Note: using 'passWord' to match your React state
    const { email, passWord } = req.body;

    if (!email || !passWord) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // 1. Check user (Index search)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // 2. Compare hashed password
    const isMatch = await user.comparePassword(passWord);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // 3. Create Session (Token + Cookie)
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};