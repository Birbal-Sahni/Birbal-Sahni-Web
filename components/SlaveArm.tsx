"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface SlaveArmProps {
  scrollProgress: number;
  isLightbox: boolean;
  setIsLightbox: (open: boolean) => void;
}

export default function SlaveArm({ scrollProgress, isLightbox, setIsLightbox }: SlaveArmProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  const { scene } = useGLTF("/slave-arm.glb");

  const geometry = useMemo<THREE.BufferGeometry | null>(() => {
    let geom: THREE.BufferGeometry | null = null;
    scene.traverse((node) => {
      if (node.type === "Mesh" || (node as any).isMesh) {
        geom = (node as THREE.Mesh).geometry;
      }
    });
    return geom;
  }, [scene]);

  const { originalMaxDim } = useMemo(() => {
    if (!geometry) return { originalMaxDim: 1.0 };
    const geom = geometry as THREE.BufferGeometry;

    geom.computeVertexNormals();
    geom.computeBoundingBox();

    const center = new THREE.Vector3();
    geom.boundingBox!.getCenter(center);

    const size = new THREE.Vector3();
    geom.boundingBox!.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);

    geom.translate(-center.x, -center.y, -center.z);
    geom.computeBoundingBox();

    return { originalMaxDim: maxDim };
  }, [geometry]);

  const baseColor = useMemo(() => new THREE.Color("#bca5e6"), []);
  const hoverColor = useMemo(() => new THREE.Color("#f3e8ff"), []);
  const currentColor = useMemo(() => new THREE.Color("#bca5e6"), []);

  useEffect(() => {
    if (isLightbox) {
      camera.position.set(0, 0, 8);
      camera.lookAt(0, 0, 0);
    }
  }, [isLightbox, camera]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current || !geometry) return;

    const time = state.clock.getElapsedTime();
    const currentCamera = state.camera;
    const pointer = state.pointer;
    const { width, height } = state.viewport;

    const isMobile = width < 7.5;

    const targetColor = hovered && !isMobile ? hoverColor : baseColor;
    currentColor.lerp(targetColor, 0.08);
    materialRef.current.color.copy(currentColor);

    materialRef.current.roughness = isMobile ? 0.45 : 0.15;
    materialRef.current.envMapIntensity = isMobile ? 0.4 : 1.4;

    if (isLightbox) {
      const targetScale = (height * 0.60) / originalMaxDim;
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, 0.04);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.04);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0, 0.04);

      const idleSpin = time * 0.15;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, idleSpin, 0.04);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0.1, 0.04);
      return;
    }

    const baseScaleVal = isMobile
      ? (height * 0.45) / originalMaxDim
      : (height * 0.65) / originalMaxDim;

    const hoverBoost = hovered && !isMobile ? 1.05 : 1.0;
    const targetScale = baseScaleVal * hoverBoost;

    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);

    let camTargetX = 0;
    let camTargetY = 0;
    let camTargetZ = 8;

    let targetRotY = 0;
    let targetRotX = 0.1;
    let targetPosX = 0;
    let targetPosY = 0;
    let targetPosZ = 0;

    const idleSpin = time * 0.12;

    if (isMobile) {
      targetPosX = 0;
      targetPosY = Math.sin(time * 0.6) * 0.1 - 0.2;
      targetPosZ = -1.2;

      targetRotY = idleSpin;
      targetRotX = 0.1;

      camTargetX = 0;
      camTargetY = 0;
      camTargetZ = 8.5;
    } else {
      targetPosX = Math.min(width * 0.22, 2.6);

      if (scrollProgress < 0.33) {
        const phase = scrollProgress / 0.33;
        targetRotY = idleSpin + phase * 0.4;
        targetPosY = Math.sin(time * 0.8) * 0.15;
        
        camTargetX = -0.3;
        camTargetY = 0;
        camTargetZ = 8;
      } else if (scrollProgress < 0.66) {
        const phase = (scrollProgress - 0.33) / 0.33;
        targetRotY = idleSpin + 0.4 + phase * Math.PI;
        targetRotX = 0.2;
        targetPosY = Math.sin(time * 0.6) * 0.08;

        camTargetX = -0.5;
        camTargetY = 0.1;
        camTargetZ = 7.5;
      } else {
        const phase = (scrollProgress - 0.66) / 0.34;
        targetRotY = idleSpin + 0.4 + Math.PI + phase * 1.8;
        targetRotX = 0.2 + phase * 0.35;
        targetPosY = Math.sin(time * 0.5) * 0.06 - phase * 0.5;
        targetPosZ = phase * -1.0;

        camTargetX = -0.4;
        camTargetY = phase * 1.8;
        camTargetZ = 7.5 + phase * 3.0;
      }
    }

    const mouseStrength = isMobile ? 0 : 0.6;
    const parallaxX = pointer.x * mouseStrength;
    const parallaxY = pointer.y * mouseStrength;

    const camLerpSpeed = 0.04;
    currentCamera.position.x = THREE.MathUtils.lerp(currentCamera.position.x, camTargetX + parallaxX, camLerpSpeed);
    currentCamera.position.y = THREE.MathUtils.lerp(currentCamera.position.y, camTargetY + parallaxY, camLerpSpeed);
    currentCamera.position.z = THREE.MathUtils.lerp(currentCamera.position.z, camTargetZ, camLerpSpeed);

    const lookTarget = new THREE.Vector3(0, targetPosY * 0.4, 0);
    currentCamera.lookAt(lookTarget);

    const lerpSpeed = 0.04;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, lerpSpeed);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, lerpSpeed);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPosX, lerpSpeed);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetPosY, lerpSpeed * 2);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetPosZ, lerpSpeed);
  });

  if (!geometry) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerOver={(e) => {
        if (typeof window !== "undefined" && window.innerWidth < 768) return;
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        if (typeof window !== "undefined" && window.innerWidth < 768) return;
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsLightbox(!isLightbox);
      }}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        ref={materialRef}
        color="#bca5e6"
        metalness={0.95}
        roughness={0.15}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

useGLTF.preload("/slave-arm.glb");
