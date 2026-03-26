import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

const FEEDS = [
  { url: "https://bitcoinops.org/feed.xml", source: "Bitcoin Optech" },
  { url: "https://bitcoin.org/en/rss/blog.rss", source: "Bitcoin.org" },
  { url: "https://www.nobsbitcoin.com/rss/", source: "NoBSBitcoin" },
];

const FILTER_WORDS = [
  "$", "€", "price", "prezzo", "pump", "dump",
  "rally", "crash", "prediction", "forecast",
  "bullish", "bearish", "ath", "all-time",
  "surge", "soar", "plunge", "drop", "rise",
  "fall", "$75k", "$80k", "$100k", "75,000",
  "80,000", "100,000", "traders", "trading",
  "invest", "buy", "sell", "profit", "loss",
  "portfolio", "market cap", "capitalizzazione",
  "exchange", "binance", "coinbase", "kraken",
  "bybit", "okx", "etf", "futures", "options",
  "derivat", "leverage", "short", "long",
  "ethereum", "solana", "xrp", "doge",
  "altcoin", "crypto", "token", "nft", "defi",
  "scam", "hack", "stolen", "fraud", "ponzi",
  "rug pull", "exit",
];

interface NewsPost {
  title: string;
  url: string;
  source: string;
  published_at: Date;
}

interface Comment {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
  user_id: string;
  news_url: string;
}

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins} min fa`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ore fa`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "ieri";
  return `${days} giorni fa`;
}

function passesFilter(title: string): boolean {
  const lower = title.toLowerCase();
  return !FILTER_WORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const NotizePage = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const { user, profile } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commentSending, setCommentSending] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const allPosts: NewsPost[] = [];
        const results = await Promise.allSettled(
          FEEDS.map((feed) =>
            fetch(RSS2JSON + encodeURIComponent(feed.url))
              .then((r) => r.json())
              .then((data) => {
                if (data.status === "ok" && data.items) {
                  return data.items.map((item: any) => ({
                    title: item.title?.trim() ?? "",
                    url: item.link ?? "",
                    source: feed.source,
                    published_at: item.pubDate ? new Date(item.pubDate) : new Date(),
                  }));
                }
                return [];
              })
          )
        );
        for (const r of results) {
          if (r.status === "fulfilled") allPosts.push(...r.value);
        }
        allPosts.sort((a, b) => b.published_at.getTime() - a.published_at.getTime());
        setPosts(allPosts);
        setLastUpdate(new Date());
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    fetchNews();
    const iv = setInterval(fetchNews, 1_800_000);
    return () => clearInterval(iv);
  }, []);

  const filtered = useMemo(
    () => posts.filter((p) => passesFilter(p.title)).slice(0, 20),
    [posts]
  );

  // Load comment counts after posts load
  useEffect(() => {
    if (filtered.length === 0) return;
    const urls = filtered.map((p) => p.url).filter(Boolean);
    if (urls.length === 0) return;
    supabase
      .from("news_comments")
      .select("news_url")
      .in("news_url", urls)
      .eq("is_visible", true)
      .then(({ data }) => {
        if (!data) return;
        const counts: Record<string, number> = {};
        data.forEach((row: any) => {
          counts[row.news_url] = (counts[row.news_url] || 0) + 1;
        });
        setCommentCounts(counts);
      });
  }, [filtered]);

  async function toggleComments(url: string) {
    if (expandedUrl === url) {
      setExpandedUrl(null);
      return;
    }
    setExpandedUrl(url);
    if (!comments[url]) {
      const { data } = await supabase
        .from("news_comments")
        .select("*")
        .eq("news_url", url)
        .eq("is_visible", true)
        .order("created_at", { ascending: true });
      setComments((prev) => ({ ...prev, [url]: (data as Comment[]) || [] }));
    }
  }

  async function submitComment(url: string, title: string) {
    const content = commentInputs[url];
    if (!content?.trim() || !user || !profile) return;
    setCommentSending(true);
    const { data, error: err } = await supabase
      .from("news_comments")
      .insert({
        user_id: user.id,
        nickname: profile.nickname,
        news_url: url,
        news_title: title,
        content: content.trim(),
      })
      .select()
      .single();
    if (!err && data) {
      setComments((prev) => ({ ...prev, [url]: [...(prev[url] || []), data as Comment] }));
      setCommentCounts((prev) => ({ ...prev, [url]: (prev[url] || 0) + 1 }));
      setCommentInputs((prev) => ({ ...prev, [url]: "" }));
    }
    setCommentSending(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-16"
    >
      <SEO
        title="Notizie Bitcoin — Solo Protocollo e Sviluppo | BitcoinPerTe"
        description="Le ultime notizie Bitcoin filtrate automaticamente. Solo protocollo, mining, sviluppo. Zero prezzi, zero speculazione. Aggiornamento ogni 30 minuti."
        path="/notizie"
      />

      <div className="container mx-auto px-4 max-w-3xl py-12 space-y-10">
        <div className="text-center space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary/60">Notizie dalla Rete</p>
          <h1 className="text-2xl md:text-4xl font-bold font-heading text-foreground">Bitcoin oggi</h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Notizie filtrate automaticamente. Solo protocollo, mining e sviluppo. Zero speculazione, zero prezzi.
          </p>
          <span className="inline-block text-[11px] text-primary-foreground bg-primary rounded px-3 py-1 font-medium">
            Fonti: Bitcoin Optech · Bitcoin.org · NoBSBitcoin · Filtro automatico attivo
          </span>
          {lastUpdate && (
            <p className="text-[11px] text-muted-foreground/60">
              Ultimo aggiornamento: {lastUpdate.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-surface h-20 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="card-surface rounded-xl p-8 text-center">
            <p className="text-muted-foreground">
              Dati temporaneamente non disponibili. La rete Bitcoin continua a funzionare.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-surface rounded-xl p-8 text-center border border-border">
            <p className="text-muted-foreground leading-relaxed">
              Il filtro ha rimosso tutte le notizie delle ultime ore perché contenevano riferimenti a prezzi o speculazione.<br />
              La rete Bitcoin continua a funzionare — un blocco ogni ~10 minuti, come sempre.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((post, i) => (
              <div key={i} className="py-5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] text-primary font-medium">{post.source}</span>
                  <span className="text-[11px] text-muted-foreground/50">·</span>
                  <span className="text-[11px] text-muted-foreground/50">{relativeTime(post.published_at)}</span>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading font-bold text-foreground hover:text-primary transition-colors text-base leading-snug block"
                >
                  {post.title}
                </a>

                {/* Comments toggle */}
                <button
                  onClick={() => toggleComments(post.url)}
                  className="text-[12px] text-muted-foreground/60 hover:text-primary transition-colors mt-1 flex items-center gap-1"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2h12v9H9l-3 3v-3H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                  {commentCounts[post.url] || 0} commenti
                </button>

                {/* Expanded comments */}
                <AnimatePresence>
                  {expandedUrl === post.url && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-3 pl-4 border-l-2 border-border space-y-3"
                    >
                      {(comments[post.url] || []).map((c) => (
                        <div key={c.id} className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-primary">₿ {c.nickname}</span>
                            <span className="text-[10px] text-muted-foreground/50">
                              {relativeTime(new Date(c.created_at))}
                            </span>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed">{c.content}</p>
                        </div>
                      ))}
                      {(comments[post.url] || []).length === 0 && (
                        <p className="text-xs text-muted-foreground/50">Nessun commento ancora.</p>
                      )}

                      {user && profile ? (
                        <div className="flex gap-2 pt-1">
                          <input
                            type="text"
                            placeholder="Il tuo commento..."
                            maxLength={500}
                            value={commentInputs[post.url] || ""}
                            onChange={(e) =>
                              setCommentInputs((prev) => ({ ...prev, [post.url]: e.target.value }))
                            }
                            className="flex-1 bg-transparent border border-border rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                          />
                          <button
                            onClick={() => submitComment(post.url, post.title)}
                            disabled={!commentInputs[post.url]?.trim() || commentSending}
                            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-heading hover:bg-primary/90 transition-colors disabled:opacity-50"
                          >
                            Pubblica
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAuthOpen(true)}
                          className="text-xs text-primary hover:underline"
                        >
                          Accedi per commentare →
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        <div className="card-surface rounded-xl p-6 border-l-2 border-l-primary">
          <h3 className="text-base font-bold text-foreground mb-2">Come funziona il filtro</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Questo feed filtra automaticamente notizie su prezzi, speculazione e altcoin.
            Rimangono solo notizie tecniche su Bitcoin: protocollo, mining, sviluppo, adozione reale.
          </p>
        </div>

        <p className="text-center text-[12px] text-muted-foreground/60 pb-4">
          Dati da RSS feed pubblici via rss2json.com · Filtro automatico client-side · Solo uso divulgativo
        </p>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </motion.div>
  );
};

export default NotizePage;
