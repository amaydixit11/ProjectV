// src/app/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  sex: { type: String, required: true },
  gender: { type: String, required: true },
  crushes: [{ type: String }],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
