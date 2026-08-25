"use client";

import React, { useState } from "react";
import { motion, useTransform, AnimatePresence } from "motion/react";
import { portfolioData } from "@/data/portfolio";
import { useTimeline } from "@/context/TimelineContext";

export const Phase03ProjectsWorkspace: React.FC = () => {
  const { scrollProgress, prefersReducedMotion } = useTimeline();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    portfolioData.projects[0].id
  );
  const [activeTab, setActiveTab] = useState<"architecture" | "metrics" | "stack">("architecture");

  const activeProject =
    portfolioData.projects.find((p) => p.id === selectedProjectId) ||
    portfolioData.projects[0];

  // Digital Workspace emerges as the physical wall dissolves (0.61 -> 0.66)
  const workspaceOpacity = useTransform(
    scrollProgress,
    [0.60, 0.65, 0.78, 0.83],
    [0, 1, 1, 0]
  );

  const workspaceScale = useTransform(
    scrollProgress,
    [0.60, 0.65],
    [0.94, 1.0]
  );

  const workspaceY = useTransform(
    scrollProgress,
    [0.60, 0.65],
    ["30px", "0px"]
  );

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-none"
      style={{
        opacity: workspaceOpacity,
        scale: prefersReducedMotion ? 1 : workspaceScale,
        y: prefersReducedMotion ? "0px" : workspaceY,
      }}
    >
      {/* Main Software Console Frame */}
      <div className="relative w-full max-w-[1360px] h-[88vh] max-h-[820px] bg-[#0c1017]/95 border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden pointer-events-auto">
        
        {/* Console Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Breadcrumb Path */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-white/50 pl-3 border-l border-white/10">
              <span className="text-sky-400 font-semibold">WORKSPACE</span>
              <span>/</span>
              <span>SYSTEMS_REGISTRY</span>
              <span>/</span>
              <span className="text-white/90">{activeProject.title.toUpperCase().replace(/\s+/g, "_")}</span>
            </div>
          </div>

          {/* Telemetry Indicator */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span className="text-emerald-300">SERVICES: OPERATIONAL</span>
            </div>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-white/40">PHASE 03 // PROJECTS</span>
          </div>
        </div>

        {/* Console Body: Split Workspace Layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Sidebar: Service Registry / Project Tree */}
          <div className="w-full lg:w-[340px] border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20 p-3 sm:p-4 flex flex-col gap-2 overflow-y-auto">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 px-2 py-1 flex items-center justify-between">
              <span>Deployed Systems ({portfolioData.projects.length})</span>
              <span>INDEX</span>
            </div>

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
                    <span className="font-mono text-[10px] text-sky-400 font-semibold">
                      SYS // 0{index + 1}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-sky-400/20 text-sky-200 border border-sky-400/30"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {isSelected ? "ACTIVE" : "INSPECT"}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white tracking-tight">
                    {project.title}
                  </h4>

                  <p className="text-xs text-white/50 line-clamp-1">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Main Pane: Architecture & Engineering Inspector */}
          <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#090d14]/60">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col justify-between"
              >
                {/* Project Header Info */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/30 text-sky-300 font-mono text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>{activeProject.role}</span>
                    </div>

                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-all"
                    >
                      <span>VIEW SOURCE // GITHUB</span>
                      <span>↗</span>
                    </a>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                    {activeProject.title}
                  </h2>

                  <p className="text-sm sm:text-base text-white/70 font-light mb-6">
                    {activeProject.tagline}
                  </p>

                  {/* Navigation Tabs inside Inspector */}
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6">
                    <button
                      onClick={() => setActiveTab("architecture")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        activeTab === "architecture"
                          ? "bg-white/10 text-white font-medium border border-white/20"
                          : "text-white/40 hover:text-white/80"
                      }`}
                    >
                      // ARCHITECTURE & SYSTEMS
                    </button>
                    <button
                      onClick={() => setActiveTab("metrics")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        activeTab === "metrics"
                          ? "bg-white/10 text-white font-medium border border-white/20"
                          : "text-white/40 hover:text-white/80"
                      }`}
                    >
                      // METRICS & TELEMETRY
                    </button>
                    <button
                      onClick={() => setActiveTab("stack")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        activeTab === "stack"
                          ? "bg-white/10 text-white font-medium border border-white/20"
                          : "text-white/40 hover:text-white/80"
                      }`}
                    >
                      // TECH TOPOLOGY
                    </button>
                  </div>

                  {/* Tab Content Display */}
                  {activeTab === "architecture" && (
                    <div className="space-y-4">
                      <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10">
                        <div className="text-[11px] font-mono text-sky-400 mb-1.5 uppercase">
                          System Overview & Blueprint
                        </div>
                        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                          {activeProject.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                          <span className="font-mono text-xs text-amber-400 block mb-1">
                            ENGINEERING FOCUS
                          </span>
                          <span className="text-xs text-white/70">
                            High-concurrency data models, transaction isolation, and modular REST microservices.
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                          <span className="font-mono text-xs text-emerald-400 block mb-1">
                            RELIABILITY
                          </span>
                          <span className="text-xs text-white/70">
                            Resilient error propagation, query indexing, and verifiable output contracts.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "metrics" && (
                    <div className="space-y-3">
                      <div className="text-xs font-mono text-white/50 mb-2">
                        VERIFIED PRODUCTION TELEMETRY
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(activeProject.metrics || []).map((metric, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-start gap-3"
                          >
                            <span className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                            <div>
                              <span className="text-xs font-mono text-sky-300 block mb-0.5">
                                METRIC // 0{idx + 1}
                              </span>
                              <span className="text-sm font-semibold text-white">
                                {metric}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "stack" && (
                    <div className="space-y-4">
                      <div className="text-xs font-mono text-white/50 mb-2">
                        INTEGRATED SYSTEM STACK
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {activeProject.technologies.map((tech) => (
                          <div
                            key={tech}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-mono text-white"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer status / navigation hint */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>ENVIRONMENT: INTERACTIVE // SELECT SYSTEMS ON LEFT</span>
                  <span>NAMAN KHURANA PORTFOLIO</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
