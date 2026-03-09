import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo",
  api_key: process.env.CLOUDINARY_API_KEY || "demo",
  api_secret: process.env.CLOUDINARY_API_SECRET || "demo",
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { timestamp, upload_preset } = await req.json();

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        upload_preset: upload_preset || "didm_preset",
      },
      process.env.CLOUDINARY_API_SECRET || "demo"
    );

    return NextResponse.json({ 
      signature, 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo",
      api_key: process.env.CLOUDINARY_API_KEY || "demo"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
