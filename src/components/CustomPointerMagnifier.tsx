"use client";

import { useEffect, useRef } from "react";

interface StarDust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  glyph: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  isPaleBlue: boolean;
}

const STARRY_GLYPHS = ["·", ".", "·", "+", "✦"] as const;

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

    const particles: StarDust[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Broadcast mouse coordinates to window for ASCII Canvas interactive ripple
      window.__portfolioCursor = {
        x: mouseX,
        y: mouseY,
        active: true,
      };

      const dx = mouseX - (prevMouseX === -500 ? mouseX : prevMouseX);
      const dy = mouseY - (prevMouseY === -500 ? mouseY : prevMouseY);
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        // Emit sparse, subtle micro-star dust (1-2 specks per move, delicate and non-intrusive)
        const count = Math.min(2, Math.max(1, Math.floor(dist / 14)));

        for (let i = 0; i < count; i++) {
          const frac = (i + 1) / (count + 1);
          const spawnX = prevMouseX + dx * frac + (Math.random() - 0.5) * 4;
          const spawnY = prevMouseY + dy * frac + (Math.random() - 0.5) * 4;

          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8 + 1.5;
          const glyph =
            STARRY_GLYPHS[Math.floor(Math.random() * STARRY_GLYPHS.length)];

          particles.push({
            x: spawnX,
            y: spawnY,
            vx: -dx * 0.06 + Math.cos(angle) * speed,
            vy: -dy * 0.06 + Math.sin(angle) * speed,
            glyph,
            size: glyph === "✦" ? 8 : glyph === "+" ? 7.5 : 6.5,
            alpha: 0.52 + Math.random() * 0.22, // subtle, not over-bright
            life: 0,
            maxLife: 0.32 + Math.random() * 0.18, // short, crisp lifespan
            isPaleBlue: Math.random() < 0.25,
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

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Render subtle starry micro-dust specks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dtSec;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx * dtSec;
        p.y += p.vy * dtSec;
        p.vx *= 0.88;
        p.vy *= 0.88;

        const lifeFrac = p.life / p.maxLife;
        const currentAlpha = p.alpha * Math.max(0, 1 - lifeFrac);

        if (currentAlpha < 0.02) continue;

        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.isPaleBlue ? "#BAE6FD" : "#F1F5F9";
        ctx.font = `500 ${p.size}px "JetBrains Mono", monospace`;
        ctx.fillText(p.glyph, p.x, p.y);
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
