// import Hotel from '../models/Hotel.js'; // Adjust the import path as necessary
// import { json } from "body-parser";
import businessUser from "../models/businessUserModel.js";
import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

//--

// get all hotels
export const getHotel = async (req, res) => {
  const { name, location, priceRange } = req.query;

  const searchCriteria = {};

  if (name) {
    searchCriteria.name = { $regex: name, $options: "i" }; // Case-insensitive regex search
  }

  if (location) {
    searchCriteria.city = location;
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    searchCriteria.price = { $gte: minPrice, $lte: maxPrice };
  }

  try {
    const hotels = await Hotel.find(searchCriteria);
    res.status(200).json(hotels);
  } catch (error) {
    console.log("failed");
    res.status(500).json({ message: error.message });
  }
};

// get all rooms
export const getRoom = async (req, res) => {
  try {
    const rooms = await Room.find().populate("hotel");
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(404).json({
      msg: "not found",
      success: false,
    });
  }
};

//  get one hotel
export const getOneHotel = async (req, res) => {
  const id = req.params.id;

  try {
    const hotelDetails = await Hotel.findById(id).populate("rooms");

    return res.status(200).json(hotelDetails);
  } catch (error) {
    return res.status(404).json({
      msg: "not found",
      success: false,
    });
  }
};
// getOneRoom
export const getOneRoom = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const room = await Room.findById(id).populate("hotel");
    return res.status(200).json(room);
  } catch (error) {
    return res.status(404).json({
      msg: "not found",
      success: false,
    });
  }
};

// get my listed hotel
// use in business
export const getMyHotel = async (req, res) => {
  const id = req.params.id;
  // console.log("id:" + id);
  try {
    const userData = await businessUser.findById(id).populate("listedHotel");
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ message: "no data found" });
  }
};

