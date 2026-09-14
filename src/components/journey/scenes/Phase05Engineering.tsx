"use client";

/**
 * Phase05Engineering
 *
 * Phase 05: Engineering (0.88 – 0.95)
 * Concept: "The System Matrix / Transparent Control Room"
 *
 * Visualizes Naman Khurana's backend engineering stack as a live,
 * interconnected system topology and data flow matrix.
 *
 * Asymmetric layout:
 * - Left: Vertical Tier Selector + Deep Architecture Specification Inspector
 * - Right: Interactive SVG System Topology Matrix with live conduits and node packets
 *
 * Sits inside GatewaySpatialBridge as a semi-transparent HUD overlay,
 * keeping the physical room & engineer at the wall (04-wall.png) visible in the background.
 */

import React, { useState } from "react";
import { motion, useTransform } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useTimeline } from "@/context/TimelineContext";

export const Phase05Engineering: React.FC = () => {
  const { scrollProgress, prefersReducedMotion, currentProgress } = useTimeline();
  const [activeTier, setActiveTier] = useState<number>(0);

  // ================================================================
  // TIMING & READING WINDOW PLATEAUS
  // Entrance: 0.875 -> 0.895
  // Stable Reading Window: 0.895 -> 0.925 (Nothing moves or jitters)
  // Exit Transition: 0.925 -> 0.945
  // ================================================================
  const containerOpacity = useTransform(
    scrollProgress,
    [0.875, 0.895, 0.925, 0.945],
    [0, 1, 1, 0]
  );

  const containerY = useTransform(
    scrollProgress,
    [0.875, 0.895, 0.925, 0.945],
    ["16px", "0px", "0px", "-16px"]
  );

  const headerOpacity = useTransform(scrollProgress, [0.880, 0.895], [0, 1]);
  const contentOpacity = useTransform(scrollProgress, [0.885, 0.900], [0, 1]);

  const tierThemes = [
    {
      code: "TIER // 01",
      badge: "STATE & STORAGE",
      color: "text-amber-400",
      border: "border-amber-500/40",
      glow: "shadow-[0_0_30px_rgba(245,158,11,0.2)]",
      bgActive: "bg-amber-500/15",
      accent: "bg-amber-400",
      streamLabel: "ACID TRANSACTIONS // POSTGRESQL // REDIS",
      cx: 140,
      cy: 220,
    },
    {
      code: "TIER // 02",
      badge: "CORE SERVICES & API MESH",
      color: "text-sky-400",
      border: "border-sky-500/40",
      glow: "shadow-[0_0_30px_rgba(56,189,248,0.2)]",
      bgActive: "bg-sky-500/15",
      accent: "bg-sky-400",
      streamLabel: "SPRING BOOT // RESTFUL SERVICES // QUEUES",
      cx: 320,
      cy: 110,
    },
    {
      code: "TIER // 03",
      badge: "INFRASTRUCTURE & RUNTIMES",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      glow: "shadow-[0_0_30px_rgba(52,211,153,0.2)]",
      bgActive: "bg-emerald-500/15",
      accent: "bg-emerald-400",
      streamLabel: "DOCKER // CI/CD PIPELINES // NGINX",
      cx: 320,
      cy: 330,
    },
    {
      code: "TIER // 04",
      badge: "INTELLIGENCE & DESIGN",
      color: "text-purple-400",
      border: "border-purple-500/40",
      glow: "shadow-[0_0_30px_rgba(192,132,252,0.2)]",
      bgActive: "bg-purple-500/15",
      accent: "bg-purple-400",
      streamLabel: "VECTOR SEARCH // SYSTEM DESIGN // RAG",
      cx: 500,
      cy: 220,
    },
  ];

  const currentTheme = tierThemes[activeTier] || tierThemes[0];
  const isInteractive = currentProgress >= 0.88 && currentProgress < 0.935;

  return (
    <motion.div
      className="relative w-full h-full rounded-2xl border border-white/15 bg-[#0a0e17]/85 backdrop-blur-xl shadow-[0_0_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
      style={
        prefersReducedMotion
          ? { pointerEvents: isInteractive ? "auto" : "none" }
          : {
              opacity: containerOpacity,
              y: containerY,
              pointerEvents: isInteractive ? "auto" : "none",
            }
      }
    >
      {/* ============================================================
          HUD TOP BAR
          ============================================================ */}
      <motion.div
        className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.02] shrink-0"
        style={prefersReducedMotion ? {} : { opacity: headerOpacity }}
      >
        <div className="flex items-center gap-3">
          {/* Status Lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span className="font-mono text-xs text-sky-300 font-semibold tracking-wider">
              SYSTEM_TOPOLOGY // ACTIVE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-white/50 pl-3 border-l border-white/10">
            <span className="text-white/40">MATRIX:</span>
            <span className="text-white/80">DISTRIBUTED_SERVICES_&_INFRASTRUCTURE</span>
          </div>
        </div>

        {/* Phase tag & Telemetry */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2 text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>NODES: 4 TIERS OPERATIONAL</span>
          </div>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="text-amber-400/80 font-medium">PHASE 05 // ENGINEERING</span>
        </div>
      </motion.div>

      {/* ============================================================
          MAIN ASYMMETRIC VIEWPORT: Left = Specs, Right = Topology SVG
          ============================================================ */}
      <motion.div
        className="flex-1 p-3 sm:p-5 md:p-6 overflow-hidden flex flex-col lg:flex-row gap-5 min-h-0"
        style={prefersReducedMotion ? {} : { opacity: contentOpacity }}
      >
        {/* ============================================================
            LEFT COLUMN: TIER SELECTOR + DEEP ARCHITECTURE SPEC
            ============================================================ */}
        <div className="w-full lg:w-[440px] xl:w-[480px] flex flex-col gap-3.5 shrink-0 overflow-y-auto pr-1">
          
          {/* Tier Selection Buttons */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center justify-between">
              <span>Select Architecture Tier</span>
              <span className="text-white/25">4 TIERS MAPPED</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {portfolioData.skills.map((skillGroup, index) => {
                const theme = tierThemes[index] || tierThemes[0];
                const isSelected = activeTier === index;

                return (
                  <button
                    key={skillGroup.category}
                    onClick={() => setActiveTier(index)}
                    className={`text-left p-3 rounded-xl border transition-all flex flex-col gap-1 ${
                      isSelected
                        ? `${theme.border} ${theme.bgActive} ${theme.glow} ring-1 ring-white/20`
                        : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[9px] font-bold ${theme.color}`}>
                        {theme.code}
                      </span>
                      <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-white/15 text-white" : "bg-white/5 text-white/30"
                      }`}>
                        {isSelected ? "ACTIVE" : "VIEW"}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white tracking-tight truncate">
                      {skillGroup.category}
                    </div>
                    <div className="text-[9px] font-mono text-white/40 truncate">
                      {theme.badge}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tier Deep Spec & Technologies */}
          <div className="p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase block ${currentTheme.color}`}>
                  {currentTheme.code} // {currentTheme.badge}
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {portfolioData.skills[activeTier]?.category}
                </h3>
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                INSPECTED
              </span>
            </div>

            {/* Technology Stack Chips */}
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase mb-2">Integrated Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {portfolioData.skills[activeTier]?.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/[0.04] text-white/80 border border-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture Details */}
            <div className="space-y-2 pt-1">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 font-mono">
                <span className="text-[9px] text-amber-400 block mb-0.5 font-semibold uppercase">
                  CORE CAPABILITY
                </span>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  {portfolioData.skills[activeTier]?.capability}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 font-mono">
                <span className="text-[9px] text-sky-400 block mb-0.5 font-semibold uppercase">
                  TECHNICAL METRIC
                </span>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  {portfolioData.skills[activeTier]?.metric}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* ============================================================
            RIGHT COLUMN: INTERACTIVE SVG SYSTEM TOPOLOGY MATRIX
            ============================================================ */}
        <div className="flex-1 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${currentTheme.accent} animate-ping`} />
              <span className="font-mono text-xs text-white/80 font-semibold tracking-wider uppercase">
                Interactive Topology Matrix // Live Mesh
              </span>
            </div>
            <span className="font-mono text-[10px] text-white/40">
              CLICK ANY NODE TO INSPECT
            </span>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative flex-1 my-3 rounded-xl bg-black/50 border border-white/5 overflow-hidden flex items-center justify-center min-h-[300px]">
            
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />
            
            {/* SVG Connections & Packets */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 640 440" fill="none">
              <defs>
                <linearGradient id="streamGrad1" x1="140" y1="220" x2="320" y2="110" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#38bdf8" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="streamGrad2" x1="320" y1="110" x2="500" y2="220" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#c084fc" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="streamGrad3" x1="140" y1="220" x2="320" y2="330" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#34d399" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="streamGrad4" x1="320" y1="330" x2="500" y2="220" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#34d399" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#c084fc" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Data Conduits */}
              <path d="M 140 220 C 220 220, 240 110, 320 110" stroke="url(#streamGrad1)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 320 110 C 400 110, 420 220, 500 220" stroke="url(#streamGrad2)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 140 220 C 220 220, 240 330, 320 330" stroke="url(#streamGrad3)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 320 330 C 400 330, 420 220, 500 220" stroke="url(#streamGrad4)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 320 110 L 320 330" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Central Bridge Hub */}
              <circle cx="320" cy="220" r="18" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <circle cx="320" cy="220" r="6" fill="#38bdf8" className="animate-pulse" />
            </svg>

            {/* Interactive Spatial HTML Nodes positioned over SVG coordinates */}
            {tierThemes.map((theme, index) => {
              const isSelected = activeTier === index;
              const skill = portfolioData.skills[index];

              // Coordinate percentages mapped to 640x440 viewBox
              const leftPct = (theme.cx / 640) * 100;
              const topPct = (theme.cy / 440) * 100;

              return (
                <div
                  key={theme.code}
                  onClick={() => setActiveTier(index)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                >
                  <div
                    className={`px-3.5 py-2.5 rounded-xl border backdrop-blur-xl transition-all duration-300 flex flex-col items-center gap-1 ${
                      isSelected
                        ? `${theme.border} ${theme.bgActive} ${theme.glow} scale-110 ring-2 ring-white/30`
                        : "border-white/10 bg-black/70 hover:scale-105 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${theme.accent} ${isSelected ? "animate-ping" : ""}`} />
                      <span className={`font-mono text-[9px] font-bold ${theme.color}`}>
                        {theme.code}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-white tracking-tight whitespace-nowrap">
                      {skill?.category}
                    </span>
                    <span className="text-[8px] font-mono text-white/50">
                      {theme.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Live Stream Telemetry Bar */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/50 shrink-0">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${currentTheme.accent}`} />
              <span className="text-white/80">{currentTheme.streamLabel}</span>
            </div>
            <span className="text-emerald-400 font-semibold">STATUS: OPTIMIZED</span>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
};
