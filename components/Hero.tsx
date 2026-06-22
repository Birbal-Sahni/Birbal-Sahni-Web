"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        categoryRef.current,
        { opacity: 0, y: 15 },
        { opacity: 0.6, y: 0, duration: 1.0, delay: 0.2 }
      )
        .fromTo(
          word1Ref.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.7"
        )
        .fromTo(
          word2Ref.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=1.0"
        )
        .fromTo(
          detailsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.6"
        )
        .fromTo(
          sidebarRef.current,
          { opacity: 0, x: -20 },
          { opacity: 0.4, x: 0, duration: 1.0 },
          "-=0.8"
        )
        .fromTo(
          linkRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.8 },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    const productSection = document.getElementById("product");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 md:px-20 lg:px-28 py-16 overflow-hidden select-none"
    >
      
      <div className="absolute top-0 right-0 w-[400px] h-[400px] border-r border-t border-purple-500/5 pointer-events-none mr-28 mt-28">
        <div className="absolute top-0 right-0 w-2 h-2 bg-accent/20" />
        <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-accent/10" />
        <div className="absolute top-0 left-0 w-[1px] h-6 bg-accent/10" />
      </div>

      
      <div
        ref={categoryRef}
        className="flex items-center justify-between w-full text-base font-mono tracking-[0.3em] uppercase text-accent mt-4"
      >
        <span className="opacity-70">[ DELHI AI + ROBOTICS // NODE_BS_01 ]</span>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent blink-dot" />
          <span className="opacity-80">TELEOP.CONNECT_LINK_ESTABLISHED</span>
        </div>
      </div>

      
      <div
        ref={sidebarRef}
        className="absolute left-6 sm:left-12 lg:left-16 top-[35%] -translate-y-1/2 flex flex-col items-start gap-4 font-mono text-xs sm:text-sm tracking-[0.25em] text-accent uppercase writing-mode-vertical border-l border-purple-500/20 pl-4 py-2 pointer-events-none"
        style={{ writingMode: "vertical-lr" }}
      >
        <span>ARM_COORD_X.042 // Y.980 // Z.-112</span>
        <span className="opacity-50 mt-4">SYS_RATE_HIGH // TELEMETRY_DUMP</span>
      </div>

      
      <div className="my-auto max-w-4xl text-left select-none pointer-events-none pl-6 sm:pl-10 md:pl-16">
        <h1 className="text-7xl sm:text-9xl font-extralight tracking-tighter leading-[0.85] text-white">
          <span ref={word1Ref} className="block overflow-hidden pb-2 font-light">
            BIRBAL
          </span>
          <span
            ref={word2Ref}
            className="block overflow-hidden font-extralight text-[#d7b3ff] italic opacity-90"
          >
            SAHNI
          </span>
        </h1>

        
        <div
          ref={detailsRef}
          className="tech-border mt-8 sm:mt-12 flex flex-col sm:flex-row gap-6 sm:gap-12 items-start max-w-2xl text-muted text-base sm:text-lg leading-relaxed p-6 bg-[#0d0a18]/20 backdrop-blur-sm border border-purple-500/5 rounded-sm"
        >
          <span className="text-xs sm:text-sm font-mono text-accent/60 tracking-widest mt-1">
            // CALIBRATION
          </span>
          <p className="flex-1 font-light tracking-wide text-purple-100/70 text-base sm:text-lg">
            Bilateral master-slave teleoperation platform engineered to map tactile
            dexterity onto the FORGE robotic manipulator array. Low latency telemetry pipeline
            engineered at Delhi.
          </p>
        </div>
      </div>

      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0 w-full mb-4">
        
        <a
          ref={linkRef}
          href="#product"
          onClick={handleScrollToProduct}
          className="pointer-events-auto group inline-flex items-center gap-4 text-base sm:text-lg font-mono tracking-[0.25em] uppercase text-[#eee9ff] hover:text-[#d7b3ff] transition-colors duration-300"
        >
          <span>Connect Arm Controls</span>
          <div className="relative w-8 h-8 rounded-full border border-purple-500/20 flex items-center justify-center group-hover:border-accent group-hover:bg-[#1a1528]/30 transition-all duration-300">
            <span className="text-xs transform group-hover:translate-y-0.5 transition-transform duration-300">↓</span>
          </div>
        </a>

        
        <div className="font-mono text-xs sm:text-sm text-muted opacity-45 text-right leading-relaxed tracking-widest hidden sm:block">
          <span>LAT_DELHI.28.61 // LON_DELHI.77.20</span>
          <br />
          <span>SERVO_LOCK_OK // ANGLE_LERP_STATUS: CALIBRATED</span>
        </div>
      </div>
    </section>
  );
}
