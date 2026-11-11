import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Section } from "@astryxdesign/core/Section";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { EXPERIENCES } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";
import { SectionHeader } from "./SectionHeader";

export function ExperienceTimeline() {
  return (
    <VStack
      as="section"
      id="experience"
      aria-labelledby="experience-heading"
      className="relative w-full"
    >
      <HStack
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative ms-auto me-auto w-full px-5 py-16 md:px-12 md:py-24"
      >
        <VStack gap={10} className="min-w-0">
          <SectionHeader
            headingId="experience-heading"
            eyebrow="03 · Experience & Forum"
            icon="briefcase"
            title="Engineering Experience"
            subtitle="Structured embedded system design internship in bare-metal firmware and peripheral interfacing alongside ongoing technical society participation."
          />

          <Grid
            gap={5}
            align="stretch"
            aria-label="Professional experience and engineering organizations"
            className="w-full grid-cols-1 lg:grid-cols-12"
          >
            {EXPERIENCES.map((exp) => {
              const isOngoing = exp.dates.toLowerCase().includes("present");
              const isInternship = exp.type === "internship";

              return (
                <Card
                  key={exp.id}
                  padding={0}
                  className={[
                    "group relative flex h-full min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] via-[#0B0E14]/95 to-[#080A0F]/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 md:p-7",
                    isInternship ? "lg:col-span-7" : "lg:col-span-5",
                  ].join(" ")}
                >
                  <VStack gap={5} className="h-full min-w-0">
                    <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
                      <HStack gap={3} vAlign="center">
                        <HStack
                          hAlign="center"
                          vAlign="center"
                          className="h-9 w-9 shrink-0 rounded-xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        >
                          <AppIcon
                            name={isInternship ? "briefcase" : "users"}
                            size="sm"
                            color={isInternship ? "accent" : "primary"}
                          />
                        </HStack>
                        <Text
                          type="code"
                          size="xsm"
                          className="font-mono text-xs font-medium text-secondary"
                        >
                          {isInternship ? "Internship" : "Organization"} · {exp.id}
                        </Text>
                      </HStack>

                      <HStack gap={1.5} vAlign="center">
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

                    <VStack gap={1} className="min-w-0">
                      <Heading
                        level={3}
                        className="font-display text-lg font-semibold leading-snug text-primary md:text-xl"
                      >
                        {exp.role}
                      </Heading>
                      <Text
                        type="code"
                        size="sm"
                        className="font-mono text-sm font-medium text-copper"
                      >
                        {exp.companyOrOrg}
                      </Text>
                    </VStack>

                    <VStack
                      as="ul"
                      gap={2}
                      aria-label={`${exp.companyOrOrg} highlights`}
                      className="m-0 min-w-0 list-none border-t border-white/[0.06] pt-4 p-0"
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
                            className="mt-0.5 shrink-0 font-mono text-xs text-secondary/70"
                          >
                            —
                          </Text>
                          <Text
                            type="body"
                            as="p"
                            color="secondary"
                            className="min-w-0 text-[0.90625rem] leading-[1.65] text-secondary"
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
                      className="m-0 mt-auto min-w-0 list-none border-t border-white/[0.06] pt-4 p-0"
                    >
                      {exp.techTags.map((tag) => (
                        <HStack as="li" key={tag}>
                          <Text
                            type="code"
                            size="xsm"
                            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-secondary"
                          >
                            {tag}
                          </Text>
                        </HStack>
                      ))}
                    </HStack>
                  </VStack>
                </Card>
              );
            })}
          </Grid>
        </VStack>
      </Section>
    </VStack>
  );
}
