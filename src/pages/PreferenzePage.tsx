import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

const PreferenzePage = () => {
  const { user, profile, loading, signOut, refetchProfile } = useAuth();
  const navigate = useNavigate();
  const [newsletterOn, setNewsletterOn] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) setNewsletterOn(profile.newsletter_opt_in);
  }, [profile]);

  async function toggleNewsletter() {
    if (!user) return;
    const newVal = !newsletterOn;
    setNewsletterOn(newVal);
    await supabase.from("profiles").update({ newsletter_opt_in: newVal }).eq("id", user.id);
  }

  async function handleDeleteAccount() {
    if (confirmText !== "CANCELLA" || !user) return;
    setDeleting(true);
    await supabase.from("profiles").update({
      deleted_at: new Date().toISOString(),
      nickname: `utente_cancellato_${user.id.slice(0, 6)}`,
    }).eq("id", user.id);
    await signOut();
    navigate("/");
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const memberDate = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title="Preferenze — Il tuo profilo | BitcoinPerTe"
        description="Gestisci il tuo profilo, la newsletter e le preferenze del tuo account BitcoinPerTe."
        path="/preferenze"
      />
      <div className="container mx-auto px-4 py-24 max-w-xl space-y-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Preferenze</h1>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-2">
          <p className="text-2xl font-mono font-bold text-primary">₿ {profile.nickname}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <p className="text-xs text-muted-foreground/60">Membro dal {memberDate}</p>
        </div>

        {/* Newsletter Card */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading font-semibold text-foreground">Il Blocco della Settimana</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Una email ogni mercoledì con notizie tecniche Bitcoin, il dato della settimana e la profezia del blocco.
              </p>
            </div>
            <button
              onClick={toggleNewsletter}
              className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                newsletterOn ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-background rounded-full transition-transform ${
                  newsletterOn ? "left-6" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card border border-destructive/30 rounded-xl p-6 space-y-3">
          <p className="font-heading font-semibold text-destructive">Zona pericolosa</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            La cancellazione è irreversibile. I tuoi messaggi rimarranno anonimi.
          </p>
          <button
            onClick={() => setDeleteOpen(true)}
            className="bg-destructive/10 text-destructive border border-destructive/30 px-4 py-2 rounded-lg text-sm font-heading hover:bg-destructive/20 transition-colors"
          >
            Cancella account
          </button>
        </div>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading">Sei assolutamente sicuro?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Scrivi <span className="font-mono text-destructive font-bold">CANCELLA</span> per confermare.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="bg-card border-border font-mono"
            placeholder="Scrivi CANCELLA"
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border text-muted-foreground">Annulla</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={confirmText !== "CANCELLA" || deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Eliminazione..." : "Conferma cancellazione"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default PreferenzePage;
