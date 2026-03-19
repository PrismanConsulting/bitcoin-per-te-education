import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const tickerTerms = "blockchain · satoshi · halving · proof-of-work · decentralizzazione · nodo · mining · wallet · UTXO · mempool · ";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl leading-tight"
      >
        Bitcoin: La Prima Moneta Digitale{" "}
        <span className="text-gradient-bitcoin">Distribuita e Programmata</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
      >
        Un progetto di passione e divulgazione. Non un consiglio finanziario — solo conoscenza, condivisione e community.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row gap-4"
      >
        <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10" asChild>
          <a href="#cosè-bitcoin">Scopri come funziona</a>
        </Button>
        <Button variant="outline" size="lg" className="border-muted-foreground text-muted-foreground hover:bg-muted" asChild>
          <a href="#community">Entra nella Community</a>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 max-w-2xl text-xs text-muted-foreground bg-muted/50 border border-border rounded-lg px-4 py-3"
      >
        ⚠️ Questo sito è puro progetto divulgativo. Non siamo consulenti finanziari.
        Nessuna parte di questo sito costituisce sollecitazione all'investimento.
      </motion.div>

      {/* Ticker */}
      <div className="absolute bottom-8 left-0 right-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="animate-ticker whitespace-nowrap text-sm text-primary font-mono" style={{ width: "max-content" }}>
          {tickerTerms.repeat(4)}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
