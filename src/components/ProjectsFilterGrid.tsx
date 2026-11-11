"use client";

import { useState } from "react";
import {
  Check,
  CircuitBoard,
  ExternalLink,
  Eye,
  FileText,
  FolderGit2,
  Play,
  RotateCcw,
} from "lucide-react";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { ToggleButton } from "@astryxdesign/core/ToggleButton";
import { Token } from "@astryxdesign/core/Token";
import { VStack } from "@astryxdesign/core/VStack";
import type { ProjectItem, ProtocolId, ProtocolItem } from "@/data/portfolio";
import { useOptionalProtocolFilter } from "./ProtocolFilterContext";

interface ProjectsFilterGridProps {
  projects: readonly ProjectItem[];
  protocols: readonly ProtocolItem[];
}

interface ProjectCardProps {
  project: ProjectItem;
  protocolMap: ReadonlyMap<ProtocolId, ProtocolItem>;
  activeProtocol: ProtocolItem | null;
}

function ProjectCard({
  project,
  protocolMap,
  activeProtocol,
}: ProjectCardProps) {
  const isFilterActive = activeProtocol !== null;
  const isMatch =
    activeProtocol !== null && project.protocolIds.includes(activeProtocol.id);
  const isDimmed = isFilterActive && !isMatch;

  const fiducialClass = isMatch
    ? "text-copper"
    : "text-muted/50 group-hover:text-copper/80";

  const actionLinks = [
    project.githubUrl
      ? {
          label: "GitHub Repository",
          href: project.githubUrl,
          icon: FolderGit2,
        }
      : null,
    project.schematicPdfUrl
      ? {
          label: "Schematic PDF",
          href: project.schematicPdfUrl,
          icon: FileText,
        }
      : null,
    project.pcbImageUrl
      ? {
          label: "PCB Layout Render",
          href: project.pcbImageUrl,
          icon: CircuitBoard,
        }
      : null,
    project.demoVideoUrl
      ? {
          label: "Hardware Demo",
          href: project.demoVideoUrl,
          icon: Play,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <Card
      padding={0}
      className={[
        "group relative flex h-full min-w-0 flex-col rounded-xl border transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-[var(--border-active)] hover:shadow-[0_10px_30px_-15px_rgba(229,169,60,0.16)]",
        isMatch
          ? "border-[var(--border-active)] bg-surface shadow-[0_10px_30px_-15px_rgba(229,169,60,0.22)] ring-1 ring-[var(--border-active)]"
          : "border-hairline bg-surface",
        isDimmed ? "opacity-45 hover:opacity-95" : "opacity-100",
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

      <VStack gap={4} className="h-full min-w-0 p-6 md:p-7">
        <VStack gap={3} className="min-w-0">
          <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
            <HStack gap={2} vAlign="center" wrap="wrap" className="min-w-0">
              <Text
                type="code"
                size="xsm"
                hasTabularNumbers
                className={[
                  "rounded border px-2 py-0.5 font-mono text-xs font-semibold tracking-wider",
                  isMatch
                    ? "border-[var(--border-active)] bg-[var(--accent-copper-subtle)] text-copper"
                    : "border-hairline bg-elevated text-copper",
                ].join(" ")}
              >
                {project.id}
              </Text>

              {isMatch && activeProtocol ? (
                <HStack
                  gap={1.5}
                  vAlign="center"
                  className="rounded-full border border-[var(--border-active)] bg-[var(--accent-copper-subtle)] px-2.5 py-0.5"
                >
                  <StatusDot
                    variant="accent"
                    isPulsing
                    label={`Matches ${activeProtocol.name} protocol filter`}
                  />
                  <Text
                    type="code"
                    size="xsm"
                    className="font-mono text-[11px] font-semibold tracking-wide text-copper"
                  >
                    MATCH: {activeProtocol.name}
                  </Text>
                </HStack>
              ) : null}
            </HStack>

            <HStack
              gap={1.5}
              vAlign="center"
              className="shrink-0 rounded-full border border-hairline bg-elevated px-2.5 py-1"
            >
              {project.isOngoing ? (
                <StatusDot
                  variant="success"
                  isPulsing
                  label="Ongoing hardware prototype"
                />
              ) : null}
              <Text
                type="code"
                size="xsm"
                hasTabularNumbers
                className={[
                  "font-mono text-xs",
                  project.isOngoing
                    ? "font-medium text-signal"
                    : "text-secondary",
                ].join(" ")}
              >
                {project.dates}
              </Text>
            </HStack>
          </HStack>

          <VStack gap={1} className="min-w-0">
            <Heading
              level={3}
              className="font-display text-xl font-semibold leading-[1.35] text-primary"
            >
              {project.title}
            </Heading>
            <Text
              type="code"
              size="xsm"
              className="font-mono text-xs leading-relaxed text-copper"
            >
              {project.primaryFocus}
            </Text>
          </VStack>
        </VStack>

        <VStack
          gap={2}
          className="min-w-0 rounded-lg border border-hairline bg-[var(--bg-elevated)] p-3.5"
        >
          <Text
            type="code"
            size="xsm"
            className="font-mono text-[11px] font-semibold tracking-wider text-muted"
          >
            SYSTEM_SIGNAL_CHAIN // ARCHITECTURE FLOW
          </Text>

          <HStack
            as="ol"
            wrap="wrap"
            vAlign="center"
            gap={2}
            aria-label={`${project.title} system signal chain`}
            className="m-0 min-w-0 list-none p-0"
          >
            {project.signalChain.map((node, index) => (
              <HStack
                as="li"
                key={node}
                vAlign="center"
                gap={2}
                className="max-w-full min-w-0"
              >
                <Text
                  type="code"
                  size="xsm"
                  textWrap="wrap"
                  wordBreak="break-word"
                  className="rounded border border-hairline bg-surface px-2 py-1 font-mono text-xs leading-snug text-primary"
                >
                  {node}
                </Text>
                {index < project.signalChain.length - 1 ? (
                  <Text
                    type="code"
                    size="xsm"
                    aria-hidden="true"
                    className="shrink-0 font-mono text-xs font-bold text-copper"
                  >
                    →
                  </Text>
                ) : null}
              </HStack>
            ))}
          </HStack>
        </VStack>

        <VStack
          as="ul"
          gap={3}
          aria-label={`${project.title} engineering details`}
          className="m-0 min-w-0 list-none p-0"
        >
          {project.bullets.map((bullet) => (
            <HStack
              as="li"
              key={bullet}
              gap={2}
              vAlign="start"
              className="min-w-0"
            >
              <Text
                type="code"
                size="xsm"
                aria-hidden="true"
                className="mt-1 shrink-0 font-mono text-xs text-copper"
              >
                ▸
              </Text>
              <Text
                type="body"
                as="p"
                color="secondary"
                className="min-w-0 text-[0.9375rem] leading-[1.6] text-secondary"
              >
                {bullet}
              </Text>
            </HStack>
          ))}
        </VStack>

        <VStack
          gap={3}
          className="mt-auto min-w-0 border-t border-hairline pt-4"
        >
          <HStack gap={2} vAlign="center" wrap="wrap" className="min-w-0">
            <Text
              type="code"
              size="xsm"
              className="shrink-0 font-mono text-[11px] font-semibold tracking-wider text-muted"
            >
              BUSES:
            </Text>
            <HStack
              as="ul"
              wrap="wrap"
              gap={1.5}
              aria-label={`${project.title} communication buses`}
              className="m-0 min-w-0 list-none p-0"
            >
              {project.protocolIds.map((protocolId) => {
                const protocol = protocolMap.get(protocolId);
                const label = protocol ? protocol.name : protocolId.toUpperCase();
                const isProtocolHighlighted = activeProtocol?.id === protocolId;

                return (
                  <HStack as="li" key={protocolId}>
                    <Token
                      label={label}
                      size="sm"
                      color={isProtocolHighlighted ? "yellow" : "cyan"}
                      className="font-mono"
                    />
                  </HStack>
                );
              })}
            </HStack>
          </HStack>

          <HStack
            as="ul"
            wrap="wrap"
            gap={1.5}
            aria-label={`${project.title} hardware and firmware tags`}
            className="m-0 min-w-0 list-none p-0"
          >
            {project.techTags.map((tag) => (
              <HStack as="li" key={tag}>
                <Token
                  label={tag}
                  size="sm"
                  color="default"
                  className="font-mono"
                />
              </HStack>
            ))}
          </HStack>

          {actionLinks.length > 0 ? (
            <HStack
              wrap="wrap"
              gap={2}
              className="border-t border-hairline pt-3"
            >
              {actionLinks.map((action) => (
                <Button
                  key={action.label}
                  label={action.label}
                  href={action.href}
                  as="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                  icon={<Icon icon={action.icon} size="xsm" />}
                  endContent={<Icon icon={ExternalLink} size="xsm" />}
                  className="font-mono text-xs"
                />
              ))}
            </HStack>
          ) : null}
        </VStack>
      </VStack>
    </Card>
  );
}

export function ProjectsFilterGrid({
  projects,
  protocols,
}: ProjectsFilterGridProps) {
  const contextFilter = useOptionalProtocolFilter();
  const [localProtocolId, setLocalProtocolId] = useState<ProtocolId | null>(
    null,
  );
  const [isolateMatches, setIsolateMatches] = useState(false);

  const activeProtocolId = contextFilter
    ? contextFilter.activeProtocolId
    : localProtocolId;

  const setActiveProtocolId = (id: ProtocolId | null) => {
    if (contextFilter) {
      contextFilter.setActiveProtocolId(id);
    } else {
      setLocalProtocolId(id);
    }
    if (id === null) {
      setIsolateMatches(false);
    }
  };

  const toggleProtocol = (id: ProtocolId) => {
    const next = activeProtocolId === id ? null : id;
    if (contextFilter) {
      contextFilter.toggleProtocol(id);
    } else {
      setLocalProtocolId(next);
    }
    if (next === null) {
      setIsolateMatches(false);
    }
  };

  const protocolMap = new Map<ProtocolId, ProtocolItem>(
    protocols.map((protocol) => [protocol.id, protocol]),
  );

  const activeProtocol =
    activeProtocolId !== null
      ? (protocolMap.get(activeProtocolId) ?? null)
      : null;

  const matchingProjects = activeProtocol
    ? projects.filter((project) =>
        project.protocolIds.includes(activeProtocol.id),
      )
    : projects;

  const visibleProjects =
    activeProtocol && isolateMatches ? matchingProjects : projects;

  return (
    <VStack gap={5} className="min-w-0">
      <VStack
        gap={3}
        role="region"
        aria-label="Project protocol filter status and quick controls"
        className="min-w-0 rounded-xl border border-hairline bg-surface px-4 py-3.5 md:px-5"
      >
        <HStack hAlign="between" vAlign="center" gap={3} wrap="wrap">
          <HStack gap={2} vAlign="center" wrap="wrap" className="min-w-0">
            <HStack gap={2} vAlign="center" className="min-w-0">
              <StatusDot
                variant={activeProtocol ? "accent" : "success"}
                isPulsing={Boolean(activeProtocol)}
                label={
                  activeProtocol
                    ? `Highlighting builds using ${activeProtocol.name}`
                    : "All engineering projects active"
                }
              />
              <Text
                type="code"
                size="xsm"
                className="font-mono text-xs font-semibold tracking-wider text-bus"
              >
                {activeProtocol
                  ? `BUS_MATCH // ${activeProtocol.name} (${activeProtocol.busType})`
                  : `PROJECT_INDEX // ${String(projects.length).padStart(2, "0")} HARDWARE BUILDS`}
              </Text>
            </HStack>
            <HStack gap={1.5} vAlign="center" className="min-w-0">
              <Badge
                variant={activeProtocol ? "yellow" : "neutral"}
                label={matchingProjects.length}
              />
              <Text
                type="supporting"
                size="xsm"
                color="secondary"
                aria-live="polite"
                className="font-mono text-xs text-secondary"
              >
                {activeProtocol
                  ? `of ${projects.length} builds match (${matchingProjects.map((p) => p.id).join(", ")})`
                  : "Select any bus to highlight matching hardware systems"}
              </Text>
            </HStack>
          </HStack>

          <HStack gap={2} vAlign="center" wrap="wrap">
            {activeProtocol ? (
              <ToggleButton
                label="Show matches only"
                isPressed={isolateMatches}
                onPressedChange={setIsolateMatches}
                size="sm"
                icon={<Icon icon={isolateMatches ? Check : Eye} size="xsm" />}
              >
                Matches Only
              </ToggleButton>
            ) : null}
            <Button
              label="[All Protocols]"
              variant={activeProtocol ? "secondary" : "primary"}
              size="sm"
              icon={
                activeProtocol ? (
                  <Icon icon={RotateCcw} size="xsm" />
                ) : undefined
              }
              onClick={() => setActiveProtocolId(null)}
              aria-pressed={activeProtocol === null}
              className="font-mono text-xs"
            />
          </HStack>
        </HStack>

        <HStack
          wrap="wrap"
          gap={1.5}
          vAlign="center"
          role="group"
          aria-label="Filter projects by communication bus"
          className="min-w-0 border-t border-hairline pt-3"
        >
          {protocols.map((protocol) => {
            const isSelected = activeProtocol?.id === protocol.id;

            return (
              <ToggleButton
                key={protocol.id}
                label={`Filter projects by ${protocol.name}`}
                isPressed={isSelected}
                onPressedChange={() => toggleProtocol(protocol.id)}
                size="sm"
                icon={isSelected ? <Icon icon={Check} size="xsm" /> : undefined}
              >
                {protocol.name}
              </ToggleButton>
            );
          })}
        </HStack>
      </VStack>

      <Grid
        columns={{ minWidth: 340, max: 2 }}
        gap={5}
        align="stretch"
        className="w-full"
      >
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            protocolMap={protocolMap}
            activeProtocol={activeProtocol}
          />
        ))}
      </Grid>
    </VStack>
  );
}
