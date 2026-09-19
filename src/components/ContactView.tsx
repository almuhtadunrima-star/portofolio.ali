"use client";

import React, { useEffect } from "react";
import { X, Mail, Send, ArrowUpRight } from "lucide-react";
import type { ContactData } from "@/types/activetheory";

interface ContactViewProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  contactData?: ContactData | null;
}

export const ContactView: React.FC<ContactViewProps> = ({
  isOpen,
  onClose,
  accentColor,
  contactData,
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

  const links = contactData?.links || [
    { title: "Email", url: "mailto:hello@activetheory.net", id: "1" },
    { title: "Instagram", url: "https://www.instagram.com/activetheory", id: "2" },
    { title: "LinkedIn", url: "https://www.linkedin.com/company/active-theory/", id: "3" },
    { title: "X", url: "https://twitter.com/active_theory", id: "4" },
    { title: "Newsletter", url: "https://mailchi.mp/activetheory/newsletter", id: "5" },
    { title: "Privacy", url: "https://www.notion.so/Active-Theory-Privacy-Notice-dc343e6976e24c5e866be0ee64bf99eb", id: "6" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-3xl animate-fade-in"
    >
      <div
        className="absolute inset-0 cursor-pointer -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-3xl bg-neutral-950/90 border border-white/20 rounded-3xl p-8 sm:p-12 md:p-14 overflow-hidden flex flex-col gap-8 shadow-2xl"
        style={{
          boxShadow: `0 0 50px ${formattedColor}25`,
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Contact"
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 block mb-2">
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-[0.15em] text-white">
            Contact Muhammad Ali
          </h2>
          <p className="mt-3 text-sm sm:text-base font-light text-neutral-300">
            For new business inquiries, creative technology collaborations, speaking requests, or WebGL commissions:
          </p>
        </div>

        {/* Main Email Hero CTA */}
        <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: `${formattedColor}33` }}
            >
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">
                Direct Inquiries
              </span>
              <a
                href="mailto:muhammadali@activetheory.net"
                className="text-lg sm:text-xl font-bold text-white hover:text-neutral-300 transition-colors"
              >
                muhammadali@activetheory.net
              </a>
            </div>
          </div>

          <a
            href="mailto:muhammadali@activetheory.net"
            className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Send Email</span>
            <Send className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Channels / Links */}
        <div className="border-t border-white/10 pt-6">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-white/40 block mb-4">
            Connect & Follow
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="text-xs uppercase tracking-wider text-white/80 group-hover:text-white font-mono">
                  {link.title}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[11px] font-mono uppercase text-white/40">
          <span>Muhammad Ali © {new Date().getFullYear()}</span>
          <span>Venice · NYC · Amsterdam · Jakarta</span>
        </div>
      </div>
    </div>
  );
};
