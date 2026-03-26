import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrivacyModal from "@/components/PrivacyModal";

const STORAGE_KEY = "bitcoinperte_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept(type: "accepted" | "necessary") {
    localStorage.setItem(STORAGE_KEY, type);
    setVisible(false);
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-4 py-4"
          >
            <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
                Usiamo solo cookie tecnici necessari al funzionamento del sito.
                Nessun cookie di tracciamento o profilazione.{" "}
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </button>
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => accept("accepted")}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-heading hover:bg-primary/90 transition-colors"
                >
                  Accetta tutto
                </button>
                <button
                  onClick={() => accept("necessary")}
                  className="border border-border text-muted-foreground px-4 py-2 rounded-lg text-sm font-heading hover:text-foreground transition-colors"
                >
                  Solo necessari
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
};

export default CookieBanner;
