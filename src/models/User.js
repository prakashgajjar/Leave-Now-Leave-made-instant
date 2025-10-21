import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "warden", "admin"],
      default: "student",
    },
    department: { type: String, default: "" },
    hostel: { type: String, default: "" },
    year: { type: Number, default: 1 },

    // 👇 Leave history embedded in user profile
    leaves: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
    }],

    // optional summary stats
    leaveStats: {
      totalApplied: { type: Number, default: 0 },
      totalApproved: { type: Number, default: 0 },
      totalRejected: { type: Number, default: 0 },
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
