import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

const PrivacyModal = ({ open, onClose }: PrivacyModalProps) => {
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
                <h2 className="text-lg font-semibold font-heading">Informativa Privacy e Cookie Policy</h2>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(80vh-60px)] px-6 py-6 text-sm text-muted-foreground leading-relaxed space-y-6">
              <p className="text-xs">
                Ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 — Ultimo aggiornamento: 19 marzo 2026
              </p>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 1 — Titolare del Trattamento</h3>
                <p>Il Titolare del trattamento dei dati personali raccolti tramite il sito web www.bitcoinperte.it è:</p>
                <div className="card-elevated p-3 my-2 text-sm">
                  <p className="text-foreground font-medium">Prisman Consulting di Matteo Terenzio</p>
                  <p>Via Alcione 149, 66023 Francavilla al Mare (CH) — Italia</p>
                  <p>P.IVA: 02840410696 | C.F.: TRNMTT81H02A488S</p>
                  <p>Codice Univoco SDI: M5UXCR1</p>
                  <p>Email: info@prismanconsulting.it | Tel: +39 338 252 9370</p>
                </div>
                <p>Ai sensi dell'art. 37 GDPR, data la natura delle attività di trattamento svolte, non è richiesta la nomina di un Data Protection Officer (DPO).</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 2 — Principi del Trattamento</h3>
                <p>Il trattamento dei dati personali avviene nel rispetto dei principi sanciti dall'art. 5 GDPR:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li><strong className="text-foreground">Liceità, correttezza e trasparenza</strong></li>
                  <li><strong className="text-foreground">Limitazione della finalità</strong></li>
                  <li><strong className="text-foreground">Minimizzazione</strong></li>
                  <li><strong className="text-foreground">Esattezza</strong></li>
                  <li><strong className="text-foreground">Limitazione della conservazione</strong></li>
                  <li><strong className="text-foreground">Integrità e riservatezza</strong></li>
                  <li><strong className="text-foreground">Responsabilizzazione (accountability)</strong></li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 3 — Categorie di Dati Raccolti e Finalità</h3>
                <h4 className="font-semibold text-foreground mt-3">3.1 — Dati di navigazione</h4>
                <p>I sistemi informatici acquisiscono alcuni dati la cui trasmissione è implicita nell'uso dei protocolli Internet: indirizzo IP, orario, metodo HTTP, dimensione del file, codice di stato.</p>
                <p><strong className="text-foreground">Base giuridica:</strong> art. 6, par. 1, lett. f) GDPR. <strong className="text-foreground">Conservazione:</strong> max 30 giorni.</p>

                <h4 className="font-semibold text-foreground mt-3">3.2 — Dati forniti volontariamente</h4>
                <p>L'invio di messaggi comporta l'acquisizione dell'indirizzo del mittente e dei dati inseriti.</p>
                <p><strong className="text-foreground">Base giuridica:</strong> art. 6, par. 1, lett. b) e f) GDPR. <strong className="text-foreground">Conservazione:</strong> max 24 mesi.</p>
                <p>Il Titolare non utilizzerà mai i dati per comunicazioni commerciali o offerte di investimento.</p>

                <h4 className="font-semibold text-foreground mt-3">3.3 — Dati particolari</h4>
                <p>Il Sito non raccoglie né tratta categorie particolari di dati personali.</p>

                <h4 className="font-semibold text-foreground mt-3">3.4 — Dati relativi a minori</h4>
                <p>Il Sito non è destinato a minori di 14 anni.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 4 — Cookie Policy</h3>
                <p>Il Sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento. Non vengono utilizzati cookie di profilazione, tracciamento pubblicitario o analitici di terze parti.</p>
                <p>L'utente può gestire i cookie tramite le impostazioni del proprio browser.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 5 — Comunicazione e Diffusione</h3>
                <p>I dati personali non sono comunicati a terzi, né diffusi, né ceduti, salvo obbligo di legge.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 6 — Misure di Sicurezza</h3>
                <p>Connessione HTTPS/TLS, accesso limitato al personale autorizzato, procedure di backup.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 7 — Diritti degli Interessati (artt. 15-22 GDPR)</h3>
                <p>Accesso, rettifica, cancellazione, limitazione, portabilità, opposizione, revoca del consenso, reclamo al Garante.</p>
                <p>Richieste: info@prismanconsulting.it — Risposta entro 30 giorni.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 8 — Aggiornamenti</h3>
                <p>Il Titolare si riserva il diritto di modificare la presente Informativa.</p>
              </section>

              <div className="border-t border-border pt-4 text-xs text-center text-muted-foreground/50">
                © 2026 BitcoinPerTe.it — Redatto ai sensi del Reg. UE 2016/679
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;
