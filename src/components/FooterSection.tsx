import { Twitter, Linkedin, Send } from "lucide-react";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo */}
          <div>
            <span className="text-xl font-bold">
              <span className="text-primary">₿</span>itcoinPerTe
            </span>
          </div>

          {/* Center */}
          <div className="text-sm text-muted-foreground text-center space-y-1">
            <p>
              Un progetto di Prisman Consulting —{" "}
              <a href="https://prismanconsulting.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                prismanconsulting.it
              </a>
            </p>
            <p>Via Alcione 149 — 66023 Francavilla al Mare (CH)</p>
            <p>info@prismanconsulting.it</p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <Link to="/privacy" className="text-primary hover:underline text-sm">
                Privacy & Cookie Policy
              </Link>
              <span className="text-border">|</span>
              <Link to="/termini" className="text-primary hover:underline text-sm">
                Termini e Condizioni
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex justify-end gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" aria-label="Telegram">
              <Send size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2025 BitcoinPerTe.it — Progetto di pura divulgazione.
          Non consulenza finanziaria. Solo cookie tecnici necessari al funzionamento.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
