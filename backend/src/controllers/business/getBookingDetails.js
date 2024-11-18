import Booking from "../../models/bookModel.js";
import Room from "../../models/roomModel.js";
import User from "../../models/userModel.js";

// get booking details in dashboard
export const getBookingDetails = async (req, res) => {
  try {
    const hotelId = req.params;
    let pending = 0;
    let confirm = 0;
    const bookings = await Booking.find().where("hotel", hotelId.id);
    bookings.forEach((element) => {
      if (element.status === "placed") {
        pending++;
      } else if (element.status === "accept") {
        confirm++;
      }
    });

    return res
      .status(200)
      .json({ bookings, countStatus: { pending, confirm } });
  } catch (error) {
    return res.status(400).json({
      message: "Your request failed",
      success: false,
    });
  }
};

//accept or reject booking request
export const changeStatus = async (req, res) => {
  try {
    let bookingStatus = req.query.status;
    let bookingId = req.query.id;

    await Booking.findByIdAndUpdate(bookingId, { status: bookingStatus });

    return res.status(200).json({
      message: `Booking status updated to: ${bookingStatus}`,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Your request failed",
      success: false,
    });
  }
};
// get pending and confirm booking number
export const statusNumber = async (req, res) => {
  try {
  } catch (error) {}
};
