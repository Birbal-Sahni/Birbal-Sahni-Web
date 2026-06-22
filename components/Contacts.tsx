"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contacts() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      
      gsap.fromTo(
        infoRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="relative min-h-[60vh] flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 py-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl pl-6 sm:pl-10 md:pl-16 w-full">
        {}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-accent/60">
            [ CONTACT CONSOLE ]
          </span>
        </div>

        {}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-6xl font-extralight tracking-tighter leading-none mb-12"
        >
          <span className="text-white">Secure </span>
          <span className="text-accent italic font-light">Uplink</span>
        </h2>

        {/* Terminal Contact Grid */}
        <div
          ref={infoRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-purple-500/10 bg-[#0d0a18]/30 backdrop-blur-md p-8 sm:p-12 tech-border w-full"
        >
          {/* Diagnostic status */}
          <div className="absolute top-4 right-6 font-mono text-[10px] sm:text-xs text-accent/30 tracking-widest hidden sm:block">
            COMMS_ENCRYPTED // DUPLEX_STABLE
          </div>

          {/* Left panel - clickable details */}
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono text-accent/50 tracking-widest uppercase">// CHANNEL NODES</span>

            {}
            <div className="group flex flex-col gap-1 pointer-events-auto">
              <span className="text-xs font-mono text-accent/40 uppercase">Voice Uplink</span>
              <a
                href="tel:8010208383"
                className="text-2xl sm:text-3xl font-light text-white hover:text-accent tracking-wide transition-colors duration-300 w-fit"
              >
                +91 8010208383
              </a>
            </div>

            {/* Email */}
            <div className="group flex flex-col gap-1 pointer-events-auto">
              <span className="text-xs font-mono text-accent/40 uppercase">Secure Mail</span>
              <a
                href="mailto:i@pranab.xyz"
                className="text-2xl sm:text-3xl font-light text-white hover:text-accent tracking-wide transition-colors duration-300 w-fit"
              >
                i@pranab.xyz
              </a>
            </div>

            {/* Instagram */}
            <div className="group flex flex-col gap-1 pointer-events-auto">
              <span className="text-xs font-mono text-accent/40 uppercase">Terminal Broadcast</span>
              <a
                href="https://instagram.com/pranab.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl sm:text-3xl font-light text-white hover:text-accent tracking-wide transition-colors duration-300 w-fit"
              >
                @pranab.tech
              </a>
            </div>
          </div>

          {/* Right panel - technical status data */}
          <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-purple-500/10 pt-6 md:pt-0 md:pl-10 font-mono text-xs sm:text-sm tracking-widest text-accent/45 leading-relaxed">
            <div className="flex flex-col gap-2">
              <span className="text-white/60 mb-2 uppercase">[ System Access Credentials ]</span>
              <span>GATEWAY_SERVO: ESTABLISHED</span>
              <span>HOST_SIGN_KEY: AUTH_VERIFIED</span>
              <span>Delhi Bootcamp // 2026</span>
            </div>

            <div className="text-[10px] sm:text-xs text-accent/35 mt-6 border-t border-purple-500/5 pt-4">
              * DO NOT SEND UNVERIFIED COMMAND STRINGS. ALL INPUT TELEMETRY IS LOGGED IN Delhi AI LABS.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
