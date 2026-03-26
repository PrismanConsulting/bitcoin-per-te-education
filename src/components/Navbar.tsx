import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Bitcoin", href: "/bitcoin" },
  { label: "Blockchain", href: "/blockchain" },
  { label: "Terminale", href: "/terminale" },
  { label: "Live", href: "/live" },
  { label: "Oracolo", href: "/oracolo" },
];

const esploraLinks = [
  { label: "Mining & Halving", href: "/mining" },
  { label: "I Satoshi", href: "/satoshi" },
  { label: "Bitcoin vs Fiat", href: "/fiat" },
  { label: "Holder", href: "/holder" },
  { label: "Notizie", href: "/notizie" },
  { label: "Mappa", href: "/mappa" },
  { label: "Quiz", href: "/quiz" },
  { label: "Glossario", href: "/glossario" },
];

const allMobileLinks = [
  { label: "Home", href: "/" },
  { label: "Cos'è Bitcoin", href: "/bitcoin" },
  { label: "Blockchain", href: "/blockchain" },
  { label: "Mining & Halving", href: "/mining" },
  { label: "I Satoshi", href: "/satoshi" },
  { label: "Bitcoin vs Fiat", href: "/fiat" },
  { label: "Terminale", href: "/terminale" },
  { label: "Live", href: "/live" },
  { label: "Oracolo", href: "/oracolo" },
  { label: "Holder", href: "/holder" },
  { label: "Notizie", href: "/notizie" },
  { label: "Mappa", href: "/mappa" },
  { label: "Quiz", href: "/quiz" },
  { label: "Glossario", href: "/glossario" },
  { label: "Community", href: "/community" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [esploraOpen, setEsploraOpen] = useState(false);
  const location = useLocation();
  const esploraRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (esploraRef.current && !esploraRef.current.contains(e.target as Node)) {
        setEsploraOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setEsploraOpen(false);
    setOpen(false);
  }, [location.pathname]);

  const isEsploraActive = esploraLinks.some((l) => location.pathname === l.href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border font-heading">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-lg font-bold tracking-tight shrink-0">
          <span className="text-primary">₿</span>
          <span className="text-foreground">BitcoinPerTe</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-0.5">
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`relative text-[14px] px-2.5 py-2 transition-colors whitespace-nowrap ${
                location.pathname === l.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.href === "/live" && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block mr-1" />}
              {l.label}
              {location.pathname === l.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* Esplora Dropdown */}
          <div ref={esploraRef} className="relative">
            <button
              onClick={() => setEsploraOpen(!esploraOpen)}
              className={`relative flex items-center gap-1 text-[14px] px-2.5 py-2 transition-colors whitespace-nowrap ${
                isEsploraActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Esplora
              <ChevronDown size={14} className={`transition-transform ${esploraOpen ? "rotate-180" : ""}`} />
              {isEsploraActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {esploraOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 min-w-[180px] rounded-xl border border-border bg-card shadow-lg z-50 py-2"
                >
                  {esploraLinks.map((l) => (
                    <Link
                      key={l.href}
                      to={l.href}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        location.pathname === l.href
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/community"
            className={`relative text-[14px] px-2.5 py-2 transition-colors whitespace-nowrap ${
              location.pathname === "/community"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Community
            {location.pathname === "/community" && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        </div>

        <div className="hidden xl:block shrink-0">
          <span className="text-[12px] text-primary-foreground bg-primary rounded px-2.5 py-1 font-medium">
            Solo divulgazione · Non consulenza finanziaria
          </span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground p-2"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {allMobileLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={`text-left text-base py-2 transition-colors ${
                    location.pathname === l.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.href === "/live" && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block mr-1" />}
                  {l.label}
                </Link>
              ))}
              <span className="text-[12px] text-primary-foreground bg-primary rounded px-2.5 py-1 mt-3 self-start font-medium">
                Solo divulgazione · Non consulenza finanziaria
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
