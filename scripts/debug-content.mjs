import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/online_strikers";

async function checkContent() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const PageContentSchema = new mongoose.Schema({
            pagePath: String,
            sections: [mongoose.Schema.Types.Mixed],
        }, { strict: false });

        const PageContent = mongoose.models.PageContent || mongoose.model("PageContent", PageContentSchema);

        const teamContent = await PageContent.findOne({ pagePath: "/team" });
        console.log("Team Page Content in DB:");
        console.log(JSON.stringify(teamContent, null, 2));

        process.exit(0);
    } catch (error) {
        console.error("Error checking content:", error);
        process.exit(1);
    }
}

checkContent();
