import { Badge } from "@astryxdesign/core/Badge";
import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { List, ListItem } from "@astryxdesign/core/List";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { VStack } from "@astryxdesign/core/VStack";
import {
  PROTOCOLS,
  SKILL_CATEGORIES,
  type SkillItem,
} from "@/data/portfolio";
import { ProtocolFilterRibbon } from "./ProtocolFilterRibbon";

type TierTokenColor = "yellow" | "cyan" | "default" | "gray";

const TIER_COLOR_MAP: Record<SkillItem["tier"], TierTokenColor> = {
  "Tier 1 · Primary Focus": "yellow",
  "Core Hardware": "cyan",
  "Tier 2 · Applied": "default",
  "Tier 3 · Foundational": "gray",
  "Tier 3 · Project Exposure": "gray",
};

export function HardwareSpecsMatrix() {
  return (
    <VStack
      as="section"
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative w-full border-b border-hairline"
    >
      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative ms-auto me-auto w-full px-5 py-14 md:px-12 md:py-20"
      >
        <Text
          type="code"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 left-2 select-none font-mono text-[11px] leading-none text-muted/60 md:left-6"
        >
          +
        </Text>
        <Text
          type="code"
          aria-hidden="true"
          className="pointer-events-none absolute right-2 bottom-1 select-none font-mono text-[11px] leading-none text-muted/60 md:right-6"
        >
          +
        </Text>

        <VStack gap={8} className="min-w-0">
          <VStack gap={3} className="min-w-0">
            <Text
              type="code"
              size="xsm"
              className="font-mono text-xs font-semibold tracking-wider text-copper"
            >
              01 // COMMUNICATION BUSES &amp; TECHNICAL CAPABILITIES
            </Text>
            <Heading
              id="capabilities-heading"
              level={2}
              className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight tracking-[-0.02em] text-primary"
            >
              Communication Protocols &amp; Hardware Matrix
            </Heading>
            <Text
              type="body"
              as="p"
              color="secondary"
              className="max-w-[68ch] text-[0.96875rem] leading-[1.65] text-secondary md:text-base"
            >
              Hands-on hardware interfacing across wired serial buses and
              sub-GHz/short-range RF links, paired with bare-metal Embedded C
              firmware, KiCad 10.0 PCB layout, and bench signal verification.
            </Text>
          </VStack>

          <ProtocolFilterRibbon protocols={PROTOCOLS} />

          <VStack gap={4} className="min-w-0 pt-2">
            <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
              <Text
                type="code"
                size="xsm"
                className="font-mono text-xs font-semibold tracking-wider text-secondary"
              >
                SPEC_MATRIX // 06 ENGINEERING DOMAINS
              </Text>
              <Text
                type="code"
                size="xsm"
                className="font-mono text-xs text-muted"
              >
                Evaluated by hardware platforms, protocols &amp; lab validation
              </Text>
            </HStack>

            <Grid
              columns={{ minWidth: 260, max: 2 }}
              gap={5}
              align="stretch"
              className="w-full"
            >
              {SKILL_CATEGORIES.map((category, index) => {
                const categoryCode = `CAT-${String(index + 1).padStart(2, "0")}`;

                return (
                  <Card
                    key={category.id}
                    padding={0}
                    className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-hairline bg-surface"
                  >
                    <Text
                      type="code"
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1.5 left-2 select-none font-mono text-[10px] leading-none text-muted/60"
                    >
                      +
                    </Text>
                    <Text
                      type="code"
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1.5 right-2 select-none font-mono text-[10px] leading-none text-muted/60"
                    >
                      +
                    </Text>

                    <VStack
                      gap={1.5}
                      className="border-b border-hairline bg-elevated px-5 py-4"
                    >
                      <HStack hAlign="between" vAlign="center" gap={2}>
                        <Text
                          type="code"
                          size="xsm"
                          hasTabularNumbers
                          className="font-mono text-xs font-semibold tracking-wider text-copper"
                        >
                          {categoryCode}
                        </Text>
                        <HStack gap={1.5} vAlign="center">
                          <Badge
                            variant="neutral"
                            label={category.items.length}
                          />
                          <Text
                            type="code"
                            size="xsm"
                            className="font-mono text-[11px] text-secondary"
                          >
                            {category.items.length === 1 ? "Entry" : "Entries"}
                          </Text>
                        </HStack>
                      </HStack>

                      <Heading
                        level={3}
                        className="font-display text-lg font-semibold leading-snug text-primary"
                      >
                        {category.title}
                      </Heading>
                      <Text
                        type="code"
                        size="xsm"
                        color="secondary"
                        className="font-mono text-xs text-secondary"
                      >
                        {category.subtitle}
                      </Text>
                    </VStack>

                    <List
                      hasDividers
                      density="balanced"
                      edge="bleed"
                      header={
                        <Text type="code" className="sr-only">
                          {category.title}
                        </Text>
                      }
                    >
                      {category.items.map((item) => {
                        const tokenColor = TIER_COLOR_MAP[item.tier];
                        const isPrimary = Boolean(item.isPrimaryHighlight);
                        const isMuted = Boolean(item.isDeemphasized);

                        return (
                          <ListItem
                            key={item.name}
                            align="start"
                            label={
                              <HStack
                                hAlign="between"
                                vAlign="center"
                                gap={2}
                                wrap="wrap"
                                className={[
                                  "w-full min-w-0",
                                  isPrimary
                                    ? "border-l-2 border-copper pl-2.5"
                                    : "",
                                ].join(" ")}
                              >
                                <Text
                                  type="label"
                                  weight={
                                    isPrimary
                                      ? "bold"
                                      : isMuted
                                        ? "normal"
                                        : "semibold"
                                  }
                                  className={[
                                    "text-sm leading-snug",
                                    isPrimary
                                      ? "text-copper"
                                      : isMuted
                                        ? "text-secondary"
                                        : "text-primary",
                                  ].join(" ")}
                                >
                                  {item.name}
                                </Text>
                                <Token
                                  label={item.tier}
                                  size="sm"
                                  color={tokenColor}
                                  className={[
                                    "shrink-0 font-mono",
                                    isMuted ? "opacity-80" : "",
                                  ].join(" ")}
                                />
                              </HStack>
                            }
                            description={
                              <Text
                                type="supporting"
                                size="xsm"
                                color="secondary"
                                className={[
                                  "text-xs leading-relaxed text-secondary",
                                  isPrimary ? "pl-3" : "",
                                ].join(" ")}
                              >
                                {item.levelOrContext}
                              </Text>
                            }
                          />
                        );
                      })}
                    </List>
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
