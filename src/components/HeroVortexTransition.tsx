"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AppIcon } from "./AppIcon";

/**
 * HeroVortexTransition:
 * The cinematic gravitational vortex transition bridging Slide 1 (Personal Introduction)
 * and Slide 2 (Technical Philosophy & Embedded Core).
 *
 * Incorporates the ultra-realistic top-down gravitational funnel with the lone observer
 * poised at the precipice edge, serving as the visual event-horizon gateway as the visitor
 * scrolls from the personal introduction down into the embedded systems architecture.
 */
export function HeroVortexTransition() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = 0;

    const handleScroll = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate progress of the transition through the viewport (0 to 1)
      const progress = Math.max(
        0,
        Math.min(1, (windowH - rect.top) / (windowH + rect.height)),
      );
      setScrollProgress(progress);
    };

    handleScroll();

    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Subtle scroll-driven scale and parallax depth
  const scale = 1.0 + scrollProgress * 0.05;
  const translateY = (scrollProgress - 0.5) * -30;

  return (
    <section
      id="vortex-transition"
      ref={containerRef}
      aria-label="Gravitational event horizon transition"
      className="relative w-full min-h-[80vh] sm:min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-[#020306] px-4 pt-28 pb-16 sm:pt-32 sm:pb-20 select-none"
    >
      {/* Top Transition HUD Label */}
      <VStack
        hAlign="center"
        gap={2}
        className="relative z-20 mb-3 sm:mb-6 text-center opacity-75 transition-opacity duration-300 hover:opacity-100"
      >
        <HStack gap={2} vAlign="center">
          <span className="size-1.5 rounded-full bg-copper shadow-[0_0_8px_var(--accent-copper)] animate-pulse" />
          <Text
            type="code"
            size="xsm"
            className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-secondary"
          >
            TRANSITION // EVENT HORIZON DESCENT
          </Text>
          <span className="size-1.5 rounded-full bg-copper shadow-[0_0_8px_var(--accent-copper)] animate-pulse" />
        </HStack>
        <Text
          type="code"
          size="xsm"
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted"
        >
          Crossing into Bare-Metal Architecture
        </Text>
      </VStack>

      {/* Main Ultra-Realistic Cosmic Vortex Portal */}
      <div
        className="relative w-full max-w-4xl lg:max-w-5xl h-[380px] sm:h-[500px] md:h-[620px] transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
        }}
      >
        {/* Seamless Radial Starlight Gradient Mask:
            Fades the black edges of the photograph 100% invisibly into the #020306 void background */}
        <div
          className="relative h-full w-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 68% 58% at 50% 50%, black 36%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 68% 58% at 50% 50%, black 36%, transparent 78%)",
          }}
        >
          <Image
            src="/images/blackhole-vortex.jpg"
            alt="Ultra-realistic top-down gravitational vortex with lone observer perched on the event horizon precipice"
            fill
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-contain object-center drop-shadow-[0_0_80px_rgba(255,255,255,0.06)]"
            priority
          />
        </div>

        {/* Ambient Throat Glow: subtle radial starlight aura emanating from the glowing throat */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(186,230,253,0.12)_0%,rgba(2,3,6,0)_50%)]" />
      </div>

      {/* Bottom Descent Guide: Leads directly into the Technical Slide */}
      <Link
        href="#hero-technical"
        isStandalone
        aria-label="Descend through event horizon into technical core"
        className="group relative z-20 mt-4 sm:mt-6 flex flex-col items-center gap-2.5 no-underline opacity-80 transition-all duration-300 hover:opacity-100 focus-visible:outline-offset-4"
      >
        <Text
          type="code"
          size="xsm"
          className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-secondary transition-colors duration-200 group-hover:text-copper"
        >
          ENTER TECHNICAL CORE
        </Text>
        <HStack
          as="span"
          hAlign="center"
          vAlign="center"
          className="size-8 rounded-full border border-white/20 bg-black/60 text-secondary backdrop-blur-sm shadow-[0_0_16px_rgba(255,255,255,0.1)] transition-all duration-300 group-hover:translate-y-1 group-hover:border-copper/50 group-hover:bg-copper/15 group-hover:text-copper"
        >
          <AppIcon name="chevron-down" size="sm" color="inherit" />
        </HStack>
        <HStack
          as="span"
          className="h-10 w-px bg-gradient-to-b from-white/30 via-copper/60 to-transparent transition-all duration-300 group-hover:h-14 group-hover:via-white"
        />
      </Link>
    </section>
  );
}
