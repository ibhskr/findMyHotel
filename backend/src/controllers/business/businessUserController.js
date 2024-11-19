import businessUser from "../../models/businessUserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "../../configs/env.js";

//--

//-- create new business account
export const signupBusinessUser = async (req, res) => {
  const data = req.body;
  const password = data.password;
  const hashPassword = await bcrypt.hash(password, 10);
  data.password = hashPassword;
  try {
    await businessUser.create(data);
    return res.status(201).json({
      message: "account created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "unable to create new account",
      success: false,
    });
  }
};

//--  login business account

export const loginBusinessUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const user = await businessUser.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "User not found",
        success: false,
      });
      // console.log("user not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({
        message: "Email and password do not match",
        success: false,
      });
      console.log("password not match");
    }

    const token = jwt.sign({ username: user.username }, secret, {
      expiresIn: "30d",
    });

    // Set the token in an HTTP-only, secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Set the user ID cookie
    // console.log(user?._id);
    res.cookie("userId", user?._id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(200).json({
      message: "Login successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
