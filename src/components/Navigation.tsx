"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { audioEngine } from "./AudioEngine";
import type { ActiveSection } from "@/types/activetheory";

interface NavigationProps {
  currentSection: ActiveSection;
  onSelectSection: (section: ActiveSection) => void;
  accentColor: string; // e.g. "ba7cde" or "#ba7cde"
  onOpenAi?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  onSelectSection,
  accentColor,
  onOpenAi,
}) => {
  const [audioActive, setAudioActive] = useState(false);

  const formattedColor = accentColor.startsWith("#") ? accentColor : `#${accentColor}`;

  const handleToggleAudio = () => {
    const nextState = audioEngine.toggle();
    setAudioActive(nextState);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-700 pointer-events-auto"
    >
      <div
        className="flex items-center gap-1 sm:gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-black/75 border transition-all duration-700 shadow-2xl"
        style={{
          borderColor: `${formattedColor}55`,
          boxShadow: `0 0 25px ${formattedColor}25, inset 0 0 15px ${formattedColor}15`,
        }}
      >
        {/* Work Button */}
        <button
          type="button"
          onClick={() => onSelectSection("work")}
          className={`relative px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 rounded-full cursor-pointer ${
            currentSection === "work"
              ? "text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          {currentSection === "work" && (
            <span
              className="absolute inset-0 rounded-full opacity-20 -z-10 transition-colors duration-500"
              style={{ backgroundColor: formattedColor }}
            />
          )}
          Work
        </button>

        {/* About Button */}
        <button
          type="button"
          onClick={() => onSelectSection("about")}
          className={`relative px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 rounded-full cursor-pointer ${
            currentSection === "about"
              ? "text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          {currentSection === "about" && (
            <span
              className="absolute inset-0 rounded-full opacity-20 -z-10 transition-colors duration-500"
              style={{ backgroundColor: formattedColor }}
            />
          )}
          About
        </button>

        {/* Contact Button */}
        <button
          type="button"
          onClick={() => onSelectSection("contact")}
          className={`relative px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 rounded-full cursor-pointer ${
            currentSection === "contact"
              ? "text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          {currentSection === "contact" && (
            <span
              className="absolute inset-0 rounded-full opacity-20 -z-10 transition-colors duration-500"
              style={{ backgroundColor: formattedColor }}
            />
          )}
          Contact
        </button>

        {/* AI Companion Button */}
        {onOpenAi && (
          <button
            type="button"
            onClick={onOpenAi}
            title="Ask Ali AI Companion"
            className="relative flex items-center gap-1.5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-full cursor-pointer text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15"
          >
            <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>AI</span>
          </button>
        )}

        {/* Divider */}
        <div className="h-4 w-[1px] bg-white/15 mx-1" />

        {/* Sound Toggle with Equalizer bars */}
        <button
          type="button"
          onClick={handleToggleAudio}
          title={audioActive ? "Mute Ambient Sound" : "Enable Ambient Sound"}
          aria-label="Toggle Audio"
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-all cursor-pointer group"
        >
          <div className="flex items-end gap-[3px] h-4">
            <span
              className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
                audioActive ? "animate-eq-1" : "h-[3px] opacity-40 group-hover:opacity-80"
              }`}
            />
            <span
              className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
                audioActive ? "animate-eq-2" : "h-[7px] opacity-40 group-hover:opacity-80"
              }`}
            />
            <span
              className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
                audioActive ? "animate-eq-3" : "h-[4px] opacity-40 group-hover:opacity-80"
              }`}
            />
            <span
              className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
                audioActive ? "animate-eq-4" : "h-[9px] opacity-40 group-hover:opacity-80"
              }`}
            />
          </div>
        </button>
      </div>
    </nav>
  );
};
