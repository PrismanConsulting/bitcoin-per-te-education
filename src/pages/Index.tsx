import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { useLiveStats, useFlash } from "@/hooks/useLiveStats";

const tickerWords = [
  "blockchain", "satoshi", "halving", "proof-of-work", "UTXO", "mempool",
  "nodo", "mining", "wallet", "decentralizzazione", "hash", "fork",
  "lightning network", "timelock", "multisig", "schnorr",
];

const AnimatedNumber = () => {
  const target = "21.000.000";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(target.slice(0, i));
      if (i >= target.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-5xl md:text-7xl font-bold text-primary">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const LiveWidget = () => {
  const { priceEur, blockHeight, halfHourFee } = useLiveStats();
  const flashPrice = useFlash(priceEur);
  const flashBlock = useFlash(blockHeight);
  const flashFee = useFlash(halfHourFee);

  const items = [
    { label: "BTC/EUR", value: priceEur ? `€${priceEur.toLocaleString("it-IT")}` : null, flash: flashPrice },
    { label: "Blocco", value: blockHeight ? blockHeight.toLocaleString("it-IT") : null, flash: flashBlock },
    { label: "Fee ~30m", value: halfHourFee ? `${halfHourFee} sat/vB` : null, flash: flashFee },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground font-heading">Live dalla Rete</p>
        <span className="flex items-center gap-1 text-[12px] text-green-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          live
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div key={item.label} className="card-surface p-2.5 text-center">
            <p className="text-[11px] text-muted-foreground mb-1">{item.label}</p>
            {item.value ? (
              <p className={`font-mono text-sm font-bold text-foreground transition-colors duration-500 ${item.flash ? "!text-primary" : ""}`}>
                {item.value}
              </p>
            ) : (
              <Skeleton className="h-5 w-full mx-auto" />
            )}
          </div>
        ))}
      </div>
      <Link to="/terminale" className="text-[13px] text-primary hover:underline block text-right">
        → Terminale completo
      </Link>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [networkActive, setNetworkActive] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("https://mempool.space/api/blocks/tip/height")
      .then((r) => r.ok ? setNetworkActive(true) : setNetworkActive(false))
      .catch(() => setNetworkActive(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16 flex flex-col relative"
    >
      <SEO
        title="BitcoinPerTe.it — Divulgazione Bitcoin in Italiano"
        description="Il punto di riferimento italiano per capire Bitcoin: blockchain, halving, satoshi, dati live dalla rete. Divulgazione indipendente, nessuna consulenza finanziaria."
        path="/"
        keywords="bitcoin italiano, cos'è bitcoin, blockchain spiegazione, satoshi, halving bitcoin, divulgazione bitcoin"
      />
      {/* Graph paper background with orange nodes */}
      <div className="absolute inset-0 graph-paper-bg opacity-30" />
      <div className="absolute top-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-40 right-20 w-64 h-64 bg-primary/4 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary/3 rounded-full blur-[60px]" />
      <div className="absolute top-32 right-1/4 w-40 h-40 bg-primary/4 rounded-full blur-[90px]" />

      {/* Main content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left column - 60% */}
            <div className="lg:col-span-3 space-y-6">
              <p className="label-section">PROGETTO EDITORIALE INDIPENDENTE</p>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-[1.1] text-foreground">
                Bitcoin — La Tecnologia che Ridefinisce il Concetto di Moneta
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
                Un hub di conoscenza per chi vuole capire Bitcoin davvero, senza semplificazioni e senza secondi fini.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/bitcoin"
                  className="border border-primary/30 text-primary px-5 py-2.5 rounded-md text-base font-medium hover:bg-primary/10 transition-colors font-heading"
                >
                  Inizia da qui →
                </Link>
                <Link
                  to="/community"
                  className="border border-border text-muted-foreground px-5 py-2.5 rounded-md text-base font-medium hover:text-foreground hover:border-muted-foreground transition-colors font-heading"
                >
                  Entra nella Community →
                </Link>
              </div>

              <div className="border-l-[3px] border-primary bg-card rounded-r px-4 py-2.5 max-w-xl">
                <p className="text-[14px] leading-relaxed" style={{ color: '#CCCCCC', fontWeight: 400 }}>
                  Questo sito è un progetto di pura divulgazione. I contenuti non costituiscono consulenza finanziaria né sollecitazione all'investimento ai sensi del D.Lgs. 58/1998.
                </p>
              </div>

              <p className="text-muted-foreground text-[14px]" style={{ color: '#BBBBBB' }}>
                Prisman Consulting · Francavilla al Mare, Abruzzo · Solo cookie tecnici
              </p>
            </div>

            {/* Right column - 40% */}
            <div className="lg:col-span-2 space-y-6">
              <div className="text-center lg:text-right">
                <AnimatedNumber />
                <p className="text-muted-foreground text-base mt-2">BTC — offerta massima programmata</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "∞ anni", label: "rete attiva" },
                  { value: "~10 min", label: "nuovo blocco" },
                  { value: "4 anni", label: "halving" },
                ].map((stat) => (
                  <div key={stat.label} className="border-t-2 border-primary/40 pt-3 text-center">
                    <p className="font-mono text-base font-bold text-foreground">{stat.value}</p>
                    <p className="text-[14px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Live dalla Rete widget */}
              <LiveWidget />

              <div className="flex items-center justify-center lg:justify-end gap-2">
                <span className={`w-2 h-2 rounded-full ${networkActive === true ? "bg-green-500 animate-pulse" : networkActive === false ? "bg-muted-foreground" : "bg-muted"}`} />
                <span className="text-[14px] text-muted-foreground">
                  {networkActive === true ? "Rete Bitcoin attiva" : networkActive === false ? "Stato rete non disponibile" : "Verifica rete..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="relative z-10 flex justify-center pb-4">
        <button
          onClick={() => navigate("/bitcoin")}
          className="text-muted-foreground/40 hover:text-primary transition-colors animate-bounce-slow"
          aria-label="Vai a Cos'è Bitcoin"
        >
          <ChevronDown size={28} />
        </button>
      </div>

      {/* Ticker */}
      <div className="relative z-10 border-t border-border py-3 overflow-hidden ticker-fade">
        <div className="animate-ticker whitespace-nowrap">
          {[...tickerWords, ...tickerWords].map((word, i) => (
            <span key={i} className="text-muted-foreground/50 text-[15px] mx-4 font-heading">
              {word}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
