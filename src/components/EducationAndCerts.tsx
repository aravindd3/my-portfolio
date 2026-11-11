import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Section } from "@astryxdesign/core/Section";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { VStack } from "@astryxdesign/core/VStack";
import { EDUCATION_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";

export function EducationAndCerts() {
  return (
    <VStack
      as="section"
      id="education"
      aria-labelledby="education-heading"
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
              04 // ACADEMIC FOUNDATION &amp; CERTIFICATIONS
            </Text>
            <Heading
              id="education-heading"
              level={2}
              className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight tracking-[-0.02em] text-primary"
            >
              Education, Coursework &amp; Certifications
            </Heading>
            <Text
              type="body"
              as="p"
              color="secondary"
              className="max-w-[68ch] text-[0.96875rem] leading-[1.65] text-secondary md:text-base"
            >
              Core undergraduate electronics curriculum and bare-metal firmware
              training grounding hardware design and embedded development.
            </Text>
          </VStack>

          <Grid
            gap={5}
            align="start"
            className="w-full grid-cols-1 lg:grid-cols-12"
          >
            <Card
              padding={0}
              className="group relative min-w-0 overflow-hidden rounded-xl border border-hairline bg-surface transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--border-active)] hover:shadow-[0_10px_30px_-15px_rgba(229,169,60,0.16)] lg:col-span-7"
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
                gap={2}
                wrap="wrap"
                className="border-b border-hairline bg-elevated px-5 py-3.5 md:px-6"
              >
                <HStack gap={2} vAlign="center">
                  <AppIcon
                    name="graduation-cap"
                    size="sm"
                    color="accent"
                  />
                  <Text
                    type="code"
                    size="xsm"
                    className="font-mono text-xs font-semibold tracking-wider text-copper"
                  >
                    EDU_RECORD // UNDERGRADUATE DEGREE
                  </Text>
                </HStack>

                <HStack
                  gap={1.5}
                  vAlign="center"
                  className="rounded-full border border-hairline bg-surface px-3 py-1"
                >
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

              <VStack gap={5} className="min-w-0 p-5 md:p-6">
                <VStack gap={1.5} className="min-w-0">
                  <Heading
                    level={3}
                    className="font-display text-xl font-semibold leading-snug text-primary"
                  >
                    {EDUCATION_DATA.degree}
                  </Heading>
                  <Text
                    type="code"
                    size="xsm"
                    className="font-mono text-sm text-secondary"
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
                    className="min-w-0 rounded-lg border border-hairline bg-elevated p-4"
                  >
                    <Text
                      type="code"
                      size="xsm"
                      className="font-mono text-xs text-secondary"
                    >
                      CUMULATIVE GPA
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
                    className="min-w-0 rounded-lg border border-hairline bg-elevated p-4"
                  >
                    <Text
                      type="code"
                      size="xsm"
                      className="font-mono text-xs text-secondary"
                    >
                      EXPECTED GRADUATION
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

                <Divider variant="subtle" />

                <VStack gap={3} className="min-w-0">
                  <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
                    <Text
                      type="code"
                      size="xsm"
                      className="font-mono text-xs font-semibold tracking-wider text-secondary"
                    >
                      RELEVANT_COURSEWORK
                    </Text>
                    <HStack gap={1.5} vAlign="center">
                      <Badge
                        variant="neutral"
                        label={EDUCATION_DATA.coursework.length}
                      />
                      <Text
                        type="code"
                        size="xsm"
                        className="font-mono text-xs text-secondary"
                      >
                        Core Subjects
                      </Text>
                    </HStack>
                  </HStack>

                  <HStack
                    as="ul"
                    wrap="wrap"
                    gap={2}
                    aria-label="Relevant engineering coursework"
                    className="m-0 min-w-0 list-none p-0"
                  >
                    {EDUCATION_DATA.coursework.map((course) => (
                      <HStack as="li" key={course}>
                        <Token
                          label={course}
                          size="md"
                          color="default"
                          className="font-mono"
                        />
                      </HStack>
                    ))}
                  </HStack>
                </VStack>
              </VStack>
            </Card>

            <Card
              padding={0}
              className="group relative min-w-0 overflow-hidden rounded-xl border border-hairline bg-surface transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--border-active)] hover:shadow-[0_10px_30px_-15px_rgba(229,169,60,0.16)] lg:col-span-5"
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
                gap={2}
                wrap="wrap"
                className="border-b border-hairline bg-elevated px-5 py-3.5 md:px-6"
              >
                <HStack gap={2} vAlign="center">
                  <AppIcon name="award" size="sm" color="accent" />
                  <Text
                    type="code"
                    size="xsm"
                    className="font-mono text-xs font-semibold tracking-wider text-copper"
                  >
                    CERT_REGISTRY
                  </Text>
                </HStack>

                <HStack gap={1.5} vAlign="center">
                  <Badge
                    variant="neutral"
                    label={EDUCATION_DATA.certifications.length}
                  />
                  <Text
                    type="code"
                    size="xsm"
                    className="font-mono text-xs text-secondary"
                  >
                    {EDUCATION_DATA.certifications.length === 1
                      ? "Certification"
                      : "Certifications"}
                  </Text>
                </HStack>
              </HStack>

              <VStack
                as="ul"
                gap={4}
                aria-label="Engineering certifications"
                className="m-0 min-w-0 list-none p-5 md:p-6"
              >
                {EDUCATION_DATA.certifications.map((cert, index) => (
                  <VStack
                    as="li"
                    key={cert.title}
                    gap={3}
                    className="min-w-0 rounded-lg border border-hairline bg-elevated p-4"
                  >
                    <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
                      <Token
                        label={cert.issuer}
                        size="sm"
                        color="yellow"
                        className="font-mono"
                      />
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
                      <HStack className="pt-1">
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
                          className="font-mono text-xs"
                        />
                      </HStack>
                    ) : null}
                  </VStack>
                ))}
              </VStack>
            </Card>
          </Grid>
        </VStack>
      </Section>
    </VStack>
  );
}
