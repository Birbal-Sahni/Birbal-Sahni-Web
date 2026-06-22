"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  badge?: "MENTOR" | "LEAD";
  bio: string;
  initials: string;
  status: string;
  hash: string;
}

const team: TeamMember[] = [
  {
    name: "Dr. A. Sharma",
    role: "Project Mentor",
    badge: "MENTOR",
    bio: "Senior faculty advisor steering research direction, control architectures, and electro-mechanical verification protocols.",
    initials: "AS",
    status: "LINK_ACTIVE",
    hash: "0x7F41B2D",
  },
  {
    name: "Pranab Singh",
    role: "Team Leader",
    badge: "LEAD",
    bio: "Systems lead orchestrating electrical-software integration, project timelines, and control interface calibration.",
    initials: "PS",
    status: "SYS_ON_LINE",
    hash: "0x9E20A1F",
  },
  {
    name: "Riya Verma",
    role: "Hardware Lead",
    bio: "Designing structural linkages, servo mounts, physical chassis tolerances, and custom PCB distribution boards.",
    initials: "RV",
    status: "LINK_STABLE",
    hash: "0x3C81F0E",
  },
  {
    name: "Aarav Mehta",
    role: "Software Lead",
    bio: "Developing core kinematics solvers, closed-loop telemetry stacks, and high-frequency communication pipelines.",
    initials: "AM",
    status: "LINK_STABLE",
    hash: "0x8B12C4D",
  },
  {
    name: "Neha Kapoor",
    role: "Controls Engineer",
    bio: "Implementing haptic force reflections, filtering sensor noise, and fine-tuning control feedback coefficients.",
    initials: "NK",
    status: "CALIBRATING",
    hash: "0x5A90D7C",
  },
  {
    name: "Vikram Joshi",
    role: "CAD & Design",
    bio: "Modeling assembly linkages, joints, structural loads, and verifying geometry ranges of motion in CAD simulation.",
    initials: "VJ",
    status: "LINK_STABLE",
    hash: "0x2D71B8B",
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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

      
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
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
      id="team"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl pl-6 sm:pl-10 md:pl-16">
        {}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-accent/60">
            [ PERSONNEL ROSTER ]
          </span>
        </div>

        {}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-6xl font-extralight tracking-tighter leading-none mb-20"
        >
          <span className="text-white">The </span>
          <span className="text-accent italic font-light">Operators</span>
        </h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="pointer-events-auto glass-card tech-border rounded-sm p-6 relative overflow-hidden group border-purple-500/5 min-h-[240px] flex flex-col justify-between"
            >
              {/* Animated hover scanline */}
              <div className="scan-bar" />

              <div>
                {/* Header inside card */}
                <div className="flex justify-between items-start mb-6">
                  {/* Avatar / Initials */}
                  <div className="w-10 h-10 rounded-sm bg-[#1a1528] border border-purple-500/10 flex items-center justify-center text-xs font-mono tracking-wider text-accent font-light">
                    {member.initials}
                  </div>

                  {}
                  {member.badge && (
                    <span
                      className={`badge ${
                        member.badge === "MENTOR" ? "badge-mentor" : "badge-lead"
                      }`}
                    >
                      {member.badge}
                    </span>
                  )}
                </div>

                {}
                <h3 className="text-lg font-light text-white mb-0.5 tracking-wide">
                  {member.name}
                </h3>

                <p className="text-xs font-mono tracking-widest uppercase text-accent/50 mb-4">
                  {member.role}
                </p>

                <p className="text-sm sm:text-base text-[#eee9ff]/60 leading-relaxed font-light mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Card Footer Technical Status Details */}
              <div className="flex justify-between items-center border-t border-purple-500/10 pt-4 font-mono text-[10px] sm:text-xs tracking-wider text-accent/40 group-hover:text-accent/70 transition-colors duration-500">
                <span>STATUS: {member.status}</span>
                <span>ID: {member.hash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
