"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      videoRef.current?.play().catch(() => {});
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-3xl animate-fade-in"
    >
      <div
        className="absolute inset-0 cursor-pointer -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Showreel"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player */}
        <video
          ref={videoRef}
          src="/videos/reel.mp4"
          poster="/images/reel-frame.jpg"
          controls
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
