const mongoose = require("mongoose");

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
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
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

    additionalItems: {
      type: [
        {
          name: String,
          quantity: Number,
          returned: {
            type: Boolean,
            default: false,
          },
        },
      ],
      default: [],
    },

    returnDeadline: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "declined", "completed"],
      default: "pending",
    },

    userName: {
      type: String,
      default: "Student",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);