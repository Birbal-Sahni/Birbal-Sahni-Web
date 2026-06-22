"use client";

import { useEffect, useState, useRef } from "react";

export default function FullscreenLock({ children }: { children: React.ReactNode }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    
    const audio = new Audio("/audio.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);

      
      if (audioRef.current) {
        if (active && !isMuted) {
          audioRef.current.play().catch((err) => {
            console.log("Audio play blocked: require interaction", err);
          });
        } else {
          audioRef.current.pause();
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    
    setIsFullscreen(!!document.fullscreenElement);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isMuted]);

  const requestFullscreenLink = async () => {
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if ((docEl as any).webkitRequestFullscreen) {
        await (docEl as any).webkitRequestFullscreen();
      } else if ((docEl as any).msRequestFullscreen) {
        await (docEl as any).msRequestFullscreen();
      }
      setHasInteracted(true);
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const targetMute = !isMuted;
      audioRef.current.muted = targetMute;
      setIsMuted(targetMute);
      if (!targetMute && isFullscreen) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  if (!isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050208] text-white p-6 overflow-hidden">
        {}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Glowing visual indicator */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

        {/* Tactical alert prompt */}
        <div className="relative z-10 max-w-lg w-full border border-purple-500/10 bg-[#0d0a18]/80 backdrop-blur-xl p-8 rounded-sm flex flex-col items-center text-center">
          {/* Diagnostic Corner ticks */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-purple-400/40" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-400/40" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-400/40" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-purple-400/40" />

          {}
          <span className="text-[10px] font-mono tracking-[0.3em] text-accent/60 mb-2 uppercase">
            [ LINK_CALIBRATION_REQUIRED ]
          </span>

          <h1 className="text-xl sm:text-2xl font-light tracking-tight text-white mb-4">
            Initialize Teleoperation Console
          </h1>

          <p className="text-xs text-muted leading-relaxed font-light mb-8 max-w-xs">
            To prevent servo calibration offset and input jitter, this system requires a locked fullscreen terminal. 
            Sound telemetry will initialize automatically.
          </p>

          <button
            onClick={requestFullscreenLink}
            className="px-6 py-2.5 bg-purple-950/40 border border-purple-400/30 text-accent font-mono text-[10px] tracking-[0.25em] uppercase hover:bg-purple-900/30 hover:border-purple-300/50 hover:text-white transition-all duration-300 cursor-pointer"
          >
            [ Engage System Matrix ]
          </button>
        </div>

        {/* Floating tech label */}
        <div className="absolute bottom-8 text-[9px] font-mono tracking-widest text-accent/25 uppercase">
          SYS.LOC // DELHI_BOOTCAMP_2026 // NODE_BS_01
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Audio controls floating widget */}
      <div className="fixed top-6 right-6 z-[90] flex items-center gap-4 pointer-events-auto select-none">
        <button
          onClick={toggleMute}
          className="flex items-center gap-3 bg-[#0d0a18]/40 border border-purple-500/10 px-3 py-1.5 rounded-sm hover:border-accent/40 hover:bg-[#1a1528]/40 transition-all duration-300 cursor-pointer"
        >
          {/* Animating bars if playing and unmuted */}
          <div className="flex items-end gap-0.5 h-3 w-4">
            <div
              className={`w-0.5 bg-accent/70 rounded-full transition-all ${
                !isMuted ? "animate-pulse h-full" : "h-1"
              }`}
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className={`w-0.5 bg-accent/70 rounded-full transition-all ${
                !isMuted ? "animate-pulse h-[60%]" : "h-[40%]"
              }`}
              style={{ animationDelay: "0.3s" }}
            />
            <div
              className={`w-0.5 bg-accent/70 rounded-full transition-all ${
                !isMuted ? "animate-pulse h-[80%]" : "h-[20%]"
              }`}
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <span className="text-[9px] font-mono tracking-wider text-accent/70 uppercase">
            {isMuted ? "Audio Off" : "Audio On"}
          </span>
        </button>
      </div>

      {children}
    </>
  );
}
