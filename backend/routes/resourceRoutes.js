import express from "express";

import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();


router.get("/", protect, getResources);


router.post(
  "/",
  protect,
  adminOnly,
  createResource
);


router.put(
  "/:id",
  protect,
  adminOnly,
  updateResource
);


router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteResource
);


export default router;