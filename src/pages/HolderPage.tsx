import { useMemo } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const MAX_SUPPLY = 21_000_000;
const SATOSHI_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

const HOLDERS = [
  { rank: 1, address: "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo", btc: 248597.13, lastMove: "2 anni fa", label: "Balena" },
  { rank: 2, address: "bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrpmv24sq90ecnvqqjwvw97", btc: 175002.77, lastMove: "8 mesi fa", label: "Balena" },
  { rank: 3, address: "3LYJfcfHkxYkFQmkiCuwAnt4vQMQcNQqd9", btc: 143600.00, lastMove: "1 anno fa", label: "Balena" },
  { rank: 4, address: "bc1qazcm763858nkj2dj986etajv6wquslv8uxwczt", btc: 132686.00, lastMove: "3 mesi fa", label: "Balena" },
  { rank: 5, address: "1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF", btc: 79957.24, lastMove: "14 anni fa", label: "Hodler storico" },
  { rank: 6, address: "3Cbq7aT1tY8kMxWLBitaNeKNpW9oxfkBv", btc: 78433.00, lastMove: "6 mesi fa", label: "Balena" },
  { rank: 7, address: "1LdRcdxfbSnmCYYNdeYpUnztiYzVfBEQeC", btc: 72000.00, lastMove: "2 anni fa", label: "Balena" },
  { rank: 8, address: "3FHNBLobJnbCPujupCNncT9DGMyzFNRNRS", btc: 69000.00, lastMove: "1 anno fa", label: "Balena" },
  { rank: 9, address: "bc1qd4ysezhmypwty5dnw7c8nqy5h5nxg0xqsvaefd0qn5kq32vwnwqqgv4dr3", btc: 67644.00, lastMove: "4 mesi fa", label: "Balena" },
  { rank: 10, address: "1AC4fMwgY8j9onSbXEWeH6Zan8QGMSdmtA", btc: 66452.00, lastMove: "5 anni fa", label: "Hodler storico" },
];

const HolderPage = () => {
  const totalBtc = useMemo(() => HOLDERS.reduce((s, h) => s + h.btc, 0), []);
  const percentSupply = ((totalBtc / MAX_SUPPLY) * 100).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-16"
    >
      <SEO
        title="Top Holder Bitcoin — I 10 Indirizzi Più Ricchi | BitcoinPerTe"
        description="Chi detiene davvero Bitcoin? I 10 indirizzi con più BTC al mondo. Dati pubblici dalla blockchain. Incluso l'indirizzo di Satoshi."
        path="/holder"
      />

      <div className="container mx-auto px-4 max-w-5xl py-12 space-y-10">
        <div className="text-center space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary/60">I Custodi</p>
          <h1 className="text-2xl md:text-4xl font-bold font-heading text-foreground">Chi detiene Bitcoin</h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            I 10 indirizzi con più BTC al mondo. Dati pubblici dalla blockchain. Nessuna identità — solo matematica.
          </p>
          <span className="inline-block text-[11px] text-primary-foreground bg-primary rounded px-3 py-1 font-medium">
            Dati di riferimento blockchain · Aggiornamento periodico · Solo divulgazione
          </span>
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 px-2 text-xs text-muted-foreground font-medium w-10">#</th>
                <th className="py-3 px-2 text-xs text-muted-foreground font-medium">Indirizzo</th>
                <th className="py-3 px-2 text-xs text-muted-foreground font-medium text-right">BTC</th>
                <th className="py-3 px-2 text-xs text-muted-foreground font-medium text-right hidden md:table-cell">% Supply</th>
                <th className="py-3 px-2 text-xs text-muted-foreground font-medium text-right hidden lg:table-cell">Ultimo mov.</th>
                <th className="py-3 px-2 text-xs text-muted-foreground font-medium hidden lg:table-cell">Etichetta</th>
              </tr>
            </thead>
            <tbody>
              {HOLDERS.map((h) => {
                const pct = ((h.btc / MAX_SUPPLY) * 100).toFixed(3);
                return (
                  <tr key={h.address} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-2 font-mono text-muted-foreground">{h.rank}</td>
                    <td className="py-3 px-2 font-mono text-xs text-foreground/80">
                      {h.address.slice(0, 8)}…{h.address.slice(-6)}
                    </td>
                    <td className="py-3 px-2 font-mono text-right text-foreground font-medium">
                      {h.btc.toLocaleString("it-IT", { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-2 font-mono text-right text-muted-foreground hidden md:table-cell">{pct}%</td>
                    <td className="py-3 px-2 text-right text-xs text-muted-foreground hidden lg:table-cell">{h.lastMove}</td>
                    <td className="py-3 px-2 text-xs hidden lg:table-cell">
                      <span className="text-muted-foreground/70">
                        {h.label === "Hodler storico" ? "💎 Hodler storico" : "🐋 " + h.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Educational Box */}
        <div className="card-surface rounded-xl p-6 border-l-2 border-l-primary">
          <h3 className="text-base font-bold text-foreground mb-2">Cosa ci dice questa lista?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I primi 10 indirizzi controllano circa il {percentSupply}% di tutti i Bitcoin esistenti.
            Eppure nessuno può bloccarli, confiscarli o cambiarli — non c'è corte, governo o banca
            che possa farlo. Solo le chiavi private contano.
          </p>
        </div>

        <p className="text-center text-[12px] text-muted-foreground/60 pb-4">
          Dati di riferimento dalla blockchain pubblica · Solo uso divulgativo
        </p>
      </div>
    </motion.div>
  );
};

export default HolderPage;
