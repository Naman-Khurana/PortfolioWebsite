"use client";

/**
 * Phase07Connect
 *
 * Phase 07: Connect (0.980 – 1.00)
 * Concept: "The Spatial Pull-Back & Horizon // Release"
 *
 * Contact content is data-driven from portfolioData.contact.
 * Layout: content sits in the left open area of 05-outro.png. The chapter
 * navigation is a slim rail, so the contact composition can use this space
 * without an artificial left gutter.
 */

import React, { useState } from "react";
import { motion, useTransform } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useTimeline } from "@/context/TimelineContext";

export const Phase07Connect: React.FC = () => {
  const { scrollProgress, currentProgress, prefersReducedMotion, scrollToProgress } = useTimeline();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const containerOpacity = useTransform(
    scrollProgress,
    [0.980, 0.990, 1.00],
    [0, 1, 1]
  );
  const containerY = useTransform(
    scrollProgress,
    [0.980, 0.990, 1.00],
    ["20px", "0px", "0px"]
  );

  const isVisible = currentProgress >= 0.978;
  const { contact, identity } = portfolioData;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <motion.div
      className="absolute inset-0 z-30 pointer-events-none"
      style={
        prefersReducedMotion
          ? { opacity: isVisible ? 1 : 0 }
          : { opacity: containerOpacity, y: containerY }
      }
    >
      {/*
        Content is constrained to the LEFT half of the image (character is on the right).
        We use absolute positioning so it doesn't affect the image layer.
      */}
      <div className="absolute inset-0 flex items-center">
        <div
          className="
            flex flex-col gap-5 pointer-events-auto
            ml-12 sm:ml-16 md:ml-20 lg:ml-24
            mr-auto
            max-w-[420px] sm:max-w-[460px] md:max-w-[500px]
            px-0
          "
        >

          {/* Phase label */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] flex-shrink-0" />
            <span className="font-mono text-[10px] tracking-widest text-amber-300/90 uppercase font-bold">
              07 // CONNECT
            </span>
          </div>

          {/* Identity badge */}
          <div className="inline-flex items-center gap-2 self-start font-mono text-[10px] text-white/50 uppercase tracking-widest bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-md">
            <span>{identity.location}</span>
            <span className="text-white/20">·</span>
            <span>{identity.role}</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] leading-[1.15]">
              {contact.tagline}
            </h2>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
              {contact.introduction}
            </p>
          </div>

          {/* Contact cards grid */}
          <div className="grid grid-cols-2 gap-2">

            {/* Email */}
            <div className="col-span-2 p-3.5 rounded-xl border border-white/15 bg-black/65 backdrop-blur-xl hover:border-amber-400/50 transition-all duration-300 shadow-xl flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-white/40 tracking-wider">DIRECT EMAIL</span>
                <span className="text-amber-400 text-[9px] font-mono font-bold">PRIMARY</span>
              </div>
              <div className="font-mono text-xs text-white font-medium truncate">
                {contact.email}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-amber-400/20 hover:bg-amber-400/35 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  {copiedEmail ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      COPIED
                    </>
                  ) : (
                    "COPY EMAIL"
                  )}
                </button>
                <a
                  href={`mailto:${contact.email}`}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 text-xs transition-colors flex items-center justify-center"
                  title="Open mail client"
                >
                  ↗
                </a>
              </div>
            </div>

            {/* Resume */}
            <div className="p-3 rounded-xl border border-white/12 bg-black/60 backdrop-blur-xl hover:border-sky-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-white/40 tracking-wider">RÉSUMÉ</span>
                <span className="text-sky-400 text-[9px] font-mono font-bold">PDF</span>
              </div>
              <a
                href={contact.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-2.5 rounded-lg bg-sky-400/20 hover:bg-sky-400/35 text-sky-300 border border-sky-400/30 text-[10px] font-mono font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>VIEW ↓</span>
              </a>
            </div>

            {/* LinkedIn */}
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-white/12 bg-black/55 backdrop-blur-md hover:border-sky-500/40 hover:bg-black/70 transition-all duration-300 flex flex-col justify-between gap-2 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-sky-600/30 border border-sky-400/30 flex items-center justify-center text-sky-400 text-[10px] font-bold flex-shrink-0">
                  in
                </div>
                <span className="text-[10px] font-bold text-white tracking-tight">LinkedIn</span>
              </div>
              <span className="text-[9px] font-mono text-white/40 group-hover:text-sky-400 transition-colors">
                CONNECT ↗
              </span>
            </a>

            {/* GitHub — spans both remaining columns on mobile, single on desktop */}
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 p-3 rounded-xl border border-white/12 bg-black/55 backdrop-blur-md hover:border-white/30 hover:bg-black/70 transition-all duration-300 flex flex-col justify-between gap-2 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-white text-[9px] font-bold font-mono flex-shrink-0">
                  gh
                </div>
                <span className="text-[10px] font-bold text-white tracking-tight">GitHub</span>
              </div>
              <span className="text-[9px] font-mono text-white/40 group-hover:text-amber-400 transition-colors">
                EXPLORE ↗
              </span>
            </a>

          </div>

          {/* Footer row */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => scrollToProgress(0)}
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/12 border border-white/12 text-white/80 text-[10px] font-mono tracking-wider flex items-center gap-1.5 transition-all hover:scale-[1.02] shadow-lg backdrop-blur-md"
            >
              <span>↺</span>
              <span>REVISIT JOURNEY</span>
            </button>
            <span className="text-[10px] font-mono text-white/35">
              © {new Date().getFullYear()} Naman Khurana
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};
