import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

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
      msg: `your room successfully added at ${roomData.hotel}`,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      msg: "unable to listed your room",
      success: false,
    });
  }
};
export const deleteRoom = async (req, res) => {
  const roomId = req.body.id;

  try {
    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.status(404).json({
        msg: "Room not found",
        success: false,
      });
    }

    await Hotel.findByIdAndUpdate(
      roomData.hotel,
      { $pull: { rooms: roomData._id } }
    );

    await Room.findByIdAndDelete(roomId);

    return res.status(200).json({
      msg: "Your room was successfully deleted",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Unable to delete your room",
      success: false,
    });
  }
};

