"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const routeSchema = new mongoose_1.default.Schema({
    from: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    to: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Location", required: true },
    distance: Number, // in meters
    duration: Number, // in minutes
    mode: { type: String, enum: ["bus", "keke", "bike", "walk"], default: "bus" },
    roadType: String,
});
exports.default = mongoose_1.default.model("Route", routeSchema);
