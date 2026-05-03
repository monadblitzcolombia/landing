import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { status, reviewer_notes } = body;

    const data = await prisma.application.update({
      where: { id },
      data: {
        status,
        reviewerNotes: reviewer_notes,
        reviewedAt: new Date(),
      },
    });

    if (status === "approved" || status === "rejected") {
      console.log("Notification email would be sent to:", data.email);
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}
