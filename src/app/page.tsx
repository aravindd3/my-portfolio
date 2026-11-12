import { VStack } from "@astryxdesign/core/VStack";
import { BackgroundAsciiField } from "@/components/BackgroundAsciiField";
import { ContactFooter } from "@/components/ContactFooter";
import { CustomPointerMagnifier } from "@/components/CustomPointerMagnifier";
import { EducationAndCerts } from "@/components/EducationAndCerts";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { HardwareSpecsMatrix } from "@/components/HardwareSpecsMatrix";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { PortfolioWorkspace } from "@/components/PortfolioWorkspace";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";

export default function Home() {
  return (
    <>
      <CustomPointerMagnifier />
      <BackgroundAsciiField />
      <Navbar />
      <VStack as="main" id="main-content" className="relative z-10 w-full flex-1">
        <HeroSection />
        <PortfolioWorkspace>
          <HardwareSpecsMatrix />
          <ProjectsShowcase />
        </PortfolioWorkspace>
        <ExperienceTimeline />
        <EducationAndCerts />
      </VStack>
      <ContactFooter />
    </>
  );
}
