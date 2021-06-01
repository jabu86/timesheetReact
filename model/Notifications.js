import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    timcard: { type: mongoose.Schema.Types.ObjectId, ref: "timecard" },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
const Notification = mongoose.model("notification", NotificationSchema);
export default Notification;
