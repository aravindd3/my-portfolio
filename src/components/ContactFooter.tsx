import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
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

export function ContactFooter() {
  return (
    <VStack
      as="footer"
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full"
    >
      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative ms-auto me-auto w-full px-5 py-14 md:px-12 md:py-20"
      >
        <VStack gap={8} className="min-w-0">
          <Card
            padding={0}
            className="group relative w-full min-w-0 overflow-hidden rounded-xl border border-hairline bg-surface"
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
            <Text
              type="code"
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1.5 left-2 select-none font-mono text-[10px] leading-none text-muted/60"
            >
              +
            </Text>
            <Text
              type="code"
              aria-hidden="true"
              className="pointer-events-none absolute right-2 bottom-1.5 select-none font-mono text-[10px] leading-none text-muted/60"
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
              <Text
                type="code"
                size="xsm"
                className="font-mono text-xs font-semibold tracking-wider text-copper"
              >
                05 // INTERFACE &amp; CONTACT CHANNELS
              </Text>
              <HStack gap={2} vAlign="center">
                <StatusDot
                  variant="success"
                  isPulsing
                  label="Available for embedded hardware and firmware engineering roles"
                />
                <Text
                  type="code"
                  size="xsm"
                  className="font-mono text-xs font-semibold tracking-wider text-signal"
                >
                  BUS_LINK: READY
                </Text>
              </HStack>
            </HStack>

            <Grid
              gap={8}
              align="start"
              className="w-full grid-cols-1 p-5 md:p-8 lg:grid-cols-12"
            >
              <VStack gap={5} className="min-w-0 lg:col-span-6">
                <VStack gap={2} className="min-w-0">
                  <Heading
                    id="contact-heading"
                    level={2}
                    className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight tracking-[-0.02em] text-primary"
                  >
                    Direct Engineering Contact
                  </Heading>
                  <Text
                    type="body"
                    as="p"
                    color="secondary"
                    className="max-w-[54ch] text-[0.96875rem] leading-[1.65] text-secondary md:text-base"
                  >
                    {PROFILE_DATA.academicStatus} at {PROFILE_DATA.university} (
                    {PROFILE_DATA.location}). Reach out regarding embedded
                    hardware design, KiCad PCB layout, or Embedded C firmware
                    opportunities.
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
                    className="font-mono text-xs"
                  />

                  <CopyEmailButton email={PROFILE_DATA.email} />

                  <Button
                    label="Resume PDF"
                    href={PROFILE_DATA.resumePdfUrl}
                    as="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="md"
                    icon={<AppIcon name="file-down" size="sm" />}
                    endContent={<AppIcon name="external-link" size="xsm" />}
                    className="font-mono text-xs"
                  />
                </HStack>
              </VStack>

              <VStack className="min-w-0 lg:col-span-6">
                <VStack className="min-w-0 overflow-hidden rounded-lg border border-hairline bg-elevated">
                  <List
                    hasDividers
                    density="balanced"
                    edge="bleed"
                    header={
                      <HStack
                        hAlign="between"
                        vAlign="center"
                        gap={2}
                        className="border-b border-hairline bg-surface px-4 py-2.5"
                      >
                        <Text
                          type="code"
                          size="xsm"
                          className="font-mono text-xs font-semibold tracking-wider text-secondary"
                        >
                          PINOUT_DIRECTORY // VERIFIED LINKS
                        </Text>
                        <Text
                          type="code"
                          size="xsm"
                          hasTabularNumbers
                          className="font-mono text-xs text-secondary"
                        >
                          04 Channels
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
                          CH-01 // Direct Email (mailto)
                        </Text>
                      }
                    />

                    <ListItem
                      href={PROFILE_DATA.phoneHref}
                      align="center"
                      startContent={
                        <AppIcon name="phone" size="sm" color="info" />
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
                          CH-02 // Direct Telephone
                        </Text>
                      }
                    />

                    <ListItem
                      href={PROFILE_DATA.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      align="center"
                      startContent={
                        <AppIcon name="users" size="sm" color="info" />
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
                          CH-03 // LinkedIn Profile
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
                          CH-04 // GitHub Repositories
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

          <Divider variant="subtle" />

          <HStack
            hAlign="between"
            vAlign="center"
            wrap="wrap"
            gap={3}
            className="min-w-0"
          >
            <HStack gap={2} vAlign="center" wrap="wrap" className="min-w-0">
              <Text
                type="code"
                size="xsm"
                className="rounded border border-hairline bg-surface px-2 py-0.5 font-mono text-xs font-semibold text-copper"
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
                className="font-mono text-xs text-secondary transition-colors hover:text-copper"
              >
                Back to Top ↑
              </Link>
            </HStack>
          </HStack>
        </VStack>
      </Section>
    </VStack>
  );
}
