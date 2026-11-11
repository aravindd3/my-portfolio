"use client";

import { useRef, useState } from "react";
import { ArrowDown, Check, RotateCcw } from "lucide-react";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { useClickableContainer } from "@astryxdesign/core/hooks";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { Link } from "@astryxdesign/core/Link";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { ToggleButton } from "@astryxdesign/core/ToggleButton";
import { VStack } from "@astryxdesign/core/VStack";
import type { ProtocolId, ProtocolItem } from "@/data/portfolio";
import { useOptionalProtocolFilter } from "./ProtocolFilterContext";

interface ProtocolFilterRibbonProps {
  protocols: readonly ProtocolItem[];
}

interface ProtocolCardProps {
  protocol: ProtocolItem;
  isSelected: boolean;
  isDimmed: boolean;
  onToggle: (id: ProtocolId) => void;
}

function ProtocolCard({
  protocol,
  isSelected,
  isDimmed,
  onToggle,
}: ProtocolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const containerProps = useClickableContainer({
    containerRef: cardRef,
    onClick: () => onToggle(protocol.id),
  });

  const buildCount = protocol.relatedProjectIds.length;

  return (
    <Card
      ref={cardRef}
      padding={0}
      onClick={containerProps.onClick}
      onMouseUp={containerProps.onMouseUp}
      onPointerDown={containerProps.onPointerDown}
      className={[
        "group relative flex h-full cursor-pointer flex-col rounded-2xl border transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]",
        isSelected
          ? "border-[var(--border-active)] bg-gradient-to-b from-[rgba(229,169,60,0.08)] via-[#0D1017] to-[#080A0F] shadow-[0_12px_32px_-16px_rgba(229,169,60,0.25),inset_0_1px_0_rgba(229,169,60,0.2)]"
          : "border-white/[0.08] bg-gradient-to-b from-white/[0.035] via-[#0B0E14]/95 to-[#080A0F]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        isDimmed ? "opacity-65 hover:opacity-100" : "opacity-100",
      ].join(" ")}
    >
      <VStack gap={3} className="h-full p-5">
        <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
          <Text
            type="code"
            weight="bold"
            className={[
              "font-mono text-base font-semibold tracking-tight transition-colors",
              isSelected ? "text-copper" : "text-primary",
            ].join(" ")}
          >
            {protocol.name}
          </Text>
          <Text
            type="code"
            size="xsm"
            className={[
              "rounded-full border px-2.5 py-0.5 font-mono text-[11px] transition-colors",
              isSelected
                ? "border-[var(--border-active)] bg-[var(--accent-copper-subtle)] text-copper"
                : "border-white/[0.08] bg-white/[0.03] text-secondary",
            ].join(" ")}
          >
            {protocol.busType}
          </Text>
        </HStack>

        <Text
          type="supporting"
          size="xsm"
          color="secondary"
          className="text-[0.8125rem] leading-relaxed text-secondary"
        >
          {protocol.hardwareContext}
        </Text>

        <HStack
          hAlign="between"
          vAlign="center"
          gap={2}
          wrap="wrap"
          className="mt-auto border-t border-white/[0.06] pt-3"
        >
          <Text
            type="code"
            size="xsm"
            hasTabularNumbers
            className={[
              "font-mono text-[11px]",
              isSelected ? "text-copper" : "text-secondary",
            ].join(" ")}
          >
            {isSelected
              ? protocol.relatedProjectIds.join(" · ")
              : `${buildCount} ${buildCount === 1 ? "build" : "builds"}`}
          </Text>

          <ToggleButton
            label={`Filter projects by ${protocol.name}`}
            isPressed={isSelected}
            onPressedChange={() => onToggle(protocol.id)}
            size="sm"
            icon={isSelected ? <Icon icon={Check} size="xsm" /> : undefined}
            className={[
              "!rounded-full !font-mono !text-[11px] transition-colors",
              isSelected
                ? "!border-[var(--border-active)] !bg-[var(--accent-copper-subtle)] !text-copper"
                : "!border-white/10 !bg-white/[0.03] !text-secondary hover:!border-white/20 hover:!text-primary",
            ].join(" ")}
          >
            {isSelected ? "Active" : "Filter"}
          </ToggleButton>
        </HStack>
      </VStack>
    </Card>
  );
}

export function ProtocolFilterRibbon({ protocols }: ProtocolFilterRibbonProps) {
  const contextFilter = useOptionalProtocolFilter();
  const [localProtocolId, setLocalProtocolId] = useState<ProtocolId | null>(
    null,
  );

  const activeProtocolId = contextFilter
    ? contextFilter.activeProtocolId
    : localProtocolId;

  const setActiveProtocolId = (id: ProtocolId | null) => {
    if (contextFilter) {
      contextFilter.setActiveProtocolId(id);
    } else {
      setLocalProtocolId(id);
    }
  };

  const toggleProtocol = (id: ProtocolId) => {
    if (contextFilter) {
      contextFilter.toggleProtocol(id);
    } else {
      setLocalProtocolId((prev) => (prev === id ? null : id));
    }
  };

  const selectedProtocol =
    protocols.find((protocol) => protocol.id === activeProtocolId) ?? null;

  return (
    <VStack
      gap={5}
      role="region"
      aria-label="Interactive communication protocol filter"
      className="min-w-0"
    >
      <HStack
        hAlign="center"
        vAlign="center"
        gap={3}
        wrap="wrap"
        className="mx-auto w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 sm:w-auto sm:rounded-full"
      >
        <HStack gap={2} vAlign="center" wrap="wrap" className="min-w-0">
          <StatusDot
            variant={selectedProtocol ? "accent" : "success"}
            isPulsing={Boolean(selectedProtocol)}
            label={
              selectedProtocol
                ? `Active protocol filter: ${selectedProtocol.name}`
                : "All communication protocols active"
            }
          />
          <Text
            type="supporting"
            size="xsm"
            color="secondary"
            aria-live="polite"
            className="font-mono text-xs text-secondary"
          >
            {selectedProtocol
              ? `${selectedProtocol.name} (${selectedProtocol.busType}) · Matching ${selectedProtocol.relatedProjectIds.join(", ")}`
              : `${protocols.length} wired & RF buses · Select any card to highlight builds`}
          </Text>
        </HStack>

        {selectedProtocol ? (
          <HStack gap={2} vAlign="center" wrap="wrap">
            <Button
              label="Clear"
              variant="secondary"
              size="sm"
              icon={<Icon icon={RotateCcw} size="xsm" />}
              onClick={() => setActiveProtocolId(null)}
              className="!rounded-full !border-white/12 !bg-white/[0.04] !font-mono !text-[11px] !text-primary hover:!border-white/25"
            />
            <Link
              href="#projects"
              color="accent"
              isStandalone
              className="rounded-full border border-[var(--border-active)] bg-[var(--accent-copper-subtle)] px-3 py-1 font-mono text-[11px] font-medium text-copper no-underline transition-colors hover:bg-copper hover:text-canvas"
            >
              <HStack as="span" gap={1} vAlign="center">
                <Text type="inherit" color="inherit">
                  View Projects
                </Text>
                <Icon icon={ArrowDown} size="xsm" />
              </HStack>
            </Link>
          </HStack>
        ) : null}
      </HStack>

      <Grid
        columns={{ minWidth: 235, max: 4 }}
        gap={4}
        role="group"
        aria-label="Communication protocols"
        className="w-full"
      >
        {protocols.map((protocol) => {
          const isSelected = activeProtocolId === protocol.id;
          const isDimmed = activeProtocolId !== null && !isSelected;

          return (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              isSelected={isSelected}
              isDimmed={isDimmed}
              onToggle={toggleProtocol}
            />
          );
        })}
      </Grid>
    </VStack>
  );
}
