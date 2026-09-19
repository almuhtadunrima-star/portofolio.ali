"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroSceneProps {
  accentColor: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ accentColor }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<string>(accentColor);

  useEffect(() => {
    colorRef.current = accentColor;
  }, [accentColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0018);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 180;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // Particle field geometry
    const particleCount = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Cylindrical / toroidal cloud distribution
      const radius = 50 + Math.random() * 140;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 160;

      positions[i3] = Math.cos(theta) * radius;
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(theta) * radius;

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      scales[i] = Math.random() * 2.2 + 0.8;
      velocities[i3] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Custom Canvas Texture for smooth circular particles
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.7)");
      gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.15)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 3.5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color("#ba7cde"),
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle geometric core wireframe
    const icosaGeometry = new THREE.IcosahedronGeometry(45, 2);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const coreMesh = new THREE.Mesh(icosaGeometry, icosaMaterial);
    scene.add(coreMesh);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Update particle color smoothly
      const currentColor = colorRef.current.startsWith("#")
        ? colorRef.current
        : `#${colorRef.current}`;
      material.color.lerp(new THREE.Color(currentColor), 0.05);

      // Camera tilt & subtle wobble
      camera.position.x = mouseX * 25;
      camera.position.y = mouseY * 25;
      camera.lookAt(0, 0, 0);

      // Rotate particle cloud & core
      particles.rotation.y = elapsedTime * 0.06;
      particles.rotation.x = Math.sin(elapsedTime * 0.04) * 0.15;

      coreMesh.rotation.x = elapsedTime * 0.03;
      coreMesh.rotation.y = elapsedTime * 0.05;

      // Dynamic wave distortion
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i += 3) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // Soft harmonic oscillations
        posArray[i3] = ox + Math.sin(elapsedTime * 0.8 + oy * 0.02) * 4;
        posArray[i3 + 1] = oy + Math.cos(elapsedTime * 0.7 + ox * 0.02) * 4;
        posArray[i3 + 2] = oz + Math.sin(elapsedTime * 0.9 + oz * 0.02) * 4;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      icosaGeometry.dispose();
      icosaMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
