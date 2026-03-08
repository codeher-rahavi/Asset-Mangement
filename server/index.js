require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Ensure mongoose is required
const authController = require("./controllers/authController");
const cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit");
const { protect, restrictTo } = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Replace with her actual frontend URL
  credentials: true // MANDATORY: Allows the browser to send/receive cookies
}));
app.use(cookieParser());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per window
  message: "Too many login attempts from this IP, please try again after 15 minutes."
});

// REPLACE THIS WITH YOUR ACTUAL CONNECTION STRING
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.post("/api/check-email", authController.checkEmailAvailability);
app.post("/api/signup", authController.signup);
app.post("/api/login", loginLimiter, authController.login);

app.get("/api/admin/locked-users", protect, restrictTo("admin"), authController.getLockedUsers);

app.post("/api/forgotPassword", authController.forgotPassword);
app.patch("/api/resetPassword/:token", authController.resetPassword);


// 2. Student / General Protected Routes
app.get("/api/overview", protect, (req, res) => {
  res.status(200).json({
    message: "Authorized access granted",
    user: { email: req.user.email, id: req.user._id, role: req.user.role }
  });
});

// 3. Admin-Only Routes
app.post(
  "/api/admin/unblock",
  protect,
  restrictTo("admin"),
  authController.adminUnblockUser
);

app.all(/Text*/, (req, res) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});


app.listen(8000, () => console.log("Server running on port 8000"));