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
                  className="self-start rounded-full border border-white/10 bg-white/[0.03] px-3 py-1"
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
                    className="!rounded-full !bg-primary !px-5 !font-sans !text-sm !font-semibold !text-canvas shadow-[0_0_24px_rgba(241,245,249,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:!bg-copper"
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

          <HStack
            hAlign="between"
            vAlign="center"
            wrap="wrap"
            gap={3}
            className="min-w-0 border-t border-white/[0.07] pt-6"
          >
            <HStack gap={3} vAlign="center" wrap="wrap" className="min-w-0">
              <Text
                type="code"
                size="xsm"
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-xs font-semibold text-copper"
              >
                [{PROFILE_DATA.monogram}]
              </Text>
              <Text
                type="supporting"
                size="xsm"
                color="secondary"
                className="font-mono text-xs text-secondary"
              >
                {PROFILE_DATA.fullName} · {PROFILE_DATA.university} ·{" "}
                {PROFILE_DATA.location}
              </Text>
            </HStack>

            <HStack gap={4} vAlign="center" wrap="wrap">
              <Text
                type="code"
                size="xsm"
                className="font-mono text-xs text-secondary"
              >
                {PROFILE_DATA.systemId}
              </Text>
              <Link
                href="#top"
                color="secondary"
                isStandalone
                type="code"
                size="xsm"
                className="font-mono text-xs text-secondary no-underline transition-colors hover:text-copper"
              >
                <HStack as="span" gap={1} vAlign="center">
                  <Text type="inherit" color="inherit">
                    Back to Top
                  </Text>
                  <AppIcon name="arrow-up" size="xsm" />
                </HStack>
              </Link>
            </HStack>
          </HStack>
        </VStack>
      </Section>
    </VStack>
  );
}
