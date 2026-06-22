"use client";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 sm:px-12 md:px-20 lg:px-28 border-t border-purple-500/5">
      {}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left — Brand */}
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          <span
            className="text-xs tracking-[0.2em] uppercase text-accent/60 font-mono"
          >
            Team Birbal Sahni
          </span>
        </div>

        {/* Center — Context */}
        <p className="text-xs text-[#eee9ff]/45 text-center font-light">
          AI + Robotics Bootcamp, Delhi &mdash; 2026
        </p>

        {/* Right — Attribution */}
        <p className="text-xs text-[#eee9ff]/30 font-light text-center sm:text-right">
          Named in honor of{" "}
          <span className="text-[#eee9ff]/50">
            Prof. Birbal Sahni
          </span>
          , pioneering Indian paleobotanist
        </p>
      </div>
    </footer>
  );
}
