import { Review } from "../models/review.model.js";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";

// CREATE REVIEW
const createReview = async (req, res) => {
   try {
      const { bookingId, rating, comment } = req.body;
      const booking = await Booking.findById(
         bookingId
      );
      if (!booking) {
         return res.status(404).json({
            message: "Booking not found"
         });
      }
      // only booking owner can review
      if (
         booking.user.toString() !==
         req.user._id.toString()
      ) {
         return res.status(403).json({
            message: "Unauthorized action"
         });
      }
      // booking must be accepted
      if (booking.status !== "accepted") {
         return res.status(400).json({
            message: "Booking not accepted yet"
         });
      }
      // prevent multiple reviews
      const existingReview = await Review.findOne({
         booking: bookingId
      });
      if (existingReview) {
         return res.status(400).json({
            message: "Review already submitted"
         });
      }
      const review = await Review.create({
         user: req.user._id,
         advisor: booking.advisor,
         booking: bookingId,
         rating,
         comment
      });
      // update advisor average rating
      const reviews = await Review.find({
         advisor: booking.advisor
      });
      const total =
         reviews.reduce(
            (sum, item) => sum + item.rating,
            0
         );

      const average = total / reviews.length;

      await User.findByIdAndUpdate(
         booking.advisor,
         {
            averageRating: average,
            totalReviews: reviews.length
         }
      );

      return res.status(201).json({
         message: "Review submitted successfully",
         review
      });

   } catch (error) {
      return res.status(500).json({
         message: "Something went wrong",
         error: error.message
      });
   }
};

export {
   createReview
};