"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mentorSchema, type MentorApplication } from "@/lib/validations/applications";
import { FormField } from "@/components/forms/FormField";
import { FormSelect } from "@/components/forms/FormSelect";
import { FormTextarea } from "@/components/forms/FormTextarea";
import { FormCheckbox } from "@/components/forms/FormCheckbox";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MentorApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MentorApplication>({
    resolver: zodResolver(mentorSchema),
    defaultValues: {
      role: "mentor",
      mentor_monad_experience: false,
      mentor_previous_experience: false,
    },
  });

  const watchMonadExperience = watch("mentor_monad_experience");
  const watchPreviousExperience = watch("mentor_previous_experience");
  const watchBio = watch("mentor_bio");

  const onSubmit = async (data: MentorApplication) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit application");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert(error instanceof Error ? error.message : "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-monad-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-monad-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-monad-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
          <p className="text-white/70 mb-6">
            Thank you for applying to be a mentor. We&apos;ll review your application and get back
            to you soon.
          </p>
          <Link
            href="/"
            className="inline-block bg-monad-primary text-white px-6 py-3 rounded-full font-mono uppercase tracking-wide hover:brightness-110 transition-all"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-monad-dark py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Mentor Application</h1>
            <p className="text-white/70 text-lg">
              Help shape the next generation of blockchain builders in Colombia
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6"
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Basic Information
              </h2>

              <FormField
                label="Full Name"
                required
                {...register("full_name")}
                error={errors.full_name?.message}
                placeholder="Juan Pérez"
              />

              <FormField
                label="Email"
                type="email"
                required
                {...register("email")}
                error={errors.email?.message}
                placeholder="juan@example.com"
              />

              <p className="text-sm text-white/50">Fill at least 2 of the following 4 fields</p>

              <FormField
                label="Phone"
                type="tel"
                {...register("phone")}
                error={errors.phone?.message}
                placeholder="3001234567"
              />

              <FormField
                label="LinkedIn Profile"
                {...register("linkedin")}
                error={errors.linkedin?.message}
                placeholder="https://linkedin.com/in/monadcolombia"
              />

              <FormField
                label="Twitter/X Handle"
                {...register("twitter")}
                error={errors.twitter?.message}
                placeholder="@monadcolombia"
              />

              <FormField
                label="Instagram Handle"
                {...register("instagram")}
                error={errors.instagram?.message}
                placeholder="@monadcolombia"
              />
            </div>

            {/* Availability */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Availability
              </h2>

              <FormSelect
                label="Which city can you attend?"
                required
                {...register("city")}
                error={errors.city?.message}
                options={[
                  { value: "medellin", label: "Medellín (June 6, 2026)" },
                  { value: "bogota", label: "Bogotá (July 4, 2026)" },
                  { value: "both", label: "Both cities" },
                ]}
              />

              <FormTextarea
                label="Availability during hackathon"
                required
                {...register("availability")}
                error={errors.availability?.message}
                placeholder="Describe when you'll be available (e.g., full event, specific days/hours)"
              />
            </div>

            {/* Expertise */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Expertise
              </h2>

              <FormTextarea
                label="Primary technical skills"
                required
                {...register("mentor_primary_skills")}
                error={errors.mentor_primary_skills?.message}
                placeholder="e.g., Solidity, Rust, Frontend, Backend, Smart Contracts"
              />

              <FormCheckbox
                label="I have experience with Monad or EVM development"
                {...register("mentor_monad_experience")}
              />

              {watchMonadExperience && (
                <FormTextarea
                  label="Tell us about your Monad/EVM experience"
                  {...register("mentor_monad_experience_details")}
                  error={errors.mentor_monad_experience_details?.message}
                  placeholder="Describe your experience with Monad or EVM chains"
                />
              )}

              <FormTextarea
                label="Other blockchain experience"
                required
                {...register("mentor_blockchain_experience")}
                error={errors.mentor_blockchain_experience?.message}
                placeholder="Describe your experience with other blockchains and projects"
              />

              <FormTextarea
                label="Non-technical skills (optional)"
                {...register("mentor_non_technical_skills")}
                error={errors.mentor_non_technical_skills?.message}
                placeholder="e.g., UX/UI, Pitching, Business model, Marketing"
              />
            </div>

            {/* Experience */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Mentoring Experience
              </h2>

              <FormCheckbox
                label="I have mentored at hackathons before"
                {...register("mentor_previous_experience")}
              />

              {watchPreviousExperience && (
                <FormTextarea
                  label="Tell us about your previous mentoring experience"
                  {...register("mentor_previous_details")}
                  error={errors.mentor_previous_details?.message}
                  placeholder="Which hackathons? How many teams?"
                />
              )}

              <FormTextarea
                label="Brief bio"
                required
                {...register("mentor_bio")}
                error={errors.mentor_bio?.message}
                placeholder="Tell us about your background (50-500 characters)"
                maxLength={500}
                showCount
                currentLength={watchBio?.length}
              />
            </div>

            {/* Commitment */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Commitment
              </h2>

              <FormTextarea
                label="Why do you want to mentor at MonadBlitz?"
                required
                {...register("mentor_why")}
                error={errors.mentor_why?.message}
                placeholder="Share your motivation for mentoring"
              />

              <FormSelect
                label="How many teams can you commit to helping?"
                required
                {...register("mentor_team_commitment")}
                error={errors.mentor_team_commitment?.message}
                options={[
                  { value: "1-2", label: "1-2 teams" },
                  { value: "3-5", label: "3-5 teams" },
                  { value: "5+", label: "5+ teams" },
                  { value: "flexible", label: "Flexible" },
                ]}
              />
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-monad-primary text-white font-bold px-8 py-4 rounded-full font-mono uppercase tracking-wide hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
