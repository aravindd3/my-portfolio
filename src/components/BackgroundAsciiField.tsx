"use client";

import { useEffect, useRef } from "react";
import { VStack } from "@astryxdesign/core/VStack";

interface MattePoint {
  x: number;
  y: number;
  r: number;
  alpha: number;
  depth: number;
}

export function BackgroundAsciiField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let points: MattePoint[] = [];

    const buildPoints = (w: number, h: number) => {
      // Very sparse, muted, non-space matte specks for subtle dark theme texture
      const count = Math.max(50, Math.min(100, Math.floor((w * h) / 16000)));
      const next: MattePoint[] = [];

      for (let i = 0; i < count; i++) {
        const depth = 0.3 + Math.random() * 0.7;
        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.45 + Math.random() * 0.25, // 0.45px - 0.7px tiny micro-points
          alpha: (0.04 + Math.random() * 0.05) * depth, // Ultra-muted: 0.03 - 0.07 alpha
          depth,
        });
      }

      points = next;
    };

    const syncSize = () => {
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;
      if (nextW <= 0 || nextH <= 0) return;

      const sizeChanged =
        Math.abs(nextW - width) > 60 || Math.abs(nextH - height) > 60;
      width = nextW;
      height = nextH;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));

      if (points.length === 0 || sizeChanged) {
        buildPoints(width, height);
      }
      draw();
    };

    const draw = () => {
      if (width <= 0 || height <= 0) return;

      const scrollY = window.scrollY || 0;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Pure sleek, deep black canvas (#000000)
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Muted, non-shining matte micro-points (clean textured dark theme, no space effect)
      ctx.fillStyle = "#94A3B8";
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const py = ((p.y - scrollY * 0.02 * p.depth) % height + height) % height;
        const px = (p.x % width + width) % width;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    syncSize();

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf !== 0) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0;
        draw();
      });
    };

    const onResize = () => {
      syncSize();
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (scrollRaf !== 0) window.cancelAnimationFrame(scrollRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <VStack
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </VStack>
  );
}
