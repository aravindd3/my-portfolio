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
  | "initial" // Brief settle period before cursor emerges
  | "cursor-in" // I-beam cursor rises smoothly into view ("comes up")
  | "typing" // Typing letters left-to-right at a constant steady speed
  | "completed" // Finished typing, cursor rests and blinks briefly
  | "cursor-out" // Cursor gracefully dissolves away ("goes away")
  | "done"; // Final clean text state

// Timing parameters for clean, intentional typewriter cadence
const TYPING_SPEED_MS = 85; // Strict constant speed per character
const SETTLE_DELAY_MS = 240; // Initial delay before cursor appears
const CURSOR_IN_DURATION_MS = 320; // Cursor come-up duration
const COMPLETION_PAUSE_MS = 700; // Pause & gentle cursor blink at end
const CURSOR_OUT_DURATION_MS = 360; // Cursor departure fade duration

/**
 * Stage 1 Hero Name Typewriter Component:
 * 1. The custom I-beam cursor emerges on the left ("comes up").
 * 2. It traverses from left to right, typing each letter at a constant speed.
 * 3. After completing the name, the cursor pauses/blinks, then cleanly goes away.
 * 4. Zero layout shift via ghost container, accessible screen-reader markup,
 *    and interactive click-to-replay.
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

    // Step 0: Reset to start
    setTypedLength(0);
    setStage("initial");

    // Step 1: Cursor emerges on the left ("comes up")
    timerRef.current = setTimeout(() => {
      setStage("cursor-in");

      // Step 2: Cursor begins typing letters left-to-right at constant speed
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
    }, 20);

    return () => {
      clearTimeout(startTimer);
      clearActiveTimer();
    };
  }, [clearActiveTimer, runAnimationSequence]);

  // Click handler to allow visitors to replay the crisp animation anytime
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
