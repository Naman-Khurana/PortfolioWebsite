"use client";

import React from "react";
import { TimelineProvider } from "@/context/TimelineContext";
import { CinematicViewport } from "@/components/journey/CinematicViewport";
import { TheWalkTransition } from "@/components/journey/scenes/TheWalkTransition";
import { SideNavigation } from "@/components/navigation/SideNavigation";

export default function Home() {
  return (
    <TimelineProvider>
      <main className="relative w-full bg-[#0a0c10]">
        {/* Fixed Cinematic Viewport Layer */}
        <CinematicViewport>
          <TheWalkTransition />
        </CinematicViewport>

        {/* Global UI Overlays */}
        <SideNavigation />

        {/* 
          Scroll Track Runway:
          Provides the scroll container height that drives Motion's scrollYProgress (0.0 -> 1.0).
          Extended to 800vh for spacious, comfortable multi-phase journey progression.
        */}
        <div className="relative h-[1100vh] pointer-events-none" aria-hidden="true" />
      </main>
    </TimelineProvider>
  );
}
