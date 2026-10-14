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
 * BALANCED STORY TIMELINE
 *
 * Raw scroll (0→1) is remapped to story time (0→1). This redistributes
 * scroll distance across narrative phases while preserving their existing
 * story-time animation keyframes.
 *
 * Reading plateaus:
 *   Projects   raw 0.30 → 0.34 maps to story 0.62 → 0.65
 *   Experience raw 0.42 → 0.45 maps to story 0.77 → 0.795
 *   Engineering raw 0.53 → 0.57 maps to story 0.895 → 0.910
 *   Problem Solving raw 0.65 → 0.75 maps to story 0.945 → 0.965
 *
 * Outside reading windows, story time advances through the phase transitions.
 *
 * Raw input breakpoints  →  Story output breakpoints
 */
const RAW_INPUTS = [
  0.00,
  0.18,  // Introduction completes
  0.30,  // About completes / Projects begin
  0.34,  // Projects reading window completes
  0.40,  // Projects→Experience crossover begins
  0.42,  // Experience begins
  0.45,  // Experience reading window completes
  0.51,  // Experience→Engineering crossover begins
  0.53,  // Engineering begins
  0.57,  // Engineering reading window completes
  0.62,  // Problem Solving entrance begins
  0.65,  // Problem Solving reading window begins
  0.75,  // End of extended Problem Solving reading window
  0.81,  // Phase 06→07 crossover completes
  1.00,  // End of Phase 07 Connect reading plateau
] as const;

const STORY_OUTPUTS = [
  0.00,
  0.45,
  0.62,
  0.65,
  0.745,
  0.77,
  0.795,
  0.865,
  0.895,
  0.910,
  0.930,
  0.945,
  0.965,
  0.985,
  1.00,  // Connect reading plateau (story 0.985 -> 1.00)
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
