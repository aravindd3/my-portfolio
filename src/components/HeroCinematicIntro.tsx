"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { HERO_EDITORIAL_DATA, PROFILE_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";
import { HeroAsciiHands } from "./HeroAsciiHands";

/* ──────────────────────────────────────────────────────────────────────────
 * SCROLL RUNWAY & PINNING CONFIGURATION
 * ──────────────────────────────────────────────────────────────────────── */

// 180vh runway provides ample room:
// p = 0.00 -> 0.35: Name pans out and dissolves away, background unblurs
// p = 0.35 -> 0.80: STAGED LOCK / PAUSE (2nd page in complete, stationary view)
// p = 0.80 -> 1.00: Smooth unpinning transition into Capabilities section
const SCROLL_RUNWAY_VH = 180;

const emptySubscribe = () => () => {};

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

/**
 * Award-Winning Cinematic Hero Experience:
 * 1. Initial State (scroll = 0):
 *    - Centralized, dramatic vignette with subtle background depth blur (20px).
 *    - "Hello! I'm" emerges with a warm luminous flow from the left.
 *    - "Aravind V S" reveals organically from left to right like liquid light from nothingness (no cursor).
 *    - Interactive Cursor Laser-Cut: Hovering over the name slices the typography in real-time
 *      with dual sheared halves and a glowing incision beam tracking the cursor Y coordinate.
 * 2. Scroll Down (Pan-Out & Disappear with Staged Pause):
 *    - Central name gently pans out and dissolves away completely (opacity -> 0) before hitting background texts.
 *    - Background blur melts away from 20px to 0px, revealing the punchline, living ASCII hands, and pills.
 *    - Blue & Yellow stars shine brightly through the transparent canvas.
 *    - Second page locks completely in view (p = 0.35 to 0.80) so the visitor sees it fully before scrolling on.
 * 3. Scroll Up (Pan-In & Re-Blur):
 *    - Reverses seamlessly: background smoothly re-blurs while the name slowly pans back into the center.
 */
export function HeroCinematicIntro() {
  const greeting = HERO_EDITORIAL_DATA.introGreeting;
  const fullName = HERO_EDITORIAL_DATA.introName;

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Key to re-trigger the flowy reveal animation on click
  const [animKey, setAnimKey] = useState(0);

  // ─── Interactive Cursor Laser-Cut / Slice State ───
  const [isLaserCutting, setIsLaserCutting] = useState(false);
  const [cutYPercent, setCutYPercent] = useState(50);
  const [cursorXOffset, setCursorXOffset] = useState(0);

  // ─── Scroll Progress (0 at top, 1 when runway exhausted) ───
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Click to replay animation anytime
  const handleReplay = useCallback(() => {
    setAnimKey((prev) => prev + 1);
  }, []);

  // ─── Cursor Laser Slice Event Handlers ───
  const handlePointerMove = (e: React.PointerEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.height <= 0) return;
    const yPct = clamp(((e.clientY - rect.top) / rect.height) * 100, 8, 92);
    const xPx = e.clientX - rect.left;
    setCutYPercent(yPct);
    setCursorXOffset(xPx);
    if (!isLaserCutting) setIsLaserCutting(true);
  };

  const handlePointerLeave = () => {
    setIsLaserCutting(false);
  };

  // ─── Scroll Progress Listener ───
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    let rafId = 0;

    const measureScroll = () => {
      rafId = 0;
      const rect = outer.getBoundingClientRect();
      const runwayPx = (window.innerHeight * SCROLL_RUNWAY_VH) / 100;
      const progress = clamp01(-rect.top / runwayPx);
      setScrollProgress(progress);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(measureScroll);
    };

    measureScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ─── Derived Interpolations ───
  const p = scrollProgress;

  // Background atmosphere interpolation:
  // Starts blurred (20px) at p = 0; completely sharp (0px) by p = 0.32
  const blurTransition = clamp01(p / 0.32);
  const visualP = easeOutQuad(blurTransition);
  const bgBlur = (20 * (1 - visualP)).toFixed(2); // 20px -> 0px
  const bgOpacity = (0.35 + 0.65 * visualP).toFixed(3); // 0.35 -> 1.0
  const bgScale = (0.96 + 0.04 * visualP).toFixed(3); // 0.96 -> 1.0

  // Central title pan-out & disappear interpolation:
  // Title dissolves to 0 opacity by p = 0.28, staying completely gone during the staged lock
  const titleExitProgress = clamp01(p / 0.28);
  const titleOpacity = clamp01(1 - titleExitProgress).toFixed(3);
  const titleScale = (1.0 - 0.1 * titleExitProgress).toFixed(3);
  const titleTranslateY = (-4 * titleExitProgress).toFixed(2);
  const titleBlur = (5 * titleExitProgress).toFixed(2);

  const isTitleInteractive = Number(titleOpacity) > 0.15;

  return (
    <VStack
      ref={outerRef}
      className="relative w-full"
      style={{
        // 100vh viewport + scroll runway
        height: `calc(100svh + ${SCROLL_RUNWAY_VH}vh)`,
      }}
    >
      {/* Pinned Sticky Viewport Canvas (Transparent so Blue & Yellow Stars show through) */}
      <VStack className="sticky top-0 left-0 w-full h-svh overflow-hidden bg-transparent">
        {/* ── BACKGROUND LAYER: Revealed ASCII Art, Punchline & Action Pills ── */}
        <VStack
          vAlign="between"
          hAlign="center"
          className="absolute inset-0 z-0 w-full h-full transform-gpu will-change-[filter,opacity,transform] px-4 pt-14 pb-6 sm:px-6 sm:pt-18 sm:pb-8"
          style={{
            filter: `blur(${bgBlur}px)`,
            opacity: bgOpacity,
            transform: `scale(${bgScale})`,
            pointerEvents: p > 0.28 ? "auto" : "none",
          }}
        >
          {/* Top Section: Engineering Punchline & Bio Focus */}
          <VStack gap={2} hAlign="center" className="relative z-10 w-full max-w-3xl text-center mx-auto pt-2 sm:pt-4">
            <Heading
              level={2}
              justify="center"
              className="max-w-[28ch] text-center font-brand text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em] text-primary"
            >
              <Text type="inherit" color="primary" className="inline">
                {HERO_EDITORIAL_DATA.punchline}{" "}
              </Text>
              <Text type="inherit" color="secondary" className="inline text-copper">
                {HERO_EDITORIAL_DATA.punchlineHighlight}
              </Text>
            </Heading>

            <Text
              type="body"
              justify="center"
              className="max-w-[54ch] text-center font-sans text-xs sm:text-sm leading-relaxed text-secondary drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            >
              {HERO_EDITORIAL_DATA.bioBrief}
            </Text>
          </VStack>

          {/* Center Stage: The Majestic ASCII Hands Art Canvas */}
          <VStack className="relative z-0 w-full my-auto -mt-1 sm:-mt-2">
            <HeroAsciiHands altText={HERO_EDITORIAL_DATA.asciiArtAlt} />
          </VStack>

          {/* Bottom Section: Action Channels (Pill Links Below ASCII Hands) & Sleek Explore Prompt */}
          <VStack
            gap={3}
            hAlign="center"
            className="relative z-10 w-full shrink-0 justify-end pb-2 sm:pb-4 pointer-events-auto transform-gpu"
          >
            {/* The 4 Action Pills with OG White LinkedIn & Immersive Resume */}
            <HStack
              wrap="wrap"
              gap={2}
              hAlign="center"
              vAlign="center"
              className="pt-1"
            >
              {/* GitHub Pill */}
              <Link
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                isStandalone
                display="block"
                className="group relative overflow-hidden rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,255,255,0.3)]"
              >
                <HStack
                  as="span"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <HStack as="span" gap={2} vAlign="center" className="relative z-10">
                  <AppIcon
                    name="folder-git"
                    size="sm"
                    className="transition-colors duration-200 group-hover:text-black"
                  />
                  <Text
                    type="inherit"
                    color="inherit"
                    className="tracking-wide transition-colors duration-200 group-hover:text-black"
                  >
                    Github
                  </Text>
                </HStack>
              </Link>

              {/* LinkedIn Pill with Official White Logo */}
              <Link
                href={PROFILE_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                isStandalone
                display="block"
                className="group relative overflow-hidden rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,255,255,0.3)]"
              >
                <HStack
                  as="span"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <HStack as="span" gap={2} vAlign="center" className="relative z-10">
                  <AppIcon
                    name="linkedin"
                    size="sm"
                    className="transition-colors duration-200 group-hover:text-black"
                  />
                  <Text
                    type="inherit"
                    color="inherit"
                    className="tracking-wide transition-colors duration-200 group-hover:text-black"
                  >
                    Linkedin
                  </Text>
                </HStack>
              </Link>

              {/* Instagram Pill */}
              {PROFILE_DATA.instagramUrl && (
                <Link
                  href={PROFILE_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  isStandalone
                  display="block"
                  className="group relative overflow-hidden rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,255,255,0.3)]"
                >
                  <HStack
                    as="span"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <HStack as="span" gap={2} vAlign="center" className="relative z-10">
                    <AppIcon
                      name="instagram"
                      size="sm"
                      className="transition-colors duration-200 group-hover:text-black"
                    />
                    <Text
                      type="inherit"
                      color="inherit"
                      className="tracking-wide transition-colors duration-200 group-hover:text-black"
                    >
                      Instagram
                    </Text>
                  </HStack>
                </Link>
              )}

              {/* Resume Pill: Unique & Immersive Styling */}
              <Link
                href={PROFILE_DATA.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                isStandalone
                display="block"
                className="group relative overflow-hidden rounded-full border border-copper/50 bg-copper/[0.09] px-4 py-2 font-mono text-xs text-copper no-underline shadow-[0_0_14px_rgba(229,169,60,0.15),inset_0_1px_0_rgba(229,169,60,0.3)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-copper hover:bg-copper hover:text-canvas hover:shadow-[0_0_26px_rgba(229,169,60,0.55)]"
              >
                <HStack
                  as="span"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-copper/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <HStack as="span" gap={2} vAlign="center" className="relative z-10">
                  <AppIcon
                    name="file-down"
                    size="sm"
                    className="text-copper transition-colors duration-200 group-hover:text-canvas"
                  />
                  <Text
                    type="inherit"
                    color="inherit"
                    className="tracking-wide font-medium text-copper transition-colors duration-200 group-hover:text-canvas"
                  >
                    Resume
                  </Text>
                  <HStack
                    as="span"
                    className="rounded bg-copper/20 px-1 py-0.2 font-mono text-[9px] font-bold tracking-wider text-copper transition-colors duration-200 group-hover:bg-black/30 group-hover:text-canvas"
                  >
                    PDF
                  </HStack>
                </HStack>
              </Link>
            </HStack>

            {/* Redesigned "Explore Projects": Architectural & Sleek (Not a Pill) */}
            <HStack hAlign="center" className="pt-2">
              <Link
                href={HERO_EDITORIAL_DATA.primaryCtaHref}
                isStandalone
                aria-label="Explore Projects"
                className="group relative inline-flex items-center gap-3 no-underline transition-all duration-300 focus-visible:outline-offset-4"
              >
                <HStack as="span" className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-white/25 group-hover:to-copper group-hover:w-10 transition-all duration-300" />
                <HStack as="span" gap={2} vAlign="center" className="font-mono text-xs uppercase tracking-[0.22em] text-secondary/80 group-hover:text-copper transition-colors">
                  <Text as="span" type="inherit" color="inherit">
                    {HERO_EDITORIAL_DATA.primaryCtaLabel}
                  </Text>
                  <AppIcon
                    name="arrow-right"
                    size="xsm"
                    className="text-copper transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </HStack>
                <HStack as="span" className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-white/25 group-hover:from-copper group-hover:w-10 transition-all duration-300" />
              </Link>
            </HStack>
          </VStack>
        </VStack>

        {/* ── FOREGROUND LAYER: Centered Flowy Name Intro with Cursor Laser-Cut ── */}
        <VStack
          vAlign="center"
          hAlign="center"
          className="absolute inset-0 z-20 transform-gpu will-change-[transform,opacity,filter] px-6 pointer-events-none"
          style={{
            transform: `scale(${titleScale}) translateY(${titleTranslateY}vh)`,
            opacity: titleOpacity,
            filter: `blur(${titleBlur}px)`,
            pointerEvents: isTitleInteractive ? "auto" : "none",
            display: Number(titleOpacity) <= 0.002 ? "none" : "flex",
          }}
        >
          <VStack
            key={animKey}
            gap={3}
            hAlign="center"
            role="button"
            tabIndex={0}
            onClick={handleReplay}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleReplay();
              }
            }}
            aria-label={`${greeting} ${fullName}`}
            className="group relative cursor-pointer select-none text-center max-w-4xl px-4 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-copper/70 focus-visible:ring-offset-8 focus-visible:ring-offset-black"
          >
            {/* Screen Reader Full Content */}
            <Text as="span" className="sr-only">
              {greeting} {fullName}
            </Text>

            {/* Line 1: "Hello! I'm" (Reveals from nothing left-to-right, no cursor) */}
            <HStack
              as="span"
              vAlign="center"
              hAlign="center"
              aria-hidden="true"
              className={`relative inline-flex items-center justify-center font-mono text-xs sm:text-sm md:text-base font-semibold tracking-[0.32em] uppercase text-copper ${
                isMounted ? "animate-flowy-greeting-ltr" : "opacity-0"
              }`}
            >
              <Text as="span" type="inherit" color="inherit">
                {greeting}
              </Text>
            </HStack>

            {/* Line 2: "Aravind V S" with Interactive Cursor Laser-Cut / Slice */}
            <Heading
              id="intro-heading"
              level={1}
              justify="center"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className={`relative text-center font-brand text-[clamp(2.75rem,8.5vw,5.75rem)] font-extrabold tracking-[-0.04em] leading-[1.04] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] ${
                isMounted ? "animate-flowy-ltr" : "opacity-0"
              }`}
            >
              {/* Normal display when not actively cutting */}
              <HStack
                as="span"
                vAlign="center"
                hAlign="center"
                aria-hidden="true"
                className={`relative inline-flex select-none items-center justify-center transition-opacity duration-150 ${
                  isLaserCutting ? "opacity-0" : "opacity-100"
                }`}
              >
                <Text as="span" type="inherit" color="inherit">
                  {fullName}
                </Text>
              </HStack>

              {/* Sliced Dual-Layer Laser-Cut (Active when hovering with cursor) */}
              {isLaserCutting && (
                <HStack
                  as="span"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 inline-flex items-center justify-center select-none"
                >
                  {/* Top Sliced Half: shifts slightly left */}
                  <HStack
                    as="span"
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out"
                    style={{
                      clipPath: `polygon(0 0, 100% 0, 100% ${cutYPercent}%, 0 ${cutYPercent}%)`,
                      transform: "translateX(-4px)",
                    }}
                  >
                    <Text as="span" type="inherit" color="inherit">
                      {fullName}
                    </Text>
                  </HStack>

                  {/* Bottom Sliced Half: shifts slightly right */}
                  <HStack
                    as="span"
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out"
                    style={{
                      clipPath: `polygon(0 ${cutYPercent}%, 100% ${cutYPercent}%, 100% 100%, 0 100%)`,
                      transform: "translateX(4px)",
                    }}
                  >
                    <Text as="span" type="inherit" color="inherit">
                      {fullName}
                    </Text>
                  </HStack>

                  {/* Laser Incision Beam at cursor Y */}
                  <HStack
                    as="span"
                    className="absolute inset-x-0 h-[1.5px] pointer-events-none"
                    style={{
                      top: `${cutYPercent}%`,
                      transform: "translateY(-50%)",
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(229,169,60,0.5) 20%, #ffffff 50%, rgba(229,169,60,0.5) 80%, transparent 100%)",
                      boxShadow:
                        "0 0 10px 2px rgba(229,169,60,0.8), 0 0 4px #ffffff",
                    }}
                  >
                    {/* Focal spark at cursor X */}
                    <HStack
                      as="span"
                      className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_3px_#E5A93C]"
                      style={{
                        left: `${cursorXOffset}px`,
                        top: "50%",
                      }}
                    />
                  </HStack>
                </HStack>
              )}
            </Heading>
          </VStack>
        </VStack>

        {/* ── SCROLL CUE: Invites Visitor to Experience the Pan-Out ── */}
        {p < 0.12 && (
          <VStack
            hAlign="center"
            className="absolute bottom-7 inset-x-0 z-30 pointer-events-none animate-[fadeInUp_0.8s_ease-out_both] transition-opacity duration-300"
            style={{
              opacity: (1 - p / 0.12).toFixed(2),
            }}
          >
            <HStack gap={3} vAlign="center" className="text-secondary/60">
              <HStack as="span" className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-white/20" />
              <Text
                type="code"
                size="xsm"
                className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-inherit"
              >
                Scroll to explore
              </Text>
              <HStack as="span" className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-white/20" />
            </HStack>
            <HStack as="span" hAlign="center" className="text-secondary/50 mt-1 animate-dynamic-arrow">
              <AppIcon name="chevron-down" size="sm" color="inherit" />
            </HStack>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}
