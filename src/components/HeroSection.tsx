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
      className="relative w-full overflow-hidden bg-[radial-gradient(ellipse_80%_65%_at_50%_52%,rgba(20,28,42,0.48)_0%,rgba(6,9,13,0.95)_64%,#06090D_100%)] lg:min-h-svh"
    >
      {/* Top Centered Editorial Copy Stack */}
      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative z-10 ms-auto me-auto w-full px-5 pt-20 pb-2 md:px-12 md:pt-24 md:pb-2"
      >
        <VStack gap={4} hAlign="center" className="mx-auto max-w-3xl text-center">
          {/* Industry & Specialization Tag */}
          <HStack
            gap={2}
            vAlign="center"
            className="rounded-full border border-hairline/80 bg-surface/60 px-3.5 py-1 backdrop-blur-md"
          >
            <HStack as="span" className="size-2 rounded-full bg-signal shadow-[0_0_8px_var(--accent-signal)]" />
            <Text
              type="code"
              size="xsm"
              className="font-mono text-[10.5px] font-medium tracking-wider text-secondary uppercase sm:text-[11.5px]"
            >
              {HERO_EDITORIAL_DATA.eyebrowBadge}
            </Text>
          </HStack>

          {/* Name in clean, modern, minimalistic geometric display font matching user specification */}
          <Heading
            id="hero-name"
            level={1}
            justify="center"
            className="text-center font-brand text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-primary"
          >
            {HERO_EDITORIAL_DATA.name}
          </Heading>

          {/* Personal Punchline: Connecting Hardware & Firmware */}
          <Heading
            level={2}
            justify="center"
            className="max-w-[34ch] text-center font-display text-[clamp(1.15rem,2.2vw,1.6rem)] font-normal leading-[1.32] tracking-[-0.015em] text-secondary sm:text-pretty"
          >
            <span>{HERO_EDITORIAL_DATA.punchline} </span>
            <span className="font-medium text-primary">
              {HERO_EDITORIAL_DATA.punchlineHighlight}
            </span>
          </Heading>

          {/* Short, sleek 2-line about me & career focus */}
          <Text
            type="body"
            justify="center"
            className="max-w-[62ch] text-center font-sans text-sm leading-relaxed text-secondary sm:text-base sm:leading-relaxed"
          >
            {HERO_EDITORIAL_DATA.bioBrief}
          </Text>

          {/* Action CTAs */}
          <VStack gap={2} hAlign="center" className="pt-2">
            <Button
              label={HERO_EDITORIAL_DATA.primaryCtaLabel}
              href={HERO_EDITORIAL_DATA.primaryCtaHref}
              variant="primary"
              size="md"
              endContent={<AppIcon name="arrow-right" size="sm" />}
              className="!rounded-full !bg-primary !px-6 !py-2.5 !font-sans !text-sm !font-semibold !text-canvas shadow-[0_0_28px_rgba(241,245,249,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:!bg-copper hover:shadow-[0_0_36px_rgba(229,169,60,0.32)]"
            />

            <HStack
              wrap="wrap"
              gap={3}
              hAlign="center"
              vAlign="center"
              className="pt-1"
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
                className="font-mono text-xs text-muted/50"
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
                className="font-mono text-xs text-muted/50"
              >
                /
              </Text>
              <Link
                href={PROFILE_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="secondary"
                isStandalone
                display="block"
                className="font-mono text-xs text-secondary no-underline transition-colors hover:text-copper"
              >
                <HStack as="span" gap={1.5} vAlign="center">
                  <AppIcon name="external-link" size="xsm" />
                  <Text type="inherit" color="inherit">
                    LinkedIn
                  </Text>
                </HStack>
              </Link>
              <Text
                type="code"
                size="xsm"
                aria-hidden="true"
                className="font-mono text-xs text-muted/50"
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
      <VStack className="relative z-0 mt-2 w-full lg:-mt-6 xl:-mt-10">
        <HeroAsciiHands altText={HERO_EDITORIAL_DATA.asciiArtAlt} />
      </VStack>

      {/* Atmospheric Transition Gradient Zone to Next Section */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-10 -mt-16 h-32 w-full bg-gradient-to-b from-transparent via-[rgba(6,9,13,0.7)] to-[#06090D] lg:-mt-24 lg:h-44"
      >
        <div className="mx-auto flex h-full max-w-5xl items-end justify-center pb-6">
          <div className="flex items-center gap-3 opacity-60 transition-opacity hover:opacity-100">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--border-hairline)]" />
            <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
              Scroll to explore
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--border-hairline)]" />
          </div>
        </div>
      </div>
    </VStack>
  );
}
