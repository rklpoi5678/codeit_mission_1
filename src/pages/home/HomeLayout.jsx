import { HomeNav } from "./HomeNav";
import { HeroSection } from "./HeroSection";
import { FeatureSection } from "./FeatureSection";
import { CTASection } from "./CTASection";
import { Footer } from "@/components/UI/Footer/Footer";

export function HomeLayout() {
  return (
    <>
      <HomeNav />
      <HeroSection />
      <FeatureSection />
      <CTASection />
      <Footer />
    </>
  );
}