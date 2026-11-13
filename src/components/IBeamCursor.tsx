import { HStack } from "@astryxdesign/core/HStack";

export interface IBeamCursorProps {
  className?: string;
  isBlinking?: boolean;
}

/**
 * High-precision vector I-beam text insertion cursor.
 * Faithfully matches the iconic serif I-beam insertion pointer from the user specification:
 * - Symmetrical top and bottom serif bars with central alignment notches
 * - Smooth inner fillets transitioning into the central stem
 * - High-contrast crisp white fill with dual copper/white hardware luminescence
 */
export function IBeamCursor({ className = "", isBlinking = false }: IBeamCursorProps) {
  return (
    <HStack
      as="span"
      vAlign="center"
      hAlign="center"
      aria-hidden="true"
      className={`inline-flex shrink-0 select-none items-center justify-center ${
        isBlinking ? "animate-cursor-blink" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 72 272"
        fill="currentColor"
        className="h-[0.86em] w-auto text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] drop-shadow-[0_0_16px_rgba(229,169,60,0.55)] transition-colors duration-200"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M 0,0 L 25,0 C 30,0 33,6 35.5,6 C 38,6 41,0 46,0 L 71,0 V 9 L 46,9 C 43,9 40,12 40,16 V 255 C 40,259 43,262 46,262 L 71,262 V 271 L 46,271 C 41,271 38,265 35.5,265 C 33,265 30,271 25,271 L 0,271 V 262 L 25,262 C 28,262 31,259 31,255 V 16 C 31,12 28,9 25,9 L 0,9 Z" />
      </svg>
    </HStack>
  );
}
