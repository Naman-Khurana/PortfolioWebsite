"use client";

import React from "react";
import Image from "next/image";
import { motion, useTransform } from "motion/react";
import { useTimeline } from "@/context/TimelineContext";
import { HeroOverlay } from "@/components/journey/HeroOverlay";

export const Scene01Introduction: React.FC = () => {
  const { scrollProgress, prefersReducedMotion } = useTimeline();

  // Subtle opacity modulation if scrolling toward end of phase 1 intro beat
  const sceneOpacity = useTransform(scrollProgress, [0, 0.12, 0.16], [1, 1, 0.95]);

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ opacity: prefersReducedMotion ? 1 : sceneOpacity }}
    >
      {/* Background Cinematic Artwork Container */}
      <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] flex items-center justify-center">
        <Image
          src="/assets/journey/01-seated.png"
          alt="Naman Khurana seated at workspace desk with laptop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none select-none"
        />

        {/* Ambient Gradient Masks for Depth & Contrast */}
        {/* Left side gradient to elevate readability of hero typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10]/90 via-[#0a0c10]/50 to-transparent z-10 pointer-events-none" />

        {/* Subtle Bottom & Top dark blends */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/80 via-transparent to-[#0a0c10]/40 z-10 pointer-events-none" />

        {/* Subtle Ambient Laptop Screen Glow Simulation */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.35, 0.55, 0.4, 0.6, 0.35],
                  scale: [1, 1.03, 1, 1.02, 1],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[38%] top-[56%] -translate-x-1/2 -translate-y-1/2 w-48 h-36 rounded-full bg-sky-400/20 blur-3xl pointer-events-none z-10"
        />

        {/* Subtle Warm Room Light Highlight */}
        <div className="absolute right-[25%] top-[30%] w-64 h-64 rounded-full bg-amber-500/[0.08] blur-3xl pointer-events-none z-10" />
      </div>

      {/* Real React Hero Overlay */}
      <HeroOverlay />
    </motion.div>
  );
};
