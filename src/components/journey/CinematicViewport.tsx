"use client";

import React from "react";
import { motion, useTransform } from "motion/react";
import { useTimeline } from "@/context/TimelineContext";

interface CinematicViewportProps {
  children: React.ReactNode;
}

export const CinematicViewport: React.FC<CinematicViewportProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#0a0c10] select-none">
      {/* Subtle Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(5,7,10,0.75)_100%)]" />

      {/* Cinematic Edge Letterboxing (Subtle framing) */}
      <div className="absolute top-0 inset-x-0 h-4 sm:h-6 bg-black/60 backdrop-blur-sm z-30 pointer-events-none border-b border-white/[0.03]" />
      <div className="absolute bottom-0 inset-x-0 h-4 sm:h-6 bg-black/60 backdrop-blur-sm z-30 pointer-events-none border-t border-white/[0.03]" />

      {/* Main Viewport Stage */}
      <div className="relative w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
