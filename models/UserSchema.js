const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { encrypt } = require("../utils/crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    validate: {
      validator: (username) => /^[a-zA-Z0-9_]+$/.test(username),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 60,
  },
  apiKey: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") && !this.isModified("apiKey")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, salt);
    }
    if (this.isModified("apiKey")) {
      this.apiKey = encrypt(this.apiKey);
    }
    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
