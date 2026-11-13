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

interface ConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
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
const WHITE_TONES = ["#FFFFFF", "#F8FAFC", "#E2E8F0"] as const;
const YELLOW_TONES = ["#E5A93C", "#FDE68A", "#FEF3C7"] as const;

const CONSTELLATION_PALETTE = [
  "rgba(229, 169, 60, 0.45)", // Hardware Copper
  "rgba(148, 163, 184, 0.38)", // Slate
  "rgba(56, 189, 248, 0.35)", // Cool Bus Blue
];

const MAX_CONSTELLATION_DIST = 96;
const MOUSE_INTERACT_RADIUS = 140;

export function BackgroundAsciiField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: CosmicMicroGlyph[] = [];
    let constellationNodes: ConstellationNode[] = [];
    let streaks: ShootingStreak[] = [];
    let nextStreakIn = 3.0;
    let rafId = 0;
    let prevMs = performance.now();
    let isTabVisible = true;

    // Smooth cursor coordinates for subtle light & constellation interaction
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let currentMouseX = -9999;
    let currentMouseY = -9999;

    const buildField = (w: number, h: number) => {
      // 1. Balanced micro-ASCII dots (Blue, Yellow, White)
      const targetCount = Math.max(
        130,
        Math.min(260, Math.floor((w * h) / 6400)),
      );
      const nextParticles: CosmicMicroGlyph[] = [];

      for (let i = 0; i < targetCount; i++) {
        const roll = Math.random();
        const palette =
          roll < 0.46 ? WHITE_TONES : roll < 0.78 ? BLUE_TONES : YELLOW_TONES;
        const depth = 0.25 + Math.random() * 0.75;
        const angle = -Math.PI * 0.68 + (Math.random() - 0.5) * 0.9;
        const speed = (3.5 + Math.random() * 7.5) * depth;

        nextParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          depth,
          glyph:
            MICRO_GLYPHS[Math.floor(Math.random() * MICRO_GLYPHS.length)],
          size: 6.8 + depth * 2.2,
          color: palette[Math.floor(Math.random() * palette.length)],
          baseAlpha: 0.16 + depth * 0.24,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.8 + Math.random() * 1.6,
        });
      }
      particles = nextParticles;

      // 2. Subtle & Sleek Constellation Nodes for the First Page
      const constelCount = Math.max(22, Math.min(34, Math.floor((w * h) / 30000)));
      const nextNodes: ConstellationNode[] = [];

      for (let i = 0; i < constelCount; i++) {
        const color =
          CONSTELLATION_PALETTE[
            Math.floor(Math.random() * CONSTELLATION_PALETTE.length)
          ];
        const speed = 0.12 + Math.random() * 0.2;
        const angle = Math.random() * Math.PI * 2;

        nextNodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 0.8 + Math.random() * 0.5,
          color,
          baseAlpha: 0.18 + Math.random() * 0.22,
        });
      }
      constellationNodes = nextNodes;
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

      if (particles.length === 0 || sizeChanged) {
        buildField(width, height);
      }
    };

    const spawnShootingStreak = () => {
      if (width <= 0 || height <= 0) return;
      const fromLeft = Math.random() < 0.55;
      const startX = fromLeft
        ? width * (0.05 + Math.random() * 0.55)
        : width * (0.40 + Math.random() * 0.55);
      const startY = height * (0.04 + Math.random() * 0.40);

      const angle = fromLeft
        ? 0.38 + Math.random() * 0.28
        : Math.PI - (0.38 + Math.random() * 0.28);
      const speed = 540 + Math.random() * 260;

      streaks.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        age: 0,
        life: 0.85 + Math.random() * 0.45,
        length: 130 + Math.random() * 70,
        isBlue: Math.random() < 0.52,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const onMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        prevMs = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const resolvedFont = () => {
      const computed = window.getComputedStyle(canvas).fontFamily;
      return computed && computed.trim().length > 0
        ? computed
        : '"JetBrains Mono", ui-monospace, monospace';
    };

    let monoFont = resolvedFont();

    const draw = (dtSec: number, nowSec: number) => {
      if (width <= 0 || height <= 0) return;

      // Smooth mouse cursor easing for ambient light
      if (targetMouseX > -5000) {
        if (currentMouseX < -5000) {
          currentMouseX = targetMouseX;
          currentMouseY = targetMouseY;
        } else {
          currentMouseX += (targetMouseX - currentMouseX) * 0.08;
          currentMouseY += (targetMouseY - currentMouseY) * 0.08;
        }
      } else {
        currentMouseX = -9999;
        currentMouseY = -9999;
      }

      const scrollOffset = window.scrollY || 0;
      const isFirstPage = scrollOffset < height * 0.65;
      const firstPageFade = Math.max(0, 1 - scrollOffset / (height * 0.75));

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // -----------------------------------------------------------------------
      // 1. PURE PITCH-BLACK VOID BASE (#000000)
      // -----------------------------------------------------------------------
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 2. SUBTLE LIGHT MOVING ALONG CURSOR
      // Whisper-quiet ambient starlight glow following the pointer
      // -----------------------------------------------------------------------
      if (currentMouseX > 0 && currentMouseY > 0) {
        const spotRadius = Math.min(width, height) * 0.36;
        const spot = ctx.createRadialGradient(
          currentMouseX,
          currentMouseY,
          0,
          currentMouseX,
          currentMouseY,
          spotRadius,
        );
        spot.addColorStop(0, "rgba(229, 169, 60, 0.040)"); // Soft warm copper glow
        spot.addColorStop(0.48, "rgba(56, 189, 248, 0.016)"); // Subtle cyan edge
        spot.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // -----------------------------------------------------------------------
      // 3. SUBTLE & SLEEK CONSTELLATIONS FOR THE FIRST PAGE
      // -----------------------------------------------------------------------
      if (firstPageFade > 0.01) {
        // Update nodes and render constellation lines
        for (let i = 0; i < constellationNodes.length; i++) {
          const n = constellationNodes[i];

          if (!prefersReducedMotion) {
            n.x += n.vx;
            n.y += n.vy;

            if (n.x < 0) {
              n.x = 0;
              n.vx *= -1;
            } else if (n.x > width) {
              n.x = width;
              n.vx *= -1;
            }
            if (n.y < 0) {
              n.y = 0;
              n.vy *= -1;
            } else if (n.y > height) {
              n.y = height;
              n.vy *= -1;
            }

            // Gentle subtle deflection away from cursor
            if (currentMouseX > 0) {
              const mdx = n.x - currentMouseX;
              const mdy = n.y - currentMouseY;
              const mdist = Math.hypot(mdx, mdy);
              if (mdist < 70 && mdist > 2) {
                const force = (1 - mdist / 70) * 0.22;
                n.x += (mdx / mdist) * force;
                n.y += (mdy / mdist) * force;
              }
            }
          }

          // Subtle hairline constellation lines between neighboring nodes
          for (let j = i + 1; j < constellationNodes.length; j++) {
            const m = constellationNodes[j];
            const dx = n.x - m.x;
            const dy = n.y - m.y;
            const dist = Math.hypot(dx, dy);

            if (dist < MAX_CONSTELLATION_DIST) {
              let connAlpha =
                (1 - dist / MAX_CONSTELLATION_DIST) * 0.11 * firstPageFade;

              if (currentMouseX > 0) {
                const midX = (n.x + m.x) / 2;
                const midY = (n.y + m.y) / 2;
                const cursorDist = Math.hypot(
                  midX - currentMouseX,
                  midY - currentMouseY,
                );
                if (cursorDist < MOUSE_INTERACT_RADIUS) {
                  connAlpha +=
                    (1 - cursorDist / MOUSE_INTERACT_RADIUS) *
                    0.07 *
                    firstPageFade;
                }
              }

              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(m.x, m.y);
              ctx.strokeStyle = `rgba(148, 163, 184, ${Math.min(connAlpha, 0.16).toFixed(3)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }

          // Render constellation node points
          let nodeAlpha = n.baseAlpha * firstPageFade;
          if (currentMouseX > 0) {
            const d = Math.hypot(n.x - currentMouseX, n.y - currentMouseY);
            if (d < MOUSE_INTERACT_RADIUS) {
              nodeAlpha +=
                (1 - d / MOUSE_INTERACT_RADIUS) * 0.2 * firstPageFade;
            }
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.globalAlpha = Math.min(nodeAlpha, 0.5);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // -----------------------------------------------------------------------
      // 4. DRIFTING MICRO-ASCII DOTS (Blue, Yellow, White)
      // -----------------------------------------------------------------------
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

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
          : 0.65 + 0.35 * Math.sin(nowSec * p.twinkleSpeed + p.twinklePhase);

        ctx.globalAlpha = p.baseAlpha * twinkle;
        ctx.fillStyle = p.color;
        ctx.font = `500 ${p.size.toFixed(1)}px ${monoFont}`;
        ctx.fillText(p.glyph, p.x, parallaxY);
      }

      // -----------------------------------------------------------------------
      // 5. OCCASIONAL SHOOTING STARS (Excluded from First Page, Active on Rest)
      // -----------------------------------------------------------------------
      if (!prefersReducedMotion) {
        if (!isFirstPage) {
          nextStreakIn -= dtSec;
          if (nextStreakIn <= 0) {
            spawnShootingStreak();
            nextStreakIn = 3.2 + Math.random() * 2.8;
          }
        } else {
          // Keep timer ready so when the user scrolls down, a shooting star arrives cleanly
          nextStreakIn = Math.min(nextStreakIn, 1.8);
          streaks = []; // Remove any stray streak if on first page
        }

        if (streaks.length > 0) {
          const alive: ShootingStreak[] = [];
          for (let i = 0; i < streaks.length; i++) {
            const s = streaks[i];
            s.age += dtSec;
            if (s.age >= s.life) continue;

            s.x += s.vx * dtSec;
            s.y += s.vy * dtSec;

            const progress = s.age / s.life;
            const envelope = Math.sin(progress * Math.PI);
            const speedMag = Math.max(1, Math.hypot(s.vx, s.vy));
            const ux = s.vx / speedMag;
            const uy = s.vy / speedMag;

            const tailX = s.x - ux * s.length;
            const tailY = s.y - uy * s.length;

            // Clean tapered gradient streak
            const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
            if (s.isBlue) {
              grad.addColorStop(0, "rgba(56, 189, 248, 0)");
              grad.addColorStop(
                0.65,
                `rgba(56, 189, 248, ${(envelope * 0.48).toFixed(3)})`,
              );
              grad.addColorStop(
                1,
                `rgba(224, 242, 254, ${(envelope * 0.90).toFixed(3)})`,
              );
            } else {
              grad.addColorStop(0, "rgba(229, 169, 60, 0)");
              grad.addColorStop(
                0.65,
                `rgba(229, 169, 60, ${(envelope * 0.48).toFixed(3)})`,
              );
              grad.addColorStop(
                1,
                `rgba(254, 243, 199, ${(envelope * 0.90).toFixed(3)})`,
              );
            }

            ctx.globalAlpha = 1;
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.3;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(s.x, s.y);
            ctx.stroke();

            // Pinpoint star head
            const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 5);
            halo.addColorStop(
              0,
              s.isBlue
                ? `rgba(224, 242, 254, ${(envelope * 0.92).toFixed(3)})`
                : `rgba(254, 243, 199, ${(envelope * 0.92).toFixed(3)})`,
            );
            halo.addColorStop(
              0.5,
              s.isBlue
                ? `rgba(56, 189, 248, ${(envelope * 0.35).toFixed(3)})`
                : `rgba(229, 169, 60, ${(envelope * 0.35).toFixed(3)})`,
            );
            halo.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
            ctx.fill();

            // Trailing micro-ASCII dust wake
            const trailDots = 7;
            for (let d = 1; d <= trailDots; d++) {
              const frac = d / trailDots;
              const jitter = Math.sin(d * 4.3 + s.age * 18) * 1.2 * frac;
              const tx = s.x - ux * s.length * frac - uy * jitter;
              const ty = s.y - uy * s.length * frac + ux * jitter;
              const dotAlpha = (1 - frac) * envelope * 0.6;
              if (dotAlpha < 0.03) continue;

              ctx.globalAlpha = dotAlpha;
              ctx.fillStyle = s.isBlue ? "#7DD3FC" : "#FDE68A";
              ctx.font = `600 ${(8 - frac * 2).toFixed(1)}px ${monoFont}`;
              ctx.fillText(d % 2 === 0 ? "·" : ".", tx, ty);
            }

            alive.push(s);
          }
          streaks = alive;
        }
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
        if (!isTabVisible) {
          rafId = window.requestAnimationFrame(tick);
          return;
        }
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
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <VStack
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="block h-full w-full font-mono" />
    </VStack>
  );
}
