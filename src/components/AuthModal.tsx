import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import PrivacyModal from "@/components/PrivacyModal";
import TermsModal from "@/components/TermsModal";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

type Tab = "register" | "login";

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gdprChecked, setGdprChecked] = useState(false);
  const [newsletterChecked, setNewsletterChecked] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  function reset() {
    setEmail(""); setPassword(""); setNickname("");
    setGdprChecked(false); setNewsletterChecked(false);
    setError(""); setSuccess("");
  }

  function switchTab(t: Tab) {
    setTab(t); reset();
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(""); setSubmitting(true);

    if (!nickname || !/^[a-zA-Z0-9_]+$/.test(nickname)) {
      setError("Nickname: solo lettere, numeri e underscore."); setSubmitting(false); return;
    }
    if (nickname.length > 20) {
      setError("Nickname massimo 20 caratteri."); setSubmitting(false); return;
    }
    if (password.length < 8) {
      setError("Password di almeno 8 caratteri."); setSubmitting(false); return;
    }
    if (!gdprChecked) {
      setError("Devi accettare la Privacy Policy e i Termini d'uso."); setSubmitting(false); return;
    }

    // Check nickname uniqueness via secure RPC
    const { data: taken } = await supabase.rpc('is_nickname_taken', { check_nickname: nickname });
    if (taken) {
      setError("Nickname già preso. Scegline un altro."); setSubmitting(false); return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin }
    });

    if (signUpError) {
      if (signUpError.message.includes("already registered")) {
        setError("Email già registrata. Prova ad accedere.");
      } else {
        setError(signUpError.message);
      }
      setSubmitting(false); return;
    }

    if (signUpData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: signUpData.user.id,
        nickname,
        newsletter_opt_in: newsletterChecked,
        gdpr_consent: true,
        gdpr_consent_date: new Date().toISOString(),
      });
      if (profileError) {
        setError("Errore nella creazione del profilo."); setSubmitting(false); return;
      }
    }

    setSuccess("✅ Controlla la tua email per confermare la registrazione");
    setSubmitting(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(""); setSubmitting(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      setError("Email o password non corretti.");
      setSubmitting(false); return;
    }
    setSubmitting(false);
    onClose();
  }

  async function handleForgotPassword() {
    if (!email) { setError("Inserisci la tua email prima."); return; }
    setError(""); setSubmitting(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    setSuccess("✅ Email di reset inviata");
    setSubmitting(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); reset(); } }}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-foreground text-center text-xl">
              {tab === "register" ? "Registrati" : "Accedi"}
            </DialogTitle>
          </DialogHeader>

          {/* Tabs */}
          <div className="flex border-b border-border mb-4">
            <button
              onClick={() => switchTab("login")}
              className={`flex-1 py-2 text-sm font-heading transition-colors ${
                tab === "login" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              }`}
            >
              Accedi
            </button>
            <button
              onClick={() => switchTab("register")}
              className={`flex-1 py-2 text-sm font-heading transition-colors ${
                tab === "register" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              }`}
            >
              Registrati
            </button>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 text-sm text-primary">
              {success}
            </div>
          )}

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs">Email</Label>
                <Input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="bg-card border-border focus:border-primary/50 mt-1"
                  placeholder="la-tua@email.it"
                />
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Password</Label>
                <Input
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="bg-card border-border focus:border-primary/50 mt-1"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit" disabled={submitting}
                className="w-full bg-primary text-primary-foreground font-heading py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {submitting ? "Accesso..." : "Accedi →"}
              </button>
              <button
                type="button" onClick={handleForgotPassword}
                className="w-full text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Password dimenticata?
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs">Email</Label>
                <Input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="bg-card border-border focus:border-primary/50 mt-1"
                  placeholder="la-tua@email.it"
                />
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Password (min 8 caratteri)</Label>
                <Input
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="bg-card border-border focus:border-primary/50 mt-1"
                  placeholder="••••••••"
                  minLength={8}
                />
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Nickname</Label>
                <Input
                  type="text" required value={nickname}
                  onChange={(e) => setNickname(e.target.value.slice(0, 20))}
                  className="bg-card border-border focus:border-primary/50 mt-1 font-mono"
                  placeholder="satoshi_fan_42"
                  maxLength={20}
                  pattern="^[a-zA-Z0-9_]+$"
                />
                <p className="text-[11px] text-muted-foreground/60 mt-1">Solo lettere, numeri e underscore</p>
              </div>

              {/* GDPR Checkbox */}
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={gdprChecked}
                  onCheckedChange={(c) => setGdprChecked(c === true)}
                  className="mt-0.5"
                />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ho letto e accetto la{" "}
                  <button type="button" onClick={() => setPrivacyOpen(true)} className="text-primary hover:underline">
                    Privacy Policy
                  </button>{" "}
                  e i{" "}
                  <button type="button" onClick={() => setTermsOpen(true)} className="text-primary hover:underline">
                    Termini d'uso
                  </button>
                  . Acconsento al trattamento dei dati personali ai sensi del GDPR.
                </p>
              </div>

              {/* Newsletter Checkbox */}
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={newsletterChecked}
                  onCheckedChange={(c) => setNewsletterChecked(c === true)}
                  className="mt-0.5"
                />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Voglio ricevere "Il Blocco della Settimana" (max 1 email/settimana, disiscrizione sempre possibile)
                </p>
              </div>

              <button
                type="submit" disabled={submitting || !gdprChecked}
                className="w-full bg-primary text-primary-foreground font-heading py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {submitting ? "Registrazione..." : "Registrati →"}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
};

export default AuthModal;
