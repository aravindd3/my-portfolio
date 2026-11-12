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
      className="relative w-full overflow-hidden bg-[radial-gradient(ellipse_80%_65%_at_50%_52%,rgba(20,28,42,0.48)_0%,rgba(6,9,13,0.95)_64%,#06090D_100%)] lg:h-svh lg:min-h-[680px]"
    >
      {/* Top Centered Editorial Copy Stack */}
      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative z-10 ms-auto me-auto w-full px-5 pt-20 pb-0 md:px-12 md:pt-22"
      >
        <VStack gap={3} hAlign="center" className="mx-auto max-w-3xl text-center">
          {/* Personal Punchline in clean geometric display font */}
          <Heading
            id="hero-name"
            level={1}
            justify="center"
            className="max-w-[26ch] text-center font-brand text-[clamp(1.85rem,3.6vw,3.1rem)] font-bold leading-[1.12] tracking-[-0.03em] text-primary sm:text-pretty"
          >
            <Text type="inherit" color="primary" className="block">
              {HERO_EDITORIAL_DATA.punchline}
            </Text>
            <Text type="inherit" color="secondary" className="block text-secondary">
              {HERO_EDITORIAL_DATA.punchlineHighlight}
            </Text>
          </Heading>

          {/* Short, sleek single-sentence career focus */}
          <Text
            type="body"
            justify="center"
            className="max-w-[58ch] text-center font-sans text-sm leading-relaxed text-secondary sm:text-[15px]"
          >
            {HERO_EDITORIAL_DATA.bioBrief}
          </Text>

          {/* Action CTAs */}
          <VStack gap={2} hAlign="center" className="pt-1">
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
      <VStack className="relative z-0 -mt-1 w-full lg:-mt-8 xl:-mt-10">
        <HeroAsciiHands altText={HERO_EDITORIAL_DATA.asciiArtAlt} />
      </VStack>

      {/* Atmospheric Transition Gradient Zone to Next Section */}
      <VStack
        aria-hidden="true"
        vAlign="end"
        hAlign="center"
        className="pointer-events-none relative z-10 -mt-12 h-20 w-full bg-gradient-to-b from-transparent via-[rgba(6,9,13,0.75)] to-[#06090D] pb-4 lg:-mt-20 lg:h-28 lg:pb-5"
      >
        <HStack gap={3} vAlign="center" className="opacity-60">
          <HStack
            as="span"
            className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--border-hairline)]"
          />
          <Text
            type="code"
            size="xsm"
            className="font-mono text-[10px] tracking-widest text-muted uppercase"
          >
            Scroll to explore
          </Text>
          <HStack
            as="span"
            className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--border-hairline)]"
          />
        </HStack>
      </VStack>
    </VStack>
  );
}
