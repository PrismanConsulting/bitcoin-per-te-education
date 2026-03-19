import { motion } from "framer-motion";

const DisclaimerSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-primary/30 bg-card rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">
            ⚠️ Avvertenze Legali Importanti — Leggere Attentamente
          </h2>

          <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <h3 className="text-foreground font-semibold">DISCLAIMER LEGALE</h3>
            <p>
              BitcoinPerTe.it è un progetto di informazione e divulgazione su Bitcoin e
              sulle tecnologie ad esso correlate. Il sito è gestito da Prisman Consulting
              di Matteo Terenzio e non costituisce in alcun modo:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>sollecitazione all'investimento</li>
              <li>consulenza finanziaria</li>
              <li>raccomandazione di acquisto o vendita di asset digitali o di qualsiasi altro strumento finanziario</li>
              <li>servizio di gestione patrimoniale</li>
            </ul>

            <h3 className="text-foreground font-semibold pt-2">RISCHI</h3>
            <p>
              Gli investimenti in criptovalute comportano rischi significativi,
              inclusa la possibilità di perdita totale del capitale. La volatilità dei prezzi
              delle criptovalute è estremamente elevata e i valori possono fluttuare
              drasticamente in breve tempo. Non esiste alcuna garanzia sul valore futuro
              di Bitcoin o di qualsiasi altra criptovaluta. Le performance passate non sono
              indicative di risultati futuri.
            </p>

            <h3 className="text-foreground font-semibold pt-2">RESPONSABILITÀ PERSONALE</h3>
            <p>
              Qualsiasi decisione economica o finanziaria deve essere presa autonomamente
              dall'utente, previo approfondimento personale e consultazione di consulenti
              qualificati, indipendenti e autorizzati (legali, fiscali, finanziari).
              Prisman Consulting non si assume alcuna responsabilità per perdite o danni
              derivanti dall'utilizzo delle informazioni presenti su questo sito.
            </p>

            <h3 className="text-foreground font-semibold pt-2">ASSENZA DI AUTORIZZAZIONI</h3>
            <p>
              Il gestore di questo sito non è un consulente finanziario autorizzato e non
              è iscritto ad alcun albo professionale di settore. Non è autorizzato a fornire
              consulenza finanziaria né a sollecitare investimenti. Ogni contenuto ha
              esclusivo scopo educativo e divulgativo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DisclaimerSection;
