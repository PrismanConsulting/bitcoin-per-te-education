import { motion } from "framer-motion";

const rows = [
  ["Emissione", "Programmata (max 21M BTC)", "Discrezionale — banca centrale"],
  ["Operatività", "24/7/365", "Orari bancari e festivi"],
  ["Confini", "Nessuno — rete globale", "Dipende dalla giurisdizione"],
  ["Autorizzazione", "Non necessaria", "Conto bancario richiesto"],
  ["Offerta", "Deflazionistica — halving ~4y", "Variabile — decisione politica"],
  ["Trasparenza", "Registro pubblico verificabile", "Bilanci istituzionali privati"],
  ["Intermediari", "Nessuno — peer-to-peer", "Banche, circuiti, SWIFT"],
  ["Finalità tx", "Irreversibile per design", "Storno possibile (chargeback)"],
  ["Accessibilità", "Chiunque abbia internet", "Dipende dal sistema bancario"],
];

const cards = [
  { emoji: "🌐", title: "BORDERLESS", text: "Una transazione da Milano a Tokyo ha lo stesso costo e la stessa velocità di una locale. Nessun codice SWIFT, nessun corrispondente bancario, nessuna conversione valutaria obbligatoria." },
  { emoji: "⏰", title: "SEMPRE APERTO", text: "La rete Bitcoin non chiude mai. Niente festività, niente manutenzione programmata. Un blocco ogni ~10 minuti, ogni giorno, da quando è nata nel 2009." },
  { emoji: "🔓", title: "SENZA PERMESSO", text: "Non serve l'approvazione di un istituto per usare la rete. L'accesso è determinato dalla connessione internet, non dalla storia creditizia o dalla cittadinanza." },
  { emoji: "📊", title: "REGOLE PUBBLICHE", text: "L'offerta di Bitcoin è definita dal codice sorgente, visibile e verificabile da chiunque. Le regole cambiano solo con consenso distribuito della rete — non per delibera di un comitato." },
];

const FiatPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="min-h-screen pt-16 flex flex-col justify-center"
  >
    <div className="container mx-auto px-4 max-w-6xl py-12">
      <div className="mb-8">
        <p className="label-section mb-2">CONFRONTO</p>
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground">Bitcoin e le Monete Tradizionali</h1>
        <p className="text-muted-foreground mt-2">Un confronto tecnico tra due architetture monetarie diverse.</p>
      </div>

      <div className="grid lg:grid-cols-11 gap-8 lg:gap-10">
        {/* Table - 55% */}
        <div className="lg:col-span-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 pr-3 font-heading font-semibold text-foreground text-xs">Proprietà</th>
                <th className="text-left py-2.5 px-3 font-heading font-semibold text-foreground text-xs">Bitcoin</th>
                <th className="text-left py-2.5 pl-3 font-heading font-semibold text-foreground text-xs">Monete Fiat</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-card-elevated"}>
                  <td className="py-2 pr-3 text-xs text-foreground font-medium">{row[0]}</td>
                  <td className="py-2 px-3 text-xs text-primary">{row[1]}</td>
                  <td className="py-2 pl-3 text-xs text-muted-foreground">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards - 45% */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="card-surface p-4"
            >
              <span className="text-lg">{card.emoji}</span>
              <h3 className="text-[11px] font-bold font-heading text-primary mt-2 mb-2 tracking-wide">{card.title}</h3>
              <p className="text-[12px] text-muted-foreground leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-border text-center">
        <p className="text-[11px] text-muted-foreground/50">
          Contenuto prodotto a fini informativi e comparativi. Non esprime raccomandazioni sull'utilizzo o sull'acquisto di alcun asset. Prisman Consulting non fornisce consulenza finanziaria.
        </p>
      </div>
    </div>
  </motion.div>
);

export default FiatPage;