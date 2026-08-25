"use client";

import React from "react";
import { motion, useTransform } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useTimeline } from "@/context/TimelineContext";

export const HeroOverlay: React.FC = () => {
  const { identity } = portfolioData;
  const { scrollProgress, prefersReducedMotion } = useTimeline();

  // Scroll-linked exit transition for hero overlay
  const overlayOpacity = useTransform(scrollProgress, [0.0, 0.12, 0.18], [1, 1, 0]);
  const overlayY = useTransform(scrollProgress, [0.0, 0.12, 0.18], ["0px", "0px", "-24px"]);
  const overlayScale = useTransform(scrollProgress, [0.0, 0.12, 0.18], [1, 1, 0.98]);

  const transitionConfig: { duration: number; ease?: "easeOut" | "easeInOut" | "linear" } = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: "easeOut" };

  return (
    <motion.div
      className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16"
      style={{
        opacity: overlayOpacity,
        y: prefersReducedMotion ? "0px" : overlayY,
        scale: prefersReducedMotion ? 1 : overlayScale,
      }}
    >
      {/* Top Bar / Status */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transitionConfig, delay: 0.1 }}
        className="flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
          <span className="font-mono text-xs text-white/70 tracking-wider uppercase">
            Workspace Active · Continuous Session
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-white/40">
          <span>PORTFOLIO // V1.0</span>
          <span>LATENCY: &lt;10ms</span>
        </div>
      </motion.div>

      {/* Main Hero Identity (Placed thoughtfully to balance the seated engineer frame) */}
      <div className="max-w-2xl mt-auto mb-10 md:mb-12 pointer-events-auto">
        {/* Subtle Category Pill */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transitionConfig, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span className="text-[11px] font-mono tracking-widest text-sky-200/90 uppercase">
            Systems & Infrastructure
          </span>
        </motion.div>

        {/* Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-3"
        >
          {identity.name}
        </motion.h1>

        {/* Role Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl font-light text-white/80 tracking-wide mb-5"
        >
          {identity.role}
        </motion.p>

        {/* Core Stack Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.5 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6"
        >
          {identity.coreStack.map((tech, idx) => (
            <span
              key={tech}
              className="inline-flex items-center text-xs sm:text-sm font-mono px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/10 text-white/90 backdrop-blur-sm shadow-sm"
            >
              <span className="text-sky-400/80 mr-1.5">#</span>
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Concise positioning description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transitionConfig, delay: 0.6 }}
          className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl font-normal"
        >
          {identity.bioShort}
        </motion.p>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...transitionConfig, delay: 0.7 }}
        className="flex items-center justify-between w-full pt-4 border-t border-white/5"
      >
        <div className="flex items-center gap-3 text-xs font-mono text-white/50">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded border border-white/20 text-[10px]">
            ↓
          </span>
          <span className="tracking-wide">Scroll to advance story timeline</span>
        </div>

        <div className="font-mono text-xs text-white/40">
          PHASE 01 / 07
        </div>
      </motion.div>
    </motion.div>
  );
};
