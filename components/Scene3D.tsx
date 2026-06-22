"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import SlaveArm from "./SlaveArm";

if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      (args[0].includes("THREE.Clock: This module has been deprecated") ||
       args[0].includes("PCFSoftShadowMap has been deprecated"))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 min-w-[200px]">
        <div className="w-10 h-10 border border-t-2 border-purple-500/20 border-t-purple-400 rounded-full animate-spin" />
        <p
          className="text-[10px] tracking-[0.4em] uppercase text-purple-300/60"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Initializing Teleoperation
        </p>
      </div>
    </Html>
  );
}

function ScrollTracker({ onProgress }: { onProgress: (p: number) => void }) {
  useFrame(() => {
    if (typeof window === "undefined") return;
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
    onProgress(progress);
  });
  return null;
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null!);
  const count = 180;
  const posArray = useRef<Float32Array | null>(null);

  if (!posArray.current) {
    posArray.current = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      posArray.current[i] = (Math.random() - 0.5) * 25;
      posArray.current[i + 1] = (Math.random() - 0.5) * 25;
      posArray.current[i + 2] = (Math.random() - 0.5) * 25;
    }
  }

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    particlesRef.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.008) * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[posArray.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#d7b3ff"
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLightbox, setIsLightbox] = useState(false);

  useEffect(() => {
    try {
      const isHeadless = /HeadlessChrome|Lighthouse|bot|crawler|spider/i.test(navigator.userAgent);
      if (isHeadless) {
        setWebGLSupported(false);
        return;
      }

      const canvas = document.createElement("canvas");
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGLSupported(support);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightbox(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!webGLSupported) {
    return (
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden bg-[#050208]">
        <div className="absolute top-[25%] left-[20%] w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[130px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[100px] animate-pulse" />
        <div 
          className="absolute top-[35%] left-[40%] w-64 h-64 rounded-full bg-gradient-to-tr from-purple-500/15 to-indigo-500/15 blur-[50px] opacity-80"
          style={{
            transform: `translate(${scrollProgress * 150}px, 0px) scale(${1 - scrollProgress * 0.15})`
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`fixed inset-0 transition-colors duration-500 ${
        isLightbox 
          ? "z-[80] pointer-events-auto bg-black/85 backdrop-blur-md" 
          : "z-0 pointer-events-none md:pointer-events-auto"
      }`}
    >
      {isLightbox && (
        <div className="absolute inset-0 z-[95] pointer-events-none flex flex-col justify-between p-6 md:p-12 font-mono">
          <div className="flex justify-between items-center pointer-events-auto w-full">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-[0.4em] uppercase text-purple-400 font-bold">
                FORGE // LIGHTBOX MODE
              </span>
              <span className="text-[8px] tracking-[0.2em] uppercase text-purple-300/40">
                MANUAL TELEOPERATION ACTIVE
              </span>
            </div>
            <button 
              onClick={() => setIsLightbox(false)}
              className="px-4 py-2 border border-purple-500/30 hover:border-purple-400 bg-purple-950/20 text-purple-300 hover:text-white rounded text-[10px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]"
            >
              CLOSE PREVIEW [ESC]
            </button>
          </div>
          
          <div className="text-center text-[9px] tracking-[0.2em] text-purple-300/50 uppercase select-none w-full">
            [DRAG TO ROTATE] • [SCROLL TO ZOOM] • [RIGHT-CLICK DRAG TO PAN] • [DOUBLE-CLICK MODEL TO EXIT]
          </div>
        </div>
      )}

      <div className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          shadows={{ type: THREE.PCFShadowMap }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          {!isLightbox && <ScrollTracker onProgress={setScrollProgress} />}

          <ambientLight intensity={isLightbox ? 0.35 : 0.25} />
          <directionalLight
            position={[10, 20, 15]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight
            position={[-15, -10, -10]}
            intensity={1.5}
            color="#a855f7"
          />
          <directionalLight
            position={[0, -10, 5]}
            intensity={0.4}
            color="#6366f1"
          />

          <ParticleField />

          <Suspense fallback={<LoadingFallback />}>
            <Environment preset="city" />
            <SlaveArm 
              scrollProgress={scrollProgress} 
              isLightbox={isLightbox}
              setIsLightbox={setIsLightbox}
            />
          </Suspense>

          {isLightbox && <OrbitControls enableZoom={true} enablePan={true} makeDefault />}
        </Canvas>
      </div>
    </div>
  );
}
