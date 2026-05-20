import { Router } from "express";
import {
    createBooking,
    getUserBookings,
    getAdvisorBookings
} from "../controllers/booking.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/create").post(verifyJWT, createBooking);
router.route("/my-bookings").get(verifyJWT, getUserBookings);
router.route("/advisor-bookings").get(verifyJWT, getAdvisorBookings);

export default router;