"use client";

import { useEffect, useRef } from "react";

interface VortexStar {
  readonly ringIdx: number;
  readonly baseAngle: number;
  readonly radialFactor: number;
  readonly seed: number;
  angle: number;
  r: number;
  z: number;
  glyph: string;
  size: number;
  color: string;
  baseAlpha: number;
  shimmerPhase: number;
}

const RIM_GLYPHS = ["@", "8", "%", "#", "*", "+"] as const;
const MID_GLYPHS = ["*", "+", "=", ":", "·", "•"] as const;
const OUTER_GLYPHS = ["·", ".", "'", ",", "`"] as const;

const STAR_COLORS = [
  "#FFFFFF",
  "#F8FAFC",
  "#F1F5F9",
  "#E2E8F0",
  "#BAE6FD",
  "#7DD3FC",
  "#FEF3C7",
] as const;

export function HeroBlackHoleAscii() {
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
    let rafId = 0;
    let prevMs = performance.now();

    // Smooth interactive camera orientation
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    let stars: VortexStar[] = [];

    const resolveMonoFont = () => {
      const computed = window.getComputedStyle(canvas).fontFamily;
      return computed && computed.trim().length > 0
        ? computed
        : '"JetBrains Mono", ui-monospace, monospace';
    };

    let monoFont = resolveMonoFont();

    const buildVortexStars = (w: number, h: number) => {
      const nextStars: VortexStar[] = [];
      const baseDim = Math.min(w, h);
      const rHorizon = Math.max(54, baseDim * 0.125);
      const rMax = Math.max(w, h) * 0.88;
      const numRings = Math.min(48, Math.max(30, Math.floor(baseDim / 22)));

      for (let ring = 0; ring < numRings; ring++) {
        const u = ring / (numRings - 1); // 0 at event horizon, 1 at outer cosmos
        // Non-linear power spacing to cluster dense starlight filaments near the horizon
        const ringR = rHorizon + (rMax - rHorizon) * Math.pow(u, 1.48);
        const depthZ = -Math.max(160, baseDim * 0.38) * Math.pow(1 - u, 2.1);

        // Density scaling: high particle count at inner rings
        const densityFactor = 1 - u * 0.45;
        const circumference = 2 * Math.PI * ringR;
        const starSpacing = 16 / densityFactor;
        const countOnRing = Math.max(
          14,
          Math.min(96, Math.floor(circumference / starSpacing)),
        );

        for (let s = 0; s < countOnRing; s++) {
          const baseAngle = (s / countOnRing) * Math.PI * 2;
          const radialJitter = (Math.sin(s * 7.3 + ring * 3.1) * 0.5) * (4 + u * 12);
          const seed = ((ring * 79 + s * 37) % 100) / 100;

          // Glyph selection based on proximity to the black hole
          let glyph: string;
          let color: string;
          let size: number;
          let baseAlpha: number;

          if (u < 0.12) {
            // Intense radiant accretion lip
            glyph = RIM_GLYPHS[Math.floor(seed * RIM_GLYPHS.length)];
            color = seed > 0.35 ? "#FFFFFF" : "#BAE6FD";
            size = 9.5 + seed * 2.5;
            baseAlpha = 0.88 + seed * 0.12;
          } else if (u < 0.45) {
            // Flowing mid-accretion streamlines
            glyph = MID_GLYPHS[Math.floor(seed * MID_GLYPHS.length)];
            color =
              STAR_COLORS[Math.floor(seed * STAR_COLORS.length)] || "#FFFFFF";
            size = 8.0 + seed * 2.0;
            baseAlpha = 0.55 + seed * 0.35;
          } else {
            // Distant cosmos & outer gravitational filaments
            glyph = OUTER_GLYPHS[Math.floor(seed * OUTER_GLYPHS.length)];
            color = seed > 0.4 ? "#F1F5F9" : "#94A3B8";
            size = 6.8 + seed * 2.0;
            baseAlpha = 0.22 + seed * 0.40;
          }

          nextStars.push({
            ringIdx: ring,
            baseAngle,
            radialFactor: u,
            seed,
            angle: baseAngle,
            r: ringR + radialJitter,
            z: depthZ,
            glyph,
            size,
            color,
            baseAlpha,
            shimmerPhase: Math.random() * Math.PI * 2,
          });
        }
      }

      stars = nextStars;
    };

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextW = rect.width || window.innerWidth;
      const nextH = rect.height || window.innerHeight;
      if (nextW <= 0 || nextH <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = nextW;
      height = nextH;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      monoFont = resolveMonoFont();
      buildVortexStars(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nX = (e.clientX / window.innerWidth) * 2 - 1;
      const nY = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltX = nX * 0.15; // Max ~8.5 degrees yaw
      targetTiltY = -nY * 0.12; // Max ~6.8 degrees pitch
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Draw the silhouette of the man standing on the glowing edge
    const drawLoneObserver = (
      ctx2d: CanvasRenderingContext2D,
      x: number,
      y: number,
      scale: number,
      elapsedSec: number,
    ) => {
      ctx2d.save();
      ctx2d.translate(x, y);

      const manHeight = Math.max(18, 22 * scale);
      const manWidth = manHeight * 0.34;
      const breathing = Math.sin(elapsedSec * 2.2) * 0.8;

      // 1. Soft gravitational shadow stretching behind him
      const shadowGrad = ctx2d.createLinearGradient(0, 0, 0, manHeight * 0.8);
      shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.75)");
      shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx2d.fillStyle = shadowGrad;
      ctx2d.beginPath();
      ctx2d.ellipse(0, 2, manWidth * 1.4, 4, 0, 0, Math.PI * 2);
      ctx2d.fill();

      // 2. High-contrast silhouette of the lone human
      // Deep black void silhouette with sharp starlight rim lighting
      ctx2d.fillStyle = "#020306";
      ctx2d.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx2d.lineWidth = 1;

      // Legs / Stance
      ctx2d.beginPath();
      ctx2d.moveTo(-manWidth * 0.32, 0);
      ctx2d.lineTo(-manWidth * 0.22, -manHeight * 0.42);
      ctx2d.lineTo(0, -manHeight * 0.46);
      ctx2d.lineTo(manWidth * 0.22, -manHeight * 0.42);
      ctx2d.lineTo(manWidth * 0.32, 0);
      ctx2d.closePath();
      ctx2d.fill();

      // Torso & Trenchcoat / Silhouette Body
      ctx2d.beginPath();
      ctx2d.moveTo(-manWidth * 0.48, -manHeight * 0.42);
      ctx2d.lineTo(-manWidth * 0.40, -manHeight * 0.78 + breathing * 0.3);
      ctx2d.lineTo(manWidth * 0.40, -manHeight * 0.78 + breathing * 0.3);
      ctx2d.lineTo(manWidth * 0.48, -manHeight * 0.42);
      ctx2d.closePath();
      ctx2d.fill();

      // Head
      const headRadius = manHeight * 0.125;
      const headCenterY = -manHeight * 0.86 + breathing * 0.3;
      ctx2d.beginPath();
      ctx2d.arc(0, headCenterY, headRadius, 0, Math.PI * 2);
      ctx2d.fill();

      // 3. Crisp starlight rim highlights (contour glow as seen in the reference photo)
      ctx2d.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx2d.lineWidth = 0.9;

      // Left shoulder & neck starlight glint
      ctx2d.beginPath();
      ctx2d.arc(0, headCenterY, headRadius, -Math.PI * 0.8, -Math.PI * 0.2);
      ctx2d.stroke();

      ctx2d.beginPath();
      ctx2d.moveTo(-manWidth * 0.42, -manHeight * 0.78);
      ctx2d.lineTo(-manWidth * 0.48, -manHeight * 0.50);
      ctx2d.stroke();

      // Subtle upward micro ASCII spark shed from his stance into the event horizon
      const sparkY = headCenterY - 8 - ((elapsedSec * 16) % 18);
      const sparkAlpha = Math.max(0, 1 - Math.abs(sparkY - headCenterY) / 22);
      if (sparkAlpha > 0.05) {
        ctx2d.fillStyle = "#BAE6FD";
        ctx2d.globalAlpha = sparkAlpha * 0.75;
        ctx2d.font = `600 7px ${monoFont}`;
        ctx2d.textAlign = "center";
        ctx2d.fillText("·", 0, sparkY);
      }

      ctx2d.restore();
    };

    const renderFrame = (nowMs: number) => {
      const dt = Math.min((nowMs - prevMs) / 1000, 0.1);
      prevMs = nowMs;
      const elapsedSec = nowMs / 1000;

      // Smooth inertia on 3D camera tilt
      const tiltLerp = prefersReducedMotion ? 1 : Math.min(1, dt * 4.8);
      currentTiltX += (targetTiltX - currentTiltX) * tiltLerp;
      currentTiltY += (targetTiltY - currentTiltY) * tiltLerp;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Deep celestial blackness
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, width, height);

      const baseDim = Math.min(width, height);
      const rHorizon = Math.max(54, baseDim * 0.125);

      // Center the black hole slightly below mid-screen for optimal typographic balance
      const cx = width * 0.5;
      const cy = height * 0.54;

      // Base camera perspective tilt (looking down into the funnel at an angle ~63 deg)
      const basePitch = Math.PI * 0.35 + currentTiltY;
      const cosPitch = Math.cos(basePitch);
      const sinPitch = Math.sin(basePitch);
      const yaw = currentTiltX;
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);

      const focalLength = 520;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 1. Sort stars by projected depth so inner/closer particles render with proper occlusion
      // Update orbital rotation with Keplerian time dilation: closer orbits spin faster!
      const projectedStars: {
        sx: number;
        sy: number;
        depth: number;
        star: VortexStar;
        isNearRim: boolean;
      }[] = [];

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!prefersReducedMotion) {
          // Keplerian orbital angular velocity: ω ∝ 1 / (r/R_h)^1.35
          const omega = 0.58 / Math.pow(Math.max(1, s.r / rHorizon), 1.35);
          s.angle += omega * dt;

          // Subtle spiral wind: logarithmic geodesic curve
          const spiralTwist = Math.log(s.r / rHorizon) * 0.45;
          const currentA = s.angle + spiralTwist;

          // 3D coordinates on the funnel surface
          const x3d = s.r * Math.cos(currentA);
          const y3d = s.r * Math.sin(currentA);
          const z3d = s.z;

          // Rotate by yaw & pitch
          const xRot = x3d * cosYaw - y3d * sinYaw;
          const yRot = x3d * sinYaw + y3d * cosYaw;

          const yP = yRot * cosPitch - z3d * sinPitch;
          const zP = yRot * sinPitch + z3d * cosPitch;

          const projScale = focalLength / (focalLength + zP + 280);
          const sx = cx + xRot * projScale;
          const sy = cy + yP * projScale;

          if (sx >= -40 && sx <= width + 40 && sy >= -40 && sy <= height + 40) {
            projectedStars.push({
              sx,
              sy,
              depth: zP,
              star: s,
              isNearRim: s.radialFactor < 0.14,
            });
          }
        }
      }

      // Sort back-to-front
      projectedStars.sort((a, b) => b.depth - a.depth);

      // 2. Render all ASCII geodesic stars & starlight filaments
      for (let i = 0; i < projectedStars.length; i++) {
        const p = projectedStars[i];
        const s = p.star;

        // Micro-shimmer
        const shimmer =
          0.75 + 0.25 * Math.sin(elapsedSec * 3.2 + s.shimmerPhase);
        const alpha = Math.min(1, s.baseAlpha * shimmer);

        ctx.font = `600 ${s.size}px ${monoFont}`;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fillText(s.glyph, p.sx, p.sy);
      }

      // 3. Render the Black Hole Event Horizon Singularity Void (Pitch-Black Ellipse)
      // Calculated from the projected horizon radius and camera pitch
      const horizonScale = focalLength / (focalLength + 280);
      const horizonRadiusX = rHorizon * horizonScale;
      const horizonRadiusY = rHorizon * cosPitch * horizonScale;

      // Soft gravitational absorption shadow surrounding the rim
      const voidGradient = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        horizonRadiusX * 1.25,
      );
      voidGradient.addColorStop(0, "rgba(2, 3, 6, 1)");
      voidGradient.addColorStop(0.72, "rgba(2, 3, 6, 0.98)");
      voidGradient.addColorStop(0.92, "rgba(2, 3, 6, 0.65)");
      voidGradient.addColorStop(1, "rgba(2, 3, 6, 0)");

      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = voidGradient;
      ctx.beginPath();
      ctx.ellipse(
        cx,
        cy,
        horizonRadiusX * 1.35,
        horizonRadiusY * 1.35,
        currentTiltX * 0.4,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // True absolute Singularity Void (pure deep blackness)
      ctx.fillStyle = "#010204";
      ctx.beginPath();
      ctx.ellipse(
        cx,
        cy,
        horizonRadiusX * 0.94,
        horizonRadiusY * 0.94,
        currentTiltX * 0.4,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();

      // 4. Radiant Photon Sphere Accretion Lip (Dense ASCII Halo right at the boundary)
      const rimGlyphCount = Math.max(38, Math.floor(horizonRadiusX * 0.75));
      ctx.font = `700 9px ${monoFont}`;
      for (let r = 0; r < rimGlyphCount; r++) {
        const rimAngle = (r / rimGlyphCount) * Math.PI * 2;
        // Doppler asymmetry: starlight approaching the viewer on one side is brighter!
        const doppler = 0.55 + 0.45 * Math.sin(rimAngle - Math.PI * 0.25);
        const rimX = cx + Math.cos(rimAngle) * horizonRadiusX;
        const rimY = cy + Math.sin(rimAngle) * horizonRadiusY;

        const rimChar = doppler > 0.8 ? "@" : doppler > 0.45 ? "*" : "·";
        ctx.fillStyle = doppler > 0.75 ? "#FFFFFF" : "#BAE6FD";
        ctx.globalAlpha = 0.45 + doppler * 0.55;
        ctx.fillText(rimChar, rimX, rimY);
      }

      // 5. The Lone Man Standing at the Edge of the Event Horizon
      // Positioned right at the front lip (closest to the viewer, gazing into the black hole)
      const manHorizonAngle = Math.PI * 0.5; // Bottom front rim of the ellipse
      const manX = cx + Math.cos(manHorizonAngle) * horizonRadiusX;
      const manY = cy + Math.sin(manHorizonAngle) * horizonRadiusY;

      drawLoneObserver(ctx, manX, manY, horizonScale, elapsedSec);

      ctx.restore();
      rafId = window.requestAnimationFrame(renderFrame);
    };

    syncSize();
    rafId = window.requestAnimationFrame(renderFrame);

    window.addEventListener("resize", syncSize, { passive: true });

    return () => {
      window.removeEventListener("resize", syncSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90 transition-opacity duration-1000"
      />
    </div>
  );
}
