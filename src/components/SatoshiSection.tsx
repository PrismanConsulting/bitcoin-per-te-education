import { useState } from "react";
import { motion } from "framer-motion";

const BTC_PRICE = 100000;

const SatoshiSection = () => {
  const [euros, setEuros] = useState("");
  const numEuros = parseFloat(euros) || 0;
  const btcAmount = numEuros / BTC_PRICE;
  const satoshis = Math.floor(btcAmount * 100_000_000);

  return (
    <section id="satoshi" className="min-h-screen flex flex-col justify-center py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="label-section mb-2">UNITÀ DI MISURA</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Il Satoshi</h2>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Come il centesimo è la denominazione base dell'euro, il satoshi è l'unità indivisibile di Bitcoin.
              </p>
              <p>
                1 BTC = 100.000.000 satoshi. Tutte le transazioni sulla rete avvengono in satoshi.
              </p>
            </div>

            <div className="mt-8 border-l-[3px] border-primary pl-5 card-surface p-5">
              <h3 className="text-sm font-semibold text-foreground font-heading mb-2">Lo sapevi?</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Il satoshi prende il nome da Satoshi Nakamoto, lo pseudonimo del creatore — o dei creatori — di Bitcoin. La sua identità rimane sconosciuta dal 2008.
              </p>
            </div>
          </motion.div>

          {/* Right — Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-surface border-primary/20 p-6"
          >
            <h3 className="text-lg font-semibold font-heading mb-1">Calcolatore Didattico</h3>
            <p className="text-[12px] text-muted-foreground mb-6">
              Valore di riferimento fisso: 1 BTC = €100.000 · Solo uso educativo
            </p>

            <label className="block text-sm text-muted-foreground mb-2">Inserisci un importo in €</label>
            <input
              type="number"
              value={euros}
              onChange={(e) => setEuros(e.target.value)}
              placeholder="es. 100"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />

            {numEuros > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 bg-background/50 rounded-lg border border-border"
              >
                <p className="text-foreground text-lg font-heading">
                  Equivalgono a <span className="text-primary font-bold font-mono">{satoshis.toLocaleString("it-IT")}</span> satoshi
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-2">
                  €{numEuros.toLocaleString("it-IT")} ÷ €100.000 × 100.000.000 = {satoshis.toLocaleString("it-IT")} sat
                </p>
              </motion.div>
            )}

            <p className="mt-4 text-[11px] text-muted-foreground/60">
              Strumento didattico con valore di riferimento fisso. Non riflette il prezzo corrente di mercato.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SatoshiSection;
