import { Heading } from "@astryxdesign/core/Heading";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { PROJECTS, PROTOCOLS } from "@/data/portfolio";
import { ProjectsFilterGrid } from "./ProjectsFilterGrid";

export function ProjectsShowcase() {
  return (
    <VStack
      as="section"
      id="projects"
      aria-labelledby="projects-heading"
      className="relative w-full border-b border-hairline"
    >
      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative ms-auto me-auto w-full px-5 py-14 md:px-12 md:py-20"
      >
        <Text
          type="code"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 left-2 select-none font-mono text-[11px] leading-none text-muted/60 md:left-6"
        >
          +
        </Text>
        <Text
          type="code"
          aria-hidden="true"
          className="pointer-events-none absolute right-2 bottom-1 select-none font-mono text-[11px] leading-none text-muted/60 md:right-6"
        >
          +
        </Text>

        <VStack gap={8} className="min-w-0">
          <VStack gap={3} className="min-w-0">
            <Text
              type="code"
              size="xsm"
              className="font-mono text-xs font-semibold tracking-wider text-copper"
            >
              02 // HARDWARE &amp; FIRMWARE BUILDS
            </Text>
            <Heading
              id="projects-heading"
              level={2}
              className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight tracking-[-0.02em] text-primary"
            >
              Featured Engineering Projects
            </Heading>
            <Text
              type="body"
              as="p"
              color="secondary"
              className="max-w-[68ch] text-[0.96875rem] leading-[1.65] text-secondary md:text-base"
            >
              Custom KiCad 10.0 PCBs, sub-GHz LoRa RF transceivers, autonomous
              robotics, and deterministic Embedded C firmware validated at the
              bench.
            </Text>
          </VStack>

          <ProjectsFilterGrid projects={PROJECTS} protocols={PROTOCOLS} />
        </VStack>
      </Section>
    </VStack>
  );
}
