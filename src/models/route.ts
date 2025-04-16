import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
  distance: Number, // in meters
  duration: Number, // in minutes
  mode: { type: String, enum: ["bus", "keke", "bike", "walk"], default: "bus" },
  roadType: String,
});

export default mongoose.model("Route", routeSchema);
