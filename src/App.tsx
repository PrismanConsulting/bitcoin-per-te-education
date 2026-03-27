import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import CookieBanner from "@/components/CookieBanner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import HomePage from "@/pages/Index";
import BitcoinPage from "@/pages/BitcoinPage";
import BlockchainPage from "@/pages/BlockchainPage";
import MiningPage from "@/pages/MiningPage";
import SatoshiPage from "@/pages/SatoshiPage";
import FiatPage from "@/pages/FiatPage";
import TerminalePage from "@/pages/TerminalePage";
import QuizPage from "@/pages/QuizPage";
import CommunityPage from "@/pages/CommunityPage";
import GlossarioPage from "@/pages/GlossarioPage";
import MappaPage from "@/pages/MappaPage";
import LivePage from "@/pages/LivePage";
import OracoloPage from "@/pages/OracoloPage";
import HolderPage from "@/pages/HolderPage";
import NotizePage from "@/pages/NotizePage";
import PreferenzePage from "@/pages/PreferenzePage";
import IniziaPage from "@/pages/IniziaPage";
import RegistroPage from "@/pages/RegistroPage";
import RisorsePage from "@/pages/RisorsePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/bitcoin" element={<BitcoinPage />} />
          <Route path="/blockchain" element={<BlockchainPage />} />
          <Route path="/mining" element={<MiningPage />} />
          <Route path="/satoshi" element={<SatoshiPage />} />
          <Route path="/fiat" element={<FiatPage />} />
          <Route path="/terminale" element={<TerminalePage />} />
          <Route path="/mappa" element={<MappaPage />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/oracolo" element={<OracoloPage />} />
          <Route path="/holder" element={<HolderPage />} />
          <Route path="/notizie" element={<NotizePage />} />
          <Route path="/preferenze" element={<PreferenzePage />} />
          <Route path="/inizia" element={<IniziaPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/glossario" element={<GlossarioPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/risorse" element={<RisorsePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
        <CookieBanner />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;