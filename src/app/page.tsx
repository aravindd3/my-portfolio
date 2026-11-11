import { VStack } from "@astryxdesign/core/VStack";
import { HardwareSpecsMatrix } from "@/components/HardwareSpecsMatrix";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <VStack as="main" id="main-content" className="w-full flex-1">
        <HeroSection />
        <HardwareSpecsMatrix />
      </VStack>
    </>
  );
}
