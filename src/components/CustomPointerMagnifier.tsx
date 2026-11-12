"use client";

import { useEffect, useRef, useState } from "react";

export function CustomPointerMagnifier() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest("a, button, [role='button'], input, textarea, canvas"),
        );
        setIsHovered(interactive);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const render = () => {
      // Smooth interpolation for follower ring
      const ease = 0.18;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* Precision inner focus point */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] transition-all duration-150 ease-out"
        style={{
          width: isHovered ? "4px" : "5px",
          height: isHovered ? "4px" : "5px",
          opacity: 0.95,
        }}
      />

      {/* Lagging hardware reticle & magnifier lens aura */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{
          width: isHovered ? "46px" : "32px",
          height: isHovered ? "46px" : "32px",
          borderColor: isHovered
            ? "rgba(56, 189, 248, 0.65)"
            : "rgba(255, 255, 255, 0.28)",
          backgroundColor: isHovered
            ? "rgba(56, 189, 248, 0.08)"
            : "rgba(255, 255, 255, 0.02)",
          boxShadow: isHovered
            ? "0 0 20px rgba(56, 189, 248, 0.22), inset 0 0 10px rgba(56, 189, 248, 0.12)"
            : "0 0 12px rgba(255, 255, 255, 0.08)",
          backdropFilter: isHovered ? "contrast(1.08) brightness(1.08)" : "none",
        }}
      >
        {/* Subtle crosshair ticks when hovering interactive controls */}
        {isHovered && (
          <>
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 h-1.5 w-0.5 bg-bus/80" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 h-1.5 w-0.5 bg-bus/80" />
            <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 h-0.5 w-1.5 bg-bus/80" />
            <span className="absolute right-0 top-1/2 translate-x-1 -translate-y-1/2 h-0.5 w-1.5 bg-bus/80" />
          </>
        )}
      </div>
    </div>
  );
}
