import { motion } from "framer-motion";

const rows = [
  { prop: "Emissione", btc: "Programmata (max 21M BTC)", fiat: "Discrezionale — banca centrale" },
  { prop: "Operatività", btc: "24 ore su 24, 7 giorni su 7", fiat: "Orari bancari e giorni festivi" },
  { prop: "Confini", btc: "Nessuno — rete globale", fiat: "Dipende dalla giurisdizione" },
  { prop: "Autorizzazione", btc: "Non necessaria", fiat: "Conto bancario richiesto" },
  { prop: "Offerta", btc: "Deflazionistica — dimezza ~4 anni", fiat: "Variabile — decisione politica" },
  { prop: "Trasparenza", btc: "Registro pubblico verificabile", fiat: "Bilanci istituzionali privati" },
  { prop: "Intermediari", btc: "Nessuno — peer-to-peer", fiat: "Banche, circuiti, SWIFT" },
  { prop: "Finalità tx", btc: "Irreversibile per design", fiat: "Storno possibile (chargeback)" },
  { prop: "Accessibilità", btc: "Chiunque abbia internet", fiat: "Dipende dal sistema bancario" },
];

const cards = [
  {
    icon: "🌐",
    title: "BORDERLESS",
    text: "Una transazione da Milano a Tokyo ha lo stesso costo e la stessa velocità di una locale. Nessun codice SWIFT, nessun corrispondente bancario, nessuna conversione valutaria obbligatoria.",
  },
  {
    icon: "⏰",
    title: "SEMPRE APERTO",
    text: "La rete Bitcoin non chiude mai. Niente festività, niente manutenzione programmata. Un blocco viene prodotto ogni ~10 minuti, ogni giorno dell'anno, da quando è nata nel 2009.",
  },
  {
    icon: "🔓",
    title: "SENZA PERMESSO",
    text: "Non serve l'approvazione di un istituto per usare la rete. L'accesso è determinato dalla connessione internet, non dalla storia creditizia o dalla cittadinanza.",
  },
  {
    icon: "📊",
    title: "REGOLE PUBBLICHE",
    text: "L'offerta di Bitcoin è definita dal codice sorgente, visibile e verificabile da chiunque. Le regole non cambiano per decisione di un comitato — cambiano solo con consenso distribuito della rete.",
  },
];

const BitcoinVsFiatSection = () => {
  return (
    <section id="fiat" className="min-h-screen flex flex-col justify-center py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="label-section mb-2">CONFRONTO</p>
          <h2 className="text-3xl md:text-5xl font-bold font-heading">Bitcoin e le Monete Tradizionali</h2>
          <p className="text-muted-foreground mt-2">Un confronto tecnico tra due architetture monetarie diverse.</p>
        </motion.div>

        <div className="grid xl:grid-cols-[1.2fr_1fr] gap-10">
          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 text-foreground font-heading font-semibold text-xs">Proprietà</th>
                  <th className="text-left py-3 pr-4 text-primary font-heading font-semibold text-xs">Bitcoin</th>
                  <th className="text-left py-3 text-muted-foreground font-heading font-semibold text-xs">Monete Fiat</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.prop}
                    className={`border-b border-border/50 ${i % 2 === 0 ? "bg-card" : "bg-card-elevated"}`}
                  >
                    <td className="py-2.5 pr-4 text-foreground font-medium text-[13px]">{row.prop}</td>
                    <td className="py-2.5 pr-4 text-primary text-[13px]">{row.btc}</td>
                    <td className="py-2.5 text-muted-foreground text-[13px]">{row.fiat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-surface p-5"
              >
                <span className="text-lg mb-2 block">{card.icon}</span>
                <h3 className="text-xs font-bold text-primary tracking-wider mb-2 font-heading">{card.title}</h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-4 text-center">
          <p className="text-[11px] text-muted-foreground/50">
            Contenuto prodotto a fini informativi e comparativi. Non esprime raccomandazioni sull'utilizzo o sull'acquisto di alcun asset finanziario. Prisman Consulting non fornisce consulenza finanziaria.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BitcoinVsFiatSection;
