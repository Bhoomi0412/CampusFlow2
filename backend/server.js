import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

// ==========================================
// BOOKING SCHEMA
// ==========================================

const bookingSchema = new mongoose.Schema(
  {
    resource: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      default: "",
    },

    startTime: {
      type: String,
      default: "",
    },

    endTime: {
      type: String,
      default: "",
    },

    purpose: {
      type: String,
      default: "",
    },

    capacity: {
      type: Number,
      default: 0,
    },

    facilities: {
      type: [String],
      default: [],
    },

    additionalItems: [
      {
        name: {
          type: String,
        },

        quantity: {
          type: Number,
          default: 1,
        },

        returned: {
          type: Boolean,
          default: false,
        },

        returnedAt: {
          type: Date,
          default: null,
        },
      },
    ],

    returnDeadline: {
      type: String,
      default: "",
    },

    userName: {
      type: String,
      default: "Student",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    adminApprovedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// BOOKING MODEL
// ==========================================

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampusFlow Backend is Running 🚀",
  });
});

// ==========================================
// DATABASE TEST ROUTE
// ==========================================

app.get("/api/test-db", async (req, res) => {
  try {
    const count = await Booking.countDocuments();

    res.json({
      success: true,
      message: "MongoDB is working successfully ✅",
      totalBookings: count,
    });

  } catch (error) {

    console.error("❌ Database Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================================
// GET ALL BOOKINGS
// ADMIN USE
// ==========================================

app.get("/api/bookings", async (req, res) => {
  try {

    const bookings = await Booking.find()
      .sort({ createdAt: -1 });

    console.log(
      `📋 Total bookings found: ${bookings.length}`
    );

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {

    console.error(
      "❌ Get Bookings Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch bookings",
    });
  }
});

// ==========================================
// CREATE BOOKING
// STUDENT USE
// ==========================================

app.post("/api/bookings", async (req, res) => {

  try {

    console.log("\n📩 BOOKING REQUEST RECEIVED");
    console.log(req.body);

    const bookingData = req.body;

    // VALIDATION

    if (!bookingData.resource) {

      console.log("❌ Resource missing");

      return res.status(400).json({
        success: false,
        message: "Resource is required",
      });
    }

    // CREATE BOOKING

    const newBooking = await Booking.create({

      resource: bookingData.resource,

      location:
        bookingData.location || "",

      date:
        bookingData.date || "",

      startTime:
        bookingData.startTime || "",

      endTime:
        bookingData.endTime || "",

      purpose:
        bookingData.purpose || "",

      capacity:
        Number(bookingData.capacity) || 0,

      facilities:
        bookingData.facilities || [],

      additionalItems:
        bookingData.additionalItems || [],

      returnDeadline:
        bookingData.returnDeadline ||
        "Within 2 hours after the event ends",

      userName:
        bookingData.userName || "Student",

      status: "pending",
    });

    console.log("\n✅ BOOKING SAVED SUCCESSFULLY");
    console.log("🆔 Booking ID:", newBooking._id);
    console.log("📍 Resource:", newBooking.resource);
    console.log("👤 User:", newBooking.userName);
    console.log("📌 Status:", newBooking.status);
    console.log("-----------------------------------");

    res.status(201).json({
      success: true,
      message: "Booking request sent successfully",
      booking: newBooking,
    });

  } catch (error) {

    console.error(
      "\n❌ BOOKING ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to create booking",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE BOOKING STATUS
// ADMIN APPROVE / REJECT
// ==========================================

app.put(
  "/api/bookings/:bookingId/status",
  async (req, res) => {

    try {

      const { bookingId } = req.params;

      const { status } = req.body;

      if (
        !["approved", "rejected"].includes(status)
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Status must be approved or rejected",
        });
      }

      const booking =
        await Booking.findByIdAndUpdate(

          bookingId,

          {
            status,

            adminApprovedAt:
              status === "approved"
                ? new Date()
                : null,
          },

          {
            new: true,
          }
        );

      if (!booking) {

        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      console.log(
        `✅ Booking ${bookingId} → ${status}`
      );

      res.json({
        success: true,
        message:
          `Booking ${status} successfully`,
        booking,
      });

    } catch (error) {

      console.error(
        "❌ Status Update Error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Unable to update booking",
      });
    }
  }
);

// ==========================================
// MARK EQUIPMENT AS RETURNED
// ==========================================

app.put(
  "/api/bookings/:bookingId/items/:itemIndex/return",
  async (req, res) => {

    try {

      const { bookingId, itemIndex } =
        req.params;

      const booking =
        await Booking.findById(bookingId);

      if (!booking) {

        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      const item =
        booking.additionalItems[
          Number(itemIndex)
        ];

      if (!item) {

        return res.status(404).json({
          success: false,
          message: "Equipment not found",
        });
      }

      item.returned = true;

      item.returnedAt = new Date();

      await booking.save();

      console.log(
        `✅ Equipment returned: ${item.name}`
      );

      res.json({
        success: true,
        message:
          "Equipment marked as returned",
        booking,
      });

    } catch (error) {

      console.error(
        "❌ Equipment Return Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to mark equipment as returned",
      });
    }
  }
);

// ==========================================
// DELETE ALL BOOKINGS
// DEVELOPMENT ONLY
// ==========================================

app.delete("/api/bookings", async (req, res) => {

  try {

    await Booking.deleteMany({});

    console.log("🗑️ All bookings deleted");

    res.json({
      success: true,
      message:
        "All bookings deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Unable to delete bookings",
    });
  }
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "✅ MongoDB Connected Successfully"
    );

    app.listen(PORT, () => {

      console.log(
        `🚀 CampusFlow Backend running on port ${PORT}`
      );

      console.log(
        `📍 http://localhost:${PORT}`
      );

      console.log(
        "📩 Booking API: POST /api/bookings"
      );
    });

  } catch (error) {

    console.error(
      "❌ MongoDB Connection Error:",
      error.message
    );

    process.exit(1);
  }
};

startServer();