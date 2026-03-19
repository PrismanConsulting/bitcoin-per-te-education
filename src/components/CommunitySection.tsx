import { motion } from "framer-motion";
import { useState } from "react";
import { Twitter, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommunitySection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:info@prismanconsulting.it?subject=Contatto da BitcoinPerTe - ${form.name}&body=${encodeURIComponent(form.message)}%0A%0ADa: ${form.name} (${form.email})`;
  };

  return (
    <section id="community" className="min-h-screen flex flex-col justify-center py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="label-section mb-2">IL PROGETTO</p>
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6">
              BitcoinPerTe è un progetto editoriale indipendente
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Nato dall'entusiasmo di Prisman Consulting per la tecnologia Bitcoin. Non un servizio finanziario, non una piattaforma di trading. Un luogo dove approfondire, confrontarsi e costruire una community di persone che vogliono capire davvero questa tecnologia.
            </p>

            <div className="border-t border-border pt-4 mb-6">
              <p className="text-[13px] text-muted-foreground">
                Prisman Consulting · Francavilla al Mare, Abruzzo
              </p>
              <p className="text-[13px] text-muted-foreground">
                <a href="https://prismanconsulting.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">prismanconsulting.it</a> · info@prismanconsulting.it
              </p>
            </div>

            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors" aria-label="X/Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors" aria-label="Telegram">
                <Send size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold font-heading mb-1">Scrivici</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Per approfondimenti, collaborazioni editoriali o scambio di idee su Bitcoin e tecnologia distribuita.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nome"
                required
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                required
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Messaggio"
                rows={4}
                required
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
              />
              <Button type="submit" className="w-full font-heading">
                Invia
              </Button>
            </form>

            <p className="mt-4 text-[11px] text-muted-foreground/50">
              Dati usati solo per rispondere alla tua richiesta · <button className="text-primary hover:underline" onClick={() => document.getElementById("privacy-modal-trigger")?.click()}>Privacy Policy</button> · <button className="text-primary hover:underline" onClick={() => document.getElementById("terms-modal-trigger")?.click()}>Termini d'uso</button>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
