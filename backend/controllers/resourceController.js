import Resource from "../models/Resource.js";


/* =========================
   GET ALL RESOURCES
========================= */

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({
      createdAt: -1,
    });

    res.json(resources);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* =========================
   ADD RESOURCE
========================= */

export const createResource = async (req, res) => {
  try {
    const {
      name,
      type,
      location,
      capacity,
      facilities,
      status,
    } = req.body;

    const resource = await Resource.create({
      name,
      type,
      location,
      capacity,
      facilities,
      status,
    });

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* =========================
   UPDATE RESOURCE
========================= */

export const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found.",
      });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* =========================
   DELETE RESOURCE
========================= */

export const deleteResource = async (req, res) => {
  try {
    const resource =
      await Resource.findByIdAndDelete(req.params.id);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found.",
      });
    }

    res.json({
      message: "Resource deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};