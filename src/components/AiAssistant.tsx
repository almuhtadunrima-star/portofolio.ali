"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Bot, Sparkles, ArrowRight } from "lucide-react";
import type { Project } from "@/types/activetheory";

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onOpenContact: () => void;
}

interface Message {
  sender: "user" | "ai";
  text: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  isOpen,
  onClose,
  accentColor,
  projects,
  onOpenProject,
  onOpenContact,
}) => {
  const formattedColor = accentColor.startsWith("#") ? accentColor : `#${accentColor}`;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Greetings. I am the AI Companion for Muhammad Ali · Active Theory. Ask me about Muhammad Ali, award-winning WebGL case studies, technical architecture, or studio inquiries.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (queryText?: string) => {
    const query = (queryText || input).trim();
    if (!query) return;

    // Add user message
    const userMsg: Message = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let response: Message = {
        sender: "ai",
        text: "Muhammad Ali leads creative technology and digital production, pushing the boundaries of WebGL, GLSL shaders, and spatial interactive experiences.",
      };

      if (q.includes("who") || q.includes("ali") || q.includes("muhammad")) {
        response = {
          sender: "ai",
          text: "Muhammad Ali is a creative technologist, developer, and digital experience craftsman. He blends story, art & technology to build world-class interactive websites, WebGL 3D worlds, and high-performance digital activations with studios across Los Angeles, New York, Amsterdam, and Jakarta.",
        };
      } else if (q.includes("project") || q.includes("work") || q.includes("3d") || q.includes("webgl")) {
        const sampleProj = projects[0] || null;
        response = {
          sender: "ai",
          text: `Muhammad Ali's portfolio includes groundbreaking work such as "${sampleProj?.name || "Dream Portal"}", Coachellaverse, Spotify Wrapped Party, Cyberpunk 2077 Night City, and Paper Planes. These projects use real-time WebGL, custom particle simulation, and interactive spatial sound.`,
          action: sampleProj
            ? {
                label: `Explore "${sampleProj.name}"`,
                onClick: () => {
                  onClose();
                  onOpenProject(sampleProj);
                },
              }
            : undefined,
        };
      } else if (q.includes("award") || q.includes("recognition") || q.includes("fwa") || q.includes("awwwards")) {
        response = {
          sender: "ai",
          text: "Muhammad Ali's work has earned over 100+ prestigious industry accolades, including 3x Awwwards Site of the Year, 10x Site of the Month, 58+ Site of the Day awards, FWA of the Year, and Cannes Lions for digital craft.",
        };
      } else if (q.includes("tech") || q.includes("stack") || q.includes("tool")) {
        response = {
          sender: "ai",
          text: "The core technology stack combines Next.js 16, React 19, TypeScript strict, Three.js, WebGL 2.0, GLSL custom fragment/vertex shaders, Tailwind CSS v4, and Web Audio API synthesizer for ambient procedural soundscapes.",
        };
      } else if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("collaborate")) {
        response = {
          sender: "ai",
          text: "You can reach Muhammad Ali directly for commissions, enterprise digital experiences, or creative direction inquiries at muhammadali@activetheory.net.",
          action: {
            label: "Open Contact Panel",
            onClick: () => {
              onClose();
              onOpenContact();
            },
          },
        };
      }

      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const chips = [
    "Tell me about Muhammad Ali",
    "Show me WebGL & 3D projects",
    "What awards have been won?",
    "What is the tech stack?",
    "How can we collaborate?",
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
        className="relative w-full max-w-2xl h-[75vh] max-h-[680px] bg-neutral-950/95 border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col shadow-2xl overflow-hidden"
        style={{
          boxShadow: `0 0 50px ${formattedColor}25`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: `${formattedColor}33` }}
            >
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
                Ali AI Companion
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">
                Active Theory Intelligence V6
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Assistant"
            className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-white text-black font-medium"
                    : "bg-white/[0.06] border border-white/10 text-neutral-200"
                }`}
              >
                <p>{msg.text}</p>
                {msg.action && (
                  <button
                    type="button"
                    onClick={msg.action.onClick}
                    className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-mono bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    <span>{msg.action.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.04] border border-white/5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Chips */}
        <div className="py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {chips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(chip)}
              className="shrink-0 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-white/50" />
              <span>{chip}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="pt-3 border-t border-white/10 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Muhammad Ali or projects..."
            className="flex-1 bg-white/[0.05] border border-white/15 focus:border-white/40 focus:outline-none rounded-full px-4 py-2 text-xs text-white placeholder-white/40"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send Message"
            className="w-9 h-9 rounded-full bg-white text-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-200 transition-all flex items-center justify-center cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
