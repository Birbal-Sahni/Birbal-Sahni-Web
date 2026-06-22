"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

const bootLogs = [
  "CONNECTING HOST DELHI_BOOTCAMP_2026 // NODE_BS_01",
  "INITIALIZING KINEMATICS MATRIX ENGINE...",
  "ESTABLISHING BI-DIRECTIONAL RS-485 DUPLEX PIPELINE...",
  "VERIFYING INDUCTOR FORCE-REFLECTIVE CRITICAL LOOPS... OK",
  "CALIBRATING 6-DOF ROTARY POSITIONAL ENCODERS...",
  "SYSTEM SERVO POWER RAIL INJECTION LEVEL // 24.8V",
  "JOINT LIMIT SCANS [J1: 180, J2: 120, J3: 150, J4: 270, J5: 90, J6: 360]... OK",
  "ESTABLISHING TELEOPERATION FEEDBACK LOOP [LATENCY: 8ms]...",
  "STABILIZING HARMONIC GEAR RATIO DRIVES...",
  "TELEOPERATION INTERFACE ENVELOPE CALIBRATION // COMPLETE",
  "SYSTEM ONLINE // SECURE CHANNEL VERIFIED",
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {

    document.body.style.overflow = "hidden";


    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 1;
        return Math.min(next, 100);
      });
    }, 70);

    return () => {
      clearInterval(interval);
    };
  }, []);


  useEffect(() => {
    const targetLogIndex = Math.min(
      Math.floor((progress / 100) * bootLogs.length),
      bootLogs.length - 1
    );
    if (targetLogIndex > currentLogIndex) {
      setCurrentLogIndex(targetLogIndex);
    }

    if (progress === 100) {
      const timeout = setTimeout(() => {

        gsap.to(".preloader-container", {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            setIsDone(true);

            document.body.style.overflow = "auto";
          },
        });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress, currentLogIndex]);

  if (isDone) return null;

  return (
    <div className="preloader-container fixed inset-0 z-[95] flex flex-col justify-between bg-[#050208] text-white p-8 select-none overflow-hidden">
      
      <div className="flex justify-between items-center text-[9px] font-mono text-accent/40 tracking-wider">
        <span>CORE_LOADER_V2.0.8</span>
        <span>NODE_BS_SYS_CHECK</span>
      </div>

      
      <div className="my-auto max-w-xl w-full mx-auto flex flex-col gap-6">
        
        <div className="w-12 h-12 relative flex items-center justify-center mb-4">
          <div className="absolute inset-0 border border-purple-500/20 rounded-sm animate-spin duration-[4000ms]" />
          <div className="absolute w-6 h-6 border border-accent/30 rounded-sm animate-spin duration-[2000ms] reverse" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
        </div>

        
        <div className="font-mono text-[10px] leading-relaxed text-accent/60 tracking-wider h-12 flex flex-col justify-end">
          {bootLogs.slice(0, currentLogIndex + 1).map((log, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                index === currentLogIndex ? "text-purple-200 opacity-100" : "opacity-35"
              }`}
            >
              &gt; {log}
            </div>
          ))}
        </div>

        
        <div className="w-full h-[2px] bg-purple-950/40 relative overflow-hidden mt-2">
          <div
            className="h-full bg-accent shadow-[0_0_12px_rgba(215,179,255,0.7)] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        
        <div className="flex justify-between items-end font-mono">
          <span className="text-[10px] tracking-widest text-accent/40">SYSTEM LOCKOUT ACT.</span>
          <span className="text-4xl font-extralight text-white tracking-tighter">
            {progress.toString().padStart(3, "0")}%
          </span>
        </div>
      </div>

      
      <div className="flex justify-between items-end text-[9px] font-mono text-accent/30 tracking-widest">
        <span>DELHI ROBOTICS LAB // BOOT RAILS</span>
        <span>CALIBRATION // ACT_LOAD</span>
      </div>
    </div>
  );
}
