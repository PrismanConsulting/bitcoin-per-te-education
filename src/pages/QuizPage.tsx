import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw } from "lucide-react";
import SEO from "@/components/SEO";

interface Question {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    q: "Qual è l'unità più piccola di Bitcoin?",
    options: ["Milli-Bitcoin", "Satoshi", "Wei", "Bit"],
    correct: 1,
    explanation: "Il satoshi è la più piccola unità di Bitcoin: 1 BTC = 100.000.000 satoshi.",
  },
  {
    q: "Quanti Bitcoin esisteranno in totale?",
    options: ["1 miliardo", "100 milioni", "21 milioni", "Illimitati"],
    correct: 2,
    explanation: "Il protocollo Bitcoin prevede un'offerta massima di 21 milioni di BTC.",
  },
  {
    q: "Cosa avviene durante un halving?",
    options: ["Il prezzo si dimezza", "La ricompensa ai miner si dimezza", "La blockchain si biforca", "I nodi vengono spenti"],
    correct: 1,
    explanation: "L'halving dimezza la ricompensa in BTC che i miner ricevono per ogni blocco validato.",
  },
  {
    q: "Cos'è la blockchain?",
    options: ["Un portafoglio digitale", "Un registro pubblico immutabile", "Una piattaforma di scambio", "Un tipo di criptovaluta"],
    correct: 1,
    explanation: "La blockchain è un registro pubblico distribuito e immutabile di tutte le transazioni Bitcoin.",
  },
  {
    q: "Chi ha creato Bitcoin?",
    options: ["Un consorzio di banche centrali", "Elon Musk", "Satoshi Nakamoto — identità sconosciuta", "Craig Wright"],
    correct: 2,
    explanation: "Bitcoin è stato creato nel 2008 da Satoshi Nakamoto, pseudonimo di un autore la cui identità è tuttora sconosciuta.",
  },
  {
    q: "Con quale frequenza avviene circa un halving?",
    options: ["Ogni anno", "Ogni 2 anni", "Ogni 4 anni", "Ogni 10 anni"],
    correct: 2,
    explanation: "L'halving avviene ogni 210.000 blocchi, circa ogni 4 anni.",
  },
];

const QuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const getMessage = () => {
    if (score <= 2) return "Ottimo punto di partenza. Esplora le pagine del sito.";
    if (score <= 4) return "Buona base. I fondamentali ci sono.";
    return "Conoscenza solida. Territorio da Bitcoiner appassionato. 🟠";
  };

  const q = questions[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16 flex flex-col justify-center"
    >
      <SEO
        title="Quiz Bitcoin — Testa le tue Conoscenze | BitcoinPerTe"
        description="6 domande sui fondamentali tecnici di Bitcoin. Niente domande su prezzi o investimenti — solo tecnologia e protocollo."
        path="/quiz"
      />
      <div className="container mx-auto px-4 max-w-[680px] py-12">
        <div className="mb-8 text-center">
          <p className="label-section mb-2">VERIFICA LE TUE CONOSCENZE</p>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Quanto conosci Bitcoin?</h1>
          <p className="text-muted-foreground text-base mt-2">6 domande sui fondamentali tecnici. Niente prezzi, niente rendimenti.</p>
        </div>

        <div className="card-surface p-6 md:p-8">
          {!finished ? (
            <>
              {/* Progress */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={false}
                    animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-[13px] font-mono text-muted-foreground">{current + 1}/{questions.length}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-lg font-heading font-semibold text-foreground mb-5">{q.q}</h2>

                  <div className="space-y-2.5">
                    {q.options.map((opt, i) => {
                      const isCorrect = i === q.correct;
                      const isSelected = i === selected;
                      let borderClass = "border-border hover:border-muted-foreground";
                      if (selected !== null) {
                        if (isCorrect) borderClass = "border-green-500/60 bg-green-500/5";
                        else if (isSelected && !isCorrect) borderClass = "border-red-500/60 bg-red-500/5";
                        else borderClass = "border-border opacity-50";
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelect(i)}
                          disabled={selected !== null}
                          className={`w-full text-left px-4 py-3 rounded-md border text-base transition-all flex items-center gap-3 ${borderClass}`}
                        >
                          <span className="text-muted-foreground flex-1">{opt}</span>
                          {selected !== null && isCorrect && <Check size={16} className="text-green-500" />}
                          {selected !== null && isSelected && !isCorrect && <X size={16} className="text-red-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {selected !== null && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                      <p className="text-base text-muted-foreground leading-[1.7]">{q.explanation}</p>
                      <button
                        onClick={next}
                        className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-base font-medium hover:bg-primary/90 transition-colors"
                      >
                        {current + 1 < questions.length ? "Prossima →" : "Risultato"}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-5">
              <p className="text-5xl font-mono font-bold text-primary">{score}/{questions.length}</p>
              <p className="text-base text-muted-foreground">{getMessage()}</p>
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 border border-primary/30 text-primary px-5 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors"
              >
                <RotateCcw size={14} /> Ricomincia
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuizPage;
