import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Cos'è Bitcoin", href: "#cose-bitcoin" },
  { label: "Blockchain", href: "#blockchain" },
  { label: "Mining & Halving", href: "#mining" },
  { label: "I Satoshi", href: "#satoshi" },
  { label: "Bitcoin vs Fiat", href: "#fiat" },
  { label: "Quiz", href: "#quiz" },
  { label: "Community", href: "#community" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    const onScroll = () => {
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) {
      const top = el.offsetTop - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border font-heading">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" onClick={() => handleClick("#home")} className="text-lg font-bold tracking-tight">
          <span className="text-primary">₿</span>
          <span className="text-foreground">BitcoinPerTe</span>
        </a>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className={`relative text-[13px] px-3 py-2 transition-colors ${
                active === l.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
              {active === l.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="hidden xl:block">
          <span className="text-[11px] text-primary border border-primary/20 rounded-full px-3 py-1 font-medium">
            #divulgazione
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
                <button
                  key={l.href}
                  onClick={() => handleClick(l.href)}
                  className={`text-left text-sm py-2 transition-colors ${
                    active === l.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <span className="text-[11px] text-primary border border-primary/20 rounded-full px-3 py-1 mt-3 self-start font-medium">
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
