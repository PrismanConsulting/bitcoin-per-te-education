import { useState } from "react";
import { Link } from "react-router-dom";
import PrivacyModal from "@/components/PrivacyModal";
import TermsModal from "@/components/TermsModal";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Bitcoin", to: "/bitcoin" },
  { label: "Blockchain", to: "/blockchain" },
  { label: "Mining", to: "/mining" },
  { label: "Satoshi", to: "/satoshi" },
  { label: "Fiat", to: "/fiat" },
  { label: "Terminale", to: "/terminale" },
  { label: "Quiz", to: "/quiz" },
  { label: "Community", to: "/community" },
];

const FooterSection = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-primary py-10 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-bold font-heading text-lg mb-1">
                <span className="text-primary">₿</span> BitcoinPerTe
              </p>
              <p className="text-muted-foreground text-[14px]">Progetto editoriale di Prisman Consulting</p>
              <a href="https://prismanconsulting.it" target="_blank" rel="noopener noreferrer" className="text-primary text-[14px] hover:underline">
                prismanconsulting.it
              </a>
            </div>

            <div className="text-center space-y-3">
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-[14px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex justify-center gap-3">
                <button onClick={() => setPrivacyOpen(true)} className="text-[14px] text-primary hover:underline">
                  Privacy Policy
                </button>
                <span className="text-border">·</span>
                <button onClick={() => setTermsOpen(true)} className="text-[14px] text-primary hover:underline">
                  Termini e Condizioni
                </button>
              </div>
            </div>

            <div className="text-right text-[14px] text-muted-foreground space-y-0.5">
              <p className="font-medium text-foreground">Prisman Consulting di Matteo Terenzio</p>
              <p>Via Alcione 149 · 66023 Francavilla al Mare (CH)</p>
              <p>P.IVA 02840410696</p>
              <p>info@prismanconsulting.it</p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border text-center text-[13px]" style={{ color: "#999999" }}>
            © 2026 BitcoinPerTe.it · Contenuto prodotto a fini divulgativi · Non costituisce consulenza finanziaria ai sensi del D.Lgs. 58/1998 · Solo cookie tecnici · Nessuna parte di questo sito costituisce sollecitazione all'investimento
          </div>
        </div>
      </footer>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
};

export default FooterSection;
