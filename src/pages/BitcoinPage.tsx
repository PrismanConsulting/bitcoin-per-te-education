import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const cards = [
  {
    title: "DECENTRALIZZATO",
    text: "Nessun server centrale, nessuna autorità di controllo. La rete vive su migliaia di nodi distribuiti che mantengono insieme il registro pubblico. Non esiste un interruttore da spegnere.",
  },
  {
    title: "IMMUTABILE",
    text: "Ogni transazione registrata nella blockchain è permanente. Nessuno — nessuno stato, nessuna banca, nessuna azienda — può alterare ciò che è già scritto nel registro.",
  },
  {
    title: "PROGRAMMATO",
    text: "Le regole di Bitcoin sono matematiche, non politiche. Emissione, ritmo di produzione, limite massimo: tutto è definito dal protocollo, non da una decisione umana.",
  },
];

const faqs = [
  {
    q: "Come funziona tecnicamente una transazione Bitcoin?",
    a: "Quando invii bitcoin, il tuo wallet crea una transazione firmata crittograficamente e la trasmette alla rete peer-to-peer. I nodi verificano la validità della firma e la disponibilità dei fondi controllando gli UTXO (output non spesi). I miner includono la transazione in un blocco candidato e competono per risolvere il proof-of-work. Una volta trovata la soluzione, il blocco viene propagato e la transazione diventa parte permanente della blockchain.",
  },
  {
    q: "Qual è la differenza tra Bitcoin e una valuta tradizionale?",
    a: "Una valuta tradizionale è emessa e controllata da una banca centrale che ne determina la quantità in circolazione. Bitcoin ha un'emissione programmata e un limite massimo di 21 milioni di unità definito nel codice sorgente. Non richiede intermediari per le transazioni, funziona 24 ore su 24 e non conosce confini geografici. Le regole del protocollo cambiano solo con il consenso distribuito della rete, non per decisione di un'autorità centrale.",
  },
  {
    q: "Chi governa il protocollo Bitcoin?",
    a: "Nessuna singola entità governa Bitcoin. Il protocollo è open source e le modifiche richiedono il consenso dei nodi della rete. Gli sviluppatori propongono miglioramenti tramite BIP (Bitcoin Improvement Proposal), ma ogni operatore di nodo decide autonomamente quale versione del software eseguire. Questo meccanismo di consenso distribuito rende Bitcoin resistente alla censura e al controllo centralizzato.",
  },
];

const BitcoinPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="min-h-screen pt-16 flex flex-col justify-center"
  >
    <div className="container mx-auto px-4 max-w-6xl py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="label-section mb-2">FONDAMENTALI</p>
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground">Cos'è Bitcoin?</h1>
        <p className="text-muted-foreground text-lg mt-2">Non una valuta come le altre. Un protocollo.</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="card-surface p-6"
          >
            <h3 className="text-sm font-bold font-heading text-primary mb-3 tracking-wide">{card.title}</h3>
            <p className="text-base text-muted-foreground leading-[1.7]">{card.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="max-w-3xl">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border">
            <AccordionTrigger className="text-base font-heading text-foreground hover:text-primary">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-[1.7]">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Nav arrow */}
      <div className="mt-10">
        <Link to="/blockchain" className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors font-heading">
          Blockchain <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </motion.div>
);

export default BitcoinPage;
