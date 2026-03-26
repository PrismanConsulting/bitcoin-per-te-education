import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

const FEEDS = [
  { url: "https://bitcoinmagazine.com/feed", source: "Bitcoin Magazine" },
  { url: "https://cointelegraph.com/rss/tag/bitcoin", source: "Cointelegraph" },
  { url: "https://www.theblock.co/rss.xml", source: "The Block" },
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
            Aggiornamento ogni 30 min · Filtro automatico attivo · Fonti: Bitcoin Magazine, Cointelegraph, The Block
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
    </motion.div>
  );
};

export default NotizePage;
