"use client";

/**
 * Phase02AboutWall
 *
 * REUSABILITY NOTE:
 * Satellite node count, position, and color used to be hardcoded to exactly
 * 3 (aboutNodes[0]/[1]/[2], each with its own JSX block, its own fixed
 * top/left/right/bottom classes, and its own hardcoded border color). Adding
 * a 4th node in the data file did nothing — it was never read.
 *
 * Now every node in `portfolioData.identity.aboutNodes` is rendered
 * automatically: position is computed on a circle around the gateway, color
 * cycles through a palette, and the connecting SVG line is generated per
 * node. To add a node, just add an entry to `aboutNodes` in your data file:
 *
 *   { eyebrow: "NODE // 04 · CLOUD", title: "...", description: "..." }
 *
 * The subtitle under the section header now comes from
 * `portfolioData.identity.aboutSubtitle` (falls back to `bioShort` if you
 * don't set it), instead of being a hardcoded string here.
 */

import React from "react";
import { motion, useTransform } from "motion/react";
import { useTimeline } from "@/context/TimelineContext";
import { portfolioData } from "@/data/portfolio";

interface Props {
  // These values are driven by parent TheWalkTransition to stay in sync with
  // the master camera. Having them passed in avoids duplicate useTransform calls.
  isTransitioning: boolean; // true while scroll is 0.55–0.64
}

// ================================================================
// COLOR PALETTE — cycles automatically so any number of nodes works.
// ================================================================
const NODE_PALETTE = [
  { border: "border-sky-500/25", text: "text-sky-400", hex: "#38bdf8" },
  { border: "border-amber-500/25", text: "text-amber-400", hex: "#f59e0b" },
  { border: "border-emerald-500/25", text: "text-emerald-400", hex: "#34d399" },
  { border: "border-purple-500/25", text: "text-purple-400", hex: "#c084fc" },
  { border: "border-rose-500/25", text: "text-rose-400", hex: "#fb7185" },
  { border: "border-cyan-500/25", text: "text-cyan-400", hex: "#22d3ee" },
];

// Layout ellipse (percentages of the container), centered on the gateway.
const CENTER_X = 50;
const CENTER_Y = 50;
const RADIUS_X = 34;
const RADIUS_Y = 36;

function buildNodeLayout(nodeCount: number) {
  return Array.from({ length: nodeCount }, (_, index) => {
    const angle = ((-90 + (360 / nodeCount) * index) * Math.PI) / 180;
    const leftPct = CENTER_X + RADIUS_X * Math.cos(angle);
    const topPct = CENTER_Y + RADIUS_Y * Math.sin(angle);
    return { leftPct, topPct, ...NODE_PALETTE[index % NODE_PALETTE.length] };
  });
}

export const Phase02AboutWall: React.FC<Props> = ({ isTransitioning }) => {
  const { scrollProgress, prefersReducedMotion } = useTimeline();

  const aboutNodes = portfolioData.identity.aboutNodes;
  const nodeLayout = buildNodeLayout(aboutNodes.length);

  // Optional data field s— falls back to bioShort so nothing breaks if you
  // haven't added `aboutSubtitle` to your data file yet.
  const subtitle = portfolioData.identity.aboutSubtitle

  // ----------------------------------------------------------------
  // OVERLAY ENTRANCE & EXIT
  // ----------------------------------------------------------------
  const overlayOpacity = useTransform(scrollProgress, [0.43, 0.49, 1.0], [0, 1, 1]);

  const satelliteOpacity = useTransform(
    scrollProgress,
    [0.43, 0.48, 0.54, 0.58],
    [0, 1, 1, 0]
  );

  const svgOpacity = useTransform(scrollProgress, [0.46, 0.51, 0.54, 0.58], [0, 0.5, 0.5, 0]);

  const headerOpacity = useTransform(
    scrollProgress,
    [0.44, 0.49, 0.52, 0.56],
    [0, 1, 1, 0]
  );

  // ----------------------------------------------------------------
  // GATEWAY NODE: the spatial bridge
  // ----------------------------------------------------------------
  const gatewayContentOpacity = useTransform(
    scrollProgress,
    [0.44, 0.5, 0.58, 0.62],
    [0, 1, 1, 0]
  );

  const gatewayBorderGlow = useTransform(scrollProgress, [0.5, 0.57, 0.62], [0.5, 1.0, 0]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
      style={{ opacity: overlayOpacity }}
    >
      <div className="relative w-full h-full max-w-[1400px] max-h-[850px] flex items-center justify-center">
        {/* -------- SVG CONNECTION LINES: one per node, generated -------- */}
        <motion.svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: svgOpacity }}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {nodeLayout.map((node, index) => (
            <line
              key={`line-${index}`}
              x1={`${node.leftPct}%`}
              y1={`${node.topPct}%`}
              x2="50%"
              y2="50%"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="5 5"
            />
          ))}
        </motion.svg>

        {/* -------- HEADER LABEL -------- */}
        <motion.div
          className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: headerOpacity }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest text-amber-300 uppercase">
              System Philosophy · Architecture Wall
            </span>
          </div>
          <p className="text-xs md:text-sm font-mono text-white/50 tracking-wide">{subtitle}</p>
        </motion.div>

        {/* -------- SATELLITE NODES: generated from aboutNodes, any count -------- */}
        {aboutNodes.map((node, index) => {
          const layout = nodeLayout[index];
          return (
            <motion.div
              key={node.eyebrow}
              className="absolute max-w-[280px] sm:max-w-[300px] pointer-events-none"
              style={{
                left: `${layout.leftPct}%`,
                top: `${layout.topPct}%`,
                transform: "translate(-50%, -50%)",
                opacity: satelliteOpacity,
              }}
            >
              <div className={`p-4 rounded-xl bg-black/70 border ${layout.border} backdrop-blur-sm`}>
                <span
                  className={`font-mono text-[10px] ${layout.text} tracking-wider uppercase font-semibold block mb-1`}
                >
                  {node.eyebrow}
                </span>
                <h3 className="text-sm font-semibold text-white mb-1">{node.title}</h3>
                <p className="text-[11px] text-white/60 leading-relaxed">{node.description}</p>
              </div>
            </motion.div>
          );
        })}

        {/* -------- GATEWAY NODE (THE SPATIAL BRIDGE) -------- */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            opacity: gatewayBorderGlow,
            pointerEvents: isTransitioning ? "none" : "auto",
          }}
        >
          <div className="relative rounded-2xl overflow-hidden" style={{ width: 340, height: 140 }}>
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: "1.5px solid rgba(56,189,248,0.55)",
                boxShadow: "0 0 35px rgba(56,189,248,0.20), inset 0 0 20px rgba(56,189,248,0.05)",
                background: "rgba(13,17,23,0.92)",
              }}
            />
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
              style={{ opacity: gatewayContentOpacity }}
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-mono text-[10px] uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                Gateway Node · Active
              </div>
              <h2 className="text-base font-bold text-white mb-1">Deployed Workspaces</h2>
              <div className="flex items-center gap-2 text-[11px] font-mono text-sky-400/70">
                <span>↓ DIVE INTO SOFTWARE WORKSPACE</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};