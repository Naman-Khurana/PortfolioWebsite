"use client";

/**
 * Phase05Engineering
 *
 * Phase 05: Engineering (0.88 – 0.95)
 * Concept: "The System Matrix / Transparent Control Room"
 *
 * Visualizes the backend engineering stack as a live, interconnected
 * system topology and data flow matrix.
 *
 * REUSABILITY NOTE:
 * Every node, color, label, and SVG connection below is generated from
 * `portfolioData.skills` — nothing is hardcoded per-tier anymore. To add
 * a new tier, just add a new entry to `skills` in your data file:
 *
 *   {
 *     category: "Cloud & Networking",
 *     items: ["AWS", "Terraform", "VPC"],
 *     capability: "...",
 *     metric: "...",
 *     // optional overrides — omit these and sensible defaults are used:
 *     badge: "CLOUD & NETWORKING",          // defaults to category.toUpperCase()
 *     streamLabel: "AWS // TERRAFORM // VPC" // defaults to first 3 items joined
 *   }
 *
 * It will automatically get a color from the palette, a position on the
 * circular layout, and a spot in the tier selector grid. No math, colors,
 * or positions live in the data file — only content does.
 *
 * Sits inside GatewaySpatialBridge as a semi-transparent HUD overlay,
 * keeping the physical room & engineer at the wall (04-wall.png) visible
 * in the background.
 */

import React, { useMemo, useState } from "react";
import { motion, useTransform } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useTimeline } from "@/context/TimelineContext";

// ================================================================
// COLOR PALETTE — cycles automatically, so any number of tiers works.
// Add more entries here if you want more distinct colors before repeats.
// ================================================================
const PALETTE = [
  {
    color: "text-amber-400",
    border: "border-amber-500/40",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.2)]",
    bgActive: "bg-amber-500/15",
    accent: "bg-amber-400",
    hex: "#f59e0b",
  },
  {
    color: "text-sky-400",
    border: "border-sky-500/40",
    glow: "shadow-[0_0_30px_rgba(56,189,248,0.2)]",
    bgActive: "bg-sky-500/15",
    accent: "bg-sky-400",
    hex: "#38bdf8",
  },
  {
    color: "text-emerald-400",
    border: "border-emerald-500/40",
    glow: "shadow-[0_0_30px_rgba(52,211,153,0.2)]",
    bgActive: "bg-emerald-500/15",
    accent: "bg-emerald-400",
    hex: "#34d399",
  },
  {
    color: "text-purple-400",
    border: "border-purple-500/40",
    glow: "shadow-[0_0_30px_rgba(192,132,252,0.2)]",
    bgActive: "bg-purple-500/15",
    accent: "bg-purple-400",
    hex: "#c084fc",
  },
  {
    color: "text-rose-400",
    border: "border-rose-500/40",
    glow: "shadow-[0_0_30px_rgba(251,113,133,0.2)]",
    bgActive: "bg-rose-500/15",
    accent: "bg-rose-400",
    hex: "#fb7185",
  },
  {
    color: "text-cyan-400",
    border: "border-cyan-500/40",
    glow: "shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    bgActive: "bg-cyan-500/15",
    accent: "bg-cyan-400",
    hex: "#22d3ee",
  },
  {
    color: "text-orange-400",
    border: "border-orange-500/40",
    glow: "shadow-[0_0_30px_rgba(251,146,60,0.2)]",
    bgActive: "bg-orange-500/15",
    accent: "bg-orange-400",
    hex: "#fb923c",
  },
  {
    color: "text-lime-400",
    border: "border-lime-500/40",
    glow: "shadow-[0_0_30px_rgba(163,230,53,0.2)]",
    bgActive: "bg-lime-500/15",
    accent: "bg-lime-400",
    hex: "#a3e635",
  },
];

const VIEW_W = 640;
const VIEW_H = 440;
const HUB_X = VIEW_W / 2;
const HUB_Y = VIEW_H / 2;
const RADIUS_X = VIEW_W * 0.28;
const RADIUS_Y = VIEW_H * 0.35;

// Optional per-tier overrides a skill group can supply; everything else
// is auto-derived so the data file never has to think about layout.
type SkillGroup = (typeof portfolioData.skills)[number] & {
  badge?: string;
  streamLabel?: string;
};

function buildTierThemes(skills: SkillGroup[]) {
  const n = skills.length || 1;
  return skills.map((skill, index) => {
    const palette = PALETTE[index % PALETTE.length];
    const angle = ((-90 + (360 / n) * index) * Math.PI) / 180;
    const cx = Math.round(HUB_X + RADIUS_X * Math.cos(angle));
    const cy = Math.round(HUB_Y + RADIUS_Y * Math.sin(angle));

    return {
      ...palette,
      code: `TIER // ${String(index + 1).padStart(2, "0")}`,
      badge: (skill.badge ?? skill.category).toUpperCase(),
      streamLabel: (skill.streamLabel ?? skill.items.slice(0, 3).join(" // ")).toUpperCase(),
      cx,
      cy,
    };
  });
}

export const Phase05Engineering: React.FC = () => {
  const { scrollProgress, prefersReducedMotion, currentProgress } = useTimeline();
  const [activeTier, setActiveTier] = useState<number>(0);

  const skills = portfolioData.skills as SkillGroup[];
  const tierThemes = useMemo(() => buildTierThemes(skills), [skills]);
  const tierCount = tierThemes.length;

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

  const headerOpacity = useTransform(scrollProgress, [0.88, 0.895], [0, 1]);
  const contentOpacity = useTransform(scrollProgress, [0.885, 0.9], [0, 1]);

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

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2 text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>NODES: {tierCount} TIERS OPERATIONAL</span>
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
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center justify-between">
              <span>Select Architecture Tier</span>
              <span className="text-white/25">{tierCount} TIERS MAPPED</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {skills.map((skillGroup, index) => {
                const theme = tierThemes[index];
                const isSelected = activeTier === index;

                return (
                  <button
                    key={skillGroup.category}
                    onClick={() => setActiveTier(index)}
                    className={`text-left p-3 rounded-xl border transition-all flex flex-col gap-1 ${isSelected
                        ? `${theme.border} ${theme.bgActive} ${theme.glow} ring-1 ring-white/20`
                        : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[9px] font-bold ${theme.color}`}>
                        {theme.code}
                      </span>
                      <span
                        className={`text-[8px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/15 text-white" : "bg-white/5 text-white/30"
                          }`}
                      >
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
                  {skills[activeTier]?.category}
                </h3>
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                INSPECTED
              </span>
            </div>

            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase mb-2">Integrated Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {skills[activeTier]?.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/[0.04] text-white/80 border border-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 font-mono">
                <span className="text-[9px] text-amber-400 block mb-0.5 font-semibold uppercase">
                  CORE CAPABILITY
                </span>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  {skills[activeTier]?.capability}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 font-mono">
                <span className="text-[9px] text-sky-400 block mb-0.5 font-semibold uppercase">
                  TECHNICAL METRIC
                </span>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  {skills[activeTier]?.metric}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN: INTERACTIVE SVG SYSTEM TOPOLOGY MATRIX
            Fully generated from tierThemes — any node count works.
            ============================================================ */}
        <div className="flex-1 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${currentTheme.accent} animate-ping`} />
              <span className="font-mono text-xs text-white/80 font-semibold tracking-wider uppercase">
                Interactive Topology Matrix // Live Mesh
              </span>
            </div>
            <span className="font-mono text-[10px] text-white/40">CLICK ANY NODE TO INSPECT</span>
          </div>

          <div className="relative flex-1 my-3 rounded-xl bg-black/50 border border-white/5 overflow-hidden flex items-center justify-center min-h-[300px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />

            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              fill="none"
            >
              <defs>
                {tierThemes.map((theme, index) => (
                  <linearGradient
                    key={`grad-${index}`}
                    id={`streamGrad-${index}`}
                    x1={theme.cx}
                    y1={theme.cy}
                    x2={HUB_X}
                    y2={HUB_Y}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={theme.hex} stopOpacity="0.8" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.15" />
                  </linearGradient>
                ))}
              </defs>

              {/* Hub-and-spoke conduits: every node connects to the central hub,
                  so this scales cleanly to any number of tiers. */}
              {tierThemes.map((theme, index) => (
                <path
                  key={`path-${index}`}
                  d={`M ${theme.cx} ${theme.cy} L ${HUB_X} ${HUB_Y}`}
                  stroke={`url(#streamGrad-${index})`}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              ))}

              <circle cx={HUB_X} cy={HUB_Y} r="18" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <circle cx={HUB_X} cy={HUB_Y} r="6" fill="#38bdf8" className="animate-pulse" />
            </svg>

            {tierThemes.map((theme, index) => {
              const isSelected = activeTier === index;
              const skill = skills[index];
              const leftPct = (theme.cx / VIEW_W) * 100;
              const topPct = (theme.cy / VIEW_H) * 100;

              return (
                <div
                  key={theme.code}
                  onClick={() => setActiveTier(index)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                >
                  <div
                    className={`px-3.5 py-2.5 rounded-xl border backdrop-blur-xl transition-all duration-300 flex flex-col items-center gap-1 ${isSelected
                        ? `${theme.border} ${theme.bgActive} ${theme.glow} scale-110 ring-2 ring-white/30`
                        : "border-white/10 bg-black/70 hover:scale-105 hover:border-white/30"
                      }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${theme.accent} ${isSelected ? "animate-ping" : ""}`} />
                      <span className={`font-mono text-[9px] font-bold ${theme.color}`}>{theme.code}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-white tracking-tight whitespace-nowrap">
                      {skill?.category}
                    </span>
                    <span className="text-[8px] font-mono text-white/50">{theme.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>

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
}