import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { HERO_EDITORIAL_DATA, PROFILE_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";
import { HeroAsciiHands } from "./HeroAsciiHands";

export function HeroSection() {
  return (
    <VStack
      as="section"
      id="top"
      aria-labelledby="hero-name"
      vAlign="between"
      className="relative w-full overflow-hidden border-b border-hairline bg-[radial-gradient(ellipse_80%_65%_at_50%_62%,rgba(17,23,32,0.52)_0%,rgba(7,10,15,0.94)_62%,#06090D_100%)] lg:min-h-svh"
    >
      {/* Top Centered Editorial Copy Stack */}
      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative z-10 ms-auto me-auto w-full px-5 pt-20 pb-2 md:px-12 md:pt-22 md:pb-2"
      >
        <VStack gap={3} hAlign="center" className="mx-auto max-w-4xl text-center">
          <Heading
            id="hero-name"
            level={1}
            justify="center"
            className="text-center font-display text-[clamp(1.85rem,3.8vw,3.125rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-primary"
          >
            <Text type="inherit" color="primary" className="block sm:whitespace-nowrap">
              {HERO_EDITORIAL_DATA.headlinePrimary}
            </Text>
            <Text
              type="inherit"
              color="secondary"
              className="block text-secondary sm:whitespace-nowrap"
            >
              {HERO_EDITORIAL_DATA.headlineSecondary}
            </Text>
          </Heading>

          <VStack gap={0.5} hAlign="center" className="max-w-[66ch]">
            <Text
              type="code"
              size="sm"
              color="secondary"
              justify="center"
              className="text-center font-mono text-[11px] leading-snug text-secondary sm:text-[0.8125rem]"
            >
              {HERO_EDITORIAL_DATA.subtitleLines[0]}
            </Text>
            <Text
              type="code"
              size="sm"
              color="secondary"
              justify="center"
              className="text-center font-mono text-[11px] leading-snug text-muted sm:text-[0.8125rem]"
            >
              {HERO_EDITORIAL_DATA.subtitleLines[1]}
            </Text>
          </VStack>

          <VStack gap={2} hAlign="center" className="pt-1">
            <Button
              label={HERO_EDITORIAL_DATA.primaryCtaLabel}
              href={HERO_EDITORIAL_DATA.primaryCtaHref}
              variant="primary"
              size="md"
              endContent={<AppIcon name="arrow-right" size="sm" />}
              className="!rounded-full !bg-primary !px-5 !font-sans !text-sm !font-semibold !text-canvas shadow-[0_0_26px_rgba(241,245,249,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:!bg-copper hover:shadow-[0_0_32px_rgba(229,169,60,0.28)]"
            />

            <HStack
              wrap="wrap"
              gap={3}
              hAlign="center"
              vAlign="center"
              className="pt-0.5"
            >
              <Link
                href={PROFILE_DATA.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="secondary"
                isStandalone
                display="block"
                className="font-mono text-xs text-secondary no-underline transition-colors hover:text-copper"
              >
                <HStack as="span" gap={1.5} vAlign="center">
                  <AppIcon name="file-down" size="xsm" />
                  <Text type="inherit" color="inherit">
                    Resume PDF
                  </Text>
                </HStack>
              </Link>
              <Text
                type="code"
                size="xsm"
                aria-hidden="true"
                className="font-mono text-xs text-muted/60"
              >
                /
              </Text>
              <Link
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="secondary"
                isStandalone
                display="block"
                className="font-mono text-xs text-secondary no-underline transition-colors hover:text-copper"
              >
                <HStack as="span" gap={1.5} vAlign="center">
                  <AppIcon name="folder-git" size="xsm" />
                  <Text type="inherit" color="inherit">
                    GitHub
                  </Text>
                  <AppIcon name="external-link" size="xsm" />
                </HStack>
              </Link>
              <Text
                type="code"
                size="xsm"
                aria-hidden="true"
                className="font-mono text-xs text-muted/60"
              >
                /
              </Text>
              <Link
                href="#contact"
                color="secondary"
                isStandalone
                display="block"
                className="font-mono text-xs text-secondary no-underline transition-colors hover:text-copper"
              >
                <HStack as="span" gap={1.5} vAlign="center">
                  <AppIcon name="mail" size="xsm" />
                  <Text type="inherit" color="inherit">
                    Contact
                  </Text>
                </HStack>
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Section>

      {/* Full-Width ASCII Art Hands & Animated Embedded Core Stage */}
      <VStack className="relative z-0 mt-1 w-full lg:-mt-10 xl:-mt-14">
        <HeroAsciiHands altText={HERO_EDITORIAL_DATA.asciiArtAlt} />
      </VStack>

      {/* Bottom Center Hardware Quick-Metrics Strip */}
      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative z-10 ms-auto me-auto w-full px-5 pt-2 pb-5 md:px-12 lg:-mt-14 lg:pb-6"
      >
        <HStack
          as="ul"
          wrap="wrap"
          gap={2}
          hAlign="center"
          vAlign="center"
          aria-label="Core engineering credentials"
          className="m-0 list-none p-0"
        >
          {PROFILE_DATA.quickMetrics.map((metric) => (
            <HStack
              as="li"
              key={metric.label}
              gap={2}
              vAlign="center"
              className="rounded-full border border-hairline/90 bg-surface/75 px-3 py-1 backdrop-blur-sm"
            >
              <Text
                type="code"
                size="xsm"
                className="font-mono text-[11px] text-muted"
              >
                {metric.label}:
              </Text>
              <Text
                type="code"
                size="xsm"
                weight="semibold"
                hasTabularNumbers
                className="font-mono text-[11px] font-semibold text-primary"
              >
                {metric.value}
              </Text>
            </HStack>
          ))}
        </HStack>
      </Section>
    </VStack>
  );
}
