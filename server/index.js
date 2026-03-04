const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Ensure mongoose is required
const authController = require("./controllers/authController");

const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());


// REPLACE THIS WITH YOUR ACTUAL CONNECTION STRING
const mongoURI = "mongodb+srv://rahavi-ganeshan:rahavi_user@cluster0.2x3aoq.mongodb.net/?appName=Cluster0"; 

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.post("/api/check-email", authController.checkEmailAvailability);
app.post("/api/signup", authController.signup);
app.post("/api/login", authController.login);

app.listen(8000, () => console.log("Server running on port 8000"));