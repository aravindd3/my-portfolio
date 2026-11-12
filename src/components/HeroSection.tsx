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

        {/* Action Channels Matching Exact Minimalist Pill Architecture Positioned Below ASCII Hands */}
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
