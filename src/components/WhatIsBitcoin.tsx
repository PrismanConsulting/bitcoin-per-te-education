import { motion } from "framer-motion";
import { Monitor, Globe, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cards = [
  {
    icon: Monitor,
    emoji: "💻",
    title: "Moneta Digitale",
    desc: "La prima valuta digitale decentralizzata, senza banche né intermediari. Funziona 24/7 in tutto il mondo su base matematica.",
    detail: "Bitcoin è stato creato nel 2009 da Satoshi Nakamoto come sistema di pagamento elettronico peer-to-peer. Non dipende da nessuna banca centrale o istituto finanziario. Le transazioni avvengono direttamente tra utenti attraverso la crittografia, senza la necessità di un intermediario di fiducia.",
  },
  {
    icon: Globe,
    emoji: "🌐",
    title: "Rete Distribuita",
    desc: "Non esiste un server centrale. Migliaia di computer nel mondo mantengono insieme il registro pubblico, senza nessun punto di controllo.",
    detail: "La rete Bitcoin è composta da migliaia di nodi distribuiti in tutto il mondo. Ogni nodo mantiene una copia completa della blockchain. Questo rende il sistema estremamente resistente: non esiste un singolo punto di guasto o di controllo. Anche se alcuni nodi vengono spenti, la rete continua a funzionare.",
  },
  {
    icon: Lock,
    emoji: "🔒",
    title: "Regole Immutabili",
    desc: "Le regole del sistema sono trasparenti, matematiche e uguali per tutti. Nessuno può cambiarle unilateralmente.",
    detail: "Il protocollo Bitcoin è open-source e le sue regole sono verificabili da chiunque. Modifiche al codice richiedono il consenso della maggioranza della rete. Regole come il limite massimo di 21 milioni di Bitcoin e il meccanismo di halving sono programmate nel codice sin dall'inizio e non possono essere alterate da un singolo attore.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const WhatIsBitcoin = () => {
  return (
    <section id="cosè-bitcoin" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Cos'è <span className="text-primary">Bitcoin</span>?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="card-bitcoin hover:glow-bitcoin transition-shadow duration-300"
            >
              <div className="text-3xl mb-4">{card.emoji}</div>
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible>
            {cards.map((card, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-foreground hover:text-primary">
                  {card.emoji} Approfondisci: {card.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {card.detail}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsBitcoin;
