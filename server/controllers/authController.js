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
    const { email, passWord } = req.body;

    // 1. Validation check
    if (!email || !passWord) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // 2. Find user (Using optimized Index search)
    const user = await User.findOne({ email: email.toLowerCase() });

    // 3. Security: Check if account is already locked
    if (user && user.isLocked) {
      return res.status(403).json({
        message: "Account Locked. Please contact your Institution Administrator to unblock your account."
      });
    }

    // 4. Handle "User Not Found" OR "Wrong Password"
    // We treat both the same for security (stops user enumeration)
    if (!user || !(await user.comparePassword(passWord))) {

      if (user) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= 3) {
          user.isLocked = true;
          user.lockReason = `Locked at ${new Date().toLocaleString()} due to excessive failures.`;
        }
        await user.save();
        return res.status(401).json({
          message: `Invalid credentials. Attempt ${user.loginAttempts} of 3.`
        });
      }

      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // 5. Success Flow: Reset attempts
    user.loginAttempts = 0;
    await user.save();

    // 6. Create Session (Token + Cookie)
    sendTokenResponse(user, 200, res);

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
exports.adminUnblockUser = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // 1. Find the user and reset their security status
    const user = await User.findOneAndUpdate(
      { email: userEmail.toLowerCase() },
      {
        isLocked: false,
        loginAttempts: 0,
        lockReason: ""
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: `User ${userEmail} has been successfully unblocked by the Administrator.`
    });
  } catch (error) {
    res.status(500).json({ message: "Unblocking failed.", error: error.message });
  }
};

exports.getLockedUsers = async (req, res) => {
  try {
    // Find only users where isLocked is true
    const lockedUsers = await User.find({ isLocked: true }).select("email lockReason");
    res.status(200).json({ status: "success", data: lockedUsers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch locked users" });
  }
};