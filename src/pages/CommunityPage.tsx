import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PrivacyModal from "@/components/PrivacyModal";
import TermsModal from "@/components/TermsModal";
import AuthModal from "@/components/AuthModal";
import SEO from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "adesso";
  if (mins < 60) return `${mins} min fa`;
  if (hours < 24) return `${hours}h fa`;
  if (days === 1) return "ieri";
  return `${days} giorni fa`;
}

interface WallMessage {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
  user_id: string;
}

const CommunityPage = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, profile } = useAuth();

  const [messages, setMessages] = useState<WallMessage[]>([]);
  const [wallContent, setWallContent] = useState("");
  const [wallSending, setWallSending] = useState(false);

  useEffect(() => {
    supabase
      .from("wall_messages")
      .select("*")
      .eq("is_visible", true)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (data) setMessages(data as WallMessage[]);
      });

    const channel = supabase
      .channel("wall")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "wall_messages" }, (payload) => {
        setMessages((prev) => [payload.new as WallMessage, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function handleWallSubmit() {
    if (!wallContent.trim() || !user || !profile) return;
    setWallSending(true);
    const { error } = await supabase.from("wall_messages").insert({
      user_id: user.id,
      nickname: profile.nickname,
      content: wallContent.trim(),
    });
    if (!error) setWallContent("");
    setWallSending(false);
  }

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/matteoterenzio/" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16"
    >
      <SEO
        title="Community BitcoinPerTe — Progetto Editoriale Indipendente"
        description="BitcoinPerTe è un progetto di Prisman Consulting per la divulgazione di Bitcoin in Italia. Contattaci per collaborazioni e scambio di idee."
        path="/community"
      />
      <div className="container mx-auto px-4 max-w-6xl py-12 space-y-16">
        {/* WALL DELLA COMMUNITY */}
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-[11px] uppercase tracking-[0.3em] text-primary/60">WALL DELLA COMMUNITY</p>
            <h2 className="text-2xl font-bold font-heading text-foreground">Perché Bitcoin per te?</h2>
            <p className="text-muted-foreground">Lascia il tuo pensiero. 280 caratteri. Pubblico.</p>
          </div>

          {user && profile ? (
            <div className="card-surface p-4 rounded-xl space-y-3">
              <textarea
                value={wallContent}
                onChange={(e) => setWallContent(e.target.value.slice(0, 280))}
                placeholder="Scrivi il tuo pensiero su Bitcoin..."
                className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none min-h-[80px]"
                maxLength={280}
              />
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono ${wallContent.length > 260 ? "text-destructive" : "text-muted-foreground/60"}`}>
                  {wallContent.length} / 280
                </span>
                <button
                  onClick={handleWallSubmit}
                  disabled={!wallContent.trim() || wallSending}
                  className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-heading hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {wallSending ? "Invio..." : "Pubblica →"}
                </button>
              </div>
            </div>
          ) : (
            <div className="card-surface p-4 rounded-xl text-center space-y-3">
              <p className="text-muted-foreground">Registrati per lasciare un messaggio sul wall</p>
              <button
                onClick={() => setAuthOpen(true)}
                className="border border-primary/30 text-primary px-4 py-2 rounded-lg text-sm hover:bg-primary/10 transition-colors"
              >
                Accedi / Registrati
              </button>
            </div>
          )}

          <div className="space-y-3">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-surface p-4 rounded-xl"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-sm text-primary">₿ {msg.nickname}</span>
                  <span className="text-xs text-muted-foreground">{timeAgo(msg.created_at)}</span>
                </div>
                <p className="text-foreground text-base leading-relaxed">{msg.content}</p>
              </motion.div>
            ))}
            {messages.length === 0 && (
              <p className="text-center text-sm text-muted-foreground/50 py-8">
                Nessun messaggio ancora. Sii il primo!
              </p>
            )}
          </div>
        </div>

        {/* CONTATTI + INFO */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Project */}
          <div className="space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary/60 mb-2">IL PROGETTO</p>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
                Un progetto editoriale indipendente
              </h2>
            </div>
            <p className="text-base text-muted-foreground leading-[1.7]">
              BitcoinPerTe nasce dall'entusiasmo di Prisman Consulting per la tecnologia Bitcoin.
              Non un servizio finanziario, non una piattaforma di trading. Un luogo dove approfondire,
              confrontarsi e costruire una community di persone che vogliono capire davvero.
            </p>
            <div className="border-t border-border pt-4 space-y-1">
              <p className="text-[14px] text-muted-foreground">Prisman Consulting · Francavilla al Mare, Abruzzo</p>
              <a href="https://prismanconsulting.it" target="_blank" rel="noopener noreferrer" className="text-[14px] text-primary hover:underline inline-flex items-center gap-1">
                prismanconsulting.it <ExternalLink size={10} />
              </a>
              <p className="text-[14px] text-muted-foreground">info@prismanconsulting.it</p>
              <p className="text-[14px] text-muted-foreground">
                <a href="tel:+393382529370" className="hover:text-primary transition-colors">+39 338 25 29 370</a>
              </p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-[14px] text-muted-foreground border border-border rounded px-2.5 py-1 hover:border-primary/40 hover:text-primary transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right - Contact buttons */}
          <div className="card-surface p-6">
            <h3 className="text-xl font-bold font-heading text-foreground mb-1">Scrivici</h3>
            <p className="text-base text-muted-foreground mb-5">Scegli il canale che preferisci. Rispondiamo sempre.</p>
            <div className="space-y-3">
              <a href="https://wa.me/393382529370?text=Ciao%2C+ti+scrivo+da+bitcoinperte.it" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 card-surface rounded-xl hover:border-primary/30 transition-colors w-full text-left">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
                  <path d="M6 26l1.5-5.5A11 11 0 1122 25l-5.5 1.5L6 26z" stroke="currentColor" className="text-primary" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">Scrivici su WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Messaggio diretto · Solo divulgazione</p>
                </div>
              </a>
              <a href="mailto:info@prismanconsulting.it?subject=Contatto da bitcoinperte.it"
                className="flex items-center gap-4 p-4 card-surface rounded-xl hover:border-primary/30 transition-colors w-full text-left">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
                  <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
                  <path d="M4 10l12 8 12-8" stroke="currentColor" className="text-primary" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">Scrivici via Email</p>
                  <p className="text-xs text-muted-foreground">info@prismanconsulting.it</p>
                </div>
              </a>
            </div>
            <p className="text-[14px] text-muted-foreground mt-4">
              Dati usati solo per rispondere ·{" "}
              <button onClick={() => setPrivacyOpen(true)} className="text-primary hover:underline">Privacy Policy</button>{" · "}
              <button onClick={() => setTermsOpen(true)} className="text-primary hover:underline">Termini d'uso</button>
            </p>
          </div>
        </div>
      </div>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </motion.div>
  );
};

export default CommunityPage;
