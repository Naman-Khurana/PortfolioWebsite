"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useScroll, useTransform, MotionValue, useMotionValue } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TimelineContextType {
  scrollProgress: MotionValue<number>;
  rawScrollProgress: MotionValue<number>;
  currentProgress: number;
  activeCheckpointIndex: number;
  activeCheckpoint: (typeof portfolioData.checkpoints)[0];
  containerRef: React.RefObject<HTMLDivElement | null>;
  prefersReducedMotion: boolean;
  scrollToProgress: (target: number) => void;
}

const TimelineContext = createContext<TimelineContextType | null>(null);

/**
 * READING PLATEAU ARCHITECTURE
 *
 * Raw scroll (0→1) is remapped to "story time" (0→1) so that
 * certain raw-scroll ranges produce a very small story-time change —
 * giving the reader a wide, stable window where everything is frozen.
 *
 * Reading plateaus:
 *   Phase 03 Projects   raw 0.62 → 0.72 maps to story 0.64 → 0.65  (10% raw = 1% story)
 *   Phase 04 Experience raw 0.77 → 0.85 maps to story 0.78 → 0.79  (8%  raw = 1% story)
 *   Phase 05 Engineering raw 0.895 → 0.93 maps to story 0.90 → 0.905
 *
 * Outside plateaus the mapping is roughly linear (story advances normally).
 *
 * Raw input breakpoints  →  Story output breakpoints
 */
const RAW_INPUTS = [
  0.00,
  0.62,  // Projects console fully open — begin plateau
  0.72,  // End of Projects reading plateau
  0.745, // 03→04 crossover begins
  0.77,  // Experience begins — begin plateau
  0.85,  // End of Experience reading plateau
  0.865, // 04→05 crossover begins
  0.895, // Engineering stable begins — begin plateau
  0.93,  // End of Engineering reading plateau
  1.00,
] as const;

const STORY_OUTPUTS = [
  0.00,
  0.62,  // story matches raw up to Projects open
  0.65,  // plateau: 10% raw → 0.03 story progress (reading window)
  0.745, // fast advance through the crossover
  0.77,  // story matches raw at Experience start
  0.795, // plateau: 8% raw → 0.025 story progress (reading window)
  0.865, // fast advance through 04→05 crossover
  0.895, // story matches raw at Engineering start
  0.91,  // plateau: 3.5% raw → 0.015 story progress (reading window)
  1.00,
] as const;

export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  const { scrollYProgress } = useScroll();

  // Remapped "story time" MotionValue — all cinematic components use this
  const storyProgress = useTransform(
    scrollYProgress,
    [...RAW_INPUTS] as number[],
    [...STORY_OUTPUTS] as number[]
  );

  useEffect(() => {
    // currentProgress tracks the story-remapped value so checkpoints and
    // SideNavigation highlight the correct phase during reading plateaus
    const unsubscribe = storyProgress.on("change", (latest) => {
      setCurrentProgress(latest);
    });
    return () => unsubscribe();
  }, [storyProgress]);

  // Determine active checkpoint based on remapped story progress
  const activeCheckpointIndex = portfolioData.checkpoints.findIndex(
    (cp) => currentProgress >= cp.range[0] && currentProgress < cp.range[1]
  );
  const safeCheckpointIndex = activeCheckpointIndex >= 0 ? activeCheckpointIndex : 0;
  const activeCheckpoint = portfolioData.checkpoints[safeCheckpointIndex];

  const scrollToProgress = (targetProgress: number) => {
    if (typeof window === "undefined") return;
    // Invert the story→raw mapping to find the raw scroll position for the target
    // Simple linear scan through breakpoints
    let rawTarget = targetProgress;
    for (let i = 0; i < RAW_INPUTS.length - 1; i++) {
      const r0 = RAW_INPUTS[i], r1 = RAW_INPUTS[i + 1];
      const s0 = STORY_OUTPUTS[i], s1 = STORY_OUTPUTS[i + 1];
      if (targetProgress >= s0 && targetProgress <= s1) {
        const t = s1 === s0 ? 0 : (targetProgress - s0) / (s1 - s0);
        rawTarget = r0 + t * (r1 - r0);
        break;
      }
    }
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: rawTarget * maxScroll,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <TimelineContext.Provider
      value={{
        scrollProgress: storyProgress,      // remapped — all cinematic animations use this
        rawScrollProgress: scrollYProgress, // raw — available if needed
        currentProgress,
        activeCheckpointIndex: safeCheckpointIndex,
        activeCheckpoint,
        containerRef,
        prefersReducedMotion,
        scrollToProgress,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export function useTimeline(): TimelineContextType {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used within a TimelineProvider");
  }
  return context;
}
