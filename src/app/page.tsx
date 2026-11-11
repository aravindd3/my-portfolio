import { VStack } from "@astryxdesign/core/VStack";
import { ContactFooter } from "@/components/ContactFooter";
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
      <Navbar />
      <VStack as="main" id="main-content" className="w-full flex-1">
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
