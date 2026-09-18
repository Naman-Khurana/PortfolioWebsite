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
  const {
    scrollProgress,
    prefersReducedMotion,
    currentProgress,
  } = useTimeline();

  // True while the spatial bridge morph is actively occurring
  const isTransitioning =
    currentProgress >= 0.34 && currentProgress <= 0.66;

  // --------------------------------------------------------------------------
  // 1. CONTINUOUS MASTER CAMERA CHOREOGRAPHY
  // --------------------------------------------------------------------------
  //
  // 0.00 - 0.14 : Intimate workspace framing
  // 0.14 - 0.20 : Pull-back as engineer prepares to stand
  // 0.20 - 0.24 : Standing pose
  // 0.24 - 0.32 : Standing pose / brief hold
  // 0.32 - 0.48 : Direct cinematic transition to the thinking wall
  // 0.48 - 0.58 : Wall scene settles
  //
  // 0.58 - 0.62 : Dive into wall
  // 0.625 - 0.865 : Software Workspace
  // 0.865 - 0.895 : Camera pull-back
  // 0.895 - 0.940 : Engineering stable reading focus
  // 0.940 - 0.960 : Problem Solving
  // 0.960 - 0.976 : Release
  // 0.976 - 0.985 : Frame 05 arrives
  // 0.985 - 1.000 : Connect
  // --------------------------------------------------------------------------

  const cameraScale = useTransform(
    scrollProgress,
    [
      0.0,
      0.14,
      0.20,
      0.24,
      0.32,
      0.40,
      0.48,
      0.58,
      0.62,
      0.625,
      0.865,
      0.895,
      0.940,
      0.960,
      0.976,
      0.985,
      1.0,
    ],
    [
      1.05,
      1.05,
      1.0,
      1.0,
      1.01,
      1.04,
      1.03,
      1.04,
      1.8,
      1.0,
      1.0,
      0.95,
      0.95,
      1.05,
      1.02,
      1.0,
      1.0,
    ]
  );

  const cameraX = useTransform(
    scrollProgress,
    [
      0.0,
      0.14,
      0.24,
      0.32,
      0.40,
      0.48,
      0.58,
      0.62,
      0.625,
      1.0,
    ],
    [
      "0%",
      "0%",
      "0%",
      "0%",
      "-3%",
      "-7%",
      "-5%",
      "-16%",
      "0%",
      "0%",
    ]
  );

  const cameraY = useTransform(
    scrollProgress,
    [
      0.0,
      0.14,
      0.20,
      0.24,
      0.32,
      0.40,
      0.48,
      0.58,
      0.62,
      0.625,
      0.865,
      0.895,
      0.940,
      0.960,
      0.976,
      0.985,
      1.0,
    ],
    [
      "1.5%",
      "1.5%",
      "0%",
      "0%",
      "-0.25%",
      "-0.75%",
      "-0.5%",
      "-1.5%",
      "-8%",
      "0%",
      "0%",
      "0%",
      "-1.5%",
      "-1.5%",
      "-3%",
      "0%",
      "0%",
    ]
  );

  // --------------------------------------------------------------------------
  // 2. SPATIAL MASKING & LAYER CONTINUITY
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // FRAME 01: SEATED
  // --------------------------------------------------------------------------

  const opacity01 = useTransform(
    scrollProgress,
    [0.0, 0.15, 0.25, 0.3, 1.0],
    [1, 1, 0, 0, 0]
  );

  // --------------------------------------------------------------------------
  // FRAME 01.6: ALMOST STANDING
  // --------------------------------------------------------------------------

  const opacity01_6 = useTransform(
    scrollProgress,
    [0.0, 0.10, 0.25, 0.3, 1.0],
    [0, 1, 1, 0, 0]
  );

  // --------------------------------------------------------------------------
  // FRAME 02: STANDING
  // --------------------------------------------------------------------------

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
      `radial-gradient(
        ellipse 55% 80% at 74% 45%,
        rgba(0,0,0,1) ${spread * 0.5}%,
        rgba(0,0,0,0) ${spread}%
      )`
  );

  // --------------------------------------------------------------------------
  // FRAME 03: DIRECT TRANSITION TO THINKING WALL
  // --------------------------------------------------------------------------
  //
  // The walking sequence has intentionally been removed.
  // After the standing pose, the camera makes a short directional move
  // and reveals the wall scene directly. This keeps the narrative fast
  // and avoids exposing the frame-to-frame walking interpolation.
  // --------------------------------------------------------------------------

  const opacity03 = useTransform(
    scrollProgress,
    [0.0, 0.24, 0.28, 0.34, 0.38, 1.0],
    [0, 0, 1, 1, 0, 0]
  );

  const mask03Spread = useTransform(
    scrollProgress,
    [0.27, 0.38],
    [35, 115]
  );

  const mask03 = useTransform(
    mask03Spread,
    (s) =>
      `radial-gradient(
        ellipse ${s}% ${s * 0.9}% at 62% 50%,
        rgba(0,0,0,1) 45%,
        rgba(0,0,0,0) 100%
      )`
  );

  const scale03 = useTransform(
    scrollProgress,
    [0.27, 0.40],
    [0.99, 1.035]
  );

  const x03 = useTransform(
    scrollProgress,
    [0.27, 0.40],
    ["1%", "-5%"]
  );

  // --------------------------------------------------------------------------
  // FRAME 04: WALL / THINKING SCENE
  //
  // Existing wall image.
  //
  // This now comes AFTER the two new transition images.
  // --------------------------------------------------------------------------

  const opacity04 = useTransform(
    scrollProgress,
    [
      0.34,
      0.38,
      0.44,
      0.52,
      0.58,
      0.62,
      0.63,
      0.865,
      0.895,
      0.945,
      0.960,
      0.976,
      1.0,
    ],
    [
      0,
      1,
      1,
      1,
      1,
      0.5,
      0.5,
      1,
      0,
      0,
      0,
      0,
      0,
    ]
  );

  const mask04Spread = useTransform(
    scrollProgress,
    [0.34, 0.48, 0.62, 0.865, 0.895],
    [30, 125, 125, 125, 150]
  );

  const mask04 = useTransform(
    mask04Spread,
    (s) =>
      `radial-gradient(
        ellipse ${s}% ${s}% at 65% 50%,
        rgba(0,0,0,1) 50%,
        rgba(0,0,0,0) 100%
      )`
  );

  const scale04 = useTransform(
    scrollProgress,
    [0.38, 0.52, 0.62, 0.64],
    [1.035, 1.0, 1.0, 1.0]
  );

  const x04 = useTransform(
    scrollProgress,
    [0.38, 0.52, 0.62],
    ["-5%", "0%", "0%"]
  );

  // --------------------------------------------------------------------------
  // FRAME 05: SUNSET HORIZON
  // --------------------------------------------------------------------------

  const opacity05 = useTransform(
    scrollProgress,
    [0.0, 0.945, 0.960, 0.968, 0.980, 1.0],
    [0, 0, 0.5, 1, 1, 1]
  );

  // --------------------------------------------------------------------------
  // 3. TRANSIENT MOTION BLUR
  // --------------------------------------------------------------------------

  const blurFilter = useTransform(
    scrollProgress,
    [
      0.0,
      0.15,
      0.255,
      0.275,
      0.295,
      0.30,
      0.34,
      0.38,
      0.42,
      0.48,
      0.58,
      0.61,
      0.64,
      0.960,
      0.968,
      0.976,
      1.0,
    ],
    [
      "blur(0px)",
      "blur(0px)",
      "blur(0px)",
      "blur(2.5px)",
      "blur(0px)",
      "blur(0px)",
      "blur(1.5px)",
      "blur(0px)",
      "blur(1px)",
      "blur(0px)",
      "blur(0px)",
      "blur(3px)",
      "blur(0px)",
      "blur(0px)",
      "blur(2px)",
      "blur(0px)",
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
    [0.38, 0.46, 0.54, 0.63, 1.0],
    [0, 0.3, 0.45, 0, 0]
  );

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

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

        {/* ------------------------------------------------------------------
            FRAME 01: SEATED AT DESK
        ------------------------------------------------------------------ */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity01,
          }}
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

        {/* ------------------------------------------------------------------
            FRAME 01.6: ALMOST STANDING
        ------------------------------------------------------------------ */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity01_6,
          }}
        >
          <Image
            src="/assets/journey/01_6-almost_standing.png"
            alt="Naman Khurana almost standing at workspace desk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </motion.div>

        {/* ------------------------------------------------------------------
            FRAME 02: STANDING
        ------------------------------------------------------------------ */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity02,
            maskImage: prefersReducedMotion
              ? undefined
              : mask02,
            WebkitMaskImage: prefersReducedMotion
              ? undefined
              : mask02,
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

        {/* ------------------------------------------------------------------
            FRAME 03: DIRECT ARRIVAL AT THINKING WALL
        ------------------------------------------------------------------ */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: prefersReducedMotion ? 0 : opacity03,
            x: prefersReducedMotion ? "0%" : x03,
            scale: prefersReducedMotion ? 1 : scale03,
            maskImage: prefersReducedMotion ? undefined : mask03,
            WebkitMaskImage: prefersReducedMotion ? undefined : mask03,
          }}
        >
          <Image
            src="/assets/journey/03-wall-arrival.png"
            alt="Naman Khurana arriving at the thinking wall"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </motion.div>

        {/* ------------------------------------------------------------------
            FRAME 04: WALL / THINKING SCENE
        ------------------------------------------------------------------ */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity04,
            x: prefersReducedMotion ? "0%" : x04,
            scale: prefersReducedMotion ? 1 : scale04,
            maskImage: prefersReducedMotion
              ? undefined
              : mask04,
            WebkitMaskImage: prefersReducedMotion
              ? undefined
              : mask04,
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

        {/* ------------------------------------------------------------------
            FRAME 05: SUNSET HORIZON / CONNECT
        ------------------------------------------------------------------ */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity05,
          }}
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

        {/* ------------------------------------------------------------------
            AMBIENT LIGHTING OVERLAYS
        ------------------------------------------------------------------ */}

        {/* Desk Laptop Glow */}
        <motion.div
          className="absolute left-[38%] top-[56%] -translate-x-1/2 -translate-y-1/2 w-48 h-36 rounded-full bg-sky-400/20 blur-3xl pointer-events-none z-10"
          style={{
            opacity: deskGlowOpacity,
          }}
        />

        {/* Wall Diagram Warm Ambient Light */}
        <motion.div
          className="absolute right-[25%] top-[35%] w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none z-10"
          style={{
            opacity: wallGlowOpacity,
          }}
        />

        {/* Subtle Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10]/80 via-transparent to-[#0a0c10]/50 z-10 pointer-events-none" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/70 via-transparent to-[#0a0c10]/40 z-10 pointer-events-none" />
      </div>

      {/* Real React Hero Overlay */}
      <HeroOverlay />

      {/* Phase 02: About Wall Blueprint Overlay */}
      <Phase02AboutWall isTransitioning={isTransitioning} />

      {/* Gateway Spatial Bridge */}
      <GatewaySpatialBridge />

      {/* Phase 07 Connect */}
      <Phase07Connect />
    </motion.div>
  );
}