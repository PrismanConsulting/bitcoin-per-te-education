import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    text: "Le regole di Bitcoin sono matematiche, non politiche. L'emissione, il ritmo di produzione, il limite massimo: tutto è definito dal protocollo, non da una decisione umana.",
  },
];

const faqs = [
  {
    q: "Come funziona tecnicamente una transazione?",
    a: "L'utente firma digitalmente la transazione con la propria chiave privata. La transazione viene trasmessa alla rete peer-to-peer, validata dai nodi e inclusa in un blocco dai miner. Una volta confermata, è irreversibile e visibile a tutti sul registro pubblico.",
  },
  {
    q: "Qual è la differenza tra Bitcoin e una valuta tradizionale?",
    a: "Una valuta tradizionale è emessa e controllata da un'autorità centrale (banca centrale). Bitcoin è emesso da un algoritmo, regolato dal consenso della rete e non ha bisogno di intermediari per funzionare. L'offerta è fissa e predeterminata.",
  },
  {
    q: "Chi governa il protocollo Bitcoin?",
    a: "Nessuna entità singola. Le modifiche al protocollo richiedono il consenso distribuito della rete: sviluppatori propongono, nodi validano, miner eseguono. È un sistema di governance emergente, non gerarchico.",
  },
];

const WhatIsBitcoin = () => {
  return (
    <section id="cose-bitcoin" className="min-h-screen flex flex-col justify-center py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="label-section mb-2">FONDAMENTALI</p>
          <h2 className="text-3xl md:text-5xl font-bold font-heading">Cos'è Bitcoin?</h2>
          <p className="text-muted-foreground mt-2">Non una valuta come le altre. Un protocollo.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-surface p-6"
            >
              <h3 className="text-primary text-xs font-bold tracking-wider mb-3 font-heading">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="card-surface divide-y divide-border">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q} className="border-none px-6">
                <AccordionTrigger className="text-sm font-heading text-foreground hover:text-primary py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
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
