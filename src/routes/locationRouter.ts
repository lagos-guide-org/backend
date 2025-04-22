import express, { Request, Response } from "express";
import Location from "../models/location";

const locationRouter = express.Router();

// POST /locations - Add new location
locationRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, lat, lng, type } = req.body;

    // Check if the location already exists
    const existingLocation = await Location.findOne({ name });

    if (existingLocation) {
      return res.status(400).json({
        success: false,
        message: "Location already exists",
      });
    }

    // If it doesn't exist, create the new location
    const location = new Location({ name, lat, lng, type });
    const saved = await location.save();

    res.status(201).json({
      success: true,
      message: "Location created successfully",
      location: saved,
    });
  } catch (err) {
    console.error("Error creating location:", err);
    res.status(500).json({ error: "Failed to create location" });
  }
});

// Get all locations
locationRouter.get("/", async (_req: Request, res: Response): Promise<any> => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

export default locationRouter;
