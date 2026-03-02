import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import FormDefinition from "@/models/FormDefinition";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    await connectDB();

    if (slug) {
      const form = await FormDefinition.findOne({ slug });
      return NextResponse.json(form);
    }

    const allForms = await FormDefinition.find({});
    return NextResponse.json(allForms);
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
    const { name, slug, fields, submitButtonText, successMessage, recipientEmail } = body;

    await connectDB();

    const updatedForm = await FormDefinition.findOneAndUpdate(
      { slug },
      { name, fields, submitButtonText, successMessage, recipientEmail },
      { upsert: true, new: true }
    );

    return NextResponse.json(updatedForm);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    await connectDB();
    await FormDefinition.findOneAndDelete({ slug });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
