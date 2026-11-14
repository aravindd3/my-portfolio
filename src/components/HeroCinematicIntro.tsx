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
import { IBeamCursor } from "./IBeamCursor";

/* ──────────────────────────────────────────────────────────────────────────
 * TIMING & SCROLL CONFIGURATION
 * ──────────────────────────────────────────────────────────────────────── */

const GREETING_CHAR_SPEED_MS = 50; // Typing speed for "Hello! I'm"
const NAME_CHAR_SPEED_MS = 75; // Constant typing speed for "Aravind V S"
const LINE_PAUSE_MS = 180; // Breath between greeting line & name line
const COMPLETION_PAUSE_MS = 550; // Cursor rest & blink at end
const CURSOR_OUT_MS = 320; // Fade out duration for cursor

// Scroll runway: 100vh of scroll distance for the cinematic pan-out
const SCROLL_RUNWAY_VH = 100;

/* ──────────────────────────────────────────────────────────────────────── */

const emptySubscribe = () => () => {};

type TypingPhase =
  | "init"
  | "greeting-cursor"
  | "typing-greeting"
  | "greeting-pause"
  | "name-cursor"
  | "typing-name"
  | "completed"
  | "cursor-out"
  | "done";

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/**
 * Award-Winning Cinematic Hero Experience:
 * 1. Initial State (scroll = 0):
 *    - Centralized, dramatic vignette with heavy depth-of-field background blur (22px).
 *    - "Hello! I'm" types out in refined copper monospace script.
 *    - The custom I-beam cursor drops down and types "Aravind V S" large and centered at constant speed.
 *    - Cursor blinks with specular white/copper aura, then cleanly dissolves.
 * 2. Scroll Pan-Out (0 -> 100vh):
 *    - Camera pulls back: central title scales down and floats to the top header position.
 *    - Environmental blur melts away from 22px to 0px.
 *    - Leads directly to the live ASCII hands animation with the glowing embedded core.
 *    - Reveals the engineering punchline and the interactive frosted-glass pill links directly below the hands!
 */
export function HeroCinematicIntro() {
  const greeting = HERO_EDITORIAL_DATA.introGreeting;
  const fullName = HERO_EDITORIAL_DATA.introName;

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // ─── Typewriter State ───
  const [greetingLen, setGreetingLen] = useState(0);
  const [nameLen, setNameLen] = useState(0);
  const [phase, setPhase] = useState<TypingPhase>("init");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ─── Scroll Progress (0 at top, 1 when runway exhausted) ───
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const clearActiveTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const runTypingChoreography = useCallback(() => {
    clearActiveTimer();

    // Reset counters
    setGreetingLen(0);
    setNameLen(0);
    setPhase("init");

    // Step 1: Cursor emerges on greeting line
    timerRef.current = setTimeout(() => {
      setPhase("greeting-cursor");

      // Step 2: Type greeting ("Hello! I'm")
      timerRef.current = setTimeout(() => {
        setPhase("typing-greeting");

        let gCount = 0;
        const gTotal = greeting.length;

        const typeGreetingChar = () => {
          if (gCount < gTotal) {
            gCount += 1;
            setGreetingLen(gCount);

            if (gCount < gTotal) {
              timerRef.current = setTimeout(
                typeGreetingChar,
                GREETING_CHAR_SPEED_MS,
              );
            } else {
              // Step 3: Brief breath, cursor drops to name line
              setPhase("greeting-pause");
              timerRef.current = setTimeout(() => {
                setPhase("name-cursor");

                // Step 4: Type full name ("Aravind V S") at constant speed
                timerRef.current = setTimeout(() => {
                  setPhase("typing-name");

                  let nCount = 0;
                  const nTotal = fullName.length;

                  const typeNameChar = () => {
                    if (nCount < nTotal) {
                      nCount += 1;
                      setNameLen(nCount);

                      if (nCount < nTotal) {
                        timerRef.current = setTimeout(
                          typeNameChar,
                          NAME_CHAR_SPEED_MS,
                        );
                      } else {
                        // Step 5: Finished typing, cursor blinks
                        setPhase("completed");
                        timerRef.current = setTimeout(() => {
                          // Step 6: Cursor dissolves away
                          setPhase("cursor-out");
                          timerRef.current = setTimeout(() => {
                            setPhase("done");
                          }, CURSOR_OUT_MS);
                        }, COMPLETION_PAUSE_MS);
                      }
                    }
                  };

                  timerRef.current = setTimeout(
                    typeNameChar,
                    NAME_CHAR_SPEED_MS,
                  );
                }, 120);
              }, LINE_PAUSE_MS);
            }
          }
        };

        timerRef.current = setTimeout(typeGreetingChar, GREETING_CHAR_SPEED_MS);
      }, 160);
    }, 220);
  }, [clearActiveTimer, greeting, fullName]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      runTypingChoreography();
    }, 10);

    return () => {
      clearTimeout(startTimer);
      clearActiveTimer();
    };
  }, [clearActiveTimer, runTypingChoreography]);

  // Click to replay animation anytime
  const handleReplay = useCallback(() => {
    runTypingChoreography();
  }, [runTypingChoreography]);

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
  const easedP = easeInOutCubic(p);
  const visualP = easeOutQuad(p);

  // Background atmosphere interpolation
  const bgBlur = (22 * (1 - visualP)).toFixed(2); // 22px -> 0px
  const bgOpacity = (0.32 + 0.68 * visualP).toFixed(3); // 0.32 -> 1.0 (subtle atmospheric silhouette at start!)
  const bgScale = (0.94 + 0.06 * visualP).toFixed(3); // 0.94 -> 1.0

  // Central title pan-out interpolation
  // Scale down from 1.15 to 1.0
  const titleScale = (1.15 - 0.15 * easedP).toFixed(3);
  // Float from dead center (0vh) to top hero title position (-22vh)
  const titleTranslateY = (-22 * easedP).toFixed(2);

  // Punchline and bio fade in as you scroll out
  const editorialOpacity = clamp01((p - 0.2) / 0.5); // Fades in between 20% and 70% scroll

  // Pill links slide up and fade in smoothly
  const pillsTranslateY = ((1 - visualP) * 20).toFixed(2); // 20px down -> 0px
  const pillsOpacity = clamp01((p - 0.25) / 0.45); // Fades in as camera pulls back

  const displayedGreeting = isMounted ? greeting.slice(0, greetingLen) : "";
  const displayedName = isMounted ? fullName.slice(0, nameLen) : "";

  const cursorOnGreeting =
    phase === "greeting-cursor" || phase === "typing-greeting";
  const cursorOnName =
    phase === "name-cursor" ||
    phase === "typing-name" ||
    phase === "completed" ||
    phase === "cursor-out";

  return (
    <div
      ref={outerRef}
      className="relative w-full"
      style={{
        // 100vh viewport + scroll runway
        height: `calc(100svh + ${SCROLL_RUNWAY_VH}vh)`,
      }}
    >
      {/* Pinned Sticky Viewport Canvas */}
      <div className="sticky top-0 left-0 w-full h-svh overflow-hidden bg-canvas">
        {/* ── BACKGROUND LAYER: Revealed ASCII Art, Punchline & Action Pills ── */}
        <VStack
          vAlign="between"
          hAlign="center"
          className="absolute inset-0 z-0 w-full h-full transform-gpu will-change-[filter,opacity,transform] px-4 pt-20 pb-6 sm:px-6 sm:pt-24 sm:pb-8"
          style={{
            filter: `blur(${bgBlur}px)`,
            opacity: bgOpacity,
            transform: `scale(${bgScale})`,
            pointerEvents: p > 0.65 ? "auto" : "none",
          }}
        >
          {/* Top Placeholder to balance typography */}
          <HStack className="w-full h-16 shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Center Stage: Engineering Punchline + Living ASCII Hands */}
          <VStack gap={2} hAlign="center" className="relative z-10 w-full max-w-4xl my-auto">
            {/* Punchline editorial text (smoothly reveals during pan-out) */}
            <VStack
              gap={2}
              hAlign="center"
              className="text-center px-4 transform-gpu transition-opacity duration-300"
              style={{
                opacity: editorialOpacity,
                transform: `translateY(${(1 - editorialOpacity) * 12}px)`,
              }}
            >
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

            {/* The Majestic ASCII Hands Art Canvas */}
            <VStack className="relative z-0 w-full -mt-2 sm:-mt-4">
              <HeroAsciiHands altText={HERO_EDITORIAL_DATA.asciiArtAlt} />
            </VStack>
          </VStack>

          {/* Bottom Section: Action Channels (Pill Links Below ASCII Hands) */}
          <VStack
            gap={3}
            hAlign="center"
            className="relative z-10 w-full shrink-0 justify-end pb-2 sm:pb-4 pointer-events-auto transform-gpu"
            style={{
              opacity: pillsOpacity,
              transform: `translateY(${pillsTranslateY}px)`,
            }}
          >
            <HStack
              wrap="wrap"
              gap={2}
              hAlign="center"
              vAlign="center"
              className="pt-1"
            >
              <Link
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                isStandalone
                display="block"
                className="group rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <HStack as="span" gap={2} vAlign="center">
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

              <Link
                href={PROFILE_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                isStandalone
                display="block"
                className="group rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <HStack as="span" gap={2} vAlign="center">
                  <AppIcon
                    name="external-link"
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

              {PROFILE_DATA.instagramUrl && (
                <Link
                  href={PROFILE_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  isStandalone
                  display="block"
                  className="group rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  <HStack as="span" gap={2} vAlign="center">
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

              <Link
                href={PROFILE_DATA.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                isStandalone
                display="block"
                className="group rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <HStack as="span" gap={2} vAlign="center">
                  <AppIcon
                    name="file-down"
                    size="sm"
                    className="transition-colors duration-200 group-hover:text-black"
                  />
                  <Text
                    type="inherit"
                    color="inherit"
                    className="tracking-wide transition-colors duration-200 group-hover:text-black"
                  >
                    Resume
                  </Text>
                </HStack>
              </Link>

              <Link
                href={HERO_EDITORIAL_DATA.primaryCtaHref}
                isStandalone
                aria-label="Explore Projects"
                className="group flex items-center gap-2 rounded-full border border-copper/40 bg-copper/[0.08] px-4 py-2 font-mono text-xs text-primary/90 no-underline backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-copper hover:bg-copper hover:text-canvas hover:shadow-[0_0_20px_rgba(229,169,60,0.4)]"
              >
                <Text type="inherit" color="inherit" className="tracking-wide">
                  {HERO_EDITORIAL_DATA.primaryCtaLabel}
                </Text>
                <AppIcon
                  name="arrow-right"
                  size="xsm"
                  color="inherit"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </HStack>
          </VStack>
        </VStack>

        {/* ── FOREGROUND LAYER: The Grand Centered Typing Hero Title ── */}
        <VStack
          vAlign="center"
          hAlign="center"
          className="absolute inset-0 z-20 pointer-events-none transform-gpu will-change-transform px-6"
          style={{
            transform: `scale(${titleScale}) translateY(${titleTranslateY}vh)`,
          }}
        >
          <VStack
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
            className="group relative cursor-pointer select-none text-center max-w-4xl px-4 pointer-events-auto outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-copper/70 focus-visible:ring-offset-8 focus-visible:ring-offset-black"
          >
            {/* Screen Reader Full Content */}
            <Text as="span" className="sr-only">
              {greeting} {fullName}
            </Text>

            {/* Line 1: "Hello! I'm" (Typed with I-beam cursor) */}
            <HStack
              as="span"
              vAlign="center"
              hAlign="center"
              aria-hidden="true"
              className="relative inline-flex items-center justify-center font-mono text-xs sm:text-sm md:text-base font-semibold tracking-[0.32em] uppercase text-copper"
            >
              {/* Ghost Line 1 */}
              <Text
                as="span"
                type="inherit"
                color="inherit"
                className="invisible pointer-events-none select-none opacity-0 whitespace-pre"
              >
                {greeting}
              </Text>

              {/* Animated Line 1 */}
              <HStack
                as="span"
                vAlign="center"
                className="absolute inset-y-0 left-0 flex items-center whitespace-pre text-left"
              >
                <Text as="span" type="inherit" color="inherit" className="whitespace-pre">
                  {displayedGreeting}
                </Text>

                {cursorOnGreeting && (
                  <HStack
                    as="span"
                    vAlign="center"
                    className={`inline-flex shrink-0 items-center justify-center ${
                      displayedGreeting.length > 0 ? "ml-1" : "ml-0"
                    } ${phase === "greeting-cursor" ? "animate-cursor-come-up" : ""}`}
                  >
                    <IBeamCursor isBlinking={phase === "greeting-cursor"} />
                  </HStack>
                )}
              </HStack>
            </HStack>

            {/* Line 2: "Aravind V S" (Typed with I-beam cursor) */}
            <Heading
              id="intro-heading"
              level={1}
              justify="center"
              className="text-center font-brand text-[clamp(2.75rem,8.5vw,5.75rem)] font-extrabold tracking-[-0.04em] leading-[1.04] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            >
              <HStack
                as="span"
                vAlign="center"
                hAlign="center"
                aria-hidden="true"
                className="relative inline-flex select-none items-center justify-center"
              >
                {/* Ghost Line 2 */}
                <Text
                  as="span"
                  type="inherit"
                  color="inherit"
                  className="invisible pointer-events-none select-none opacity-0 whitespace-pre"
                >
                  {fullName}
                </Text>

                {/* Animated Line 2 */}
                <HStack
                  as="span"
                  vAlign="center"
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-pre text-left"
                >
                  <Text as="span" type="inherit" color="inherit" className="whitespace-pre">
                    {displayedName}
                  </Text>

                  {cursorOnName && (
                    <HStack
                      as="span"
                      vAlign="center"
                      className={`inline-flex shrink-0 items-center justify-center ${
                        displayedName.length > 0 ? "ml-1 sm:ml-1.5" : "ml-0"
                      } ${
                        phase === "name-cursor"
                          ? "animate-cursor-come-up"
                          : phase === "cursor-out"
                          ? "animate-cursor-go-away"
                          : ""
                      }`}
                    >
                      <IBeamCursor
                        isBlinking={phase === "name-cursor" || phase === "completed"}
                      />
                    </HStack>
                  )}
                </HStack>
              </HStack>
            </Heading>
          </VStack>
        </VStack>

        {/* ── SCROLL CUE: Invites Visitor to Experience the Pan-Out ── */}
        {phase === "done" && p < 0.12 && (
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
      </div>
    </div>
  );
}
