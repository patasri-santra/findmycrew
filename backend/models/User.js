import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    freelancerType: {
      type: String,
      enum: ["full-time", "part-time", "not-freelancer"],
      required: true,
    },
    profilePic: { type: String, default: "" },
    isEmailVerified: { type: Boolean, default: false },
    emailOTP: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);