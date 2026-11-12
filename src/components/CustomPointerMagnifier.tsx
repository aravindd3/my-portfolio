"use client";

import { useEffect, useRef } from "react";

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  glyph: "." | "·" | "+" | "✦";
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  isBlue: boolean;
}

export function CustomPointerMagnifier() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const syncSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    syncSize();
    window.addEventListener("resize", syncSize, { passive: true });

    let mouseX = -200;
    let mouseY = -200;
    let prevMouseX = -200;
    let prevMouseY = -200;
    let reticleX = -200;
    let reticleY = -200;
    let isHoveringInteractive = false;
    let isMouseOnScreen = false;

    const particles: DustParticle[] = [];
    const GLYPHS = [".", "·", "+", "✦"] as const;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnScreen = true;

      // Broadcast mouse coordinates to window for ASCII Canvas interactive ripple
      window.__portfolioCursor = {
        x: mouseX,
        y: mouseY,
        active: true,
      };

      const target = e.target as HTMLElement | null;
      if (target) {
        isHoveringInteractive = Boolean(
          target.closest("a, button, [role='button'], input, textarea"),
        );
      }

      // Emit starry white cosmic dust trail based on cursor velocity
      const dx = mouseX - (prevMouseX === -200 ? mouseX : prevMouseX);
      const dy = mouseY - (prevMouseY === -200 ? mouseY : prevMouseY);
      const dist = Math.hypot(dx, dy);

      if (dist > 1.5) {
        const emitCount = Math.min(4, Math.max(1, Math.floor(dist / 9)));
        for (let i = 0; i < emitCount; i++) {
          const spreadAngle = Math.random() * Math.PI * 2;
          const spreadSpeed = Math.random() * 18 + 4;
          const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          const isBlue = Math.random() < 0.28; // mostly pure white starry dust with rare subtle cyan flecks

          particles.push({
            x: mouseX + (Math.random() - 0.5) * 6,
            y: mouseY + (Math.random() - 0.5) * 6,
            vx: -dx * 0.12 + Math.cos(spreadAngle) * spreadSpeed,
            vy: -dy * 0.12 + Math.sin(spreadAngle) * spreadSpeed - 3,
            glyph,
            size: glyph === "✦" ? 10.5 : glyph === "+" ? 9 : 7.5,
            alpha: 0.85 + Math.random() * 0.15,
            life: 0,
            maxLife: 0.45 + Math.random() * 0.35,
            isBlue,
          });
        }
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;
    };

    const onMouseLeave = () => {
      isMouseOnScreen = false;
      window.__portfolioCursor = { x: -500, y: -500, active: false };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    let rafId = 0;
    let prevMs = performance.now();

    const render = (nowMs: number) => {
      const dtSec = Math.min(0.06, Math.max(0.001, (nowMs - prevMs) / 1000));
      prevMs = nowMs;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Starry White Dust Particle Trail
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dtSec;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx * dtSec;
        p.y += p.vy * dtSec;
        p.vx *= 0.94;
        p.vy *= 0.94;

        const lifeFrac = p.life / p.maxLife;
        const currentAlpha = (1 - lifeFrac) * p.alpha;

        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.isBlue ? "#7DD3FC" : "#FFFFFF";
        ctx.font = `600 ${p.size}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.glyph, p.x, p.y);
      }

      // 2. Draw Sleek Focus Reticle Ring
      if (isMouseOnScreen && mouseX > 0 && mouseY > 0) {
        const ease = 0.22;
        reticleX += (mouseX - reticleX) * ease;
        reticleY += (mouseY - reticleY) * ease;

        const ringRadius = isHoveringInteractive ? 20 : 13;
        const ringAlpha = isHoveringInteractive ? 0.75 : 0.45;

        // Soft halo
        const halo = ctx.createRadialGradient(
          reticleX,
          reticleY,
          0,
          reticleX,
          reticleY,
          ringRadius * 1.5,
        );
        halo.addColorStop(0, "rgba(255, 255, 255, 0.08)");
        halo.addColorStop(0.8, "rgba(255, 255, 255, 0.02)");
        halo.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.globalAlpha = 1;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(reticleX, reticleY, ringRadius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Thin reticle circle
        ctx.globalAlpha = ringAlpha;
        ctx.strokeStyle = isHoveringInteractive ? "#38BDF8" : "rgba(255, 255, 255, 0.65)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(reticleX, reticleY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Center micro-dot
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Precision reticle ticks when hovering buttons/links
        if (isHoveringInteractive) {
          ctx.strokeStyle = "#38BDF8";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          // Top
          ctx.moveTo(reticleX, reticleY - ringRadius - 3);
          ctx.lineTo(reticleX, reticleY - ringRadius + 1);
          // Bottom
          ctx.moveTo(reticleX, reticleY + ringRadius - 1);
          ctx.lineTo(reticleX, reticleY + ringRadius + 3);
          // Left
          ctx.moveTo(reticleX - ringRadius - 3, reticleY);
          ctx.lineTo(reticleX - ringRadius + 1, reticleY);
          // Right
          ctx.moveTo(reticleX + ringRadius - 1, reticleY);
          ctx.lineTo(reticleX + ringRadius + 3, reticleY);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", syncSize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      delete window.__portfolioCursor;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 block font-mono"
    />
  );
}

declare global {
  interface Window {
    __portfolioCursor?: {
      x: number;
      y: number;
      active: boolean;
    };
  }
}
