import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { List, ListItem } from "@astryxdesign/core/List";
import { Section } from "@astryxdesign/core/Section";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { PROFILE_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";
import { CopyEmailButton } from "./CopyEmailButton";
import { SectionHeader } from "./SectionHeader";

export function ContactFooter() {
  return (
    <VStack
      as="footer"
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 w-full"
    >
      <HStack
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative ms-auto me-auto w-full px-5 pt-16 pb-12 md:px-12 md:pt-24 md:pb-14"
      >
        <VStack gap={10} className="min-w-0">
          <SectionHeader
            headingId="contact-heading"
            eyebrow="05 · Direct Channels"
            icon="mail"
            title="Get in Touch"
            subtitle="Open to embedded hardware design, KiCad PCB layout, and Embedded C firmware engineering roles."
          />

          <Card
            padding={0}
            className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] via-[#0B0E14]/95 to-[#080A0F]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <Grid
              gap={8}
              align="center"
              className="w-full grid-cols-1 p-6 md:p-8 lg:grid-cols-12"
            >
              <VStack gap={5} className="min-w-0 lg:col-span-6">
                <HStack
                  gap={2}
                  vAlign="center"
                  className="self-start py-0.5"
                >
                  <StatusDot
                    variant="success"
                    isPulsing
                    label="Available for embedded hardware and firmware engineering roles"
                  />
                  <Text
                    type="code"
                    size="xsm"
                    className="font-mono text-[11px] font-medium text-signal"
                  >
                    Open to Hardware &amp; Firmware Roles
                  </Text>
                </HStack>

                <VStack gap={2} className="min-w-0">
                  <Heading
                    level={3}
                    className="font-display text-xl font-semibold leading-snug text-primary md:text-2xl"
                  >
                    {PROFILE_DATA.fullName}
                  </Heading>
                  <Text
                    type="body"
                    as="p"
                    color="secondary"
                    className="max-w-[52ch] text-[0.9375rem] leading-[1.65] text-secondary"
                  >
                    {PROFILE_DATA.academicStatus} at {PROFILE_DATA.university} (
                    {PROFILE_DATA.location}). Reach out directly via email,
                    phone, LinkedIn, or GitHub.
                  </Text>
                </VStack>

                <HStack wrap="wrap" gap={3} vAlign="center" className="pt-1">
                  <Button
                    label="Email via Mail App"
                    href={`mailto:${PROFILE_DATA.email}`}
                    as="a"
                    variant="primary"
                    size="md"
                    icon={<AppIcon name="mail" size="sm" />}
                    className="!rounded-full !bg-primary !px-5 !font-sans !text-sm !font-semibold !text-canvas transition-all duration-200 hover:-translate-y-0.5 hover:!bg-copper"
                  />

                  <CopyEmailButton email={PROFILE_DATA.email} />

                  <Button
                    label="Resume PDF"
                    href={PROFILE_DATA.resumePdfUrl}
                    as="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="md"
                    icon={<AppIcon name="file-down" size="sm" />}
                    endContent={<AppIcon name="external-link" size="xsm" />}
                    className="!rounded-full !border-white/12 !bg-white/[0.04] !px-4 !font-mono !text-xs !text-primary transition-colors hover:!border-white/25"
                  />
                </HStack>
              </VStack>

              <VStack className="min-w-0 lg:col-span-6">
                <VStack className="min-w-0 overflow-hidden rounded-xl border border-white/[0.07] bg-recessed shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <List
                    hasDividers
                    density="balanced"
                    edge="bleed"
                    header={
                      <HStack
                        hAlign="between"
                        vAlign="center"
                        gap={2}
                        className="border-b border-white/[0.06] px-4 py-2.5"
                      >
                        <Text
                          type="code"
                          size="xsm"
                          className="font-mono text-[11px] uppercase tracking-[0.12em] text-secondary"
                        >
                          Verified Channels
                        </Text>
                        <Text
                          type="code"
                          size="xsm"
                          hasTabularNumbers
                          className="font-mono text-[11px] text-secondary"
                        >
                          04 Links
                        </Text>
                      </HStack>
                    }
                  >
                    <ListItem
                      href={`mailto:${PROFILE_DATA.email}`}
                      align="center"
                      startContent={
                        <AppIcon name="mail" size="sm" color="accent" />
                      }
                      label={
                        <Text
                          type="code"
                          size="sm"
                          wordBreak="break-word"
                          className="font-mono text-xs font-medium text-copper md:text-sm"
                        >
                          {PROFILE_DATA.email}
                        </Text>
                      }
                      description={
                        <Text
                          type="code"
                          size="xsm"
                          color="secondary"
                          className="font-mono text-xs text-secondary"
                        >
                          Direct Email
                        </Text>
                      }
                    />

                    <ListItem
                      href={PROFILE_DATA.phoneHref}
                      align="center"
                      startContent={
                        <AppIcon name="phone" size="sm" color="primary" />
                      }
                      label={
                        <Text
                          type="code"
                          size="sm"
                          hasTabularNumbers
                          className="font-mono text-xs font-medium text-primary md:text-sm"
                        >
                          {PROFILE_DATA.phone}
                        </Text>
                      }
                      description={
                        <Text
                          type="code"
                          size="xsm"
                          color="secondary"
                          className="font-mono text-xs text-secondary"
                        >
                          Telephone
                        </Text>
                      }
                    />

                    <ListItem
                      href={PROFILE_DATA.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      align="center"
                      startContent={
                        <AppIcon name="users" size="sm" color="primary" />
                      }
                      label={
                        <Text
                          type="code"
                          size="sm"
                          wordBreak="break-word"
                          className="font-mono text-xs font-medium text-primary md:text-sm"
                        >
                          {PROFILE_DATA.linkedinLabel}
                        </Text>
                      }
                      description={
                        <Text
                          type="code"
                          size="xsm"
                          color="secondary"
                          className="font-mono text-xs text-secondary"
                        >
                          LinkedIn
                        </Text>
                      }
                      endContent={
                        <AppIcon
                          name="external-link"
                          size="xsm"
                          color="secondary"
                        />
                      }
                    />

                    <ListItem
                      href={PROFILE_DATA.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      align="center"
                      startContent={
                        <AppIcon name="folder-git" size="sm" color="accent" />
                      }
                      label={
                        <Text
                          type="code"
                          size="sm"
                          wordBreak="break-word"
                          className="font-mono text-xs font-medium text-primary md:text-sm"
                        >
                          {PROFILE_DATA.githubLabel}
                        </Text>
                      }
                      description={
                        <Text
                          type="code"
                          size="xsm"
                          color="secondary"
                          className="font-mono text-xs text-secondary"
                        >
                          GitHub
                        </Text>
                      }
                      endContent={
                        <AppIcon
                          name="external-link"
                          size="xsm"
                          color="secondary"
                        />
                      }
                    />
                  </List>
                </VStack>
              </VStack>
            </Grid>
          </Card>

          {/* Immersive Interactive Return to Top */}
          <HStack
            hAlign="center"
            vAlign="center"
            className="w-full border-t border-white/[0.07] pt-10 pb-4"
          >
            <Link
              href="#top"
              color="secondary"
              isStandalone
              aria-label="Return to top of page"
              className="group relative inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-mono text-xs uppercase tracking-[0.24em] text-secondary no-underline backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-copper hover:bg-copper/[0.1] hover:text-white hover:shadow-[0_0_30px_rgba(229,169,60,0.35)] focus-visible:outline-offset-4"
            >
              {/* Radar pulse aura on hover */}
              <HStack
                as="span"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full border border-copper/30 opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-60"
              />

              <HStack
                as="span"
                hAlign="center"
                vAlign="center"
                className="size-6 rounded-full border border-white/20 bg-white/5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:border-copper group-hover:bg-copper group-hover:text-canvas"
              >
                <AppIcon name="arrow-up" size="xsm" color="inherit" />
              </HStack>

              <Text
                as="span"
                type="inherit"
                color="inherit"
                className="font-mono text-xs font-medium tracking-[0.2em] transition-colors group-hover:text-copper"
              >
                Back to Top
              </Text>

              <HStack as="span" className="h-1.5 w-1.5 rounded-full bg-signal/80 shadow-[0_0_6px_#10B981]" />
            </Link>
          </HStack>
        </VStack>
      </Section>
    </VStack>
  );
}
