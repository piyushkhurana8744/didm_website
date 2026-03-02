import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

async function checkAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const UserSchema = new mongoose.Schema({
            email: String,
            role: String,
        });
        const User = mongoose.models.User || mongoose.model("User", UserSchema);

        const admin = await User.findOne({ email: "admin@onlinestrikers.com" });
        if (admin) {
            console.log("Admin user found:", admin.email, "Role:", admin.role);
        } else {
            console.log("Admin user NOT found");
        }
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkAdmin();
