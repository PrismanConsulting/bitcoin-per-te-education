import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

const TermsModal = ({ open, onClose }: TermsModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[720px] max-h-[80vh] bg-card border border-border rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold font-heading">₿</span>
                <h2 className="text-lg font-semibold font-heading">Termini e Condizioni d'Uso</h2>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(80vh-60px)] px-6 py-6 text-sm text-muted-foreground leading-relaxed space-y-6">
              <p className="text-xs">Ultimo aggiornamento: 26 marzo 2026</p>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 1 — Identità del Gestore e Oggetto del Sito</h3>
                <p>Il sito web www.bitcoinperte.it è gestito da:</p>
                <div className="card-elevated p-3 my-2 text-sm">
                  <p className="text-foreground font-medium">Prisman Consulting di Matteo Terenzio</p>
                  <p>Via Alcione 149, 66023 Francavilla al Mare (CH) — Italia</p>
                  <p>P.IVA: 02840410696 | C.F.: TRNMTT81H02A488S | SDI: M5UXCR1</p>
                  <p>Email: info@prismanconsulting.it | Tel: +39 338 252 9370</p>
                </div>
                <p>Il Sito ha esclusivo scopo divulgativo ed educativo in materia di Bitcoin e delle tecnologie di registro distribuito.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 2 — Natura del Contenuto</h3>
                <p>I contenuti presenti sul Sito hanno esclusivamente finalità informativa e divulgativa. Non costituiscono:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>consulenza finanziaria ai sensi del D.Lgs. 58/1998 (TUF) e della Direttiva MiFID II</li>
                  <li>sollecitazione all'investimento o al disinvestimento</li>
                  <li>raccomandazione personalizzata di acquisto, vendita o detenzione di Bitcoin</li>
                  <li>servizio di gestione di portafoglio o consulenza patrimoniale</li>
                  <li>previsione o proiezione di andamenti di prezzo</li>
                  <li>promozione di prodotti o servizi finanziari soggetti ad autorizzazione</li>
                </ul>
                <p className="mt-2">Il gestore non è iscritto ad alcun albo di consulenti finanziari.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 3 — Accettazione delle Condizioni</h3>
                <p>L'accesso e la navigazione sul Sito implicano la piena accettazione dei presenti Termini. I presenti Termini possono essere modificati in qualsiasi momento.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 4 — Registrazione e Account</h3>
                <p>Per registrarti devi:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>Avere almeno 16 anni (GDPR minori)</li>
                  <li>Fornire un'email valida</li>
                  <li>Scegliere un nickname appropriato</li>
                  <li>Accettare questi termini e la Privacy Policy</li>
                </ul>
                <p className="mt-2">Un account per persona. Account multipli non sono consentiti.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 5 — Contenuti Pubblicati dagli Utenti</h3>
                <p>Pubblicando sul Wall o nei commenti ti impegni a non postare:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>Contenuti offensivi, razzisti, discriminatori o violenti</li>
                  <li>Spam, pubblicità o link commerciali</li>
                  <li>Informazioni personali altrui</li>
                  <li>Contenuti che violano copyright</li>
                  <li>Consigli finanziari o sollecitazioni all'investimento</li>
                </ul>
                <p className="mt-2">Ci riserviamo il diritto di rimuovere contenuti che violano queste regole senza preavviso.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 6 — Disclaimer Finanziario</h3>
                <p>BitcoinPerTe.it è un progetto di pura divulgazione educativa. Nessun contenuto del sito — inclusi messaggi del wall e commenti — costituisce consulenza finanziaria, raccomandazione di investimento o sollecitazione all'acquisto/vendita di asset ai sensi del D.Lgs. 58/1998 (TUF). L'utente è l'unico responsabile delle proprie decisioni finanziarie.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 7 — Proprietà Intellettuale</h3>
                <p>Tutti i contenuti sono di proprietà di Prisman Consulting. È vietata la riproduzione senza autorizzazione scritta. Il termine "Bitcoin" e il simbolo ₿ sono di dominio pubblico.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 8 — Limitazione di Responsabilità</h3>
                <p>Il gestore non garantisce l'accuratezza dei contenuti. Le informazioni sono fornite "così come sono". Il gestore non è responsabile per decisioni di natura finanziaria prese sulla base dei contenuti del Sito.</p>
                <p className="mt-2">Prisman Consulting non è responsabile per contenuti pubblicati dagli utenti. I dati live (prezzi, fee, blocchi) sono forniti a scopo puramente informativo — potrebbero contenere imprecisioni o ritardi.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 9 — Link e Contenuti di Terze Parti</h3>
                <p>Il Sito può contenere link a siti web di terzi, forniti a solo titolo informativo.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 10 — Uso Consentito del Sito</h3>
                <p>L'utente si impegna a utilizzare il Sito in modo lecito. È vietato l'uso per scopi commerciali non autorizzati, accessi non autorizzati, scraping e data mining.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 11 — Legge Applicabile e Foro Competente</h3>
                <p>I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il Foro di Chieti.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 12 — Contatti</h3>
                <div className="card-elevated p-3 text-sm">
                  <p className="text-foreground font-medium">Prisman Consulting di Matteo Terenzio</p>
                  <p>Via Alcione 149 — 66023 Francavilla al Mare (CH)</p>
                  <p>Email: info@prismanconsulting.it | Tel: +39 338 252 9370</p>
                </div>
              </section>

              <div className="border-t border-border pt-4 text-xs text-center text-muted-foreground/90">
                © 2026 BitcoinPerTe.it — Un progetto divulgativo di Prisman Consulting
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
