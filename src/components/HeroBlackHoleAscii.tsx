"use client";

import { useEffect, useRef } from "react";

/**
 * High-Definition Interactive 3D ASCII Black Hole & Cosmic Vortex Engine
 *
 * Faithfully recreates the user's reference photograph:
 * - 47,000+ real-time simulated points (tight ASCII glyphs + sub-pixel starlight dust)
 * - Top-down bird's-eye perspective looking down into a deep gravitational sinkhole
 * - Wide elliptical rim tilted diagonally (~ -22 deg roll) to match the reference composition
 * - Deep 3D funnel with steep, luminous white/silver interior walls and striated spiral grooves
 * - Pitch-black event horizon singularity void seated at the deepest core of the funnel
 * - Lone observer silhouette perched at the foreground precipice rim, gazing down into the abyss
 * - Pre-rendered offscreen sprite atlas (12px cell, 8px font) for 60 FPS hardware-accelerated GPU blitting
 * - Interactive 3D camera parallax responding to mouse movements with smooth inertia
 */

const ASCII_CHARS = [
  "@",
  "%",
  "#",
  "8",
  "0",
  "1",
  "*",
  "+",
  "=",
  ":",
  "-",
  "·",
  ".",
  "'",
  "`",
] as const;

// 6 Luminance & Chromatic Tiers for the Atlas
const TIER_COLORS = [
  "#FFFFFF", // Tier 0: Pure radiant starlight (inner throat walls & core rim)
  "#F8FAFC", // Tier 1: Silver-white (funnel striations)
  "#BAE6FD", // Tier 2: Starlight cyan (Doppler & gravitational dispersion)
  "#CBD5E1", // Tier 3: Mid starlight slate (accretion disc streamlines)
  "#64748B", // Tier 4: Faint cosmic dust (outer galactic plane)
  "#FEF3C7", // Tier 5: Warm cosmic gold accent (subtle stellar flares)
] as const;

const ATLAS_CELL = 12;
const HALF_CELL = 6;

export function HeroBlackHoleAscii() {
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
    let isVisible = true;

    // Camera angles:
    // Viewing down from above at ~60 degrees pitch
    // Tilted counterclockwise by ~22 degrees roll
    const BASE_PITCH = (60 * Math.PI) / 180;
    const BASE_ROLL = (-22 * Math.PI) / 180;
    let targetTiltYaw = 0;
    let targetTiltPitch = 0;
    let currentTiltYaw = 0;
    let currentTiltPitch = 0;

    // Interactive mouse coordinates
    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;

    // -------------------------------------------------------------------------
    // 1. Pre-rendered Offscreen Sprite Atlas
    // -------------------------------------------------------------------------
    let atlasCanvas: HTMLCanvasElement | null = null;

    const buildSpriteAtlas = () => {
      const atlas = document.createElement("canvas");
      atlas.width = ASCII_CHARS.length * ATLAS_CELL;
      atlas.height = TIER_COLORS.length * ATLAS_CELL;
      const actx = atlas.getContext("2d");
      if (!actx) return atlas;

      actx.font =
        '700 8.0px "JetBrains Mono", "Fira Code", ui-monospace, monospace';
      actx.textAlign = "center";
      actx.textBaseline = "middle";

      for (let t = 0; t < TIER_COLORS.length; t++) {
        actx.fillStyle = TIER_COLORS[t];
        const rowY = t * ATLAS_CELL + HALF_CELL;
        for (let c = 0; c < ASCII_CHARS.length; c++) {
          const colX = c * ATLAS_CELL + HALF_CELL;
          actx.fillText(ASCII_CHARS[c], colX, rowY);
        }
      }

      return atlas;
    };

    atlasCanvas = buildSpriteAtlas();

    // -------------------------------------------------------------------------
    // 2. High-Density Particle Simulation Buffers (Float32Arrays)
    // -------------------------------------------------------------------------
    let asciiCount = 0;
    let asciiR: Float32Array;
    let asciiAngle: Float32Array;
    let asciiSpeed: Float32Array;
    let asciiGlyph: Uint8Array;
    let asciiTier: Uint8Array;
    let asciiSpiralOffset: Float32Array;

    let dustCount = 0;
    let dustR: Float32Array;
    let dustAngle: Float32Array;
    let dustSpeed: Float32Array;
    let dustSize: Float32Array;
    let dustTier: Uint8Array;
    let dustSpiralOffset: Float32Array;

    // Funnel geometry parameters
    let rCore = 65; // Radius of deepest singularity hole
    let rThroat = 145; // Radius of glowing white throat wall
    let rRim = 330; // Radius of the funnel precipice rim
    let rMax = 880; // Outer boundary of starry plane
    let funnelDepth = 250; // Depth D of the funnel plunge

    const computeFunnelZ = (r: number) => {
      if (r <= rCore) {
        return -funnelDepth;
      }
      if (r < rRim) {
        // C1-smooth gravitational plunge:
        // u = 1 at rim -> Z = 0
        // u = 0 at core -> Z = -funnelDepth
        const u = (r - rCore) / (rRim - rCore);
        return -funnelDepth * Math.pow(1 - u, 1.85);
      }
      // Outer galactic plane: gentle undulating cosmic depression
      const outerT = Math.min(1, (r - rRim) / (rMax - rRim));
      return Math.sin(outerT * Math.PI) * 10;
    };

    const initParticleBuffers = (w: number, h: number) => {
      const minDim = Math.min(w, h);
      const isMobile = minDim < 640;

      rCore = Math.max(45, minDim * 0.095);
      rThroat = Math.max(98, minDim * 0.21);
      rRim = Math.max(215, minDim * 0.44);
      rMax = Math.max(w, h) * 0.96;
      funnelDepth = Math.max(190, minDim * 0.35);

      // High density matching Aadith portfolio (47,000+ points on desktop)
      asciiCount = isMobile ? 5500 : 12000;
      dustCount = isMobile ? 18000 : 35000;

      // Allocate ASCII arrays
      asciiR = new Float32Array(asciiCount);
      asciiAngle = new Float32Array(asciiCount);
      asciiSpeed = new Float32Array(asciiCount);
      asciiGlyph = new Uint8Array(asciiCount);
      asciiTier = new Uint8Array(asciiCount);
      asciiSpiralOffset = new Float32Array(asciiCount);

      // Allocate Dust arrays
      dustR = new Float32Array(dustCount);
      dustAngle = new Float32Array(dustCount);
      dustSpeed = new Float32Array(dustCount);
      dustSize = new Float32Array(dustCount);
      dustTier = new Uint8Array(dustCount);
      dustSpiralOffset = new Float32Array(dustCount);

      // 1. Populate ASCII particles
      for (let i = 0; i < asciiCount; i++) {
        const roll = Math.random();
        let r: number;
        let isInsideFunnel = false;

        if (roll < 0.54) {
          // Inside the glowing funnel (rCore to rRim)
          isInsideFunnel = true;
          const u = Math.pow(Math.random(), 1.35);
          r = rCore + (rRim - rCore) * u;
        } else {
          // Outer accretion plane (rRim to rMax)
          const u = Math.pow(Math.random(), 1.5);
          r = rRim + (rMax - rRim) * u;
        }

        const angle = Math.random() * Math.PI * 2;
        const relR = Math.max(1, r / rCore);

        // Keplerian orbital speed: inner particles orbit faster
        const speed =
          (0.44 / Math.pow(relR, 1.25)) * (0.85 + Math.random() * 0.3);

        // Logarithmic spiral twist
        const spiralOffset = Math.log(relR) * 2.3;

        let glyphIdx = 0;
        let tierIdx = 0;

        if (isInsideFunnel) {
          if (r < rThroat) {
            // Intense white throat: dense glyphs (@, %, #, 8)
            glyphIdx = Math.floor(Math.random() * 4);
            tierIdx = Math.random() < 0.82 ? 0 : 2; // Radiant white / cyan
          } else {
            // Mid funnel slope: (*, +, =, :)
            glyphIdx = 4 + Math.floor(Math.random() * 5);
            tierIdx = Math.random() < 0.68 ? 1 : 3;
          }
        } else {
          // Outer plane: fine stipples (-, ·, ., ', `)
          glyphIdx = 9 + Math.floor(Math.random() * 6);
          tierIdx = Math.random() < 0.55 ? 3 : 4;
          if (Math.random() < 0.035) tierIdx = 5; // Rare stellar gold accent
        }

        asciiR[i] = r;
        asciiAngle[i] = angle;
        asciiSpeed[i] = speed;
        asciiGlyph[i] = glyphIdx;
        asciiTier[i] = tierIdx;
        asciiSpiralOffset[i] = spiralOffset;
      }

      // 2. Populate Micro-starlight dust particles
      for (let i = 0; i < dustCount; i++) {
        const roll = Math.random();
        let r: number;
        let isInsideFunnel = false;

        if (roll < 0.48) {
          isInsideFunnel = true;
          const u = Math.pow(Math.random(), 1.3);
          r = rCore + (rRim - rCore) * u;
        } else {
          const u = Math.pow(Math.random(), 1.4);
          r = rRim + (rMax - rRim) * u;
        }

        const angle = Math.random() * Math.PI * 2;
        const relR = Math.max(1, r / rCore);
        const speed =
          (0.38 / Math.pow(relR, 1.22)) * (0.8 + Math.random() * 0.4);
        const spiralOffset = Math.log(relR) * 2.2;

        let tier = 3;
        let size = 1.0;

        if (isInsideFunnel) {
          if (r < rThroat) {
            tier = Math.random() < 0.78 ? 0 : 2;
            size = 1.5 + Math.random() * 0.8;
          } else {
            tier = Math.random() < 0.62 ? 1 : 2;
            size = 1.2 + Math.random() * 0.6;
          }
        } else {
          tier = Math.random() < 0.52 ? 3 : 4;
          size = 0.9 + Math.random() * 0.5;
          if (Math.random() < 0.03) {
            tier = 5;
            size = 1.4;
          }
        }

        dustR[i] = r;
        dustAngle[i] = angle;
        dustSpeed[i] = speed;
        dustSize[i] = size;
        dustTier[i] = tier;
        dustSpiralOffset[i] = spiralOffset;
      }
    };

    // -------------------------------------------------------------------------
    // 3. Canvas Resizing & Viewport Observers
    // -------------------------------------------------------------------------
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

      initParticleBuffers(width, height);
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry ? entry.isIntersecting : true;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const nX = (e.clientX / window.innerWidth) * 2 - 1;
      const nY = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltYaw = nX * 0.12;
      targetTiltPitch = -nY * 0.08;
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      targetTiltYaw = 0;
      targetTiltPitch = 0;
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", syncSize, { passive: true });

    // -------------------------------------------------------------------------
    // 4. Lone Observer Silhouette at the Foreground Precipice Rim
    // -------------------------------------------------------------------------
    const drawLoneObserver = (
      targetCtx: CanvasRenderingContext2D,
      projX: number,
      projY: number,
      scale: number,
      elapsedSec: number,
    ) => {
      targetCtx.save();
      targetCtx.translate(projX, projY);

      // Person scale: proportional to the funnel
      const hScale = Math.max(0.65, Math.min(1.3, scale));
      const personHeight = 27 * hScale;
      const personWidth = personHeight * 0.38;
      const breathing = Math.sin(elapsedSec * 2.3) * 0.5;

      // A. Gravitational Shadow cast forward into the glowing funnel slope below
      const shadowGradient = targetCtx.createLinearGradient(
        0,
        0,
        -personWidth * 0.4,
        -personHeight * 1.6,
      );
      shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0.96)");
      shadowGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.65)");
      shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      targetCtx.fillStyle = shadowGradient;
      targetCtx.beginPath();
      targetCtx.ellipse(
        -personWidth * 0.1,
        2,
        personWidth * 1.25,
        personHeight * 0.35,
        -0.35,
        0,
        Math.PI * 2,
      );
      targetCtx.fill();

      // B. Razor-sharp silhouette of the lone human perched on the precipice
      targetCtx.fillStyle = "#010204"; // Absolute obsidian black

      // Seated legs / lower ledge
      targetCtx.beginPath();
      targetCtx.moveTo(-personWidth * 0.45, 0);
      targetCtx.lineTo(-personWidth * 0.35, -personHeight * 0.42);
      targetCtx.lineTo(personWidth * 0.35, -personHeight * 0.42);
      targetCtx.lineTo(personWidth * 0.45, 0);
      targetCtx.closePath();
      targetCtx.fill();

      // Torso / Overcoat
      targetCtx.beginPath();
      targetCtx.moveTo(-personWidth * 0.5, -personHeight * 0.4);
      targetCtx.lineTo(
        -personWidth * 0.38,
        -personHeight * 0.78 + breathing * 0.3,
      );
      targetCtx.lineTo(
        personWidth * 0.38,
        -personHeight * 0.78 + breathing * 0.3,
      );
      targetCtx.lineTo(personWidth * 0.5, -personHeight * 0.4);
      targetCtx.closePath();
      targetCtx.fill();

      // Head (gazing down into the glowing funnel)
      const headRadius = personHeight * 0.13;
      const headCenterY = -personHeight * 0.86 + breathing * 0.3;
      targetCtx.beginPath();
      targetCtx.arc(0, headCenterY, headRadius, 0, Math.PI * 2);
      targetCtx.fill();

      // C. Delicate Starlight Rim Highlights (Contour edge from the glowing throat)
      targetCtx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      targetCtx.lineWidth = 1.0;

      // Rim light around head
      targetCtx.beginPath();
      targetCtx.arc(
        0,
        headCenterY,
        headRadius,
        -Math.PI * 0.9,
        -Math.PI * 0.1,
      );
      targetCtx.stroke();

      // Rim light on shoulders
      targetCtx.beginPath();
      targetCtx.moveTo(-personWidth * 0.38, -personHeight * 0.78);
      targetCtx.lineTo(-personWidth * 0.5, -personHeight * 0.46);
      targetCtx.stroke();

      targetCtx.beginPath();
      targetCtx.moveTo(personWidth * 0.38, -personHeight * 0.78);
      targetCtx.lineTo(personWidth * 0.5, -personHeight * 0.46);
      targetCtx.stroke();

      targetCtx.restore();
    };

    // -------------------------------------------------------------------------
    // 5. Main 60 FPS Render Loop
    // -------------------------------------------------------------------------
    const renderFrame = (nowMs: number) => {
      if (!isVisible) {
        rafId = window.requestAnimationFrame(renderFrame);
        return;
      }

      const dt = Math.min((nowMs - prevMs) / 1000, 0.1);
      prevMs = nowMs;
      const elapsedSec = nowMs / 1000;

      // Smooth camera interpolation
      const lerp = prefersReducedMotion ? 1 : Math.min(1, dt * 5.0);
      currentTiltYaw += (targetTiltYaw - currentTiltYaw) * lerp;
      currentTiltPitch += (targetTiltPitch - currentTiltPitch) * lerp;
      mouseX += (targetMouseX - mouseX) * lerp;
      mouseY += (targetMouseY - mouseY) * lerp;

      // Camera pitch (looking down from above) + interactive tilt
      const phi = BASE_PITCH + currentTiltPitch;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      // Roll angle (tilted ellipse matching reference photo)
      const roll = BASE_ROLL;
      const cosRoll = Math.cos(roll);
      const sinRoll = Math.sin(roll);

      // Yaw angle (interactive horizontal parallax)
      const yaw = currentTiltYaw;
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);

      // Camera projection constants
      const focalLength = 700;
      const camDist = 380;

      // Vortex screen center: centered horizontally, positioned to frame the hero copy gracefully
      const cx = width * 0.5;
      const cy = height * 0.58;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Deep void black background
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // Projection helper: transforms 3D point (Xw, Yw, Zw) to screen (px, py)
      // -----------------------------------------------------------------------
      const project3D = (Xw: number, Yw: number, Zw: number) => {
        // Yaw around Z axis
        const Xy = Xw * cosYaw - Yw * sinYaw;
        const Yy = Xw * sinYaw + Yw * cosYaw;
        const Zy = Zw;

        // Camera pitch looking down:
        // Ycam: foreshortened along visual elevation
        // Zcam: depth distance along line of sight
        const Ycam = Yy * sinPhi + Zy * cosPhi;
        const Zcam = Yy * cosPhi - Zy * sinPhi;

        const scale = focalLength / (focalLength + Zcam + camDist);
        const Xp = Xy * scale;
        const Yp = -Ycam * scale;

        // Apply roll rotation (counterclockwise tilt of the ellipse)
        const px = cx + (Xp * cosRoll - Yp * sinRoll);
        const py = cy + (Xp * sinRoll + Yp * cosRoll);

        return { px, py, scale, Zcam };
      };

      // -----------------------------------------------------------------------
      // A. Radiant Funnel Throat Background Glow (Matching Photo)
      // -----------------------------------------------------------------------
      // Project the core center depth onto screen
      const holeProj = project3D(0, 0, -funnelDepth * 0.95);
      const throatRadiusProjX = rThroat * holeProj.scale * 1.5;
      const throatRadiusProjY = rThroat * sinPhi * holeProj.scale * 1.35;

      const throatGlow = ctx.createRadialGradient(
        holeProj.px,
        holeProj.py,
        rCore * 0.25 * holeProj.scale,
        holeProj.px,
        holeProj.py,
        throatRadiusProjX * 2.4,
      );
      throatGlow.addColorStop(0, "rgba(255, 255, 255, 0.48)");
      throatGlow.addColorStop(0.25, "rgba(241, 245, 249, 0.35)");
      throatGlow.addColorStop(0.52, "rgba(186, 230, 253, 0.18)");
      throatGlow.addColorStop(0.82, "rgba(15, 23, 42, 0.06)");
      throatGlow.addColorStop(1, "rgba(2, 3, 6, 0)");

      ctx.save();
      ctx.fillStyle = throatGlow;
      ctx.beginPath();
      ctx.ellipse(
        holeProj.px,
        holeProj.py,
        throatRadiusProjX * 2.2,
        throatRadiusProjY * 2.2,
        roll,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();

      // -----------------------------------------------------------------------
      // B. Render Ultra-Dense Micro-Starlight Dust Particles (~35,000 points)
      // -----------------------------------------------------------------------
      const tierFillStyles = [
        "#FFFFFF",
        "#F8FAFC",
        "#BAE6FD",
        "#94A3B8",
        "#475569",
        "#FEF3C7",
      ];

      const bucketX: number[][] = [[], [], [], [], [], []];
      const bucketY: number[][] = [[], [], [], [], [], []];
      const bucketSize: number[][] = [[], [], [], [], [], []];

      for (let i = 0; i < dustCount; i++) {
        if (!prefersReducedMotion) {
          dustAngle[i] += dustSpeed[i] * dt;
        }

        const r = dustR[i];
        const theta = dustAngle[i] + dustSpiralOffset[i];

        // Concentric striations matching photo grooves
        const relR = Math.max(1, r / rCore);
        const striation = Math.sin(26 * Math.log(relR) - 3 * theta);
        const z = computeFunnelZ(r) + striation * (r < rRim ? 2.5 : 1.0);

        const Xw = r * Math.cos(theta);
        const Yw = r * Math.sin(theta);
        const Zw = z;

        const proj = project3D(Xw, Yw, Zw);

        if (
          proj.px >= -20 &&
          proj.px <= width + 20 &&
          proj.py >= -20 &&
          proj.py <= height + 20
        ) {
          const t = dustTier[i];
          bucketX[t].push(proj.px);
          bucketY[t].push(proj.py);
          bucketSize[t].push(dustSize[i] * proj.scale);
        }
      }

      // Draw all dust particles grouped by tier for maximum batch performance
      for (let t = 0; t < tierFillStyles.length; t++) {
        const xs = bucketX[t];
        const ys = bucketY[t];
        const sizes = bucketSize[t];
        const count = xs.length;
        if (count === 0) continue;

        ctx.fillStyle = tierFillStyles[t];
        for (let j = 0; j < count; j++) {
          const sz = sizes[j];
          ctx.fillRect(xs[j] | 0, ys[j] | 0, sz, sz);
        }
      }

      // -----------------------------------------------------------------------
      // C. Render Primary ASCII Streamline Particles (~12,000 particles)
      // -----------------------------------------------------------------------
      if (atlasCanvas) {
        for (let i = 0; i < asciiCount; i++) {
          if (!prefersReducedMotion) {
            asciiAngle[i] += asciiSpeed[i] * dt;
          }

          const r = asciiR[i];
          const theta = asciiAngle[i] + asciiSpiralOffset[i];

          const relR = Math.max(1, r / rCore);
          const striation = Math.cos(28 * Math.log(relR) - 4 * theta);
          const z = computeFunnelZ(r) + striation * (r < rRim ? 3.5 : 1.2);

          const Xw = r * Math.cos(theta);
          const Yw = r * Math.sin(theta);
          const Zw = z;

          const proj = project3D(Xw, Yw, Zw);

          if (
            proj.px >= -20 &&
            proj.px <= width + 20 &&
            proj.py >= -20 &&
            proj.py <= height + 20
          ) {
            const gIdx = asciiGlyph[i];
            const tIdx = asciiTier[i];

            const sx = gIdx * ATLAS_CELL;
            const sy = tIdx * ATLAS_CELL;

            ctx.drawImage(
              atlasCanvas,
              sx,
              sy,
              ATLAS_CELL,
              ATLAS_CELL,
              (proj.px - HALF_CELL) | 0,
              (proj.py - HALF_CELL) | 0,
              ATLAS_CELL,
              ATLAS_CELL,
            );
          }
        }
      }

      // -----------------------------------------------------------------------
      // D. Render Event Horizon Singularity Void (Pitch-Black Abyss at Core)
      // -----------------------------------------------------------------------
      // Located at the bottom of the funnel (Zw = -funnelDepth)
      const coreHole = project3D(0, 0, -funnelDepth * 1.05);
      const coreHoleRadiusX = rCore * coreHole.scale * 1.15;
      const coreHoleRadiusY = rCore * sinPhi * coreHole.scale * 1.05;

      // Soft gravitational absorption shadow surrounding the singularity
      const coreShadow = ctx.createRadialGradient(
        coreHole.px,
        coreHole.py,
        coreHoleRadiusX * 0.35,
        coreHole.px,
        coreHole.py,
        coreHoleRadiusX * 1.6,
      );
      coreShadow.addColorStop(0, "rgba(0, 0, 0, 1)");
      coreShadow.addColorStop(0.75, "rgba(1, 2, 4, 0.98)");
      coreShadow.addColorStop(0.92, "rgba(1, 2, 4, 0.65)");
      coreShadow.addColorStop(1, "rgba(1, 2, 4, 0)");

      ctx.save();
      ctx.fillStyle = coreShadow;
      ctx.beginPath();
      ctx.ellipse(
        coreHole.px,
        coreHole.py,
        coreHoleRadiusX * 1.55,
        coreHoleRadiusY * 1.55,
        roll,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Absolute pure black singularity void
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.ellipse(
        coreHole.px,
        coreHole.py,
        coreHoleRadiusX,
        coreHoleRadiusY,
        roll,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();

      // -----------------------------------------------------------------------
      // E. Render The Lone Observer on the Foreground Precipice Rim
      // -----------------------------------------------------------------------
      // Placed at the near rim: Yw = -rRim, Zw = 0
      // In camera projection, this sits right at the bottom edge of the elliptical opening
      const observerPos = project3D(0, -rRim * 0.96, 0);

      drawLoneObserver(
        ctx,
        observerPos.px,
        observerPos.py,
        observerPos.scale,
        elapsedSec,
      );

      rafId = window.requestAnimationFrame(renderFrame);
    };

    // Initialize
    syncSize();
    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener("resize", syncSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      intersectionObserver.disconnect();
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
        className="h-full w-full opacity-100 transition-opacity duration-1000"
      />
    </div>
  );
}
