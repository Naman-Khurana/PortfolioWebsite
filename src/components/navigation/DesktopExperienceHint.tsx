"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Monitor, X } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** A brief mobile-only note about the portfolio's desktop cinematic layout. */
export const DesktopExperienceHint: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!window.matchMedia("(max-width: 639px)").matches) return;

    const showTimer = window.setTimeout(() => setIsVisible(true), 450);
    const hideTimer = window.setTimeout(() => setIsVisible(false), 3900);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 5, scale: 0.98 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[60] flex justify-center px-4 pointer-events-none sm:hidden"
        >
          <div className="pointer-events-auto flex max-w-[340px] items-center gap-2.5 rounded-xl border border-sky-300/15 bg-[#0a0c10]/85 px-3 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-sky-300/15 bg-sky-300/[0.07] text-sky-200/80">
              <Monitor size={15} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <p className="min-w-0 text-[11px] leading-snug text-white/70">
              <span className="block font-medium text-white/90">Best experienced on desktop</span>
              <span className="text-white/50">For the full cinematic view.</span>
            </p>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss desktop viewing tip"
              className="ml-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/80"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
