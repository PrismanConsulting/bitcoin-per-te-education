import { motion } from "framer-motion";

const properties = [
  { emoji: "⚡", title: "Distribuito", desc: "Nessun centro di controllo o autorità centrale" },
  { emoji: "💎", title: "Scarso", desc: "Solo 21 milioni di BTC esisteranno mai" },
  { emoji: "✂️", title: "Divisibile", desc: "Frazionabile fino al satoshi per micro-transazioni" },
  { emoji: "🔍", title: "Trasparente", desc: "Registro pubblico verificabile da chiunque" },
  { emoji: "🛡️", title: "Sicuro", desc: "Protetto da hash crittografici e rete globale distribuita" },
  { emoji: "⛏️", title: "Immutabile", desc: "Le transazioni scritte non possono essere alterate" },
  { emoji: "📅", title: "Programmato", desc: "Regole certe e prevedibili come il halving" },
  { emoji: "🌍", title: "Accessibile", desc: "Disponibile per chiunque, ovunque nel mondo" },
];

const PropertiesSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Le Proprietà Fondamentali di <span className="text-primary">Bitcoin</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {properties.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-bitcoin hover:glow-bitcoin transition-shadow duration-300 text-center"
            >
              <div className="text-3xl mb-3">{p.emoji}</div>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
