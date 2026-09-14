"use client";

import React from "react";
import Image from "next/image";
import { motion, useTransform } from "motion/react";
import { useTimeline } from "@/context/TimelineContext";
import { HeroOverlay } from "@/components/journey/HeroOverlay";
import { Phase02AboutWall } from "@/components/journey/scenes/Phase02AboutWall";
import { GatewaySpatialBridge } from "@/components/journey/scenes/GatewaySpatialBridge";
import { Phase07Connect } from "@/components/journey/scenes/Phase07Connect";

export const TheWalkTransition: React.FC = () => {
  const { scrollProgress, prefersReducedMotion, currentProgress } = useTimeline();

  // True while the spatial bridge morph is actively occurring
  const isTransitioning = currentProgress >= 0.55 && currentProgress <= 0.66;

  // --------------------------------------------------------------------------
  // 1. CONTINUOUS MASTER CAMERA CHOREOGRAPHY
  // --------------------------------------------------------------------------
  // - 0.00 - 0.14: Intimate workspace framing (scale 1.05, y 1.5%)
  // - 0.14 - 0.20: Anticipatory pull-back as engineer readies to stand (scale 1.05 -> 1.0)
  // - 0.20 - 0.24: Standing pose established in stable room
  // - 0.24 - 0.32: Lateral tracking pan following engineer walking right (x 0% -> -10%)
  // - 0.32 - 0.40: Forward push-in toward thinking wall (scale 1.02 -> 1.12, x -10% -> -14%)
  // - 0.40 - 0.45: Gentle settle behind engineer's shoulder at the wall (scale 1.12 -> 1.04, x -14% -> -12%)
  // - 0.45 - 0.58: Phase 02 About Wall reading state (scale 1.04, x -12%)
  // - 0.58 - 0.62: The Dive-In: camera pushes into wall node as Gateway opens (scale 1.04 -> 1.8, x -12% -> -16%, y 0% -> -8%)
  // - 0.625 - 0.865: Software Workspace (Projects & Experience) — 100% CENTERED & ROCK-SOLID READING WINDOW
  // - 0.865 - 0.895: Gentle camera pull-back as console turns to glass, framing engineer and System Matrix HUD (scale 1.0 -> 0.95, y 0% -> -1.5%)
  // - 0.895 - 0.940: Phase 05 Engineering stable reading focus
  // - 0.940 - 0.960: Phase 06 Problem Solving stable reading state
  // - 0.960 - 0.976: Phase 06 → 07 RELEASE: subtle camera push-in
  // - 0.976 - 0.985: Frame 05 arrives, camera settles to 1.0
  // - 0.985 - 1.000: Phase 07 Connect stable reading plateau
  const cameraScale = useTransform(
    scrollProgress,
    [0.0, 0.14, 0.2, 0.24, 0.32, 0.4, 0.45, 0.58, 0.62, 0.625, 0.865, 0.895, 0.940, 0.960, 0.976, 0.985, 1.0],
    [1.05, 1.05, 1.0, 1.0, 1.02, 1.12, 1.04, 1.04, 1.8, 1.0, 1.0, 0.95, 0.95, 1.05, 1.02, 1.0, 1.0]
  );

  const cameraX = useTransform(
    scrollProgress,
    [0.0, 0.14, 0.24, 0.32, 0.4, 0.45, 0.58, 0.62, 0.625, 1.0],
    ["0%", "0%", "0%", "-10%", "-14%", "-12%", "-12%", "-16%", "0%", "0%"]
  );

  const cameraY = useTransform(
    scrollProgress,
    [0.0, 0.14, 0.2, 0.24, 0.32, 0.4, 0.45, 0.58, 0.62, 0.625, 0.865, 0.895, 0.940, 0.960, 0.976, 0.985, 1.0],
    ["1.5%", "1.5%", "0%", "0%", "-0.5%", "0%", "0%", "0%", "-8%", "0%", "0%", "-1.5%", "-1.5%", "-3%", "0%", "0%", "0%"]
  );

  // --------------------------------------------------------------------------
  // 2. SPATIAL MASKING & LAYER CONTINUITY
  // --------------------------------------------------------------------------

  // Frame 01: Seated (Persistent foundation of desk environment)
  const opacity01 = useTransform(
    scrollProgress,
    [0.0, 0.25, 0.3, 1.0],
    [1, 1, 0, 0]
  );

  // Frame 02: Standing (Localized body mask over identical room)
  // Only the character's rising figure blends over Frame 01; background remains 100% rock-solid.
  const opacity02 = useTransform(
    scrollProgress,
    [0.0, 0.18, 0.23, 0.26, 0.31, 1.0],
    [0, 0, 1, 1, 0, 0]
  );
  const mask02Spread = useTransform(
    scrollProgress,
    [0.18, 0.23],
    [40, 95]
  );
  const mask02 = useTransform(
    mask02Spread,
    (spread) =>
      `radial-gradient(ellipse 55% 80% at 74% 45%, rgba(0,0,0,1) ${spread * 0.5}%, rgba(0,0,0,0) ${spread}%)`
  );

  // Frame 03: Walking (Revealed dynamically via directional camera sweep)
  const opacity03 = useTransform(
    scrollProgress,
    [0.0, 0.24, 0.28, 0.34, 0.39, 1.0],
    [0, 0, 1, 1, 0, 0]
  );
  const mask03Spread = useTransform(
    scrollProgress,
    [0.24, 0.3],
    [30, 110]
  );
  const mask03 = useTransform(
    mask03Spread,
    (s) =>
      `radial-gradient(ellipse ${s}% ${s * 0.9}% at 58% 50%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)`
  );
  const scale03 = useTransform(
    scrollProgress,
    [0.24, 0.36],
    [0.98, 1.04]
  );
  const x03 = useTransform(
    scrollProgress,
    [0.24, 0.36],
    ["3%", "-3%"]
  );

  // Frame 04: At Wall — fades out during the zoom-through transition
  const opacity04 = useTransform(
    scrollProgress,
    [0.0, 0.33, 0.38, 0.58, 0.63, 0.865, 0.895, 0.945, 0.960, 0.976, 1.0],
    [0, 0, 1, 1, 0.5, 0.5, 1, 1, 1, 0, 0]
  );

  // Frame 05: Sunset Horizon — fades in right as the zoom peaks and Frame04 is gone
  const opacity05 = useTransform(
    scrollProgress,
    [0.0, 0.968, 0.980, 1.0],
    [0, 0, 1, 1]
  );
  const mask04Spread = useTransform(
    scrollProgress,
    [0.33, 0.42, 0.865, 0.895],
    [35, 125, 125, 150]
  );
  const mask04 = useTransform(
    mask04Spread,
    (s) =>
      `radial-gradient(ellipse ${s}% ${s}% at 65% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)`
  );
  const scale04 = useTransform(
    scrollProgress,
    [0.33, 0.45, 0.58, 0.64, 0.865, 0.895],
    [1.06, 1.0, 1.0, 1.3, 1.0, 1.0]
  );
  const x04 = useTransform(
    scrollProgress,
    [0.33, 0.45],
    ["2%", "0%"]
  );

  // --------------------------------------------------------------------------
  // 3. TRANSIENT MOTION BLUR (subtle burst during 06→07 crossover)
  // --------------------------------------------------------------------------
  const blurFilter = useTransform(
    scrollProgress,
    [0.0, 0.255, 0.275, 0.295, 0.345, 0.365, 0.385, 0.58, 0.61, 0.64, 0.960, 0.968, 0.976, 1.0],
    [
      "blur(0px)",
      "blur(0px)",
      "blur(2.5px)",
      "blur(0px)",
      "blur(0px)",
      "blur(2.0px)",
      "blur(0px)",
      "blur(0px)",
      "blur(3.0px)",
      "blur(0px)",
      "blur(0px)",
      "blur(2px)",   // subtle blur as scene transitions
      "blur(0px)",   // clears as Frame 05 settles in
      "blur(0px)",
    ]
  );

  // --------------------------------------------------------------------------
  // 4. AMBIENT WORKSPACE LIGHTING EVOLUTION
  // --------------------------------------------------------------------------
  const deskGlowOpacity = useTransform(
    scrollProgress,
    [0.0, 0.14, 0.2],
    [0.45, 0.45, 0]
  );

  const wallGlowOpacity = useTransform(
    scrollProgress,
    [0.33, 0.42, 0.58, 0.63, 1.0],
    [0, 0.45, 0.45, 0, 0]
  );

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        scale: prefersReducedMotion ? 1 : cameraScale,
        x: prefersReducedMotion ? "0%" : cameraX,
        y: prefersReducedMotion ? "0%" : cameraY,
        filter: prefersReducedMotion ? "none" : blurFilter,
      }}
    >
      {/* Shared Cinematic Canvas Stage */}
      <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] flex items-center justify-center">

        {/* ----------------- FRAME 01: SEATED AT DESK ----------------- */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ opacity: opacity01 }}
        >
          <Image
            src="/assets/journey/01-seated.png"
            alt="Naman Khurana seated at workspace desk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </motion.div>

        {/* ----------------- FRAME 02: STANDING (LOCALIZED MASK) ----------------- */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity02,
            maskImage: prefersReducedMotion ? undefined : mask02,
            WebkitMaskImage: prefersReducedMotion ? undefined : mask02,
          }}
        >
          <Image
            src="/assets/journey/02-standing.png"
            alt="Naman Khurana standing from desk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </motion.div>

        {/* ----------------- FRAME 03: WALKING (CAMERA TRACKING SWEEP) ----------------- */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity03,
            x: prefersReducedMotion ? "0%" : x03,
            scale: prefersReducedMotion ? 1 : scale03,
            maskImage: prefersReducedMotion ? undefined : mask03,
            WebkitMaskImage: prefersReducedMotion ? undefined : mask03,
          }}
        >
          <Image
            src="/assets/journey/03-walking.png"
            alt="Naman Khurana walking toward the thinking wall"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </motion.div>

        {/* ----------------- FRAME 04: AT THINKING WALL (EXPANDING FOCUS) ----------------- */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity04,
            x: prefersReducedMotion ? "0%" : x04,
            scale: prefersReducedMotion ? 1 : scale04,
            maskImage: prefersReducedMotion ? undefined : mask04,
            WebkitMaskImage: prefersReducedMotion ? undefined : mask04,
          }}
        >
          <Image
            src="/assets/journey/04-wall.png"
            alt="Naman Khurana arrived at the thinking wall"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </motion.div>

        {/* ----------------- FRAME 05: SUNSET HORIZON / CONNECT (Final calm resolution) ----------------- */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ opacity: opacity05 }}
        >
          <Image
            src="/assets/journey/05-outro.png"
            alt="Naman Khurana standing at the window overlooking the city at sunset"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </motion.div>

        {/* ----------------- AMBIENT LIGHTING OVERLAYS ----------------- */}

        {/* Desk Laptop Glow (Active during Phase 1, fades as character leaves desk) */}
        <motion.div
          className="absolute left-[38%] top-[56%] -translate-x-1/2 -translate-y-1/2 w-48 h-36 rounded-full bg-sky-400/20 blur-3xl pointer-events-none z-10"
          style={{ opacity: deskGlowOpacity }}
        />

        {/* Wall Diagram Warm Ambient Light (Illuminates as character arrives at wall) */}
        <motion.div
          className="absolute right-[25%] top-[35%] w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none z-10"
          style={{ opacity: wallGlowOpacity }}
        />

        {/* Subtle Cinematic Vignette & Edge Grading */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10]/80 via-transparent to-[#0a0c10]/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/70 via-transparent to-[#0a0c10]/40 z-10 pointer-events-none" />
      </div>

      {/* Real React Hero Overlay (Tied to initial scroll timeline) */}
      <HeroOverlay />

      {/* Phase 02: About Wall Blueprint Overlay with Gateway Node */}
      <Phase02AboutWall isTransitioning={isTransitioning} />

      {/* Gateway Spatial Bridge: morphs Gateway Node → Projects Workspace (Active 0.54 -> 0.98) */}
      <GatewaySpatialBridge />

      {/* Phase 07 Connect: final contact overlay over the sunset horizon (Active 0.980 -> 1.00) */}
      <Phase07Connect />
    </motion.div>
  );
};
