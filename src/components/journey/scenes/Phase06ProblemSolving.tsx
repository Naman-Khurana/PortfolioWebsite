"use client";

/**
 * Phase06ProblemSolving
 *
 * Phase 06: Problem Solving (0.935 – 0.985)
 * Concept: "Algorithmic Graph World // Verified Evidence"
 *
 * Visualizes Naman Khurana's DSA and competitive programming problem-solving
 * capabilities as an active algorithmic graph traversal paired with verified
 * platform telemetry evidence (LeetCode, Codeforces, AlgoZenith).
 *
 * Spatial composition:
 * - Left: Interactive Algorithmic DAG / Tree Visualizer + Loaded CS Heuristics
 * - Right: Verified Telemetry Evidence Modules with verified profile links
 *
 * Sits inside GatewaySpatialBridge on the cinematic glass HUD overlay.
 */

import React, { useState } from "react";
import { motion, useTransform } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useTimeline } from "@/context/TimelineContext";

export const Phase06ProblemSolving: React.FC = () => {
  const { scrollProgress, prefersReducedMotion, currentProgress } = useTimeline();
  const [selectedNode, setSelectedNode] = useState<number>(0);

  // ================================================================
  // TIMING & READING WINDOW PLATEAUS
  // Entrance: 0.930 -> 0.945
  // Stable Reading Window: 0.945 -> 0.960 (frozen story plateau)
  // Exit Transition: 0.960 -> 0.976 (yields to Phase 07 Connect)
  // ================================================================
  const containerOpacity = useTransform(
    scrollProgress,
    [0.930, 0.945, 0.960, 0.976],
    [0, 1, 1, 0]
  );

  const containerY = useTransform(
    scrollProgress,
    [0.930, 0.945, 0.960, 0.976],
    ["16px", "0px", "0px", "-16px"]
  );

  const headerOpacity = useTransform(scrollProgress, [0.932, 0.945], [0, 1]);
  const contentOpacity = useTransform(scrollProgress, [0.938, 0.950], [0, 1]);

  // Traversal stroke-dashoffset animation driven by scroll approaching reading plateau
  const traversalProgress = useTransform(
    scrollProgress,
    [0.935, 0.950],
    [320, 0]
  );

  const isInteractive = currentProgress >= 0.935 && currentProgress < 0.972;
  const problemData = portfolioData.problemSolving;

  // Graph nodes representation (The Thinking Architecture)
  const graphNodes = [
    {
      id: 0,
      label: "NODE 01 // INPUT COMPLEXITY",
      badge: "PROBLEM DECOMPOSITION",
      desc: "Isolating invariant state boundaries and worst-case constraints.",
      x: 80,
      y: 80,
      color: "text-amber-400",
      accent: "bg-amber-400",
      border: "border-amber-500/40",
      glow: "shadow-[0_0_24px_rgba(245,158,11,0.25)]",
      bgActive: "bg-amber-500/15",
    },
    {
      id: 1,
      label: "NODE 02 // SEARCH & GRAPH",
      badge: "OPTIMAL HEURISTIC",
      desc: "Topological ordering, shortest path relaxation, and state memoization.",
      x: 230,
      y: 190,
      color: "text-sky-400",
      accent: "bg-sky-400",
      border: "border-sky-500/40",
      glow: "shadow-[0_0_24px_rgba(56,189,248,0.25)]",
      bgActive: "bg-sky-500/15",
    },
    {
      id: 2,
      label: "NODE 03 // DYNAMIC STATE",
      badge: "OPTIMAL SUBSTRUCTURE",
      desc: "Bottom-up dynamic programming tables with linear space reduction.",
      x: 390,
      y: 90,
      color: "text-emerald-400",
      accent: "bg-emerald-400",
      border: "border-emerald-500/40",
      glow: "shadow-[0_0_24px_rgba(52,211,153,0.25)]",
      bgActive: "bg-emerald-500/15",
    },
    {
      id: 3,
      label: "NODE 04 // VERIFIED TERMINAL",
      badge: "O(1) / O(log N) BOUND",
      desc: "Validated algorithmic resolution across full test-suite spectrum.",
      x: 520,
      y: 200,
      color: "text-purple-400",
      accent: "bg-purple-400",
      border: "border-purple-500/40",
      glow: "shadow-[0_0_24px_rgba(192,132,252,0.25)]",
      bgActive: "bg-purple-500/15",
    },
  ];

  const currentNode = graphNodes[selectedNode] || graphNodes[0];

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
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-mono text-xs text-emerald-300 font-semibold tracking-wider">
              ALGORITHMIC_GRAPH // REASONING & PROOF
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-white/50 pl-3 border-l border-white/10">
            <span className="text-white/40">MODE:</span>
            <span className="text-white/80">DISCRETE_OPTIMIZATION // DSA_MATRIX</span>
          </div>
        </div>

        {/* Phase tag & Telemetry */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2 text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>HEURISTICS: LOADED</span>
          </div>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="text-purple-400 font-medium">PHASE 06 // PROBLEM SOLVING</span>
        </div>
      </motion.div>

      {/* ============================================================
          MAIN VIEWPORT: Left = Algorithmic Graph, Right = Verified Evidence
          ============================================================ */}
      <motion.div
        className="flex-1 p-3 sm:p-5 md:p-6 overflow-hidden flex flex-col lg:flex-row gap-5 min-h-0"
        style={prefersReducedMotion ? {} : { opacity: contentOpacity }}
      >
        {/* ============================================================
            LEFT COLUMN: ALGORITHMIC GRAPH & DSA HEURISTICS
            ============================================================ */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          
          {/* Graph Title & Description */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-2">
                <span>The Thinking Process</span>
                <span className="text-purple-400">// DECOMPOSE → OPTIMIZE</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Algorithmic Graph & State Machine
              </h3>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10 hidden sm:inline">
              SELECT NODE TO TRACE
            </span>
          </div>

          {/* SVG Graph Canvas */}
          <div className="relative flex-1 rounded-xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center min-h-[220px]">
            {/* Grid texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* SVG Traversal Connections */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 280" fill="none">
              <defs>
                <linearGradient id="traversalGradient" x1="80" y1="80" x2="520" y2="200" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f59e0b" />
                  <stop offset="0.4" stopColor="#38bdf8" />
                  <stop offset="0.7" stopColor="#34d399" />
                  <stop offset="1" stopColor="#c084fc" />
                </linearGradient>
              </defs>

              {/* Background Reference Edges */}
              <path
                d="M 80 80 C 140 80, 170 190, 230 190"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 230 190 C 290 190, 330 90, 390 90"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 390 90 C 450 90, 470 200, 520 200"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 80 80 C 230 40, 390 40, 520 200"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />

              {/* Animated Traversal Pulse Edge */}
              <motion.path
                d="M 80 80 C 140 80, 170 190, 230 190 C 290 190, 330 90, 390 90 C 450 90, 470 200, 520 200"
                stroke="url(#traversalGradient)"
                strokeWidth="2.5"
                strokeDasharray="320"
                style={prefersReducedMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: traversalProgress }}
              />
            </svg>

            {/* Spatial Interactive Graph Nodes */}
            {graphNodes.map((node, idx) => {
              const isSelected = selectedNode === idx;
              const leftPct = (node.x / 600) * 100;
              const topPct = (node.y / 280) * 100;

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(idx)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group text-left cursor-pointer focus:outline-none"
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                >
                  <div
                    className={`px-3 py-2 rounded-xl border backdrop-blur-xl transition-all duration-300 flex flex-col items-center gap-0.5 ${
                      isSelected
                        ? `${node.border} ${node.bgActive} ${node.glow} scale-110 ring-2 ring-white/30`
                        : "border-white/10 bg-black/80 hover:border-white/30 hover:scale-105"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${node.accent} ${isSelected ? "animate-ping" : ""}`} />
                      <span className={`font-mono text-[9px] font-bold ${node.color}`}>
                        {node.badge}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-white tracking-tight whitespace-nowrap">
                      {node.label.split("//")[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Inspector Banner */}
          <div className="p-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
            <div>
              <span className={`text-[9px] font-mono font-bold uppercase block ${currentNode.color}`}>
                {currentNode.label} // {currentNode.badge}
              </span>
              <p className="text-xs text-white/80 leading-snug">
                {currentNode.desc}
              </p>
            </div>
            <span className="font-mono text-[9px] px-2 py-1 rounded bg-white/5 text-white/50 border border-white/10 shrink-0 hidden sm:inline">
              STEP 0{currentNode.id + 1} OF 04
            </span>
          </div>

          {/* DSA Focus Topics (Loaded Heuristics) */}
          <div className="shrink-0 space-y-1.5">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center justify-between">
              <span>Core Problem-Solving Competencies</span>
              <span className="text-emerald-400/80 font-semibold">VERIFIED PRACTICE</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {problemData?.topics?.map((topic) => (
                <span
                  key={topic}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] text-white/80 border border-white/10 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-400" />
                  {topic}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ============================================================
            RIGHT COLUMN: VERIFIED TELEMETRY EVIDENCE MODULES
            ============================================================ */}
        <div className="w-full lg:w-[460px] xl:w-[500px] flex flex-col gap-3 shrink-0 overflow-y-auto pr-1">
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-2">
                <span>Verified Activity</span>
                <span className="text-sky-400">// CODING PROFILES</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Problem-Solving Platforms & Profiles
              </h3>
            </div>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              ACTIVE CANDIDATE
            </span>
          </div>

          {/* Profile Telemetry Cards (Rendered dynamically from portfolio data) */}
          <div className="space-y-2.5">
            {problemData?.platforms?.map((platform) => {
              const isLeetCode = platform.id === "leetcode";
              const isCodeforces = platform.id === "codeforces";
              const accentColor = isLeetCode
                ? "text-amber-400"
                : isCodeforces
                ? "text-sky-400"
                : "text-purple-400";
              const borderTheme = isLeetCode
                ? "hover:border-amber-500/40"
                : isCodeforces
                ? "hover:border-sky-500/40"
                : "hover:border-purple-500/40";

              return (
                <div
                  key={platform.id}
                  className={`p-3.5 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md transition-all duration-300 ${borderTheme} flex flex-col gap-2 group`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      <span className="text-xs font-bold text-white tracking-tight">
                        {platform.name}
                      </span>
                      {platform.badge && (
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ${accentColor}`}>
                          {platform.badge}
                        </span>
                      )}
                    </div>

                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors group-hover:translate-x-0.5"
                    >
                      <span>VIEW PROFILE</span>
                      <span>↗</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="text-white/60">
                      HANDLE: <span className="text-white font-semibold">@{platform.handle}</span>
                    </div>
                    <span className="text-[10px] text-white/40">VERIFIED</span>
                  </div>

                  {platform.statusText && (
                    <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-white/70 font-sans">
                      {platform.statusText}
                    </div>
                  )}

                  {/* Future Metrics Slot (Strictly data-driven, empty if not provided) */}
                  {platform.metrics && platform.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                      {platform.metrics.map((m) => (
                        <div key={m.label} className="font-mono text-[10px]">
                          <span className="text-white/40 block">{m.label}</span>
                          <span className="text-white font-bold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Philosophy / Mindset Callout */}
          <div className="p-3.5 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent font-mono text-xs flex flex-col gap-1.5 mt-auto">
            <div className="flex items-center justify-between text-[9px] text-white/40 uppercase">
              <span>Execution Philosophy</span>
              <span className="text-amber-400">ENGINEER MINDSET</span>
            </div>
            <p className="text-[11px] text-white/80 font-sans leading-relaxed">
              &quot;{problemData?.philosophy}&quot;
            </p>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
};
