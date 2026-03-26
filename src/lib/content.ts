import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import fs from "fs/promises";
import path from "path";

export async function getPageContent(pagePath: string) {
  try {
    await connectDB();
    const content = await PageContent.findOne({ pagePath }).lean();
    if (content) return JSON.parse(JSON.stringify(content));
  } catch (dbError) {
    console.error(`Database error fetching ${pagePath}:`, dbError);
  }

  // Fallback to local JSON file
  try {
    const filePath = path.join(process.cwd(), "src/data/initial-content.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const initialContent = JSON.parse(fileData);
    return initialContent[pagePath] || { sections: [] };
  } catch (fsError) {
    console.error(`File fallback error fetching ${pagePath}:`, fsError);
    return { sections: [] };
  }
}
