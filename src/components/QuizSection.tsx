import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

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
    q: "Quanti Bitcoin esisteranno mai in totale?",
    options: ["1 miliardo", "100 milioni", "21 milioni", "Illimitati"],
    correct: 2,
    explanation: "Il protocollo Bitcoin stabilisce un limite massimo di 21 milioni di BTC.",
  },
  {
    q: 'Cosa succede durante un "halving"?',
    options: ["Il prezzo si dimezza", "La ricompensa ai miner si dimezza", "La blockchain si divide", "I nodi vengono spenti"],
    correct: 1,
    explanation: "L'halving dimezza la ricompensa che i miner ricevono per ogni blocco validato.",
  },
  {
    q: "Cos'è la blockchain?",
    options: ["Un portafoglio digitale", "Un registro pubblico immutabile di transazioni", "Una piattaforma di trading", "Un tipo di criptovaluta"],
    correct: 1,
    explanation: "La blockchain è il registro pubblico e immutabile di tutte le transazioni Bitcoin.",
  },
  {
    q: "Chi ha creato Bitcoin?",
    options: ["Elon Musk", "Craig Wright", "Un gruppo di banche", "Satoshi Nakamoto (identità sconosciuta)"],
    correct: 3,
    explanation: "Bitcoin è stato creato nel 2009 da un individuo o gruppo sotto lo pseudonimo Satoshi Nakamoto.",
  },
  {
    q: "Ogni quanto avviene circa un halving?",
    options: ["Ogni anno", "Ogni 2 anni", "Ogni 4 anni", "Ogni 10 anni"],
    correct: 2,
    explanation: "L'halving avviene circa ogni 210.000 blocchi, cioè circa ogni 4 anni.",
  },
];

const QuizSection = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correct) {
      setScore((s) => s + 1);
    }
    setAnswers((a) => [...a, idx]);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  const getMessage = () => {
    if (score <= 2) return "Stai iniziando il tuo viaggio — continua a leggere!";
    if (score <= 4) return "Buona base! Stai capendo i fondamentali.";
    return "Ottimo! Sei un vero Bitcoiner appassionato 🟠";
  };

  const q = questions[current];

  return (
    <section id="quiz" className="py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          Metti alla prova le tue <span className="text-primary">conoscenze</span>
        </motion.h2>
        <p className="text-center text-muted-foreground text-sm mb-12">
          Solo domande di cultura generale su Bitcoin — nessuna domanda su investimenti o rendimenti
        </p>

        {!finished ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-bitcoin"
          >
            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-6">
              <div
                className="bg-gradient-bitcoin h-2 rounded-full transition-all duration-300"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>

            <p className="text-xs text-muted-foreground mb-3">
              Domanda {current + 1} di {questions.length}
            </p>
            <h3 className="text-lg font-semibold mb-6">{q.q}</h3>

            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => {
                let cls = "card-bitcoin cursor-pointer text-sm transition-all duration-200 hover:border-primary/50";
                if (selected !== null) {
                  if (i === q.correct) cls += " !border-green-500 !bg-green-500/10";
                  else if (i === selected) cls += " !border-red-500 !bg-red-500/10";
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} className={cls} disabled={selected !== null}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                <p className="text-sm text-muted-foreground">{q.explanation}</p>
                <Button onClick={next} className="mt-4 bg-gradient-bitcoin text-primary-foreground hover:opacity-90">
                  {current < questions.length - 1 ? "Prossima domanda" : "Vedi risultato"}
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-bitcoin text-center">
            <div className="text-6xl mb-4">{score <= 2 ? "📚" : score <= 4 ? "👍" : "🏆"}</div>
            <h3 className="text-2xl font-bold mb-2">
              {score}/{questions.length} risposte corrette
            </h3>
            <p className="text-muted-foreground mb-6">{getMessage()}</p>
            <Button onClick={reset} variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <RotateCcw size={16} className="mr-2" /> Rifai il quiz
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QuizSection;
