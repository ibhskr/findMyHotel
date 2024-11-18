import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import { secret } from "../../configs/env.js";

//
// ---------  LOGIN LOGIC --------------
//
export const userLogin = async (req, res) => {
  try {
    const { mobileNo, code } = req.body;
    const user = await User.findOne({ mobileNo });
    if (user.verifyCode == code) {
      const token = jwt.sign({ mobileNo }, secret, {
        expiresIn: "30d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      return res.status(200).json({
        success: true,
        message: "Login successfully Done.",
        user,
        token: token,
      });
    }
    return res.status(403).json({
      success: false,
      message: "incorrect code",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
  }
};

//
// ------------ CODE FOR VERIFY CODE ---------------
//
export const getCode = async (req, res) => {
  try {
    const { mobileNo } = req.body;
    const user = await User.findOne({ mobileNo });
    const verifyCode = Math.floor(1000 + Math.random() * 9000);
    if (!user) {
      await User.create({ mobileNo });
      await User.findOneAndUpdate({ mobileNo }, { verifyCode });
      return res.status(200).json({
        success: true,
        message: "verification code",
        code: verifyCode,
      });
    }

    await User.findOneAndUpdate({ mobileNo }, { verifyCode });
    return res.status(200).json({
      success: true,
      message: "verification code",
      code: verifyCode,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
    // console.log(error);
  }
};

export const logOut = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
