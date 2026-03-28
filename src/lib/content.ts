import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import fs from "fs/promises";
import path from "path";

export async function getPageContent(pagePath: string) {
  // Bypassing DB connection for faster local/production load

  // Load from local JSON file
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
