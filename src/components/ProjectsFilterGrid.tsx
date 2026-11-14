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
} from "lucide-react";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { ToggleButton } from "@astryxdesign/core/ToggleButton";
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
        "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border transition-all duration-500 ease-out",
        "hover:-translate-y-2 hover:border-copper/40 hover:shadow-[0_24px_50px_-15px_rgba(0,0,0,0.9),0_0_24px_rgba(229,169,60,0.12)]",
        isMatch
          ? "border-[var(--border-active)] bg-gradient-to-b from-[rgba(229,169,60,0.08)] via-[#0D1017] to-[#080A0F] shadow-[0_12px_36px_-16px_rgba(229,169,60,0.22),inset_0_1px_0_rgba(229,169,60,0.18)]"
          : "border-white/[0.08] bg-gradient-to-b from-white/[0.035] via-[#0B0E14]/95 to-[#080A0F]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        isDimmed ? "opacity-45 hover:opacity-95" : "opacity-100",
      ].join(" ")}
    >
      {/* Bobby Korec Gallery Hover Header: Hardware Canvas with Smooth Zoom */}
      <HStack
        as="div"
        className="relative h-20 w-full overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-black/60"
      >
        {/* Ambient Circuit Trace Grid */}
        <HStack
          as="div"
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:14px_14px] transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Ambient Bus Route Silicon Vector Traces */}
        <svg
          className="absolute inset-0 h-full w-full opacity-25 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-45"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 12 18 L 70 18 L 100 45 L 240 45 L 270 70 L 380 70"
            fill="none"
            stroke="#E5A93C"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle cx="70" cy="18" r="2.5" fill="#E5A93C" />
          <circle cx="240" cy="45" r="2.5" fill="#10B981" />
        </svg>

        {/* Specular Shimmer Sweep */}
        <HStack
          as="span"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
        />

        {/* Header Metadata */}
        <HStack
          hAlign="between"
          vAlign="center"
          className="relative z-10 w-full px-5 py-3"
        >
          <HStack gap={2} vAlign="center">
            <Text
              type="code"
              size="xsm"
              hasTabularNumbers
              className={[
                "font-mono text-xs font-semibold tracking-wider",
                isMatch ? "text-copper" : "text-white/80",
              ].join(" ")}
            >
              {project.id}
            </Text>

            {isMatch && activeProtocol ? (
              <Text
                type="code"
                size="xsm"
                className="rounded-full border border-[var(--border-active)] bg-[var(--accent-copper-subtle)] px-2 py-0.5 font-mono text-[10px] font-medium text-copper"
              >
                {activeProtocol.name} Match
              </Text>
            ) : null}
          </HStack>

          <HStack gap={1.5} vAlign="center" className="shrink-0">
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
                "font-mono text-[11px]",
                project.isOngoing ? "font-medium text-signal" : "text-secondary/70",
              ].join(" ")}
            >
              {project.dates}
            </Text>
          </HStack>
        </HStack>
      </HStack>

      <VStack gap={4} className="h-full min-w-0 p-6 md:p-7">
        <VStack gap={1} className="min-w-0 transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <Heading
            level={3}
            className="font-display text-lg font-semibold leading-snug text-primary transition-colors duration-300 group-hover:text-copper md:text-xl"
          >
            {project.title}
          </Heading>
          <Text
            type="code"
            size="xsm"
            color="secondary"
            className="font-mono text-xs leading-relaxed text-secondary"
          >
            {project.primaryFocus}
          </Text>
        </VStack>

        <VStack
          gap={2}
          className="min-w-0 rounded-xl border border-white/[0.07] bg-recessed px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
        >
          <Text
            type="code"
            size="xsm"
            className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-secondary/80"
          >
            Signal Chain
          </Text>

          <HStack
            as="ol"
            wrap="wrap"
            vAlign="center"
            gap={1.5}
            aria-label={`${project.title} system signal chain`}
            className="m-0 min-w-0 list-none p-0"
          >
            {project.signalChain.map((node, index) => (
              <HStack
                as="li"
                key={node}
                vAlign="center"
                gap={1.5}
                className="max-w-full min-w-0"
              >
                <Text
                  type="code"
                  size="xsm"
                  textWrap="wrap"
                  wordBreak="break-word"
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] leading-snug text-primary/90"
                >
                  {node}
                </Text>
                {index < project.signalChain.length - 1 ? (
                  <Text
                    type="code"
                    size="xsm"
                    aria-hidden="true"
                    className="shrink-0 font-mono text-xs text-copper/80"
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
          gap={2}
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
                className="mt-0.5 shrink-0 font-mono text-xs text-secondary/70"
              >
                —
              </Text>
              <Text
                type="body"
                as="p"
                color="secondary"
                className="min-w-0 text-[0.90625rem] leading-[1.6] text-secondary"
              >
                {bullet}
              </Text>
            </HStack>
          ))}
        </VStack>

        <VStack
          gap={3}
          className="mt-auto min-w-0 border-t border-white/[0.06] pt-4"
        >
          <HStack
            as="ul"
            wrap="wrap"
            gap={1.5}
            aria-label={`${project.title} buses and hardware stack`}
            className="m-0 min-w-0 list-none p-0"
          >
            {project.protocolIds.map((protocolId) => {
              const protocol = protocolMap.get(protocolId);
              const label = protocol ? protocol.name : protocolId.toUpperCase();
              const isProtocolHighlighted = activeProtocol?.id === protocolId;

              return (
                <HStack as="li" key={`bus-${protocolId}`}>
                  <Text
                    type="code"
                    size="xsm"
                    className={[
                      "rounded-full border px-2.5 py-0.5 font-mono text-[11px] transition-colors",
                      isProtocolHighlighted
                        ? "border-[var(--border-active)] bg-[var(--accent-copper-subtle)] font-medium text-copper"
                        : "border-white/15 bg-white/[0.05] text-primary",
                    ].join(" ")}
                  >
                    {label}
                  </Text>
                </HStack>
              );
            })}

            {project.techTags.map((tag) => (
              <HStack as="li" key={tag}>
                <Text
                  type="code"
                  size="xsm"
                  className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-0.5 font-mono text-[11px] text-secondary"
                >
                  {tag}
                </Text>
              </HStack>
            ))}
          </HStack>

          {actionLinks.length > 0 ? (
            <HStack
              wrap="wrap"
              gap={2}
              className="border-t border-white/[0.06] pt-3"
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
                  className="!rounded-full !border-white/12 !bg-white/[0.04] !font-mono !text-xs !text-primary hover:!border-white/25"
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
    <VStack gap={6} className="min-w-0">
      <VStack
        gap={3}
        hAlign="center"
        role="region"
        aria-label="Project protocol filter controls"
        className="min-w-0"
      >
        <HStack
          wrap="wrap"
          gap={1.5}
          hAlign="center"
          vAlign="center"
          role="group"
          aria-label="Filter projects by communication bus"
          className="max-w-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-1.5 sm:rounded-full"
        >
          <Button
            label="All Builds"
            variant={activeProtocol === null ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveProtocolId(null)}
            aria-pressed={activeProtocol === null}
            className={[
              "!rounded-full !font-mono !text-xs transition-colors",
              activeProtocol === null
                ? "!bg-primary !text-canvas hover:!bg-copper"
                : "!text-secondary hover:!bg-white/[0.06] hover:!text-primary",
            ].join(" ")}
          />

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
                className={[
                  "!rounded-full !font-mono !text-xs transition-colors",
                  isSelected
                    ? "!border-[var(--border-active)] !bg-[var(--accent-copper-subtle)] !text-copper"
                    : "!border-transparent !bg-transparent !text-secondary hover:!bg-white/[0.06] hover:!text-primary",
                ].join(" ")}
              >
                {protocol.name}
              </ToggleButton>
            );
          })}
        </HStack>

        <HStack gap={3} vAlign="center" hAlign="center" wrap="wrap">
          <HStack gap={1.5} vAlign="center">
            <StatusDot
              variant={activeProtocol ? "accent" : "success"}
              isPulsing={Boolean(activeProtocol)}
              label={
                activeProtocol
                  ? `Highlighting builds using ${activeProtocol.name}`
                  : "All engineering projects visible"
              }
            />
            <Text
              type="supporting"
              size="xsm"
              color="secondary"
              aria-live="polite"
              className="font-mono text-xs text-secondary"
            >
              {activeProtocol
                ? `${matchingProjects.length} of ${projects.length} builds use ${activeProtocol.name} (${matchingProjects.map((p) => p.id).join(", ")})`
                : `Showing all ${projects.length} hardware & firmware builds`}
            </Text>
          </HStack>

          {activeProtocol ? (
            <ToggleButton
              label="Show matches only"
              isPressed={isolateMatches}
              onPressedChange={setIsolateMatches}
              size="sm"
              icon={<Icon icon={isolateMatches ? Check : Eye} size="xsm" />}
              className={[
                "!rounded-full !font-mono !text-[11px] transition-colors",
                isolateMatches
                  ? "!border-[var(--border-active)] !bg-[var(--accent-copper-subtle)] !text-copper"
                  : "!border-white/10 !bg-white/[0.03] !text-secondary hover:!border-white/20 hover:!text-primary",
              ].join(" ")}
            >
              Matches only
            </ToggleButton>
          ) : null}
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
