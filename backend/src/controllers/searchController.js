import Hotel from "../models/hotelModel.js";

export const searchByCity = async (req, res) => {
  try {
    const city = req.query.city;
    console.log(city);
    const response = await Hotel.find({ city: city }).populate("rooms");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: "unable to fetch data" });
  }
};
