import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
{
   receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },

   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },

   type: {
      type: String,
      enum: [
         "follow",
         "booking",
         "bookingAccepted",
         "bookingRejected",
         "like",
         "comment",
         "blog"
      ]
   },

   message: {
      type: String,
      required: true
   },

   isRead: {
      type: Boolean,
      default: false
   }

},
{
   timestamps: true
});

export const Notification = mongoose.model("Notification", notificationSchema);