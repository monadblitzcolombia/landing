"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { judgeSchema, type JudgeApplication } from "@/lib/validations/applications";
import { FormField } from "@/components/forms/FormField";
import { FormSelect } from "@/components/forms/FormSelect";
import { FormTextarea } from "@/components/forms/FormTextarea";
import { FormCheckbox } from "@/components/forms/FormCheckbox";
import { motion } from "framer-motion";
import Link from "next/link";

const EXPERTISE_AREAS = [
  "DeFi",
  "NFTs",
  "Infrastructure",
  "Gaming",
  "Social",
  "Developer Tools",
  "Other",
];

const SPECIFIC_EXPERIENCES = ["Monad", "EVM chains", "Other L1s", "L2s", "Cross-chain"];

const JUDGING_CRITERIA = [
  { key: "innovation", label: "Innovation" },
  { key: "technical", label: "Technical Execution" },
  { key: "team", label: "Team" },
  { key: "market", label: "Market Potential" },
  { key: "ux", label: "UX/UI" },
];

export default function JudgeApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<JudgeApplication>({
    resolver: zodResolver(judgeSchema),
    defaultValues: {
      role: "judge",
      judge_previous_experience: false,
      judge_expertise_areas: [],
      judge_specific_experience: [],
      judge_criteria_ranking: {},
    },
  });

  const watchPreviousExperience = watch("judge_previous_experience");
  const watchBio = watch("judge_bio");

  const onSubmit = async (data: JudgeApplication) => {
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
            Thank you for applying to be a judge. We&apos;ll review your application and get back to
            you soon.
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Judge Application</h1>
            <p className="text-white/70 text-lg">
              Help evaluate and recognize exceptional blockchain projects in Colombia
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

              <FormField
                label="Phone"
                type="tel"
                {...register("phone")}
                error={errors.phone?.message}
                placeholder="+57 300 123 4567"
              />

              <FormField
                label="LinkedIn Profile"
                required
                {...register("linkedin")}
                error={errors.linkedin?.message}
                placeholder="https://linkedin.com/in/yourprofile"
              />

              <FormField
                label="Twitter/X Handle"
                {...register("twitter")}
                error={errors.twitter?.message}
                placeholder="@yourhandle"
              />

              <FormField
                label="Instagram Handle"
                {...register("instagram")}
                error={errors.instagram?.message}
                placeholder="@yourhandle"
              />
            </div>

            {/* Availability */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Availability
              </h2>

              <FormSelect
                label="Which event can you judge?"
                required
                {...register("city")}
                error={errors.city?.message}
                options={[
                  { value: "medellin", label: "Medellín (June 6, 2026)" },
                  { value: "bogota", label: "Bogotá (July 4, 2026)" },
                  { value: "both", label: "Both events" },
                ]}
              />

              <FormTextarea
                label="Availability during event"
                required
                {...register("availability")}
                error={errors.availability?.message}
                placeholder="Can you attend final presentations? Estimated time available?"
              />
            </div>

            {/* Professional Background */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Professional Background
              </h2>

              <FormField
                label="Current role and company"
                required
                {...register("judge_current_role")}
                error={errors.judge_current_role?.message}
                placeholder="e.g., Lead Developer at Monad Labs"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Years of blockchain/Web3 experience"
                  type="number"
                  required
                  {...register("judge_years_blockchain", { valueAsNumber: true })}
                  error={errors.judge_years_blockchain?.message}
                  placeholder="5"
                />

                <FormField
                  label="Years of total tech/business experience"
                  type="number"
                  required
                  {...register("judge_years_total", { valueAsNumber: true })}
                  error={errors.judge_years_total?.message}
                  placeholder="10"
                />
              </div>

              <FormTextarea
                label="Professional bio"
                required
                {...register("judge_bio")}
                error={errors.judge_bio?.message}
                placeholder="Tell us about your background (100-800 characters)"
                maxLength={800}
                showCount
                currentLength={watchBio?.length}
              />
            </div>

            {/* Expertise */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Expertise & Focus Areas
              </h2>

              <FormSelect
                label="Technical expertise level"
                required
                {...register("judge_technical_level")}
                error={errors.judge_technical_level?.message}
                options={[
                  { value: "highly_technical", label: "Highly Technical" },
                  { value: "moderate", label: "Moderate" },
                  { value: "business_focused", label: "Business Focused" },
                ]}
              />

              <Controller
                name="judge_expertise_areas"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="block text-sm font-mono uppercase tracking-wide text-white/90">
                      Areas of expertise
                      <span className="text-monad-primary ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {EXPERTISE_AREAS.map((area) => (
                        <label key={area} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            value={area}
                            checked={field.value?.includes(area)}
                            onChange={(e) => {
                              const updatedValue = e.target.checked
                                ? [...(field.value || []), area]
                                : (field.value || []).filter((v) => v !== area);
                              field.onChange(updatedValue);
                            }}
                            className="w-4 h-4 rounded bg-white/5 border border-white/10 checked:bg-monad-primary checked:border-monad-primary"
                          />
                          <span className="text-sm text-white/80">{area}</span>
                        </label>
                      ))}
                    </div>
                    {errors.judge_expertise_areas && (
                      <p className="text-red-500 text-sm">{errors.judge_expertise_areas.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="judge_specific_experience"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="block text-sm font-mono uppercase tracking-wide text-white/90">
                      Specific experience with
                      <span className="text-monad-primary ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {SPECIFIC_EXPERIENCES.map((exp) => (
                        <label key={exp} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            value={exp}
                            checked={field.value?.includes(exp)}
                            onChange={(e) => {
                              const updatedValue = e.target.checked
                                ? [...(field.value || []), exp]
                                : (field.value || []).filter((v) => v !== exp);
                              field.onChange(updatedValue);
                            }}
                            className="w-4 h-4 rounded bg-white/5 border border-white/10 checked:bg-monad-primary checked:border-monad-primary"
                          />
                          <span className="text-sm text-white/80">{exp}</span>
                        </label>
                      ))}
                    </div>
                    {errors.judge_specific_experience && (
                      <p className="text-red-500 text-sm">
                        {errors.judge_specific_experience.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Judging Experience */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Judging Experience
              </h2>

              <FormCheckbox
                label="I have judged hackathons before"
                {...register("judge_previous_experience")}
              />

              {watchPreviousExperience && (
                <FormTextarea
                  label="Tell us about your previous judging experience"
                  {...register("judge_previous_details")}
                  error={errors.judge_previous_details?.message}
                  placeholder="Which hackathons? How many?"
                />
              )}

              <Controller
                name="judge_criteria_ranking"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="block text-sm font-mono uppercase tracking-wide text-white/90">
                      Rank judging criteria by importance (1-5)
                      <span className="text-monad-primary ml-1">*</span>
                    </label>
                    <p className="text-xs text-white/50 mb-3">
                      1 = Most Important, 5 = Least Important
                    </p>
                    <div className="space-y-3">
                      {JUDGING_CRITERIA.map((criterion) => (
                        <div key={criterion.key} className="flex items-center justify-between">
                          <span className="text-white/80">{criterion.label}</span>
                          <select
                            value={(field.value as Record<string, number>)?.[criterion.key] || ""}
                            onChange={(e) => {
                              field.onChange({
                                ...(field.value as object),
                                [criterion.key]: Number(e.target.value),
                              });
                            }}
                            className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-monad-primary"
                          >
                            <option value="">-</option>
                            {[1, 2, 3, 4, 5].map((rank) => (
                              <option key={rank} value={rank}>
                                {rank}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
            </div>

            {/* Conflicts of Interest */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Conflicts of Interest
              </h2>

              <FormTextarea
                label="Are you affiliated with any projects planning to participate?"
                required
                {...register("judge_conflicts")}
                error={errors.judge_conflicts?.message}
                placeholder="If yes, please provide details. If no, write 'None'."
              />

              <FormTextarea
                label="Any other potential conflicts?"
                {...register("judge_other_conflicts")}
                error={errors.judge_other_conflicts?.message}
                placeholder="Optional"
              />
            </div>

            {/* Motivation */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Motivation
              </h2>

              <FormTextarea
                label="Why do you want to judge MonadBlitz?"
                required
                {...register("judge_why")}
                error={errors.judge_why?.message}
                placeholder="Share your motivation for judging"
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
