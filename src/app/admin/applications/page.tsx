"use client";

import { useState, useEffect } from "react";
import type { Database } from "@/lib/supabase/types";

type Application = Database["public"]["Tables"]["applications"]["Row"];

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<"all" | "mentor" | "judge">("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "pending" | "approved" | "rejected">(
    "all"
  );
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedRole !== "all") params.append("role", selectedRole);
      if (selectedStatus !== "all") params.append("status", selectedStatus);

      const response = await fetch(`/api/admin/applications?${params}`, {
        headers: {
          Authorization: `Bearer monad2026`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch applications");

      const { data } = await response.json();
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole, selectedStatus]);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const response = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer monad2026`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      await fetchApplications();
      setSelectedApp(null);
      alert(`Application ${status} successfully`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const filteredCount = {
    all: applications.length,
    mentor: applications.filter((a) => a.role === "mentor").length,
    judge: applications.filter((a) => a.role === "judge").length,
    pending: applications.filter((a) => a.status === "pending").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Applications</h2>
        <button
          onClick={fetchApplications}
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-mono uppercase tracking-wide text-white/90 mb-2">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as "all" | "mentor" | "judge")}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-monad-primary"
            >
              <option value="all">All ({filteredCount.all})</option>
              <option value="mentor">Mentors ({filteredCount.mentor})</option>
              <option value="judge">Judges ({filteredCount.judge})</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wide text-white/90 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as "all" | "pending" | "approved" | "rejected")
              }
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-monad-primary"
            >
              <option value="all">All</option>
              <option value="pending">Pending ({filteredCount.pending})</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="text-center text-white/70 py-12">Loading...</div>
      ) : applications.length === 0 ? (
        <div className="text-center text-white/70 py-12">No applications found</div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-white/70">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-white/70">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-white/70">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-white/70">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-white/70">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-white/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => setSelectedApp(app)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {app.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 capitalize">
                      {app.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 capitalize">
                      {app.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          app.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : app.status === "rejected"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                        }}
                        className="text-monad-primary hover:text-monad-primary/80"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="bg-monad-dark border border-white/10 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedApp.full_name}</h3>
                <p className="text-white/70 capitalize">{selectedApp.role} Application</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-2">
                <h4 className="font-mono uppercase tracking-wide text-white/70 text-sm">Contact</h4>
                <p className="text-white">Email: {selectedApp.email}</p>
                {selectedApp.phone && <p className="text-white">Phone: {selectedApp.phone}</p>}
                {selectedApp.linkedin && (
                  <p className="text-white">
                    LinkedIn:{" "}
                    <a
                      href={selectedApp.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-monad-primary hover:underline"
                    >
                      {selectedApp.linkedin}
                    </a>
                  </p>
                )}
              </div>

              {/* Role-specific fields */}
              {selectedApp.role === "mentor" && (
                <>
                  <div className="space-y-2">
                    <h4 className="font-mono uppercase tracking-wide text-white/70 text-sm">
                      Skills & Experience
                    </h4>
                    <p className="text-white">{selectedApp.mentor_primary_skills}</p>
                    <p className="text-white">
                      Blockchain: {selectedApp.mentor_blockchain_experience}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-mono uppercase tracking-wide text-white/70 text-sm">Bio</h4>
                    <p className="text-white">{selectedApp.mentor_bio}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-mono uppercase tracking-wide text-white/70 text-sm">
                      Motivation
                    </h4>
                    <p className="text-white">{selectedApp.mentor_why}</p>
                  </div>
                </>
              )}

              {selectedApp.role === "judge" && (
                <>
                  <div className="space-y-2">
                    <h4 className="font-mono uppercase tracking-wide text-white/70 text-sm">
                      Professional Background
                    </h4>
                    <p className="text-white">{selectedApp.judge_current_role}</p>
                    <p className="text-white/70">
                      {selectedApp.judge_years_blockchain} years blockchain /{" "}
                      {selectedApp.judge_years_total} years total
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-mono uppercase tracking-wide text-white/70 text-sm">Bio</h4>
                    <p className="text-white">{selectedApp.judge_bio}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-mono uppercase tracking-wide text-white/70 text-sm">
                      Motivation
                    </h4>
                    <p className="text-white">{selectedApp.judge_why}</p>
                  </div>
                </>
              )}

              {/* Actions */}
              {selectedApp.status === "pending" && (
                <div className="flex gap-4 pt-6 border-t border-white/10">
                  <button
                    onClick={() => updateStatus(selectedApp.id, "approved")}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-full font-mono uppercase tracking-wide hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApp.id, "rejected")}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-full font-mono uppercase tracking-wide hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
