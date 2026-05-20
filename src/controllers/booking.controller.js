import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";

// CREATE BOOKING
const createBooking = async (req, res) => {
   try {
      const { advisorId, date, time, message } = req.body;
      if (!advisorId || !date || !time) {
         return res.status(400).json({
            message: "All fields are required"
         });
      }
      const advisor = await User.findById(advisorId);
      if (!advisor) {
         return res.status(404).json({
            message: "Advisor not found"
         });
      }
      if (advisor.role !== "advisor") {
         return res.status(400).json({
            message: "Selected user is not an advisor"
         });
      }
      const booking = await Booking.create({
         user: req.user._id,
         advisor: advisorId,
         date,
         time,
         message
      });
      return res.status(201).json({
         message: "Booking request sent successfully",
         booking
      });

   } catch (error) {

      return res.status(500).json({
         message: "Something went wrong",
         error: error.message
      });
   }
};

//GET USER BOOKINGS
const getUserBookings = async(req, res)=>{
   try{
      const bookings = await Booking.find({
         user: req.user._id
      })
      .populate("advisor", "fullname username profileImage")
      .sort({ createdAt: -1 });
      return res.status(200).json({
         bookings
      });
   }catch(error){
      return res.status(500).json({
         message:"Something went wrong",
         error: error.message
      });
   }
};

//GET ADVISOR BOOKING
const getAdvisorBookings = async (req, res) => {
   try{
      const bookings = await Booking.find({
         advisor:req.user._id
      })
      .populate("user", "fullname username profileImage")
      .sort({ createdAt: -1 });
      return res.status(200).json({
         bookings
      });
   }catch(error){
      return res.status(500).json({
         message:"Something went wrong",
         error: error.message
      });
   }
}

export { 
   createBooking,
   getUserBookings,
   getAdvisorBookings
};