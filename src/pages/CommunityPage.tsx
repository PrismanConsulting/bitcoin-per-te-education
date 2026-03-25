import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PrivacyModal from "@/components/PrivacyModal";
import TermsModal from "@/components/TermsModal";
import SEO from "@/components/SEO";

const CommunityPage = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/matteoterenzio/" },
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
              <p className="text-[14px] text-muted-foreground">
                <a href="tel:+393382529370" className="hover:text-primary transition-colors">+39 338 25 29 370</a>
              </p>
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

          {/* Right - Contact buttons */}
          <div className="card-surface p-6">
            <h3 className="text-xl font-bold font-heading text-foreground mb-1">Scrivici</h3>
            <p className="text-base text-muted-foreground mb-5">
              Scegli il canale che preferisci. Rispondiamo sempre.
            </p>

            <div className="space-y-3">
              <a
                href="https://wa.me/39INSERISCI_NUMERO?text=Ciao%2C+ti+scrivo+da+bitcoinperte.it"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 card-surface rounded-xl hover:border-primary/30 transition-colors w-full text-left"
              >
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
                  <path d="M6 26l1.5-5.5A11 11 0 1122 25l-5.5 1.5L6 26z" stroke="#F7931A" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">Scrivici su WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Messaggio diretto · Solo divulgazione</p>
                </div>
              </a>

              <a
                href="mailto:info@prismanconsulting.it?subject=Contatto da bitcoinperte.it"
                className="flex items-center gap-4 p-4 card-surface rounded-xl hover:border-primary/30 transition-colors w-full text-left"
              >
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
                  <rect x="4" y="8" width="24" height="16" rx="2" stroke="#F7931A" strokeWidth="1.5" />
                  <path d="M4 10l12 8 12-8" stroke="#F7931A" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">Scrivici via Email</p>
                  <p className="text-xs text-muted-foreground">info@prismanconsulting.it</p>
                </div>
              </a>
            </div>

            <p className="text-[14px] text-muted-foreground mt-4">
              Dati usati solo per rispondere ·{" "}
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
