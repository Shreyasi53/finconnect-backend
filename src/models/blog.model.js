import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },

   title: {
      type: String,
      required: true,
      trim: true
   },

   content: {
      type: String,
      required: true
   },

   category: {
      type: String,
      default: "Finance"
   },

   image: {
      type: String,
      default: ""
   },

   likes: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
   ],

   comments: [
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },

         text: {
            type: String
         },

         createdAt: {
            type: Date,
            default: Date.now
         }
      }
   ]

}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogSchema);