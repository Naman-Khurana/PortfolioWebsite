"use client";

import React from "react";
import { motion } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useTimeline } from "@/context/TimelineContext";

export const SideNavigation: React.FC = () => {
  const { currentProgress, activeCheckpointIndex, scrollToProgress, prefersReducedMotion } = useTimeline();

  const isWorkspaceActive = currentProgress >= 0.58 && currentProgress <= 0.96;

  return (
    <nav
      aria-label="Story Timeline Navigation"
      className={`fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-start gap-4 select-none pointer-events-auto transition-all duration-300 ${
        isWorkspaceActive ? "opacity-35 hover:opacity-100" : "opacity-100"
      }`}
    >
      {/* Chapter Indicator Bar */}
      <div className="relative pl-5 border-l border-white/10 flex flex-col gap-5 py-2">
        {/* Dynamic scroll progress indicator along the track */}
        <motion.div
          className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-sky-400 to-amber-400/80 shadow-[0_0_12px_rgba(56,189,248,0.5)] origin-top"
          style={{
            height: `${Math.min(100, Math.max(8, currentProgress * 100 * 7))}%`,
          }}
          transition={prefersReducedMotion ? { duration: 0 } : undefined}
        />

        {portfolioData.checkpoints.map((cp, idx) => {
          const isActive = idx === activeCheckpointIndex;
          const isPhase1Available = cp.activeInPhase1;

          return (
            <div
              key={cp.id}
              className="group flex items-center gap-3 relative transition-all duration-300"
            >
              {/* Checkpoint Dot */}
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-sky-400 ring-4 ring-sky-400/20 scale-125"
                    : isPhase1Available
                    ? "bg-white/50 group-hover:bg-white/80"
                    : "bg-white/20"
                }`}
              />

              {/* Number and Label */}
              <div className="flex items-baseline gap-2">
                <span
                  className={`font-mono text-xs tracking-wider transition-colors duration-200 ${
                    isActive
                      ? "text-sky-300 font-semibold"
                      : isPhase1Available
                      ? "text-white/60 group-hover:text-white/90"
                      : "text-white/25"
                  }`}
                >
                  {cp.number}
                </span>

                <span
                  className={`text-xs tracking-wide uppercase transition-all duration-200 ${
                    isActive
                      ? "text-white font-medium opacity-100 translate-x-0"
                      : isPhase1Available
                      ? "text-white/50 group-hover:text-white/80 opacity-80"
                      : "text-white/20 opacity-40 cursor-not-allowed"
                  }`}
                >
                  {cp.title}
                </span>

                {!isPhase1Available && (
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-amber-400/60 ml-1">
                    (upcoming)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline time progression readout */}
      <div className="pl-5 pt-2 flex items-center gap-2 text-[11px] font-mono text-white/40">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
        <span>SCENE {portfolioData.checkpoints[activeCheckpointIndex]?.number || "01"} · T: {(currentProgress * 100).toFixed(1)}%</span>
      </div>
    </nav>
  );
};
