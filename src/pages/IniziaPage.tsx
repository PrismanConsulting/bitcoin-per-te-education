import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";

const steps = [
  {
    title: "Prima di Bitcoin, capiamo il denaro.",
    text: "Il denaro è uno strumento che usiamo per scambiare cose di valore. Una volta si usavano conchiglie, poi oro, poi carta. Oggi usiamo numeri su uno schermo bancario.\n\nMa chi decide quanti soldi esistono? Le banche centrali. E possono stamparne quanti vogliono.",
    box: "In Italia dal 2000 ad oggi, l'euro ha perso circa il 40% del suo potere d'acquisto. I tuoi risparmi valgono meno ogni anno — anche se non li tocchi.",
  },
  {
    title: "Bitcoin è denaro che nessuno può stampare.",
    text: "Bitcoin è un programma informatico che funziona su migliaia di computer nel mondo contemporaneamente.\n\nNessuno lo controlla — né banche, né governi, né aziende. Le sue regole sono scritte nel codice e non possono essere cambiate senza il consenso di tutti.",
    box: "Esistono e esisteranno solo 21 milioni di Bitcoin. Mai uno di più. È scritto nel codice dal 2009 e non è mai cambiato.",
  },
  {
    title: "Immagina un registro pubblico che nessuno può falsificare.",
    text: "Quando fai un bonifico, la tua banca aggiorna il suo registro privato. Puoi fidarti solo di lei.\n\nBitcoin funziona diversamente: esiste un registro pubblico — la blockchain — copiato su ~20.000 computer nel mondo. Per modificare una transazione dovresti modificarla su tutti contemporaneamente. È matematicamente impossibile.",
    link: { label: "Approfondisci la Blockchain →", href: "/blockchain" },
  },
  {
    title: "Bitcoin funziona da 15 anni senza mai fermarsi.",
    text: "Dal 3 gennaio 2009 la rete Bitcoin non si è mai fermata. Nessun hack, nessuna interruzione, nessun blocco.\n\nOgni ~10 minuti nasce un nuovo blocco di transazioni — automaticamente, senza nessuno che prema un bottone.\n\nLe uniche vulnerabilità sono umane: chi perde le chiavi private perde i propri Bitcoin. La rete in sé è inattaccabile.",
    box: "La rete Bitcoin ha un uptime del 99.98% dal 2009. Più affidabile di qualsiasi banca.",
  },
  {
    title: "Hai capito i fondamentali.",
    text: "Non devi comprare Bitcoin per capirlo. Questo sito esiste per aiutarti a capire la tecnologia — non per convincerti a fare nulla.\n\nEsplora, fai domande, torna quando vuoi.",
    cards: [
      { label: "Approfondisci la Blockchain →", href: "/blockchain" },
      { label: "Testa le tue conoscenze →", href: "/quiz" },
      { label: "Guarda la rete live →", href: "/live" },
    ],
  },
];

const stepLabels = [
  "Cos'è il denaro?",
  "Cosa fa Bitcoin di diverso?",
  "Come funziona senza banca?",
  "Ma è sicuro?",
  "E adesso?",
];

const IniziaPage = () => {
  const [current, setCurrent] = useState(0);
  const step = steps[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SEO
        title="Inizia da Zero — Capire Bitcoin in 5 Minuti | BitcoinPerTe"
        description="Non sai nulla di Bitcoin? Inizia qui. 5 step semplici senza tecnicismi. Dal denaro alla blockchain, spiegato come se avessi 15 anni."
        path="/inizia"
        keywords="bitcoin per principianti, capire bitcoin, cos'è bitcoin spiegato semplice"
      />

      <div className="container mx-auto px-4 py-24 max-w-2xl">
        {/* Progress bar */}
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-heading">{stepLabels[current]}</p>
          <p className="text-xs text-muted-foreground font-mono">{current + 1}/5</p>
        </div>
        <div className="flex gap-1.5 mb-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= current ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground leading-tight">
              {step.title}
            </h1>

            {step.text.split("\n\n").map((p, i) => (
              <p key={i} className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {p}
              </p>
            ))}

            {step.box && (
              <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg">
                <p className="text-foreground text-base leading-relaxed">{step.box}</p>
              </div>
            )}

            {step.link && (
              <Link
                to={step.link.href}
                className="inline-block text-primary hover:underline text-base font-heading"
              >
                {step.link.label}
              </Link>
            )}

            {step.cards && (
              <div className="grid gap-3 pt-2">
                {step.cards.map((card) => (
                  <Link
                    key={card.href}
                    to={card.href}
                    className="card-surface p-4 rounded-xl hover:border-primary/30 transition-colors flex items-center justify-between"
                  >
                    <span className="font-heading font-medium text-foreground">{card.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-10">
          {current > 0 ? (
            <button
              onClick={() => setCurrent(current - 1)}
              className="border border-border text-muted-foreground px-5 py-2.5 rounded-lg text-base font-heading hover:text-foreground hover:border-muted-foreground transition-colors"
            >
              ← Indietro
            </button>
          ) : (
            <div />
          )}
          {current < steps.length - 1 && (
            <button
              onClick={() => setCurrent(current + 1)}
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-base font-heading hover:bg-primary/90 transition-colors"
            >
              Avanti →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default IniziaPage;
