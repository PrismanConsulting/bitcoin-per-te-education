import { useState } from "react";
import PrivacyModal from "@/components/PrivacyModal";
import TermsModal from "@/components/TermsModal";

const navItems = ["Home", "Bitcoin", "Blockchain", "Mining", "Satoshi", "Fiat", "Quiz", "Community"];
const navHrefs = ["#home", "#cose-bitcoin", "#blockchain", "#mining", "#satoshi", "#fiat", "#quiz", "#community"];

const FooterSection = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const handleNav = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
  };

  return (
    <>
      <footer className="border-t border-primary py-10 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            {/* Left */}
            <div>
              <p className="font-bold font-heading text-lg mb-1">
                <span className="text-primary">₿</span> BitcoinPerTe
              </p>
              <p className="text-muted-foreground text-[13px]">Progetto editoriale di Prisman Consulting</p>
              <a href="https://prismanconsulting.it" target="_blank" rel="noopener noreferrer" className="text-primary text-[13px] hover:underline">
                prismanconsulting.it
              </a>
            </div>

            {/* Center */}
            <div className="text-center space-y-3">
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                {navItems.map((item, i) => (
                  <button
                    key={item}
                    onClick={() => handleNav(navHrefs[i])}
                    className="text-[12px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-3">
                <button
                  id="privacy-modal-trigger"
                  onClick={() => setPrivacyOpen(true)}
                  className="text-[12px] text-primary hover:underline"
                >
                  Privacy Policy
                </button>
                <span className="text-border">·</span>
                <button
                  id="terms-modal-trigger"
                  onClick={() => setTermsOpen(true)}
                  className="text-[12px] text-primary hover:underline"
                >
                  Termini e Condizioni
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="text-right text-[12px] text-muted-foreground space-y-0.5">
              <p className="font-medium text-foreground">Prisman Consulting di Matteo Terenzio</p>
              <p>Via Alcione 149 · 66023 Francavilla al Mare (CH)</p>
              <p>P.IVA 02840410696</p>
              <p>info@prismanconsulting.it</p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border text-center text-[10px] text-muted-foreground/40">
            © 2026 BitcoinPerTe.it · Contenuto prodotto a fini divulgativi · Non costituisce consulenza finanziaria ai sensi del D.Lgs. 58/1998 · Solo cookie tecnici necessari al funzionamento
          </div>
        </div>
      </footer>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
};

export default FooterSection;
