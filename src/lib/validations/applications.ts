import { z } from "zod";

// Format validators for social/contact fields
const phoneSchema = z
  .string()
  .regex(/^\d{10}$/, "Must be 10 digits (e.g. 3001234567)")
  .or(z.literal(""))
  .optional();

const linkedinSchema = z
  .string()
  .regex(
    /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/,
    "Must be a valid LinkedIn URL (e.g. https://linkedin.com/in/yourprofile)"
  )
  .or(z.literal(""))
  .optional();

const twitterSchema = z
  .string()
  .regex(/^@?[\w]{1,15}$/, "Invalid handle (e.g. @yourhandle)")
  .or(z.literal(""))
  .optional();

const instagramSchema = z
  .string()
  .regex(/^@?[\w.]{1,30}$/, "Invalid handle (e.g. @yourhandle)")
  .or(z.literal(""))
  .optional();

// Shared fields for both mentor and judge applications
const baseSchema = z
  .object({
    full_name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: phoneSchema,
    linkedin: linkedinSchema,
    twitter: twitterSchema,
    instagram: instagramSchema,
    city: z.enum(["medellin", "bogota", "both"]),
    availability: z.string().min(10, "Please describe your availability (at least 10 characters)"),
  })
  .refine(
    (data) => {
      const filled = [data.phone, data.linkedin, data.twitter, data.instagram].filter(
        (v) => v && v.trim() !== ""
      );
      return filled.length >= 2;
    },
    {
      message: "Please fill in at least 2 of: Phone, LinkedIn, Twitter, Instagram",
      path: ["phone"],
    }
  );

// Mentor application schema
export const mentorSchema = baseSchema.and(
  z.object({
    role: z.literal("mentor"),
    mentor_primary_skills: z
      .string()
      .min(10, "Please describe your primary skills (at least 10 characters)"),
    mentor_monad_experience: z.boolean(),
    mentor_monad_experience_details: z.string().optional(),
    mentor_blockchain_experience: z
      .string()
      .min(10, "Please describe your blockchain experience (at least 10 characters)"),
    mentor_non_technical_skills: z.string().optional(),
    mentor_previous_experience: z.boolean(),
    mentor_previous_details: z.string().optional(),
    mentor_bio: z
      .string()
      .min(50, "Bio must be at least 50 characters")
      .max(500, "Bio must be at most 500 characters"),
    mentor_why: z
      .string()
      .min(20, "Please tell us why you want to mentor (at least 20 characters)"),
    mentor_team_commitment: z.enum(["1-2", "3-5", "5+", "flexible"]),
  })
);

// Judge application schema
export const judgeSchema = baseSchema.and(
  z.object({
    role: z.literal("judge"),
    judge_current_role: z
      .string()
      .min(5, "Please provide your current role (at least 5 characters)"),
    judge_years_blockchain: z
      .number()
      .min(0, "Years must be at least 0")
      .max(50, "Years must be less than 50"),
    judge_years_total: z
      .number()
      .min(0, "Years must be at least 0")
      .max(70, "Years must be less than 70"),
    judge_bio: z
      .string()
      .min(100, "Bio must be at least 100 characters")
      .max(800, "Bio must be at most 800 characters"),
    judge_technical_level: z.enum(["highly_technical", "moderate", "business_focused"]),
    judge_expertise_areas: z.array(z.string()).min(1, "Please select at least one expertise area"),
    judge_specific_experience: z
      .array(z.string())
      .min(1, "Please select at least one specific experience"),
    judge_previous_experience: z.boolean(),
    judge_previous_details: z.string().optional(),
    judge_criteria_ranking: z.record(z.string(), z.number()),
    judge_conflicts: z.string(),
    judge_other_conflicts: z.string().optional(),
    judge_why: z.string().min(20, "Please tell us why you want to judge (at least 20 characters)"),
  })
);

// Inferred types
export type MentorApplication = z.infer<typeof mentorSchema>;
export type JudgeApplication = z.infer<typeof judgeSchema>;
export type Application = MentorApplication | JudgeApplication;
