import NetworkBackground from "@/components/NetworkBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsBitcoin from "@/components/WhatIsBitcoin";
import BlockchainSection from "@/components/BlockchainSection";
import MiningHalvingSection from "@/components/MiningHalvingSection";
import SatoshiSection from "@/components/SatoshiSection";
import BitcoinVsFiatSection from "@/components/BitcoinVsFiatSection";
import QuizSection from "@/components/QuizSection";
import CommunitySection from "@/components/CommunitySection";
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
        <MiningHalvingSection />
        <SatoshiSection />
        <BitcoinVsFiatSection />
        <QuizSection />
        <CommunitySection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
