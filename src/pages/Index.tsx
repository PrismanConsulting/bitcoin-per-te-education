import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { useLiveStats, useFlash } from "@/hooks/useLiveStats";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tickerWords = [
  "nessun padrone",
  "21 milioni · mai uno di più",
  "dal 2009 senza mai fermarsi",
  "ogni 10 minuti un blocco",
  "nessuno può bloccartelo",
  "matematica pura",
  "verificabile da chiunque",
  "inflazione zero programmata",
  "nessuna banca centrale",
  "codice aperto · per sempre",
];

const AnimatedNumber = () => {
  const target = "21.000.000";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`font-mono text-5xl md:text-7xl font-bold text-primary ${done ? "animate-breathe" : ""}`}>
      {displayed}
      {!done && <span className="animate-pulse">|</span>}
    </span>
  );
};

const LiveWidget = () => {
  const { priceEur, blockHeight, halfHourFee } = useLiveStats();
  const flashPrice = useFlash(priceEur);
  const flashBlock = useFlash(blockHeight);
  const flashFee = useFlash(halfHourFee);

  const items = [
    { label: "BTC/EUR", value: priceEur ? `€${priceEur.toLocaleString("it-IT")}` : null, flash: flashPrice },
    { label: "Blocco", value: blockHeight ? blockHeight.toLocaleString("it-IT") : null, flash: flashBlock },
    { label: "Fee ~30m", value: halfHourFee ? `${halfHourFee} sat/vB` : null, flash: flashFee },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground font-heading">Live dalla Rete</p>
        <span className="flex items-center gap-1 text-[12px] text-green-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          live
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div key={item.label} className="card-surface p-2.5 text-center">
            <p className="text-[11px] text-muted-foreground mb-1">{item.label}</p>
            {item.value ? (
              <p className={`font-mono text-sm font-bold text-foreground transition-colors duration-500 ${item.flash ? "!text-primary" : ""}`}>
                {item.value}
              </p>
            ) : (
              <Skeleton className="h-5 w-full mx-auto" />
            )}
          </div>
        ))}
      </div>
      <Link to="/terminale" className="text-[13px] text-primary hover:underline block text-right">
        → Terminale completo
      </Link>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [networkActive, setNetworkActive] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("https://mempool.space/api/blocks/tip/height")
      .then((r) => r.ok ? setNetworkActive(true) : setNetworkActive(false))
      .catch(() => setNetworkActive(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16 flex flex-col relative"
    >
      <SEO
        title="BitcoinPerTe.it — Divulgazione Bitcoin in Italiano"
        description="Il punto di riferimento italiano per capire Bitcoin: blockchain, halving, satoshi, dati live dalla rete. Divulgazione indipendente, nessuna consulenza finanziaria."
        path="/"
        keywords="bitcoin italiano, cos'è bitcoin, blockchain spiegazione, satoshi, halving bitcoin, divulgazione bitcoin"
      />
      {/* Graph paper background with orange nodes */}
      <div className="absolute inset-0 graph-paper-bg opacity-30" />
      <div className="absolute top-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-40 right-20 w-64 h-64 bg-primary/4 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary/3 rounded-full blur-[60px]" />
      <div className="absolute top-32 right-1/4 w-40 h-40 bg-primary/4 rounded-full blur-[90px]" />

      {/* Main content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left column - 60% */}
            <div className="lg:col-span-3 space-y-6">
              <p className="label-section">PROGETTO EDITORIALE INDIPENDENTE</p>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-[1.1] text-foreground">
                Una moneta che nessuno{" "}
                <span className="text-primary">può fermare.</span>
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
                Non serve sapere nulla di tecnologia.<br />
                Serve solo capire perché esiste.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/bitcoin"
                  className="border border-primary/30 text-primary px-5 py-2.5 rounded-md text-base font-medium hover:bg-primary/10 transition-colors font-heading"
                >
                  Inizia da qui →
                </Link>
                <Link
                  to="/live"
                  className="border border-border text-muted-foreground px-5 py-2.5 rounded-md text-base font-medium hover:text-foreground hover:border-muted-foreground transition-colors font-heading"
                >
                  Senti la rete live →
                </Link>
              </div>

              <div className="border-l-[3px] border-primary bg-card rounded-r px-4 py-2.5 max-w-xl">
                <p className="text-[14px] leading-relaxed" style={{ color: '#CCCCCC', fontWeight: 400 }}>
                  Questo sito è un progetto di pura divulgazione. I contenuti non costituiscono consulenza finanziaria né sollecitazione all'investimento ai sensi del D.Lgs. 58/1998.
                </p>
              </div>

              <p className="text-muted-foreground text-[14px]" style={{ color: '#BBBBBB' }}>
                Prisman Consulting · Francavilla al Mare, Abruzzo · Solo cookie tecnici
              </p>
            </div>

            {/* Right column - 40% */}
            <div className="lg:col-span-2 space-y-6">
              <div className="text-center lg:text-right">
                <AnimatedNumber />
                <p className="text-muted-foreground text-base mt-2">BTC — offerta massima programmata</p>
                <p className="font-mono text-[11px] text-primary/40 mt-1">
                  +6.25 BTC ogni ~10 minuti · ancora per ~100 anni
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "∞ anni", label: "rete attiva" },
                  { value: "~10 min", label: "nuovo blocco" },
                  { value: "4 anni", label: "halving" },
                ].map((stat) => (
                  <div key={stat.label} className="border-t-2 border-primary/40 pt-3 text-center">
                    <p className="font-mono text-base font-bold text-foreground">{stat.value}</p>
                    <p className="text-[14px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Live dalla Rete widget */}
              <LiveWidget />

              <div className="flex items-center justify-center lg:justify-end gap-2">
                <span className={`w-2 h-2 rounded-full ${networkActive === true ? "bg-green-500 animate-pulse" : networkActive === false ? "bg-muted-foreground" : "bg-muted"}`} />
                <span className="text-[14px] text-muted-foreground">
                  {networkActive === true ? "Rete Bitcoin attiva" : networkActive === false ? "Stato rete non disponibile" : "Verifica rete..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 card di ingresso */}
      <section className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 relative z-10">
        <Link to="/bitcoin" className="card-surface p-4 rounded-xl hover:border-primary/20 transition-colors cursor-pointer flex flex-col gap-3">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="2.5" fill="#F7931A"/>
            <circle cx="16" cy="16" r="7" stroke="#F7931A" strokeWidth="0.8" opacity="0.5"/>
            <circle cx="16" cy="16" r="12" stroke="#F7931A" strokeWidth="0.5" opacity="0.2"/>
          </svg>
          <p className="text-[11px] tracking-widest text-muted-foreground">PARTI DA ZERO</p>
          <p className="font-heading font-bold text-foreground">Non so nulla di Bitcoin</p>
          <p className="text-[14px] text-muted-foreground">Spiegazione senza tecnicismi in 3 minuti</p>
        </Link>

        <Link to="/fiat" className="card-surface p-4 rounded-xl hover:border-primary/20 transition-colors cursor-pointer flex flex-col gap-3">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="13" width="10" height="6" rx="1.5" stroke="#F7931A" strokeWidth="1"/>
            <rect x="20" y="13" width="10" height="6" rx="1.5" stroke="#F7931A" strokeWidth="1" opacity="0.35"/>
            <line x1="12" y1="16" x2="20" y2="16" stroke="#F7931A" strokeWidth="1" strokeDasharray="2 2" opacity="0.3"/>
          </svg>
          <p className="text-[11px] tracking-widest text-muted-foreground">SO QUALCOSA</p>
          <p className="font-heading font-bold text-foreground">Ho sentito ma non capisco</p>
          <p className="text-[14px] text-muted-foreground">Le domande che tutti fanno, finalmente risposta</p>
        </Link>

        <Link to="/terminale" className="card-surface p-4 rounded-xl hover:border-primary/20 transition-colors cursor-pointer flex flex-col gap-3">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="22" width="24" height="5" rx="1" fill="#F7931A"/>
            <rect x="4" y="15" width="24" height="5" rx="1" fill="#F7931A" opacity="0.5"/>
            <rect x="4" y="8" width="24" height="5" rx="1" fill="#F7931A" opacity="0.2"/>
            <line x1="16" y1="22" x2="16" y2="20" stroke="#F7931A" strokeWidth="0.8" opacity="0.4"/>
            <line x1="16" y1="15" x2="16" y2="13" stroke="#F7931A" strokeWidth="0.8" opacity="0.4"/>
          </svg>
          <p className="text-[11px] tracking-widest text-muted-foreground">VOGLIO I DATI</p>
          <p className="font-heading font-bold text-foreground">Sono già convinto</p>
          <p className="text-[14px] text-muted-foreground">Terminale, mappa nodi, parametri vitali</p>
        </Link>
      </section>

      {/* Teaser /live */}
      <section className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 relative z-10">
        <Link
          to="/live"
          className="card-surface p-4 rounded-xl border-l-2 border-l-primary hover:border-primary/30 transition-colors cursor-pointer"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="mb-2">
            <line x1="2" y1="16" x2="5" y2="16" stroke="#F7931A" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="7" y1="11" x2="7" y2="21" stroke="#F7931A" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="11" y1="8" x2="11" y2="24" stroke="#F7931A" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="15" y1="13" x2="15" y2="19" stroke="#F7931A" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="19" y1="10" x2="19" y2="22" stroke="#F7931A" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
            <line x1="23" y1="14" x2="23" y2="18" stroke="#F7931A" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
            <line x1="27" y1="16" x2="30" y2="16" stroke="#F7931A" strokeWidth="1.2" strokeLinecap="round" opacity="0.2"/>
          </svg>
          <p className="font-heading font-bold text-foreground">La Sinfonia della Rete</p>
          <p className="text-[14px] text-muted-foreground mt-1">Ogni transazione Bitcoin è una nota. La musica che il mondo compone senza saperlo.</p>
          <p className="text-[13px] text-primary mt-2">Ascolta live →</p>
        </Link>

        <Link
          to="/live"
          className="card-surface p-4 rounded-xl border-l-2 border-l-primary hover:border-primary/30 transition-colors cursor-pointer"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="mb-2">
            <polyline
              points="2,16 7,16 9,10 11,22 13,7 15,16 17,16 19,13 21,16 30,16"
              stroke="#F7931A" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"
              fill="none"/>
          </svg>
          <p className="font-heading font-bold text-foreground">Bitcoin Vivo</p>
          <p className="text-[14px] text-muted-foreground mt-1">Battito cardiaco, pressione, temperatura. La rete come organismo biologico.</p>
          <p className="text-[13px] text-primary mt-2">Guarda battere →</p>
        </Link>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 max-w-3xl py-12 relative z-10">
        <p className="label-section">DOMANDE FREQUENTI</p>
        <h2 className="text-2xl font-bold font-heading text-foreground mb-6">
          Le domande che tutti fanno.
        </h2>
        <Accordion type="single" collapsible className="space-y-0">
          {[
            {
              q: "Bitcoin è illegale in Italia?",
              a: "No. Bitcoin è legale in Italia e nell'Unione Europea. Dal 2023 è regolamentato dal MiCA (Markets in Crypto-Assets Regulation). Usarlo, detenerlo e scambiarlo è perfettamente legale. Come ogni asset, le plusvalenze vanno dichiarate al fisco.",
            },
            {
              q: "Si può perdere tutto?",
              a: "La rete Bitcoin non può fallire — è distribuita su ~20.000 computer. Quello che può succedere è perdere l'accesso ai propri Bitcoin se si perdono le chiavi private. È come perdere il contante: la colpa non è della moneta, ma di chi non l'ha custodita bene.",
            },
            {
              q: "Chi controlla Bitcoin?",
              a: "Nessuno e tutti. Il protocollo è controllato dal codice, che è pubblico e modificabile solo con il consenso della maggioranza dei partecipanti alla rete. Nessuna azienda, governo o persona può cambiare le regole unilateralmente.",
            },
            {
              q: "Bitcoin è anonimo?",
              a: "No, è pseudonimo. Tutte le transazioni sono pubbliche e visibili sulla blockchain. Non conosci il nome di chi le fa, ma puoi tracciare ogni movimento di ogni indirizzo Bitcoin della storia. È più trasparente di qualsiasi banca.",
            },
            {
              q: "Quanto consuma Bitcoin?",
              a: "Bitcoin consuma energia — è vero. Ma circa il 50-60% viene da fonti rinnovabili, una percentuale più alta di qualsiasi altro settore industriale. Inoltre il consumo è funzionale: senza energia non c'è sicurezza della rete.",
            },
            {
              q: "Può essere copiato o hackerato?",
              a: "Il codice è open source — chiunque può copiarlo e creare una nuova criptovaluta. L'hanno fatto migliaia di volte. Ma copiare il codice non copia la rete, la fiducia e i 15 anni di storia. La rete Bitcoin in sé non è mai stata hackerata.",
            },
            {
              q: "Cosa succede quando finiscono i 21 milioni?",
              a: "L'ultimo Bitcoin sarà minato intorno al 2140. Da quel momento i miner saranno ricompensati solo dalle fee delle transazioni. La rete continuerà a funzionare esattamente come oggi.",
            },
            {
              q: "Come faccio a custodirlo in sicurezza?",
              a: "La regola fondamentale è: 'not your keys, not your coins'. Chi custodisce i propri Bitcoin su un exchange non li possiede davvero — possiede solo una promessa. Un hardware wallet fisico è la soluzione più sicura per chi vuole la vera proprietà.",
            },
            {
              q: "Bitcoin e blockchain sono la stessa cosa?",
              a: "No. La blockchain è la tecnologia usata da Bitcoin — un registro pubblico distribuito. Bitcoin è la prima e più importante applicazione di questa tecnologia. Esistono migliaia di altre blockchain, ma nessuna ha la sicurezza, la decentralizzazione e la storia di quella di Bitcoin.",
            },
            {
              q: "Devo capire la tecnologia per usarlo?",
              a: "No — come non devi capire il protocollo TCP/IP per usare internet. Ma capire come funziona ti rende più consapevole e più sicuro. Per questo esiste BitcoinPerTe.",
            },
          ].map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="font-heading font-medium text-foreground text-base text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Arrow */}
      <div className="relative z-10 flex justify-center pb-4">
        <button
          onClick={() => navigate("/bitcoin")}
          className="text-muted-foreground/40 hover:text-primary transition-colors animate-bounce-slow"
          aria-label="Vai a Cos'è Bitcoin"
        >
          <ChevronDown size={28} />
        </button>
      </div>

      {/* Ticker */}
      <div className="relative z-10 border-t border-border py-3 overflow-hidden ticker-fade">
        <div className="animate-ticker whitespace-nowrap">
          {[...tickerWords, ...tickerWords].map((word, i) => (
            <span key={i} className="text-muted-foreground/50 text-[15px] mx-4 font-heading">
              {word}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
