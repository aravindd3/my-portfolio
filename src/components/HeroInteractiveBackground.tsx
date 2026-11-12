"use client";

import { useEffect, useRef } from "react";

interface CircuitNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  baseAlpha: number;
  pulsePhase: number;
}

interface SignalPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

const NODE_COLORS = [
  { fill: "#38BDF8", glow: "rgba(56, 189, 248, 0.45)" }, // Starlight Cyan
  { fill: "#E5A93C", glow: "rgba(229, 169, 60, 0.45)" }, // Hardware Copper
  { fill: "#F8FAFC", glow: "rgba(248, 250, 252, 0.35)" }, // Pure Silver White
  { fill: "#10B981", glow: "rgba(16, 185, 129, 0.40)" }, // Signal Green
];

const GRID_SPACING = 38;
const MAX_CONNECTION_DIST = 115;
const MOUSE_INFLUENCE_DIST = 175;

export function HeroInteractiveBackground() {
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

    // Mouse coordinates with smooth interpolation
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let currentMouseX = -9999;
    let currentMouseY = -9999;

    let nodes: CircuitNode[] = [];
    let packets: SignalPacket[] = [];
    let packetTimer = 0;

    const buildNodes = (w: number, h: number) => {
      const count = Math.max(32, Math.min(68, Math.floor((w * h) / 18000)));
      const next: CircuitNode[] = [];

      for (let i = 0; i < count; i++) {
        const colorSet =
          NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)];
        const speed = 0.25 + Math.random() * 0.45;
        const angle = Math.random() * Math.PI * 2;

        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.2 + Math.random() * 1.4,
          color: colorSet.fill,
          glowColor: colorSet.glow,
          baseAlpha: 0.35 + Math.random() * 0.4,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      nodes = next;
      packets = [];
    };

    const syncSize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width <= 0 || height <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      buildNodes(width, height);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    // IntersectionObserver to pause when not in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    // Spawn telemetry pulse packets along active connections
    const maybeSpawnPacket = (connections: [number, number][]) => {
      if (connections.length === 0 || packets.length > 12) return;
      const [from, to] =
        connections[Math.floor(Math.random() * connections.length)];
      packets.push({
        fromNode: from,
        toNode: to,
        progress: 0,
        speed: 0.9 + Math.random() * 1.1,
        color: Math.random() < 0.6 ? "#E5A93C" : "#38BDF8",
      });
    };

    const render = (nowMs: number) => {
      if (!isVisible) {
        rafId = window.requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((nowMs - prevMs) / 1000, 0.1);
      prevMs = nowMs;

      // Smooth mouse lerp
      if (targetMouseX > -5000) {
        if (currentMouseX < -5000) {
          currentMouseX = targetMouseX;
          currentMouseY = targetMouseY;
        } else {
          currentMouseX += (targetMouseX - currentMouseX) * 0.12;
          currentMouseY += (targetMouseY - currentMouseY) * 0.12;
        }
      } else {
        currentMouseX = -9999;
        currentMouseY = -9999;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 1. Interactive Cursor Ambient Spotlight Glow
      // -----------------------------------------------------------------------
      if (currentMouseX > 0 && currentMouseY > 0) {
        const spotRadius = Math.min(width, height) * 0.48;
        const spot = ctx.createRadialGradient(
          currentMouseX,
          currentMouseY,
          0,
          currentMouseX,
          currentMouseY,
          spotRadius,
        );
        spot.addColorStop(0, "rgba(229, 169, 60, 0.085)"); // Subtle copper core
        spot.addColorStop(0.35, "rgba(56, 189, 248, 0.045)"); // Starlight cyan mid
        spot.addColorStop(0.7, "rgba(15, 23, 42, 0.02)");
        spot.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, width, height);
      }

      // -----------------------------------------------------------------------
      // 2. Hardware CAD Blueprint Dot Grid (revealed near cursor & subtle elsewhere)
      // -----------------------------------------------------------------------
      const startX = (width % GRID_SPACING) / 2;
      const startY = (height % GRID_SPACING) / 2;

      for (let gx = startX; gx < width; gx += GRID_SPACING) {
        for (let gy = startY; gy < height; gy += GRID_SPACING) {
          let alpha = 0.08;

          if (currentMouseX > 0) {
            const dx = gx - currentMouseX;
            const dy = gy - currentMouseY;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < MOUSE_INFLUENCE_DIST * 1.5) {
              const boost = 1 - d / (MOUSE_INFLUENCE_DIST * 1.5);
              alpha += boost * 0.22;
            }
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillRect(gx - 0.75, gy - 0.75, 1.5, 1.5);
        }
      }

      // -----------------------------------------------------------------------
      // 3. Update Nodes & Calculate Circuit Bus Connections
      // -----------------------------------------------------------------------
      const activeConnections: [number, number][] = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

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

          // Subtle gentle magnetic repulsion if mouse gets too close
          if (currentMouseX > 0) {
            const mdx = n.x - currentMouseX;
            const mdy = n.y - currentMouseY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 80 && mdist > 2) {
              const force = (1 - mdist / 80) * 0.45;
              n.x += (mdx / mdist) * force;
              n.y += (mdy / mdist) * force;
            }
          }
        }

        // Draw node-to-node circuit traces
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_CONNECTION_DIST) {
            activeConnections.push([i, j]);
            let connAlpha = (1 - dist / MAX_CONNECTION_DIST) * 0.22;

            // Brighten if near cursor
            if (currentMouseX > 0) {
              const midX = (n.x + m.x) / 2;
              const midY = (n.y + m.y) / 2;
              const cursorDist = Math.hypot(
                midX - currentMouseX,
                midY - currentMouseY,
              );
              if (cursorDist < MOUSE_INFLUENCE_DIST) {
                connAlpha +=
                  (1 - cursorDist / MOUSE_INFLUENCE_DIST) * 0.42;
              }
            }

            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${Math.min(connAlpha, 0.7)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Connect nodes directly to cursor if within range
        if (currentMouseX > 0) {
          const mdx = n.x - currentMouseX;
          const mdy = n.y - currentMouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < MOUSE_INFLUENCE_DIST) {
            const cursorAlpha = (1 - mdist / MOUSE_INFLUENCE_DIST) * 0.48;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(currentMouseX, currentMouseY);
            ctx.strokeStyle = `rgba(229, 169, 60, ${cursorAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // -----------------------------------------------------------------------
      // 4. Signal Pulse Packets traveling on traces (Telemetry Simulation)
      // -----------------------------------------------------------------------
      if (!prefersReducedMotion) {
        packetTimer += dt;
        if (packetTimer > 0.45) {
          packetTimer = 0;
          maybeSpawnPacket(activeConnections);
        }

        for (let pIdx = packets.length - 1; pIdx >= 0; pIdx--) {
          const p = packets[pIdx];
          p.progress += dt * p.speed;

          if (p.progress >= 1 || !nodes[p.fromNode] || !nodes[p.toNode]) {
            packets.splice(pIdx, 1);
            continue;
          }

          const from = nodes[p.fromNode];
          const to = nodes[p.toNode];
          const px = from.x + (to.x - from.x) * p.progress;
          const py = from.y + (to.y - from.y) * p.progress;

          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // -----------------------------------------------------------------------
      // 5. Render Circuit Nodes (Dots with subtle glow)
      // -----------------------------------------------------------------------
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let alpha = n.baseAlpha;

        // Brighten node when near mouse
        if (currentMouseX > 0) {
          const d = Math.hypot(n.x - currentMouseX, n.y - currentMouseY);
          if (d < MOUSE_INFLUENCE_DIST) {
            alpha += (1 - d / MOUSE_INFLUENCE_DIST) * 0.55;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = Math.min(alpha, 1);
        ctx.shadowColor = n.glowColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      rafId = window.requestAnimationFrame(render);
    };

    syncSize();
    rafId = window.requestAnimationFrame(render);

    window.addEventListener("resize", syncSize, { passive: true });

    return () => {
      window.removeEventListener("resize", syncSize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}
