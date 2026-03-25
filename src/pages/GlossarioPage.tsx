import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import SEO from "@/components/SEO";

type Difficulty = "base" | "intermedio" | "avanzato";

interface Term {
  name: string;
  definition: string;
  difficulty: Difficulty;
  link?: string;
}

const difficultyConfig: Record<Difficulty, { emoji: string; label: string; color: string; border: string }> = {
  base: { emoji: "🟢", label: "Base", color: "text-green-400", border: "border-green-500/30" },
  intermedio: { emoji: "🟡", label: "Intermedio", color: "text-yellow-400", border: "border-yellow-500/30" },
  avanzato: { emoji: "🔴", label: "Avanzato", color: "text-red-400", border: "border-red-500/30" },
};

const terms: Term[] = [
  // BASE
  { name: "Bitcoin", definition: "La prima valuta digitale decentralizzata, creata nel 2008 da Satoshi Nakamoto.", difficulty: "base", link: "/bitcoin" },
  { name: "Satoshi", definition: "L'unità minima di Bitcoin. 1 BTC = 100.000.000 satoshi.", difficulty: "base", link: "/satoshi" },
  { name: "Blockchain", definition: "Registro pubblico distribuito e immutabile di tutte le transazioni Bitcoin.", difficulty: "base", link: "/blockchain" },
  { name: "Wallet", definition: "Strumento per gestire chiavi crittografiche e accedere ai propri bitcoin.", difficulty: "base" },
  { name: "Halving", definition: "Dimezzamento della ricompensa ai miner, ogni ~4 anni (210.000 blocchi).", difficulty: "base", link: "/mining" },
  { name: "Miner", definition: "Chi usa potenza computazionale per validare blocchi e guadagnare ricompense.", difficulty: "base", link: "/mining" },
  { name: "Nodo", definition: "Computer che scarica e verifica l'intera blockchain in modo indipendente.", difficulty: "base" },
  { name: "Hash", definition: "Impronta digitale univoca di un dato — il fondamento crittografico della blockchain.", difficulty: "base", link: "/blockchain" },
  { name: "Chiave privata", definition: "Codice segreto che permette di firmare transazioni e controllare i propri bitcoin.", difficulty: "base" },
  { name: "Chiave pubblica", definition: "Derivata dalla chiave privata, usata per generare indirizzi e ricevere bitcoin.", difficulty: "base" },
  // INTERMEDIO
  { name: "UTXO", definition: "Unspent Transaction Output — l'unità base del modello contabile di Bitcoin.", difficulty: "intermedio" },
  { name: "Mempool", definition: "Coda di transazioni non ancora incluse in un blocco, in attesa di conferma.", difficulty: "intermedio", link: "/terminale" },
  { name: "Fee", definition: "Commissione pagata ai miner per includere una transazione in un blocco.", difficulty: "intermedio", link: "/terminale" },
  { name: "Proof of Work", definition: "Meccanismo di consenso basato su lavoro computazionale reale per validare i blocchi.", difficulty: "intermedio", link: "/mining" },
  { name: "Difficulty adjustment", definition: "Aggiustamento automatico della difficoltà di mining ogni 2.016 blocchi (~2 settimane).", difficulty: "intermedio", link: "/mining" },
  { name: "Fork", definition: "Divisione del protocollo — soft fork (compatibile) o hard fork (incompatibile).", difficulty: "intermedio" },
  { name: "Multisig", definition: "Transazione che richiede più firme crittografiche per essere valida e spesa.", difficulty: "intermedio" },
  { name: "Timelock", definition: "Condizione che blocca un output fino a un certo blocco o orario specifico.", difficulty: "intermedio" },
  { name: "SegWit", definition: "Aggiornamento del 2017 che separa i dati di firma dalla transazione, aumentando la capacità.", difficulty: "intermedio" },
  { name: "Lightning Network", definition: "Layer 2 per micropagamenti istantanei fuori dalla blockchain principale.", difficulty: "intermedio" },
  // AVANZATO
  { name: "Taproot", definition: "Aggiornamento del 2021 che migliora privacy e flessibilità degli script Bitcoin.", difficulty: "avanzato" },
  { name: "Schnorr", definition: "Schema di firma crittografica più efficiente, introdotto con l'aggiornamento Taproot.", difficulty: "avanzato" },
  { name: "Script", definition: "Linguaggio di programmazione di Bitcoin per definire condizioni di spesa degli output.", difficulty: "avanzato" },
  { name: "PSBT", definition: "Partially Signed Bitcoin Transaction — standard per firme collaborative e offline.", difficulty: "avanzato" },
  { name: "Replace-by-Fee (RBF)", definition: "Meccanismo per sostituire una transazione non confermata aumentando la fee.", difficulty: "avanzato" },
  { name: "Coinjoin", definition: "Tecnica per combinare più transazioni in una sola, migliorando la privacy on-chain.", difficulty: "avanzato" },
  { name: "HTLC", definition: "Hash Time-Locked Contract — contratto condizionale usato nel Lightning Network.", difficulty: "avanzato" },
  { name: "Merkle Tree", definition: "Struttura ad albero crittografica che consente verifica efficiente delle transazioni in un blocco.", difficulty: "avanzato" },
  { name: "SPV", definition: "Simplified Payment Verification — verifica leggera senza scaricare l'intera blockchain.", difficulty: "avanzato" },
  { name: "Nonce", definition: "Numero arbitrario che i miner modificano ripetutamente per trovare un hash valido.", difficulty: "avanzato", link: "/mining" },
];

const GlossarioPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Difficulty>("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return terms.filter((t) => {
      if (filter !== "all" && t.difficulty !== filter) return false;
      if (q && !t.name.toLowerCase().includes(q) && !t.definition.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, filter]);

  const filters: { value: "all" | Difficulty; label: string }[] = [
    { value: "all", label: "Tutti" },
    { value: "base", label: "🟢 Base" },
    { value: "intermedio", label: "🟡 Intermedio" },
    { value: "avanzato", label: "🔴 Avanzato" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16"
    >
      <SEO
        title="Glossario Bitcoin — Tutti i Termini Tecnici in Italiano | BitcoinPerTe"
        description="30+ termini tecnici di Bitcoin spiegati in italiano: blockchain, halving, UTXO, SegWit, Taproot e molto altro. Glossario completo con livelli di difficoltà."
        path="/glossario"
      />
      <div className="container mx-auto px-4 max-w-6xl py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="label-section mb-2">RIFERIMENTO TECNICO</p>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Glossario Bitcoin</h1>
          <p className="text-muted-foreground text-base mt-2">Tutti i termini tecnici spiegati in italiano</p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cerca un termine…"
              className="w-full bg-card-elevated border border-border rounded pl-9 pr-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === f.value
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} {filtered.length === 1 ? "termine" : "termini"}
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((term) => {
            const cfg = difficultyConfig[term.difficulty];
            return (
              <div key={term.name} className="card-surface p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading font-bold text-foreground text-base">{term.name}</h3>
                  <span className={`text-[12px] px-2 py-0.5 rounded border ${cfg.border} ${cfg.color} whitespace-nowrap`}>
                    {cfg.emoji} {cfg.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{term.definition}</p>
                {term.link && (
                  <Link to={term.link} className="text-[13px] text-primary hover:underline inline-block">
                    Approfondisci →
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Nessun termine trovato per questa ricerca.</p>
        )}
      </div>
    </motion.div>
  );
};

export default GlossarioPage;
