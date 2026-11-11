"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@astryxdesign/core/Button";
import { Icon } from "@astryxdesign/core/Icon";
import { Text } from "@astryxdesign/core/Text";
import { useToast } from "@astryxdesign/core/Toast";

interface CopyEmailButtonProps {
  email: string;
}

const FEEDBACK_DURATION_MS = 2500;

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const showToast = useToast();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const scheduleReset = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCopyState("idle");
      timerRef.current = null;
    }, FEEDBACK_DURATION_MS);
  };

  const handleCopy = async () => {
    try {
      if (
        typeof navigator === "undefined" ||
        typeof navigator.clipboard?.writeText !== "function"
      ) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(email);
      setCopyState("copied");
      showToast({
        body: `COPIED: ${email}`,
        type: "info",
        autoHideDuration: FEEDBACK_DURATION_MS,
        uniqueID: "copy-email-feedback",
        collisionBehavior: "overwrite",
      });
      scheduleReset();
    } catch {
      setCopyState("error");
      showToast({
        body: `Clipboard unavailable — use mailto:${email}`,
        type: "error",
        uniqueID: "copy-email-error",
        collisionBehavior: "overwrite",
      });
      scheduleReset();
    }
  };

  const isCopied = copyState === "copied";
  const isError = copyState === "error";

  const buttonLabel = isCopied
    ? `COPIED: ${email}`
    : isError
      ? `Clipboard unavailable — ${email}`
      : `Copy ${email}`;

  return (
    <>
      <Button
        label={buttonLabel}
        variant="secondary"
        size="md"
        icon={
          <Icon
            icon={isCopied ? Check : Copy}
            size="sm"
            color={isCopied ? "success" : "accent"}
          />
        }
        onClick={handleCopy}
        className="font-mono text-xs"
      >
        {isCopied ? (
          <Text
            type="code"
            size="xsm"
            className="font-mono text-xs font-semibold text-signal"
          >
            {`COPIED: ${email}`}
          </Text>
        ) : (
          <Text
            type="code"
            size="xsm"
            className="font-mono text-xs font-medium text-primary"
          >
            {buttonLabel}
          </Text>
        )}
      </Button>

      <Text
        type="supporting"
        size="xsm"
        aria-live="polite"
        className="sr-only"
      >
        {isCopied
          ? `Copied ${email} to clipboard`
          : isError
            ? `Clipboard unavailable. Email address is ${email}`
            : ""}
      </Text>
    </>
  );
}
