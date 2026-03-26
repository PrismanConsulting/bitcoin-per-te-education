import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

interface BlockData {
  id: string;
  height: number;
  timestamp: number;
  tx_count: number;
  size: number;
}

const soggetti = [
  "Chi custodisce le chiavi", "La rete", "Il tempo",
  "Chi non si fida delle banche", "Il codice",
  "Chi aspetta", "La matematica", "Chi verifica",
  "Il protocollo", "Chi hodla"
];

const verbi = [
  "non dimentica", "resiste", "sopravvive",
  "non chiede permesso", "continua", "non mente",
  "persiste", "non si ferma", "avanza", "rimane"
];

const complementi = [
  "quando tutto cambia", "nell'era del rumore",
  "oltre ogni confine", "mentre il mondo dorme",
  "senza bisogno di fiducia", "nel silenzio dei blocchi",
  "quando le banche chiudono", "oltre le frontiere",
  "nella matematica pura", "oltre il tempo"
];

const chiusure = [
  "— Blocco #{height}",
  "— Hash {hash6}",
  "— {date}",
  "— Rete Bitcoin, blocco #{height}",
  "— {time}, blocco #{height}"
];

function hashToProfezia(hash: string, height: number): string {
  const s = parseInt(hash.slice(0, 4), 16) % soggetti.length;
  const v = parseInt(hash.slice(4, 8), 16) % verbi.length;
  const c = parseInt(hash.slice(8, 12), 16) % complementi.length;
  const ch = parseInt(hash.slice(12, 16), 16) % chiusure.length;
  const date = new Date().toLocaleDateString("it-IT");
  const time = new Date().toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const hash6 = hash.slice(0, 6).toUpperCase();
  const chiusura = chiusure[ch]
    .replace("{height}", height.toLocaleString("it-IT"))
    .replace("{hash6}", hash6)
    .replace("{date}", date)
    .replace("{time}", time);
  return `${soggetti[s]} ${verbi[v]} ${complementi[c]} ${chiusura}`;
}

const OracoloPage = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(600);
  const lastHeightRef = useRef<number | null>(null);
  const [prophecyKey, setProphecyKey] = useState(0);

  const fetchBlocks = () => {
    fetch("https://mempool.space/api/v1/blocks")
      .then((r) => r.json())
      .then((data: BlockData[]) => {
        const sorted = data.slice(0, 7).sort((a, b) => b.height - a.height);
        if (lastHeightRef.current && sorted[0]?.height !== lastHeightRef.current) {
          setProphecyKey((k) => k + 1);
          setCountdown(600);
        }
        lastHeightRef.current = sorted[0]?.height ?? null;
        setBlocks(sorted);
        setLoading(false);

        // Calculate countdown from latest block timestamp
        if (sorted[0]) {
          const elapsed = Math.floor(Date.now() / 1000) - sorted[0].timestamp;
          const remaining = Math.max(0, 600 - elapsed);
          setCountdown(remaining);
        }
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlocks();
    const interval = setInterval(fetchBlocks, 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const latest = blocks[0];
  const archiveBlocks = blocks.slice(1, 7);

  const formatCountdown = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#080808]"
    >
      <SEO
        title="Oracolo dei Blocchi — Ogni Hash è una Profezia | BitcoinPerTe"
        description="Ogni 10 minuti la rete Bitcoin mina un nuovo blocco. Il suo hash unico genera una profezia matematica irripetibile. Torna ogni blocco."
        path="/oracolo"
      />

      <div className="container mx-auto px-4 pt-28 pb-20 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary/60 mb-4">
            Oracolo dei Blocchi
          </p>

          {loading ? (
            <div className="space-y-4">
              <div className="h-14 w-64 mx-auto rounded bg-muted/20 animate-pulse" />
              <div className="h-5 w-48 mx-auto rounded bg-muted/20 animate-pulse" />
            </div>
          ) : latest ? (
            <>
              <h1 className="font-mono text-5xl md:text-6xl text-primary font-bold mb-3">
                #{latest.height.toLocaleString("it-IT")}
              </h1>
              <p className="text-sm text-muted-foreground">
                minato il{" "}
                {new Date(latest.timestamp * 1000).toLocaleDateString("it-IT")}{" "}
                alle{" "}
                {new Date(latest.timestamp * 1000).toLocaleTimeString("it-IT", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </>
          ) : (
            <p className="text-muted-foreground">Dati temporaneamente non disponibili</p>
          )}
        </div>

        {/* Profezia Card */}
        {latest && (
          <div className="card-surface rounded-2xl border border-primary/20 p-8 md:p-12 mb-8 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={prophecyKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-serif italic text-2xl md:text-3xl text-foreground leading-relaxed"
              >
                {hashToProfezia(latest.id, latest.height)}
              </motion.p>
            </AnimatePresence>

            <p className="font-mono text-xs text-muted-foreground/40 mt-6 break-all">
              {latest.id.slice(0, 32)}…
            </p>
          </div>
        )}

        {/* Countdown */}
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground">
            Prossima profezia tra:{" "}
            <span className="font-mono text-primary">
              ~{formatCountdown(countdown)}
            </span>
          </p>
        </div>

        {/* Come funziona */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            {
              title: "Hash unico",
              desc: "Ogni blocco ha un'impronta digitale irripetibile",
            },
            {
              title: "Algoritmo deterministico",
              desc: "Stesso hash = stessa frase, per sempre, anche tra 100 anni",
            },
            {
              title: "Zero AI",
              desc: "Solo matematica pura, nessun modello, nessun server",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="card-surface rounded-xl p-6 border border-border"
            >
              <h3 className="text-base font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Archivio ultimi 6 blocchi */}
        {archiveBlocks.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">
              Ultimi blocchi
            </h2>
            <div className="space-y-2">
              {archiveBlocks.map((block) => (
                <div
                  key={block.height}
                  className="card-surface rounded-lg p-4 border border-border group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-mono text-sm text-primary shrink-0">
                      #{block.height.toLocaleString("it-IT")}
                    </span>
                    <span className="text-sm text-foreground/80 italic flex-1 truncate">
                      {hashToProfezia(block.id, block.height)}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/40 shrink-0">
                      {block.id.slice(0, 6).toUpperCase()}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground/30 mt-1 hidden group-hover:block break-all">
                    {block.id}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OracoloPage;
