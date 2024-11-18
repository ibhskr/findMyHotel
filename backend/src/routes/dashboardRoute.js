import express from "express";

import {
  changeStatus,
  getBookingDetails,
} from "../controllers/business/getBookingDetails.js";
import { getMyHotel } from "../controllers/user/getDetails.js";
import { newHotel } from "../controllers/business/hotelController.js";
import { deleteRoom, newRoom } from "../controllers/business/roomController.js";
import authMiddleware from "../middleware/authMiddleware.js";
//---
const router = express.Router();
//
//
router.route("/api/getmyhotels/:id").get(authMiddleware, getMyHotel);
router.route("/api/add-new-hotel/:id").post(authMiddleware, newHotel);
router.route("/api/add-room").post(authMiddleware, newRoom);
router.route("/api/delete-room").delete(authMiddleware, deleteRoom);
router
  .route("/api/get-booking-list/:id")
  .get(authMiddleware, getBookingDetails);
router.route("/api/change-status").put(authMiddleware, changeStatus);

//--
export default router;
