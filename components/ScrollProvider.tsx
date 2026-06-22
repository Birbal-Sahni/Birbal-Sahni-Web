"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    
    const updateTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
