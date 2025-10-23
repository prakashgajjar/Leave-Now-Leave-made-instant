import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "warden", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

// Avoid creating multiple models in serverless
export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
