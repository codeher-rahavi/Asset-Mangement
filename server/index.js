require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Ensure mongoose is required
const authController = require("./controllers/authController");
const { protect } = require("./middleware/authMiddleware");
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Replace with her actual frontend URL
  credentials: true // MANDATORY: Allows the browser to send/receive cookies
})); 
app.use(cookieParser());


// REPLACE THIS WITH YOUR ACTUAL CONNECTION STRING
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.post("/api/check-email", authController.checkEmailAvailability);
app.post("/api/signup", authController.signup);
app.post("/api/login", authController.login);

app.get("/api/overview", protect, (req, res) => {
  res.status(200).json({
    message: "Authorized access granted",
    user: {
      email: req.user.email,
      id: req.user._id
    }
  });
});

app.listen(8000, () => console.log("Server running on port 8000"));