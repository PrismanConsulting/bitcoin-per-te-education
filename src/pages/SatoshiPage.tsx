import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const BTC_PRICE = 100_000;
const SATS_PER_BTC = 100_000_000;

const SatoshiPage = () => {
  const [euros, setEuros] = useState("");

  const result = useMemo(() => {
    const val = parseFloat(euros);
    if (isNaN(val) || val <= 0) return null;
    const sats = Math.round((val / BTC_PRICE) * SATS_PER_BTC);
    return { sats, formula: `€${val.toLocaleString("it-IT")} ÷ €100.000 × 100.000.000 = ${sats.toLocaleString("it-IT")} sat` };
  }, [euros]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16 flex flex-col justify-center"
    >
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid lg:grid-cols-9 gap-12 lg:gap-16 items-start">
          {/* Left - 45% */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <p className="label-section mb-2">UNITÀ DI MISURA</p>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground">Il Satoshi</h1>
            </div>

            <p className="text-base text-muted-foreground leading-[1.7]">
              Come il centesimo è la denominazione base dell'euro, il satoshi è l'unità indivisibile di Bitcoin.
              1 BTC = 100.000.000 satoshi. Tutte le transazioni sulla rete avvengono in satoshi.
            </p>

            <div className="border-l-[3px] border-primary pl-4 py-3 card-surface !border-t-0 !border-r-0 !border-b-0 !rounded-none">
              <p className="text-sm font-heading text-primary mb-1 font-semibold">Lo sapevi?</p>
              <p className="text-base text-muted-foreground leading-[1.7]">
                Il satoshi prende il nome da Satoshi Nakamoto, lo pseudonimo del creatore — o dei creatori — di Bitcoin.
                La sua identità rimane sconosciuta dal 2008.
              </p>
            </div>
          </div>

          {/* Right - 55% */}
          <div className="lg:col-span-5">
            <div className="card-surface p-6 border-primary/20">
              <h3 className="text-xl font-bold font-heading text-foreground mb-1">Calcolatore Didattico</h3>
              <p className="text-[13px] text-muted-foreground mb-5">
                Valore di riferimento fisso: 1 BTC = €100.000 · Solo uso educativo
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Inserisci un importo in €</label>
                  <input
                    type="number"
                    value={euros}
                    onChange={(e) => setEuros(e.target.value)}
                    placeholder="100"
                    className="w-full bg-card-elevated border border-border rounded px-4 py-3 font-mono text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50"
                  />
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="bg-background border border-primary/30 rounded p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Equivalgono a</p>
                      <p className="text-2xl md:text-3xl font-mono font-bold text-primary">
                        {result.sats.toLocaleString("it-IT")} <span className="text-sm text-muted-foreground">sat</span>
                      </p>
                    </div>
                    <p className="text-[13px] font-mono text-muted-foreground text-center">{result.formula}</p>
                  </motion.div>
                )}
              </div>

              <p className="text-[13px] text-muted-foreground/60 mt-5">
                Strumento didattico con valore fisso. Non riflette il prezzo corrente di mercato.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SatoshiPage;
