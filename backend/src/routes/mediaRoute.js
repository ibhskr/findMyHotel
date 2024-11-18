import express from "express";
const router = express.Router();
import { upload } from "../configs/cloudinaryConfig.js";
import { HotelPicture } from "../controllers/business/hotelPictureController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post(
  "/api/:id/hotel-picture",
  // authMiddleware,
  upload.single("myfile"),
  HotelPicture
);

export default router;
