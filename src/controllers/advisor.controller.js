import { User } from '../models/user.model.js';

//GET ALL APPROVED ADVISORS
const getAllAdvisors = async (req, res) =>{
  try{
    const advisors = await User.find({
      role: "advisor",
      status: "approved",
    }).select("-password");

    return res.status(200).json({
      advisors,
    });

  } catch (error) {
      return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// GET SINGLE ADVISOR PROFILE
const getAdvisorProfile = async (req, res) => {
   try {
      const advisor = await User.findById(req.params.id)
      .select("-password");
      if (!advisor) {
         return res.status(404).json({
            message: "Advisor not found"
         });
      }
      if (advisor.role !== "advisor") {
         return res.status(400).json({
            message: "This user is not an advisor"
         });
      }
      return res.status(200).json({
         advisor
      });
   } catch (error) {
      return res.status(500).json({
         message: "Something went wrong",
         error: error.message
      });
   }
};

export {
  getAllAdvisors,
  getAdvisorProfile
}