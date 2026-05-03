import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Simple password check
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { status, reviewer_notes } = body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("applications")
      .update({
        status,
        reviewer_notes,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    // Log notification email (for MVP - replace with actual email service later)
    if (status === "approved" || status === "rejected") {
      console.log("📧 Notification email would be sent to:", data.email);
      console.log(
        `Subject: MonadBlitz Application ${status === "approved" ? "Approved" : "Update"}`
      );
      console.log(
        status === "approved"
          ? "Body: Congratulations! Your application has been approved."
          : "Body: Thank you for your interest. We'll keep your application on file for future events."
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}
