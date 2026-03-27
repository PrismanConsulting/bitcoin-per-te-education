import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/AuthModal";

const imparaLinks = [
  { label: "Inizia da Zero →", href: "/inizia", highlight: true },
  { label: "separator", href: "" },
  { label: "Cos'è Bitcoin", href: "/bitcoin" },
  { label: "Blockchain", href: "/blockchain" },
  { label: "Mining & Halving", href: "/mining" },
  { label: "separator", href: "" },
  { label: "Glossario", href: "/glossario" },
  { label: "separator", href: "" },
  { label: "Biblioteca Risorse", href: "/risorse" },
];

const esploraLinks = [
  { label: "Terminale", href: "/terminale" },
  { label: "Oracolo dei Blocchi", href: "/oracolo" },
  { label: "Mappa Nodi", href: "/mappa" },
  { label: "Top Holder", href: "/holder" },
];

const communityLinks = [
  { label: "Il Registro →", href: "/registro", highlight: true },
  { label: "separator", href: "" },
  { label: "Notizie Bitcoin", href: "/notizie" },
  { label: "Quiz", href: "/quiz" },
  { label: "separator", href: "" },
  { label: "Scrivici", href: "/community" },
];

const dropdowns = [
  { id: "impara", label: "Impara", links: imparaLinks },
  { id: "esplora", label: "Esplora", links: esploraLinks },
  { id: "community", label: "Community", links: communityLinks },
];

const mobileGroups = [
  { label: "IMPARA", links: [
    { label: "Inizia da Zero →", href: "/inizia", highlight: true },
    { label: "Cos'è Bitcoin", href: "/bitcoin" },
    { label: "Blockchain", href: "/blockchain" },
    { label: "Mining & Halving", href: "/mining" },
    { label: "Glossario", href: "/glossario" },
    { label: "Biblioteca Risorse", href: "/risorse" },
  ]},
  { label: "LIVE", links: [
    { label: "Live", href: "/live", live: true },
  ]},
  { label: "ESPLORA", links: [
    { label: "Terminale", href: "/terminale" },
    { label: "Oracolo", href: "/oracolo" },
    { label: "Mappa", href: "/mappa" },
    { label: "Holder", href: "/holder" },
  ]},
  { label: "COMMUNITY", links: [
    { label: "Il Registro →", href: "/registro", highlight: true },
    { label: "Notizie", href: "/notizie" },
    { label: "Quiz", href: "/quiz" },
    { label: "Scrivici", href: "/community" },
  ]},
];

const ChevronSVG = ({ open }: { open: boolean }) => (
  <svg
    width="10" height="10" viewBox="0 0 10 10" fill="none"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
  >
    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const { user, profile, loading, signOut } = useAuth();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const isDropdownActive = (links: { href: string }[]) =>
    links.some((l) => l.href && location.pathname === l.href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border font-heading">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-lg font-bold tracking-tight shrink-0">
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight leading-none">
              <span className="text-primary">₿</span>
              <span className="text-foreground">BitcoinPerTe</span>
            </span>
            <span className="hidden xl:block text-[10px] text-muted-foreground/50 tracking-widest leading-none mt-0.5">
              divulgazione bitcoin in italiano
            </span>
          </div>
        </Link>

        {/* Desktop */}
        <div ref={navRef} className="hidden lg:flex items-center gap-0.5">
          {/* Home */}
          <Link
            to="/"
            className={`relative text-[14px] px-2.5 py-2 transition-colors whitespace-nowrap ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </Link>

          {/* Dropdowns: Impara, then Live, then Esplora, Community */}
          {/* Impara */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "impara" ? null : "impara")}
              className={`relative text-[14px] px-2.5 py-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
                isDropdownActive(imparaLinks) ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Impara <ChevronSVG open={openMenu === "impara"} />
            </button>
            <AnimatePresence>
              {openMenu === "impara" && (
                <DropdownPanel links={imparaLinks} pathname={location.pathname} />
              )}
            </AnimatePresence>
          </div>

          {/* Live — direct link */}
          <Link
            to="/live"
            className={`relative text-[14px] px-2.5 py-2 transition-colors whitespace-nowrap flex items-center ${
              location.pathname === "/live" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block mr-1.5" />
            Live
          </Link>

          {/* Esplora */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "esplora" ? null : "esplora")}
              className={`relative text-[14px] px-2.5 py-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
                isDropdownActive(esploraLinks) ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Esplora <ChevronSVG open={openMenu === "esplora"} />
            </button>
            <AnimatePresence>
              {openMenu === "esplora" && (
                <DropdownPanel links={esploraLinks} pathname={location.pathname} />
              )}
            </AnimatePresence>
          </div>

          {/* Community */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "community" ? null : "community")}
              className={`relative text-[14px] px-2.5 py-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
                isDropdownActive(communityLinks) ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Community <ChevronSVG open={openMenu === "community"} />
            </button>
            <AnimatePresence>
              {openMenu === "community" && (
                <DropdownPanel links={communityLinks} pathname={location.pathname} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Auth + Badge */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {!loading && !user && (
            <button
              onClick={() => setAuthOpen(true)}
              className="text-[13px] border border-primary/30 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors font-heading"
            >
              Accedi
            </button>
          )}
          {!loading && user && profile && (
            <div className="flex items-center gap-2">
              <Link to="/preferenze" className="text-[13px] font-mono text-primary hover:text-primary/80 transition-colors">
                ₿ {profile.nickname}
              </Link>
              <button
                onClick={signOut}
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                esci
              </button>
            </div>
          )}
          <span className="hidden xl:inline text-[12px] text-primary-foreground bg-primary rounded px-2.5 py-1 font-medium">
            Solo divulgazione · Non consulenza finanziaria
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground p-2"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col px-4 py-4">
              {mobileGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] tracking-widest text-muted-foreground/40 px-0 pt-3 pb-1">
                    {group.label}
                  </p>
                  {group.links.map((l) => (
                    <Link
                      key={l.href}
                      to={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-left text-base py-2 transition-colors block ${
                        location.pathname === l.href
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {"live" in l && l.live && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block mr-1.5" />
                      )}
                      {l.label}
                    </Link>
                  ))}
                </div>
              ))}
              {!loading && !user && (
                <button
                  onClick={() => { setMobileOpen(false); setAuthOpen(true); }}
                  className="text-[13px] border border-primary/30 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors font-heading mt-3 self-start"
                >
                  Accedi
                </button>
              )}
              {!loading && user && profile && (
                <div className="flex items-center gap-3 mt-3">
                  <Link to="/preferenze" onClick={() => setMobileOpen(false)} className="text-[13px] font-mono text-primary">
                    ₿ {profile.nickname}
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="text-[11px] text-muted-foreground">
                    esci
                  </button>
                </div>
              )}
              <span className="text-[12px] text-primary-foreground bg-primary rounded px-2.5 py-1 mt-3 self-start font-medium">
                Solo divulgazione · Non consulenza finanziaria
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </nav>
  );
};

const DropdownPanel = ({ links, pathname }: { links: { label: string; href: string; highlight?: boolean }[]; pathname: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.15 }}
    className="absolute top-full left-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 min-w-[200px] overflow-hidden py-1"
  >
    {links.map((l, i) =>
      l.label === "separator" ? (
        <div key={`sep-${i}`} className="border-t border-border my-1 mx-3" />
      ) : (
        <Link
          key={l.href}
          to={l.href}
          className={`block px-4 py-2.5 text-[14px] transition-colors whitespace-nowrap ${
            l.highlight
              ? "text-primary font-semibold"
              : pathname === l.href
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-card"
          }`}
        >
          {l.label}
        </Link>
      )
    )}
  </motion.div>
);

export default Navbar;
