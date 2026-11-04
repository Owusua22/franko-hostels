import ClosingBand from "@/components/ClosingBand";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Residence from "@/components/Residence";
import RoomExplorer from "@/components/RoomExplorer";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <RoomExplorer />
        <HowItWorks />
        <Residence />
        <ClosingBand />
      </main>
      <SiteFooter />
    </>
  );
}
