"use client";

import { useEffect, useRef } from "react";

/**
 * HeroVortexMinimal:
 * A procedural, code-rendered 3D black hole vortex matching the reference artwork:
 * - Top-down bird's-eye perspective looking down into the funnel
 * - Tilted ellipse (~ -22 deg) with concentric starlight striations
 * - Radiant starlight throat glowing white/silver
 * - Pitch-black event horizon singularity at the core
 * - Lone observer silhouette perched at the foreground precipice rim
 * - Minimalistic, serene, 60 FPS procedural canvas (zero PNG / image assets)
 * - Positioned at the end of the 1st page to create a smooth, natural transition to the 2nd slide
 */

interface VortexParticle {
  r: number;
  theta: number;
  speed: number;
  size: number;
  char: string;
  tier: number; // 0: radiant white, 1: silver, 2: cyan, 3: slate, 4: faint
  spiralOffset: number;
  twinklePhase: number;
}

const STIPPLE_CHARS = ["·", ".", "•", "*", "+"] as const;

const TIER_COLORS = [
  "rgba(255, 255, 255, 0.95)",
  "rgba(241, 245, 249, 0.85)",
  "rgba(186, 230, 253, 0.75)",
  "rgba(203, 213, 225, 0.55)",
  "rgba(100, 116, 139, 0.35)",
] as const;

export function HeroVortexMinimal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let prevMs = performance.now();
    let isVisible = true;

    // Tilted ellipse geometry matching the reference image
    const TILT = (-22 * Math.PI) / 180;
    const cosTilt = Math.cos(TILT);
    const sinTilt = Math.sin(TILT);

    let particles: VortexParticle[] = [];

    // Funnel geometry parameters
    let Ra = 280; // Major radius of the outer rim
    let Rb = 175; // Minor radius (foreshortened by ~62 deg top-down angle)
    let rCore = 48; // Singularity core radius
    let rThroat = 105; // Glowing white throat radius

    const initParticles = (w: number, h: number) => {
      const minDim = Math.min(w, h * 1.6);
      const isMobile = w < 640;

      Ra = Math.max(180, minDim * 0.44);
      Rb = Ra * 0.62;
      rCore = Ra * 0.17;
      rThroat = Ra * 0.36;

      const particleCount = isMobile ? 2200 : 4800;
      const nextParticles: VortexParticle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const roll = Math.random();
        let r: number;
        let isThroat = false;

        if (roll < 0.52) {
          // Inside the glowing funnel (rCore to Ra)
          isThroat = true;
          const u = Math.pow(Math.random(), 1.35);
          r = rCore + (Ra - rCore) * u;
        } else {
          // Outer accretion starfield (Ra to Ra * 1.55)
          const u = Math.pow(Math.random(), 1.45);
          r = Ra + (Ra * 0.55) * u;
        }

        const theta = Math.random() * Math.PI * 2;
        const relR = Math.max(1, r / rCore);

        // Serene Keplerian orbital drift
        const speed = (0.24 / Math.pow(relR, 1.2)) * (0.85 + Math.random() * 0.3);
        const spiralOffset = Math.log(relR) * 2.0;

        let tier = 3;
        let size = 1.0;
        let char = STIPPLE_CHARS[Math.floor(Math.random() * STIPPLE_CHARS.length)];

        if (isThroat) {
          if (r < rThroat) {
            tier = Math.random() < 0.8 ? 0 : 2; // Pure white / cyan
            size = 1.6 + Math.random() * 0.8;
            char = Math.random() < 0.5 ? "*" : "·";
          } else {
            tier = Math.random() < 0.65 ? 1 : 2;
            size = 1.2 + Math.random() * 0.6;
          }
        } else {
          tier = Math.random() < 0.5 ? 3 : 4;
          size = 0.9 + Math.random() * 0.5;
          char = "·";
        }

        nextParticles.push({
          r,
          theta,
          speed,
          size,
          char,
          tier,
          spiralOffset,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      particles = nextParticles;
    };

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextW = rect.width || window.innerWidth;
      const nextH = rect.height || 400;
      if (nextW <= 0 || nextH <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = nextW;
      height = nextH;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));

      initParticles(width, height);
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry ? entry.isIntersecting : true;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(canvas);

    // -------------------------------------------------------------------------
    // Lone Observer Silhouette on the Precipice Rim
    // -------------------------------------------------------------------------
    const drawLoneObserver = (
      targetCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      elapsedSec: number,
    ) => {
      targetCtx.save();
      targetCtx.translate(x, y);

      const personH = 24;
      const personW = 9;
      const breathing = Math.sin(elapsedSec * 2.2) * 0.4;

      // Soft shadow cast forward into the glowing funnel slope
      const shadowGrad = targetCtx.createLinearGradient(0, 0, -personW * 0.4, -personH * 1.5);
      shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.95)");
      shadowGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.6)");
      shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      targetCtx.fillStyle = shadowGrad;
      targetCtx.beginPath();
      targetCtx.ellipse(-personW * 0.2, 2, personW * 1.4, personH * 0.35, -0.3, 0, Math.PI * 2);
      targetCtx.fill();

      // Sharp silhouette of the lone human sitting/perched on the rim
      targetCtx.fillStyle = "#010204";

      // Lower body / seated posture
      targetCtx.beginPath();
      targetCtx.moveTo(-personW * 0.45, 0);
      targetCtx.lineTo(-personW * 0.35, -personH * 0.42);
      targetCtx.lineTo(personW * 0.35, -personH * 0.42);
      targetCtx.lineTo(personW * 0.45, 0);
      targetCtx.closePath();
      targetCtx.fill();

      // Torso / coat
      targetCtx.beginPath();
      targetCtx.moveTo(-personW * 0.5, -personH * 0.4);
      targetCtx.lineTo(-personW * 0.38, -personH * 0.78 + breathing * 0.3);
      targetCtx.lineTo(personW * 0.38, -personH * 0.78 + breathing * 0.3);
      targetCtx.lineTo(personW * 0.5, -personH * 0.4);
      targetCtx.closePath();
      targetCtx.fill();

      // Head gazing into the funnel
      const headR = personH * 0.13;
      const headY = -personH * 0.86 + breathing * 0.3;
      targetCtx.beginPath();
      targetCtx.arc(0, headY, headR, 0, Math.PI * 2);
      targetCtx.fill();

      // Starlight rim highlights (subtle edge contour from the glowing throat)
      targetCtx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      targetCtx.lineWidth = 1.0;
      targetCtx.beginPath();
      targetCtx.arc(0, headY, headR, -Math.PI * 0.85, -Math.PI * 0.15);
      targetCtx.stroke();

      targetCtx.beginPath();
      targetCtx.moveTo(-personW * 0.38, -personH * 0.78);
      targetCtx.lineTo(-personW * 0.5, -personH * 0.48);
      targetCtx.stroke();

      targetCtx.beginPath();
      targetCtx.moveTo(personW * 0.38, -personH * 0.78);
      targetCtx.lineTo(personW * 0.5, -personH * 0.48);
      targetCtx.stroke();

      targetCtx.restore();
    };

    // -------------------------------------------------------------------------
    // Main 60 FPS Render Loop
    // -------------------------------------------------------------------------
    const renderFrame = (nowMs: number) => {
      if (!isVisible) {
        rafId = window.requestAnimationFrame(renderFrame);
        return;
      }

      const dt = Math.min((nowMs - prevMs) / 1000, 0.1);
      prevMs = nowMs;
      const elapsedSec = nowMs / 1000;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Center of the vortex (positioned in the lower-middle of the container)
      const cx = width * 0.5;
      const cy = height * 0.52;

      // 1. Radiant Funnel Throat Background Glow
      const throatGlow = ctx.createRadialGradient(
        cx,
        cy,
        rCore * 0.3,
        cx,
        cy,
        rThroat * 1.8,
      );
      throatGlow.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      throatGlow.addColorStop(0.28, "rgba(241, 245, 249, 0.32)");
      throatGlow.addColorStop(0.55, "rgba(186, 230, 253, 0.15)");
      throatGlow.addColorStop(0.85, "rgba(15, 23, 42, 0.05)");
      throatGlow.addColorStop(1, "rgba(2, 3, 6, 0)");

      ctx.save();
      ctx.fillStyle = throatGlow;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rThroat * 1.8, rThroat * 1.15, TILT, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Render Concentric Starlight Striations & Dust Particles
      ctx.font = '700 8.5px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.theta += p.speed * dt;
        }

        const angle = p.theta + p.spiralOffset;
        const normR = p.r / Ra;

        // Elliptical coordinate before tilt
        const x0 = p.r * Math.cos(angle);
        const y0 = (p.r * (Rb / Ra)) * Math.sin(angle);

        // Apply tilt rotation
        const px = cx + (x0 * cosTilt - y0 * sinTilt);
        const py = cy + (x0 * sinTilt + y0 * cosTilt);

        if (px >= -10 && px <= width + 10 && py >= -10 && py <= height + 10) {
          ctx.fillStyle = TIER_COLORS[p.tier];

          // Inner particles render as crisp characters or dots
          if (normR < 0.45 && i % 3 === 0) {
            ctx.fillText(p.char, px, py);
          } else {
            ctx.fillRect(px | 0, py | 0, p.size, p.size);
          }
        }
      }

      // 3. Event Horizon Singularity Void (Pitch-Black Abyss at the Center)
      const coreRadiusX = rCore * 1.05;
      const coreRadiusY = rCore * 0.65;

      // Soft gravitational absorption shadow
      const coreShadow = ctx.createRadialGradient(
        cx,
        cy,
        coreRadiusX * 0.3,
        cx,
        cy,
        coreRadiusX * 1.5,
      );
      coreShadow.addColorStop(0, "rgba(0, 0, 0, 1)");
      coreShadow.addColorStop(0.75, "rgba(1, 2, 4, 0.98)");
      coreShadow.addColorStop(0.92, "rgba(1, 2, 4, 0.65)");
      coreShadow.addColorStop(1, "rgba(1, 2, 4, 0)");

      ctx.save();
      ctx.fillStyle = coreShadow;
      ctx.beginPath();
      ctx.ellipse(cx, cy, coreRadiusX * 1.5, coreRadiusY * 1.5, TILT, 0, Math.PI * 2);
      ctx.fill();

      // Pure black singularity
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.ellipse(cx, cy, coreRadiusX, coreRadiusY, TILT, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Lone Observer Silhouette at the Foreground Rim Edge
      // Position: front rim (theta = PI / 2)
      const obsAngle = Math.PI * 0.5;
      const obsX0 = Ra * 0.94 * Math.cos(obsAngle);
      const obsY0 = Rb * 0.94 * Math.sin(obsAngle);
      const obsPx = cx + (obsX0 * cosTilt - obsY0 * sinTilt);
      const obsPy = cy + (obsX0 * sinTilt + obsY0 * cosTilt);

      drawLoneObserver(ctx, obsPx, obsPy, elapsedSec);

      rafId = window.requestAnimationFrame(renderFrame);
    };

    syncSize();
    rafId = window.requestAnimationFrame(renderFrame);

    window.addEventListener("resize", syncSize, { passive: true });

    return () => {
      window.removeEventListener("resize", syncSize);
      intersectionObserver.disconnect();
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-4xl lg:max-w-5xl h-[280px] sm:h-[340px] md:h-[400px] mx-auto pointer-events-none select-none overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 20%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 20%, black 85%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
