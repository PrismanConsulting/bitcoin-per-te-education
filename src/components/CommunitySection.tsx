import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CommunitySection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Messaggio inviato!",
      description: "Grazie per averci contattato. Ti risponderemo al più presto.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="community" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          Entra nella <span className="text-primary">Community</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mb-12">
          Siamo appassionati, non promotori. Condividiamo conoscenza, non rendimenti.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="card-bitcoin"
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Il tuo messaggio"
                rows={4}
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
              <Button type="submit" className="bg-gradient-bitcoin text-primary-foreground hover:opacity-90">
                <Send size={16} className="mr-2" /> Invia
              </Button>
            </div>

            <div className="mt-4 text-sm text-muted-foreground space-y-1">
              <p>✉️ info@prismanconsulting.it</p>
              <a href="https://prismanconsulting.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                prismanconsulting.it
              </a>
              <p className="text-xs mt-2">
                Non ti invieremo mai offerte di investimento. Solo divulgazione e aggiornamenti educativi.
              </p>
            </div>
          </motion.form>

          {/* Chi siamo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-bitcoin"
          >
            <h3 className="text-xl font-semibold mb-4">Chi siamo</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              BitcoinPerTe.it è un progetto di divulgazione di{" "}
              <a href="https://prismanconsulting.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Prisman Consulting
              </a>
              , una società di consulenza di Francavilla al Mare (Abruzzo).
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-4">
              Siamo appassionati di Bitcoin, tecnologia e innovazione.
              Non siamo consulenti finanziari. Questo progetto nasce dall'entusiasmo
              per una tecnologia che riteniamo rilevante, non da interessi commerciali
              legati ai mercati finanziari.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
