import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in .env.local");
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function resetAdmin() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log("Usage: node scripts/reset-admin.mjs <new_email> <new_password>");
        process.exit(1);
    }

    const [newEmail, newPassword] = args;

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Find the admin user (assuming there's only one or we're targeting the first one)
        const adminUser = await User.findOne({ role: "admin" });

        if (adminUser) {
            adminUser.email = newEmail;
            adminUser.password = hashedPassword;
            await adminUser.save();
            console.log("Admin account updated successfully!");
        } else {
            const newUser = new User({
                email: newEmail,
                password: hashedPassword,
                role: "admin",
            });
            await newUser.save();
            console.log("New admin account created successfully!");
        }

        console.log(`Email: ${newEmail}`);
        console.log(`Password: ${newPassword}`);

        process.exit(0);
    } catch (error) {
        console.error("Error resetting admin:", error);
        process.exit(1);
    }
}

resetAdmin();
