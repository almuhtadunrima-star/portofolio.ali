"use client";

import React from "react";
import { Play } from "lucide-react";
import type { ActiveSection } from "@/types/activetheory";

interface HeaderProps {
  onOpenReel: () => void;
  onGoHome: () => void;
  activeSection?: ActiveSection;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReel,
  onGoHome,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-10 py-6 pointer-events-none">
      {/* Brand Wordmark */}
      <button
        type="button"
        onClick={onGoHome}
        aria-label="Go to Home"
        className="pointer-events-auto flex items-center gap-3 text-left group cursor-pointer"
      >
        <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
        </div>
        <div>
          <span className="block text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-white group-hover:text-neutral-200 transition-colors">
            Muhammad Ali
          </span>
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
            Active Theory · Creative Digital Experiences
          </span>
        </div>
      </button>

      {/* Center Studio Hubs */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6 text-[11px] uppercase tracking-[0.25em] text-white/40 font-mono">
        <span className="hover:text-white/80 transition-colors">LAX 34.02° N</span>
        <span>·</span>
        <span className="hover:text-white/80 transition-colors">NYC 40.71° N</span>
        <span>·</span>
        <span className="hover:text-white/80 transition-colors">AMS 52.37° N</span>
        <span>·</span>
        <span className="hover:text-white/80 transition-colors">JKT 6.20° S</span>
      </div>

      {/* Reel Trigger */}
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenReel}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[11px] uppercase tracking-[0.2em] text-white/90 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all cursor-pointer group"
        >
          <Play className="w-3 h-3 fill-white text-white group-hover:scale-110 transition-transform" />
          <span>Watch Reel</span>
        </button>
      </div>
    </header>
  );
};
