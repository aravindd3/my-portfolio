"use client";

import { useEffect } from "react";

export function CustomPointerMagnifier() {
  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      // Broadcast mouse coordinates to window for ASCII Canvas interactive magnifier
      window.__portfolioCursor = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const onMouseLeave = () => {
      window.__portfolioCursor = { x: -500, y: -500, active: false };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      delete window.__portfolioCursor;
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    __portfolioCursor?: {
      x: number;
      y: number;
      active: boolean;
    };
  }
}
