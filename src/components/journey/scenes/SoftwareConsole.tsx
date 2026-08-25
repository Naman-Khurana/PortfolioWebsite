"use client";

/**
 * SoftwareConsole
 *
 * The unified software environment that serves as:
 *   Phase 03 (0.62–0.76): Projects workspace — deployed systems explorer
 *   Phase 03→04 (0.76–0.85): In-place context switch — same window, different environment
 *   Phase 04 (0.85–0.95): Experience — production engineering record for Onelap Telematics
 *
 * KEY ARCHITECTURAL PRINCIPLE:
 * This component NEVER unmounts. The window container is always visible.
 * The transition happens through in-place content swap:
 *   - breadcrumb path segments morph via independent y/opacity transforms
 *   - sidebar project list fades to experience record
 *   - main pane content dissolves from project to experience
 *   - "SERVICES: OPERATIONAL" indicator persists throughout as the continuous anchor
 *
 * All transforms are deterministic useTransform functions of scrollProgress,
 * making backward scroll an exact mathematical reverse of forward scroll.
 */

import React, { useState } from "react";
import { motion, useTransform } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useTimeline } from "@/context/TimelineContext";

export const SoftwareConsole: React.FC = () => {
  const { scrollProgress, prefersReducedMotion, currentProgress } = useTimeline();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(portfolioData.projects[0].id);
  const [activeProjectTab, setActiveProjectTab] = useState<"architecture" | "metrics" | "stack">("architecture");

  const activeProject =
    portfolioData.projects.find((p) => p.id === selectedProjectId) ||
    portfolioData.projects[0];
  const activeExperience = portfolioData.experience[0];

  // ================================================================
  // BREADCRUMB TRANSFORMS
  // Fast, crisp 0.03 transition (0.745 -> 0.775)
  // ================================================================
  const seg2OutOpacity = useTransform(scrollProgress, [0.745, 0.775], [1, 0]);
  const seg2OutY = useTransform(scrollProgress, [0.745, 0.775], ["0px", "-14px"]);
  const seg2InOpacity = useTransform(scrollProgress, [0.755, 0.785], [0, 1]);
  const seg2InY = useTransform(scrollProgress, [0.755, 0.785], ["14px", "0px"]);

  const seg3OutOpacity = useTransform(scrollProgress, [0.745, 0.775], [1, 0]);
  const seg3InOpacity = useTransform(scrollProgress, [0.755, 0.785], [0, 1]);

  // Phase label in header right
  const phaseLabelProjectOpacity = useTransform(scrollProgress, [0.745, 0.775], [1, 0]);
  const phaseLabelExperienceOpacity = useTransform(scrollProgress, [0.755, 0.785], [0, 1]);

  // ================================================================
  // SIDEBAR TRANSFORMS
  // ================================================================
  const sidebarHeaderProjectOpacity = useTransform(scrollProgress, [0.745, 0.775], [1, 0]);
  const sidebarHeaderExperienceOpacity = useTransform(scrollProgress, [0.755, 0.785], [0, 1]);

  const sidebarProjectListOpacity = useTransform(scrollProgress, [0.745, 0.775], [1, 0]);
  const sidebarProjectListY = useTransform(scrollProgress, [0.745, 0.775], ["0px", "8px"]);

  const sidebarExperienceListOpacity = useTransform(scrollProgress, [0.755, 0.785], [0, 1]);
  const sidebarExperienceListY = useTransform(scrollProgress, [0.755, 0.785], ["8px", "0px"]);

  // ================================================================
  // MAIN PANE TRANSFORMS
  // ================================================================
  const mainProjectOpacity = useTransform(scrollProgress, [0.745, 0.775], [1, 0]);
  const mainProjectY = useTransform(scrollProgress, [0.745, 0.775], ["0px", "6px"]);

  const mainExperienceOpacity = useTransform(scrollProgress, [0.755, 0.785], [0, 1]);
  const mainExperienceY = useTransform(scrollProgress, [0.755, 0.785], ["-6px", "0px"]);

  // Subtle blur during the crossover window only
  const mainPaneBlur = useTransform(
    scrollProgress,
    [0.745, 0.765, 0.775, 0.795],
    ["blur(0px)", "blur(1.5px)", "blur(1.5px)", "blur(0px)"]
  );

  // ================================================================
  // CONSOLE EXIT TRANSFORMS (Phase 04 -> Phase 05 Transition)
  // Stable reading plateau: 0.775 -> 0.865
  // Exit transition to Phase 05: 0.865 -> 0.895
  // ================================================================
  const consoleOpacity = useTransform(scrollProgress, [0.865, 0.895], [1, 0]);
  const consoleY = useTransform(scrollProgress, [0.865, 0.895], ["0px", "-10px"]);

  // Pointer events: active during 0.62 - 0.88
  const isConsoleInteractive = currentProgress >= 0.62 && currentProgress < 0.88;
  const isInExperience = currentProgress >= 0.77;

  return (
    <motion.div
      className="relative w-full h-full bg-[#0c1017]/95 border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden"
      style={
        prefersReducedMotion
          ? { pointerEvents: isConsoleInteractive ? "auto" : "none" }
          : {
              opacity: consoleOpacity,
              y: consoleY,
              pointerEvents: isConsoleInteractive ? "auto" : "none",
            }
      }
    >

      {/* ============================================================
          CONSOLE HEADER BAR
          The persistent anchor. Never changes structure — only the
          text content inside the breadcrumb segments morphs.
          ============================================================ */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.02] shrink-0">
        <div className="flex items-center gap-3">
          {/* Window Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          {/* Breadcrumb: WORKSPACE / [SEGMENT 2] / [SEGMENT 3] */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-white/50 pl-3 border-l border-white/10">
            <span className="text-sky-400 font-semibold shrink-0">WORKSPACE</span>
            <span className="shrink-0 text-white/30">/</span>

            {/* Segment 2 — morphs between SYSTEMS_REGISTRY and PRODUCTION_ENV */}
            <div className="relative h-5 flex items-center overflow-hidden shrink-0" style={{ minWidth: "120px" }}>
              <motion.span
                className="absolute left-0 whitespace-nowrap text-white/50"
                style={prefersReducedMotion ? {} : { opacity: seg2OutOpacity, y: seg2OutY }}
              >
                SYSTEMS_REGISTRY
              </motion.span>
              <motion.span
                className="absolute left-0 whitespace-nowrap text-amber-400/80 font-medium"
                style={prefersReducedMotion ? { opacity: 0 } : { opacity: seg2InOpacity, y: seg2InY }}
              >
                PRODUCTION_ENV
              </motion.span>
            </div>

            <span className="shrink-0 text-white/30">/</span>

            {/* Segment 3 — morphs between project title and company name */}
            <div className="relative h-5 flex items-center overflow-hidden" style={{ minWidth: "130px" }}>
              <motion.span
                className="absolute left-0 whitespace-nowrap text-white/90"
                style={prefersReducedMotion ? {} : { opacity: seg3OutOpacity }}
              >
                {activeProject.title.toUpperCase().replace(/\s+/g, "_")}
              </motion.span>
              <motion.span
                className="absolute left-0 whitespace-nowrap text-amber-300 font-medium"
                style={prefersReducedMotion ? { opacity: 0 } : { opacity: seg3InOpacity }}
              >
                ONELAP_TELEMATICS
              </motion.span>
            </div>
          </div>
        </div>

        {/* Status & Phase Indicator — right side */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
          {/* SERVICES: OPERATIONAL — THE CONTINUOUS ANCHOR. Never changes. */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)] shrink-0" />
            <span className="text-emerald-300 hidden sm:inline">SERVICES: OPERATIONAL</span>
          </div>

          <span className="hidden md:inline text-white/20">|</span>

          {/* Phase label — morphs */}
          <div className="relative hidden md:flex h-4 items-center overflow-hidden" style={{ minWidth: "140px" }}>
            <motion.span
              className="absolute right-0 whitespace-nowrap text-white/40"
              style={prefersReducedMotion ? {} : { opacity: phaseLabelProjectOpacity }}
            >
              PHASE 03 // PROJECTS
            </motion.span>
            <motion.span
              className="absolute right-0 whitespace-nowrap text-amber-400/60"
              style={prefersReducedMotion ? { opacity: 0 } : { opacity: phaseLabelExperienceOpacity }}
            >
              PHASE 04 // EXPERIENCE
            </motion.span>
          </div>
        </div>
      </div>

      {/* ============================================================
          CONSOLE BODY — split sidebar + main pane
          ============================================================ */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">

        {/* ====================
            LEFT SIDEBAR
            ==================== */}
        <div className="w-full lg:w-[320px] xl:w-[340px] border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20 p-3 sm:p-4 flex flex-col shrink-0 overflow-hidden">
          
          {/* Sidebar heading — morphs */}
          <div className="relative h-7 mb-2 flex items-center overflow-hidden">
            <motion.span
              className="absolute text-[11px] font-mono uppercase tracking-wider text-white/40"
              style={prefersReducedMotion ? {} : { opacity: sidebarHeaderProjectOpacity }}
            >
              Deployed Systems ({portfolioData.projects.length})
            </motion.span>
            <motion.span
              className="absolute text-[11px] font-mono uppercase tracking-wider text-amber-400/50"
              style={prefersReducedMotion ? { opacity: 0 } : { opacity: sidebarHeaderExperienceOpacity }}
            >
              Production Environments ({portfolioData.experience.length})
            </motion.span>
          </div>

          {/* Content area: two layers stacked absolutely */}
          <div className="relative flex-1 overflow-hidden">
            
            {/* PROJECTS LIST */}
            <motion.div
              className="absolute inset-0 flex flex-col gap-2 overflow-y-auto"
              style={prefersReducedMotion
                ? {}
                : { opacity: sidebarProjectListOpacity, y: sidebarProjectListY, pointerEvents: isInExperience ? "none" : "auto" }
              }
            >
              {portfolioData.projects.map((project, index) => {
                const isSelected = project.id === selectedProjectId;
                return (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 border flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-sky-500/15 border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-sky-400 font-semibold">SYS // 0{index + 1}</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-sky-400/20 text-sky-200 border border-sky-400/30"
                          : "bg-white/5 text-white/40"
                      }`}>
                        {isSelected ? "ACTIVE" : "INSPECT"}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white tracking-tight">{project.title}</h4>
                    <p className="text-xs text-white/50 line-clamp-1">{project.tagline}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {/* EXPERIENCE LIST */}
            <motion.div
              className="absolute inset-0 flex flex-col gap-2 overflow-y-auto"
              style={prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: sidebarExperienceListOpacity,
                    y: sidebarExperienceListY,
                    pointerEvents: isInExperience ? "auto" : "none",
                  }
              }
            >
              {portfolioData.experience.map((exp, index) => (
                <div
                  key={exp.company}
                  className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.1)] flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-amber-400 font-semibold">ENV // 0{index + 1}</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
                      LIVE
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">{exp.company}</h4>
                  <p className="text-xs text-amber-300/80 font-medium">{exp.role}</p>
                  <span className="font-mono text-[10px] text-white/40">{exp.period}</span>
                </div>
              ))}

              <div className="mt-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Production Domain</div>
                <div className="text-xs text-white/70">Fleet Telematics, Geospatial Ingestion, Low-Latency REST APIs</div>
              </div>
            </motion.div>
          </div>

          <div className="pt-3 border-t border-white/10 mt-auto flex items-center justify-between text-[10px] font-mono text-white/30 shrink-0">
            <span>TERMINAL ID: NK-01</span>
            <span className="text-emerald-400/70 font-semibold">SYNCED</span>
          </div>
        </div>

        {/* ====================
            MAIN PANE
            Two layers: project inspector + experience inspector
            Blur applied to outer container during crossover only.
            ==================== */}
        <motion.div
          className="flex-1 relative overflow-hidden bg-black/40"
          style={prefersReducedMotion ? {} : { filter: mainPaneBlur }}
        >
          {/* PROJECT INSPECTOR (FULL-WIDTH 2-COLUMN VIEWPORT PARTICIPATION) */}
          <motion.div
            className="absolute inset-0 overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col"
            style={prefersReducedMotion
              ? {}
              : { opacity: mainProjectOpacity, y: mainProjectY, pointerEvents: isInExperience ? "none" : "auto" }
            }
          >
            {/* Project role + GitHub */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2 shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span>{activeProject.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-all"
                >
                  <span>VIEW SOURCE // GITHUB</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Split 2-Column Grid for Projects */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
              
              {/* Left Column: Details, Tabs, & Architecture Specs */}
              <div className="xl:col-span-7 flex flex-col gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
                    {activeProject.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70 font-light">
                    {activeProject.tagline}
                  </p>
                </div>

                {/* Inspector Tabs */}
                <div className="flex items-center gap-2 border-b border-white/10 pb-2.5 shrink-0 overflow-x-auto">
                  {(["architecture", "metrics", "stack"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveProjectTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                        activeProjectTab === tab
                          ? "bg-white/10 text-white font-medium border border-white/20"
                          : "text-white/40 hover:text-white/80"
                      }`}
                    >
                      {tab === "architecture" ? "// ARCHITECTURE" : tab === "metrics" ? "// METRICS" : "// TECH TOPOLOGY"}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                {activeProjectTab === "architecture" && (
                  <div className="space-y-3">
                    <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/10">
                      <div className="text-[10px] font-mono text-sky-400 mb-1 uppercase tracking-wider font-semibold">
                        System Architecture Overview
                      </div>
                      <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light">
                        {activeProject.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-white/[0.025] border border-white/5">
                        <span className="font-mono text-[10px] text-amber-400 block mb-1 font-semibold uppercase">
                          ENGINEERING FOCUS
                        </span>
                        <span className="text-xs text-white/75 leading-relaxed">
                          {selectedProjectId === "wealth-tracker" && "High-concurrency data models, transaction isolation, and modular REST microservices."}
                          {selectedProjectId === "placement-portal" && "Role-based access security, candidate state machines, and evaluation pipelines."}
                          {selectedProjectId === "ai-customer-service" && "Dense vector similarity search, context grounding, and low-latency inference dispatch."}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.025] border border-white/5">
                        <span className="font-mono text-[10px] text-emerald-400 block mb-1 font-semibold uppercase">
                          RELIABILITY CONTRACT
                        </span>
                        <span className="text-xs text-white/75 leading-relaxed">
                          {selectedProjectId === "wealth-tracker" && "Resilient error propagation, query indexing, and verifiable ledger contracts."}
                          {selectedProjectId === "placement-portal" && "Transactional consistency during high-volume interview schedule dispatches."}
                          {selectedProjectId === "ai-customer-service" && "Anti-hallucination verification boundaries and source chunk citation grounding."}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeProjectTab === "metrics" && (
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Verified Production Telemetry</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(activeProject.metrics || []).map((metric, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                          <div>
                            <span className="text-[10px] font-mono text-sky-300 block mb-0.5">METRIC // 0{idx + 1}</span>
                            <span className="text-xs sm:text-sm font-semibold text-white">{metric}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeProjectTab === "stack" && (
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Integrated System Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech) => (
                        <div key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Procedural Interactive System Topology Matrix tailored to selected project */}
              <div className="xl:col-span-5 flex flex-col gap-3">
                <div className="p-4 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md flex flex-col flex-1 min-h-[260px] justify-between">
                  
                  {/* Canvas Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                      <span className="font-mono text-[11px] text-sky-300 font-semibold tracking-wider">
                        {selectedProjectId === "wealth-tracker" && "TOPOLOGY // ACID FINANCIAL LEDGER"}
                        {selectedProjectId === "placement-portal" && "TOPOLOGY // RECRUITMENT PIPELINE"}
                        {selectedProjectId === "ai-customer-service" && "TOPOLOGY // VECTOR RAG ENGINE"}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      LIVE TOPOLOGY
                    </span>
                  </div>

                  {/* Procedural SVG Diagram */}
                  <div className="relative h-36 my-2 rounded-lg bg-black/60 border border-white/5 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px] opacity-60" />
                    
                    {/* SVG Connections & Nodes */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 140" fill="none">
                      {selectedProjectId === "wealth-tracker" && (
                        <>
                          <path d="M 30 70 L 100 70 L 180 40 L 260 70" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                          <path d="M 100 70 L 180 100 L 260 70" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                          <circle cx="30" cy="70" r="4" fill="#38bdf8" />
                          <circle cx="100" cy="70" r="5" fill="#38bdf8" className="animate-pulse" />
                          <circle cx="180" cy="40" r="4" fill="#f59e0b" />
                          <circle cx="180" cy="100" r="4" fill="#34d399" />
                          <circle cx="260" cy="70" r="6" fill="#38bdf8" className="animate-ping" opacity="0.6" />
                          <circle cx="260" cy="70" r="5" fill="#38bdf8" />
                        </>
                      )}

                      {selectedProjectId === "placement-portal" && (
                        <>
                          <path d="M 30 40 L 110 70 L 190 70 L 265 40" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                          <path d="M 30 100 L 110 70 L 190 70 L 265 100" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                          <circle cx="30" cy="40" r="4" fill="#34d399" />
                          <circle cx="30" cy="100" r="4" fill="#38bdf8" />
                          <circle cx="110" cy="70" r="5.5" fill="#34d399" className="animate-pulse" />
                          <circle cx="190" cy="70" r="5" fill="#f59e0b" />
                          <circle cx="265" cy="40" r="4" fill="#38bdf8" />
                          <circle cx="265" cy="100" r="4" fill="#a855f7" />
                        </>
                      )}

                      {selectedProjectId === "ai-customer-service" && (
                        <>
                          <path d="M 35 70 C 90 20, 140 120, 200 70" stroke="rgba(192, 132, 252, 0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
                          <path d="M 200 70 L 265 70" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
                          <circle cx="35" cy="70" r="4" fill="#c084fc" />
                          <circle cx="115" cy="55" r="4.5" fill="#38bdf8" className="animate-pulse" />
                          <circle cx="200" cy="70" r="5.5" fill="#c084fc" />
                          <circle cx="265" cy="70" r="6" fill="#34d399" className="animate-ping" opacity="0.7" />
                          <circle cx="265" cy="70" r="5" fill="#34d399" />
                        </>
                      )}
                    </svg>

                    {/* Overlay labels */}
                    <div className="absolute top-2 left-2 font-mono text-[9px] text-white/50 bg-black/60 px-1.5 py-0.5 rounded border border-white/5">
                      {selectedProjectId === "wealth-tracker" && "LEDGER_ENGINE // SERIALIZABLE"}
                      {selectedProjectId === "placement-portal" && "AUTH_RBAC // SPRING_SECURITY"}
                      {selectedProjectId === "ai-customer-service" && "PGVECTOR // COSINE_SIMILARITY"}
                    </div>
                    <div className="absolute bottom-2 right-2 font-mono text-[9px] text-sky-400 bg-black/60 px-1.5 py-0.5 rounded border border-sky-500/20">
                      {selectedProjectId === "wealth-tracker" && "AUDIT_TRAIL: ACTIVE"}
                      {selectedProjectId === "placement-portal" && "PIPELINE: REAL-TIME"}
                      {selectedProjectId === "ai-customer-service" && "GROUNDED: VERIFIED"}
                    </div>
                  </div>

                  {/* Architecture Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded bg-white/[0.02] border border-white/5 font-mono">
                      <span className="text-[9px] text-white/40 block">LATENCY PROFILE</span>
                      <span className="text-xs font-semibold text-sky-300">
                        {selectedProjectId === "wealth-tracker" && "Sub-50ms Query"}
                        {selectedProjectId === "placement-portal" && "<30ms REST API"}
                        {selectedProjectId === "ai-customer-service" && "<120ms Vector Search"}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02] border border-white/5 font-mono">
                      <span className="text-[9px] text-white/40 block">STORAGE ENGINE</span>
                      <span className="text-xs font-semibold text-emerald-400">
                        {selectedProjectId === "wealth-tracker" && "PostgreSQL + Redis"}
                        {selectedProjectId === "placement-portal" && "MySQL Enterprise"}
                        {selectedProjectId === "ai-customer-service" && "pgvector Embeddings"}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02] border border-white/5 font-mono">
                      <span className="text-[9px] text-white/40 block">SYSTEM ISOLATION</span>
                      <span className="text-xs font-semibold text-amber-400">
                        {selectedProjectId === "wealth-tracker" && "ACID Ledger Compliant"}
                        {selectedProjectId === "placement-portal" && "Role-Based Token Auth"}
                        {selectedProjectId === "ai-customer-service" && "Context-Bound Citations"}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02] border border-white/5 font-mono">
                      <span className="text-[9px] text-white/40 block">CONTAINERIZATION</span>
                      <span className="text-xs font-semibold text-white">Dockerized Lifecycle</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40 shrink-0">
              <span>ENVIRONMENT: INTERACTIVE // SELECT SYSTEMS ON LEFT</span>
              <span>NAMAN KHURANA PORTFOLIO</span>
            </div>
          </motion.div>

          {/* EXPERIENCE INSPECTOR */}
          <motion.div
            className="absolute inset-0 overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col"
            style={prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: mainExperienceOpacity, y: mainExperienceY, pointerEvents: isInExperience ? "auto" : "none" }
            }
          >
            {/* Experience header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>{activeExperience.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400/80 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  {activeExperience.period}
                </span>
                <span className="font-mono text-xs text-emerald-400/90 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  PRODUCTION VERIFIED
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-1 shrink-0">
              {activeExperience.company}
            </h2>
            <p className="text-xs sm:text-sm text-white/40 font-mono mb-5 shrink-0 uppercase tracking-wider">
              Fleet Telematics Infrastructure & Stream Ingestion
            </p>

            {/* Split 2-Column Grid: Left = Log & Stack, Right = Contextual Telematics System Matrix */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
              
              {/* Left Column: Key Highlight + Engineering Log + Tech Stack */}
              <div className="xl:col-span-7 flex flex-col gap-4">
                
                {/* Key Achievement */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.08)]">
                  <div className="text-[10px] font-mono text-amber-400 mb-1.5 uppercase tracking-wider font-semibold">
                    // KEY ENGINEERING HIGHLIGHT
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    {activeExperience.keyHighlight}
                  </p>
                </div>

                {/* Engineering Log */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Production Engineering Log</div>
                  {activeExperience.description.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                      <span className="font-mono text-[10px] text-amber-400/70 mt-0.5 shrink-0 font-semibold">
                        0{idx + 1}
                      </span>
                      <span className="text-xs text-white/80 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Production Stack */}
                <div className="pt-1">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2">Production Stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeExperience.technologies.map((tech) => (
                      <div key={tech} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Procedural Telematics Pipeline & Geospatial Node Matrix */}
              <div className="xl:col-span-5 flex flex-col gap-3">
                <div className="p-4 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md flex flex-col flex-1 min-h-[260px] justify-between">
                  
                  {/* Telematics Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span className="font-mono text-[11px] text-amber-300 font-semibold tracking-wider">
                        TELEMETRY // PIPELINE
                      </span>
                    </div>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      LIVE INGESTION
                    </span>
                  </div>

                  {/* Procedural SVG Geospatial Stream Grid */}
                  <div className="relative h-36 my-2 rounded-lg bg-black/60 border border-white/5 overflow-hidden flex items-center justify-center">
                    
                    {/* Background Coordinate Grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px] opacity-60" />
                    
                    {/* SVG Coordinate Node Links */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 140" fill="none">
                      {/* Connection lines */}
                      <path d="M 40 40 L 120 70 L 220 50 L 260 100" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                      <path d="M 60 110 L 120 70 L 180 110 L 260 100" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
                      
                      {/* Spatial Nodes */}
                      <circle cx="40" cy="40" r="4" fill="#f59e0b" />
                      <circle cx="120" cy="70" r="6" fill="#38bdf8" className="animate-pulse" />
                      <circle cx="220" cy="50" r="4" fill="#34d399" />
                      <circle cx="60" cy="110" r="3.5" fill="#f59e0b" />
                      <circle cx="180" cy="110" r="4" fill="#a855f7" />
                      <circle cx="260" cy="100" r="5" fill="#f59e0b" className="animate-ping" opacity="0.75" />
                      <circle cx="260" cy="100" r="5" fill="#f59e0b" />

                      {/* Radar sweep line */}
                      <line x1="120" y1="70" x2="280" y2="30" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" />
                    </svg>

                    {/* Overlay telemetry badges */}
                    <div className="absolute top-2 left-2 font-mono text-[9px] text-white/50 bg-black/60 px-1.5 py-0.5 rounded border border-white/5">
                      GEO_BOUNDS: [28.6139° N, 77.2090° E]
                    </div>
                    <div className="absolute bottom-2 right-2 font-mono text-[9px] text-amber-400 bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/20">
                      R-TREE // SPATIAL INDEX ACTIVE
                    </div>
                  </div>

                  {/* Live Performance Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded bg-white/[0.02] border border-white/5 font-mono">
                      <span className="text-[9px] text-white/40 block">INGESTION THROUGHPUT</span>
                      <span className="text-xs font-semibold text-amber-300">~100K events/min</span>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02] border border-white/5 font-mono">
                      <span className="text-[9px] text-white/40 block">SPATIAL QUERY LATENCY</span>
                      <span className="text-xs font-semibold text-emerald-400">&lt;15ms PostGIS</span>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02] border border-white/5 font-mono">
                      <span className="text-[9px] text-white/40 block">TRIP DETECTION ACC</span>
                      <span className="text-xs font-semibold text-sky-400">99.4% Algorithm</span>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02] border border-white/5 font-mono">
                      <span className="text-[9px] text-white/40 block">PIPELINE AVAILABILITY</span>
                      <span className="text-xs font-semibold text-white">99.98% High-Avail</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40 shrink-0">
              <span>ENVIRONMENT: ONELAP PRODUCTION</span>
              <span>NAMAN KHURANA // TELEMATICS RECORD</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
