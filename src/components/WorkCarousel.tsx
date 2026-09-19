"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { Project } from "@/types/activetheory";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

interface WorkCarouselProps {
  projects: Project[];
  activeProjectIndex: number;
  onSelectProject: (index: number) => void;
  onOpenProjectDetail: (project: Project) => void;
}

export const WorkCarousel: React.FC<WorkCarouselProps> = ({
  projects,
  activeProjectIndex,
  onSelectProject,
  onOpenProjectDetail,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragDistanceRef = useRef(0);

  // Extract unique tags
  const tags = ["ALL", "INSTALLATION", "WEB", "EXPERIENTIAL", "AI", "MOBILE"];

  const filteredProjects = projects.filter((p) => {
    if (selectedTag === "ALL") return true;
    return (p.tags || "").toUpperCase().includes(selectedTag);
  });

  const currentIndex = Math.min(
    Math.max(0, activeProjectIndex),
    filteredProjects.length - 1
  );

  const activeProject = filteredProjects[currentIndex] || projects[0];

  const handleNext = useCallback(() => {
    if (filteredProjects.length === 0) return;
    const next = (currentIndex + 1) % filteredProjects.length;
    onSelectProject(next);
  }, [currentIndex, filteredProjects.length, onSelectProject]);

  const handlePrev = useCallback(() => {
    if (filteredProjects.length === 0) return;
    const prev = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    onSelectProject(prev);
  }, [currentIndex, filteredProjects.length, onSelectProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Enter" && activeProject) onOpenProjectDetail(activeProject);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, activeProject, onOpenProjectDetail]);

  // Wheel horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 30 || Math.abs(e.deltaY) > 30) {
      if (e.deltaX > 20 || e.deltaY > 20) {
        handleNext();
      } else if (e.deltaX < -20 || e.deltaY < -20) {
        handlePrev();
      }
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    dragDistanceRef.current = e.clientX - startXRef.current;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (dragDistanceRef.current < -50) {
      handleNext();
    } else if (dragDistanceRef.current > 50) {
      handlePrev();
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    dragDistanceRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    dragDistanceRef.current = e.touches[0].clientX - startXRef.current;
  };

  const handleTouchEnd = () => {
    if (dragDistanceRef.current < -40) {
      handleNext();
    } else if (dragDistanceRef.current > 40) {
      handlePrev();
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full flex flex-col justify-between pt-24 pb-20 select-none overflow-hidden"
    >
      {/* Category Filter Pills */}
      <div className="z-20 flex items-center justify-center gap-2 px-6 overflow-x-auto no-scrollbar py-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setSelectedTag(tag);
              onSelectProject(0);
            }}
            className={`px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded-full transition-all cursor-pointer ${
              selectedTag === tag
                ? "bg-white text-black font-bold shadow-md shadow-white/20"
                : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 3D Perspective Card Stage */}
      <div className="relative w-full flex-1 flex items-center justify-center perspective-[1200px] overflow-hidden">
        {filteredProjects.map((project, idx) => {
          const offset = idx - currentIndex;
          // Render only cards within visible range
          if (Math.abs(offset) > 3) return null;

          const isActive = offset === 0;
          const translateX = offset * 320;
          const rotateY = offset * -22;
          const translateZ = -Math.abs(offset) * 160;
          const scale = isActive ? 1 : 0.82;
          const opacity = Math.max(0, 1 - Math.abs(offset) * 0.35);

          const projectColor = project.uiColor
            ? project.uiColor.startsWith("#")
              ? project.uiColor
              : `#${project.uiColor}`
            : "#ba7cde";

          const imageUrl =
            project.video?.thumbnail ||
            project.projectLogo?.url ||
            "/images/reel-frame.jpg";

          return (
            <div
              key={project.id || idx}
              onClick={() => {
                if (isActive) {
                  onOpenProjectDetail(project);
                } else {
                  onSelectProject(idx);
                }
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: 20 - Math.abs(offset),
              }}
              className={`absolute w-[290px] sm:w-[380px] md:w-[460px] h-[360px] sm:h-[440px] rounded-2xl cursor-pointer transition-all duration-700 ease-out group overflow-hidden border ${
                isActive
                  ? "border-white/30 shadow-2xl"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {/* Dynamic Aura Glow */}
              {isActive && (
                <div
                  className="absolute -inset-1 rounded-2xl opacity-40 blur-xl transition-all duration-700 -z-10"
                  style={{ backgroundColor: projectColor }}
                />
              )}

              {/* Card Media Background */}
              <div className="relative w-full h-full bg-neutral-950 overflow-hidden">
                <img
                  src={imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Project Color Accent Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                  style={{ backgroundColor: projectColor }}
                />

                {/* Top Badge: Client & Year */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-mono">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/80 border border-white/10">
                    {project.clientName || "Muhammad Ali"}
                  </span>
                  {project.tags && (
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/60 border border-white/10">
                      {project.tags.split(",")[0]}
                    </span>
                  )}
                </div>

                {/* Bottom Content Info */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col gap-2">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.15em] text-white">
                        {project.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mt-1 font-light tracking-wide">
                        {project.description}
                      </p>
                    </div>

                    {/* Launch / Expand Icon Button */}
                    <div className="w-9 h-9 shrink-0 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation Bar & Project Index Counter */}
      <div className="z-20 px-8 flex items-center justify-between text-xs tracking-[0.2em] font-mono uppercase text-white/60">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Project"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Center Project Counter */}
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-sm">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/30">/</span>
          <span>{String(filteredProjects.length).padStart(2, "0")}</span>
          <span className="text-white/40 hidden md:inline ml-2">
            · {activeProject?.name}
          </span>
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Project"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
