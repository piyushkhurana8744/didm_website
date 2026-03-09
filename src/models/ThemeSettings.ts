import mongoose from "mongoose";

const ThemeSettingsSchema = new mongoose.Schema({
  primaryColor: { type: String, default: "#be1e2e" },
  secondaryColor: { type: String, default: "#000000" },
  accentColor: { type: String, default: "#be1e2e" },
  fontFamily: { type: String, default: "Outfit" },
  darkMode: { type: Boolean, default: true },
  logoUrl: String,
  faviconUrl: String,
  customCss: String,
}, { timestamps: true });

export default mongoose.models.ThemeSettings || mongoose.model("ThemeSettings", ThemeSettingsSchema);
