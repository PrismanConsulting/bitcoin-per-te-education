import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Cos'è Bitcoin", href: "/bitcoin" },
  { label: "Blockchain", href: "/blockchain" },
  { label: "Mining & Halving", href: "/mining" },
  { label: "I Satoshi", href: "/satoshi" },
  { label: "Bitcoin vs Fiat", href: "/fiat" },
  { label: "Terminale", href: "/terminale" },
  { label: "Quiz", href: "/quiz" },
  { label: "Community", href: "/community" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border font-heading">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-lg font-bold tracking-tight shrink-0">
          <span className="text-primary">₿</span>
          <span className="text-foreground">BitcoinPerTe</span>
        </Link>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`relative text-[13px] px-2.5 py-2 transition-colors whitespace-nowrap ${
                location.pathname === l.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
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
        </div>

        <div className="hidden xl:block shrink-0">
          <span className="text-[11px] text-primary-foreground bg-primary rounded px-2.5 py-1 font-medium">
            Solo divulgazione · Non consulenza finanziaria
          </span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden text-foreground p-2"
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
            className="xl:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((l) => (
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
                  {l.label}
                </Link>
              ))}
              <span className="text-[12px] text-primary border border-primary/20 rounded-full px-3 py-1 mt-3 self-start font-medium">
                #divulgazione
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
