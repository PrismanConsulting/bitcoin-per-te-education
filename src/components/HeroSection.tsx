import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const tickerTerms = "blockchain · satoshi · halving · proof-of-work · UTXO · mempool · nodo · mining · wallet · decentralizzazione · hash · fork · lightning network · timelock · multisig · schnorr · ";

const AnimatedNumber = () => {
  const target = "21.000.000";
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= target.length) {
        setDisplay(target.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary font-heading tabular-nums">
      {display}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const HeroSection = () => {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-16">
      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="label-section mb-4">PROGETTO EDITORIALE INDIPENDENTE</p>
            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] font-heading mb-6">
              Bitcoin — La Tecnologia che Ridefinisce il Concetto di Moneta
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              Un hub di conoscenza per chi vuole capire Bitcoin davvero, senza semplificazioni e senza secondi fini.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                variant="outline"
                size="lg"
                className="border-primary/40 text-primary hover:bg-primary/10 font-heading"
                onClick={() => handleScroll("cose-bitcoin")}
              >
                Inizia da qui →
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border text-muted-foreground hover:text-foreground hover:bg-muted font-heading"
                onClick={() => handleScroll("community")}
              >
                Entra nella Community →
              </Button>
            </div>

            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              Prisman Consulting · Francavilla al Mare, Abruzzo · Solo cookie tecnici · Nessuna consulenza finanziaria
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center lg:items-end"
          >
            <div className="text-center lg:text-right">
              <AnimatedNumber />
              <p className="text-muted-foreground text-sm mt-2 font-heading">
                BTC — offerta massima programmata
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 w-full max-w-sm">
              {[
                { value: "∞ anni", label: "rete attiva" },
                { value: "~10 min", label: "nuovo blocco" },
                { value: "4 anni", label: "halving" },
              ].map((stat) => (
                <div key={stat.label} className="border-t-2 border-primary/30 pt-3 text-center">
                  <p className="text-foreground font-semibold text-sm font-heading">{stat.value}</p>
                  <p className="text-muted-foreground text-[11px] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll arrow */}
      <motion.button
        onClick={() => handleScroll("cose-bitcoin")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground/40 hover:text-primary transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scorri in basso"
      >
        <ChevronDown size={28} />
      </motion.button>

      {/* Ticker */}
      <div className="border-t border-border">
        <div className="overflow-hidden ticker-fade py-3">
          <div className="animate-ticker whitespace-nowrap text-[13px] text-muted-foreground/30 font-mono" style={{ width: "max-content" }}>
            {tickerTerms.repeat(4)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
