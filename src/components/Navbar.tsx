import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Cos'è Bitcoin", href: "#cosè-bitcoin" },
  { label: "Blockchain", href: "#blockchain" },
  { label: "Mining & Halving", href: "#mining" },
  { label: "I Satoshi", href: "#satoshi" },
  { label: "Quiz", href: "#quiz" },
  { label: "Community", href: "#community" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="text-xl font-bold tracking-tight">
          <span className="text-primary">₿</span>itcoinPerTe
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center">
          <span className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1">
            🔶 Solo divulgazione — non consulenza finanziaria
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground p-2"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-primary py-2 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <span className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 mt-3 self-start">
                🔶 Solo divulgazione
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
