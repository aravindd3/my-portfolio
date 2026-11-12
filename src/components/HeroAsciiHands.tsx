"use client";

import { useEffect, useRef } from "react";
import { VStack } from "@astryxdesign/core/VStack";
import { HERO_ASCII_GRID, HERO_ASCII_RUNS } from "@/data/heroAsciiArt";

interface HeroAsciiHandsProps {
  altText: string;
}

interface HandCell {
  readonly r: number;
  readonly c: number;
  readonly charIdx: number;
  readonly color: string;
  readonly zone: "robot" | "human";
  readonly distTip: number;
  readonly seed: number;
}

const ASCII_RAMP = " .:-=+*#%@";
const CHAR_TO_IDX = new Map<string, number>(
  Array.from(ASCII_RAMP).map((ch, idx) => [ch, idx]),
);

const LOGICAL_W = HERO_ASCII_GRID.cols * HERO_ASCII_GRID.cellSize;
const LOGICAL_H = HERO_ASCII_GRID.rows * HERO_ASCII_GRID.cellSize;

const ENTRY_HAND_DURATION_SEC = 1.4;
const ENTRY_STAR_DELAY_SEC = 0.08;
const ENTRY_STAR_DURATION_SEC = 1.25;
const HAND_ENTRY_OFFSET_COL = 76;
const HAND_ENTRY_OFFSET_ROW = 9;
const HAND_SCROLL_OFFSET_COL = 34;
const HAND_SCROLL_OFFSET_ROW = 4;

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function easeOutQuart(t: number): number {
  const u = clamp01(t);
  return 1 - Math.pow(1 - u, 4);
}

function easeOutBack(t: number): number {
  const u = clamp01(t);
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2);
}

function smoothstep(t: number): number {
  const u = clamp01(t);
  return u * u * (3 - 2 * u);
}

// Pre-expand robotic & human hand runs once at module load
const STATIC_HAND_CELLS: readonly HandCell[] = (() => {
  const cells: HandCell[] = [];
  for (const run of HERO_ASCII_RUNS) {
    if (run.zone === "core") continue;
    const tipCol =
      run.zone === "robot"
        ? HERO_ASCII_GRID.robotTipCol
        : HERO_ASCII_GRID.humanTipCol;
    const tipRow =
      run.zone === "robot"
        ? HERO_ASCII_GRID.robotTipRow
        : HERO_ASCII_GRID.humanTipRow;

    for (let i = 0; i < run.text.length; i++) {
      const ch = run.text[i];
      const charIdx = CHAR_TO_IDX.get(ch) ?? 1;
      const c = run.c + i;
      const distTip = Math.hypot(c - tipCol, run.r - tipRow);
      const seed = ((c * 37 + run.r * 73) % 97) / 97;
      cells.push({
        r: run.r,
        c,
        charIdx,
        color: run.color,
        zone: run.zone,
        distTip,
        seed,
      });
    }
  }
  return cells;
})();

const BASE_ARM_ANGLES = [-1.32, -0.28, 0.78, 1.82, 2.86, -2.36] as const;

// Deterministic burst particles radiating continuously from the center hardware star
const BURST_RAYS = Array.from({ length: 22 }, (_, i) => ({
  angleOffset: (i * Math.PI * 2) / 22 + (i % 2 === 0 ? 0.08 : -0.06),
  speed: 7.8 + (i % 4) * 2.4,
  phaseOffset: (i * 3.7) % 19.5,
  maxRadius: 19.5 + (i % 3) * 2.0,
}));

function drawAtmosphericGlows(
  ctx: CanvasRenderingContext2D,
  sparkX: number,
  sparkY: number,
  pulseBreathe: number,
  glowIntensity: number,
  scrollFlare: number,
) {
  if (glowIntensity <= 0.01) return;

  const spreadBoost = 1 + scrollFlare * 0.35;
  const coolRadius = 168 * spreadBoost;
  const coolGrad = ctx.createRadialGradient(
    sparkX - 38,
    sparkY - 6,
    4,
    sparkX - 38,
    sparkY - 6,
    coolRadius,
  );
  coolGrad.addColorStop(
    0,
    `rgba(56, 189, 248, ${(0.17 + 0.08 * pulseBreathe + scrollFlare * 0.1) * glowIntensity})`,
  );
  coolGrad.addColorStop(0.55, `rgba(56, 189, 248, ${0.045 * glowIntensity})`);
  coolGrad.addColorStop(1, "rgba(6, 9, 13, 0)");
  ctx.fillStyle = coolGrad;
  ctx.beginPath();
  ctx.arc(sparkX - 38, sparkY - 6, coolRadius, 0, Math.PI * 2);
  ctx.fill();

  const warmRadius = 168 * spreadBoost;
  const warmGrad = ctx.createRadialGradient(
    sparkX + 38,
    sparkY + 6,
    4,
    sparkX + 38,
    sparkY + 6,
    warmRadius,
  );
  warmGrad.addColorStop(
    0,
    `rgba(229, 169, 60, ${(0.19 + 0.09 * pulseBreathe + scrollFlare * 0.1) * glowIntensity})`,
  );
  warmGrad.addColorStop(0.55, `rgba(229, 169, 60, ${0.05 * glowIntensity})`);
  warmGrad.addColorStop(1, "rgba(6, 9, 13, 0)");
  ctx.fillStyle = warmGrad;
  ctx.beginPath();
  ctx.arc(sparkX + 38, sparkY + 6, warmRadius, 0, Math.PI * 2);
  ctx.fill();

  const coreRadius = (118 + 24 * pulseBreathe) * (1 + scrollFlare * 0.45);
  const coreGrad = ctx.createRadialGradient(
    sparkX,
    sparkY,
    2,
    sparkX,
    sparkY,
    coreRadius,
  );
  coreGrad.addColorStop(
    0,
    `rgba(255, 255, 255, ${(0.32 + 0.14 * pulseBreathe + scrollFlare * 0.18) * glowIntensity})`,
  );
  coreGrad.addColorStop(0.32, `rgba(241, 245, 249, ${0.13 * glowIntensity})`);
  coreGrad.addColorStop(1, "rgba(6, 9, 13, 0)");
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(sparkX, sparkY, coreRadius, 0, Math.PI * 2);
  ctx.fill();
}

function drawHandCells(
  ctx: CanvasRenderingContext2D,
  elapsedSec: number,
  entryProgress: number,
  scrollProgress: number,
  robotOffsetCol: number,
  robotOffsetRow: number,
  humanOffsetCol: number,
  humanOffsetRow: number,
  cursorLogicalX: number,
  cursorLogicalY: number,
  monoFont: string,
) {
  const { cellSize, cols, rows } = HERO_ASCII_GRID;
  const scrollFade = 1 - smoothstep(clamp01((scrollProgress - 0.12) / 0.88)) * 0.88;
  const entryLockPulse =
    entryProgress > 0.72
      ? Math.sin(clamp01((entryProgress - 0.72) / 0.28) * Math.PI)
      : 0;

  for (let i = 0; i < STATIC_HAND_CELLS.length; i++) {
    const cell = STATIC_HAND_CELLS[i];
    const isRobot = cell.zone === "robot";
    const dxCol = isRobot ? robotOffsetCol : humanOffsetCol;
    const dyRow = isRobot ? robotOffsetRow : humanOffsetRow;

    const drawCol = cell.c + dxCol;
    const drawRow = cell.r + dyRow;

    if (drawCol < -2 || drawCol > cols + 2 || drawRow < -2 || drawRow > rows + 2) {
      continue;
    }

    let x = drawCol * cellSize + cellSize * 0.5;
    let y = drawRow * cellSize + cellSize * 0.5;

    // Interactive cursor displacement & cosmic magnification
    let isCursorNear = false;
    let cursorExcitement = 0;
    if (cursorLogicalX > -100 && cursorLogicalY > -100) {
      const distToCursor = Math.hypot(x - cursorLogicalX, y - cursorLogicalY);
      const cursorRadius = 82; // Magnifier lens radius
      if (distToCursor < cursorRadius) {
        isCursorNear = true;
        const normDist = distToCursor / cursorRadius;
        cursorExcitement = Math.pow(1 - normDist, 1.6);

        // Spherical lens displacement bulge
        const repelAngle = Math.atan2(y - cursorLogicalY, x - cursorLogicalX);
        const pushDist = (1 - normDist) * 14.5;
        x += Math.cos(repelAngle) * pushDist;
        y += Math.sin(repelAngle) * pushDist;
      }
    }

    // Vignette along outer viewport boundaries as hands slide in/out
    let alpha = 1;
    if (drawCol < 8) {
      alpha *= clamp01((drawCol + 1.5) / 9.5);
    } else if (drawCol > cols - 9) {
      alpha *= clamp01((cols + 0.5 - drawCol) / 9.5);
    }
    if (drawRow < 1) {
      alpha *= clamp01((drawRow + 1.5) / 2.5);
    } else if (drawRow > rows - 2) {
      alpha *= clamp01((rows + 0.5 - drawRow) / 2.5);
    }

    // Progressive arrival opacity so wrists glide smoothly out of darkness
    const wristRatio = clamp01(cell.distTip / 52);
    const entryReveal = clamp01(entryProgress * 1.45 - wristRatio * 0.35);
    alpha *= entryReveal * scrollFade;
    if (alpha <= 0.02) continue;

    // Continuous living energy current sweeping from wrist toward fingertip
    const flowWave = Math.sin(cell.distTip * 0.24 + elapsedSec * 3.5);
    const crossShimmer = Math.sin(
      cell.c * 0.17 - cell.r * 0.12 + elapsedSec * (isRobot ? 2.4 : -2.4),
    );
    const tipProximity = cell.distTip < 10.5 ? 1 - cell.distTip / 10.5 : 0;
    const tipPulse =
      tipProximity * (0.55 + 0.45 * Math.sin(elapsedSec * 4.0 - cell.distTip * 0.45));

    let idx = cell.charIdx;
    if (isCursorNear) {
      // Elevate character density & brightness on interactive touch
      idx = Math.min(
        ASCII_RAMP.length - 1,
        idx + Math.floor(cursorExcitement * 4 + 1),
      );
    } else if (cell.charIdx >= 2 && flowWave > 0.62) {
      idx = Math.min(ASCII_RAMP.length - 1, idx + 1);
    } else if (cell.charIdx >= 4 && crossShimmer < -0.78) {
      idx = Math.max(1, idx - 1);
    }

    let fillColor = cell.color;
    const surgeHighlight = Math.max(
      flowWave > 0.72 ? (flowWave - 0.72) / 0.28 : 0,
      entryLockPulse * (1 - wristRatio * 0.65),
    );

    if (isCursorNear) {
      fillColor = cursorExcitement > 0.5 ? "#FFFFFF" : isRobot ? "#BAE6FD" : "#FEF3C7";
      alpha = Math.min(1, alpha + cursorExcitement * 0.6);
      const magSize = 10.5 + cursorExcitement * 7.5;
      ctx.font = `700 ${magSize.toFixed(1)}px ${monoFont}`;
    } else {
      ctx.font = `600 10.5px ${monoFont}`;
      if (tipPulse > 0.48 && cell.charIdx >= 4) {
        fillColor = isRobot ? "#E0F2FE" : "#FEF3C7";
        alpha = Math.min(1, alpha + 0.15);
      } else if (surgeHighlight > 0.42 && cell.charIdx >= 4) {
        fillColor = isRobot
          ? cell.charIdx >= 7
            ? "#BAE6FD"
            : "#38BDF8"
          : cell.charIdx >= 7
            ? "#FDE68A"
            : "#E5A93C";
      } else if (crossShimmer > 0.85 && cell.charIdx >= 6) {
        fillColor = isRobot ? "#BAE6FD" : "#FDE68A";
      }
    }

    ctx.globalAlpha = alpha;
    ctx.fillStyle = fillColor;
    ctx.fillText(ASCII_RAMP[idx], x, y);

    // Subtle trailing spark wisps shedding from fingertips while retracting on scroll
    if (
      scrollProgress > 0.08 &&
      scrollProgress < 0.85 &&
      cell.distTip < 9 &&
      cell.seed > 0.62
    ) {
      const wakeDir = isRobot ? 1 : -1;
      const wakeDist = (scrollProgress * 12 + cell.seed * 4) * wakeDir;
      const wakeX = x + wakeDist * cellSize;
      const wakeY = y + Math.sin(elapsedSec * 5 + cell.seed * 12) * cellSize * 0.7;
      ctx.globalAlpha = alpha * (1 - scrollProgress) * 0.48;
      ctx.fillStyle = isRobot ? "#7DD3FC" : "#FDE68A";
      ctx.fillText(cell.seed > 0.82 ? "+" : "·", wakeX, wakeY);
    }
  }

  ctx.globalAlpha = 1;
}

function drawFingertipBridges(
  ctx: CanvasRenderingContext2D,
  elapsedSec: number,
  entryProgress: number,
  scrollProgress: number,
  robotTipCol: number,
  robotTipRow: number,
  humanTipCol: number,
  humanTipRow: number,
  cursorLogicalX: number,
  cursorLogicalY: number,
  monoFont: string,
) {
  const { cellSize, sparkCenterCol, sparkCenterRow } = HERO_ASCII_GRID;

  // Bridges ignite as hands near center and dissolve gradually as you scroll
  const entryReveal = smoothstep(clamp01((entryProgress - 0.55) / 0.4));
  const scrollDisconnect = clamp01(scrollProgress / 0.85);
  const visibility = entryReveal * (1 - smoothstep(scrollDisconnect));
  if (visibility <= 0.02) return;

  const sides: readonly {
    tipCol: number;
    tipRow: number;
    isRobot: boolean;
  }[] = [
    { tipCol: robotTipCol, tipRow: robotTipRow, isRobot: true },
    { tipCol: humanTipCol, tipRow: humanTipRow, isRobot: false },
  ];

  const steps = 22;
  for (const side of sides) {
    const dx = sparkCenterCol - side.tipCol;
    const dy = sparkCenterRow - side.tipRow;
    const len = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / len;
    const ny = dx / len;

    for (let s = 2; s <= steps - 3; s++) {
      const u = s / steps; // 0 = fingertip, 1 = star core
      if (u > 0.82) continue;

      const stream = Math.sin(u * 15 - elapsedSec * 6.8);
      const harmonicWave =
        Math.sin(u * 10 - elapsedSec * 4.2) * (0.28 + scrollDisconnect * 0.9);
      const bc = side.tipCol + dx * u + nx * harmonicWave;
      const br = side.tipRow + dy * u + ny * harmonicWave;

      if (stream > 0.12 || s % 3 === 0) {
        let gx = Math.round(bc) * cellSize + cellSize * 0.5;
        let gy = Math.round(br) * cellSize + cellSize * 0.5;

        let isCursorNear = false;
        let cursorExcitement = 0;
        if (cursorLogicalX > -100 && cursorLogicalY > -100) {
          const distToCursor = Math.hypot(gx - cursorLogicalX, gy - cursorLogicalY);
          const cursorRadius = 82;
          if (distToCursor < cursorRadius) {
            isCursorNear = true;
            const normDist = distToCursor / cursorRadius;
            cursorExcitement = Math.pow(1 - normDist, 1.6);
            const repelAngle = Math.atan2(gy - cursorLogicalY, gx - cursorLogicalX);
            const pushDist = (1 - normDist) * 14.0;
            gx += Math.cos(repelAngle) * pushDist;
            gy += Math.sin(repelAngle) * pushDist;
          }
        }

        const isPeak = stream > 0.68 || isCursorNear;
        const ch = isCursorNear && cursorExcitement > 0.5 ? "@" : isPeak ? "*" : stream > 0.12 ? "+" : "·";

        if (isCursorNear) {
          const fontSz = 10.5 + cursorExcitement * 7.5;
          ctx.font = `700 ${fontSz.toFixed(1)}px ${monoFont}`;
          ctx.globalAlpha = Math.min(1, 0.95 * visibility + cursorExcitement * 0.4);
          ctx.fillStyle = cursorExcitement > 0.4 ? "#FFFFFF" : side.isRobot ? "#BAE6FD" : "#FEF3C7";
        } else {
          ctx.font = `600 10.5px ${monoFont}`;
          ctx.globalAlpha = (isPeak ? 0.94 : 0.38) * visibility;
          ctx.fillStyle = side.isRobot
            ? isPeak
              ? "#BAE6FD"
              : "#38BDF8"
            : isPeak
              ? "#FEF3C7"
              : "#E5A93C";
        }

        ctx.fillText(ch, gx, gy);
      }
    }
  }

  ctx.globalAlpha = 1;
}

function drawShockwaveRing(
  ctx: CanvasRenderingContext2D,
  ringRadius: number,
  ringAlpha: number,
  ringWidth: number,
) {
  if (ringAlpha <= 0.02 || ringRadius <= 0.5) return;

  const { cellSize, cols, rows, sparkCenterCol, sparkCenterRow } = HERO_ASCII_GRID;
  const steps = Math.max(24, Math.round(ringRadius * 5.2));

  for (let i = 0; i < steps; i++) {
    const ang = (i * Math.PI * 2) / steps;
    const radialJitter = (i % 3 === 0 ? 0.35 : -0.25) * ringWidth;
    const rPos = ringRadius + radialJitter;
    const bc = Math.round(sparkCenterCol + Math.cos(ang) * rPos);
    const br = Math.round(sparkCenterRow + Math.sin(ang) * rPos);

    if (bc < 2 || bc > cols - 3 || br < 1 || br > rows - 2) continue;

    const gx = bc * cellSize + cellSize * 0.5;
    const gy = br * cellSize + cellSize * 0.5;
    const ch = i % 4 === 0 ? "*" : i % 2 === 0 ? "+" : ":";

    ctx.globalAlpha = ringAlpha * (i % 2 === 0 ? 0.85 : 0.48);
    ctx.fillStyle =
      bc < sparkCenterCol - 2
        ? "#7DD3FC"
        : bc > sparkCenterCol + 2
          ? "#FDE68A"
          : "#F1F5F9";
    ctx.fillText(ch, gx, gy);
  }

  ctx.globalAlpha = 1;
}

function drawAnimatedStar(
  ctx: CanvasRenderingContext2D,
  elapsedSec: number,
  starEntry: number,
  entryProgress: number,
  scrollProgress: number,
  pulseBreathe: number,
  cursorLogicalX: number,
  cursorLogicalY: number,
  monoFont: string,
) {
  const { cellSize, cols, rows, sparkCenterCol, sparkCenterRow } = HERO_ASCII_GRID;

  const entryScale =
    starEntry <= 0
      ? 0.08
      : 0.14 + 0.86 * easeOutBack(starEntry);
  const entrySpinBoost = (1 - easeOutQuart(starEntry)) * -2.9;

  // Scroll choreography on star: spin accelerates -> flares -> shatters outward into ASCII stardust
  const scrollFlare = Math.sin(clamp01(scrollProgress / 0.52) * Math.PI * 0.5);
  const scrollSpin = Math.pow(scrollProgress, 1.35) * 5.6;
  const disperse = smoothstep(clamp01((scrollProgress - 0.28) / 0.68));
  const coreFadeOut = 1 - smoothstep(clamp01((scrollProgress - 0.68) / 0.32)) * 0.92;

  const rot = elapsedSec * 0.55 + entrySpinBoost + scrollSpin;
  const armReach =
    (12.4 + 1.8 * Math.sin(elapsedSec * 2.4)) *
    entryScale *
    (1 + scrollFlare * 0.42);
  const hubRadius = (3.4 + 0.75 * pulseBreathe) * Math.min(1.22, entryScale) * (1 - disperse * 0.48);

  const minRow = Math.max(0, sparkCenterRow - 23);
  const maxRow = Math.min(rows - 1, sparkCenterRow + 23);
  const minCol = Math.max(0, sparkCenterCol - 24);
  const maxCol = Math.min(cols - 1, sparkCenterCol + 24);

  // 1. Primary 6-arm isometric star + counter-rotating minor rays (with scroll radial scatter & cursor magnifier)
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      const dxS = c - sparkCenterCol;
      const dyS = r - sparkCenterRow;
      const dist = Math.hypot(dxS, dyS);
      if (dist > 22.5) continue;

      let val = 0;
      let bevel = 0;

      if (dist < hubRadius) {
        val = Math.max(val, 1.0 - (dist / (hubRadius + 0.6)) * 0.28);
        bevel = 1.0;
      }

      // 6 primary rotating faceted arms
      for (let a = 0; a < BASE_ARM_ANGLES.length; a++) {
        const ang = BASE_ARM_ANGLES[a] + rot;
        const ux = Math.cos(ang);
        const uy = Math.sin(ang);
        const proj = dxS * ux + dyS * uy;
        const perpSigned = -dxS * uy + dyS * ux;
        const perp = Math.abs(perpSigned);

        if (proj > 0 && proj < armReach) {
          const halfW = 2.5 * (1 - proj / (armReach + 1.8));
          if (perp <= halfW) {
            const facetShade = perpSigned <= 0.18 ? 1.0 : 0.72;
            const edgeSoft = 1 - (perp / (halfW + 0.25)) * 0.3;
            const lenFactor = 1 - (proj / (armReach + 1)) * 0.34;
            const armVal = facetShade * edgeSoft * lenFactor;
            if (armVal > val) {
              val = armVal;
              bevel = facetShade;
            }
          }
        }

        // Twinkling outer ray extensions
        if (proj >= armReach && proj < armReach + 6.0 && perp < 0.72) {
          const rayShimmer = Math.sin(proj * 1.4 - elapsedSec * 5.6 + a);
          if (rayShimmer > 0.02) {
            const rayVal =
              0.44 * (1 - (proj - armReach) / 6.4) * (0.6 + 0.4 * rayShimmer);
            if (rayVal > val) val = rayVal;
          }
        }

        // Counter-rotating minor rays interleaved at +30 deg
        const minorAng = BASE_ARM_ANGLES[a] + Math.PI / 6 - rot * 0.45;
        const mx = Math.cos(minorAng);
        const my = Math.sin(minorAng);
        const mProj = dxS * mx + dyS * my;
        const mPerp = Math.abs(-dxS * my + dyS * mx);
        const minorReach = armReach * 0.66;
        if (mProj > 1.8 && mProj < minorReach && mPerp < 0.55) {
          const mWave = 0.55 + 0.45 * Math.sin(elapsedSec * 4.2 + a * 1.3 - mProj * 0.4);
          const minorVal = 0.42 * (1 - mProj / (minorReach + 1)) * mWave;
          if (minorVal > val) val = minorVal;
        }
      }

      if (val <= 0.16) continue;

      const cellSeed = ((c * 53 + r * 97) % 89) / 89;
      let drawC = c;
      let drawR = r;
      let cellAlpha = coreFadeOut;

      // On scroll-down dispersion, outer star cells spiral outward into ASCII stardust
      if (disperse > 0.005 && dist > 1.3) {
        const invDist = 1 / dist;
        const radX = dxS * invDist;
        const radY = dyS * invDist;
        const tangX = -radY;
        const tangY = radX;
        const radialBurst = disperse * (4.5 + cellSeed * 19.5) * (0.6 + dist / 14);
        const swirl = disperse * (3.5 + cellSeed * 7.5);
        drawC = c + radX * radialBurst + tangX * swirl;
        drawR = r + radY * radialBurst + tangY * swirl;
        cellAlpha *= 1 - disperse * (0.55 + cellSeed * 0.42);
      }

      if (
        cellAlpha <= 0.02 ||
        drawC < 0 ||
        drawC > cols - 1 ||
        drawR < 0 ||
        drawR > rows - 1
      ) {
        continue;
      }

      let gx = drawC * cellSize + cellSize * 0.5;
      let gy = drawR * cellSize + cellSize * 0.5;

      // Interactive cursor magnifier & repulsion for the middle star
      let isCursorNear = false;
      let cursorExcitement = 0;
      if (cursorLogicalX > -100 && cursorLogicalY > -100) {
        const distToCursor = Math.hypot(gx - cursorLogicalX, gy - cursorLogicalY);
        const cursorRadius = 82;
        if (distToCursor < cursorRadius) {
          isCursorNear = true;
          const normDist = distToCursor / cursorRadius;
          cursorExcitement = Math.pow(1 - normDist, 1.6);

          // Magnifier lens push / spherical bulge
          const repelAngle = Math.atan2(gy - cursorLogicalY, gx - cursorLogicalX);
          const pushDist = (1 - normDist) * 15.0;
          gx += Math.cos(repelAngle) * pushDist;
          gy += Math.sin(repelAngle) * pushDist;
        }
      }

      const cycleOffset =
        dist > 2.2 && val < 0.85
          ? Math.round(Math.sin(elapsedSec * 5.2 + c * 0.8 + r * 0.6) * 0.7)
          : 0;
      const dispersedVal = disperse > 0.2 ? val * (1 - disperse * 0.55) : val;
      let ci = Math.min(
        ASCII_RAMP.length - 1,
        Math.max(
          1,
          Math.round(dispersedVal * (ASCII_RAMP.length - 1)) + cycleOffset,
        ),
      );

      if (isCursorNear) {
        ci = Math.min(
          ASCII_RAMP.length - 1,
          ci + Math.floor(cursorExcitement * 4 + 1),
        );
        const fontSz = 10.5 + cursorExcitement * 7.5;
        ctx.font = `700 ${fontSz.toFixed(1)}px ${monoFont}`;
        ctx.fillStyle = cursorExcitement > 0.5 ? "#FFFFFF" : dxS < 0 ? "#BAE6FD" : "#FEF3C7";
        ctx.globalAlpha = Math.min(1, cellAlpha + cursorExcitement * 0.5);
      } else {
        ctx.font = `600 10.5px ${monoFont}`;
        ctx.globalAlpha = cellAlpha;
        if (dist < 2.8 && val > 0.68 && disperse < 0.55) {
          ctx.fillStyle = "#FFFFFF";
        } else if (dxS < -1.8) {
          ctx.fillStyle =
            val > 0.66 && bevel >= 0.9
              ? "#E0F2FE"
              : val > 0.42
                ? "#38BDF8"
                : "#0284C7";
        } else if (dxS > 1.8) {
          ctx.fillStyle =
            val > 0.66 && bevel >= 0.9
              ? "#FEF3C7"
              : val > 0.42
                ? "#E5A93C"
                : "#B45309";
        } else {
          ctx.fillStyle =
            val > 0.66 ? "#F8FAFC" : val > 0.4 ? "#CBD5E1" : "#64748B";
        }
      }

      ctx.fillText(ASCII_RAMP[ci], gx, gy);
    }
  }

  ctx.globalAlpha = 1;

  // 2. Orbiting dashed ASCII corona ring around the star
  const coronaFade = (1 - disperse) * clamp01((starEntry - 0.35) / 0.5);
  if (coronaFade > 0.04) {
    const coronaCount = 24;
    const coronaRadius = 15.8 + 0.75 * Math.sin(elapsedSec * 2.1) + scrollFlare * 3.2;
    for (let i = 0; i < coronaCount; i++) {
      const ang = (i * Math.PI * 2) / coronaCount + elapsedSec * 0.36;
      const bc = Math.round(sparkCenterCol + Math.cos(ang) * coronaRadius);
      const br = Math.round(sparkCenterRow + Math.sin(ang) * coronaRadius);
      if (bc < 2 || bc > cols - 3 || br < 1 || br > rows - 2) continue;

      const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(elapsedSec * 3.8 + i * 0.9));
      ctx.globalAlpha = coronaFade * twinkle * 0.55;
      ctx.fillStyle =
        bc < sparkCenterCol - 2
          ? "#38BDF8"
          : bc > sparkCenterCol + 2
            ? "#E5A93C"
            : "#94A3B8";
      ctx.fillText(i % 3 === 0 ? ":" : "·", bc * cellSize + cellSize * 0.5, br * cellSize + cellSize * 0.5);
    }
    ctx.globalAlpha = 1;
  }

  // 3. Entry convergence shockwave & Scroll supernova shockwave
  if (entryProgress > 0.52 && entryProgress < 1) {
    const shockU = clamp01((entryProgress - 0.52) / 0.48);
    drawShockwaveRing(ctx, 3 + shockU * 23, (1 - shockU) * 0.82, 1.0);
  }
  if (scrollProgress > 0.08 && scrollProgress < 0.96) {
    const scrollShockU = clamp01((scrollProgress - 0.08) / 0.85);
    drawShockwaveRing(
      ctx,
      4 + scrollShockU * 34,
      Math.sin(scrollShockU * Math.PI) * 0.85,
      1.6,
    );
  }

  // 4. Outward expanding starburst sparks around the star (accelerates on scroll)
  const sparkFade = clamp01(starEntry * 1.3) * (1 - smoothstep(clamp01((scrollProgress - 0.65) / 0.35)) * 0.85);
  if (sparkFade > 0.02) {
    const speedBoost = 1 + scrollFlare * 1.4;
    for (let b = 0; b < BURST_RAYS.length; b++) {
      const ray = BURST_RAYS[b];
      const maxRad = ray.maxRadius * (1 + scrollFlare * 0.6);
      const progress =
        ((elapsedSec * ray.speed * speedBoost + ray.phaseOffset) % maxRad) / maxRad;
      const rad = 4.0 + progress * (maxRad - 4.0);
      const ang = ray.angleOffset + rot * 0.65;
      const bc = Math.round(sparkCenterCol + Math.cos(ang) * rad);
      const br = Math.round(sparkCenterRow + Math.sin(ang) * rad);

      if (bc < 1 || bc > cols - 2 || br < 1 || br > rows - 2) continue;

      const gx = bc * cellSize + cellSize * 0.5;
      const gy = br * cellSize + cellSize * 0.5;
      const alpha = Math.sin(progress * Math.PI) * 0.88 * sparkFade;
      const ch = progress < 0.33 ? "*" : progress < 0.68 ? "+" : ":";

      ctx.globalAlpha = Math.max(0.06, alpha);
      ctx.fillStyle =
        bc < sparkCenterCol - 2
          ? "#7DD3FC"
          : bc > sparkCenterCol + 2
            ? "#FDE68A"
            : "#F1F5F9";
      ctx.fillText(ch, gx, gy);
    }
    ctx.globalAlpha = 1;
  }
}

export function HeroAsciiHands({ altText }: HeroAsciiHandsProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    const startMs = performance.now();
    let prevMs = startMs;

    const computeTargetScroll = () => {
      const section = container.closest("section") ?? container;
      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(720, rect.height * 1.15);
      const scrolledPastTop = Math.max(0, -rect.top);
      return clamp01(scrolledPastTop / scrollRange);
    };

    let targetScroll = computeTargetScroll();
    let smoothScroll = targetScroll;

    const resolveFontFamily = () => {
      const computed = window.getComputedStyle(canvas).fontFamily;
      return computed && computed.trim().length > 0
        ? computed
        : '"JetBrains Mono", ui-monospace, monospace';
    };

    let monoFont = resolveFontFamily();

    const syncCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      monoFont = resolveFontFamily();
    };

    const drawFrame = (elapsedSec: number, scrollProgress: number) => {
      if (width <= 0 || height <= 0) return;

      const scale = Math.min(width / LOGICAL_W, height / LOGICAL_H);
      const offsetX = (width - LOGICAL_W * scale) * 0.5;
      const offsetY = (height - LOGICAL_H * scale) * 0.5;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      const {
        cellSize,
        sparkCenterCol,
        sparkCenterRow,
        robotTipCol,
        robotTipRow,
        humanTipCol,
        humanTipRow,
      } = HERO_ASCII_GRID;

      const sparkX = sparkCenterCol * cellSize + cellSize * 0.5;
      const sparkY = sparkCenterRow * cellSize + cellSize * 0.5;
      const pulseBreathe = 0.5 + 0.5 * Math.sin(elapsedSec * 2.4);

      const entryProgress = clamp01(elapsedSec / ENTRY_HAND_DURATION_SEC);
      const handEntryEase = easeOutQuart(entryProgress);
      const starEntry = clamp01(
        (elapsedSec - ENTRY_STAR_DELAY_SEC) / ENTRY_STAR_DURATION_SEC,
      );

      const scrollEase = smoothstep(scrollProgress);
      const scrollFlare = Math.sin(clamp01(scrollProgress / 0.52) * Math.PI * 0.5);
      const glowIntensity =
        clamp01(starEntry * 1.25) *
        (1 - smoothstep(clamp01((scrollProgress - 0.65) / 0.35)) * 0.85);

      // 1. Soft atmospheric radial glows behind the middle star
      drawAtmosphericGlows(
        ctx,
        sparkX,
        sparkY,
        pulseBreathe,
        glowIntensity,
        scrollFlare,
      );

      ctx.font = `600 10.5px ${monoFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 0;

      // Compute dynamic hand offsets: entry from outer sides -> gentle idle poise -> scroll-out retraction
      const settledWeight = handEntryEase * (1 - scrollEase);
      const robotHoverCol = settledWeight * Math.sin(elapsedSec * 1.15) * 0.45;
      const robotHoverRow =
        settledWeight * Math.sin(elapsedSec * 0.85 + 0.6) * 0.3;
      const humanHoverCol =
        settledWeight * Math.sin(elapsedSec * 1.15 + Math.PI) * 0.45;
      const humanHoverRow =
        settledWeight * Math.sin(elapsedSec * 0.85 + Math.PI + 0.6) * 0.3;

      const robotOffsetCol =
        -(1 - handEntryEase) * HAND_ENTRY_OFFSET_COL -
        scrollEase * HAND_SCROLL_OFFSET_COL +
        robotHoverCol;
      const robotOffsetRow =
        -(1 - handEntryEase) * HAND_ENTRY_OFFSET_ROW -
        scrollEase * HAND_SCROLL_OFFSET_ROW +
        robotHoverRow;

      const humanOffsetCol =
        (1 - handEntryEase) * HAND_ENTRY_OFFSET_COL +
        scrollEase * HAND_SCROLL_OFFSET_COL +
        humanHoverCol;
      const humanOffsetRow =
        (1 - handEntryEase) * HAND_ENTRY_OFFSET_ROW +
        scrollEase * HAND_SCROLL_OFFSET_ROW +
        humanHoverRow;

      // Convert global cursor coordinates to canvas logical coordinates
      const cursor = typeof window !== "undefined" ? window.__portfolioCursor : undefined;
      let cursorLogicalX = -500;
      let cursorLogicalY = -500;
      if (cursor && cursor.active) {
        const rect = canvas.getBoundingClientRect();
        const canvasX = cursor.x - rect.left;
        const canvasY = cursor.y - rect.top;
        if (canvasX >= 0 && canvasX <= width && canvasY >= 0 && canvasY <= height) {
          cursorLogicalX = (canvasX - offsetX) / scale;
          cursorLogicalY = (canvasY - offsetY) / scale;
        }
      }

      // 2. Render both ASCII hands with entry convergence, living wave, scroll retraction & cursor magnifier
      drawHandCells(
        ctx,
        elapsedSec,
        entryProgress,
        scrollProgress,
        robotOffsetCol,
        robotOffsetRow,
        humanOffsetCol,
        humanOffsetRow,
        cursorLogicalX,
        cursorLogicalY,
        monoFont,
      );

      // 3. Render animated signal pulses connecting dynamic fingertips <-> center star
      drawFingertipBridges(
        ctx,
        elapsedSec,
        entryProgress,
        scrollProgress,
        robotTipCol + robotOffsetCol,
        robotTipRow + robotOffsetRow,
        humanTipCol + humanOffsetCol,
        humanTipRow + humanOffsetRow,
        cursorLogicalX,
        cursorLogicalY,
        monoFont,
      );

      // 4. Render dynamically rotating, blooming, sparking, scroll-reactive ASCII Star & interactive cursor magnifier
      drawAnimatedStar(
        ctx,
        elapsedSec,
        starEntry,
        entryProgress,
        scrollProgress,
        pulseBreathe,
        cursorLogicalX,
        cursorLogicalY,
        monoFont,
      );

      // 5. Holographic interactive Magnifier Lens Ring around cursor
      if (cursorLogicalX > -100 && cursorLogicalY > -100) {
        const lensRadius = 82;
        const lensGrad = ctx.createRadialGradient(
          cursorLogicalX,
          cursorLogicalY,
          0,
          cursorLogicalX,
          cursorLogicalY,
          lensRadius,
        );
        lensGrad.addColorStop(0, "rgba(56, 189, 248, 0.08)");
        lensGrad.addColorStop(0.75, "rgba(255, 255, 255, 0.03)");
        lensGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = lensGrad;
        ctx.beginPath();
        ctx.arc(cursorLogicalX, cursorLogicalY, lensRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cursorLogicalX, cursorLogicalY, lensRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Subtle precision crosshair ticks
        ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(cursorLogicalX, cursorLogicalY - lensRadius - 4);
        ctx.lineTo(cursorLogicalX, cursorLogicalY - lensRadius + 3);
        ctx.moveTo(cursorLogicalX, cursorLogicalY + lensRadius - 3);
        ctx.lineTo(cursorLogicalX, cursorLogicalY + lensRadius + 4);
        ctx.moveTo(cursorLogicalX - lensRadius - 4, cursorLogicalY);
        ctx.lineTo(cursorLogicalX - lensRadius + 3, cursorLogicalY);
        ctx.moveTo(cursorLogicalX + lensRadius - 3, cursorLogicalY);
        ctx.lineTo(cursorLogicalX + lensRadius + 4, cursorLogicalY);
        ctx.stroke();
      }

      ctx.restore();
    };

    const handleScroll = () => {
      targetScroll = computeTargetScroll();
    };

    syncCanvasSize();
    drawFrame(0, smoothScroll);

    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
      targetScroll = computeTargetScroll();
      drawFrame((performance.now() - startMs) / 1000, smoothScroll);
    });
    resizeObserver.observe(container);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    let fontsCancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (fontsCancelled) return;
        monoFont = resolveFontFamily();
        drawFrame((performance.now() - startMs) / 1000, smoothScroll);
      });
    }

    const tick = (nowMs: number) => {
      const dtSec = Math.min(0.1, Math.max(0.001, (nowMs - prevMs) / 1000));
      prevMs = nowMs;

      // Weighted, ultra-smooth inertia for slow immersive scroll scrubbing
      const lerpAlpha = 1 - Math.exp(-dtSec * 3.6);
      smoothScroll += (targetScroll - smoothScroll) * lerpAlpha;
      if (Math.abs(targetScroll - smoothScroll) < 0.0005) {
        smoothScroll = targetScroll;
      }

      drawFrame((nowMs - startMs) / 1000, smoothScroll);
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      fontsCancelled = true;
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <VStack
      ref={containerRef}
      role="img"
      aria-label={altText}
      className="pointer-events-none relative mx-auto aspect-[1296/504] w-full max-w-[1380px] select-none overflow-hidden lg:max-h-[55svh]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full font-mono"
      />
    </VStack>
  );
}
