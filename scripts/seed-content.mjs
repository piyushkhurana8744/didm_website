import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
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
    type: String, // Added type back as it was in initial data
});

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

const initialData = [
    {
        pagePath: "/",
        pageName: "Home Page",
        sections: [
            {
                sectionId: "hero",
                title: "BEING ONE OF THE BEST SEO AGENCIES",
                subtitle: "A digital marketing agency that helps you grow your business",
                content: "We provide the best SEO services to help you rank higher on search engines and get more traffic to your website.",
                type: "hero"
            },
            {
                sectionId: "stats",
                title: "Our Success Stories",
                content: "200M+ RevenueGenerated, 500+ Expert Employees, 10+ Years Experience",
                type: "stats"
            }
        ]
    },
    {
        pagePath: "/about",
        pageName: "About Us",
        sections: [
            {
                sectionId: "hero",
                title: "ABOUT OUR AGENCY",
                subtitle: "We are a team of experts dedicated to your success",
                content: "Online Strikers is a leading digital marketing agency with a passion for helping businesses thrive in the digital landscape.",
                type: "hero"
            }
        ]
    }
];

async function seedContent() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        for (const data of initialData) {
            await PageContent.findOneAndUpdate(
                { pagePath: data.pagePath },
                data,
                { upsert: true, new: true }
            );
            console.log(`Seeded: ${data.pageName}`);
        }

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding content:", error);
        process.exit(1);
    }
}

seedContent();
