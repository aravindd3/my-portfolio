import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { HERO_EDITORIAL_DATA, PROFILE_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";
import { HeroAsciiHands } from "./HeroAsciiHands";
import { HeroInteractiveBackground } from "./HeroInteractiveBackground";

/**
 * Stage 1: Personal Introduction Hero Slide
 * Welcomes visitors with lively interactive circuit background, centered typography,
 * social/resume link pills at the bottom, and a clean minimalist scroll prompt.
 */
export function HeroIntroSlide() {
  return (
    <VStack
      as="section"
      id="top"
      aria-labelledby="intro-heading"
      vAlign="between"
      hAlign="center"
      className="relative w-full h-svh min-h-svh overflow-hidden px-6 text-center bg-[var(--bg-canvas)] bg-[radial-gradient(ellipse_80%_60%_at_50%_48%,rgba(20,28,42,0.4)_0%,rgba(6,9,14,0.8)_65%,var(--bg-canvas)_100%)]"
    >
      {/* Dynamic Interactive Hardware Circuit & Signal Mesh Background */}
      <HeroInteractiveBackground />

      {/* Symmetrical Top Spacer to balance the bottom section and keep the name dead-center */}
      <HStack
        className="w-full h-28 sm:h-36 shrink-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Centerpiece Typographic Introduction */}
      <VStack
        gap={4}
        hAlign="center"
        className="relative z-10 mx-auto max-w-4xl my-auto px-4"
      >
        <Text
          type="code"
          size="sm"
          className="font-mono text-xs sm:text-sm font-semibold tracking-[0.32em] uppercase text-copper drop-shadow-[0_0_12px_rgba(229,169,60,0.25)]"
        >
          {HERO_EDITORIAL_DATA.introGreeting}
        </Text>

        <Heading
          id="intro-heading"
          level={1}
          justify="center"
          className="text-center font-brand text-[clamp(2.75rem,8vw,5.75rem)] font-extrabold tracking-[-0.04em] leading-[1.04] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
        >
          {HERO_EDITORIAL_DATA.introName}
        </Heading>

        <Text
          type="body"
          justify="center"
          className="max-w-[54ch] text-center font-sans text-base sm:text-lg leading-relaxed text-secondary drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          {HERO_EDITORIAL_DATA.introBio}
        </Text>
      </VStack>

      {/* Bottom Section: Link Pills + Minimalist Scroll Indicator */}
      <VStack
        gap={3}
        hAlign="center"
        className="relative z-10 w-full h-28 sm:h-36 shrink-0 justify-end pb-8 sm:pb-10 pointer-events-auto"
      >
        {/* Action Channels / Link Pills Moved to the Bottom of Slide 1 */}
        <HStack
          wrap="wrap"
          gap={2}
          hAlign="center"
          vAlign="center"
          className="pt-1"
        >
          <Link
            href={PROFILE_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            isStandalone
            display="block"
            className="group rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,255,255,0.45)]"
          >
            <HStack as="span" gap={2} vAlign="center">
              <AppIcon
                name="folder-git"
                size="sm"
                className="transition-colors duration-200 group-hover:text-black"
              />
              <Text
                type="inherit"
                color="inherit"
                className="tracking-wide transition-colors duration-200 group-hover:text-black"
              >
                Github
              </Text>
            </HStack>
          </Link>

          <Link
            href={PROFILE_DATA.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            isStandalone
            display="block"
            className="group rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,255,255,0.45)]"
          >
            <HStack as="span" gap={2} vAlign="center">
              <AppIcon
                name="external-link"
                size="sm"
                className="transition-colors duration-200 group-hover:text-black"
              />
              <Text
                type="inherit"
                color="inherit"
                className="tracking-wide transition-colors duration-200 group-hover:text-black"
              >
                Linkedin
              </Text>
            </HStack>
          </Link>

          {PROFILE_DATA.instagramUrl && (
            <Link
              href={PROFILE_DATA.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              isStandalone
              display="block"
              className="group rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,255,255,0.45)]"
            >
              <HStack as="span" gap={2} vAlign="center">
                <AppIcon
                  name="instagram"
                  size="sm"
                  className="transition-colors duration-200 group-hover:text-black"
                />
                <Text
                  type="inherit"
                  color="inherit"
                  className="tracking-wide transition-colors duration-200 group-hover:text-black"
                >
                  Instagram
                </Text>
              </HStack>
            </Link>
          )}

          <Link
            href={PROFILE_DATA.resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            isStandalone
            display="block"
            className="group rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-primary/90 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,255,255,0.45)]"
          >
            <HStack as="span" gap={2} vAlign="center">
              <AppIcon
                name="file-down"
                size="sm"
                className="transition-colors duration-200 group-hover:text-black"
              />
              <Text
                type="inherit"
                color="inherit"
                className="tracking-wide transition-colors duration-200 group-hover:text-black"
              >
                Resume
              </Text>
            </HStack>
          </Link>
        </HStack>

        {/* Minimalist Scroll Cue below Link Pills with Dynamic Arrow Animation */}
        <Link
          href="#hero-technical"
          isStandalone
          aria-label="Scroll down to technical overview"
          className="group flex flex-col items-center gap-1.5 no-underline pt-1 transition-all duration-300 focus-visible:outline-offset-4"
        >
          <HStack
            gap={3}
            vAlign="center"
            className="text-secondary/70 transition-colors duration-300 group-hover:text-copper"
          >
            <HStack
              as="span"
              className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-white/20 transition-all duration-300 group-hover:to-copper/50"
            />
            <Text
              type="code"
              size="xsm"
              className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-inherit"
            >
              {HERO_EDITORIAL_DATA.introScrollCta}
            </Text>
            <HStack
              as="span"
              className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-white/20 transition-all duration-300 group-hover:to-copper/50"
            />
          </HStack>

          {/* Dynamic Gliding Arrow */}
          <HStack
            as="span"
            hAlign="center"
            vAlign="center"
            className="text-secondary/60 transition-colors duration-300 group-hover:text-copper"
          >
            <AppIcon
              name="chevron-down"
              size="sm"
              color="inherit"
              className="animate-dynamic-arrow"
            />
          </HStack>
        </Link>
      </VStack>
    </VStack>
  );
}

/**
 * Stage 2: Technical Philosophy & Interactive ASCII Core Hero Slide
 * Features the engineering punchline, living ASCII hands & star canvas, and direct action channels.
 */
export function HeroTechnicalSlide() {
  return (
    <VStack
      as="section"
      id="hero-technical"
      aria-labelledby="hero-name"
      vAlign="between"
      className="relative w-full overflow-hidden bg-[radial-gradient(ellipse_75%_60%_at_50%_52%,rgba(20,28,42,0.34)_0%,rgba(6,9,13,0.16)_62%,transparent_100%)] lg:h-svh lg:min-h-[680px]"
    >
      {/* Top Centered Editorial Copy Stack */}
      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative z-10 ms-auto me-auto w-full px-5 pt-20 pb-0 md:px-12 md:pt-22"
      >
        <VStack gap={3} hAlign="center" className="mx-auto max-w-3xl text-center">
          {/* Engineering Philosophy Punchline */}
          <Heading
            id="hero-name"
            level={2}
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
        </VStack>
      </Section>

      {/* Full-Width ASCII Art Hands & Animated Embedded Core Stage */}
      <VStack className="relative z-0 -mt-1 w-full lg:-mt-8 xl:-mt-10">
        <HeroAsciiHands altText={HERO_EDITORIAL_DATA.asciiArtAlt} />
      </VStack>

      {/* Subtle Transition to Projects Showcase */}
      <VStack
        vAlign="end"
        hAlign="center"
        gap={2}
        className="relative z-10 -mt-2 w-full pb-6 lg:-mt-4 lg:pb-8"
      >
        <Link
          href="#projects"
          isStandalone
          aria-label="Explore Projects"
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 font-mono text-xs text-primary/90 no-underline backdrop-blur-md transition-all duration-200 hover:border-copper/60 hover:bg-copper/[0.08] hover:text-white"
        >
          <Text type="inherit" color="inherit" className="tracking-wide">
            {HERO_EDITORIAL_DATA.primaryCtaLabel}
          </Text>
          <AppIcon
            name="arrow-right"
            size="xsm"
            color="inherit"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </VStack>
    </VStack>
  );
}

/**
 * Default composite HeroSection rendering both seamless slides.
 */
export function HeroSection() {
  return (
    <>
      <HeroIntroSlide />
      <HeroTechnicalSlide />
    </>
  );
}
