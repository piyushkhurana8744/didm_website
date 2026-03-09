import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pagePath, sections, seo } = await req.json();

    if (!pagePath) {
      return NextResponse.json({ error: "Missing pagePath" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src/data/initial-content.json");
    
    // Read existing content
    let initialContent: Record<string, any> = {};
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      initialContent = JSON.parse(fileData);
    }

    // Update with new data
    initialContent[pagePath] = {
      sections,
      seo
    };

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(initialContent, null, 2), "utf8");

    return NextResponse.json({ success: true, message: `Initial content for ${pagePath} updated successfully.` });
  } catch (error: any) {
    console.error("Error updating seed data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
