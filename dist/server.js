"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = __importDefault(require("./db/mongo"));
const locationRouter_1 = __importDefault(require("./routes/locationRouter"));
const routeRouter_1 = __importDefault(require("./routes/routeRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB before starting the server
(0, mongo_1.default)()
    .then(() => {
    console.log("✅ MongoDB connection successful");
    // Middleware
    app.use((0, morgan_1.default)("dev"));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    // Routes
    app.use("/locations", locationRouter_1.default);
    app.use("/routes", routeRouter_1.default);
    // Home route
    app.get("/", (req, res) => {
        res.send("Welcome to lagos guide backend");
    });
    // 404 Error Handling
    app.use((req, res, next) => {
        res.status(404).send("Route not found!");
    });
    // Global Error Handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    });
    // Start the server
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("MongoDB connection failed:", err);
});
