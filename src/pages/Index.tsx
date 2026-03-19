import NetworkBackground from "@/components/NetworkBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsBitcoin from "@/components/WhatIsBitcoin";
import BlockchainSection from "@/components/BlockchainSection";
import HashSection from "@/components/HashSection";
import MiningHalvingSection from "@/components/MiningHalvingSection";
import SatoshiSection from "@/components/SatoshiSection";
import PropertiesSection from "@/components/PropertiesSection";
import QuizSection from "@/components/QuizSection";
import CommunitySection from "@/components/CommunitySection";
import DisclaimerSection from "@/components/DisclaimerSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <NetworkBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <WhatIsBitcoin />
        <BlockchainSection />
        <HashSection />
        <MiningHalvingSection />
        <SatoshiSection />
        <PropertiesSection />
        <QuizSection />
        <CommunitySection />
        <DisclaimerSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
