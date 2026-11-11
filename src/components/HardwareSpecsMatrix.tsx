import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { List, ListItem } from "@astryxdesign/core/List";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { PROTOCOLS, SKILL_CATEGORIES } from "@/data/portfolio";
import { AppIcon, type AppIconName } from "./AppIcon";
import { ProtocolFilterRibbon } from "./ProtocolFilterRibbon";
import { SectionHeader } from "./SectionHeader";

const CATEGORY_ICON_MAP: Record<string, AppIconName> = {
  "languages-databases": "terminal",
  "embedded-platforms": "cpu",
  "hardware-competencies": "layers",
  "pcb-design-eda": "circuit-board",
  "lab-equipment": "wrench",
  "software-dev-tools": "folder-git",
};

const CATEGORY_ORDER = [
  "languages-databases",
  "hardware-competencies",
  "embedded-platforms",
  "lab-equipment",
  "pcb-design-eda",
  "software-dev-tools",
] as const;

export function HardwareSpecsMatrix() {
  const orderedCategories = [...SKILL_CATEGORIES].sort((a, b) => {
    const idxA = CATEGORY_ORDER.indexOf(
      a.id as (typeof CATEGORY_ORDER)[number],
    );
    const idxB = CATEGORY_ORDER.indexOf(
      b.id as (typeof CATEGORY_ORDER)[number],
    );
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  return (
    <VStack
      as="section"
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative w-full"
    >
      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative ms-auto me-auto w-full px-5 py-16 md:px-12 md:py-24"
      >
        <VStack gap={10} className="min-w-0">
          <SectionHeader
            headingId="capabilities-heading"
            eyebrow="01 · Interfaces & Capabilities"
            icon="radio"
            title="Protocols & Hardware Matrix"
            subtitle="Wired serial buses and sub-GHz RF links paired with bare-metal Embedded C firmware, KiCad 10.0 PCB layout, and bench verification."
          />

          <ProtocolFilterRibbon protocols={PROTOCOLS} />

          <VStack gap={6} className="min-w-0 pt-2">
            <VStack gap={1.5} hAlign="center" className="text-center">
              <Text
                type="code"
                size="xsm"
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary"
              >
                Technical Capability Matrix
              </Text>
              <Text
                type="supporting"
                size="sm"
                color="secondary"
                className="text-sm text-secondary"
              >
                Evaluated by concrete firmware languages, boards, EDA tooling,
                and lab instruments.
              </Text>
            </VStack>

            <Grid
              columns={{ minWidth: 280, max: 2 }}
              gap={5}
              align="stretch"
              className="w-full"
            >
              {orderedCategories.map((category) => {
                const iconName = CATEGORY_ICON_MAP[category.id] ?? "cpu";

                return (
                  <Card
                    key={category.id}
                    padding={0}
                    className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] via-[#0B0E14]/95 to-[#080A0F]/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:p-6"
                  >
                    <VStack gap={4} className="h-full min-w-0">
                      <HStack gap={3} vAlign="center" className="min-w-0">
                        <HStack
                          hAlign="center"
                          vAlign="center"
                          className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        >
                          <AppIcon name={iconName} size="sm" color="primary" />
                        </HStack>

                        <VStack gap={0.5} className="min-w-0">
                          <Heading
                            level={3}
                            className="font-display text-[1.0625rem] font-semibold leading-snug text-primary"
                          >
                            {category.title}
                          </Heading>
                          <Text
                            type="supporting"
                            size="xsm"
                            color="secondary"
                            className="text-xs text-secondary"
                          >
                            {category.subtitle}
                          </Text>
                        </VStack>
                      </HStack>

                      <VStack className="min-w-0 flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-recessed shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                        <List
                          hasDividers
                          density="compact"
                          edge="bleed"
                          header={
                            <Text type="code" className="sr-only">
                              {category.title}
                            </Text>
                          }
                        >
                          {category.items.map((item) => {
                            const isPrimary = Boolean(item.isPrimaryHighlight);
                            const isMuted = Boolean(item.isDeemphasized);

                            return (
                              <ListItem
                                key={item.name}
                                align="start"
                                label={
                                  <HStack
                                    hAlign="between"
                                    vAlign="start"
                                    gap={3}
                                    wrap="nowrap"
                                    className="w-full min-w-0"
                                  >
                                    <Text
                                      type="label"
                                      weight={
                                        isPrimary
                                          ? "semibold"
                                          : isMuted
                                            ? "normal"
                                            : "medium"
                                      }
                                      className={[
                                        "min-w-0 flex-1 text-[0.875rem] leading-snug",
                                        isPrimary
                                          ? "text-copper"
                                          : isMuted
                                            ? "text-secondary opacity-80"
                                            : "text-primary",
                                      ].join(" ")}
                                    >
                                      {item.name}
                                    </Text>

                                    {isPrimary ? (
                                      <Text
                                        type="code"
                                        size="xsm"
                                        className="shrink-0 rounded-full border border-[var(--border-active)] bg-[var(--accent-copper-subtle)] px-2.5 py-0.5 font-mono text-[11px] font-medium text-copper"
                                      >
                                        {item.tier}
                                      </Text>
                                    ) : (
                                      <Text
                                        type="code"
                                        size="xsm"
                                        className={[
                                          "shrink-0 font-mono text-[11px]",
                                          isMuted
                                            ? "text-secondary opacity-70"
                                            : "text-secondary",
                                        ].join(" ")}
                                      >
                                        {item.tier}
                                      </Text>
                                    )}
                                  </HStack>
                                }
                                description={
                                  <Text
                                    type="supporting"
                                    size="xsm"
                                    color="secondary"
                                    className={[
                                      "text-xs leading-relaxed text-secondary",
                                      isMuted ? "opacity-75" : "",
                                    ].join(" ")}
                                  >
                                    {item.levelOrContext}
                                  </Text>
                                }
                              />
                            );
                          })}
                        </List>
                      </VStack>
                    </VStack>
                  </Card>
                );
              })}
            </Grid>
          </VStack>
        </VStack>
      </Section>
    </VStack>
  );
}
