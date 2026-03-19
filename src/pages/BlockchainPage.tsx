import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { BookOpen, Link as LinkIcon, Globe } from "lucide-react";

const blocks = [
  { num: "843,291", hash: "0x3f7a...c291", time: "2024-03-15 · 14:32", tx: "2,847" },
  { num: "843,292", hash: "0xa1b2...f832", time: "2024-03-15 · 14:41", tx: "3,102" },
  { num: "843,293", hash: "0x7d3e...ab14", time: "2024-03-15 · 14:53", tx: "2,561" },
  { num: "843,294", hash: "0xf29c...d7e5", time: "2024-03-15 · 15:02", tx: "2,934" },
];

const tooltips: Record<string, string> = {
  hash: "Impronta crittografica univoca del blocco. Se cambi anche un solo byte, cambia completamente.",
  time: "Momento in cui il blocco è stato aggiunto alla catena dalla rete.",
  tx: "Numero di transazioni confermate e registrate permanentemente in questo blocco.",
};

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const BlockchainPage = () => {
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [hashInput, setHashInput] = useState("");
  const [hashOutput, setHashOutput] = useState("");

  const computeHash = useCallback(async (val: string) => {
    if (!val) { setHashOutput(""); return; }
    const h = await sha256(val);
    setHashOutput(h);
  }, []);

  useEffect(() => { computeHash(hashInput); }, [hashInput, computeHash]);

  const features = [
    { icon: <BookOpen size={20} />, title: "Registro aperto", text: "Verificabile da chiunque, in qualunque momento, senza chiedere permesso." },
    { icon: <LinkIcon size={20} />, title: "Struttura a catena", text: "Ogni blocco contiene l'hash del precedente. La storia non si riscrive." },
    { icon: <Globe size={20} />, title: "Senza frontiere", text: "Non appartiene a nessun paese. Funziona ovunque ci sia connessione." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16 flex flex-col justify-center"
    >
      <div className="container mx-auto px-4 max-w-6xl py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="label-section mb-2">TECNOLOGIA</p>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground">La Blockchain</h1>
          <p className="text-muted-foreground mt-2">Un registro pubblico, trasparente, condiviso — e inviolabile.</p>
        </div>

        {/* Chain visualization */}
        <div className="overflow-x-auto pb-4 mb-4">
          <div className="flex items-center gap-2 min-w-[700px]">
            {blocks.map((block, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="card-elevated p-4 min-w-[160px] hover:border-primary/40 transition-colors group">
                  <p className="text-xs text-primary font-mono font-bold mb-2">#{block.num}</p>
                  <div
                    className="relative"
                    onMouseEnter={() => setHoveredField("hash")}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <p className="text-[11px] text-muted-foreground font-mono cursor-help">Hash: {block.hash}</p>
                  </div>
                  <div
                    onMouseEnter={() => setHoveredField("time")}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <p className="text-[11px] text-muted-foreground font-mono cursor-help mt-1">{block.time}</p>
                  </div>
                  <div
                    onMouseEnter={() => setHoveredField("tx")}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <p className="text-[11px] text-muted-foreground font-mono cursor-help mt-1">Tx: {block.tx}</p>
                  </div>
                </div>
                {i < blocks.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.4 }}
                    className="w-8 h-[2px] bg-primary origin-left"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredField && tooltips[hoveredField] && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-primary/80 mb-4 max-w-xl"
          >
            {tooltips[hoveredField]}
          </motion.p>
        )}

        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          Modifica un solo byte in un blocco passato: l'hash cambia. E con lui, tutti i blocchi successivi.
          Questo è il meccanismo che rende la manipolazione computazionalmente proibitiva.
        </p>

        {/* Hash widget */}
        <div className="card-surface p-5 max-w-xl mb-10">
          <p className="text-xs font-heading text-muted-foreground mb-3">Prova tu — digita qualcosa e guarda l'hash:</p>
          <input
            type="text"
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            placeholder="Digita qualcosa..."
            className="w-full bg-card-elevated border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 mb-3"
          />
          {hashOutput && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-background border border-border rounded p-3"
            >
              <p className="text-[10px] text-muted-foreground mb-1">SHA-256</p>
              <p className="text-xs font-mono text-primary break-all leading-relaxed">{hashOutput}</p>
            </motion.div>
          )}
        </div>

        {/* 3 columns */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex gap-3"
            >
              <div className="text-primary shrink-0 mt-0.5">{f.icon}</div>
              <div>
                <h3 className="text-sm font-bold font-heading text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BlockchainPage;