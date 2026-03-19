import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PrivacyModal from "@/components/PrivacyModal";
import TermsModal from "@/components/TermsModal";

const CommunityPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16 flex flex-col justify-center"
    >
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Project */}
          <div className="space-y-6">
            <div>
              <p className="label-section mb-2">IL PROGETTO</p>
              <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
                Un progetto editoriale indipendente
              </h1>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              BitcoinPerTe nasce dall'entusiasmo di Prisman Consulting per la tecnologia Bitcoin.
              Non un servizio finanziario, non una piattaforma di trading. Un luogo dove approfondire,
              confrontarsi e costruire una community di persone che vogliono capire davvero.
            </p>

            <div className="border-t border-border pt-4 space-y-1">
              <p className="text-[11px] text-muted-foreground">
                Prisman Consulting · Francavilla al Mare, Abruzzo
              </p>
              <a href="https://prismanconsulting.it" target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary hover:underline inline-flex items-center gap-1">
                prismanconsulting.it <ExternalLink size={10} />
              </a>
              <p className="text-[11px] text-muted-foreground">info@prismanconsulting.it</p>
            </div>

            <div className="flex gap-4">
              {["X / Twitter", "Telegram", "LinkedIn"].map((s) => (
                <span key={s} className="text-[11px] text-muted-foreground/50 border border-border rounded px-2.5 py-1">{s}</span>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold font-heading text-foreground mb-1">Scrivici</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Per approfondimenti, collaborazioni editoriali o scambio di idee su Bitcoin e tecnologia distribuita.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-card-elevated border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-card-elevated border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Messaggio</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-card-elevated border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors font-heading"
              >
                Invia
              </button>
            </form>

            <p className="text-[11px] text-muted-foreground/50 mt-4">
              Dati usati solo per rispondere alla tua richiesta ·{" "}
              <button onClick={() => setPrivacyOpen(true)} className="text-primary hover:underline">Privacy Policy</button>{" · "}
              <button onClick={() => setTermsOpen(true)} className="text-primary hover:underline">Termini d'uso</button>
            </p>
          </div>
        </div>
      </div>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </motion.div>
  );
};

export default CommunityPage;