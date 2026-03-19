import { useState } from "react";
import { motion } from "framer-motion";

const BTC_PRICE = 100000;

const SatoshiSection = () => {
  const [euros, setEuros] = useState("");

  const numEuros = parseFloat(euros) || 0;
  const btcAmount = numEuros / BTC_PRICE;
  const satoshis = Math.floor(btcAmount * 100_000_000);

  return (
    <section id="satoshi" className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-6"
        >
          I <span className="text-primary">Satoshi</span>: L'Unità Reale di Bitcoin
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-bitcoin mt-12"
        >
          <label className="block text-sm text-muted-foreground mb-2">
            Inserisci un importo in euro:
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={euros}
              onChange={(e) => setEuros(e.target.value)}
              placeholder="es. 100"
              className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <span className="text-muted-foreground">€</span>
          </div>

          {numEuros > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-background/50 rounded-lg border border-border"
            >
              <p className="text-foreground">
                Con <span className="text-primary font-bold">{numEuros.toLocaleString("it-IT")}€</span> compreresti{" "}
                <span className="text-primary font-bold">{satoshis.toLocaleString("it-IT")} satoshi</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                (se 1 BTC valesse {BTC_PRICE.toLocaleString("it-IT")}€)
              </p>
            </motion.div>
          )}

          <div className="mt-4 text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2 border border-border">
            ⚠️ Questo convertitore usa un valore fisso ed è puramente educativo.
            Non riflette il prezzo di mercato reale. Non è un consiglio di acquisto.
          </div>
        </motion.div>

        {/* Lo sapevi? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-primary/10 border border-primary/20 rounded-xl p-6"
        >
          <h3 className="text-primary font-semibold mb-2">💡 Lo sapevi?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Il satoshi prende il nome da Satoshi Nakamoto, lo pseudonimo del creatore
            (o creatori) di Bitcoin, la cui identità è tuttora sconosciuta.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SatoshiSection;
