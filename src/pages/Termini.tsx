import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TerminiPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft size={16} /> Torna alla home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Termini e Condizioni d'Uso</h1>
          <p className="text-sm text-muted-foreground mb-8">Ultimo aggiornamento: 19 marzo 2026</p>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8 text-sm text-muted-foreground">
            <strong className="text-primary">⚠️ AVVERTENZA PRELIMINARE:</strong> BitcoinPerTe.it è un sito di pura divulgazione ed informazione su Bitcoin e sulla tecnologia blockchain. Non costituisce, in nessuna sua parte, consulenza finanziaria, sollecitazione all'investimento o raccomandazione di acquisto/vendita di criptovalute o qualsiasi altro strumento finanziario. Il gestore del sito non è un consulente finanziario autorizzato.
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">

            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 1 — Identità del Gestore e Oggetto del Sito</h2>
              <p>Il sito web www.bitcoinperte.it (di seguito "il Sito") è gestito da:</p>
              <div className="card-bitcoin text-sm">
                <p className="text-foreground font-medium">Prisman Consulting di Matteo Terenzio</p>
                <p>Sede legale: Via Alcione 149, 66023 Francavilla al Mare (CH) — Italia</p>
                <p>P.IVA: 02840410696 | C.F.: TRNMTT81H02A488S | SDI: M5UXCR1</p>
                <p>Email: info@prismanconsulting.it | Tel: +39 338 252 9370</p>
                <p>Sito istituzionale: <a href="https://www.prismanconsulting.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.prismanconsulting.it</a></p>
              </div>
              <p>Il Sito ha esclusivo scopo divulgativo ed educativo in materia di Bitcoin e delle tecnologie di registro distribuito (blockchain).</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 2 — Natura del Contenuto: Divulgazione, Non Consulenza</h2>
              <p><strong className="text-foreground">2.1</strong> — I contenuti presenti sul Sito hanno esclusivamente finalità informativa e divulgativa. Non costituiscono:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>consulenza finanziaria ai sensi del D.Lgs. 58/1998 (TUF) e della Direttiva MiFID II;</li>
                <li>sollecitazione all'investimento o al disinvestimento;</li>
                <li>raccomandazione personalizzata di acquisto, vendita o detenzione di Bitcoin;</li>
                <li>servizio di gestione di portafoglio o consulenza patrimoniale;</li>
                <li>previsione o proiezione di andamenti di prezzo;</li>
                <li>promozione di prodotti o servizi finanziari soggetti ad autorizzazione.</li>
              </ul>
              <p><strong className="text-foreground">2.2</strong> — Il gestore non è iscritto ad alcun albo di consulenti finanziari, né è autorizzato da Consob, Banca d'Italia o altra autorità di vigilanza.</p>
              <p><strong className="text-foreground">2.3</strong> — Ogni riferimento a Bitcoin deve essere inteso esclusivamente come informazione tecnica, storica o culturale.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 3 — Accettazione delle Condizioni</h2>
              <p>L'accesso e la navigazione sul Sito implicano la lettura e la piena accettazione dei presenti Termini e Condizioni d'Uso. Qualora l'utente non condivida anche solo una delle presenti condizioni, è tenuto a cessare immediatamente l'utilizzo del Sito.</p>
              <p>I presenti Termini possono essere modificati in qualsiasi momento dal gestore, senza obbligo di preavviso.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 4 — Proprietà Intellettuale</h2>
              <p><strong className="text-foreground">4.1</strong> — Tutti i contenuti presenti sul Sito sono di proprietà di Prisman Consulting di Matteo Terenzio o sono stati regolarmente licenziati.</p>
              <p><strong className="text-foreground">4.2</strong> — È vietata la riproduzione, distribuzione, modifica, trasmissione o pubblicazione dei contenuti senza previa autorizzazione scritta, fatta eccezione per l'uso personale e non commerciale.</p>
              <p><strong className="text-foreground">4.3</strong> — Il termine "Bitcoin", il simbolo ₿ e il logo di Bitcoin sono di dominio pubblico. I riferimenti non implicano affiliazione, sponsorizzazione o endorsement.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 5 — Limitazione di Responsabilità</h2>
              <p><strong className="text-foreground">5.1</strong> — Il gestore non garantisce l'accuratezza, la completezza o l'idoneità dei contenuti. Le informazioni sono fornite "così come sono" (as is).</p>
              <p><strong className="text-foreground">5.2</strong> — Il gestore non è responsabile per errori, omissioni, interruzioni, ritardi, virus o danni derivanti dall'uso del Sito.</p>
              <p><strong className="text-foreground">5.3</strong> — Il gestore non è responsabile per decisioni di natura finanziaria prese sulla base dei contenuti del Sito.</p>
              <p><strong className="text-foreground">5.4</strong> — Gli investimenti in criptovalute comportano rischi elevati, inclusa la perdita totale del capitale. La volatilità è estremamente elevata. Nulla di quanto pubblicato costituisce garanzia di rendimento futuro. Le performance passate non sono indicative di quelle future.</p>
              <p><strong className="text-foreground">5.5</strong> — Il gestore non è responsabile per i contenuti di siti terzi raggiungibili tramite link.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 6 — Link e Contenuti di Terze Parti</h2>
              <p>Il Sito può contenere link a siti web di terzi, forniti a solo titolo informativo. Il gestore non controlla, non approva e non è responsabile per tali contenuti. L'inserimento di un link non costituisce raccomandazione.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 7 — Uso Consentito del Sito</h2>
              <p>L'utente si impegna a utilizzare il Sito in modo lecito. In particolare è vietato:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>utilizzare il Sito per scopi commerciali non autorizzati;</li>
                <li>tentare accessi non autorizzati ai sistemi informatici;</li>
                <li>inserire o diffondere contenuti illeciti, diffamatori o offensivi;</li>
                <li>effettuare scraping, data mining o raccolta automatizzata;</li>
                <li>alterare, manomettere o distruggere il Sito.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 8 — Contatti e Community</h2>
              <p>Il Sito offre la possibilità di contattare il gestore per richieste di informazioni e costruzione di network tra appassionati. Tali comunicazioni non costituiscono una relazione di consulenza finanziaria.</p>
              <p>Il gestore si riserva il diritto di non rispondere a richieste relative a consigli di investimento o previsioni di prezzo.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 9 — Legge Applicabile e Foro Competente</h2>
              <p>I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà competente in via esclusiva il Foro di Chieti, salvo diversa disposizione imperativa applicabile ai consumatori (D.Lgs. 206/2005).</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Art. 10 — Contatti</h2>
              <div className="card-bitcoin text-sm">
                <p className="text-foreground font-medium">Prisman Consulting di Matteo Terenzio</p>
                <p>Via Alcione 149 — 66023 Francavilla al Mare (CH) — Italia</p>
                <p>Email: info@prismanconsulting.it | Tel: +39 338 252 9370</p>
              </div>
            </section>

            <div className="border-t border-border pt-6 text-xs text-center">
              © 2026 BitcoinPerTe.it — Un progetto divulgativo di Prisman Consulting
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TerminiPage;
