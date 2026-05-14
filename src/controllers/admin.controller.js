import { User } from '../models/user.model.js';

// ADMIN -> GET ALL USERS
const getAllUsers = async (req, res) => {

  const users = await User.find().select("-password");

  return res.status(200).json({
    users,
  });
};

// ADMIN -> GET PENDING ADVISORS
const getPendingAdvisors = async (req, res) => {

  const advisors = await User.find({
    role: "advisor",
    status: "pending",
  }).select("-password");

  return res.status(200).json({
    advisors,
  });
};

// ADMIN -> APPROVE ADVISOR
const approveAdvisor = async (req, res) => {

  const advisor = await User.findByIdAndUpdate(
    req.params.id,
    {
      status: "approved",
    },
    {
      new: true,
    }
  ).select("-password");

  return res.status(200).json({
    message: "Advisor approved successfully",
    advisor,
  });
};

export {
    getAllUsers,
    getPendingAdvisors,
    approveAdvisor
}