import Booking from "../../models/bookModel.js";

export const getBookingDetails = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  try {
    // Find the booking by ID and populate the "room" and "hotel" fields
    const bookingDetails = await Booking.findById(id).populate("room hotel");

    // If no booking is found, return a 404 error
    if (!bookingDetails) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Return the booking details as a response
    return res.status(200).json({
      success: true,
      data: bookingDetails,
    });
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
