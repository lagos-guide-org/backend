import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  type: {
    type: String,
    enum: ["bus_stop", "junction", "landmark"],
    default: "bus_stop",
  },
});

export default mongoose.model("Location", locationSchema);
