import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    facilities: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "OCCUPIED", "MAINTENANCE"],
      default: "AVAILABLE",
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model(
  "Resource",
  resourceSchema
);

export default Resource;