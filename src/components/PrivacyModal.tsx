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
                Ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 — Ultimo aggiornamento: 26 marzo 2026
              </p>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 1 — Titolare del Trattamento</h3>
                <div className="card-elevated p-3 my-2 text-sm">
                  <p className="text-foreground font-medium">Prisman Consulting di Matteo Terenzio</p>
                  <p>Francavilla al Mare (CH), Abruzzo — Italia</p>
                  <p>Email: info@prismanconsulting.it</p>
                  <p>Web: prismanconsulting.it</p>
                </div>
                <p>Ai sensi dell'art. 37 GDPR, data la natura delle attività di trattamento svolte, non è richiesta la nomina di un Data Protection Officer (DPO).</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 2 — Dati Personali Raccolti</h3>
                <p>Quando ti registri raccogliamo:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li><strong className="text-foreground">Email</strong> — per autenticazione e comunicazioni di servizio</li>
                  <li><strong className="text-foreground">Nickname</strong> — nome pubblico scelto da te, visibile sul wall e nei commenti</li>
                  <li><strong className="text-foreground">Data di registrazione</strong></li>
                  <li><strong className="text-foreground">Consenso GDPR</strong> con timestamp</li>
                  <li><strong className="text-foreground">Preferenza newsletter</strong> (opt-in/out)</li>
                </ul>
                <p className="mt-3">Non raccogliamo: nome reale, telefono, indirizzo, dati di pagamento, dati di profilazione o tracciamento.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 3 — Come Usiamo i Tuoi Dati</h3>
                <p>I tuoi dati sono usati esclusivamente per:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>Permetterti di accedere al tuo account</li>
                  <li>Mostrare il tuo nickname sul wall e nei commenti</li>
                  <li>Inviarti la newsletter se hai dato il consenso (max 1 email/settimana)</li>
                  <li>Adempiere agli obblighi di legge</li>
                </ul>
                <p className="mt-2">Non vendiamo, cediamo o condividiamo i tuoi dati con terze parti a scopo commerciale.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 4 — Contenuti Pubblici</h3>
                <p>I messaggi che pubblichi sul Wall della Community e i commenti alle notizie sono pubblicamente visibili a tutti i visitatori del sito, associati al tuo nickname. Non pubblicare informazioni personali sensibili nei messaggi pubblici.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 5 — Dati di Navigazione</h3>
                <p>I sistemi informatici acquisiscono alcuni dati la cui trasmissione è implicita nell'uso dei protocolli Internet: indirizzo IP, orario, metodo HTTP, dimensione del file, codice di stato.</p>
                <p><strong className="text-foreground">Base giuridica:</strong> art. 6, par. 1, lett. f) GDPR. <strong className="text-foreground">Conservazione:</strong> max 30 giorni.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 6 — Fonti Dati Esterne</h3>
                <p>Alcune pagine recuperano dati da API pubbliche esterne per scopi puramente informativi e divulgativi:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li><strong className="text-foreground">mempool.space</strong> — dati tecnici sulla rete Bitcoin (blocchi, fee, mempool). Nessun dato personale trasmesso.</li>
                  <li><strong className="text-foreground">CoinGecko</strong> — prezzo di riferimento BTC/USD. Solo lettura, nessun dato personale.</li>
                  <li><strong className="text-foreground">Blockchair</strong> — dati pubblici on-chain sugli indirizzi Bitcoin più ricchi. Nessun dato personale.</li>
                  <li><strong className="text-foreground">CryptoPanic</strong> — feed notizie Bitcoin filtrato. Nessun dato personale trasmesso.</li>
                  <li><strong className="text-foreground">bitnodes.io</strong> — mappa nodi Bitcoin attivi. Nessun dato personale trasmesso.</li>
                  <li><strong className="text-foreground">rss2json.com</strong> — conversione RSS in JSON per feed notizie. Nessun dato personale.</li>
                  <li><strong className="text-foreground">bitcoinops.org, bitcoin.org, nobsbitcoin.com</strong> — feed RSS pubblici di notizie tecniche Bitcoin. Solo lettura, nessun dato personale.</li>
                </ul>
                <p className="mt-2">Queste API sono servizi di terze parti con proprie privacy policy. Il sito non trasmette alcun dato personale dell'utente a questi servizi.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 7 — Cookie Policy</h3>
                <p>Il Sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento. Non vengono utilizzati cookie di profilazione, tracciamento pubblicitario o analitici di terze parti.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 8 — Database e Sicurezza</h3>
                <p>I dati sono conservati su Supabase (server EU — Irlanda, West EU). La connessione è cifrata TLS. Le password sono hash con bcrypt. Non abbiamo accesso alle password in chiaro.</p>
                <p className="mt-2">Ulteriori misure: accesso limitato al personale autorizzato, procedure di backup periodiche.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 9 — Conservazione Dati</h3>
                <p>Conserviamo i tuoi dati finché il tuo account è attivo. Dopo la cancellazione account:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>Email e dati personali: eliminati entro 30 giorni</li>
                  <li>Messaggi e commenti: resi anonimi</li>
                  <li>Log di sistema: eliminati entro 90 giorni</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 10 — I Tuoi Diritti GDPR</h3>
                <p>Ai sensi del GDPR (Reg. UE 2016/679) hai:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>Diritto di accesso ai tuoi dati</li>
                  <li>Diritto di rettifica</li>
                  <li>Diritto alla cancellazione ("diritto all'oblio")</li>
                  <li>Diritto di opposizione al trattamento</li>
                  <li>Diritto alla portabilità dei dati</li>
                  <li>Diritto di revocare il consenso in qualsiasi momento</li>
                </ul>
                <p className="mt-3">Per esercitare questi diritti:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-1">
                  <li>Sezione "Preferenze" del tuo account</li>
                  <li>Email: info@prismanconsulting.it</li>
                </ul>
                <p className="mt-2">La cancellazione account è disponibile direttamente dalla pagina /preferenze. I messaggi pubblici rimarranno anonimi.</p>
                <p className="mt-2">Rispondiamo entro 30 giorni. Hai diritto di presentare reclamo al Garante per la Protezione dei Dati Personali.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground font-heading mb-2">Art. 11 — Aggiornamenti</h3>
                <p>Il Titolare si riserva il diritto di modificare la presente Informativa.</p>
              </section>

              <div className="border-t border-border pt-4 text-xs text-center text-muted-foreground/90">
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
