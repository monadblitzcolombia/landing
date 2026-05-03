import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { mentorSchema, judgeSchema } from "@/lib/validations/applications";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate based on role
    const schema = body.role === "mentor" ? mentorSchema : judgeSchema;
    const validatedData = schema.parse(body);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Insert into database
    const { data, error } = await supabase
      .from("applications")
      .insert(validatedData)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    // Log confirmation email (for MVP - replace with actual email service later)
    console.log("📧 Confirmation email would be sent to:", validatedData.email);
    console.log(
      `Subject: MonadBlitz ${validatedData.role === "mentor" ? "Mentor" : "Judge"} Application Received`
    );
    console.log(
      "Body: Thank you for applying! We'll review your application and get back to you soon."
    );

    return NextResponse.json({
      success: true,
      data,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Application submission error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Failed to submit application" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
