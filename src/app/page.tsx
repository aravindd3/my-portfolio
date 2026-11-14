import { VStack } from "@astryxdesign/core/VStack";
import { BackgroundAsciiField } from "@/components/BackgroundAsciiField";
import { ContactFooter } from "@/components/ContactFooter";
import { CustomPointerMagnifier } from "@/components/CustomPointerMagnifier";
import { EducationAndCerts } from "@/components/EducationAndCerts";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { HardwareSpecsMatrix } from "@/components/HardwareSpecsMatrix";
import { HeroCinematicIntro } from "@/components/HeroCinematicIntro";
import { Navbar } from "@/components/Navbar";
import { PortfolioWorkspace } from "@/components/PortfolioWorkspace";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { ScrollBlurSection } from "@/components/ScrollBlurSection";

export default function Home() {
  return (
    <>
      <CustomPointerMagnifier />
      <BackgroundAsciiField />
      <Navbar />
      <VStack as="main" id="main-content" className="relative z-10 w-full flex-1">
        {/* Cinematic Hero:
            1. Types "Hello! I'm Aravind V S" centered with surrounding atmospheric depth blur
            2. Smoothly scroll-pans out to reveal the living ASCII hands art and the pill links below them */}
        <HeroCinematicIntro />

        <PortfolioWorkspace>
          <ScrollBlurSection>
            <HardwareSpecsMatrix />
          </ScrollBlurSection>
          <ScrollBlurSection>
            <ProjectsShowcase />
          </ScrollBlurSection>
        </PortfolioWorkspace>
        <ScrollBlurSection>
          <ExperienceTimeline />
        </ScrollBlurSection>
        <ScrollBlurSection>
          <EducationAndCerts />
        </ScrollBlurSection>
      </VStack>
      <ScrollBlurSection>
        <ContactFooter />
      </ScrollBlurSection>
    </>
  );
}
