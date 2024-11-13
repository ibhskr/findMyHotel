import express from "express";
import { loginBusinessUser, signupBusinessUser } from "../controllers/userController.js";
import { getMyHotel } from "../controllers/getDetails.js";

const router = express.Router();

router.route("/business-signup").post(signupBusinessUser);
router.route("/business-login").post(loginBusinessUser);





export default router;
