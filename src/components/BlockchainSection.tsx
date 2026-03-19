import { motion } from "framer-motion";
import { useState } from "react";

const blocks = [
  { num: 840000, hash: "0000000000000000000320...", time: "20 Apr 2024 00:09", txs: 3050 },
  { num: 840001, hash: "00000000000000000002a1...", time: "20 Apr 2024 00:18", txs: 2847 },
  { num: 840002, hash: "00000000000000000001f3...", time: "20 Apr 2024 00:31", txs: 3211 },
  { num: 840003, hash: "000000000000000000034b...", time: "20 Apr 2024 00:42", txs: 2956 },
];

const tooltips: Record<string, string> = {
  hash: "L'hash è l'impronta digitale unica del blocco, calcolata matematicamente.",
  time: "Il timestamp indica quando il blocco è stato aggiunto alla blockchain.",
  txs: "Il numero di transazioni confermate e incluse in questo blocco.",
  num: "L'altezza del blocco, ovvero la sua posizione nella catena.",
};

const BlockchainSection = () => {
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  return (
    <section id="blockchain" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-6"
        >
          La <span className="text-primary">Blockchain</span>: Il Registro Pubblico
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Ogni blocco è collegato al precedente tramite un hash crittografico, formando una catena immutabile.
        </motion.p>

        {/* Interactive blockchain */}
        <div className="overflow-x-auto pb-4 mb-16">
          <div className="flex items-center gap-2 min-w-max mx-auto justify-center">
            {blocks.map((block, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-bitcoin w-56 hover:glow-bitcoin transition-all duration-300 group cursor-default"
                >
                  <div
                    className="text-xs text-muted-foreground mb-1"
                    onMouseEnter={() => setHoveredField(`num-${i}`)}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    Blocco #{block.num}
                    {hoveredField === `num-${i}` && (
                      <span className="block text-primary text-[10px] mt-1">{tooltips.num}</span>
                    )}
                  </div>
                  <div
                    className="text-xs font-mono text-primary truncate mb-1"
                    onMouseEnter={() => setHoveredField(`hash-${i}`)}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    {block.hash}
                    {hoveredField === `hash-${i}` && (
                      <span className="block text-foreground text-[10px] mt-1 font-sans">{tooltips.hash}</span>
                    )}
                  </div>
                  <div
                    className="text-xs text-muted-foreground"
                    onMouseEnter={() => setHoveredField(`time-${i}`)}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    ⏱ {block.time}
                    {hoveredField === `time-${i}` && (
                      <span className="block text-primary text-[10px] mt-1">{tooltips.time}</span>
                    )}
                  </div>
                  <div
                    className="text-xs text-muted-foreground mt-1"
                    onMouseEnter={() => setHoveredField(`txs-${i}`)}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    📦 {block.txs} transazioni
                    {hoveredField === `txs-${i}` && (
                      <span className="block text-primary text-[10px] mt-1">{tooltips.txs}</span>
                    )}
                  </div>
                </motion.div>
                {i < blocks.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="text-primary text-2xl mx-1"
                  >
                    →
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Three columns */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { emoji: "📖", title: "Libro mastro aperto", desc: "Chiunque può consultarlo in qualsiasi momento" },
            { emoji: "⛓️", title: "Immutabilità", desc: "Una volta scritto, nessuno può modificare o cancellare" },
            { emoji: "🌍", title: "Accessibilità", desc: "Nessun permesso richiesto per verificare le transazioni" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlockchainSection;
