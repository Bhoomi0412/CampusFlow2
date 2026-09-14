import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";


dotenv.config();


/* CONNECT DATABASE */

connectDB();


const app = express();


/* MIDDLEWARE */

app.use(cors());

app.use(express.json());


/* TEST ROUTE */

app.get("/", (req, res) => {
  res.json({
    message: "CampusFlow Backend is Running 🚀",
  });
});


/* ROUTES */

app.use("/api/auth", authRoutes);

app.use("/api/resources", resourceRoutes);

app.use("/api/bookings", bookingRoutes);


/* ERROR HANDLER */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});


/* SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});