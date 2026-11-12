"use client";

import { useEffect, useRef } from "react";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";

interface NavbarAsciiNameProps {
  name: string;
}

interface TargetDot {
  readonly tx: number;
  readonly ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  readonly u: number;
  readonly v: number;
  readonly intensity: number;
  readonly seed: number;
}

interface FlowingParticle {
  u: number;
  speed: number;
  dir: 1 | -1;
  amp: number;
  freq: number;
  phase: number;
  glyph: "." | "·" | ":";
  targetIdx: number;
}

const LOGICAL_W = 148;
const LOGICAL_H = 30;
const GRID_STEP = 1.85;

export function NavbarAsciiName({ name }: NavbarAsciiNameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: TargetDot[] = [];
    let streams: FlowingParticle[] = [];
    let rafId = 0;
    let cancelled = false;
    const startMs = performance.now();
    let prevMs = startMs;

    const syncSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(LOGICAL_W * dpr);
      canvas.height = Math.round(LOGICAL_H * dpr);
    };

    const sampleNameGlyphs = () => {
      const sampleScale = 2;
      const offscreen = document.createElement("canvas");
      offscreen.width = LOGICAL_W * sampleScale;
      offscreen.height = LOGICAL_H * sampleScale;
      const octx = offscreen.getContext("2d");
      if (!octx) return;

      const computedFont = window.getComputedStyle(canvas).fontFamily;
      const brandFont =
        computedFont && computedFont.trim().length > 0
          ? computedFont
          : '"Outfit", sans-serif';

      octx.clearRect(0, 0, offscreen.width, offscreen.height);
      octx.fillStyle = "#FFFFFF";
      octx.font = `700 ${18 * sampleScale}px ${brandFont}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(name, offscreen.width * 0.5, offscreen.height * 0.53);

      const img = octx.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height,
      ).data;
      const sampled: TargetDot[] = [];

      for (let y = 1.5; y < LOGICAL_H - 1.5; y += GRID_STEP) {
        for (let x = 2; x < LOGICAL_W - 2; x += GRID_STEP) {
          const px = Math.min(
            offscreen.width - 1,
            Math.round(x * sampleScale),
          );
          const py = Math.min(
            offscreen.height - 1,
            Math.round(y * sampleScale),
          );
          const alpha = img[(py * offscreen.width + px) * 4 + 3] / 255;
          if (alpha > 0.25) {
            const seed = ((Math.round(x * 13) + Math.round(y * 31)) % 97) / 97;
            const startX = seed > 0.5 ? x - 22 - seed * 18 : x + 22 + seed * 18;
            const startY = LOGICAL_H * 0.5 + (seed - 0.5) * 18;

            sampled.push({
              tx: x,
              ty: y,
              x: startX,
              y: startY,
              vx: 0,
              vy: 0,
              u: x / LOGICAL_W,
              v: y / LOGICAL_H,
              intensity: Math.min(1, alpha * 1.15),
              seed,
            });
          }
        }
      }

      dots = sampled;

      const streamCount = 26;
      const nextStreams: FlowingParticle[] = [];
      for (let i = 0; i < streamCount; i++) {
        const dir = i % 2 === 0 ? 1 : -1;
        nextStreams.push({
          u: i / streamCount,
          speed: 0.16 + (i % 5) * 0.035,
          dir,
          amp: 3.5 + (i % 4) * 1.8,
          freq: 2.1 + (i % 3) * 0.45,
          phase: (i * 0.9) % (Math.PI * 2),
          glyph: i % 3 === 0 ? "·" : i % 3 === 1 ? "." : ":",
          targetIdx:
            sampled.length > 0 ? Math.floor((i * 17) % sampled.length) : 0,
        });
      }
      streams = nextStreams;
    };

    const drawFrame = (dtSec: number, elapsedSec: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

      const t = elapsedSec;
      const cyclePos = ((t * 0.19) % 1.45) - 0.22;

      // 1. Draw continuous free-flowing pure-white micro-ASCII dots streaming into letterforms
      if (dots.length > 0) {
        ctx.font = '600 8px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (const p of streams) {
          p.u += p.dir * p.speed * dtSec;
          if (p.u > 1.05) {
            p.u = -0.05;
            p.targetIdx = Math.floor(Math.random() * dots.length);
          } else if (p.u < -0.05) {
            p.u = 1.05;
            p.targetIdx = Math.floor(Math.random() * dots.length);
          }

          const target = dots[p.targetIdx % dots.length];
          const progressToCenter = Math.sin(
            Math.max(0, Math.min(1, p.u)) * Math.PI,
          );

          const waveX = p.u * LOGICAL_W;
          const waveY =
            LOGICAL_H * 0.5 +
            Math.sin(p.u * Math.PI * p.freq - t * 2.2 * p.dir + p.phase) * p.amp;

          const pull = Math.pow(progressToCenter, 1.8) * 0.72;
          const px = waveX * (1 - pull) + target.tx * pull;
          const py = waveY * (1 - pull) + target.ty * pull;

          // Pure white flowing dots with variable transparency
          ctx.globalAlpha = 0.20 + progressToCenter * 0.50;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(p.glyph, px, py);
        }
      }

      // 2. Spring physics + smooth coalescence of the letter dots in pure white
      for (const dot of dots) {
        const distFromSweep = Math.abs(dot.u - cyclePos);
        const sweepLift =
          distFromSweep < 0.14
            ? Math.cos((distFromSweep / 0.14) * Math.PI * 0.5)
            : 0;

        const driftX =
          sweepLift *
          (dot.seed > 0.5 ? -2.8 : 2.8) *
          Math.sin(t * 4 + dot.seed * 6);
        const driftY =
          sweepLift * (dot.seed - 0.5) * 6.5 +
          Math.sin(t * 1.8 + dot.u * 5.0 + dot.seed * 3.0) * 0.22;

        const goalX = dot.tx + driftX;
        const goalY = dot.ty + driftY;

        const stiffness = 65;
        const damping = 12.5;
        const ax = (goalX - dot.x) * stiffness - dot.vx * damping;
        const ay = (goalY - dot.y) * stiffness - dot.vy * damping;

        dot.vx += ax * dtSec;
        dot.vy += ay * dtSec;
        dot.x += dot.vx * dtSec;
        dot.y += dot.vy * dtSec;

        // Clean monochrome white dot shading
        const shimmer = 0.88 + 0.12 * Math.sin(t * 3.2 + dot.seed * Math.PI * 2);
        const radius = dot.intensity > 0.8 ? 0.82 : 0.74;
        const alpha = Math.min(1, dot.intensity * 0.95 * shimmer);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    syncSize();
    sampleNameGlyphs();
    drawFrame(0.016, 0);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (cancelled) return;
        sampleNameGlyphs();
        drawFrame(0.016, (performance.now() - startMs) / 1000);
      });
    }

    const tick = (nowMs: number) => {
      const dtSec = Math.min(0.05, Math.max(0.001, (nowMs - prevMs) / 1000));
      prevMs = nowMs;
      drawFrame(dtSec, (nowMs - startMs) / 1000);
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, [name]);

  return (
    <HStack as="span" vAlign="center" className="relative">
      <Text className="sr-only">{name}</Text>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-[30px] w-[148px] font-brand select-none"
      />
    </HStack>
  );
}
