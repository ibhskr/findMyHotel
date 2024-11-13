import express from "express";
import { changeStatus, getBookingDetails } from "../controllers/bookingController.js";
import { getMyHotel } from "../controllers/getDetails.js";
import { newHotel } from "../controllers/hotelController.js";
import { deleteRoom, newRoom } from "../controllers/roomController.js";


//---
const router = express.Router();
// 
// 
router.route("/getmyhotels/:id").get(getMyHotel);
router.route("/add-new-hotel/:id").post(newHotel);
router.route("/add-room").post(newRoom);
router.route("/delete-room").delete(deleteRoom);
router.route("/get-booking-details/:id").get(getBookingDetails);
router.route("/change-status").put(changeStatus)


//--
export default router;
