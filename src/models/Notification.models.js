import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Which user this notification belongs to
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["info", "success", "warning", "error"],
      default: "info",
    },
    read: {
      type: Boolean,
      default: false, // Mark if user has seen it
    },
    // optional: link to redirect user if clicked
    link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
