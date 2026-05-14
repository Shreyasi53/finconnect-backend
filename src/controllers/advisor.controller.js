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

export {
  getAllAdvisors
}