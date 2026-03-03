const express = require("express");
const cors = require("cors");
const { checkEmailAvailability } = require("./controllers/authController"); // Import logic

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// The endpoint for the frontend to hit
app.post("/api/check-email", checkEmailAvailability);

app.get("/", (req, res) => {
  res.json({ data: "Server is running" });
});

app.listen(8000, () => console.log("Server running on port 8000"));