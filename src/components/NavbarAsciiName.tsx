"use client";

import { useEffect, useRef } from "react";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";

interface NavbarAsciiNameProps {
  name: string;
}

interface GlyphDot {
  readonly x: number;
  readonly y: number;
  readonly u: number;
  readonly v: number;
  readonly intensity: number;
  readonly seed: number;
}

const LOGICAL_W = 132;
const LOGICAL_H = 28;
const GRID_STEP = 1.9;

export function NavbarAsciiName({ name }: NavbarAsciiNameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: GlyphDot[] = [];
    let rafId = 0;
    let cancelled = false;
    const startMs = performance.now();

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
      octx.font = `700 ${17.5 * sampleScale}px ${brandFont}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(name, offscreen.width * 0.5, offscreen.height * 0.53);

      const img = octx.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height,
      ).data;
      const sampled: GlyphDot[] = [];

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
          if (alpha > 0.24) {
            sampled.push({
              x,
              y,
              u: x / LOGICAL_W,
              v: y / LOGICAL_H,
              intensity: Math.min(1, alpha * 1.15),
              seed: ((Math.round(x * 13) + Math.round(y * 31)) % 97) / 97,
            });
          }
        }
      }

      dots = sampled;
    };

    const drawFrame = (elapsedSec: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

      const t = prefersReducedMotion ? 0 : elapsedSec;

      // Subtle ambient intertwining blue & yellow dot streams behind the letterforms
      const streamCount = 34;
      for (let i = 0; i < streamCount; i++) {
        const u = ((i / streamCount + t * 0.085) % 1 + 1) % 1;
        const x = 4 + u * (LOGICAL_W - 8);
        const phase = u * Math.PI * 2.4 - t * 2.0;

        const yBlue = LOGICAL_H * (0.5 + 0.31 * Math.sin(phase));
        const yYellow = LOGICAL_H * (0.5 + 0.31 * Math.sin(phase + Math.PI));

        const edgeFade = Math.sin(u * Math.PI);

        ctx.globalAlpha = 0.28 * edgeFade;
        ctx.fillStyle = "#38BDF8";
        ctx.beginPath();
        ctx.arc(x, yBlue, 0.72, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.28 * edgeFade;
        ctx.fillStyle = "#E5A93C";
        ctx.beginPath();
        ctx.arc(x, yYellow, 0.72, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render "Aravind V S" in crisp micro-dots illuminated by intertwining blue & yellow waves
      for (const dot of dots) {
        const phase = dot.u * Math.PI * 2.4 - t * 2.0;
        const waveBlueY = 0.5 + 0.33 * Math.sin(phase);
        const waveYellowY = 0.5 + 0.33 * Math.sin(phase + Math.PI);

        const distBlue = Math.abs(dot.v - waveBlueY);
        const distYellow = Math.abs(dot.v - waveYellowY);

        const blueWeight = Math.exp(-distBlue * distBlue * 11.5);
        const yellowWeight = Math.exp(-distYellow * distYellow * 11.5);

        const flicker = prefersReducedMotion
          ? 1
          : 0.9 + 0.1 * Math.sin(t * 3.4 + dot.seed * Math.PI * 2);

        let color = "#E2E8F0";
        let radius = 0.72;
        let alpha = dot.intensity * 0.88 * flicker;

        if (blueWeight > 0.52 && yellowWeight > 0.52) {
          // Crossing intersection shimmer
          color = "#FEF3C7";
          radius = 0.88;
          alpha = Math.min(1, dot.intensity * 0.98 * flicker);
        } else if (blueWeight > yellowWeight + 0.08) {
          color = blueWeight > 0.65 ? "#BAE6FD" : "#38BDF8";
          radius = blueWeight > 0.65 ? 0.85 : 0.78;
          alpha = Math.min(1, dot.intensity * (0.88 + blueWeight * 0.12) * flicker);
        } else if (yellowWeight > blueWeight + 0.08) {
          color = yellowWeight > 0.65 ? "#FDE68A" : "#E5A93C";
          radius = yellowWeight > 0.65 ? 0.85 : 0.78;
          alpha = Math.min(
            1,
            dot.intensity * (0.88 + yellowWeight * 0.12) * flicker,
          );
        } else {
          color = dot.seed > 0.5 ? "#7DD3FC" : "#FDE68A";
          alpha = dot.intensity * 0.76 * flicker;
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    syncSize();
    sampleNameGlyphs();
    drawFrame(0);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (cancelled) return;
        sampleNameGlyphs();
        drawFrame((performance.now() - startMs) / 1000);
      });
    }

    if (!prefersReducedMotion) {
      const tick = (nowMs: number) => {
        drawFrame((nowMs - startMs) / 1000);
        rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      cancelled = true;
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, [name]);

  return (
    <HStack as="span" vAlign="center" className="relative pr-0.5">
      <Text className="sr-only">{name}</Text>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-7 w-[132px] font-brand select-none"
      />
    </HStack>
  );
}
