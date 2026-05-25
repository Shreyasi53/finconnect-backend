import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },

   advisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },

   booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
   },

   rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
   },

   comment: {
      type: String
   }

}, { timestamps: true });

export const Review = mongoose.model(
   "Review",
   reviewSchema
);