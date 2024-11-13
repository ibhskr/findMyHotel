import businessUser from "../models/businessUserModel.js";
import Hotel from "../models/hotelModel.js";

export const newHotel = async (req, res) => {
  const hotelData = req.body;
  const id = req.params.id;
  console.log(hotelData);
  console.log(id);
  try {
    if (!id) {
      return res.status(400).json({
        message: "Failed to add your hotel",
        success: false,
      });
    }
    const hotel = await Hotel.create(hotelData);
    await businessUser.updateOne(
      { _id: id },
      { $push: { listedHotel: hotel?._id } }
    );
    return res.status(201).json({
      message: "Your hotel successfully added",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Failed to add your hotel",
      success: false,
    });
  }
};
