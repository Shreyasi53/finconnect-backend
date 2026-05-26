import { Router } from "express";
import {
    createBooking,
    getUserBookings,
    getAdvisorBookings,
    acceptBooking,
    rejectBooking
} from "../controllers/booking.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();
/**
 * @swagger
 * /api/v1/bookings/create:
 *   post:
 *     summary: Create Booking
 *     tags: [Bookings]
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
router.route("/create").post(verifyJWT, createBooking);
router.route("/my-bookings").get(verifyJWT, getUserBookings);
router.route("/advisor-bookings").get(verifyJWT, getAdvisorBookings);
/**
 * @swagger
 * /api/v1/bookings/accept/{id}:
 *   patch:
 *     summary: Accept Booking Request
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking accepted successfully
 */
router.route("/accept/:id").patch(verifyJWT, acceptBooking);
router.route("/reject/:id").patch(verifyJWT, rejectBooking);

export default router;