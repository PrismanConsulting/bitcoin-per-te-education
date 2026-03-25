import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PrivacyModal from "@/components/PrivacyModal";
import TermsModal from "@/components/TermsModal";
import SEO from "@/components/SEO";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/TUO_ID_REALE";

const CommunityPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/prisman-consulting" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16 flex flex-col justify-center"
    >
      <SEO
        title="Community BitcoinPerTe — Progetto Editoriale Indipendente"
        description="BitcoinPerTe è un progetto di Prisman Consulting per la divulgazione di Bitcoin in Italia. Contattaci per collaborazioni e scambio di idee."
        path="/community"
      />
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

            <p className="text-base text-muted-foreground leading-[1.7]">
              BitcoinPerTe nasce dall'entusiasmo di Prisman Consulting per la tecnologia Bitcoin.
              Non un servizio finanziario, non una piattaforma di trading. Un luogo dove approfondire,
              confrontarsi e costruire una community di persone che vogliono capire davvero.
            </p>

            <div className="border-t border-border pt-4 space-y-1">
              <p className="text-[14px] text-muted-foreground">
                Prisman Consulting · Francavilla al Mare, Abruzzo
              </p>
              <a href="https://prismanconsulting.it" target="_blank" rel="noopener noreferrer" className="text-[14px] text-primary hover:underline inline-flex items-center gap-1">
                prismanconsulting.it <ExternalLink size={10} />
              </a>
              <p className="text-[14px] text-muted-foreground">info@prismanconsulting.it</p>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-muted-foreground border border-border rounded px-2.5 py-1 hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="card-surface p-6">
            <h3 className="text-xl font-bold font-heading text-foreground mb-1">Scrivici</h3>
            <p className="text-base text-muted-foreground mb-5">
              Per approfondimenti, collaborazioni editoriali o scambio di idee su Bitcoin e tecnologia distribuita.
            </p>

            {status === "ok" ? (
              <div className="card-surface p-6 text-center space-y-2">
                <p className="text-lg font-heading font-semibold text-primary">✅ Messaggio ricevuto!</p>
                <p className="text-base text-muted-foreground">Ti risponderemo presto.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Nome</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-card-elevated border border-border rounded px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-card-elevated border border-border rounded px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Messaggio</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                    className="w-full bg-card-elevated border border-border rounded px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-base font-medium hover:bg-primary/90 transition-colors font-heading disabled:opacity-60"
                >
                  {status === "sending" ? "Invio in corso..." : "Invia"}
                </button>
                {status === "error" && (
                  <p className="text-sm" style={{ color: "#EF4444" }}>
                    ❌ Errore nell'invio. Riprova o scrivi a info@prismanconsulting.it
                  </p>
                )}
              </form>
            )}

            <p className="text-[14px] text-muted-foreground mt-4">
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
