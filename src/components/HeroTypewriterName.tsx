"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { IBeamCursor } from "./IBeamCursor";

interface HeroTypewriterNameProps {
  fullName: string;
}

const emptySubscribe = () => () => {};

type AnimationStage =
  | "initial" // Settle period before cursor appears
  | "cursor-in" // I-beam cursor comes up into view
  | "typing" // Typing letters at a steady constant speed
  | "completed" // Finished typing, cursor rests and blinks briefly
  | "cursor-out" // Cursor gracefully fades out and departs
  | "done"; // Final static state

// Precise timing parameters for a crisp, tactile typing cadence
const TYPING_SPEED_MS = 85; // Strict constant speed per character
const SETTLE_DELAY_MS = 320; // Initial page settle delay
const CURSOR_IN_DURATION_MS = 340; // Cursor come-up duration
const COMPLETION_PAUSE_MS = 650; // Pause & gentle cursor blink at end
const CURSOR_OUT_DURATION_MS = 360; // Cursor departure fade duration

/**
 * Stage 1 Hero Name Typewriter Component:
 * Faithfully executes the user's specification:
 * 1. The custom I-beam cursor (matching the shared asset) emerges at the initial position ("comes up").
 * 2. It traverses from left to right, typing each character of Aravind's name at a strictly constant speed.
 * 3. After completing the name, the cursor rests for a moment and cleanly dissolves away ("goes away").
 * 4. Includes zero-layout-shift ghost sizing, WCAG AA / screen-reader accessibility,
 *    prefers-reduced-motion compliance, and interactive click-to-replay.
 */
export function HeroTypewriterName({ fullName }: HeroTypewriterNameProps) {
  const [typedLength, setTypedLength] = useState<number>(0);
  const [stage, setStage] = useState<AnimationStage>("initial");
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearActiveTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const runAnimationSequence = useCallback(() => {
    clearActiveTimer();

    // Honor users who prefer reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTypedLength(fullName.length);
      setStage("done");
      return;
    }

    // Step 0: Reset to start
    setTypedLength(0);
    setStage("initial");

    // Step 1: Wait for page settle, then cursor emerges ("comes up")
    timerRef.current = setTimeout(() => {
      setStage("cursor-in");

      // Step 2: Cursor finishes entry and starts constant-speed typing
      timerRef.current = setTimeout(() => {
        setStage("typing");

        let currentLen = 0;
        const totalChars = fullName.length;

        const typeNextChar = () => {
          if (currentLen < totalChars) {
            currentLen += 1;
            setTypedLength(currentLen);

            if (currentLen < totalChars) {
              timerRef.current = setTimeout(typeNextChar, TYPING_SPEED_MS);
            } else {
              // Step 3: Finished typing, cursor rests & blinks
              setStage("completed");

              timerRef.current = setTimeout(() => {
                // Step 4: Cursor gracefully dissolves away ("goes away")
                setStage("cursor-out");

                timerRef.current = setTimeout(() => {
                  // Step 5: Final pristine text state
                  setStage("done");
                }, CURSOR_OUT_DURATION_MS);
              }, COMPLETION_PAUSE_MS);
            }
          }
        };

        timerRef.current = setTimeout(typeNextChar, TYPING_SPEED_MS);
      }, CURSOR_IN_DURATION_MS);
    }, SETTLE_DELAY_MS);
  }, [clearActiveTimer, fullName]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      runAnimationSequence();
    }, 10);

    return () => {
      clearTimeout(startTimer);
      clearActiveTimer();
    };
  }, [clearActiveTimer, runAnimationSequence]);

  // Click handler to allow visitors to replay the crisp animation
  const handleReplay = useCallback(() => {
    runAnimationSequence();
  }, [runAnimationSequence]);

  const displayedText = isMounted ? fullName.slice(0, typedLength) : "";
  const showCursor = stage !== "initial" && stage !== "done";

  return (
    <HStack
      as="span"
      vAlign="center"
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
      aria-label={fullName}
      className="group relative inline-flex cursor-pointer select-none items-center justify-center outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-copper/70 focus-visible:ring-offset-8 focus-visible:ring-offset-black"
    >
      {/* Accessible Name for Screen Readers and Web Crawlers */}
      <Text as="span" className="sr-only">
        {fullName}
      </Text>

      {/* Ghost Sizing Layer: Locks in the exact bounding box so hero never shifts */}
      <Text
        as="span"
        type="inherit"
        color="inherit"
        aria-hidden="true"
        className="invisible pointer-events-none select-none opacity-0 whitespace-pre"
      >
        {fullName}
      </Text>

      {/* Dynamic Animated Layer: Anchored at left: 0 of the centered container */}
      <HStack
        as="span"
        vAlign="center"
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-pre text-left"
      >
        <Text as="span" type="inherit" color="inherit" className="whitespace-pre">
          {displayedText}
        </Text>

        {showCursor && (
          <HStack
            as="span"
            vAlign="center"
            className={`inline-flex shrink-0 items-center justify-center ${
              displayedText.length > 0 ? "ml-1 sm:ml-1.5" : "ml-0"
            } ${
              stage === "cursor-in"
                ? "animate-cursor-come-up"
                : stage === "cursor-out"
                ? "animate-cursor-go-away"
                : ""
            }`}
          >
            <IBeamCursor isBlinking={stage === "completed" || stage === "cursor-in"} />
          </HStack>
        )}
      </HStack>

      {/* Progressive enhancement fallback if JS is disabled */}
      <noscript>
        <Text
          as="span"
          type="inherit"
          color="inherit"
          className="absolute inset-y-0 left-0 flex items-center whitespace-pre text-left"
        >
          {fullName}
        </Text>
      </noscript>
    </HStack>
  );
}
