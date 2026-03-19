import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft size={16} /> Torna alla home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Informativa Privacy e Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 — Ultimo aggiornamento: 19 marzo 2026
          </p>

          <div className="prose prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">

            {/* Art. 1 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 1 — Titolare del Trattamento</h2>
              <p>Il Titolare del trattamento dei dati personali raccolti tramite il sito web www.bitcoinperte.it è:</p>
              <div className="card-bitcoin text-sm">
                <p className="text-foreground font-medium">Prisman Consulting di Matteo Terenzio</p>
                <p>Via Alcione 149, 66023 Francavilla al Mare (CH) — Italia</p>
                <p>P.IVA: 02840410696 | C.F.: TRNMTT81H02A488S</p>
                <p>Codice Univoco SDI: M5UXCR1</p>
                <p>Email: info@prismanconsulting.it | Tel: +39 338 252 9370</p>
              </div>
              <p>Ai sensi dell'art. 37 GDPR, data la natura delle attività di trattamento svolte (nessun trattamento su larga scala di categorie particolari di dati, nessun monitoraggio sistematico di persone fisiche), non è richiesta la nomina di un Data Protection Officer (DPO).</p>
            </section>

            {/* Art. 2 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 2 — Principi del Trattamento</h2>
              <p>Il trattamento dei dati personali avviene nel rispetto dei principi sanciti dall'art. 5 GDPR:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Liceità, correttezza e trasparenza:</strong> i dati sono trattati in modo lecito, corretto e trasparente nei confronti dell'interessato;</li>
                <li><strong className="text-foreground">Limitazione della finalità:</strong> i dati sono raccolti per finalità determinate, esplicite e legittime;</li>
                <li><strong className="text-foreground">Minimizzazione:</strong> i dati raccolti sono adeguati, pertinenti e limitati a quanto necessario;</li>
                <li><strong className="text-foreground">Esattezza:</strong> i dati sono esatti e, se necessario, aggiornati;</li>
                <li><strong className="text-foreground">Limitazione della conservazione:</strong> i dati sono conservati per il tempo strettamente necessario;</li>
                <li><strong className="text-foreground">Integrità e riservatezza:</strong> i dati sono trattati con adeguate misure di sicurezza;</li>
                <li><strong className="text-foreground">Responsabilizzazione (accountability):</strong> il Titolare è responsabile del rispetto dei principi sopra elencati.</li>
              </ul>
            </section>

            {/* Art. 3 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 3 — Categorie di Dati Raccolti e Finalità</h2>

              <h3 className="text-lg font-semibold text-foreground mt-4">3.1 — Dati di navigazione (log tecnici)</h3>
              <p>I sistemi informatici acquisiscono, nel corso del loro normale esercizio, alcuni dati la cui trasmissione è implicita nell'uso dei protocolli Internet. In questa categoria rientrano: indirizzo IP, orario della richiesta, metodo HTTP, dimensione del file, codice di stato, parametri del sistema operativo.</p>
              <p><strong className="text-foreground">Base giuridica:</strong> art. 6, par. 1, lett. f) GDPR — legittimo interesse.</p>
              <p><strong className="text-foreground">Conservazione:</strong> massimo 30 giorni.</p>

              <h3 className="text-lg font-semibold text-foreground mt-4">3.2 — Dati forniti volontariamente (modulo di contatto / email)</h3>
              <p>L'invio facoltativo di messaggi o la compilazione del modulo di contatto comportano l'acquisizione dell'indirizzo del mittente e dei dati inseriti.</p>
              <p><strong className="text-foreground">Finalità:</strong> risposta alle richieste, costruzione di community tra appassionati di Bitcoin.</p>
              <p><strong className="text-foreground">Base giuridica:</strong> art. 6, par. 1, lett. b) e f) GDPR.</p>
              <p><strong className="text-foreground">Conservazione:</strong> non oltre 24 mesi dall'ultimo contatto.</p>
              <p>Il Titolare non utilizzerà mai i dati per inviare comunicazioni commerciali, offerte di investimento, promozioni finanziarie o materiale pubblicitario non richiesto.</p>

              <h3 className="text-lg font-semibold text-foreground mt-4">3.3 — Dati particolari (art. 9 GDPR)</h3>
              <p>Il Sito non raccoglie né tratta categorie particolari di dati personali.</p>

              <h3 className="text-lg font-semibold text-foreground mt-4">3.4 — Dati relativi a minori</h3>
              <p>Il Sito non è destinato a minori di 14 anni. Il Titolare non raccoglie consapevolmente dati personali di minori.</p>
            </section>

            {/* Art. 4 — Cookie */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 4 — Cookie Policy</h2>

              <h3 className="text-lg font-semibold text-foreground mt-4">4.1 — Cosa sono i cookie</h3>
              <p>I cookie sono piccoli file di testo che i siti web inviano al terminale dell'utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.</p>

              <h3 className="text-lg font-semibold text-foreground mt-4">4.2 — Cookie utilizzati da questo Sito</h3>
              <p>Il Sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento delle pagine:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Cookie di sessione:</strong> necessari per la navigazione. Si cancellano alla chiusura del browser.</li>
                <li><strong className="text-foreground">Cookie funzionali:</strong> memorizzano preferenze di navigazione. Non profilano l'utente.</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-4">4.3 — Cookie NON utilizzati</h3>
              <p>Il Sito non utilizza: cookie di profilazione, cookie di tracciamento pubblicitario, cookie analitici di terze parti non anonimizzati, pixel di tracciamento, script di social media per profilazione cross-site.</p>

              <h3 className="text-lg font-semibold text-foreground mt-4">4.4 — Gestione dei cookie da browser</h3>
              <p>L'utente può gestire, bloccare o eliminare i cookie tramite le impostazioni del proprio browser. La disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del Sito.</p>
            </section>

            {/* Art. 5 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 5 — Comunicazione e Diffusione dei Dati</h2>
              <p>I dati personali non sono comunicati a terzi, né diffusi, né ceduti, salvo obbligo di legge o forniture tecniche strettamente necessarie (hosting provider come Responsabili del trattamento ex art. 28 GDPR).</p>
              <p>Il Titolare non trasferisce dati verso Paesi terzi al di fuori dello SEE, salvo nel rispetto del Capo V del GDPR.</p>
            </section>

            {/* Art. 6 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 6 — Misure di Sicurezza</h2>
              <p>Il Titolare adotta misure tecniche e organizzative adeguate (art. 32 GDPR): connessione HTTPS/TLS, accesso limitato al personale autorizzato, procedure di backup, aggiornamento regolare dei sistemi.</p>
            </section>

            {/* Art. 7 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 7 — Diritti degli Interessati (artt. 15-22 GDPR)</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Accesso (art. 15):</strong> ottenere conferma e accesso ai dati;</li>
                <li><strong className="text-foreground">Rettifica (art. 16):</strong> ottenere la rettifica dei dati inesatti;</li>
                <li><strong className="text-foreground">Cancellazione (art. 17):</strong> "diritto all'oblio";</li>
                <li><strong className="text-foreground">Limitazione (art. 18):</strong> ottenere la limitazione del trattamento;</li>
                <li><strong className="text-foreground">Portabilità (art. 20):</strong> ricevere i dati in formato strutturato;</li>
                <li><strong className="text-foreground">Opposizione (art. 21):</strong> opporsi al trattamento;</li>
                <li><strong className="text-foreground">Revoca del consenso;</strong></li>
                <li><strong className="text-foreground">Reclamo</strong> al Garante per la protezione dei dati personali (www.garanteprivacy.it).</li>
              </ul>
              <p className="mt-2">Richieste: info@prismanconsulting.it — Risposta entro 30 giorni (prorogabili di 60).</p>
            </section>

            {/* Art. 8 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 8 — Aggiornamenti</h2>
              <p>Il Titolare si riserva il diritto di modificare la presente Informativa. Le modifiche saranno pubblicate sul Sito con data di aggiornamento.</p>
            </section>

            {/* Art. 9 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 9 — Contatti per la Privacy</h2>
              <div className="card-bitcoin text-sm">
                <p className="text-foreground font-medium">Prisman Consulting di Matteo Terenzio</p>
                <p>Via Alcione 149 — 66023 Francavilla al Mare (CH) — Italia</p>
                <p>Email: info@prismanconsulting.it | Tel: +39 338 252 9370</p>
              </div>
              <p className="mt-3">Autorità di controllo: Garante per la protezione dei dati personali — Piazza Venezia 11, 00187 Roma — www.garanteprivacy.it — Tel: +39 06 696771</p>
            </section>

            <div className="border-t border-border pt-6 text-xs text-center">
              © 2026 BitcoinPerTe.it — Un progetto divulgativo di Prisman Consulting — Redatto ai sensi del Reg. UE 2016/679
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
