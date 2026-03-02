import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/online_strikers";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const adminEmail = "admin@onlinestrikers.com";
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin user already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin123", 12);
        const newAdmin = new User({
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
        });

        await newAdmin.save();
        console.log("Admin user created successfully!");
        console.log("Email: " + adminEmail);
        console.log("Password: admin123");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
}

seedAdmin();
