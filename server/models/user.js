const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Automatically saves "User@Email.com" as "user@email.com"
  }
});

// PRO TIP: Create the Unique Index with Collation
// This ensures 'test@test.com' and 'TEST@TEST.COM' are seen as the same
userSchema.index(
  { email: 1 }, 
  { unique: true, collation: { locale: 'en', strength: 2 } }
);

module.exports = mongoose.model("User", userSchema);