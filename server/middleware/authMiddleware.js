const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1. Get token from cookies
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({ 
        message: "Authentication failed. Please log in." 
      });
    }

    // 3. Verify token signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SUPER_SECRET_KEY_2026");

    // 4. Check if user still exists in DB (Using optimized ID search)
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: "The user belonging to this token no longer exists." });
    }

    // 5. GRANT ACCESS: Store user in the request object for the next function
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};