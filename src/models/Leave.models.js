import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: { type: String, required: true },
    describe: { type: String },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    totalDays: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rejectionReason: { type: String, default: "" },
    pdfUrl: { type: String, default: "" },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.leaveSchema ||
  mongoose.model("leave", leaveSchema);
