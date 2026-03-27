import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const LevelBadge = ({ level }: { level: string }) => {
  const styles: Record<string, string> = {
    Principiante: "bg-green-500/15 text-green-400 border-green-500/30",
    Intermedio: "bg-primary/15 text-primary border-primary/30",
    Avanzato: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  };
  return (
    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${styles[level] || ""}`}>
      {level}
    </span>
  );
};

const LangBadge = ({ lang }: { lang: "IT" | "EN" }) => (
  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-border text-muted-foreground">
    {lang === "IT" ? "🇮🇹 IT" : "🇬🇧 EN"}
  </span>
);

interface ResourceCardProps {
  title: string;
  subtitle?: string;
  description: string;
  link?: string;
  level?: string;
  lang?: "IT" | "EN";
  extra?: string;
}

const ResourceCard = ({ title, subtitle, description, link, level, lang, extra }: ResourceCardProps) => (
  <div className="card-surface rounded-xl p-5 flex flex-col gap-2">
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="font-heading font-bold text-foreground text-base">{title}</h3>
      {level && <LevelBadge level={level} />}
      {lang && <LangBadge lang={lang} />}
    </div>
    {subtitle && <p className="text-[12px] text-muted-foreground/60 font-mono">{subtitle}</p>}
    {extra && <p className="text-[11px] text-primary/70 font-mono">{extra}</p>}
    <p className="text-[14px] text-muted-foreground leading-relaxed">{description}</p>
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[13px] text-primary hover:underline mt-1 w-fit"
      >
        Visita <ExternalLink size={12} />
      </a>
    )}
  </div>
);

const SectionHeader = ({ icon, title }: { icon: string; title: string }) => (
  <div className="flex items-center gap-3 mb-4 mt-10 first:mt-0">
    <span className="text-xl">{icon}</span>
    <h2 className="text-xl font-bold font-heading text-foreground">{title}</h2>
    <div className="flex-1 border-t border-border" />
  </div>
);

const RisorsePage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="min-h-screen pt-24 pb-16"
  >
    <SEO
      title="Risorse Bitcoin — Libri, Siti e Newsletter Selezionati | BitcoinPerTe"
      description="La biblioteca curata delle migliori risorse su Bitcoin in italiano e inglese. Libri, siti, newsletter e podcast selezionati da Prisman Consulting."
      path="/risorse"
    />

    <div className="container mx-auto px-4 max-w-4xl">
      {/* Header */}
      <p className="label-section">LA BIBLIOTECA</p>
      <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-3">
        Le migliori risorse su Bitcoin
      </h1>
      <p className="text-muted-foreground text-lg max-w-2xl mb-8 leading-relaxed">
        Selezionate da Prisman Consulting.
        Nessuna affiliazione commerciale — solo qualità.
      </p>

      {/* 📚 Libri */}
      <SectionHeader icon="📚" title="Libri Fondamentali" />
      <div className="grid gap-3">
        <ResourceCard
          title="Il Bitcoin Standard"
          subtitle="Saifedean Ammous · 2018"
          description="Il libro più citato dalla community Bitcoin. Spiega perché Bitcoin è l'evoluzione naturale del denaro sano."
          level="Principiante"
          lang="IT"
          link="https://saifedean.com/the-bitcoin-standard/"
        />
        <ResourceCard
          title="L'Internet del Denaro (vol. 1-3)"
          subtitle="Andreas M. Antonopoulos · 2016-2019"
          description="Raccolta di conferenze che spiegano Bitcoin come fenomeno culturale e tecnologico. Il più accessibile per i neofiti."
          level="Principiante"
          lang="IT"
          link="https://aantonop.com/"
        />
        <ResourceCard
          title="Mastering Bitcoin"
          subtitle="Andreas M. Antonopoulos · 2017"
          description="La guida tecnica definitiva. Open source e gratuita online. Per chi vuole capire davvero come funziona."
          level="Avanzato"
          lang="EN"
          link="https://github.com/bitcoinbook/bitcoinbook"
        />
        <ResourceCard
          title="The Sovereign Individual"
          subtitle="Davidson & Rees-Mogg · 1997"
          description="Scritto 12 anni prima di Bitcoin, prevede quasi esattamente la nascita di una moneta digitale distribuita."
          level="Intermedio"
          lang="EN"
          link="https://www.goodreads.com/book/show/82256"
        />
      </div>

      {/* 🌐 Siti */}
      <SectionHeader icon="🌐" title="Siti Indispensabili" />
      <div className="grid gap-3">
        <ResourceCard
          title="mempool.space"
          description="Il block explorer più usato dalla community. Visualizza blocchi, transazioni e mempool in tempo reale."
          lang="EN"
          link="https://mempool.space"
        />
        <ResourceCard
          title="bitcoinops.org"
          description="Newsletter tecnica settimanale su Bitcoin. Scritta dagli sviluppatori, per gli sviluppatori. La fonte più affidabile sugli aggiornamenti del protocollo."
          lang="EN"
          link="https://bitcoinops.org"
        />
        <ResourceCard
          title="learnmeabitcoin.com"
          description="Il miglior sito tecnico per capire Bitcoin dal basso. Spiegazioni semplici con esempi di codice. Di Greg Walker."
          lang="EN"
          link="https://learnmeabitcoin.com"
        />
        <ResourceCard
          title="lopp.net"
          description="La biblioteca definitiva delle risorse Bitcoin. Jameson Lopp ha curato centinaia di link divisi per categoria."
          lang="EN"
          link="https://lopp.net/bitcoin-information.html"
        />
        <ResourceCard
          title="bitcoin.org"
          description="Il sito originale di Bitcoin. Contiene il whitepaper originale di Satoshi e guide per iniziare."
          lang="EN"
          link="https://bitcoin.org"
        />
        <ResourceCard
          title="bitnodes.io"
          description="Mappa mondiale dei nodi Bitcoin attivi. Mostra la decentralizzazione geografica della rete in tempo reale."
          lang="EN"
          link="https://bitnodes.io"
        />
      </div>

      {/* 📰 Newsletter */}
      <SectionHeader icon="📰" title="Newsletter" />
      <div className="grid gap-3">
        <ResourceCard
          title="Bitcoin Optech"
          extra="Settimanale · Gratuita"
          description="La newsletter tecnica più rispettata nel mondo Bitcoin. Aggiornamenti sul protocollo, ricerca e sviluppo."
          lang="EN"
          link="https://bitcoinops.org/en/newsletters/"
        />
        <ResourceCard
          title="Bitcoin Magazine"
          extra="Vari formati · Gratuita"
          description="La più storica pubblicazione su Bitcoin. News, analisi e cultura Bitcoin."
          lang="EN"
          link="https://bitcoinmagazine.com"
        />
        <ResourceCard
          title="The Bitcoin Layer"
          extra="Settimanale · Free + paid"
          description="Analisi macroeconomica e monetaria con focus su Bitcoin come riserva di valore."
          lang="EN"
          link="https://www.thebitcoinlayer.com"
        />
      </div>

      {/* 🎙️ Podcast */}
      <SectionHeader icon="🎙️" title="Podcast in Italiano" />
      <div className="grid gap-3">
        <ResourceCard
          title="Bitcoin per tutti"
          description="Uno dei pochi podcast italiani dedicati esclusivamente a Bitcoin. Divulgativo e accessibile."
          lang="IT"
        />
        <ResourceCard
          title="Diventare Bitcoiner"
          description="Percorso educativo in formato audio per chi parte da zero."
          lang="IT"
        />
        <div className="card-surface rounded-xl p-5 border-l-4 border-primary">
          <p className="text-[14px] text-muted-foreground">
            Conosci un buon podcast italiano su Bitcoin?{" "}
            <Link to="/community" className="text-primary hover:underline">Scrivici →</Link>
          </p>
        </div>
      </div>

      {/* 📺 YouTube */}
      <SectionHeader icon="📺" title="YouTube / Video" />
      <div className="grid gap-3">
        <ResourceCard
          title="Andreas Antonopoulos"
          description="Il divulgatore Bitcoin più famoso al mondo. Centinaia di conferenze gratuite su YouTube."
          lang="EN"
          link="https://www.youtube.com/@aantonop"
        />
        <ResourceCard
          title="Bitcoin Magazine"
          description="Documentari, conferenze e interviste dalla più storica pubblicazione Bitcoin."
          lang="EN"
          link="https://www.youtube.com/@BitcoinMagazine"
        />
        <ResourceCard
          title="BTC Sessions"
          description="Tutorial pratici su come usare Bitcoin in modo sicuro. Molto consigliato ai principianti."
          lang="EN"
          link="https://www.youtube.com/@BTCSessions"
        />
        <div className="card-surface rounded-xl p-5 border-l-4 border-primary">
          <p className="text-[14px] text-muted-foreground">
            Conosci un buon canale YouTube italiano su Bitcoin?{" "}
            <Link to="/community" className="text-primary hover:underline">Scrivici →</Link>
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-l-[3px] border-primary bg-card rounded-r px-5 py-4 mt-12 max-w-2xl">
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          Queste risorse sono selezionate per qualità editoriale. Prisman Consulting non ha
          affiliazioni commerciali con nessuno degli autori o siti citati.
          Nessun link è a pagamento.
        </p>
        <p className="text-[13px] text-muted-foreground/60 mt-2">
          Segnala risorse mancanti:{" "}
          <a href="mailto:info@prismanconsulting.it" className="text-primary hover:underline">
            info@prismanconsulting.it
          </a>
        </p>
      </div>
    </div>
  </motion.div>
);

export default RisorsePage;
