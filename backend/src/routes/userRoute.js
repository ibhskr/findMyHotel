import express from "express";
import {
  loginBusinessUser,
  signupBusinessUser,
} from "../controllers/business/businessUserController.js";
import { getMyHotel } from "../controllers/user/getDetails.js";
import {
  userLogin,
  getCode,
  logOut,
} from "../controllers/user/userController.js";
import { getUserDetails } from "../controllers/user/getUserDetails.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getBookingDetails } from "../controllers/user/getBookingDetails.js";
import { isAuthenticated } from "../controllers/user/isAuthenticated.js";
const router = express.Router();

router.route("/api/business-signup").post(signupBusinessUser);
router.route("/api/business-login").post(loginBusinessUser);
router.route("/api/user-login-code").post(getCode);
router.route("/api/user-login").post(userLogin);
router.route("/api/user-logout").get(authMiddleware, logOut);
router.route("/api/get-user").get(authMiddleware, getUserDetails);
router
  .route("/api/get-booking-details/:id")
  .get(authMiddleware, getBookingDetails);
router.route("/api/isAuthenticated").get(authMiddleware, isAuthenticated);

export default router;
