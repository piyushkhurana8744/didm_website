import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import { NextResponse } from "next/server";

// GET all page content or specific page by query
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");

    await connectDB();

    if (path) {
      const content = await PageContent.findOne({ pagePath: path });
      return NextResponse.json(content || { sections: [] });
    }

    const allContent = await PageContent.find({});
    return NextResponse.json(allContent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST/PUT to update page content (Admin Only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { pagePath, pageName, sections, seo } = body;

    if (!pagePath || !pageName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const updatedContent = await PageContent.findOneAndUpdate(
      { pagePath },
      { pageName, sections, seo },
      { upsert: true, new: true }
    );

    return NextResponse.json(updatedContent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
