import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import FormDefinition from "@/models/FormDefinition";
import FormSubmission from "@/models/FormSubmission";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [totalPages, totalForms, totalSubmissions, recentSubmissions] = await Promise.all([
      PageContent.countDocuments(),
      FormDefinition.countDocuments(),
      FormSubmission.countDocuments(),
      FormSubmission.find().sort({ createdAt: -1 }).limit(5),
    ]);

    return NextResponse.json({
      stats: [
        { name: "Total Pages", value: totalPages.toString(), change: "+0", color: "blue" },
        { name: "Form Submissions", value: totalSubmissions.toString(), change: `+${recentSubmissions.length}`, color: "red" },
        { name: "Site Visits", value: "12k", change: "+15%", color: "green" }, // Placeholder for real analytics
        { name: "Active Forms", value: totalForms.toString(), change: "+0", color: "purple" },
      ],
      recentSubmissions,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
