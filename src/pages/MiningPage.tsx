import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const steps = [
  { n: "①", text: "Le transazioni vengono trasmesse alla rete peer-to-peer" },
  { n: "②", text: "I miner competono per risolvere un problema crittografico" },
  { n: "③", text: "Il vincitore aggiunge il blocco e riceve la ricompensa in BTC" },
];

const halvings = [
  { year: "2009", btc: 50, label: "50 BTC" },
  { year: "2012", btc: 25, label: "25 BTC" },
  { year: "2016", btc: 12.5, label: "12.5 BTC" },
  { year: "2020", btc: 6.25, label: "6.25 BTC" },
  { year: "2024", btc: 3.125, label: "3.125 BTC" },
  { year: "2028", btc: 1.5625, label: "~1.56 BTC" },
];

const MiningPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="min-h-screen pt-16 flex flex-col justify-center"
  >
    <SEO
      title="Mining e Halving Bitcoin — Cosa Sono e Come Funzionano | BitcoinPerTe"
      description="Proof of Work, mining Bitcoin e halving spiegati in italiano. Grafico storico delle ricompense e countdown al prossimo dimezzamento."
      path="/mining"
    />
    <div className="container mx-auto px-4 max-w-6xl py-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left - Mining */}
        <div>
          <p className="label-section mb-2">CONSENSO</p>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-8">Proof of Work</h2>

          <div className="space-y-6 relative">
            <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-border" />
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-4 relative"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-[12px] font-mono font-bold text-primary shrink-0 z-10">
                  {i + 1}
                </div>
                <p className="text-base text-muted-foreground pt-0.5 leading-[1.7]">{step.text}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-base text-muted-foreground mt-8 max-w-md leading-[1.7]">
            Il proof-of-work non è spreco energetico per definizione — è il meccanismo che rende
            la falsificazione della storia economicamente insostenibile.
          </p>
        </div>

        {/* Right - Halving */}
        <div>
          <p className="label-section mb-2">SCARSITÀ PROGRAMMATA</p>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-8">Il Halving</h2>

          <div className="flex items-end gap-3 h-48 mb-4">
            {halvings.map((h, i) => {
              const maxH = 50;
              const heightPercent = (h.btc / maxH) * 100;
              return (
                <div key={h.year} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[12px] font-mono text-muted-foreground">{h.label}</span>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                    className="w-full rounded-t origin-bottom"
                    style={{
                      height: `${heightPercent}%`,
                      background: `linear-gradient(to top, hsl(28 80% 40%), hsl(28 93% 53%))`,
                      opacity: 1 - i * 0.1,
                    }}
                  />
                  <span className="text-[13px] font-mono text-muted-foreground mt-1">{h.year}</span>
                </div>
              );
            })}
          </div>

          <p className="text-base text-muted-foreground mt-6 max-w-md leading-[1.7]">
            Ogni circa 4 anni, la ricompensa per i miner si dimezza. È scritto nel codice.
            Non richiede votazioni, non può essere modificato da nessuna autorità centrale.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default MiningPage;
