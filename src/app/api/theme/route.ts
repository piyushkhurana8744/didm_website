import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import ThemeSettings from "@/models/ThemeSettings";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    try {
      await connectDB();
      let theme = await ThemeSettings.findOne({});
      if (!theme) {
        theme = await ThemeSettings.create({});
      }
      return NextResponse.json(theme);
    } catch (dbError) {
      console.error("Theme API: Database connection failed, returning default theme");
      return NextResponse.json({
        primaryColor: "#be1e2e",
        accentColor: "#be1e2e",
        darkMode: true,
        customCss: ""
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const updatedTheme = await ThemeSettings.findOneAndUpdate(
      {},
      { ...body },
      { upsert: true, new: true }
    );

    return NextResponse.json(updatedTheme);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
