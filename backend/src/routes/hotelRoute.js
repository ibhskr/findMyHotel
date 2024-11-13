import express from "express";
import { newHotel } from "../controllers/hotelController.js";
import { deleteRoom, newRoom } from "../controllers/roomController.js";
import {
  getHotel,
  getOneHotel,
  getRoom,
  getOneRoom,
} from "../controllers/getDetails.js";
import {
  bookingMyHotel,
  getBookingDetails,
} from "../controllers/bookingController.js";
import { searchByCity } from "../controllers/searchController.js";
//--
const router = express.Router();

router.route("/hotel").get(getHotel); // get all hotels
router.route("/rooms").get(getRoom); // get all rooms
router.route("/getHotel/:id").get(getOneHotel); // get single hotel
router.route("/get-one-room/:id").get(getOneRoom); // get single room
router.route("/booking-my-hotel").post(bookingMyHotel); //booking
router.route("/search-by-city").get(searchByCity);

// router.route("/getMyHotelDetails/:id").get(getOneHotel);
// router.route("/getMyHotelDetails/:id").get(getMyHotelDetails);
// --
export default router;
