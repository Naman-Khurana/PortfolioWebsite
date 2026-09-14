"use client";

/**
 * GatewaySpatialBridge
 *
 * The Phase 02 → 03 spatial bridge.
 *
 * A container that starts clipped to the size of the Gateway Node card
 * and expands via clip-path to fill the viewport, then the Projects
 * Workspace inner content fades in inside it.
 *
 * All transforms are scroll-linked via useTransform — perfectly reversible
 * by scrolling backward, with zero layout thrashing (no width/height animation).
 *
 * CRITICAL: When currentProgress >= 0.960, the component returns null so the
 * clip-path + box-shadow compositing layer is REMOVED from the DOM entirely,
 * preventing any bleed-through into Phase 07.
 */

import React from "react";
import { motion, useTransform } from "motion/react";
import { useTimeline } from "@/context/TimelineContext";
import { SoftwareConsole } from "@/components/journey/scenes/SoftwareConsole";
import { Phase05Engineering } from "@/components/journey/scenes/Phase05Engineering";
import { Phase06ProblemSolving } from "@/components/journey/scenes/Phase06ProblemSolving";

export const GatewaySpatialBridge: React.FC = () => {
  const { scrollProgress, prefersReducedMotion, currentProgress } = useTimeline();

  // ----------------------------------------------------------------
  // OUTER VISIBILITY — container fades in as camera dives toward wall
  // and stays persistent across Phase 03 (Projects), Phase 04 (Experience),
  // Phase 05 (Engineering), and Phase 06 (Problem Solving).
  // ----------------------------------------------------------------
  const outerOpacity = useTransform(
    scrollProgress,
    [0.54, 0.58, 0.950, 0.965],
    [0, 1, 1, 0]
  );

  // ----------------------------------------------------------------
  // CLIP-PATH EXPANSION (the spatial morph)
  // Expands from Gateway Card to Full Screen by 0.62
  // ----------------------------------------------------------------
  const hInset = useTransform(
    scrollProgress,
    [0.56, 0.62],
    [36, 0]
  );
  const vInset = useTransform(
    scrollProgress,
    [0.56, 0.62],
    [41, 0]
  );

  // Compose clip-path string from the two inset values
  const clipPath = useTransform(
    [hInset, vInset],
    ([h, v]: number[]) => `inset(${v}% ${h}% round 16px)`
  );

  // ----------------------------------------------------------------
  // INNER CONTENT OPACITY — Software Console opens immediately at 0.62
  // ----------------------------------------------------------------
  const innerOpacity = useTransform(
    scrollProgress,
    [0.59, 0.625],
    [0, 1]
  );

  // ----------------------------------------------------------------
  // DARK BACKGROUND SURFACE OPACITY
  // Solid opaque (0.97) from 0.62 through 0.865, then dissolves to glass (0.35)
  // for Phase 05 Engineering & Phase 06 Problem Solving (0.895 - 0.950).
  // ----------------------------------------------------------------
  const darkBgOpacity = useTransform(
    scrollProgress,
    [0.54, 0.60, 0.865, 0.895, 0.950, 0.965],
    [0, 0.97, 0.97, 0.35, 0.35, 0]
  );

  // ----------------------------------------------------------------
  // BORDER GLOW — peaks during approach, fully gone by 0.920
  // ----------------------------------------------------------------
  const borderOpacity = useTransform(
    scrollProgress,
    [0.54, 0.60, 0.70, 0.865, 0.895, 0.920],
    [0, 0.7, 0.3, 0.15, 0.25, 0]
  );

  // ----------------------------------------------------------------
  // HARD UNMOUNT: Remove from DOM entirely once Phase 07 begins.
  // Opacity-0 alone is insufficient — the clipPath compositing layer
  // still produces visible GPU artifacts (the "blue box") at story 0.97+.
  // ----------------------------------------------------------------
  if (currentProgress >= 0.965) return null;

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center"
      style={{ opacity: outerOpacity, pointerEvents: "none" }}
    >
      {/* The morphing container driven by clip-path */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={
          prefersReducedMotion
            ? {}
            : { clipPath }
        }
      >
        {/* Dynamic background surface: solid during Console, glass during Engineering */}
        <motion.div
          className="absolute inset-0 bg-[#0a0d14]"
          style={{ opacity: darkBgOpacity }}
        />

        {/* Glow border that follows the container edges */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: borderOpacity,
            boxShadow: "inset 0 0 0 1.5px rgba(56,189,248,0.65)",
          }}
        />

        {/* Unified Scenes Container */}
        <motion.div
          className="absolute inset-0 p-2 sm:p-4 md:p-6"
          style={{
            opacity: innerOpacity,
            pointerEvents: "auto",
          }}
        >
          {/* Shared positioning context — scenes stack on top of each other */}
          <div className="relative w-full h-full pointer-events-none">
            {/* Phase 03 Projects + Phase 04 Experience */}
            <div className="absolute inset-0 pointer-events-none">
              <SoftwareConsole />
            </div>

            {/* Phase 05 Engineering Topology HUD */}
            <div className="absolute inset-0 pointer-events-none">
              <Phase05Engineering />
            </div>

            {/* Phase 06 Problem Solving & Algorithmic Graph HUD */}
            <div className="absolute inset-0 pointer-events-none">
              <Phase06ProblemSolving />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
