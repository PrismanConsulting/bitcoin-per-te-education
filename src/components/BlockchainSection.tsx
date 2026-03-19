import { motion } from "framer-motion";
import { useState } from "react";

const blocks = [
  { num: "#843,291", hash: "0x3f7a...c291", time: "2024-03-15 · 14:32:07", txs: "2,847" },
  { num: "#843,292", hash: "0x8b2e...f104", time: "2024-03-15 · 14:41:53", txs: "3,102" },
  { num: "#843,293", hash: "0xd91c...a837", time: "2024-03-15 · 14:52:19", txs: "2,651" },
  { num: "#843,294", hash: "0x12fa...e5b0", time: "2024-03-15 · 15:01:44", txs: "2,984" },
];

const tooltips: Record<string, string> = {
  hash: "Impronta crittografica univoca del blocco. Se cambi anche un solo byte, cambia completamente.",
  time: "Il timestamp registra il momento esatto in cui il blocco è stato aggiunto alla catena.",
  txs: "Numero di transazioni validate e incluse permanentemente in questo blocco.",
};

const columns = [
  { icon: "📖", title: "Registro aperto", text: "Verificabile da chiunque, in qualunque momento, senza chiedere permesso a nessuno." },
  { icon: "⛓", title: "Struttura a catena", text: "Ogni blocco contiene l'hash del precedente. La storia non si riscrive." },
  { icon: "🌍", title: "Senza frontiere", text: "Non appartiene a nessun paese. Funziona ovunque ci sia connessione." },
];

const BlockchainSection = () => {
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  return (
    <section id="blockchain" className="min-h-screen flex flex-col justify-center py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="label-section mb-2">TECNOLOGIA</p>
          <h2 className="text-3xl md:text-5xl font-bold font-heading">La Blockchain</h2>
          <p className="text-muted-foreground mt-2">Un registro pubblico, trasparente, condiviso — e inviolabile.</p>
        </motion.div>

        <div className="overflow-x-auto pb-4 mb-8">
          <div className="flex items-center gap-0 min-w-[700px]">
            {blocks.map((block, i) => (
              <div key={block.num} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="card-elevated p-4 min-w-[160px] group hover:border-primary/40 transition-colors"
                >
                  <p className="text-primary font-bold text-sm font-heading mb-2">{block.num}</p>
                  <div className="space-y-1.5 text-[11px]">
                    <p
                      className="text-muted-foreground font-mono cursor-help"
                      onMouseEnter={() => setHoveredField(`hash-${i}`)}
                      onMouseLeave={() => setHoveredField(null)}
                    >
                      Hash: {block.hash}
                      {hoveredField === `hash-${i}` && (
                        <span className="block mt-1 text-foreground bg-background border border-border rounded px-2 py-1 text-[10px] normal-case">
                          {tooltips.hash}
                        </span>
                      )}
                    </p>
                    <p
                      className="text-muted-foreground cursor-help"
                      onMouseEnter={() => setHoveredField(`time-${i}`)}
                      onMouseLeave={() => setHoveredField(null)}
                    >
                      {block.time}
                      {hoveredField === `time-${i}` && (
                        <span className="block mt-1 text-foreground bg-background border border-border rounded px-2 py-1 text-[10px]">
                          {tooltips.time}
                        </span>
                      )}
                    </p>
                    <p
                      className="text-muted-foreground cursor-help"
                      onMouseEnter={() => setHoveredField(`txs-${i}`)}
                      onMouseLeave={() => setHoveredField(null)}
                    >
                      Tx: {block.txs}
                      {hoveredField === `txs-${i}` && (
                        <span className="block mt-1 text-foreground bg-background border border-border rounded px-2 py-1 text-[10px]">
                          {tooltips.txs}
                        </span>
                      )}
                    </p>
                  </div>
                </motion.div>
                {i < blocks.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.1 }}
                    className="w-8 h-[2px] bg-primary/50 origin-left"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-14">
          Modifica un solo byte in un blocco passato: l'hash cambia. E con lui, tutti i blocchi successivi. Questo è il meccanismo che rende la manipolazione computazionalmente proibitiva.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {columns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-surface p-5"
            >
              <span className="text-xl mb-2 block">{col.icon}</span>
              <h3 className="text-sm font-semibold text-foreground font-heading mb-1">{col.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{col.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlockchainSection;
