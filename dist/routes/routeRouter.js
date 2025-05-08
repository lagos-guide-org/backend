"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("../models/route"));
const location_1 = __importDefault(require("../models/location"));
const routeRouter = express_1.default.Router();
// POST /routes - Add new route
routeRouter.post("/", async (req, res) => {
    try {
        const { fromName, toName, distance, duration, roadType, mode } = req.body;
        // Find locations by name
        const fromLoc = await location_1.default.findOne({ name: fromName });
        const toLoc = await location_1.default.findOne({ name: toName });
        if (!fromLoc || !toLoc) {
            return res.status(400).json({
                success: false,
                message: "Invalid location name(s)",
            });
        }
        // Create the route
        const route = new route_1.default({
            from: fromLoc?._id,
            to: toLoc?._id,
            distance,
            duration,
            roadType,
            mode,
        });
        const saved = await route.save();
        res.status(201).json({
            success: true,
            message: "Route created successfully",
            route: saved,
        });
    }
    catch (err) {
        console.error("Error creating route:", err);
        res.status(500).json({ error: "Failed to create route" });
    }
});
// Get all routes
routeRouter.get("/", async (_req, res) => {
    try {
        const routes = await route_1.default.find().populate("from").populate("to");
        res.json(routes);
    }
    catch (err) {
        console.error("Error fetching routes:", err);
        res.status(500).json({ error: "Failed to fetch routes" });
    }
});
// direction
routeRouter.get("/path", async (req, res) => {
    const { from, to } = req.query;
    if (!from || !to) {
        return res.status(400).json({ error: "Both 'from' and 'to' are required" });
    }
    try {
        const start = await location_1.default.findOne({ name: from });
        const end = await location_1.default.findOne({ name: to });
        if (!start || !end) {
            return res.status(404).json({ error: "Start or end location not found" });
        }
        const routes = await route_1.default.find().populate("from").populate("to");
        // Build graph
        const graph = new Map();
        routes.forEach((r) => {
            const fromId = r.from._id.toString();
            const toId = r.to._id.toString();
            if (!graph.has(fromId))
                graph.set(fromId, []);
            graph.get(fromId).push({ route: r, next: toId });
        });
        // BFS
        const queue = [{ current: start?._id.toString(), path: [] }];
        const visited = new Set();
        while (queue.length > 0) {
            const { current, path } = queue.shift();
            if (visited.has(current))
                continue;
            visited.add(current);
            if (current === end?._id.toString()) {
                return res.json({
                    success: true,
                    message: "Route found",
                    steps: path,
                });
            }
            const neighbors = graph.get(current) || [];
            for (const { route, next } of neighbors) {
                queue.push({ current: next, path: [...path, route] });
            }
        }
        res.status(404).json({ success: false, message: "No path found" });
    }
    catch (err) {
        console.error("Error finding path:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = routeRouter;
