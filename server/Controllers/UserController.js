import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    res.status(201).json({
      fullName,
      email,
      image,
      password,
    });
  } catch (error) {}
});

export {
  registerUser
};
