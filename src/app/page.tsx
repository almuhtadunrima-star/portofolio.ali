"use client";

import React, { useState } from "react";
import projectsData from "../../public/data/cms/projects.json";
import contactData from "../../public/data/cms/contact.json";
import type { Project, ActiveSection } from "@/types/activetheory";

import { HeroScene } from "@/components/HeroScene";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { WorkCarousel } from "@/components/WorkCarousel";
import { ProjectModal } from "@/components/ProjectModal";
import { ReelModal } from "@/components/ReelModal";
import { AboutView } from "@/components/AboutView";
import { ContactView } from "@/components/ContactView";
import { AiAssistant } from "@/components/AiAssistant";

export default function HomePage() {
  const projects = projectsData as unknown as Project[];
  const [activeSection, setActiveSection] = useState<ActiveSection>("work");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<Project | null>(null);
  const [isReelOpen, setIsReelOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);

  const activeProject = projects[activeProjectIndex] || projects[0];
  const accentColor = activeProject?.uiColor || "ba7cde";

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white select-none">
      {/* 3D WebGL Fluid / Particle Field Scene */}
      <HeroScene accentColor={accentColor} />

      {/* Brand Header */}
      <Header
        onOpenReel={() => setIsReelOpen(true)}
        onGoHome={() => {
          setActiveSection("work");
          setActiveProjectIndex(0);
        }}
        activeSection={activeSection}
      />

      {/* Work 3D Carousel */}
      <WorkCarousel
        projects={projects}
        activeProjectIndex={activeProjectIndex}
        onSelectProject={setActiveProjectIndex}
        onOpenProjectDetail={setSelectedProjectDetail}
      />

      {/* Floating HUD Navigation Capsule */}
      <Navigation
        currentSection={activeSection}
        onSelectSection={setActiveSection}
        accentColor={accentColor}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProjectDetail}
        onClose={() => setSelectedProjectDetail(null)}
      />

      {/* Active Theory Showreel Modal */}
      <ReelModal
        isOpen={isReelOpen}
        onClose={() => setIsReelOpen(false)}
      />

      {/* About Overlay */}
      <AboutView
        isOpen={activeSection === "about"}
        onClose={() => setActiveSection("work")}
        accentColor={accentColor}
      />

      {/* Contact Overlay */}
      <ContactView
        isOpen={activeSection === "contact"}
        onClose={() => setActiveSection("work")}
        accentColor={accentColor}
        contactData={contactData}
      />

      {/* AI Companion Modal */}
      <AiAssistant
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        accentColor={accentColor}
        projects={projects}
        onOpenProject={(p) => setSelectedProjectDetail(p)}
        onOpenContact={() => {
          setIsAiOpen(false);
          setActiveSection("contact");
        }}
      />
    </main>
  );
}
