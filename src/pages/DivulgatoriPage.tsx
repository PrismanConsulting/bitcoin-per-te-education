import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const YTIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M4 4L10.5 12.5L4 20H6L11.5 13.5L16 20H20L13.5 11.5L20 4H18L12.5 10.5L8 4H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const WebIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 15L15 9M15 9H10.5M15 9V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PodIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 13V20M8 20H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 7A7 7 0 0117 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

interface SocialLink {
  type: "youtube" | "x" | "sito" | "podcast";
  url: string;
}

interface Divulgatore {
  name: string;
  initials: string;
  desc: string;
  tags: string[];
  lang: "IT" | "EN";
  quote?: string;
  links: SocialLink[];
}

const iconMap = {
  youtube: <YTIcon />,
  x: <XIcon />,
  sito: <WebIcon />,
  podcast: <PodIcon />,
};

const internazionali: Divulgatore[] = [
  {
    name: "Andreas M. Antonopoulos",
    initials: "AA",
    desc: "Il più grande divulgatore Bitcoin della storia. Spiega tecnologia e filosofia con chiarezza unica. Autore di Mastering Bitcoin.",
    tags: ["Tecnico", "Filosofia", "Principianti"],
    lang: "EN",
    quote: "Bitcoin is not just money for the internet. It is the internet of money.",
    links: [
      { type: "youtube", url: "https://youtube.com/@aantonop" },
      { type: "sito", url: "https://aantonop.com" },
    ],
  },
  {
    name: "Jameson Lopp",
    initials: "JL",
    desc: "Ingegnere e ricercatore Bitcoin. Cypherpunk. Cura la più completa biblioteca di risorse Bitcoin online.",
    tags: ["Tecnico", "Sicurezza", "Privacy"],
    lang: "EN",
    links: [
      { type: "sito", url: "https://lopp.net" },
      { type: "x", url: "https://x.com/lopp" },
    ],
  },
  {
    name: "Greg Walker",
    initials: "GW",
    desc: "Ha creato la spiegazione tecnica di Bitcoin più chiara che esista. Un lavoro di anni, completamente gratuito.",
    tags: ["Tecnico", "Sviluppatori"],
    lang: "EN",
    quote: "The best way to learn Bitcoin is to build something with it.",
    links: [{ type: "sito", url: "https://learnmeabitcoin.com" }],
  },
  {
    name: "Saifedean Ammous",
    initials: "SA",
    desc: "Economista austriaco, autore di Il Bitcoin Standard. Ha cambiato il modo in cui molti pensano al denaro.",
    tags: ["Economia", "Filosofia"],
    lang: "EN",
    links: [{ type: "sito", url: "https://saifedean.com" }],
  },
  {
    name: "Lyn Alden",
    initials: "LA",
    desc: "Una delle analiste macroeconomiche più rispettate. Spiega Bitcoin nel contesto del sistema monetario globale.",
    tags: ["Economia", "Macroeconomia"],
    lang: "EN",
    links: [{ type: "sito", url: "https://www.lynalden.com" }],
  },
];

const DivulgatoreCard = ({ d }: { d: Divulgatore }) => (
  <div className="card-surface rounded-xl p-5 flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
        <span className="font-mono text-sm font-bold text-primary">{d.initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-heading font-bold text-foreground text-base">{d.name}</h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-border text-muted-foreground">
            {d.lang === "IT" ? "🇮🇹 IT" : "🇬🇧 EN"}
          </span>
        </div>
      </div>
    </div>

    <p className="text-[14px] text-muted-foreground leading-relaxed">{d.desc}</p>

    {d.quote && (
      <blockquote className="border-l-2 border-primary/40 pl-3 text-[13px] text-muted-foreground/70 italic">
        "{d.quote}"
      </blockquote>
    )}

    <div className="flex items-center justify-between gap-3 mt-auto pt-1">
      <div className="flex flex-wrap gap-1.5">
        {d.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-card border border-border text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {d.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={link.type}
          >
            {iconMap[link.type]}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const DivulgatoriPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="min-h-screen pt-24 pb-16"
  >
    <SEO
      title="I Migliori Divulgatori Bitcoin — Chi Vale la Pena Seguire | BitcoinPerTe"
      description="La selezione curata dei migliori divulgatori Bitcoin al mondo. Andreas Antonopoulos, Jameson Lopp, Saifedean Ammous e altri. In italiano e inglese."
      path="/divulgatori"
    />

    <div className="container mx-auto px-4 max-w-4xl">
      <p className="label-section">VOCI CHE VALE LA PENA ASCOLTARE</p>
      <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-3">
        I divulgatori Bitcoin
      </h1>
      <p className="text-muted-foreground text-lg max-w-2xl mb-10 leading-relaxed">
        Non tutti spiegano Bitcoin bene. Questi sì.
        Selezione editoriale indipendente — nessuna affiliazione.
      </p>

      {/* Internazionali */}
      <div className="flex items-center gap-3 mb-5">
        <p className="text-[11px] tracking-widest text-muted-foreground font-heading">INTERNAZIONALI</p>
        <div className="flex-1 border-t border-border" />
      </div>
      <div className="grid md:grid-cols-2 gap-3 mb-12">
        {internazionali.map((d) => (
          <DivulgatoreCard key={d.name} d={d} />
        ))}
      </div>

      {/* Italiani */}
      <div className="flex items-center gap-3 mb-5">
        <p className="text-[11px] tracking-widest text-muted-foreground font-heading">IN ITALIANO 🇮🇹</p>
        <div className="flex-1 border-t border-border" />
      </div>
      <div className="grid md:grid-cols-2 gap-3 mb-12">
        <div className="card-surface rounded-xl p-5 border-l-4 border-primary flex flex-col justify-center gap-2">
          <p className="font-heading font-bold text-foreground">Conosci un buon divulgatore italiano?</p>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            Stiamo costruendo questa sezione. Segnalaci chi meriterebbe di essere qui.
          </p>
          <Link to="/community" className="text-[13px] text-primary hover:underline mt-1 w-fit">
            Segnala →
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-l-[3px] border-primary bg-card rounded-r px-5 py-4 max-w-2xl">
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          Questa selezione riflette il giudizio editoriale di Prisman Consulting basato su qualità, accuratezza e approccio non speculativo.
          Non siamo affiliati con nessuno dei soggetti citati. Nessuna presenza qui è a pagamento.
        </p>
      </div>
    </div>
  </motion.div>
);

export default DivulgatoriPage;
