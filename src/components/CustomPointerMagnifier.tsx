"use client";

import { useEffect, useRef } from "react";

interface HollowKnightMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  glowRadius: number;
  alpha: number;
  life: number;
  maxLife: number;
  buoyancy: number;
  driftPhase: number;
  driftSpeed: number;
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
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    syncSize();
    window.addEventListener("resize", syncSize, { passive: true });

    let mouseX = -500;
    let mouseY = -500;
    let prevMouseX = -500;
    let prevMouseY = -500;
    let isHoveringInteractive = false;

    const particles: HollowKnightMote[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

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

      // Hollow Knight Soul/Dream Motes emission along cursor trajectory
      const dx = mouseX - (prevMouseX === -500 ? mouseX : prevMouseX);
      const dy = mouseY - (prevMouseY === -500 ? mouseY : prevMouseY);
      const dist = Math.hypot(dx, dy);

      if (dist > 1.2) {
        // Spawn small glowing spirit dots behind cursor
        const count = Math.min(
          isHoveringInteractive ? 6 : 4,
          Math.max(1, Math.floor(dist / 8)),
        );

        for (let i = 0; i < count; i++) {
          const frac = i / count;
          // Interpolate positions between previous and current mouse to eliminate gaps during fast motion
          const spawnX = prevMouseX + dx * frac + (Math.random() - 0.5) * 3;
          const spawnY = prevMouseY + dy * frac + (Math.random() - 0.5) * 3;

          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 12 + 2;
          const baseRadius = 0.8 + Math.random() * 1.5;

          particles.push({
            x: spawnX,
            y: spawnY,
            vx: -dx * 0.08 + Math.cos(angle) * speed,
            vy: -dy * 0.08 + Math.sin(angle) * speed - 6, // gentle upward spirit buoyancy
            radius: isHoveringInteractive ? baseRadius * 1.25 : baseRadius,
            glowRadius: baseRadius * (3.8 + Math.random() * 2.2),
            alpha: 0.85 + Math.random() * 0.15,
            life: 0,
            maxLife: 0.55 + Math.random() * 0.35,
            buoyancy: 8 + Math.random() * 14,
            driftPhase: Math.random() * Math.PI * 2,
            driftSpeed: 3.5 + Math.random() * 4.0,
          });
        }
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;
    };

    const onMouseLeave = () => {
      window.__portfolioCursor = { x: -500, y: -500, active: false };
      prevMouseX = -500;
      prevMouseY = -500;
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

      // Render Hollow Knight Ethereal Spirit Dust Trail
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dtSec;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Gentle spirit drift & buoyancy
        p.y -= p.buoyancy * dtSec;
        p.x += Math.sin(nowMs * 0.003 * p.driftSpeed + p.driftPhase) * 14 * dtSec;

        p.x += p.vx * dtSec;
        p.y += p.vy * dtSec;
        p.vx *= 0.92;
        p.vy *= 0.92;

        const progress = p.life / p.maxLife;
        const fade = Math.sin((1 - progress) * Math.PI * 0.5); // smooth non-linear decay
        const currentAlpha = p.alpha * fade;

        if (currentAlpha < 0.01) continue;

        // 1. Soft glowing outer spirit aura
        const halo = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.glowRadius,
        );
        halo.addColorStop(0, `rgba(255, 255, 255, ${(currentAlpha * 0.85).toFixed(3)})`);
        halo.addColorStop(0.35, `rgba(240, 248, 255, ${(currentAlpha * 0.45).toFixed(3)})`);
        halo.addColorStop(0.7, `rgba(224, 242, 254, ${(currentAlpha * 0.18).toFixed(3)})`);
        halo.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.globalAlpha = 1;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Crisp luminous pure white center dot
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
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
