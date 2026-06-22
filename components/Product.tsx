"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: "01",
    title: "Real-Time Teleoperation",
    description:
      "Sub-10ms command relay enabling seamless remote manipulation with zero perceivable inputs lag across the master-slave interface. Built for high-frequency synchronization.",
    details: ["LINK_LATENCY: < 8.4MS", "BUS_PROTOCOL: RS-485", "FREQ_BAND: 2.4/5.8GHZ"],
  },
  {
    num: "02",
    title: "Haptic Feedback Loops",
    description:
      "Integrated bilateral force sensing maps slave-arm load states directly back to the master controller, delivering precise tactile fidelity for delicate tasks.",
    details: ["LOAD_CELLS: 6-AXIS", "SENSITIVITY: 0.05N", "FEEDBACK_COEFF: PID_SET"],
  },
  {
    num: "03",
    title: "Sub-Millimeter Precision",
    description:
      "High-resolution magnetic encoder arrays coupled with closed-loop PID control achieve repeatable positioning under 0.1mm across all axes.",
    details: ["RESOLUTION: 16-BIT", "ENCODERS: ABSOLUTE", "BACKLASH: < 0.02MM"],
  },
];

export default function Product() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 0.8,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 py-32 overflow-hidden"
    >
      <div className="max-w-4xl relative z-10 pl-6 sm:pl-10 md:pl-16">
        {}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-accent/60">
            [ SYSTEM SPECIFICATION ]
          </span>
        </div>

        {}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tighter leading-none mb-6"
        >
          <span className="text-white">The FORGE </span>
          <span className="text-accent italic font-light">Manipulator</span>
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg text-muted max-w-2xl mb-20 leading-relaxed font-light"
        >
          An advanced robotic appendage engineered to bridge human gesture and mechanical execution.
          Featuring a high-rigidity structural frame and closed-loop control arrays, the FORGE platform performs
          surgical-grade operations under extreme environmental variables.
        </p>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="pointer-events-auto glass-card tech-border rounded-sm p-8 flex flex-col justify-between min-h-[300px] group border-purple-500/5 relative overflow-hidden"
            >
              {}
              <div className="scan-bar" />

              <div>
                {/* Number */}
                <div className="text-4xl font-extralight text-accent/15 tracking-tight font-mono mb-6 group-hover:text-accent/35 transition-colors duration-500">
                  {feature.num}
                </div>

                {}
                <h3 className="text-lg font-light text-white mb-3 tracking-wide">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#eee9ff]/60 leading-relaxed font-light mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Technical Diagnostics list */}
              <div className="border-t border-purple-500/10 pt-4 flex flex-col gap-1 font-mono text-[11px] sm:text-xs tracking-wider text-accent/40 group-hover:text-accent/70 transition-colors duration-500">
                {feature.details.map((detail, index) => (
                  <span key={index}>// {detail}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
