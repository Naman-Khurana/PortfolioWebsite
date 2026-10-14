"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useTimeline } from "@/context/TimelineContext";

/**
 * A touch-first counterpart to the desktop timeline rail.
 * It is intentionally rendered only below Tailwind's `sm` breakpoint, so it
 * cannot alter the established laptop composition.
 */
export const MobileNavigation: React.FC = () => {
  const { activeCheckpoint, activeCheckpointIndex, scrollToProgress, prefersReducedMotion } = useTimeline();
  const [isOpen, setIsOpen] = useState(false);

  const selectCheckpoint = (start: number, end: number) => {
    // Land inside the chapter so its opening fade and scroll interpolation
    // cannot leave the active state sitting just before the chapter boundary.
    scrollToProgress(start + (end - start) * 0.35);
    setIsOpen(false);
  };

  return (
    <nav
      aria-label="Story timeline navigation"
      className="fixed inset-x-3 top-[max(0.75rem,env(safe-area-inset-top))] z-50 sm:hidden pointer-events-auto"
    >
      <div className="rounded-xl border border-white/10 bg-[#0a0c10]/75 px-3 py-2 shadow-lg shadow-black/30 backdrop-blur-xl">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-story-chapters"
          onClick={() => setIsOpen((open) => !open)}
          className="flex min-h-10 w-full items-center justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/80 rounded-md"
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="font-mono text-[10px] text-sky-300">{activeCheckpoint.number} / 07</span>
            <span className="truncate text-xs font-medium text-white/90">{activeCheckpoint.title}</span>
          </span>
          <span className="font-mono text-[10px] text-white/50" aria-hidden="true">
            {isOpen ? "CLOSE" : "CHAPTERS"}
          </span>
        </button>

        {isOpen && (
          <motion.div
            id="mobile-story-chapters"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.16 }}
            className="mt-2 grid grid-cols-2 gap-1 border-t border-white/10 pt-2"
          >
            {portfolioData.checkpoints.map((checkpoint, index) => {
              const isActive = index === activeCheckpointIndex;

              return (
                <button
                  type="button"
                  key={checkpoint.id}
                  onClick={() => selectCheckpoint(checkpoint.range[0], checkpoint.range[1])}
                  aria-current={isActive ? "step" : undefined}
                  className={`min-h-10 rounded-lg px-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/80 ${
                    isActive ? "bg-sky-400/15 text-sky-100" : "text-white/65 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="mr-1 font-mono text-[9px] text-sky-300/80">{checkpoint.number}</span>
                  <span className="text-[11px]">{checkpoint.title}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </div>
    </nav>
  );
};
