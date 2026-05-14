import { User } from "../models/user.model.js";

// CURRENT LOGGED-IN USER
const getCurrentUser = async (req, res) => {

  return res.status(200).json({
    user: req.user,
  });
};

//UPDATE USER PROFILE
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

// FOLLOW ADVISOR
const followAdvisor = async (req, res) => {

   try {

      const advisor = await User.findById(req.params.id);

      if (!advisor) {
         return res.status(404).json({
            message: "Advisor not found"
         });
      }

      if (advisor.role !== "advisor") {
         return res.status(400).json({
            message: "You can only follow advisors"
         });
      }

      // add follower to advisor
      advisor.followers.push(req.user._id);

      await advisor.save();

      // add advisor to user's following
      const user = await User.findById(req.user._id);

      user.following.push(advisor._id);

      await user.save();

      return res.status(200).json({
         message: "Advisor followed successfully"
      });

   } catch (error) {

      return res.status(500).json({
         message: "Something went wrong",
         error: error.message
      });
   }
};

export {
  getCurrentUser,
  updateProfile,
  followAdvisor
};