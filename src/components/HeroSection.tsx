import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { Section } from "@astryxdesign/core/Section";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { VStack } from "@astryxdesign/core/VStack";
import { PROFILE_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";

export function HeroSection() {
  return (
    <VStack
      as="section"
      id="top"
      aria-labelledby="hero-name"
      className="w-full border-b border-hairline"
    >
      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="ms-auto me-auto w-full px-5 py-14 md:px-12 md:py-20"
      >
        <Grid
          gap={8}
          align="start"
          className="w-full grid-cols-1 lg:grid-cols-12 lg:gap-10"
        >
          <VStack gap={6} className="min-w-0 lg:col-span-7">
            <HStack
              gap={2}
              vAlign="center"
              className="w-fit max-w-full rounded-full border border-hairline bg-surface px-3.5 py-1.5"
            >
              <StatusDot
                variant="success"
                isPulsing
                label={PROFILE_DATA.statusBanner}
              />
              <Text
                type="code"
                size="xsm"
                className="font-mono text-xs text-signal"
              >
                {PROFILE_DATA.statusBanner}
              </Text>
            </HStack>

            <VStack gap={2} className="min-w-0">
              <Heading
                id="hero-name"
                level={1}
                className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-primary"
              >
                {PROFILE_DATA.fullName}
              </Heading>
              <Text
                type="large"
                as="p"
                color="secondary"
                className="font-sans text-base font-medium text-secondary md:text-lg"
              >
                {PROFILE_DATA.academicStatus} · {PROFILE_DATA.university},{" "}
                {PROFILE_DATA.location}
              </Text>
            </VStack>

            <HStack
              as="ul"
              wrap="wrap"
              gap={2}
              aria-label="Engineering specializations"
              className="m-0 list-none p-0"
            >
              {PROFILE_DATA.headlineTags.map((tag, index) => (
                <HStack as="li" key={tag}>
                  <Token
                    label={tag}
                    size="sm"
                    color={index === 0 ? "yellow" : "default"}
                    className="font-mono"
                  />
                </HStack>
              ))}
            </HStack>

            <Text
              type="body"
              as="p"
              color="secondary"
              className="max-w-[68ch] text-[0.96875rem] leading-[1.65] text-secondary md:text-base"
            >
              {PROFILE_DATA.bio}
            </Text>

            <HStack wrap="wrap" gap={3} vAlign="center" className="pt-1">
              <Button
                label="View Hardware Projects"
                href="#projects"
                variant="primary"
                size="lg"
                icon={<AppIcon name="cpu" size="sm" />}
                className="font-mono text-xs md:text-sm"
              />
              <Button
                label="Download Resume PDF"
                href={PROFILE_DATA.resumePdfUrl}
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                icon={<AppIcon name="file-down" size="sm" />}
                className="font-mono text-xs md:text-sm"
              />
              <Button
                label="GitHub"
                href={PROFILE_DATA.githubUrl}
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
                icon={<AppIcon name="folder-git" size="sm" />}
                endContent={<Icon icon="externalLink" size="xsm" />}
                className="font-mono text-xs md:text-sm"
              />
              <Button
                label="Contact"
                href="#contact"
                variant="ghost"
                size="lg"
                icon={<AppIcon name="mail" size="sm" />}
                className="font-mono text-xs md:text-sm"
              />
            </HStack>
          </VStack>

          <VStack className="min-w-0 lg:col-span-5">
            <Card
              padding={0}
              className="relative w-full rounded-xl border border-hairline bg-surface"
            >
              <Text
                type="code"
                aria-hidden="true"
                className="pointer-events-none absolute top-1.5 left-2 select-none font-mono text-[11px] leading-none text-muted/70"
              >
                +
              </Text>
              <Text
                type="code"
                aria-hidden="true"
                className="pointer-events-none absolute top-1.5 right-2 select-none font-mono text-[11px] leading-none text-muted/70"
              >
                +
              </Text>
              <Text
                type="code"
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1.5 left-2 select-none font-mono text-[11px] leading-none text-muted/70"
              >
                +
              </Text>
              <Text
                type="code"
                aria-hidden="true"
                className="pointer-events-none absolute right-2 bottom-1.5 select-none font-mono text-[11px] leading-none text-muted/70"
              >
                +
              </Text>

              <HStack
                hAlign="between"
                vAlign="center"
                gap={2}
                wrap="wrap"
                className="border-b border-hairline bg-elevated px-6 py-3.5"
              >
                <Text
                  type="code"
                  size="xsm"
                  className="font-mono text-xs font-medium tracking-wider text-secondary"
                >
                  {PROFILE_DATA.systemId}
                </Text>
                <HStack gap={2} vAlign="center">
                  <StatusDot
                    variant="success"
                    isPulsing
                    label="Electrical Rules Check Pass"
                  />
                  <Text
                    type="code"
                    size="xsm"
                    className="font-mono text-xs font-semibold tracking-wider text-signal"
                  >
                    ERC: PASS
                  </Text>
                </HStack>
              </HStack>

              <VStack gap={5} className="p-6">
                <Grid
                  columns={{ minWidth: 135, max: 2 }}
                  gap={3}
                  className="w-full"
                >
                  {PROFILE_DATA.quickMetrics.map((metric) => (
                    <VStack
                      key={metric.label}
                      gap={1}
                      className="min-w-0 rounded-lg border border-hairline bg-elevated p-3.5"
                    >
                      <Text
                        type="code"
                        size="xsm"
                        color="secondary"
                        className="font-mono text-xs text-muted"
                      >
                        {metric.label}
                      </Text>
                      <Text
                        type="large"
                        weight="bold"
                        hasTabularNumbers
                        className="font-display text-lg font-bold text-primary"
                      >
                        {metric.value}
                      </Text>
                      <Text
                        type="supporting"
                        size="xsm"
                        color="secondary"
                        className="font-mono text-[11px] leading-snug text-secondary"
                      >
                        {metric.subtext}
                      </Text>
                    </VStack>
                  ))}
                </Grid>

                <Divider variant="subtle" />

                <VStack gap={3} className="min-w-0">
                  <HStack hAlign="between" vAlign="center" gap={2}>
                    <Heading
                      level={2}
                      className="font-mono text-xs font-semibold tracking-wide text-copper"
                    >
                      Core Experience Pillars
                    </Heading>
                    <Text
                      type="code"
                      size="xsm"
                      hasTabularNumbers
                      className="font-mono text-xs text-muted"
                    >
                      {String(PROFILE_DATA.corePillars.length).padStart(2, "0")}{" "}
                      Modules
                    </Text>
                  </HStack>

                  <VStack as="ol" gap={3} className="m-0 list-none p-0">
                    {PROFILE_DATA.corePillars.map((pillar) => (
                      <HStack
                        as="li"
                        key={pillar.id}
                        gap={3}
                        vAlign="start"
                        className="min-w-0"
                      >
                        <Text
                          type="code"
                          size="xsm"
                          hasTabularNumbers
                          className="mt-0.5 shrink-0 rounded border border-hairline bg-elevated px-1.5 py-0.5 font-mono text-[11px] font-semibold text-copper"
                        >
                          {pillar.id}
                        </Text>
                        <VStack gap={0.5} className="min-w-0">
                          <Text
                            type="label"
                            weight="semibold"
                            className="text-sm font-semibold leading-snug text-primary"
                          >
                            {pillar.title}
                          </Text>
                          <Text
                            type="supporting"
                            size="xsm"
                            color="secondary"
                            className="text-xs leading-relaxed text-secondary"
                          >
                            {pillar.description}
                          </Text>
                        </VStack>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </VStack>
            </Card>
          </VStack>
        </Grid>
      </Section>
    </VStack>
  );
}
