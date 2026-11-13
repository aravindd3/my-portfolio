"use client";

import { useEffect, useRef } from "react";
import { VStack } from "@astryxdesign/core/VStack";

interface DeepStar {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface MidStar {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  haloColor: string;
}

interface BrightStar {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  haloColor: string;
  haloRadius: number;
  spikeLength: number;
}

interface ConstellationEdge {
  fromIdx: number;
  toIdx: number;
  baseAlpha: number;
}

interface MeteorStreak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  length: number;
  color: string;
  tailColor: string;
}

// Realistic Stellar Spectral Classes
const WHITE_STARS = ["#FFFFFF", "#F8FAFC", "#F1F5F9"] as const;
const BLUE_STARS = ["#E0F2FE", "#BAE6FD", "#7DD3FC", "#38BDF8"] as const;
const GOLD_STARS = ["#FEF3C7", "#FDE68A", "#FCD34D", "#E5A93C"] as const;
const VIOLET_STARS = ["#EDE9FE", "#DDD6FE", "#C084FC"] as const;

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
    let rafId = 0;
    let prevMs = performance.now();
    let isTabVisible = true;

    // Smooth inertial cursor parallax coordinates
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let hasMouseMoved = false;

    // Starfield & Cosmic structures
    let deepStars: DeepStar[] = [];
    let midStars: MidStar[] = [];
    let brightStars: BrightStar[] = [];
    let constellationEdges: ConstellationEdge[] = [];
    let meteors: MeteorStreak[] = [];
    let nextMeteorTimer = 1.2; // First shooting star appears quickly after load

    const buildStarfield = (w: number, h: number) => {
      const area = w * h;

      // 1. Layer 1: Distant Deep Space Micro-Stars (~420 to 650 pinpricks)
      const deepCount = Math.max(320, Math.min(680, Math.floor(area / 2600)));
      const nextDeep: DeepStar[] = [];
      for (let i = 0; i < deepCount; i++) {
        const roll = Math.random();
        const palette =
          roll < 0.55
            ? WHITE_STARS
            : roll < 0.8
              ? BLUE_STARS
              : roll < 0.93
                ? GOLD_STARS
                : VIOLET_STARS;

        nextDeep.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.45 + Math.random() * 0.55,
          baseAlpha: 0.18 + Math.random() * 0.42,
          twinkleSpeed: 0.8 + Math.random() * 2.2,
          twinklePhase: Math.random() * Math.PI * 2,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
      deepStars = nextDeep;

      // 2. Layer 2: Mid-Field Stars (~140 to 220 distinct stars)
      const midCount = Math.max(100, Math.min(220, Math.floor(area / 8200)));
      const nextMid: MidStar[] = [];
      for (let i = 0; i < midCount; i++) {
        const roll = Math.random();
        let color = WHITE_STARS[0] as string;
        let haloColor = "rgba(248, 250, 252, 0.25)";

        if (roll < 0.42) {
          color = WHITE_STARS[Math.floor(Math.random() * WHITE_STARS.length)];
          haloColor = "rgba(255, 255, 255, 0.22)";
        } else if (roll < 0.72) {
          color = BLUE_STARS[Math.floor(Math.random() * BLUE_STARS.length)];
          haloColor = "rgba(56, 189, 248, 0.25)";
        } else if (roll < 0.9) {
          color = GOLD_STARS[Math.floor(Math.random() * GOLD_STARS.length)];
          haloColor = "rgba(229, 169, 60, 0.25)";
        } else {
          color = VIOLET_STARS[Math.floor(Math.random() * VIOLET_STARS.length)];
          haloColor = "rgba(192, 132, 252, 0.22)";
        }

        nextMid.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.95 + Math.random() * 0.9,
          baseAlpha: 0.45 + Math.random() * 0.4,
          twinkleSpeed: 1.2 + Math.random() * 2.6,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
          haloColor,
        });
      }
      midStars = nextMid;

      // 3. Layer 3: Prominent Bright Celestial Stars with 4-Point Diffraction Cross Spikes
      const brightCount = Math.max(16, Math.min(28, Math.floor(area / 55000)));
      const nextBright: BrightStar[] = [];
      for (let i = 0; i < brightCount; i++) {
        const roll = Math.random();
        let color = "#FFFFFF";
        let haloColor = "rgba(255, 255, 255, 0.35)";

        if (roll < 0.4) {
          color = "#FFFFFF";
          haloColor = "rgba(241, 245, 249, 0.4)";
        } else if (roll < 0.75) {
          color = "#BAE6FD";
          haloColor = "rgba(56, 189, 248, 0.42)";
        } else {
          color = "#FDE68A";
          haloColor = "rgba(229, 169, 60, 0.45)";
        }

        nextBright.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 2.1 + Math.random() * 1.3,
          baseAlpha: 0.85 + Math.random() * 0.15,
          twinkleSpeed: 1.0 + Math.random() * 1.8,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
          haloColor,
          haloRadius: 10 + Math.random() * 10,
          spikeLength: 22 + Math.random() * 24,
        });
      }
      brightStars = nextBright;

      // 4. Subtle Constellation Edges connecting close bright & mid stars
      const nextEdges: ConstellationEdge[] = [];
      for (let i = 0; i < nextBright.length; i++) {
        for (let j = i + 1; j < nextBright.length; j++) {
          const dx = nextBright[i].x - nextBright[j].x;
          const dy = nextBright[i].y - nextBright[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > 70 && dist < 210) {
            nextEdges.push({
              fromIdx: i,
              toIdx: j,
              baseAlpha: 0.05 + Math.random() * 0.06,
            });
            if (nextEdges.length >= 10) break;
          }
        }
        if (nextEdges.length >= 10) break;
      }
      constellationEdges = nextEdges;
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

      if (deepStars.length === 0 || sizeChanged) {
        buildStarfield(width, height);
      }
    };

    const spawnMeteor = () => {
      if (width <= 0 || height <= 0) return;
      const fromLeft = Math.random() < 0.6;
      const startX = fromLeft
        ? width * (0.04 + Math.random() * 0.58)
        : width * (0.38 + Math.random() * 0.58);
      const startY = height * (0.02 + Math.random() * 0.38);

      const angle = fromLeft
        ? 0.48 + Math.random() * 0.28 // downward right (~30-45 deg)
        : Math.PI - (0.48 + Math.random() * 0.28); // downward left

      const speed = 640 + Math.random() * 320;
      const isBlue = Math.random() < 0.55;

      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        age: 0,
        life: 0.85 + Math.random() * 0.55,
        length: 160 + Math.random() * 110,
        color: isBlue ? "#E0F2FE" : "#FEF3C7",
        tailColor: isBlue ? "rgba(56, 189, 248, 0.8)" : "rgba(229, 169, 60, 0.8)",
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      hasMouseMoved = true;
      targetMouseX = (e.clientX / width - 0.5) * 2; // -1 to +1
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        prevMs = performance.now();
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    const render = (dtSec: number, nowSec: number) => {
      if (width <= 0 || height <= 0) return;

      // Smooth cursor parallax lerp
      if (hasMouseMoved) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      }

      const scrollY = window.scrollY || 0;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // -----------------------------------------------------------------------
      // 1. PURE COSMIC BLACK VOID
      // -----------------------------------------------------------------------
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 2. ETHEREAL DEEP SPACE NEBULA DUST CLOUDS
      // Organic cosmic gas clouds in the infinite void (Subtle, never gray)
      // -----------------------------------------------------------------------
      const nebula1X = width * 0.26 + currentMouseX * 12;
      const nebula1Y = height * 0.32 + currentMouseY * 12;
      const nebula1R = Math.min(width, height) * 0.65;
      const neb1 = ctx.createRadialGradient(
        nebula1X,
        nebula1Y,
        0,
        nebula1X,
        nebula1Y,
        nebula1R,
      );
      neb1.addColorStop(0, "rgba(79, 70, 229, 0.052)"); // Deep cosmic indigo
      neb1.addColorStop(0.5, "rgba(139, 92, 246, 0.022)");
      neb1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      const nebula2X = width * 0.78 + currentMouseX * 16;
      const nebula2Y = height * 0.68 + currentMouseY * 16;
      const nebula2R = Math.min(width, height) * 0.58;
      const neb2 = ctx.createRadialGradient(
        nebula2X,
        nebula2Y,
        0,
        nebula2X,
        nebula2Y,
        nebula2R,
      );
      neb2.addColorStop(0, "rgba(14, 165, 233, 0.042)"); // Starlight cyan wisp
      neb2.addColorStop(0.55, "rgba(56, 189, 248, 0.015)");
      neb2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      const nebula3X = width * 0.52 + currentMouseX * 8;
      const nebula3Y = height * 0.16 + currentMouseY * 8;
      const nebula3R = Math.min(width, height) * 0.44;
      const neb3 = ctx.createRadialGradient(
        nebula3X,
        nebula3Y,
        0,
        nebula3X,
        nebula3Y,
        nebula3R,
      );
      neb3.addColorStop(0, "rgba(229, 169, 60, 0.032)"); // Hardware stellar copper glow
      neb3.addColorStop(0.6, "rgba(245, 158, 11, 0.008)");
      neb3.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb3;
      ctx.fillRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 3. LAYER 1: DEEP BACKGROUND STARS (Distant micro-stars with 3D parallax)
      // -----------------------------------------------------------------------
      const deepParallaxX = currentMouseX * 4;
      const deepParallaxY = currentMouseY * 4;

      for (let i = 0; i < deepStars.length; i++) {
        const p = deepStars[i];
        const py = ((p.y - scrollY * 0.02 + deepParallaxY) % height + height) % height;
        const px = ((p.x + deepParallaxX) % width + width) % width;

        const twinkle = prefersReducedMotion
          ? 0.8
          : 0.65 + 0.35 * Math.sin(nowSec * p.twinkleSpeed + p.twinklePhase);

        ctx.globalAlpha = p.baseAlpha * twinkle;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // -----------------------------------------------------------------------
      // 4. SUBTLE CONSTELLATION EDGES
      // -----------------------------------------------------------------------
      const brightParallaxX = currentMouseX * 18;
      const brightParallaxY = currentMouseY * 18;

      ctx.lineWidth = 0.6;
      for (let i = 0; i < constellationEdges.length; i++) {
        const edge = constellationEdges[i];
        const s1 = brightStars[edge.fromIdx];
        const s2 = brightStars[edge.toIdx];
        if (!s1 || !s2) continue;

        const s1x = ((s1.x + brightParallaxX) % width + width) % width;
        const s1y = ((s1.y - scrollY * 0.09 + brightParallaxY) % height + height) % height;
        const s2x = ((s2.x + brightParallaxX) % width + width) % width;
        const s2y = ((s2.y - scrollY * 0.09 + brightParallaxY) % height + height) % height;

        // Skip edge if wrapping across screen edges
        if (Math.abs(s1x - s2x) > width * 0.5 || Math.abs(s1y - s2y) > height * 0.5) {
          continue;
        }

        ctx.strokeStyle = `rgba(148, 163, 184, ${edge.baseAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(s1x, s1y);
        ctx.lineTo(s2x, s2y);
        ctx.stroke();
      }

      // -----------------------------------------------------------------------
      // 5. LAYER 2: MID-FIELD STARS (Distinct stellar spectra with soft halos)
      // -----------------------------------------------------------------------
      const midParallaxX = currentMouseX * 9;
      const midParallaxY = currentMouseY * 9;

      for (let i = 0; i < midStars.length; i++) {
        const p = midStars[i];
        const py = ((p.y - scrollY * 0.05 + midParallaxY) % height + height) % height;
        const px = ((p.x + midParallaxX) % width + width) % width;

        const twinkle = prefersReducedMotion
          ? 0.9
          : 0.55 + 0.45 * Math.sin(nowSec * p.twinkleSpeed + p.twinklePhase);
        const alpha = p.baseAlpha * twinkle;

        // Soft starlight halo
        ctx.globalAlpha = alpha * 0.4;
        ctx.fillStyle = p.haloColor;
        ctx.beginPath();
        ctx.arc(px, py, p.r * 2.6, 0, Math.PI * 2);
        ctx.fill();

        // Star core
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // -----------------------------------------------------------------------
      // 6. LAYER 3: BRIGHT STARS WITH 4-POINT OPTICAL DIFFRACTION SPIKES
      // (The authentic space telescope / celestial observatory view)
      // -----------------------------------------------------------------------
      for (let i = 0; i < brightStars.length; i++) {
        const p = brightStars[i];
        const py = ((p.y - scrollY * 0.09 + brightParallaxY) % height + height) % height;
        const px = ((p.x + brightParallaxX) % width + width) % width;

        const twinkle = prefersReducedMotion
          ? 0.95
          : 0.68 + 0.32 * Math.sin(nowSec * p.twinkleSpeed + p.twinklePhase);
        const alpha = p.baseAlpha * twinkle;

        // Radiant halo
        const haloGrad = ctx.createRadialGradient(px, py, 0, px, py, p.haloRadius);
        haloGrad.addColorStop(0, p.haloColor);
        haloGrad.addColorStop(0.4, p.haloColor.replace(/[\d.]+\)$/, "0.14)"));
        haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.globalAlpha = alpha;
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(px, py, p.haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point Diffraction Cross Spikes (Horizontal & Vertical)
        const spikeLen = p.spikeLength * twinkle;

        // Horizontal ray
        const horizGrad = ctx.createLinearGradient(
          px - spikeLen,
          py,
          px + spikeLen,
          py,
        );
        horizGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        horizGrad.addColorStop(0.5, `rgba(255, 255, 255, ${(alpha * 0.75).toFixed(3)})`);
        horizGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = horizGrad;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(px - spikeLen, py);
        ctx.lineTo(px + spikeLen, py);
        ctx.stroke();

        // Vertical ray
        const vertGrad = ctx.createLinearGradient(
          px,
          py - spikeLen,
          px,
          py + spikeLen,
        );
        vertGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        vertGrad.addColorStop(0.5, `rgba(255, 255, 255, ${(alpha * 0.75).toFixed(3)})`);
        vertGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = vertGrad;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(px, py - spikeLen);
        ctx.lineTo(px, py + spikeLen);
        ctx.stroke();

        // Intense center star point
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // -----------------------------------------------------------------------
      // 7. SHOOTING STARS / METEORS (Natural cosmic streaks crossing space)
      // -----------------------------------------------------------------------
      if (!prefersReducedMotion) {
        nextMeteorTimer -= dtSec;
        if (nextMeteorTimer <= 0) {
          spawnMeteor();
          nextMeteorTimer = 2.4 + Math.random() * 2.8;
        }

        const remainingMeteors: MeteorStreak[] = [];
        for (let i = 0; i < meteors.length; i++) {
          const m = meteors[i];
          m.age += dtSec;
          if (m.age >= m.life) continue;

          m.x += m.vx * dtSec;
          m.y += m.vy * dtSec;

          const progress = m.age / m.life;
          const envelope = Math.sin(progress * Math.PI);
          const speedMag = Math.max(1, Math.hypot(m.vx, m.vy));
          const ux = m.vx / speedMag;
          const uy = m.vy / speedMag;

          const tailX = m.x - ux * m.length;
          const tailY = m.y - uy * m.length;

          // Luminous tapered streak line
          const streakGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
          streakGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
          streakGrad.addColorStop(
            0.65,
            m.tailColor.replace(/[\d.]+\)$/, `${(envelope * 0.55).toFixed(3)})`),
          );
          streakGrad.addColorStop(
            1,
            `rgba(255, 255, 255, ${(envelope * 0.95).toFixed(3)})`,
          );

          ctx.strokeStyle = streakGrad;
          ctx.lineWidth = 1.8;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();

          // Burning meteor nucleus head
          const headGlow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 8);
          headGlow.addColorStop(
            0,
            `rgba(255, 255, 255, ${(envelope * 0.98).toFixed(3)})`,
          );
          headGlow.addColorStop(
            0.4,
            m.tailColor.replace(/[\d.]+\)$/, `${(envelope * 0.45).toFixed(3)})`),
          );
          headGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = headGlow;
          ctx.beginPath();
          ctx.arc(m.x, m.y, 8, 0, Math.PI * 2);
          ctx.fill();

          // Trailing stardust micro-particles
          const trailDots = 8;
          for (let d = 1; d <= trailDots; d++) {
            const frac = d / trailDots;
            const jitter = Math.sin(d * 4.7 + m.age * 22) * 1.5 * frac;
            const tx = m.x - ux * m.length * frac - uy * jitter;
            const ty = m.y - uy * m.length * frac + ux * jitter;
            const dotAlpha = (1 - frac) * envelope * 0.65;
            if (dotAlpha < 0.04) continue;

            ctx.globalAlpha = dotAlpha;
            ctx.fillStyle = m.color;
            ctx.beginPath();
            ctx.arc(tx, ty, 0.75 + (1 - frac) * 0.55, 0, Math.PI * 2);
            ctx.fill();
          }

          remainingMeteors.push(m);
        }
        meteors = remainingMeteors;
      }

      ctx.globalAlpha = 1;
    };

    syncSize();
    render(0, 0);

    const onResize = () => {
      syncSize();
      if (prefersReducedMotion) render(0, 0);
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
        render(dtSec, nowMs / 1000);
        rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
