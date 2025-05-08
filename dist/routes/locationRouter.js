"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_1 = __importDefault(require("../models/location"));
const locationRouter = express_1.default.Router();
// POST /locations - Add new location
locationRouter.post("/", async (req, res) => {
    try {
        const { name, lat, lng, type } = req.body;
        // Check if the location already exists
        const existingLocation = await location_1.default.findOne({ name });
        if (existingLocation) {
            return res.status(400).json({
                success: false,
                message: "Location already exists",
            });
        }
        // If it doesn't exist, create the new location
        const location = new location_1.default({ name, lat, lng, type });
        const saved = await location.save();
        res.status(201).json({
            success: true,
            message: "Location created successfully",
            location: saved,
        });
    }
    catch (err) {
        console.error("Error creating location:", err);
        res.status(500).json({ error: "Failed to create location" });
    }
});
// Get all locations
locationRouter.get("/", async (_req, res) => {
    try {
        const locations = await location_1.default.find();
        res.json(locations);
    }
    catch (err) {
        console.error("Error fetching locations:", err);
        res.status(500).json({ error: "Failed to fetch locations" });
    }
});
exports.default = locationRouter;
