import express from "express";

import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();


/* Student creates booking */

router.post("/", protect, createBooking);


/* Student sees own bookings */

router.get("/my-bookings", protect, getMyBookings);


/* Admin sees all bookings */

router.get(
  "/",
  protect,
  adminOnly,
  getAllBookings
);


/* Admin approves/rejects */

router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateBookingStatus
);


export default router;