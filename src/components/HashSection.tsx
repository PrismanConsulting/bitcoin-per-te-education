import { useState } from "react";
import { motion } from "framer-motion";

function simpleHash(str: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  // Generate 64-char hex string from seed
  let result = "";
  let seed = hash;
  for (let i = 0; i < 64; i++) {
    seed = Math.imul(seed, 1664525) + 1013904223;
    result += ((seed >>> 24) & 0xf).toString(16);
  }
  return result;
}

const HashSection = () => {
  const [input, setInput] = useState("");

  const hashValue = input ? simpleHash(input) : "0".repeat(64);

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-6"
        >
          L'<span className="text-primary">Hash</span>: La Firma Matematica di Bitcoin
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-bitcoin mt-12"
        >
          <label className="block text-sm text-muted-foreground mb-2">
            Scrivi qualcosa qui sotto:
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Prova a scrivere qualcosa..."
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />

          <div className="mt-4">
            <span className="text-xs text-muted-foreground">Hash generato:</span>
            <div className="mt-1 font-mono text-xs md:text-sm text-primary break-all bg-background/50 rounded-lg p-3 border border-border">
              {hashValue}
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-6 max-w-lg mx-auto"
        >
          Cambia anche solo una lettera: l'hash cambia completamente. Questo è ciò che rende Bitcoin praticamente inviolabile.
        </motion.p>
      </div>
    </section>
  );
};

export default HashSection;
