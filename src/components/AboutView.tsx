"use client";

import React, { useEffect } from "react";
import { X, Award, Sparkles, MapPin } from "lucide-react";

interface AboutViewProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
}

export const AboutView: React.FC<AboutViewProps> = ({
  isOpen,
  onClose,
  accentColor,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formattedColor = accentColor.startsWith("#") ? accentColor : `#${accentColor}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black/85 backdrop-blur-3xl animate-fade-in"
    >
      <div
        className="absolute inset-0 cursor-pointer -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-4xl max-h-[85vh] bg-neutral-950/90 border border-white/20 rounded-3xl p-6 sm:p-10 md:p-14 overflow-y-auto no-scrollbar flex flex-col gap-10 shadow-2xl"
        style={{
          boxShadow: `0 0 50px ${formattedColor}25`,
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close About"
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Monogram */}
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 block mb-2">
            Profile · 2012 — Present
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-[0.15em] text-white">
            Muhammad Ali
          </h2>
          <span className="text-xs sm:text-sm font-mono tracking-widest text-white/70 block mt-1 uppercase">
            Active Theory · Creative Technologist & Digital Studio
          </span>
          <p
            className="mt-4 text-base sm:text-xl font-light text-neutral-200 leading-relaxed max-w-2xl"
            style={{ color: "#f0f0f0" }}
          >
            Muhammad Ali blends story, art & technology as an in-house studio of
            passionate makers. Pioneering industry-leading WebGL experiences, real-time
            3D environments, and spatial computing activations that consistently deliver
            award-winning work through quality & performance.
          </p>
        </div>

        {/* Studio Locations */}
        <div className="border-t border-white/10 pt-8">
          <h3 className="text-xs uppercase tracking-[0.25em] font-mono text-white/40 mb-4 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            Studio Hubs
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col gap-1">
              <span className="text-lg font-bold uppercase tracking-wider text-white">
                LAX
              </span>
              <span className="text-xs text-white/60">Venice, CA</span>
              <span className="text-[10px] font-mono text-white/40 mt-1">
                34.02° N
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col gap-1">
              <span className="text-lg font-bold uppercase tracking-wider text-white">
                NYC
              </span>
              <span className="text-xs text-white/60">New York</span>
              <span className="text-[10px] font-mono text-white/40 mt-1">
                40.71° N
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col gap-1">
              <span className="text-lg font-bold uppercase tracking-wider text-white">
                AMS
              </span>
              <span className="text-xs text-white/60">Amsterdam</span>
              <span className="text-[10px] font-mono text-white/40 mt-1">
                52.37° N
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col gap-1">
              <span className="text-lg font-bold uppercase tracking-wider text-white">
                JKT
              </span>
              <span className="text-xs text-white/60">Jakarta</span>
              <span className="text-[10px] font-mono text-white/40 mt-1">
                6.20° S
              </span>
            </div>
          </div>
        </div>

        {/* Disciplines & Capabilities */}
        <div className="border-t border-white/10 pt-8">
          <h3 className="text-xs uppercase tracking-[0.25em] font-mono text-white/40 mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Disciplines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-300">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-bold text-white block mb-1">
                Real-Time 3D & WebGL
              </span>
              <p className="text-xs text-white/60">
                Pioneering browser-based GPU rendering, custom GLSL shaders, physics,
                and high-framerate interactive canvas experiences.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-bold text-white block mb-1">
                Spatial Computing & XR
              </span>
              <p className="text-xs text-white/60">
                Immersive augmented reality, Apple Vision Pro spatial apps, virtual
                worlds, and festival portals.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-bold text-white block mb-1">
                Creative Direction & Brand
              </span>
              <p className="text-xs text-white/60">
                Uncompromising aesthetic craft, bespoke typography, sound design, and
                narrative-led digital activations.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-bold text-white block mb-1">
                Large Scale Installations
              </span>
              <p className="text-xs text-white/60">
                Multi-user sensor-driven live festival stages, museum exhibitions, and
                connected hardware installations.
              </p>
            </div>
          </div>
        </div>

        {/* Recognition */}
        <div className="border-t border-white/10 pt-8 flex items-center justify-between text-xs tracking-wider text-white/40 font-mono">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-white/60" />
            <span>Over 100+ International Awards & Recognitions</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:underline cursor-pointer"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};
