"use client";

import { useRef, useState } from "react";
import { Check, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { useClickableContainer } from "@astryxdesign/core/hooks";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { ToggleButton } from "@astryxdesign/core/ToggleButton";
import { Token } from "@astryxdesign/core/Token";
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
  const fiducialClass = isSelected
    ? "text-copper"
    : "text-muted/60 group-hover:text-copper/75";

  return (
    <Card
      ref={cardRef}
      padding={0}
      onClick={containerProps.onClick}
      onMouseUp={containerProps.onMouseUp}
      onPointerDown={containerProps.onPointerDown}
      className={[
        "group relative flex h-full cursor-pointer flex-col rounded-xl border transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-[var(--border-active)] hover:shadow-[0_10px_30px_-15px_rgba(229,169,60,0.16)]",
        isSelected
          ? "border-[var(--border-active)] bg-elevated shadow-[0_10px_30px_-15px_rgba(229,169,60,0.2)]"
          : "border-hairline bg-surface",
        isDimmed ? "opacity-80 hover:opacity-100" : "opacity-100",
      ].join(" ")}
    >
      <Text
        type="code"
        aria-hidden="true"
        className={`pointer-events-none absolute top-1.5 left-2 select-none font-mono text-[10px] leading-none transition-colors ${fiducialClass}`}
      >
        +
      </Text>
      <Text
        type="code"
        aria-hidden="true"
        className={`pointer-events-none absolute top-1.5 right-2 select-none font-mono text-[10px] leading-none transition-colors ${fiducialClass}`}
      >
        +
      </Text>
      <Text
        type="code"
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-1.5 left-2 select-none font-mono text-[10px] leading-none transition-colors ${fiducialClass}`}
      >
        +
      </Text>
      <Text
        type="code"
        aria-hidden="true"
        className={`pointer-events-none absolute right-2 bottom-1.5 select-none font-mono text-[10px] leading-none transition-colors ${fiducialClass}`}
      >
        +
      </Text>

      <VStack gap={3} className="h-full p-5">
        <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
          <Text
            type="code"
            weight="bold"
            className={[
              "font-mono text-base font-bold tracking-tight transition-colors",
              isSelected ? "text-copper" : "text-primary",
            ].join(" ")}
          >
            {protocol.name}
          </Text>
          <Token
            label={protocol.busType}
            size="sm"
            color="cyan"
            className="shrink-0 font-mono"
          />
        </HStack>

        <Text
          type="supporting"
          size="xsm"
          color="secondary"
          className="text-xs leading-relaxed text-secondary"
        >
          {protocol.hardwareContext}
        </Text>

        <HStack
          hAlign="between"
          vAlign="center"
          gap={2}
          wrap="wrap"
          className="mt-auto border-t border-hairline pt-3"
        >
          <HStack gap={1.5} vAlign="center">
            <Badge
              variant={isSelected ? "yellow" : "neutral"}
              label={buildCount}
            />
            <Text
              type="code"
              size="xsm"
              className={[
                "font-mono text-[11px]",
                isSelected ? "text-copper" : "text-secondary",
              ].join(" ")}
            >
              {isSelected
                ? protocol.relatedProjectIds.join(" · ")
                : buildCount === 1
                  ? "Build"
                  : "Builds"}
            </Text>
          </HStack>

          <ToggleButton
            label={`Filter by ${protocol.name}`}
            isPressed={isSelected}
            onPressedChange={() => onToggle(protocol.id)}
            size="sm"
            icon={
              <Icon
                icon={isSelected ? Check : SlidersHorizontal}
                size="xsm"
              />
            }
          >
            Filter
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
      gap={4}
      role="region"
      aria-label="Interactive communication protocol filter"
      className="min-w-0"
    >
      <HStack
        hAlign="between"
        vAlign="center"
        gap={3}
        wrap="wrap"
        className="rounded-xl border border-hairline bg-surface px-4 py-3.5 md:px-5"
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
            type="code"
            size="xsm"
            className="font-mono text-xs font-semibold tracking-wider text-bus"
          >
            {selectedProtocol
              ? `BUS_FILTER // ${selectedProtocol.name} (${selectedProtocol.busType})`
              : `BUS_MATRIX // ${String(protocols.length).padStart(2, "0")} INTERFACES`}
          </Text>
          <Text
            type="supporting"
            size="xsm"
            color="secondary"
            aria-live="polite"
            className="font-mono text-xs text-secondary"
          >
            {selectedProtocol
              ? `Matching builds: ${selectedProtocol.relatedProjectIds.join(", ")}`
              : "Click any bus card to highlight matching hardware builds"}
          </Text>
        </HStack>

        <HStack gap={2} vAlign="center" wrap="wrap">
          <Button
            label="[All Protocols]"
            variant={selectedProtocol ? "secondary" : "primary"}
            size="sm"
            icon={
              selectedProtocol ? <Icon icon={RotateCcw} size="xsm" /> : undefined
            }
            onClick={() => setActiveProtocolId(null)}
            aria-pressed={selectedProtocol === null}
            className="font-mono text-xs"
          />
          <Button
            label="View Matching Projects ↓"
            href="#projects"
            variant={selectedProtocol ? "primary" : "ghost"}
            size="sm"
            className="font-mono text-xs"
          />
        </HStack>
      </HStack>

      <Grid
        columns={{ minWidth: 235, max: 4 }}
        gap={3}
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
