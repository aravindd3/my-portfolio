"use client";

import { useEffect, useRef } from "react";
import { VStack } from "@astryxdesign/core/VStack";

interface CosmicMicroGlyph {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
  glyph: string;
  size: number;
  color: string;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface ShootingStreak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  length: number;
  isBlue: boolean;
}

const MICRO_GLYPHS = [".", "·", ":", ",", "'", "`"] as const;
const BLUE_TONES = ["#38BDF8", "#7DD3FC", "#BAE6FD"] as const;
const YELLOW_TONES = ["#E5A93C", "#FDE68A", "#FEF3C7"] as const;

export function BackgroundAsciiField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: CosmicMicroGlyph[] = [];
    let streaks: ShootingStreak[] = [];
    let nextStreakIn = 3.2;
    let rafId = 0;
    let prevMs = performance.now();

    const buildParticles = (w: number, h: number) => {
      const targetCount = Math.max(
        55,
        Math.min(150, Math.floor((w * h) / 14500)),
      );
      const next: CosmicMicroGlyph[] = [];

      for (let i = 0; i < targetCount; i++) {
        const isBlue = Math.random() < 0.54;
        const palette = isBlue ? BLUE_TONES : YELLOW_TONES;
        const depth = 0.25 + Math.random() * 0.75;
        const angle = -Math.PI * 0.68 + (Math.random() - 0.5) * 0.9;
        const speed = (3.5 + Math.random() * 7.5) * depth;

        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          depth,
          glyph:
            MICRO_GLYPHS[Math.floor(Math.random() * MICRO_GLYPHS.length)],
          size: 7.5 + depth * 2.2,
          color: palette[Math.floor(Math.random() * palette.length)],
          baseAlpha: 0.14 + depth * 0.34,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.9 + Math.random() * 1.9,
        });
      }

      particles = next;
    };

    const syncSize = () => {
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;
      if (nextW <= 0 || nextH <= 0) return;

      const sizeChanged =
        Math.abs(nextW - width) > 80 || Math.abs(nextH - height) > 80;
      width = nextW;
      height = nextH;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));

      if (particles.length === 0 || sizeChanged) {
        buildParticles(width, height);
      }
    };

    const spawnShootingStreak = () => {
      if (width <= 0 || height <= 0) return;
      const fromLeft = Math.random() < 0.55;
      const startX = fromLeft
        ? width * (0.08 + Math.random() * 0.55)
        : width * (0.35 + Math.random() * 0.55);
      const startY = height * (0.04 + Math.random() * 0.42);

      const angle = fromLeft
        ? 0.34 + Math.random() * 0.32
        : Math.PI - (0.34 + Math.random() * 0.32);
      const speed = 360 + Math.random() * 240;

      streaks.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        age: 0,
        life: 0.85 + Math.random() * 0.45,
        length: 68 + Math.random() * 52,
        isBlue: Math.random() < 0.52,
      });
    };

    const resolvedFont = () => {
      const computed = window.getComputedStyle(canvas).fontFamily;
      return computed && computed.trim().length > 0
        ? computed
        : '"JetBrains Mono", ui-monospace, monospace';
    };

    let monoFont = resolvedFont();

    const draw = (dtSec: number, nowSec: number) => {
      if (width <= 0 || height <= 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const scrollOffset = window.scrollY;

      // 1. Drifting micro-ASCII cosmic particles (no asterisks or hashes)
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx * dtSec;
          p.y += p.vy * dtSec;

          if (p.x < -16) p.x += width + 32;
          if (p.x > width + 16) p.x -= width + 32;
          if (p.y < -16) p.y += height + 32;
          if (p.y > height + 16) p.y -= height + 32;
        }

        const parallaxY =
          ((p.y - scrollOffset * p.depth * 0.045) % height + height) % height;

        const twinkle = prefersReducedMotion
          ? 0.85
          : 0.62 + 0.38 * Math.sin(nowSec * p.twinkleSpeed + p.twinklePhase);

        ctx.globalAlpha = p.baseAlpha * twinkle;
        ctx.fillStyle = p.color;
        ctx.font = `500 ${p.size.toFixed(1)}px ${monoFont}`;
        ctx.fillText(p.glyph, p.x, parallaxY);
      }

      // 2. Occasional shooting star micro-streaks
      if (!prefersReducedMotion) {
        nextStreakIn -= dtSec;
        if (nextStreakIn <= 0) {
          spawnShootingStreak();
          nextStreakIn = 4.6 + Math.random() * 4.8;
        }

        const alive: ShootingStreak[] = [];
        for (const s of streaks) {
          s.age += dtSec;
          if (s.age >= s.life) continue;

          s.x += s.vx * dtSec;
          s.y += s.vy * dtSec;

          const progress = s.age / s.life;
          const envelope = Math.sin(progress * Math.PI);
          const speedMag = Math.max(1, Math.hypot(s.vx, s.vy));
          const ux = s.vx / speedMag;
          const uy = s.vy / speedMag;

          // Tapered trail made of tiny dots
          const trailDots = 11;
          for (let i = 0; i < trailDots; i++) {
            const frac = i / trailDots;
            const tx = s.x - ux * s.length * frac;
            const ty = s.y - uy * s.length * frac;
            const dotAlpha = (1 - frac) * (1 - frac) * envelope * 0.72;
            if (dotAlpha < 0.02) continue;

            ctx.globalAlpha = dotAlpha;
            ctx.fillStyle = s.isBlue
              ? i === 0
                ? "#E0F2FE"
                : "#38BDF8"
              : i === 0
                ? "#FEF3C7"
                : "#E5A93C";
            ctx.font = `600 ${(9.5 - frac * 2.5).toFixed(1)}px ${monoFont}`;
            ctx.fillText(i === 0 ? "·" : ".", tx, ty);
          }

          alive.push(s);
        }
        streaks = alive;
      }

      ctx.globalAlpha = 1;
    };

    syncSize();
    draw(0, 0);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        monoFont = resolvedFont();
      });
    }

    const onResize = () => {
      syncSize();
      if (prefersReducedMotion) draw(0, 0);
    };
    window.addEventListener("resize", onResize, { passive: true });

    if (!prefersReducedMotion) {
      const tick = (nowMs: number) => {
        const dtSec = Math.min(0.08, Math.max(0.001, (nowMs - prevMs) / 1000));
        prevMs = nowMs;
        draw(dtSec, nowMs / 1000);
        rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <VStack
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full font-mono" />
    </VStack>
  );
}
