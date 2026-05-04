"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASING = [0.16, 1, 0.3, 1] as const;

interface TeamMember {
  id: string;
  role: "mentor" | "judge";
  fullName: string;
  city: string;
  mentorBio: string | null;
  mentorPrimarySkills: string[];
  judgeBio: string | null;
  judgeExpertiseAreas: string[];
  judgeCurrentRole: string | null;
  linkedin: string | null;
  twitter: string | null;
}

const ROLE_LABELS: Record<string, string> = {
  mentor: "Mentor",
  judge: "Jurado",
};

export default function EquipoPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((json) => setMembers(json.data || []))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  const mentors = members.filter((m) => m.role === "mentor");
  const judges = members.filter((m) => m.role === "judge");

  return (
    <div className="min-h-screen bg-monad-dark py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-block text-sm text-white/50 hover:text-white font-mono mb-8 transition-colors"
        >
          &larr; Volver al inicio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASING }}
        >
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[3px] text-white/40 mb-4">
            {"// EQUIPO"}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white mb-4">
            Mentores y Jurados
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mb-12">
            Las personas que guian y evaluan los proyectos en MonadBlitz Colombia.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-white/50 text-center py-16">Cargando...</p>
        ) : members.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/50 text-lg mb-2">Pronto anunciaremos el equipo</p>
            <p className="text-white/30 text-sm">
              Estamos revisando aplicaciones. Vuelve pronto para conocer a los mentores y jurados.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {mentors.length > 0 && <TeamSection title="Mentores" members={mentors} />}
            {judges.length > 0 && <TeamSection title="Jurados" members={judges} />}
          </div>
        )}
      </div>
    </div>
  );
}

function TeamSection({ title, members }: { title: string; members: TeamMember[] }) {
  return (
    <div>
      <h2 className="text-sm font-mono uppercase tracking-[3px] text-white/40 mb-6">
        {`// ${title}`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASING }}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-heading font-bold">{member.fullName}</h3>
                {member.role === "judge" && member.judgeCurrentRole && (
                  <p className="text-white/40 text-xs mt-0.5">{member.judgeCurrentRole}</p>
                )}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-full bg-monad-primary/10 text-monad-primary border border-monad-primary/20">
                {ROLE_LABELS[member.role]}
              </span>
            </div>

            <p className="text-sm text-white/60 mb-3 line-clamp-3">
              {member.role === "mentor" ? member.mentorBio : member.judgeBio}
            </p>

            {/* Skills */}
            {member.role === "mentor" && member.mentorPrimarySkills?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {member.mentorPrimarySkills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {member.role === "judge" && member.judgeExpertiseAreas?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {member.judgeExpertiseAreas.slice(0, 4).map((area) => (
                  <span
                    key={area}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}

            {/* Social links */}
            <div className="flex gap-3 text-white/30">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:text-white/60 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {member.twitter && (
                <span className="text-xs">@{member.twitter.replace(/^@/, "")}</span>
              )}
              <span className="text-xs capitalize">
                {member.city === "both" ? "Ambas ciudades" : member.city}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
