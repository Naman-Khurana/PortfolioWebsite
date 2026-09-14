"use client";

import React from "react";
import { motion } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useTimeline } from "@/context/TimelineContext";

export const SideNavigation: React.FC = () => {
  const { currentProgress, activeCheckpointIndex, scrollToProgress, prefersReducedMotion } = useTimeline();

  return (
    <nav
      aria-label="Story Timeline Navigation"
      className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3 select-none pointer-events-auto"
    >
      {/*
        This is deliberately a compact scrubber instead of a label-heavy menu.
        Full-screen scenes own the canvas, so labels here used to collide with
        the hero and the application panels. Each scene already identifies
        itself in its own header; this rail only preserves orientation and
        direct chapter navigation.
      */}
      <div className="relative border-l border-white/15 flex flex-col gap-4 py-1">
        {/* Dynamic scroll progress indicator along the track */}
        <motion.div
          className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-sky-400 to-amber-400/80 shadow-[0_0_12px_rgba(56,189,248,0.5)] origin-top"
          style={{
            height: `${Math.min(100, Math.max(2, currentProgress * 100))}%`,
          }}
          transition={prefersReducedMotion ? { duration: 0 } : undefined}
        />

        {portfolioData.checkpoints.map((cp, idx) => {
          const isActive = idx === activeCheckpointIndex;
          const chapterStart = cp.range[0];

          return (
            <button
              type="button"
              key={cp.id}
              onClick={() => scrollToProgress(chapterStart)}
              aria-label={`Go to ${cp.title}`}
              aria-current={isActive ? "step" : undefined}
              title={`${cp.number} · ${cp.title}`}
              className="group relative -ml-[5px] flex h-3 w-3 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/80"
            >
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-sky-400 ring-4 ring-sky-400/20 scale-125"
                    : "bg-white/45 group-hover:bg-white/90 group-hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </div>

      <span className="sr-only">
        Scene {portfolioData.checkpoints[activeCheckpointIndex]?.number || "01"} · {(currentProgress * 100).toFixed(1)}% complete
      </span>
    </nav>
  );
};
