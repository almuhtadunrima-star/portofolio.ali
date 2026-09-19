"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect } from "react";
import type { Project } from "@/types/activetheory";
import { X, ExternalLink, BookOpen } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const projectColor = project.uiColor
    ? project.uiColor.startsWith("#")
      ? project.uiColor
      : `#${project.uiColor}`
    : "#ba7cde";

  const videoUrl = project.video?.url;
  const thumbnailUrl = project.video?.thumbnail || project.projectLogo?.url || "/images/reel-frame.jpg";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl animate-fade-in"
    >
      {/* Background click to dismiss */}
      <div
        className="absolute inset-0 cursor-pointer -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-950/90 border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl overflow-y-auto no-scrollbar"
        style={{
          boxShadow: `0 0 50px ${projectColor}30`,
        }}
      >
        {/* Top Color Accent Line */}
        <div
          className="w-full h-1"
          style={{ backgroundColor: projectColor }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Project Details"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview (Video or Image) */}
        <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
          {videoUrl ? (
            <video
              src={videoUrl}
              poster={thumbnailUrl}
              controls
              autoPlay
              muted
              playsInline
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={thumbnailUrl}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Modal Info Section */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col gap-6">
          {/* Header Row: Title & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-mono block mb-1">
                {project.clientName || "Active Theory"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-white">
                {project.name}
              </h2>
            </div>

            {/* Tags Badge */}
            {project.tags && (
              <div className="flex flex-wrap gap-2">
                {project.tags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] uppercase tracking-[0.2em] font-mono rounded-full bg-white/10 text-white/90 border border-white/15"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Body Description */}
          <div className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed tracking-wide">
            <p>{project.description}</p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.projectURL && (
              <a
                href={project.projectURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-black bg-white hover:bg-neutral-200 transition-all cursor-pointer"
              >
                <span>Launch Experience</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.caseStudyURL && (
              <a
                href={project.caseStudyURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Case Study</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all cursor-pointer"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
