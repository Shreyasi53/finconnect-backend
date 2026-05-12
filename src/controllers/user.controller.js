import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password, role } = req.body;
    if (
      [fullname, username, email, password].some(
        (field) => field?.trim() === "",
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

    const user = await User.create({
      fullname,
      username,
      email,
      password,
      role,
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json({
      message: "User registered successfully",
      user: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export { registerUser };
