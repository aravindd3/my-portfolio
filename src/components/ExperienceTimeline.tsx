import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Section } from "@astryxdesign/core/Section";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { VStack } from "@astryxdesign/core/VStack";
import { EXPERIENCES } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";

export function ExperienceTimeline() {
  return (
    <VStack
      as="section"
      id="experience"
      aria-labelledby="experience-heading"
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
              03 // FIELD EXPERIENCE &amp; ORGANIZATIONS
            </Text>
            <Heading
              id="experience-heading"
              level={2}
              className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight tracking-[-0.02em] text-primary"
            >
              Engineering Experience &amp; Technical Forum
            </Heading>
            <Text
              type="body"
              as="p"
              color="secondary"
              className="max-w-[68ch] text-[0.96875rem] leading-[1.65] text-secondary md:text-base"
            >
              Structured embedded system design internship in bare-metal
              firmware and peripheral interfacing, complemented by ongoing
              technical society participation.
            </Text>
          </VStack>

          <VStack
            as="ol"
            gap={6}
            aria-label="Professional experience and engineering organizations"
            className="relative m-0 min-w-0 list-none p-0 md:ml-2 md:border-l md:border-hairline md:pl-7"
          >
            {EXPERIENCES.map((exp) => {
              const isOngoing = exp.dates.toLowerCase().includes("present");
              const isInternship = exp.type === "internship";

              return (
                <VStack
                  as="li"
                  key={exp.id}
                  className="relative min-w-0"
                >
                  <HStack
                    aria-hidden="true"
                    hAlign="center"
                    vAlign="center"
                    className={[
                      "absolute top-6 -left-9 hidden h-3.5 w-3.5 rounded-xs border bg-canvas md:flex",
                      isOngoing
                        ? "border-signal"
                        : "border-copper",
                    ].join(" ")}
                  >
                    <Text
                      type="code"
                      display="block"
                      className={[
                        "h-1.5 w-1.5 rounded-xs",
                        isOngoing ? "bg-signal" : "bg-copper",
                      ].join(" ")}
                    >
                      {" "}
                    </Text>
                  </HStack>

                  <Card
                    padding={0}
                    className="group relative min-w-0 overflow-hidden rounded-xl border border-hairline bg-surface transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--border-active)] hover:shadow-[0_10px_30px_-15px_rgba(229,169,60,0.16)]"
                  >
                    <Text
                      type="code"
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1.5 left-2 select-none font-mono text-[10px] leading-none text-muted/50 transition-colors group-hover:text-copper/80"
                    >
                      +
                    </Text>
                    <Text
                      type="code"
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1.5 right-2 select-none font-mono text-[10px] leading-none text-muted/50 transition-colors group-hover:text-copper/80"
                    >
                      +
                    </Text>
                    <Text
                      type="code"
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-1.5 left-2 select-none font-mono text-[10px] leading-none text-muted/50 transition-colors group-hover:text-copper/80"
                    >
                      +
                    </Text>
                    <Text
                      type="code"
                      aria-hidden="true"
                      className="pointer-events-none absolute right-2 bottom-1.5 select-none font-mono text-[10px] leading-none text-muted/50 transition-colors group-hover:text-copper/80"
                    >
                      +
                    </Text>

                    <HStack
                      hAlign="between"
                      vAlign="center"
                      gap={3}
                      wrap="wrap"
                      className="border-b border-hairline bg-elevated px-5 py-3.5 md:px-6"
                    >
                      <HStack gap={2} vAlign="center" wrap="wrap">
                        <Text
                          type="code"
                          size="xsm"
                          hasTabularNumbers
                          className="rounded border border-hairline bg-surface px-2 py-0.5 font-mono text-xs font-semibold tracking-wider text-copper"
                        >
                          {exp.id}
                        </Text>
                        <Token
                          label={isInternship ? "Internship" : "Organization"}
                          size="sm"
                          color={isInternship ? "yellow" : "cyan"}
                          icon={
                            <AppIcon
                              name={isInternship ? "briefcase" : "users"}
                              size="xsm"
                            />
                          }
                          className="font-mono"
                        />
                      </HStack>

                      <HStack
                        gap={1.5}
                        vAlign="center"
                        className="max-w-full rounded-full border border-hairline bg-surface px-3 py-1"
                      >
                        {isOngoing ? (
                          <StatusDot
                            variant="success"
                            isPulsing
                            label="Active engagement"
                          />
                        ) : null}
                        <Text
                          type="code"
                          size="xsm"
                          hasTabularNumbers
                          className={[
                            "font-mono text-xs",
                            isOngoing
                              ? "font-medium text-signal"
                              : "text-secondary",
                          ].join(" ")}
                        >
                          {exp.dates} · {exp.locationOrMode}
                        </Text>
                      </HStack>
                    </HStack>

                    <VStack gap={4} className="min-w-0 p-5 md:p-6">
                      <VStack gap={1} className="min-w-0">
                        <Heading
                          level={3}
                          className="font-display text-xl font-semibold leading-[1.35] text-primary"
                        >
                          {exp.role}
                        </Heading>
                        <Text
                          type="code"
                          size="xsm"
                          className="font-mono text-sm font-medium text-copper"
                        >
                          {exp.companyOrOrg}
                        </Text>
                      </VStack>

                      <Divider variant="subtle" />

                      <VStack
                        as="ul"
                        gap={3}
                        aria-label={`${exp.companyOrOrg} highlights`}
                        className="m-0 min-w-0 list-none p-0"
                      >
                        {exp.bullets.map((bullet) => (
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
                              className="min-w-0 max-w-[68ch] text-[0.96875rem] leading-[1.65] text-secondary"
                            >
                              {bullet}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>

                      <HStack
                        as="ul"
                        wrap="wrap"
                        gap={1.5}
                        aria-label={`${exp.companyOrOrg} technologies`}
                        className="m-0 min-w-0 list-none border-t border-hairline pt-3.5 p-0"
                      >
                        {exp.techTags.map((tag) => (
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
                    </VStack>
                  </Card>
                </VStack>
              );
            })}
          </VStack>
        </VStack>
      </Section>
    </VStack>
  );
}
