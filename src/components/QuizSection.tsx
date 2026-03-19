import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, X, RotateCcw } from "lucide-react";

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
    explanation: "Il satoshi è l'unità indivisibile di Bitcoin: 1 BTC = 100.000.000 satoshi.",
  },
  {
    q: "Quanti Bitcoin esisteranno in totale?",
    options: ["1 miliardo", "100 milioni", "21 milioni", "Illimitati"],
    correct: 2,
    explanation: "Il protocollo limita l'offerta totale a 21 milioni di BTC.",
  },
  {
    q: "Cosa avviene durante un halving?",
    options: ["Il prezzo si dimezza", "La ricompensa ai miner si dimezza", "La blockchain si biforca", "I nodi vengono spenti"],
    correct: 1,
    explanation: "L'halving dimezza la ricompensa per blocco assegnata ai miner.",
  },
  {
    q: "Cos'è la blockchain?",
    options: ["Un portafoglio digitale", "Un registro pubblico immutabile", "Una piattaforma di scambio", "Un tipo di criptovaluta"],
    correct: 1,
    explanation: "La blockchain è un registro distribuito, pubblico e immutabile di tutte le transazioni.",
  },
  {
    q: "Chi ha creato Bitcoin?",
    options: ["Un consorzio di banche centrali", "Elon Musk", "Satoshi Nakamoto — identità sconosciuta", "Craig Wright"],
    correct: 2,
    explanation: "Bitcoin è stato creato nel 2008 da Satoshi Nakamoto, pseudonimo la cui identità resta sconosciuta.",
  },
  {
    q: "Con quale frequenza avviene circa un halving?",
    options: ["Ogni anno", "Ogni 2 anni", "Ogni 4 anni", "Ogni 10 anni"],
    correct: 2,
    explanation: "L'halving avviene circa ogni 210.000 blocchi, equivalenti a circa 4 anni.",
  },
];

const QuizSection = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === questions[current].correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  const getScoreMessage = () => {
    if (score <= 2) return "Ottimo punto di partenza. Esplora le sezioni del sito.";
    if (score <= 4) return "Buona base. I fondamentali ci sono.";
    return "Conoscenza solida. Territorio da Bitcoiner appassionato. 🟠";
  };

  return (
    <section id="quiz" className="min-h-screen flex flex-col items-center justify-center py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="label-section mb-2">VERIFICA LE TUE CONOSCENZE</p>
          <h2 className="text-3xl md:text-5xl font-bold font-heading">Quanto conosci Bitcoin?</h2>
          <p className="text-muted-foreground mt-2">6 domande sui fondamentali tecnici. Niente prezzi, niente rendimenti.</p>
        </motion.div>

        <div className="card-surface p-6 md:p-8">
          {!finished ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-2 font-heading">
                  <span>Domanda {current + 1}/{questions.length}</span>
                  <span>{score} corrette</span>
                </div>
                <Progress value={((current + 1) / questions.length) * 100} className="h-1.5 bg-border" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold font-heading mb-6">{questions[current].q}</h3>

                  <div className="space-y-3">
                    {questions[current].options.map((opt, idx) => {
                      let borderClass = "border-border hover:border-primary/40";
                      if (answered) {
                        if (idx === questions[current].correct) borderClass = "border-green-500/60 bg-green-500/5";
                        else if (idx === selected) borderClass = "border-red-500/60 bg-red-500/5";
                        else borderClass = "border-border opacity-50";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(idx)}
                          disabled={answered}
                          className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center gap-3 ${borderClass}`}
                        >
                          <span className="flex-1">{opt}</span>
                          {answered && idx === questions[current].correct && <Check size={16} className="text-green-500" />}
                          {answered && idx === selected && idx !== questions[current].correct && <X size={16} className="text-red-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {answered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                      <p className="text-[13px] text-muted-foreground mb-4">{questions[current].explanation}</p>
                      <Button onClick={handleNext} className="font-heading">
                        {current + 1 < questions.length ? "Prossima domanda" : "Vedi risultato"}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
              <p className="text-5xl font-bold text-primary font-heading mb-4">{score}/{questions.length}</p>
              <p className="text-muted-foreground mb-6">{getScoreMessage()}</p>
              <Button onClick={handleReset} variant="outline" className="font-heading gap-2">
                <RotateCcw size={14} />
                Ricomincia
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
