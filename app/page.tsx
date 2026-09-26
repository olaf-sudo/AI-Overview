import ClosingCta from "@/components/ClosingCta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import GoogleSection from "@/components/GoogleSection";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Report from "@/components/Report";
import SiteHeader from "@/components/SiteHeader";
import StatsRow from "@/components/StatsRow";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />

      {/* De uitleg schuift als een vel over de hero heen. `overflow-clip` rondt
          de hoeken af zonder de sticky kaarten in "How it works" te breken. */}
      <div
        id="more"
        className="relative z-10 overflow-clip rounded-t-[32px] bg-paper shadow-[0_-24px_60px_-28px_rgba(11,11,59,0.12)]"
      >
        <main>
          <StatsRow />
          <GoogleSection />
          <HowItWorks />
          <Report />
          <Pricing />
          <Faq />
          <ClosingCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
