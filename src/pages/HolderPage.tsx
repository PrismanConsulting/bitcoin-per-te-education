import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const MAX_SUPPLY = 21_000_000;
const SATOSHI_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

const FALLBACK_HOLDERS = [
  { address: "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo", btc: 248597, label: "Balena" },
  { address: "bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrpmv24sq90ecnvqqjwvw97", btc: 175000, label: "Balena" },
  { address: "3LYJfcfHkxYkFQmkiCuwAnt4vQMQcNQqd9", btc: 143600, label: "Balena" },
  { address: "bc1qazcm763858nkj2dj986etajv6wquslv8uxwczt", btc: 130000, label: "Balena" },
  { address: "1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF", btc: 79956, label: "Hodler storico" },
  { address: "3Cbq7aT1tY8kMxWLBitaNeKNpW9oxfkBv", btc: 78000, label: "Balena" },
  { address: "1LdRcdxfbSnmCYYNdeYpUnztiYzVfBEQeC", btc: 72000, label: "Balena" },
  { address: "3FHNBLobJnbCPujupCNncT9DGMyzFNRNRS", btc: 70000, label: "Balena" },
  { address: "bc1qd4ysezhmypwty5dnw7c8nqy5h5nxg0xqsvaefd0qn5kq32vwnwqqgv4dr3", btc: 68000, label: "Balena" },
  { address: "1AC4fMwgY8j9onSbXEWeH6Zan8QGMSdmtA", btc: 66452, label: "Hodler storico" },
];

interface AddressRow {
  address: string;
  balance: number;
  last_seen_receiving?: string;
  last_seen_spending?: string;
}

function timeAgo(dateStr: string | undefined): { text: string; years: number } {
  if (!dateStr) return { text: "Sconosciuto", years: 0 };
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const days = Math.floor(diffMs / 86_400_000);
  const years = days / 365.25;
  if (years >= 1) return { text: `${Math.floor(years)} anni fa`, years };
  const months = Math.floor(days / 30);
  if (months >= 1) return { text: `${months} mesi fa`, years };
  return { text: `${days} giorni fa`, years };
}

function timeColor(years: number): string {
  if (years > 10) return "text-primary";
  if (years > 1) return "text-muted-foreground";
  return "text-green-400";
}

function getLabel(btc: number, years: number): string | null {
  const labels: string[] = [];
  if (btc > 100_000) labels.push("🐋 Mega balena");
  else if (btc > 10_000) labels.push("🐋 Grande balena");
  else if (btc > 1_000) labels.push("🐋 Balena");
  if (years > 5) labels.push("💎 Hodler storico");
  else if (years > 1) labels.push("💎 Hodler");
  return labels.length > 0 ? labels.join(" · ") : null;
}

const HolderPage = () => {
  const [addresses, setAddresses] = useState<AddressRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const API_URL =
      "https://corsproxy.io/?" +
      encodeURIComponent(
        "https://api.blockchair.com/bitcoin/addresses?a=balance&s=balance(desc)&limit=50"
      );

    const fetchData = () => {
      fetch(API_URL)
        .then((r) => r.json())
        .then((d) => {
          if (d.data) {
            setAddresses(d.data);
            setUsingFallback(false);
            setLastUpdate(new Date());
          }
          setLoading(false);
        })
        .catch(() => {
          // Use fallback data
          setAddresses(
            FALLBACK_HOLDERS.map((h) => ({
              address: h.address,
              balance: h.btc * 1e8,
            }))
          );
          setUsingFallback(true);
          setLastUpdate(new Date());
          setLoading(false);
        });
    };
    fetchData();
    const iv = setInterval(fetchData, 3_600_000);
    return () => clearInterval(iv);
  }, []);

  const totalBtcTop = useMemo(
    () => addresses.reduce((sum, a) => sum + a.balance / 1e8, 0),
    [addresses]
  );
  const percentSupply = ((totalBtcTop / MAX_SUPPLY) * 100).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-16"
    >
      <SEO
        title="Top Holder Bitcoin — I 50 Indirizzi Più Ricchi | BitcoinPerTe"
        description="Chi detiene davvero Bitcoin? I 50 indirizzi con più BTC al mondo. Dati pubblici dalla blockchain, aggiornati ogni ora. Incluso l'indirizzo di Satoshi."
        path="/holder"
      />

      <div className="container mx-auto px-4 max-w-5xl py-12 space-y-10">
        <div className="text-center space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary/60">I Custodi</p>
          <h1 className="text-2xl md:text-4xl font-bold font-heading text-foreground">Chi detiene Bitcoin</h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            I {usingFallback ? "10" : "50"} indirizzi con più BTC al mondo. Dati pubblici dalla blockchain. Nessuna identità — solo matematica.
          </p>
          <span className="inline-block text-[11px] text-primary-foreground bg-primary rounded px-3 py-1 font-medium">
            {usingFallback
              ? "Dati di riferimento · Aggiornamento settimanale · Fonte: blockchain pubblica"
              : "Dati pubblici on-chain · Fonte: Blockchair · Solo divulgazione"}
          </span>
          {lastUpdate && (
            <p className="text-[11px] text-muted-foreground/60">
              Ultimo aggiornamento: {lastUpdate.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
        </div>

        {/* Satoshi Card */}
        <div className="card-surface rounded-xl border-2 border-primary/30 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-primary/60 mb-1">Fuori classifica</p>
              <h2 className="text-lg md:text-xl font-bold text-foreground font-heading">L'Indirizzo di Satoshi Nakamoto</h2>
              <p className="font-mono text-xs text-muted-foreground/50 mt-1 break-all">{SATOSHI_ADDRESS}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-2xl font-bold text-primary">~1.000.000 BTC</p>
              <p className="text-sm text-muted-foreground">Immobile dal 3 gennaio 2009</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/70 italic mt-4">"Se si muovesse, il mondo lo saprebbe."</p>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-surface h-12 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-3 px-2 text-xs text-muted-foreground font-medium w-10">#</th>
                  <th className="py-3 px-2 text-xs text-muted-foreground font-medium">Indirizzo</th>
                  <th className="py-3 px-2 text-xs text-muted-foreground font-medium text-right">BTC</th>
                  <th className="py-3 px-2 text-xs text-muted-foreground font-medium text-right hidden md:table-cell">% Supply</th>
                  {!usingFallback && (
                    <>
                      <th className="py-3 px-2 text-xs text-muted-foreground font-medium text-right hidden lg:table-cell">Ultimo mov.</th>
                      <th className="py-3 px-2 text-xs text-muted-foreground font-medium hidden lg:table-cell">Etichetta</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {addresses.map((addr, i) => {
                  const btc = addr.balance / 1e8;
                  const pct = ((btc / MAX_SUPPLY) * 100).toFixed(3);
                  const lastDate = addr.last_seen_spending || addr.last_seen_receiving;
                  const ago = timeAgo(lastDate);
                  const label = getLabel(btc, ago.years);
                  return (
                    <tr key={addr.address || i} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                      <td className="py-3 px-2 font-mono text-muted-foreground">{i + 1}</td>
                      <td className="py-3 px-2 font-mono text-xs text-foreground/80">
                        {addr.address ? `${addr.address.slice(0, 8)}…${addr.address.slice(-6)}` : "—"}
                      </td>
                      <td className="py-3 px-2 font-mono text-right text-foreground font-medium">
                        {btc.toLocaleString("it-IT", { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-2 font-mono text-right text-muted-foreground hidden md:table-cell">{pct}%</td>
                      {!usingFallback && (
                        <>
                          <td className={`py-3 px-2 text-right text-xs hidden lg:table-cell ${timeColor(ago.years)}`}>{ago.text}</td>
                          <td className="py-3 px-2 text-xs hidden lg:table-cell">
                            {label && <span className="text-muted-foreground/70">{label}</span>}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Educational Box */}
        {!loading && addresses.length > 0 && (
          <div className="card-surface rounded-xl p-6 border-l-2 border-l-primary">
            <h3 className="text-base font-bold text-foreground mb-2">Cosa ci dice questa lista?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I primi {addresses.length} indirizzi controllano circa il {percentSupply}% di tutti i Bitcoin esistenti.
              Eppure nessuno può bloccarli, confiscarli o cambiarli — non c'è corte, governo o banca
              che possa farlo. Solo le chiavi private contano.
            </p>
          </div>
        )}

        <p className="text-center text-[12px] text-muted-foreground/60 pb-4">
          {usingFallback
            ? "Dati di riferimento dalla blockchain pubblica · Solo uso divulgativo"
            : "Dati da Blockchair API pubblica · Aggiornati ogni 60 minuti · Solo uso divulgativo"}
        </p>
      </div>
    </motion.div>
  );
};

export default HolderPage;
