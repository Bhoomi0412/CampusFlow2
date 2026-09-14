const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");


// ==========================================
// CREATE BOOKING
// ==========================================

router.post("/", async (req, res) => {
  try {
    const {
      resource,
      location,
      date,
      startTime,
      endTime,
      purpose,
      capacity,
      facilities,
      additionalItems,
      returnDeadline,
      userName,
    } = req.body;

    // ==========================================
    // CHECK CONFLICT
    // Same Resource + Same Date
    // Pending OR Approved booking
    // ==========================================

    const existingBookings = await Booking.find({
      resource,
      date,
      status: {
        $in: ["pending", "approved"],
      },
    });

    // Convert time into minutes
    const convertToMinutes = (time) => {
      const [hours, minutes] = time.split(":").map(Number);

      return hours * 60 + minutes;
    };

    const newStart = convertToMinutes(startTime);
    const newEnd = convertToMinutes(endTime);

    // Check overlapping time
    const conflict = existingBookings.find((booking) => {
      const existingStart = convertToMinutes(booking.startTime);
      const existingEnd = convertToMinutes(booking.endTime);

      return newStart < existingEnd && newEnd > existingStart;
    });

    if (conflict) {
      return res.status(409).json({
        success: false,

        message:
          "This resource is already requested or booked for the selected date and time.",

        booking: conflict,
      });
    }

    // ==========================================
    // CREATE NEW BOOKING
    // ==========================================

    const booking = await Booking.create({
      resource,
      location,
      date,
      startTime,
      endTime,
      purpose,
      capacity,
      facilities,
      additionalItems,
      returnDeadline,
      userName,
      status: "pending",
    });

    res.status(201).json({
      success: true,

      message:
        "Booking request sent successfully. Waiting for admin approval.",

      booking,
    });

  } catch (error) {
    console.error("Booking Error:", error);

    res.status(500).json({
      success: false,

      message: "Unable to create booking request.",
    });
  }
});


// ==========================================
// GET ALL BOOKINGS
// ==========================================

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch bookings.",
    });
  }
});


// ==========================================
// GET SINGLE BOOKING
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch booking.",
    });
  }
});


// ==========================================
// ADMIN UPDATE STATUS
// ==========================================

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "declined", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status.",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully.`,
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update booking.",
    });
  }
});


// ==========================================
// MARK ADDITIONAL ITEM AS RETURNED
// ==========================================

router.put("/:bookingId/items/:itemIndex/return", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const itemIndex = Number(req.params.itemIndex);

    if (!booking.additionalItems[itemIndex]) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    booking.additionalItems[itemIndex].returned = true;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Item marked as returned.",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update item.",
    });
  }
});


module.exports = router;