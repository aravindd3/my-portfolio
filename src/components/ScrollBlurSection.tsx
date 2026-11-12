"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollBlurSectionProps {
  children: ReactNode;
  className?: string;
  thresholdRatio?: number; // 0.5 = half of the screen
}

export function ScrollBlurSection({
  children,
  className = "",
  thresholdRatio = 0.52,
}: ScrollBlurSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = 0;

    const checkPosition = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const triggerY = window.innerHeight * thresholdRatio;

      // When the top of the section reaches above half the screen (or is already in view)
      if (rect.top <= triggerY) {
        setIsRevealed(true);
      } else {
        // Blur when it recedes below half screen
        setIsRevealed(false);
      }
    };

    checkPosition();

    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(checkPosition);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [thresholdRatio]);

  return (
    <div
      ref={containerRef}
      className={`transform-gpu transition-[filter,opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[filter,opacity,transform] ${
        isRevealed
          ? "opacity-100 blur-none translate-y-0 scale-100"
          : "opacity-30 blur-[7px] translate-y-5 scale-[0.985]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
