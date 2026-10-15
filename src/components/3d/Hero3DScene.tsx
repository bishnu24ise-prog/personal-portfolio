"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    // Detect mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsLowPower(true);
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b10, 0.03);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 11, 24);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      container.appendChild(renderer.domElement);
    } catch {
      setIsLowPower(true);
      return;
    }

    // Main 3D World Pivot Group for Parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Procedural 3D Terrain Mesh (echoing TopoForge)
    const segments = isMobile ? 32 : 56;
    const planeGeo = new THREE.PlaneGeometry(38, 38, segments, segments);
    planeGeo.rotateX(-Math.PI / 2);

    const posAttr = planeGeo.attributes.position;
    const initialY = new Float32Array(posAttr.count);

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const distFromCenter = Math.sqrt(x * x + z * z);
      const elevation =
        Math.sin(x * 0.45) * Math.cos(z * 0.45) * 1.6 +
        Math.sin(distFromCenter * 0.3) * 0.9;
      posAttr.setY(i, elevation);
      initialY[i] = elevation;
    }
    planeGeo.computeVertexNormals();

    const terrainMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const terrainMesh = new THREE.Mesh(planeGeo, terrainMaterial);
    terrainMesh.position.y = -3;
    worldGroup.add(terrainMesh);

    // Glowing Node Points at vertices
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", posAttr);
    const pointsMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.14,
      transparent: true,
      opacity: 0.65,
    });
    const terrainPoints = new THREE.Points(pointsGeo, pointsMat);
    terrainPoints.position.y = -3;
    worldGroup.add(terrainPoints);

    // 2. Procedural Codebase City Blocks (echoing DevMap)
    const cityGroup = new THREE.Group();
    cityGroup.position.set(0, -2.5, 0);

    const boxGeo = new THREE.BoxGeometry(0.85, 1, 0.85);
    const buildingMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const buildingMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.48,
    });

    const buildingCount = isMobile ? 14 : 28;
    for (let i = 0; i < buildingCount; i++) {
      const mat = i % 2 === 0 ? buildingMat1 : buildingMat2;
      const building = new THREE.Mesh(boxGeo, mat);
      const angle = (i / buildingCount) * Math.PI * 2;
      const radius = 4 + (i % 6) * 1.7;
      const height = 1 + (i % 7) * 0.75;

      building.scale.set(1, height, 1);
      building.position.set(
        Math.cos(angle) * radius,
        height / 2,
        Math.sin(angle) * radius
      );
      cityGroup.add(building);
    }
    worldGroup.add(cityGroup);

    // 3. Floating 3D Cyber Particles (Constellation Field)
    const particleCount = isMobile ? 40 : 100;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 1] = Math.random() * 20 - 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      particleSpeeds[i] = 0.02 + Math.random() * 0.04;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.16,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const starParticles = new THREE.Points(starGeo, starMat);
    scene.add(starParticles);

    // 4. Futuristic 3D Orbit Ring
    const ringGeo = new THREE.TorusGeometry(14, 0.05, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.position.y = 1;
    worldGroup.add(orbitRing);

    // Mouse Tracking with smooth spring damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.6;
      targetY = y * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 60 FPS 3D Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation towards mouse
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      camera.position.x = 24 * Math.sin(mouseX * 0.7);
      camera.position.z = 24 * Math.cos(mouseX * 0.7);
      camera.position.y = 11 + mouseY * 7;
      camera.lookAt(0, 0, 0);

      // Subtle dynamic 3D world tilt responding to mouse
      worldGroup.rotation.z = -mouseX * 0.15;
      worldGroup.rotation.x = mouseY * 0.15;

      if (!prefersReducedMotion) {
        // Continuous 3D rotation
        terrainMesh.rotation.y = elapsedTime * 0.045;
        terrainPoints.rotation.y = elapsedTime * 0.045;
        cityGroup.rotation.y = -elapsedTime * 0.035;
        orbitRing.rotation.z = elapsedTime * 0.05;

        // Dynamic 3D undulating terrain vertex waves
        const positions = planeGeo.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const z = positions.getZ(i);
          const base = initialY[i];
          const dynamicWave =
            Math.sin(x * 0.4 + elapsedTime * 0.9) *
            Math.cos(z * 0.4 + elapsedTime * 0.9) *
            0.45;
          positions.setY(i, base + dynamicWave);
        }
        positions.needsUpdate = true;

        // Float particles upward in 3D space
        const starPos = starGeo.attributes.position;
        for (let i = 0; i < particleCount; i++) {
          let y = starPos.getY(i) + particleSpeeds[i];
          if (y > 15) {
            y = -5;
          }
          starPos.setY(i, y);
        }
        starPos.needsUpdate = true;
        starParticles.rotation.y = elapsedTime * 0.02;
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }

      planeGeo.dispose();
      boxGeo.dispose();
      ringGeo.dispose();
      starGeo.dispose();
      terrainMaterial.dispose();
      pointsMat.dispose();
      buildingMat1.dispose();
      buildingMat2.dispose();
      starMat.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {isLowPower && (
        <div className="absolute inset-0 bg-cyber-grid opacity-25" />
      )}
    </div>
  );
}
