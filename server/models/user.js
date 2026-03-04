const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

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
    // This is the backend 'Safety Net'
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v);
      },
      message: "Password does not meet strength requirements!"
    }
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  lockReason: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    enum: ["student", "admin"], // Only allows these two values
    default: "student"
  }
});

// THE PRE-SAVE HOOK: This runs automatically before .save() is called
// THE UPDATED PRE-SAVE HOOK
userSchema.pre("save", async function () {
  // 1. Only hash if modified
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // No need to call next() here
  } catch (err) {
    throw err; // Throwing the error tells Mongoose the save failed
  }
});

// Create the Case-Insensitive Index we discussed earlier
// userSchema.index(
//   { email: 1 },
//   { unique: true, collation: { locale: 'en', strength: 2 } }
// );

// Add this above module.exports in User.js
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
module.exports = mongoose.model("User", userSchema);