import Booking from "../../models/bookModel.js";
import Room from "../../models/roomModel.js";
import User from "../../models/userModel.js";

export const bookingMyHotel = async (req, res) => {
  try {
    const { mobileNo } = req.user;
    console.log(mobileNo);
    const {
      name,
      email,
      phoneNo,
      guests,
      whatsappNo,
      noRooms,
      checkIn,
      checkOut,
      room: roomData,
    } = req.body;

    const bookingData = {
      // Assuming you get userId from middleware/authentication
      hotel: roomData.hotel._id,
      room: roomData._id,
      name,
      email,
      guests: parseInt(guests),
      noOfRooms: parseInt(noRooms),
      phoneNo,
      whatsappNo,
      checkInDate: new Date(checkIn),
      checkOutDate: new Date(checkOut),
      price: roomData.price,
      status: "Placed",
    };

    // Step 1: Create the booking
    const booking = await Booking.create(bookingData);

    // Step 2: Find the room by its ID
    const room = await Room.findById(roomData._id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
        success: false,
      });
    }

    // Step 3: Push the new booking's ID into the room's booking array
    room.booking.push(booking._id);

    // Step 4: Save the updated room
    await room.save();
    const user = await User.findOne({ mobileNo });
    user.booking.push(booking._id);
    await user.save();

    return res.status(200).json({
      message: "Your booking is successfully placed",
      success: true,
    });
  } catch (error) {
    console.error("Error placing booking:", error);
    return res.status(400).json({
      message: "Your request failed",
      success: false,
    });
  }
};
