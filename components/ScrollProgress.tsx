"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-4 select-none pointer-events-none">
      {/* Telemetry percentage readout */}
      <span 
        className="font-mono text-[9px] tracking-widest text-accent/60 uppercase" 
        style={{ writingMode: "vertical-lr" }}
      >
        SYS_SCROLL_POS // {Math.round(progress * 100).toString().padStart(3, "0")}%
      </span>

      {/* Progress Track */}
      <div className="w-[1px] h-32 bg-purple-500/10 relative">
        {/* Progress Fill */}
        <div
          className="absolute top-0 left-0 w-full bg-accent shadow-[0_0_8px_rgba(215,179,255,0.8)] transition-all duration-75 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      <span className="font-mono text-[8px] tracking-[0.2em] text-accent/30 uppercase">
        HUD_BS
      </span>
    </div>
  );
}
