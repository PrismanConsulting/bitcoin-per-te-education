import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { text: "Le transazioni vengono trasmesse alla rete peer-to-peer" },
  { text: "I miner competono per risolvere un problema crittografico" },
  { text: "Il vincitore aggiunge il blocco e riceve la ricompensa in BTC" },
];

const halvings = [
  { year: "2009", btc: 50, label: "50 BTC" },
  { year: "2012", btc: 25, label: "25 BTC" },
  { year: "2016", btc: 12.5, label: "12.5 BTC" },
  { year: "2020", btc: 6.25, label: "6.25 BTC" },
  { year: "2024", btc: 3.125, label: "3.125 BTC" },
  { year: "2028", btc: 1.5625, label: "~1.56 BTC" },
];

const MiningHalvingSection = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, margin: "-100px" });
  const maxBtc = 50;

  return (
    <section id="mining" className="min-h-screen flex flex-col justify-center py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Mining */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="label-section mb-2">CONSENSO</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">Proof of Work</h2>

            <div className="relative pl-8">
              <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-border" />
              <div className="space-y-8">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative"
                  >
                    <div className="absolute -left-[22px] top-0.5 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="text-[13px] text-muted-foreground mt-8 leading-relaxed">
              Il proof-of-work non è spreco energetico per definizione — è il meccanismo che rende la falsificazione della storia economicamente insostenibile.
            </p>
          </motion.div>

          {/* Halving */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="label-section mb-2">SCARSITÀ PROGRAMMATA</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">Il Halving</h2>

            <div ref={chartRef} className="flex items-end gap-3 h-48 mb-4">
              {halvings.map((h, i) => {
                const height = (h.btc / maxBtc) * 100;
                return (
                  <div key={h.year} className="flex-1 flex flex-col items-center justify-end h-full">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                      className="w-full rounded-t origin-bottom"
                      style={{
                        height: `${height}%`,
                        background: `linear-gradient(to top, hsl(28 93% ${40 - i * 3}%), hsl(28 93% 53%))`,
                        opacity: 1 - i * 0.1,
                      }}
                    />
                    <p className="text-[10px] text-muted-foreground mt-2 font-heading">{h.year}</p>
                    <p className="text-[10px] text-primary font-mono">{h.label}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Ogni circa 4 anni, la ricompensa per i miner si dimezza. È scritto nel codice. Non richiede votazioni, non può essere modificato da nessuna autorità.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MiningHalvingSection;
