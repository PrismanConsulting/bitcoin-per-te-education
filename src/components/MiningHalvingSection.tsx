import { motion } from "framer-motion";

const steps = [
  { num: 1, title: "Trasmissione", desc: "Le transazioni vengono trasmesse alla rete" },
  { num: 2, title: "Competizione", desc: "I miner competono per risolvere il problema matematico (proof-of-work)" },
  { num: 3, title: "Ricompensa", desc: "Il vincitore aggiunge il blocco e riceve la ricompensa in Bitcoin" },
];

const halvings = [
  { year: "2009", reward: 50, pct: 100 },
  { year: "2012", reward: 25, pct: 50 },
  { year: "2016", reward: 12.5, pct: 25 },
  { year: "2020", reward: 6.25, pct: 12.5 },
  { year: "2024", reward: 3.125, pct: 6.25 },
  { year: "2028*", reward: 1.5625, pct: 3.125 },
];

const MiningHalvingSection = () => {
  return (
    <section id="mining" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="text-primary">Mining</span> e Halving: Le Regole dell'Emissione
        </motion.h2>

        {/* Timeline */}
        <div className="max-w-xl mx-auto mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-4 mb-8 last:mb-0"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary font-bold text-sm">
                  {step.num}
                </div>
                {i < steps.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
              </div>
              <div className="pt-1.5">
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Halving chart */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-center mb-8"
        >
          La storia dell'<span className="text-primary">Halving</span>
        </motion.h3>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 md:gap-6 justify-center h-64">
            {halvings.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                style={{ originY: 1 }}
                className="flex flex-col items-center"
              >
                <span className="text-xs text-primary font-semibold mb-2">
                  {h.reward} BTC
                </span>
                <div
                  className="w-10 md:w-14 bg-gradient-bitcoin rounded-t-md"
                  style={{ height: `${h.pct * 2}px`, minHeight: "8px" }}
                />
                <span className="text-xs text-muted-foreground mt-2">{h.year}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            * Previsto
          </p>
        </div>
      </div>
    </section>
  );
};

export default MiningHalvingSection;
