import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, default: "image" },
  size: { type: Number },
  format: { type: String },
  dimensions: {
    width: { type: Number },
    height: { type: Number },
  },
}, { timestamps: true });

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
