"use client";

import { useEffect, useState, useRef } from "react";

export default function TechCursor() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const crossPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    
    let frameId: number;
    const animate = () => {
      
      const speedDot = 0.25;
      const speedCross = 0.08;

      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * speedDot;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * speedDot;

      crossPos.current.x += (mousePos.current.x - crossPos.current.x) * speedCross;
      crossPos.current.y += (mousePos.current.y - crossPos.current.y) * speedCross;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
      }
      if (crossRef.current) {
        crossRef.current.style.transform = `translate(${crossPos.current.x}px, ${crossPos.current.y}px) rotate(${crossPos.current.x * 0.2}deg)`;
      }
      if (boxRef.current) {
        boxRef.current.style.transform = `translate(${crossPos.current.x + 20}px, ${crossPos.current.y + 20}px)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] hidden md:block">
      {}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2"
      />

      {/* Rotating outer targeting bracket */}
      <div
        ref={crossRef}
        className="absolute top-0 left-0 w-7 h-7 border border-purple-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        {/* Subtle crosshair ticks */}
        <div className="w-[1px] h-1.5 bg-accent/40 absolute top-0" />
        <div className="w-[1px] h-1.5 bg-accent/40 absolute bottom-0" />
        <div className="w-1.5 h-[1px] bg-accent/40 absolute left-0" />
        <div className="w-1.5 h-[1px] bg-accent/40 absolute right-0" />
      </div>

      {/* Telemetry Coordinates Box */}
      <div
        ref={boxRef}
        className="absolute top-0 left-0 bg-[#0d0a18]/70 border border-purple-500/10 px-2 py-1 flex flex-col font-mono text-[8px] tracking-wider text-accent/60 gap-0.5 rounded-sm"
      >
        <span>X: {coords.x}px</span>
        <span>Y: {coords.y}px</span>
      </div>
    </div>
  );
}
