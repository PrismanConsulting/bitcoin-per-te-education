import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PrivacyModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl">Privacy & Cookie Policy</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-4 mt-4">
          <p className="text-xs">Ultimo aggiornamento: 28/08/2025</p>
          <p className="text-xs">
            Titolare: Prisman Consulting di Matteo Terenzio<br />
            P.IVA: 02840410696 | C.F.: TRNMTT81H02A488S<br />
            Codice univoco: M5UXCR1<br />
            Via Alcione 149 — 66023 Francavilla al Mare (CH)<br />
            Tel: +39 338 252 9370 | info@prismanconsulting.it
          </p>

          <p>
            1. Il sito ha esclusivamente finalità informativa. Non vengono raccolti dati
            personali tramite moduli, registrazioni o sistemi di profilazione automatica.
            Eventuali dati inviati via email verranno trattati solo per rispondere alle
            richieste, nel rispetto del Regolamento UE 2016/679 (GDPR).
          </p>
          <p>
            2. Il sito utilizza solo cookie tecnici necessari al corretto funzionamento
            delle pagine. Non vengono utilizzati cookie di profilazione né cookie di terze
            parti a fini di marketing.
          </p>
          <p>
            3. I cookie tecnici non richiedono il consenso dell'utente ai sensi del
            Provvedimento Garante Privacy 8 maggio 2014 e delle Linee guida cookie
            del 10 giugno 2021.
          </p>
          <p>
            4. L'utente può in qualsiasi momento esercitare i diritti previsti dagli
            artt. 15-22 del GDPR (accesso, rettifica, cancellazione, limitazione,
            opposizione) scrivendo a info@prismanconsulting.it.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyModal;
