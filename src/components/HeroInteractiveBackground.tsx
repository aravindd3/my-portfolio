"use client";

import { useEffect, useRef } from "react";

interface CircuitNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
}

interface SignalPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

const NODE_PALETTE = [
  "rgba(229, 169, 60, 0.45)", // Hardware Copper
  "rgba(148, 163, 184, 0.35)", // Slate
  "rgba(56, 189, 248, 0.32)", // Muted Cyan
];

const GRID_SPACING = 52;
const MAX_CONNECTION_DIST = 92;
const MOUSE_RADIUS = 150;

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

    // Smooth mouse coordinates
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let currentMouseX = -9999;
    let currentMouseY = -9999;

    let nodes: CircuitNode[] = [];
    let packets: SignalPacket[] = [];
    let packetTimer = 0;

    const buildNodes = (w: number, h: number) => {
      // Subdued density: 24 to 38 nodes max across the entire canvas
      const count = Math.max(20, Math.min(36, Math.floor((w * h) / 32000)));
      const next: CircuitNode[] = [];

      for (let i = 0; i < count; i++) {
        const color =
          NODE_PALETTE[Math.floor(Math.random() * NODE_PALETTE.length)];
        const speed = 0.12 + Math.random() * 0.22;
        const angle = Math.random() * Math.PI * 2;

        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 0.85 + Math.random() * 0.55,
          color,
          baseAlpha: 0.18 + Math.random() * 0.2,
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    const maybeSpawnPacket = (connections: [number, number][]) => {
      if (connections.length === 0 || packets.length > 3) return;
      const [from, to] =
        connections[Math.floor(Math.random() * connections.length)];
      packets.push({
        fromNode: from,
        toNode: to,
        progress: 0,
        speed: 0.5 + Math.random() * 0.6,
      });
    };

    const render = (nowMs: number) => {
      if (!isVisible) {
        rafId = window.requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((nowMs - prevMs) / 1000, 0.1);
      prevMs = nowMs;

      // Smooth mouse easing
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

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 1. Whisper-Quiet Ambient Spotlight (Non-flashy, dark warmth)
      // -----------------------------------------------------------------------
      if (currentMouseX > 0 && currentMouseY > 0) {
        const spotRadius = Math.min(width, height) * 0.38;
        const spot = ctx.createRadialGradient(
          currentMouseX,
          currentMouseY,
          0,
          currentMouseX,
          currentMouseY,
          spotRadius,
        );
        spot.addColorStop(0, "rgba(229, 169, 60, 0.038)"); // Extremely faint copper warmth
        spot.addColorStop(0.5, "rgba(20, 28, 42, 0.02)");
        spot.addColorStop(1, "rgba(2, 3, 6, 0)");

        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, width, height);
      }

      // -----------------------------------------------------------------------
      // 2. Etched CAD Blueprint Dot Grid (Faint, high-precision dark matrix)
      // -----------------------------------------------------------------------
      const startX = (width % GRID_SPACING) / 2;
      const startY = (height % GRID_SPACING) / 2;

      for (let gx = startX; gx < width; gx += GRID_SPACING) {
        for (let gy = startY; gy < height; gy += GRID_SPACING) {
          let alpha = 0.022;

          if (currentMouseX > 0) {
            const dx = gx - currentMouseX;
            const dy = gy - currentMouseY;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < MOUSE_RADIUS * 1.2) {
              const boost = 1 - d / (MOUSE_RADIUS * 1.2);
              alpha += boost * 0.045;
            }
          }

          ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
          ctx.fillRect(gx - 0.5, gy - 0.5, 1, 1);
        }
      }

      // -----------------------------------------------------------------------
      // 3. Update Nodes & Render Subtle PCB Trace Lines
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

          // Gentle magnetic drift away from cursor
          if (currentMouseX > 0) {
            const mdx = n.x - currentMouseX;
            const mdy = n.y - currentMouseY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 70 && mdist > 2) {
              const force = (1 - mdist / 70) * 0.25;
              n.x += (mdx / mdist) * force;
              n.y += (mdy / mdist) * force;
            }
          }
        }

        // Draw subtle node-to-node circuit traces
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_CONNECTION_DIST) {
            activeConnections.push([i, j]);
            let connAlpha = (1 - dist / MAX_CONNECTION_DIST) * 0.12;

            if (currentMouseX > 0) {
              const midX = (n.x + m.x) / 2;
              const midY = (n.y + m.y) / 2;
              const cursorDist = Math.hypot(
                midX - currentMouseX,
                midY - currentMouseY,
              );
              if (cursorDist < MOUSE_RADIUS) {
                connAlpha += (1 - cursorDist / MOUSE_RADIUS) * 0.08;
              }
            }

            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${Math.min(connAlpha, 0.16)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // -----------------------------------------------------------------------
      // 4. Sparse Micro Signal Packets
      // -----------------------------------------------------------------------
      if (!prefersReducedMotion) {
        packetTimer += dt;
        if (packetTimer > 2.2) {
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
          ctx.arc(px, py, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(229, 169, 60, 0.55)";
          ctx.fill();
        }
      }

      // -----------------------------------------------------------------------
      // 5. Render Circuit Nodes (Delicate micro-vias)
      // -----------------------------------------------------------------------
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let alpha = n.baseAlpha;

        if (currentMouseX > 0) {
          const d = Math.hypot(n.x - currentMouseX, n.y - currentMouseY);
          if (d < MOUSE_RADIUS) {
            alpha += (1 - d / MOUSE_RADIUS) * 0.25;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = Math.min(alpha, 0.55);
        ctx.fill();
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
      style={{
        maskImage:
          "radial-gradient(ellipse 85% 80% at 50% 50%, black 50%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 85% 80% at 50% 50%, black 50%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}
