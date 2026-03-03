const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

// THE PRE-SAVE HOOK: This runs automatically before .save() is called
userSchema.pre("save", async function (next) {
  // 1. Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // 2. Generate a Salt and Hash with a Salt Factor of 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Create the Case-Insensitive Index we discussed earlier
userSchema.index(
  { email: 1 }, 
  { unique: true, collation: { locale: 'en', strength: 2 } }
);

module.exports = mongoose.model("User", userSchema);