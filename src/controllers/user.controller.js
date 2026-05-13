import { User } from "../models/user.model.js";

// REGISTER USER
const registerUser = async (req, res) => {
  try {

    const { fullname, username, email, password, role } = req.body;

    if (
      [fullname, username, email, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // advisor -> pending
    // normal user -> approved

    let userStatus = "approved";

    if (role === "advisor") {
      userStatus = "pending";
    }

    const user = await User.create({
      fullname,
      username,
      email,
      password,
      role,
      status: userStatus,
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json({
      message: "User registered successfully",
      user: createdUser,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const { email, username, password } = req.body;

    if (!(email || username)) {
      return res.status(400).json({
        message: "Email or username is required",
      });
    }

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid user credentials",
      });
    }

    const accessToken = user.generateAccessToken();

    return res.status(200).json({
      message: "User logged in successfully",
      accessToken,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// CURRENT LOGGED-IN USER
const getCurrentUser = async (req, res) => {

  return res.status(200).json({
    user: req.user,
  });
};

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

const updateProfile = async (req, res) =>{
  try{
    const{
      fullname,
      bio,
      location,
      expertise,
      experience,
      linkedin,
      twitter,
      instagram,
      profileImage,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        fullname,
        bio,
        location,
        expertise,
        experience,
        linkedin,
        twitter,
        instagram,
        profileImage,
      },
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getPendingAdvisors,
  approveAdvisor,
  updateProfile
};