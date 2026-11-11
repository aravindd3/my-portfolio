import { HStack } from "@astryxdesign/core/HStack";
import { Section } from "@astryxdesign/core/Section";
import { VStack } from "@astryxdesign/core/VStack";
import { PROJECTS, PROTOCOLS } from "@/data/portfolio";
import { ProjectsFilterGrid } from "./ProjectsFilterGrid";
import { SectionHeader } from "./SectionHeader";

export function ProjectsShowcase() {
  return (
    <VStack
      as="section"
      id="projects"
      aria-labelledby="projects-heading"
      className="relative w-full"
    >
      <HStack
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      <Section
        variant="transparent"
        padding={0}
        maxWidth={1152}
        className="relative ms-auto me-auto w-full px-5 py-16 md:px-12 md:py-24"
      >
        <VStack gap={10} className="min-w-0">
          <SectionHeader
            headingId="projects-heading"
            eyebrow="02 · Hardware & Firmware Builds"
            icon="circuit-board"
            title="Featured Engineering Projects"
            subtitle="Custom KiCad 10.0 PCBs, sub-GHz LoRa RF transceivers, autonomous robotics, and deterministic Embedded C firmware."
          />

          <ProjectsFilterGrid projects={PROJECTS} protocols={PROTOCOLS} />
        </VStack>
      </Section>
    </VStack>
  );
}
