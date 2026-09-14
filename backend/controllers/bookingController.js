import Booking from "../models/Booking.js";
import Resource from "../models/Resource.js";


/* =========================
   CREATE BOOKING
========================= */

export const createBooking = async (req, res) => {
  try {
    const {
      resourceId,
      date,
      startTime,
      endTime,
      purpose,
    } = req.body;

    const resource = await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found.",
      });
    }

    /* CHECK CONFLICT */

    const conflict = await Booking.findOne({
      resource: resourceId,
      date,
      status: {
        $in: ["PENDING", "APPROVED"],
      },
      startTime: {
        $lt: endTime,
      },
      endTime: {
        $gt: startTime,
      },
    });

    if (conflict) {
      return res.status(409).json({
        message:
          "This resource is already booked for the selected time.",
      });
    }

    const booking = await Booking.create({
      resource: resource._id,
      user: req.user._id,
      resourceName: resource.name,
      date,
      startTime,
      endTime,
      purpose,
      location: resource.location,
      status: "PENDING",
    });

    res.status(201).json({
      message: "Booking request created successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* =========================
   GET MY BOOKINGS
========================= */

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("resource")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* =========================
   GET ALL BOOKINGS - ADMIN
========================= */

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("resource")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* =========================
   UPDATE BOOKING STATUS
========================= */

export const updateBookingStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    if (
      !["APPROVED", "REJECTED"].includes(status)
    ) {
      return res.status(400).json({
        message: "Invalid booking status.",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.json({
      message: `Booking ${status.toLowerCase()} successfully.`,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};