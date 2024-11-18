import Hotel from "../../models/hotelModel.js";
import Room from "../../models/roomModel.js";

export const newRoom = async (req, res) => {
  const roomData = req.body;
  //   console.log(roomData);
  try {
    const returnRes = await Room.create(roomData);
    // console.log(returnRes._id);
    await Hotel.findByIdAndUpdate(
      { _id: roomData.hotel },
      { $addToSet: { rooms: returnRes._id } }
    );
    return res.status(201).json({
      message: `your room successfully added at ${roomData.hotel}`,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: "unable to listed your room",
      success: false,
    });
  }
};
export const deleteRoom = async (req, res) => {
  // console.log("API hit for room deletion");

  const roomId = req.body.id; // Extract room ID from request body
  if (!roomId) {
    return res.status(400).json({
      message: "Room ID is required",
      success: false,
    });
  }

  try {
    // Check if the room exists
    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.status(404).json({
        message: "Room not found",
        success: false,
      });
    }

    // Remove the room ID from the hotel's room list
    await Hotel.findByIdAndUpdate(roomData.hotel, {
      $pull: { rooms: roomData._id },
    });

    // Delete the room
    await Room.findByIdAndDelete(roomId);

    return res.status(200).json({
      message: "Room successfully deleted",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting room:", error);
    return res.status(500).json({
      message: "Unable to delete the room. Please try again later.",
      success: false,
    });
  }
};
