import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Section } from "@astryxdesign/core/Section";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { EDUCATION_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";
import { SectionHeader } from "./SectionHeader";

export function EducationAndCerts() {
  return (
    <VStack
      as="section"
      id="education"
      aria-labelledby="education-heading"
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
            headingId="education-heading"
            eyebrow="04 · Education & Certifications"
            icon="graduation-cap"
            title="Academic Foundation"
            subtitle="Core undergraduate electronics curriculum and bare-metal firmware training grounding hardware design and embedded development."
          />

          <Grid
            gap={5}
            align="stretch"
            className="w-full grid-cols-1 lg:grid-cols-12"
          >
            <Card
              padding={0}
              className="group relative flex h-full min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] via-[#0B0E14]/95 to-[#080A0F]/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 md:p-7 lg:col-span-7"
            >
              <VStack gap={5} className="h-full min-w-0">
                <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
                  <HStack gap={3} vAlign="center">
                    <HStack
                      hAlign="center"
                      vAlign="center"
                      className="h-9 w-9 shrink-0 rounded-xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    >
                      <AppIcon name="graduation-cap" size="sm" color="accent" />
                    </HStack>
                    <Text
                      type="code"
                      size="xsm"
                      className="font-mono text-xs font-medium text-secondary"
                    >
                      Undergraduate Degree
                    </Text>
                  </HStack>

                  <HStack gap={1.5} vAlign="center">
                    <StatusDot
                      variant="success"
                      isPulsing
                      label="Ongoing degree program"
                    />
                    <Text
                      type="code"
                      size="xsm"
                      hasTabularNumbers
                      className="font-mono text-xs font-medium text-signal"
                    >
                      {EDUCATION_DATA.duration}
                    </Text>
                  </HStack>
                </HStack>

                <VStack gap={1} className="min-w-0">
                  <Heading
                    level={3}
                    className="font-display text-lg font-semibold leading-snug text-primary md:text-xl"
                  >
                    {EDUCATION_DATA.degree}
                  </Heading>
                  <Text
                    type="code"
                    size="sm"
                    color="secondary"
                    className="font-mono text-xs text-secondary md:text-sm"
                  >
                    {EDUCATION_DATA.institution} · {EDUCATION_DATA.location}
                  </Text>
                </VStack>

                <Grid
                  columns={{ minWidth: 165, max: 2 }}
                  gap={3}
                  className="w-full"
                >
                  <VStack
                    gap={1}
                    className="min-w-0 rounded-xl border border-white/[0.07] bg-recessed p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    <Text
                      type="code"
                      size="xsm"
                      className="font-mono text-[11px] uppercase tracking-wider text-secondary"
                    >
                      Cumulative GPA
                    </Text>
                    <Text
                      type="large"
                      weight="bold"
                      hasTabularNumbers
                      className="font-display text-2xl font-bold text-copper"
                    >
                      {EDUCATION_DATA.cgpa}
                    </Text>
                    <Text
                      type="supporting"
                      size="xsm"
                      color="secondary"
                      className="font-mono text-xs text-secondary"
                    >
                      {EDUCATION_DATA.institution}
                    </Text>
                  </VStack>

                  <VStack
                    gap={1}
                    className="min-w-0 rounded-xl border border-white/[0.07] bg-recessed p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    <Text
                      type="code"
                      size="xsm"
                      className="font-mono text-[11px] uppercase tracking-wider text-secondary"
                    >
                      Expected Graduation
                    </Text>
                    <Text
                      type="large"
                      weight="bold"
                      hasTabularNumbers
                      className="font-display text-2xl font-bold text-primary"
                    >
                      {EDUCATION_DATA.expectedGraduation}
                    </Text>
                    <Text
                      type="supporting"
                      size="xsm"
                      color="secondary"
                      hasTabularNumbers
                      className="font-mono text-xs text-secondary"
                    >
                      Duration: {EDUCATION_DATA.duration}
                    </Text>
                  </VStack>
                </Grid>

                <VStack
                  gap={3}
                  className="mt-auto min-w-0 border-t border-white/[0.06] pt-4"
                >
                  <Text
                    type="code"
                    size="xsm"
                    className="font-mono text-[11px] uppercase tracking-[0.12em] text-secondary"
                  >
                    Relevant Coursework
                  </Text>

                  <HStack
                    as="ul"
                    wrap="wrap"
                    gap={1.5}
                    aria-label="Relevant engineering coursework"
                    className="m-0 min-w-0 list-none p-0"
                  >
                    {EDUCATION_DATA.coursework.map((course) => (
                      <HStack as="li" key={course}>
                        <Text
                          type="code"
                          size="xsm"
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-secondary"
                        >
                          {course}
                        </Text>
                      </HStack>
                    ))}
                  </HStack>
                </VStack>
              </VStack>
            </Card>

            <Card
              padding={0}
              className="group relative flex h-full min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] via-[#0B0E14]/95 to-[#080A0F]/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 md:p-7 lg:col-span-5"
            >
              <VStack gap={5} className="h-full min-w-0">
                <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
                  <HStack gap={3} vAlign="center">
                    <HStack
                      hAlign="center"
                      vAlign="center"
                      className="h-9 w-9 shrink-0 rounded-xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    >
                      <AppIcon name="award" size="sm" color="accent" />
                    </HStack>
                    <Text
                      type="code"
                      size="xsm"
                      className="font-mono text-xs font-medium text-secondary"
                    >
                      Certifications
                    </Text>
                  </HStack>

                  <Text
                    type="code"
                    size="xsm"
                    hasTabularNumbers
                    className="font-mono text-xs text-secondary"
                  >
                    {String(EDUCATION_DATA.certifications.length).padStart(
                      2,
                      "0",
                    )}{" "}
                    Verified
                  </Text>
                </HStack>

                <VStack
                  as="ul"
                  gap={4}
                  aria-label="Engineering certifications"
                  className="m-0 min-w-0 flex-1 list-none p-0"
                >
                  {EDUCATION_DATA.certifications.map((cert, index) => (
                    <VStack
                      as="li"
                      key={cert.title}
                      gap={3}
                      className="h-full min-w-0 rounded-xl border border-white/[0.07] bg-recessed p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                    >
                      <HStack
                        hAlign="between"
                        vAlign="center"
                        gap={2}
                        wrap="wrap"
                      >
                        <Text
                          type="code"
                          size="xsm"
                          className="rounded-full border border-[var(--border-active)] bg-[var(--accent-copper-subtle)] px-2.5 py-0.5 font-mono text-[11px] font-medium text-copper"
                        >
                          {cert.issuer}
                        </Text>
                        <Text
                          type="code"
                          size="xsm"
                          hasTabularNumbers
                          className="font-mono text-xs text-secondary"
                        >
                          CERT-{String(index + 1).padStart(2, "0")}
                        </Text>
                      </HStack>

                      <Heading
                        level={3}
                        className="font-display text-lg font-semibold leading-snug text-primary"
                      >
                        {cert.title}
                      </Heading>

                      <Text
                        type="body"
                        as="p"
                        color="secondary"
                        className="text-sm leading-relaxed text-secondary"
                      >
                        {cert.focus}
                      </Text>

                      {cert.certificateUrl ? (
                        <HStack className="mt-auto pt-2">
                          <Button
                            label="Verify Credential"
                            href={cert.certificateUrl}
                            as="a"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="secondary"
                            size="sm"
                            endContent={
                              <AppIcon name="external-link" size="xsm" />
                            }
                            className="!rounded-full !border-white/12 !bg-white/[0.04] !font-mono !text-xs !text-primary hover:!border-white/25"
                          />
                        </HStack>
                      ) : null}
                    </VStack>
                  ))}
                </VStack>
              </VStack>
            </Card>
          </Grid>
        </VStack>
      </Section>
    </VStack>
  );
}
