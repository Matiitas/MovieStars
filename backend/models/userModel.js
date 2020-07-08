const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
    },
    password: {
      type: String,
      required: true,
    },
    movies: { type: Array, default: [] },
    profileImage: { type: String, default: "profile.png" },
    name: { type: String, default: "N/A" },
    birthDate: {
      type: Date,
      min: "1900-01-01",
      max: Date.now,
    },
    country: {
      type: String,
      default: "N/A",
    },
    city: {
      type: String,
      default: "N/A",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema); // User, el nombre de la tabla
module.exports = User;
