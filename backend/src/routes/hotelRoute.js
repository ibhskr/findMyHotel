import express from "express";

import {
  getHotel,
  getOneHotel,
  getRoom,
  getOneRoom,
} from "../controllers/user/getDetails.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { bookingMyHotel } from "../controllers/user/bookingController.js";
import { search } from "../controllers/user/searchController.js";

//--
const router = express.Router();

router.route("/api/hotel").get(getHotel); // get all hotels
router.route("/api/rooms").get(getRoom); // get all rooms
router.route("/api/getHotel/:id").get(getOneHotel); // get single hotel
router.route("/api/get-one-room/:id").get(getOneRoom); // get single room
router.route("/api/booking-my-hotel").post(authMiddleware, bookingMyHotel); //booking
router.route("/api/search").get(search);

// router.route("/getMyHotelDetails/:id").get(getOneHotel);
// router.route("/getMyHotelDetails/:id").get(getMyHotelDetails);
// --
export default router;
