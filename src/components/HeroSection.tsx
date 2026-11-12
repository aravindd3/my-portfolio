import Image from "next/image";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { HERO_EDITORIAL_DATA, PROFILE_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";
import { HeroAsciiHands } from "./HeroAsciiHands";

/**
 * Stage 1: Personal Introduction Hero Slide
 * Welcomes visitors with high-impact minimalist typography and guides them to scroll.
 */
export function HeroIntroSlide() {
  return (
    <VStack
      as="section"
      id="top"
      aria-labelledby="intro-heading"
      vAlign="between"
      hAlign="center"
      className="relative w-full min-h-svh h-svh overflow-hidden px-6 pt-24 pb-8 sm:pb-12 text-center bg-[#020306] bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(15,23,42,0.45)_0%,rgba(2,3,6,0.95)_70%,#020306_100%)]"
    >
      {/* Top Status & System Ready Indicator */}
      <HStack gap={2} vAlign="center" className="relative z-10 opacity-80 pt-2">
        <HStack
          as="span"
          className="size-2 rounded-full bg-signal shadow-[0_0_8px_var(--accent-signal)] animate-pulse"
        />
        <Text
          type="code"
          size="xsm"
          className="font-mono text-[11px] font-semibold tracking-[0.24em] uppercase text-secondary"
        >
          {HERO_EDITORIAL_DATA.introStatus}
        </Text>
      </HStack>

      {/* Centerpiece Typographic Introduction */}
      <VStack
        gap={4}
        hAlign="center"
        className="relative z-10 mx-auto max-w-4xl my-auto"
      >
        <Text
          type="code"
          size="sm"
          className="font-mono text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-copper"
        >
          {HERO_EDITORIAL_DATA.introGreeting}
        </Text>

        <Heading
          id="intro-heading"
          level={1}
          justify="center"
          className="text-center font-brand text-[clamp(2.75rem,8vw,5.75rem)] font-extrabold tracking-[-0.04em] leading-[1.04] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
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

      {/* Bottom Corner Ultra-Realistic Picture */}
      <aside
        aria-label="Gravitational vortex artwork"
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 hidden sm:block pointer-events-auto"
      >
        <div className="group relative w-36 sm:w-44 md:w-52 aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 bg-black/90 shadow-[0_16px_48px_rgba(0,0,0,0.95),0_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.03] hover:border-white/35">
          <Image
            src="/images/blackhole-vortex.jpg"
            alt="Ultra-realistic gravitational vortex and lone observer at the event horizon"
            fill
            sizes="(max-width: 768px) 176px, 208px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20" />
        </div>
      </aside>

      {/* Bottom Guide to Scroll to Technical Hero Slide */}
      <Link
        href="#hero-technical"
        isStandalone
        aria-label="Scroll down to technical overview and interactive ASCII core"
        className="group relative z-10 flex flex-col items-center gap-2.5 no-underline opacity-70 transition-all duration-300 hover:opacity-100 focus-visible:outline-offset-4"
      >
        <Text
          type="code"
          size="xsm"
          className="font-mono text-[11px] tracking-[0.25em] uppercase text-secondary transition-colors duration-200 group-hover:text-copper"
        >
          {HERO_EDITORIAL_DATA.introScrollCta}
        </Text>
        <HStack
          as="span"
          hAlign="center"
          vAlign="center"
          className="size-8 rounded-full border border-white/15 bg-black/40 text-secondary backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:translate-y-1 group-hover:border-copper/40 group-hover:bg-copper/10 group-hover:text-copper"
        >
          <AppIcon name="chevron-down" size="sm" color="inherit" />
        </HStack>
        <HStack
          as="span"
          className="h-8 w-px bg-gradient-to-b from-white/20 via-copper/50 to-transparent transition-all duration-300 group-hover:h-12 group-hover:via-white"
        />
      </Link>
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

      {/* Subtle Transition Zone: Scroll to Explore + Action Channels Below the ASCII Stage */}
      <VStack
        aria-hidden="false"
        vAlign="end"
        hAlign="center"
        gap={3}
        className="relative z-10 -mt-2 w-full pb-6 lg:-mt-4 lg:pb-8"
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

        {/* Action Channels Matching Minimalist Pill Architecture Positioned Below ASCII Hands */}
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
