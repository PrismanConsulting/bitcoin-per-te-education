import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PriceData { eur: number; eur_24h_change: number }
interface FeeData { fastestFee: number; halfHourFee: number; hourFee: number; economyFee: number }
interface DiffData { progressPercent: number; difficultyChange: number; remainingBlocks: number }
interface MempoolData { count: number; vsize: number }
interface BlockData {
  id: string; height: number; timestamp: number; tx_count: number;
  size: number; extras?: { pool?: { name?: string } };
}

function calcSupply(h: number): number {
  let supply = 0, reward = 50, pos = 0;
  while (pos < h) {
    const era = Math.floor(pos / 210000);
    const eraEnd = (era + 1) * 210000;
    const blocks = Math.min(h, eraEnd) - pos;
    supply += blocks * reward;
    pos = eraEnd;
    reward /= 2;
  }
  return supply;
}

function timeAgo(ts: number): string {
  const diff = Math.floor(Date.now() / 1000 - ts);
  if (diff < 60) return `${diff}s fa`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min fa`;
  return `${Math.floor(diff / 3600)}h fa`;
}

const NEXT_HALVING_BLOCK = 1_050_000;

const resources = [
  { name: "mempool.space", desc: "Block explorer open source", url: "https://mempool.space" },
  { name: "bitnodes.io", desc: "Mappa mondiale nodi Bitcoin", url: "https://bitnodes.io" },
  { name: "bitcoin.org", desc: "Sito ufficiale del progetto", url: "https://bitcoin.org" },
  { name: "bitcoinops.org", desc: "Newsletter tecnica settimanale", url: "https://bitcoinops.org" },
  { name: "github.com/bitcoin/bitcoin", desc: "Codice sorgente Core", url: "https://github.com/bitcoin/bitcoin" },
  { name: "bitcoinwhitepaper.io", desc: "Whitepaper originale", url: "https://bitcoinwhitepaper.co" },
];

const StatSkeleton = () => <Skeleton className="h-8 w-24 bg-muted" />;

function useFlash(value: unknown): boolean {
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== undefined && prev.current !== value) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(t);
    }
    prev.current = value;
  }, [value]);
  return flash;
}

const FlashValue = ({ children, flash }: { children: React.ReactNode; flash: boolean }) => (
  <span
    className="transition-colors duration-500"
    style={{ color: flash ? "hsl(28, 93%, 53%)" : undefined }}
  >
    {children}
  </span>
);

const TerminalePage = () => {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [fees, setFees] = useState<FeeData | null>(null);
  const [diff, setDiff] = useState<DiffData | null>(null);
  const [mempool, setMempool] = useState<MempoolData | null>(null);
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [error, setError] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);
  const [secAgo, setSecAgo] = useState(0);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!lastFetchTime) return;
    setSecAgo(0);
    const t = setInterval(() => {
      setSecAgo(Math.floor((Date.now() - lastFetchTime) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [lastFetchTime]);

  const fetchPrice = useCallback(async () => {
    try {
      const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur&include_24hr_change=true");
      const d = await r.json();
      if (d.bitcoin) setPrice(d.bitcoin);
      setLastFetchTime(Date.now());
      setError(false);
    } catch { /* keep last value */ }
  }, []);

  const fetchNetwork = useCallback(async () => {
    try {
      const results = await Promise.allSettled([
        fetch("https://mempool.space/api/blocks/tip/height").then(r => r.json()),
        fetch("https://mempool.space/api/v1/fees/recommended").then(r => r.json()),
        fetch("https://mempool.space/api/v1/difficulty-adjustment").then(r => r.json()),
        fetch("https://mempool.space/api/mempool").then(r => r.json()),
        fetch("https://mempool.space/api/v1/blocks").then(r => r.json()),
      ]);
      if (results[0].status === "fulfilled") setBlockHeight(results[0].value);
      if (results[1].status === "fulfilled") setFees(results[1].value);
      if (results[2].status === "fulfilled") setDiff(results[2].value);
      if (results[3].status === "fulfilled") setMempool(results[3].value);
      if (results[4].status === "fulfilled") setBlocks(results[4].value.slice(0, 6));
      setLastFetchTime(Date.now());
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchPrice();
    fetchNetwork();
    const priceInterval = setInterval(fetchPrice, 60_000);
    const networkInterval = setInterval(fetchNetwork, 30_000);
    return () => {
      clearInterval(priceInterval);
      clearInterval(networkInterval);
    };
  }, [fetchPrice, fetchNetwork]);

  const supply = blockHeight ? calcSupply(blockHeight) : null;
  const halvingBlocks = blockHeight ? NEXT_HALVING_BLOCK - blockHeight : null;
  const halvingMs = halvingBlocks ? halvingBlocks * 10 * 60 * 1000 : null;
  const halvingTarget = halvingMs && lastFetchTime ? lastFetchTime + halvingMs : null;
  const halvingRemaining = halvingTarget ? Math.max(0, halvingTarget - now) : null;
  const halvingDays = halvingRemaining ? Math.floor(halvingRemaining / 86_400_000) : null;
  const halvingHours = halvingRemaining ? Math.floor((halvingRemaining % 86_400_000) / 3_600_000) : null;
  const halvingMinutes = halvingRemaining ? Math.floor((halvingRemaining % 3_600_000) / 60_000) : null;
  const halvingSeconds = halvingRemaining ? Math.floor((halvingRemaining % 60_000) / 1000) : null;
  const supplyPercent = supply ? (supply / 21_000_000) * 100 : 0;

  const flashPrice = useFlash(price?.eur);
  const flashBlock = useFlash(blockHeight);
  const flashDiff = useFlash(diff?.difficultyChange);
  const flashFee = useFlash(fees?.halfHourFee);
  const flashSupply = useFlash(supply ? Math.floor(supply) : null);
  const flashMemCount = useFlash(mempool?.count);
  const flashMemSize = useFlash(mempool ? (mempool.vsize / 1_000_000).toFixed(1) : null);
  const flashFastFee = useFlash(fees?.fastestFee);
  const flashEcoFee = useFlash(fees?.hourFee);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16"
      style={{ background: "#080808" }}
    >
      <div className="container mx-auto px-4 max-w-6xl py-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="label-section mb-1">DATI IN TEMPO REALE</p>
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Terminale</h1>
            <p className="text-base text-muted-foreground mt-1">Dati tecnici live dalla rete Bitcoin. Solo la rete — nessun commento finanziario.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${error ? "bg-red-500" : "bg-green-500 animate-pulse"}`} />
              <span className="text-sm text-muted-foreground">{error ? "Dati non disponibili" : "Rete attiva"}</span>
            </div>
            {lastFetchTime && (
              <span className="font-mono text-[12px] text-muted-foreground/50">
                Agg. {secAgo} sec fa
              </span>
            )}
          </div>
        </div>
        {/* Price disclaimer */}
        <p className="text-[12px] text-muted-foreground/50 text-center mb-6">
          I dati di prezzo sono forniti a solo titolo informativo. Non costituiscono analisi finanziaria o raccomandazione di acquisto.
        </p>

        {/* Stats strip */}
        <div className="bg-card border-y border-border py-4 px-4 mb-8 rounded-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Price */}
          <div>
            <p className="text-[12px] text-muted-foreground mb-0.5">BTC/EUR</p>
            {price ? (
              <>
                <p className="font-mono font-bold text-[28px] text-foreground leading-tight">
                  <FlashValue flash={flashPrice}>€{price.eur.toLocaleString("it-IT")}</FlashValue>
                </p>
                <p className={`text-[13px] font-mono ${price.eur_24h_change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {price.eur_24h_change >= 0 ? "+" : ""}{price.eur_24h_change.toFixed(1)}% 24h
                </p>
                <p className="text-[12px] text-muted-foreground/40 mt-0.5">Fonte: CoinGecko · Solo informativo</p>
              </>
            ) : <StatSkeleton />}
          </div>

          {/* Block */}
          <div>
            <p className="text-[12px] text-muted-foreground mb-0.5">Blocco più recente</p>
            {blockHeight ? (
              <p className="font-mono font-bold text-[28px] text-foreground leading-tight">
                <FlashValue flash={flashBlock}>#{blockHeight.toLocaleString("it-IT")}</FlashValue>
              </p>
            ) : <StatSkeleton />}
          </div>

          {/* Difficulty */}
          <div>
            <p className="text-[12px] text-muted-foreground mb-0.5">Difficoltà di mining</p>
            {diff ? (
              <p className="font-mono font-bold text-[28px] text-foreground leading-tight">
                <FlashValue flash={flashDiff}>
                  {diff.difficultyChange >= 0 ? "+" : ""}{diff.difficultyChange.toFixed(2)}%
                </FlashValue>
              </p>
            ) : <StatSkeleton />}
          </div>

          {/* Halving countdown */}
          <div>
            <p className="text-[12px] text-muted-foreground mb-0.5">Al prossimo halving</p>
            {halvingDays !== null ? (
              <p className="font-mono font-bold text-[28px] text-foreground leading-tight">
                {halvingDays}g {halvingHours}h {halvingMinutes}m{" "}
                <span className="text-lg text-muted-foreground">{halvingSeconds}s</span>
              </p>
            ) : <StatSkeleton />}
          </div>

          {/* Fee */}
          <div>
            <p className="text-[12px] text-muted-foreground mb-0.5">Fee consigliata ora</p>
            {fees ? (
              <p className="font-mono font-bold text-[28px] text-primary leading-tight">
                <FlashValue flash={flashFee}>{fees.halfHourFee}</FlashValue>{" "}
                <span className="text-sm text-muted-foreground">sat/vB</span>
              </p>
            ) : <StatSkeleton />}
          </div>

          {/* Supply */}
          <div>
            <p className="text-[12px] text-muted-foreground mb-0.5">BTC in circolazione</p>
            {supply ? (
              <>
                <p className="font-mono font-bold text-foreground text-base">
                  <FlashValue flash={flashSupply}>{Math.floor(supply).toLocaleString("it-IT")} BTC</FlashValue>
                </p>
                <p className="text-[12px] text-muted-foreground">di 21.000.000 massimi</p>
                <div className="w-full h-1 bg-muted rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${supplyPercent}%` }} />
                </div>
              </>
            ) : <StatSkeleton />}
          </div>
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-5 gap-8 mb-8">
          {/* Left - Recent blocks */}
          <div className="lg:col-span-3">
            <h2 className="text-base font-heading font-bold text-foreground mb-4">Ultimi Blocchi</h2>
            <div className="space-y-2">
              {blocks.length > 0 ? blocks.map((b, i) => (
                <motion.div
                  key={b.height}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-card border border-border rounded-md p-3 ${i === 0 ? "border-l-2 border-l-primary" : ""}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-bold text-foreground">#{b.height.toLocaleString("it-IT")}</span>
                      <span className="text-[13px] text-muted-foreground">{timeAgo(b.timestamp)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[13px] text-muted-foreground font-mono">
                      <span>Tx: {b.tx_count.toLocaleString("it-IT")}</span>
                      <span>{(b.size / 1_000_000).toFixed(2)} MB</span>
                      {b.extras?.pool?.name && <span className="text-primary">{b.extras.pool.name}</span>}
                    </div>
                  </div>
                  <p className="font-mono text-[12px] text-muted-foreground/50 mt-1 truncate">
                    {b.id}
                  </p>
                </motion.div>
              )) : (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full bg-muted rounded-md" />
                ))
              )}
            </div>
            <a
              href="https://mempool.space"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
            >
              Esplora su mempool.space <ExternalLink size={12} />
            </a>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 space-y-6">
            {/* Network status */}
            <div>
              <h2 className="text-base font-heading font-bold text-foreground mb-3">Stato della Rete</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="card-surface p-3">
                  <p className="text-[12px] text-muted-foreground">Tx in mempool</p>
                  <p className="font-mono font-bold text-lg text-foreground">
                    {mempool ? <FlashValue flash={flashMemCount}>{mempool.count.toLocaleString("it-IT")}</FlashValue> : "—"}
                  </p>
                </div>
                <div className="card-surface p-3">
                  <p className="text-[12px] text-muted-foreground">Dim. mempool</p>
                  <p className="font-mono font-bold text-lg text-foreground">
                    {mempool ? <FlashValue flash={flashMemSize}>{(mempool.vsize / 1_000_000).toFixed(1) + " MB"}</FlashValue> : "—"}
                  </p>
                </div>
                <div className="card-surface p-3">
                  <p className="text-[12px] text-muted-foreground">Fee veloce</p>
                  <p className="font-mono font-bold text-lg text-primary">
                    {fees ? <FlashValue flash={flashFastFee}>{fees.fastestFee + " sat/vB"}</FlashValue> : "—"}
                  </p>
                </div>
                <div className="card-surface p-3">
                  <p className="text-[12px] text-muted-foreground">Fee economica</p>
                  <p className="font-mono font-bold text-lg text-foreground">
                    {fees ? <FlashValue flash={flashEcoFee}>{fees.hourFee + " sat/vB"}</FlashValue> : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h2 className="text-base font-heading font-bold text-foreground mb-3">Risorse Esterne</h2>
              <div className="space-y-1.5">
                {resources.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-1.5 text-sm hover:text-primary transition-colors group"
                  >
                    <div>
                      <span className="text-foreground group-hover:text-primary text-sm font-medium">{r.name}</span>
                      <span className="text-muted-foreground text-[13px] ml-2">{r.desc}</span>
                    </div>
                    <ExternalLink size={12} className="text-muted-foreground/40 group-hover:text-primary shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Last update + note */}
        <div className="text-center border-t border-border pt-4">
          <p className="text-[12px] text-muted-foreground/40 mb-1">
            Prezzo: ogni 60s · Rete: ogni 30s · Halving: tempo reale
          </p>
          <p className="text-[12px] text-muted-foreground/30">
            Dati tecnici forniti a scopo informativo. Fonti: mempool.space, CoinGecko. Non costituisce analisi finanziaria.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalePage;
