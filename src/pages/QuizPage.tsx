import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Lock, Share2, Trophy } from "lucide-react";
import SEO from "@/components/SEO";

interface Question {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface LevelDef {
  name: string;
  emoji: string;
  color: string;
  questions: Question[];
}

interface LevelProgress {
  completed: boolean;
  score: number;
  date: string;
}

interface QuizProgress {
  level1?: LevelProgress;
  level2?: LevelProgress;
  level3?: LevelProgress;
}

interface LeaderboardEntry {
  nickname: string;
  livello: number;
  score: number;
  data: string;
}

const STORAGE_KEY = "bitcoinperte_quiz_progress";
const LEADERBOARD_KEY = "bitcoinperte_quiz_leaderboard";
const MIN_UNLOCK_SCORE = 4;

const levels: LevelDef[] = [
  {
    name: "Base",
    emoji: "🟢",
    color: "text-green-400",
    questions: [
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
    ],
  },
  {
    name: "Intermedio",
    emoji: "🟡",
    color: "text-yellow-400",
    questions: [
      {
        q: "Cos'è la mempool?",
        options: ["Un tipo di wallet", "La coda di transazioni in attesa di conferma", "Un exchange decentralizzato", "Un protocollo di mining"],
        correct: 1,
        explanation: "La mempool è la coda dove le transazioni attendono di essere incluse in un blocco dai miner.",
      },
      {
        q: "Quante transazioni contiene mediamente un blocco?",
        options: ["~100-200", "~500-1.000", "~2.000-3.000", "~10.000-20.000"],
        correct: 2,
        explanation: "Un blocco Bitcoin contiene mediamente tra 2.000 e 3.000 transazioni, a seconda della dimensione.",
      },
      {
        q: "Cosa significa UTXO?",
        options: ["Universal Transaction Exchange Order", "Unspent Transaction Output", "Unified Token Exchange Operation", "Unsigned Transaction eXecution Object"],
        correct: 1,
        explanation: "UTXO sta per Unspent Transaction Output — un output di transazione non ancora speso.",
      },
      {
        q: "Cos'è il Lightning Network?",
        options: ["Una blockchain alternativa", "Un layer 2 per pagamenti istantanei off-chain", "Un protocollo di mining più veloce", "Un tipo di nodo"],
        correct: 1,
        explanation: "Il Lightning Network è un layer 2 costruito sopra Bitcoin per pagamenti istantanei e a bassissimo costo.",
      },
      {
        q: "Ogni quanti blocchi si aggiusta la difficoltà?",
        options: ["Ogni 100 blocchi", "Ogni 1.000 blocchi", "Ogni 2.016 blocchi (~2 settimane)", "Ogni 210.000 blocchi"],
        correct: 2,
        explanation: "La difficoltà di mining si ricalibra ogni 2.016 blocchi, circa ogni 2 settimane.",
      },
      {
        q: "Cosa fa un nodo completo (full node)?",
        options: ["Mina nuovi Bitcoin", "Verifica in modo indipendente ogni transazione", "Gestisce un exchange", "Crea nuovi indirizzi"],
        correct: 1,
        explanation: "Un full node scarica e verifica in modo indipendente ogni transazione e blocco della blockchain.",
      },
    ],
  },
  {
    name: "Avanzato",
    emoji: "🔴",
    color: "text-red-400",
    questions: [
      {
        q: "Cos'è uno script locking in Bitcoin?",
        options: ["Un virus che blocca i wallet", "Condizione che deve essere soddisfatta per spendere", "Un tipo di smart contract Ethereum", "Una funzione di mining"],
        correct: 1,
        explanation: "Lo script locking (scriptPubKey) definisce le condizioni crittografiche necessarie per spendere un output.",
      },
      {
        q: "Cosa significa SegWit?",
        options: ["Security Widget", "Segregated Witness — separazione della firma dai dati tx", "Segmented Wire Transfer", "Sequential Witness"],
        correct: 1,
        explanation: "SegWit (Segregated Witness) separa i dati della firma dal corpo della transazione, aumentando la capacità dei blocchi.",
      },
      {
        q: "Cos'è il replace-by-fee (RBF)?",
        options: ["Un metodo per annullare transazioni", "Meccanismo per rimpiazzare una tx non confermata con fee più alta", "Un tipo di wallet", "Un attacco alla rete"],
        correct: 1,
        explanation: "RBF permette di sostituire una transazione non ancora confermata con una nuova versione a fee più alta.",
      },
      {
        q: "Cosa sono le Schnorr signatures?",
        options: ["Un tipo di wallet hardware", "Schema crittografico più efficiente introdotto con Taproot", "Un protocollo di consenso", "Un exchange decentralizzato"],
        correct: 1,
        explanation: "Le Schnorr signatures sono uno schema crittografico introdotto con l'aggiornamento Taproot, più efficiente di ECDSA.",
      },
      {
        q: "Cos'è un timelock?",
        options: ["Un tipo di blocco nella blockchain", "Condizione che impedisce di spendere un output prima di un certo momento", "Un meccanismo di mining", "Un protocollo di sincronizzazione"],
        correct: 1,
        explanation: "Un timelock è una condizione che impedisce di spendere un output prima di un certo blocco o timestamp.",
      },
      {
        q: "Quanti sat/vbyte sono tipicamente sufficienti per conferma entro 1 blocco?",
        options: ["Sempre 1 sat/vbyte", "Sempre 10 sat/vbyte", "Dipende dalla mempool — il terminale lo mostra in tempo reale", "Non importa, tutte le tx sono uguali"],
        correct: 2,
        explanation: "La fee necessaria varia in base alla congestione della mempool. Il Terminale di BitcoinPerTe mostra i dati in tempo reale.",
      },
    ],
  },
];

function loadProgress(): QuizProgress {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveProgress(p: QuizProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}

function isLevelUnlocked(levelIdx: number, progress: QuizProgress): boolean {
  if (levelIdx === 0) return true;
  const prevKey = `level${levelIdx}` as keyof QuizProgress;
  const prev = progress[prevKey];
  return !!prev?.completed && prev.score >= MIN_UNLOCK_SCORE;
}

const QuizPage = () => {
  const [progress, setProgress] = useState<QuizProgress>(loadProgress);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(loadLeaderboard);
  const [activeLevelIdx, setActiveLevelIdx] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameSaved, setNicknameSaved] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setLeaderboard(loadLeaderboard());
  }, []);

  const activeLevel = activeLevelIdx !== null ? levels[activeLevelIdx] : null;
  const questions = activeLevel?.questions || [];

  const startLevel = (idx: number) => {
    setActiveLevelIdx(idx);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setNickname("");
    setNicknameSaved(false);
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      // Save progress
      const levelKey = `level${activeLevelIdx! + 1}` as keyof QuizProgress;
      const newProgress = {
        ...progress,
        [levelKey]: { completed: true, score: score + (selected === questions[current].correct ? 0 : 0), date: new Date().toISOString() },
      };
      // Recalculate final score since last answer was already counted in handleSelect
      newProgress[levelKey] = { completed: true, score, date: new Date().toISOString() };
      setProgress(newProgress);
      saveProgress(newProgress);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const saveNickname = () => {
    if (!nickname.trim() || activeLevelIdx === null) return;
    const entry: LeaderboardEntry = {
      nickname: nickname.trim().slice(0, 20),
      livello: activeLevelIdx + 1,
      score,
      data: new Date().toISOString(),
    };
    const updated = [entry, ...leaderboard].slice(0, 5);
    setLeaderboard(updated);
    saveLeaderboard(updated);
    setNicknameSaved(true);
  };

  const getMessage = () => {
    if (score <= 2) return "Ottimo punto di partenza. Esplora le pagine del sito per approfondire.";
    if (score <= 4) return "Buona base! I fondamentali ci sono.";
    if (score <= 5) return "Conoscenza solida. Sei sulla buona strada. 🟠";
    return "Perfetto! Conoscenza impeccabile. 🟠";
  };

  const getShareUrl = () => {
    if (activeLevelIdx === null) return "";
    const text = `Ho completato il Livello ${activeLevelIdx + 1} del quiz Bitcoin su @bitcoinperte con ${score}/6 risposte corrette 🟠 #Bitcoin → bitcoinperte.it/quiz`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  };

  const nextLevelUnlocked = activeLevelIdx !== null && activeLevelIdx < 2 && score >= MIN_UNLOCK_SCORE;

  const backToLevels = () => {
    setActiveLevelIdx(null);
    setFinished(false);
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
        description="18 domande su 3 livelli progressivi sui fondamentali tecnici di Bitcoin. Niente domande su prezzi o investimenti — solo tecnologia e protocollo."
        path="/quiz"
      />
      <div className="container mx-auto px-4 max-w-[720px] py-12">
        <div className="mb-8 text-center">
          <p className="label-section mb-2">VERIFICA LE TUE CONOSCENZE</p>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Quanto conosci Bitcoin?</h1>
          <p className="text-muted-foreground text-base mt-2">3 livelli progressivi · 18 domande tecniche · Niente prezzi, niente rendimenti.</p>
        </div>

        {/* LEVEL SELECTOR */}
        {activeLevelIdx === null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid gap-4">
              {levels.map((level, idx) => {
                const unlocked = isLevelUnlocked(idx, progress);
                const key = `level${idx + 1}` as keyof QuizProgress;
                const lp = progress[key];
                return (
                  <button
                    key={idx}
                    onClick={() => unlocked && startLevel(idx)}
                    disabled={!unlocked}
                    className={`card-surface p-5 text-left transition-all ${unlocked ? "hover:border-primary/40 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{level.emoji}</span>
                        <div>
                          <p className="font-heading font-semibold text-foreground text-lg">
                            Livello {idx + 1} — {level.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            6 domande · {idx === 0 ? "Fondamentali" : idx === 1 ? "Concetti tecnici" : "Protocollo avanzato"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {lp?.completed && (
                          <span className="text-sm font-mono text-primary">{lp.score}/6</span>
                        )}
                        {!unlocked && <Lock size={18} className="text-muted-foreground" />}
                      </div>
                    </div>
                    {!unlocked && (
                      <p className="text-sm text-muted-foreground mt-2 ml-11">
                        Completa il Livello {idx} con almeno {MIN_UNLOCK_SCORE}/6 per sbloccare
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* LEADERBOARD */}
            {leaderboard.length > 0 && (
              <div className="card-surface p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={18} className="text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">I tuoi record</h3>
                </div>
                <div className="space-y-2">
                  {leaderboard.map((e, i) => (
                    <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground font-mono w-5">#{i + 1}</span>
                        <span className="text-foreground font-medium">{e.nickname}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">Lv.{e.livello}</span>
                        <span className="font-mono text-primary">{e.score}/6</span>
                        <span className="text-muted-foreground text-xs">
                          {new Date(e.data).toLocaleDateString("it-IT")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ACTIVE QUIZ */}
        {activeLevelIdx !== null && (
          <div className="card-surface p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={backToLevels} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← Livelli
              </button>
              <span className="text-muted-foreground">·</span>
              <span className={`text-sm font-medium ${activeLevel!.color}`}>
                {activeLevel!.emoji} Livello {activeLevelIdx + 1} — {activeLevel!.name}
              </span>
            </div>

            {!finished ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={false}
                      animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="text-[14px] font-mono text-muted-foreground">{current + 1}/{questions.length}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeLevelIdx}-${current}`}
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
                <p className="text-5xl font-mono font-bold text-primary">{score}/6</p>
                <p className={`text-sm font-medium ${activeLevel!.color}`}>
                  {activeLevel!.emoji} Livello {activeLevelIdx + 1} — {activeLevel!.name}
                </p>
                <p className="text-base text-muted-foreground">{getMessage()}</p>

                {/* Share on X */}
                <a
                  href={getShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Condividi su X
                </a>

                {/* Nickname input */}
                {!nicknameSaved ? (
                  <div className="flex items-center gap-2 justify-center pt-2">
                    <input
                      type="text"
                      maxLength={20}
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Il tuo nickname"
                      className="bg-card-elevated border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 w-40"
                    />
                    <button
                      onClick={saveNickname}
                      disabled={!nickname.trim()}
                      className="bg-primary/10 text-primary px-3 py-2 rounded text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-40"
                    >
                      Salva
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">✓ Salvato nella leaderboard</p>
                )}

                <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
                  {nextLevelUnlocked && (
                    <button
                      onClick={() => startLevel(activeLevelIdx + 1)}
                      className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-base font-medium hover:bg-primary/90 transition-colors"
                    >
                      Sblocca Livello {activeLevelIdx + 2} →
                    </button>
                  )}
                  <button
                    onClick={() => startLevel(activeLevelIdx)}
                    className="inline-flex items-center gap-2 border border-primary/30 text-primary px-5 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors"
                  >
                    <RotateCcw size={14} /> Ripeti
                  </button>
                  <button
                    onClick={backToLevels}
                    className="inline-flex items-center gap-2 border border-border text-muted-foreground px-5 py-2 rounded-md text-base font-medium hover:bg-muted/20 transition-colors"
                  >
                    ← Livelli
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizPage;
