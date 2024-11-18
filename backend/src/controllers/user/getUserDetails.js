import User from "../../models/userModel.js";

export const getUserDetails = async (req, res) => {
  try {
    const { mobileNo } = req.user; // Get mobileNo from authenticated user
    const user = await User.findOne({ mobileNo }).populate({
      path: "booking",
      populate: {
        path: "room hotel", // Populate the "room" and "hotel" details
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send the user details as a response
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
