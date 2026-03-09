import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/online_strikers";

// Define models locally for the script to avoid import issues
const SectionSchema = new mongoose.Schema({
    sectionId: { type: String, required: true },
    title: String,
    subtitle: String,
    content: String,
    imageUrl: String,
    type: String,
    ctaText: String,
    ctaLink: String,
    reasons: [mongoose.Schema.Types.Mixed],
    steps: [mongoose.Schema.Types.Mixed],
    items: [mongoose.Schema.Types.Mixed],
    posts: [mongoose.Schema.Types.Mixed],
    portfolioItems: [mongoose.Schema.Types.Mixed],
    services: [mongoose.Schema.Types.Mixed],
    stats: [mongoose.Schema.Types.Mixed],
    teamMembers: [mongoose.Schema.Types.Mixed],
}, { strict: false });

const PageContentSchema = new mongoose.Schema({
    pagePath: { type: String, required: true, unique: true },
    pageName: { type: String, required: true },
    sections: [SectionSchema],
    seo: {
        title: String,
        description: String,
        keywords: [String],
    },
}, { timestamps: true });

const PageContent = mongoose.models.PageContent || mongoose.model("PageContent", PageContentSchema);

async function seedContent() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const filePath = path.join(__dirname, "../src/data/initial-content.json");
        if (!fs.existsSync(filePath)) {
            console.error("Seed data file not found:", filePath);
            process.exit(1);
        }

        const initialData = JSON.parse(fs.readFileSync(filePath, "utf8"));

        // Define page names mapping (since JSON only has path/sections/seo)
        const pageNames = {
            "/": "Home Page",
            "/about": "About Us",
            "/services": "Services",
            "/portfolio": "Portfolio",
            "/team": "Team",
            "/faq": "FAQ",
            "/contact": "Contact"
        };

        for (const [pagePath, data] of Object.entries(initialData)) {
            const pageName = pageNames[pagePath] || "Unknown Page";
            await PageContent.findOneAndUpdate(
                { pagePath },
                {
                    pagePath,
                    pageName,
                    sections: data.sections,
                    seo: data.seo
                },
                { upsert: true, new: true }
            );
            console.log(`Seeded: ${pageName} (${pagePath})`);
        }

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding content:", error);
        process.exit(1);
    }
}

seedContent();
