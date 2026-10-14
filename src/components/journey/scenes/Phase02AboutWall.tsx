"use client";

import React from "react";
import { motion, useTransform } from "motion/react";
import { usePhaseScrollActive, useTimeline } from "@/context/TimelineContext";
import { portfolioData } from "@/data/portfolio";

interface Props {
  // These values are driven by parent TheWalkTransition to stay in sync with
  // the master camera. Having them passed in avoids duplicate useTransform calls.
  isTransitioning: boolean; // true while scroll is 0.55–0.64
}

export const Phase02AboutWall: React.FC<Props> = ({ isTransitioning }) => {
  const { scrollProgress, prefersReducedMotion } = useTimeline();
  const isAboutScrollActive = usePhaseScrollActive("aboutWall");

  // ----------------------------------------------------------------
  // OVERLAY ENTRANCE & EXIT
  // The entire blueprint overlay fades in as the character settles at the wall,
  // then the SATELLITE nodes (01, 02, 03) fade out as we approach 0.57
  // while the GATEWAY NODE persists longer (it is the spatial bridge).
  // ----------------------------------------------------------------

  const overlayOpacity = useTransform(
    scrollProgress,
    [0.43, 0.49, 1.0],
    [0, 1, 1]
  );

  // Satellite nodes (peripheral blueprint boxes) fade out before dive-in
  const satelliteOpacity = useTransform(
    scrollProgress,
    [0.43, 0.48, 0.54, 0.58],
    [0, 1, 1, 0]
  );

  // SVG lines also fade before the dive
  const svgOpacity = useTransform(
    scrollProgress,
    [0.46, 0.51, 0.54, 0.58],
    [0, 0.5, 0.5, 0]
  );

  // Header label fades out early so it does not obscure the approach
  const headerOpacity = useTransform(
    scrollProgress,
    [0.44, 0.49, 0.52, 0.56],
    [0, 1, 1, 0]
  );

  // ----------------------------------------------------------------
  // GATEWAY NODE: the spatial bridge
  // It stays visible through the transition. Its SIZE will be morphed
  // by the parent component (TheWalkTransition) which controls the
  // master camera. Here we only control its inner content opacity.
  // ----------------------------------------------------------------

  // Gateway inner content fades out exactly when Phase03 inner content fades in
  const gatewayContentOpacity = useTransform(
    scrollProgress,
    [0.44, 0.50, 0.58, 0.62],
    [0, 1, 1, 0]
  );

  // Gateway node pulse indicator animation on approach
  const gatewayBorderGlow = useTransform(
    scrollProgress,
    [0.50, 0.57, 0.62],
    [0.5, 1.0, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
      style={{ opacity: overlayOpacity }}
    >
      <div className="relative w-full h-full max-w-[1400px] max-h-[850px] flex items-center justify-center">

        {/* Mobile reading layout: vertical nodes remain inside the fixed scene. */}
        <div
          className="absolute inset-x-3 z-20 sm:hidden overflow-y-auto overflow-x-hidden overscroll-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            top: "max(4.25rem, calc(env(safe-area-inset-top) + 4rem))",
            bottom: "1rem",
            pointerEvents: isAboutScrollActive ? "auto" : "none",
          }}
          aria-label="About Me architecture nodes"
        >
          <motion.div
            className="mb-3 rounded-xl border border-amber-400/20 bg-black/75 px-3.5 py-3 backdrop-blur-md"
            style={{ opacity: headerOpacity }}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="font-mono text-[10px] tracking-widest text-amber-300 uppercase">
                System Philosophy
              </span>
            </div>
            <p className="text-xs leading-relaxed text-white/65">
              {portfolioData.identity.aboutSubtitle}
            </p>
          </motion.div>

          <motion.div className="relative ml-2 space-y-2.5 pl-4" style={{ opacity: satelliteOpacity }}>
            <div className="absolute bottom-2 left-0 top-2 border-l border-white/15" aria-hidden="true" />
            {portfolioData.identity.aboutNodes.map((node, index) => {
              const accents = [
                "border-sky-400/25 text-sky-300",
                "border-amber-400/25 text-amber-300",
                "border-emerald-400/25 text-emerald-300",
              ];
              const [borderAccent, textAccent] = accents[index % accents.length].split(" ");

              return (
                <article
                  key={node.eyebrow}
                  className={`relative rounded-xl border ${borderAccent} bg-[#080b10]/90 px-3.5 py-3 shadow-lg backdrop-blur-md`}
                >
                  <span
                    className={`absolute -left-[21px] top-4 h-2 w-2 rounded-full border ${borderAccent} bg-[#0a0c10]`}
                    aria-hidden="true"
                  />
                  <span className={`mb-1 block font-mono text-[9px] font-semibold tracking-wider ${textAccent}`}>
                    {node.eyebrow}
                  </span>
                  <h3 className="mb-1 text-sm font-semibold leading-snug text-white">{node.title}</h3>
                  <p className="text-[11px] leading-relaxed text-white/65">{node.description}</p>
                </article>
              );
            })}
          </motion.div>

          <motion.div
            className="relative ml-2 mt-2.5 rounded-xl border border-sky-400/30 bg-[#07111a]/95 px-3.5 py-3 shadow-[0_0_24px_rgba(56,189,248,0.12)] backdrop-blur-md"
            style={{ opacity: gatewayContentOpacity }}
          >
            <span
              className="absolute -left-[5px] top-4 h-2.5 w-2.5 rounded-full border border-sky-300/70 bg-[#07111a]"
              aria-hidden="true"
            />
            <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Gateway Node · Active
            </div>
            <h2 className="text-sm font-bold text-white">Deployed Workspaces</h2>
            <p className="mt-1 font-mono text-[9px] tracking-wide text-sky-200/65">
              ↓ DIVE INTO SOFTWARE WORKSPACE
            </p>
          </motion.div>
        </div>

        {/* -------- SVG CONNECTION LINES -------- */}
        <motion.svg
          className="absolute inset-0 hidden h-full w-full pointer-events-none sm:block"
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
          {/* Lines connecting satellite nodes to the gateway */}
          <line x1="22%" y1="32%" x2="50%" y2="48%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="78%" y1="28%" x2="50%" y2="48%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="50%" y1="78%" x2="50%" y2="55%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="5 5" />
        </motion.svg>

        {/* -------- HEADER LABEL -------- */}
        <motion.div
          className="absolute top-4 left-1/2 hidden w-[calc(100%-2rem)] -translate-x-1/2 text-center pointer-events-none sm:block md:top-8 sm:w-auto"
          style={{ opacity: headerOpacity }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest text-amber-300 uppercase">
              System Philosophy · Architecture Wall
            </span>
          </div>
          <p className="text-xs md:text-sm font-mono text-white/50 tracking-wide">
            {portfolioData.identity.aboutSubtitle}
          </p>
        </motion.div>

        {/* -------- SATELLITE NODE 01: HIGH-THROUGHPUT SYSTEMS -------- */}
        <motion.div
          className="absolute top-[18%] left-4 hidden w-[calc(100%-2rem)] max-w-[280px] pointer-events-none sm:block sm:left-[18%] sm:w-auto sm:max-w-[300px] md:left-[19%]"
          style={{ opacity: satelliteOpacity }}
        >
          <div className="p-3 sm:p-4 rounded-xl bg-black/70 border border-sky-500/25 backdrop-blur-sm">
            <span className="font-mono text-[10px] text-sky-400 tracking-wider uppercase font-semibold block mb-1">
              {portfolioData.identity.aboutNodes[0].eyebrow}
            </span>
            <h3 className="text-sm font-semibold text-white mb-1">{portfolioData.identity.aboutNodes[0].title}</h3>
            <p className="text-[11px] text-white/60 leading-relaxed">
              {portfolioData.identity.aboutNodes[0].description}
            </p>
          </div>
        </motion.div>

        {/* -------- SATELLITE NODE 02: ARCHITECTURE -------- */}
        <motion.div
          className="absolute top-[34%] left-4 right-auto hidden w-[calc(100%-2rem)] max-w-[280px] pointer-events-none sm:block sm:left-auto sm:right-[10%] sm:top-[16%] sm:w-auto sm:max-w-[300px] md:right-[12%]"
          style={{ opacity: satelliteOpacity }}
        >
          <div className="p-3 sm:p-4 rounded-xl bg-black/70 border border-amber-500/25 backdrop-blur-sm">
            <span className="font-mono text-[10px] text-amber-400 tracking-wider uppercase font-semibold block mb-1">
              {portfolioData.identity.aboutNodes[1].eyebrow}
            </span>
            <h3 className="text-sm font-semibold text-white mb-1">{portfolioData.identity.aboutNodes[1].title}</h3>
            <p className="text-[11px] text-white/60 leading-relaxed">
              {portfolioData.identity.aboutNodes[1].description}
            </p>
          </div>
        </motion.div>

        {/* -------- SATELLITE NODE 03: AI & PIPELINES -------- */}
        <motion.div
          className="absolute bottom-[5%] left-1/2 hidden w-[calc(100%-2rem)] max-w-[280px] -translate-x-1/2 pointer-events-none sm:bottom-[12%] sm:block sm:w-auto sm:max-w-[380px]"
          style={{ opacity: satelliteOpacity }}
        >
          <div className="p-3 sm:p-4 rounded-xl bg-black/70 border border-emerald-500/25 backdrop-blur-sm">
            <span className="font-mono text-[10px] text-emerald-400 tracking-wider uppercase font-semibold block mb-1">
              {portfolioData.identity.aboutNodes[2].eyebrow}
            </span>
            <h3 className="text-sm font-semibold text-white mb-1">{portfolioData.identity.aboutNodes[2].title}</h3>
            <p className="text-[11px] text-white/60 leading-relaxed">
              {portfolioData.identity.aboutNodes[2].description}
            </p>
          </div>
        </motion.div>

        {/* -------- GATEWAY NODE (THE SPATIAL BRIDGE) -------- */}
        {/* 
          This is the visual pivot. Its inner content (the description) fades out as
          Phase03ProjectsWorkspace's inner content simultaneously fades in.
          The physical container morphing (expanding) is handled in TheWalkTransition
          via useTransform on the shared "bridge-container" element.
        */}
        <motion.div
          className="absolute top-[62%] left-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:block"
          style={{
            opacity: gatewayBorderGlow,
            // Pointer events enabled so gateway is interactive before transition
            pointerEvents: isTransitioning ? "none" : "auto",
          }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
              style={{ width: "min(340px, calc(100vw - 32px))", height: 140 }}
          >
            {/* Glow border */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: "1.5px solid rgba(56,189,248,0.55)",
                boxShadow: "0 0 35px rgba(56,189,248,0.20), inset 0 0 20px rgba(56,189,248,0.05)",
                background: "rgba(13,17,23,0.92)",
              }}
            />
            {/* Gateway inner content */}
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
