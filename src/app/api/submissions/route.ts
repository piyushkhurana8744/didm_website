import connectDB from "@/lib/mongodb";
import FormSubmission from "@/models/FormSubmission";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formSlug, data } = body;

    if (!formSlug || !data) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await connectDB();

    const submission = await FormSubmission.create({
      formSlug,
      data,
      ip: req.headers.get("x-forwarded-for") || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({ message: "Submission successful", id: submission._id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
