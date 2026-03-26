import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/AuthModal";
import SEO from "@/components/SEO";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CellaData {
  id: number;
  nickname: string;
  frase: string;
  color: string;
  claimed_at: string;
}

const TOTAL_CELLS = 21000;
const ERA_SIZE = 210;
const CELL_SIZE_DESKTOP = 16;
const CELL_SIZE_MOBILE = 12;
const GAP = 2;

const COLOR_SWATCHES = [
  "#F7931A",
  "#1D9E75",
  "#7F77DD",
  "#378ADD",
  "#D85A30",
  "#888780",
];

function getCellCost(cellId: number): number {
  if (cellId <= 210) return 0;
  if (cellId <= 420) return 1;
  if (cellId <= 630) return 2;
  if (cellId <= 840) return 4;
  if (cellId <= 1050) return 8;
  if (cellId <= 1260) return 16;
  if (cellId <= 1470) return 32;
  const era = Math.floor((cellId - 1) / ERA_SIZE);
  return Math.pow(2, era - 1);
}

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "ora";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m fa`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h fa`;
  return `${Math.floor(seconds / 86400)}g fa`;
}

const RegistroPage = () => {
  const { user, profile } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [cells, setCells] = useState<Map<number, CellaData>>(new Map());
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [frase, setFrase] = useState("");
  const [color, setColor] = useState(COLOR_SWATCHES[0]);
  const [satBalance, setSatBalance] = useState(1000);
  const [saving, setSaving] = useState(false);
  const [recentAdoptions, setRecentAdoptions] = useState<CellaData[]>([]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; cell: CellaData } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [colsCount, setColsCount] = useState(0);
  const [cellSize, setCellSize] = useState(CELL_SIZE_DESKTOP);

  // Fetch cells
  useEffect(() => {
    const fetchCells = async () => {
      const { data } = await supabase
        .from("registro_celle")
        .select("id, nickname, frase, color, claimed_at")
        .order("id");
      if (data) {
        const map = new Map<number, CellaData>();
        data.forEach((c: any) => map.set(c.id, c));
        setCells(map);
        // recent adoptions: last 10 by claimed_at desc
        const sorted = [...data].sort((a: any, b: any) =>
          new Date(b.claimed_at).getTime() - new Date(a.claimed_at).getTime()
        );
        setRecentAdoptions(sorted.slice(0, 10));
      }
    };
    fetchCells();
  }, []);

  // Fetch sat_balance
  useEffect(() => {
    if (!user) return;
    const fetchBalance = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("sat_balance")
        .eq("id", user.id)
        .single();
      if (data && (data as any).sat_balance != null) {
        setSatBalance((data as any).sat_balance);
      }
    };
    fetchBalance();
  }, [user]);

  // Realtime
  useEffect(() => {
    const channel = supabase
      .channel("registro")
      .on(
        "postgres_changes" as any,
        { event: "INSERT", schema: "public", table: "registro_celle" },
        (payload: any) => {
          const newCell = payload.new as CellaData;
          setCells((prev) => {
            const next = new Map(prev);
            next.set(newCell.id, newCell);
            return next;
          });
          setRecentAdoptions((prev) => [newCell, ...prev].slice(0, 10));
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  // Calculate cols and draw canvas
  const updateCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;
    const size = isMobile ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP;
    setCellSize(size);
    const step = size + GAP;
    const containerWidth = container.clientWidth;
    const cols = Math.floor(containerWidth / step);
    if (cols <= 0) return;
    setColsCount(cols);
    const rows = Math.ceil(TOTAL_CELLS / cols);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = cols * step * dpr;
    canvas.height = rows * step * dpr;
    canvas.style.width = `${cols * step}px`;
    canvas.style.height = `${rows * step}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cols * step, rows * step);

    for (let i = 0; i < TOTAL_CELLS; i++) {
      const cellId = i + 1;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * step;
      const y = row * step;

      const cellData = cells.get(cellId);
      if (cellData) {
        ctx.fillStyle = cellData.color;
        ctx.globalAlpha = 0.8;
      } else {
        ctx.fillStyle = "#141414";
        ctx.globalAlpha = 1;
      }
      ctx.fillRect(x, y, size, size);
    }
    ctx.globalAlpha = 1;
  }, [cells]);

  useEffect(() => {
    updateCanvas();
    const handleResize = () => updateCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCanvas]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const step = cellSize + GAP;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / step);
    const row = Math.floor(y / step);
    const cellId = row * colsCount + col + 1;
    if (cellId >= 1 && cellId <= TOTAL_CELLS) {
      setSelectedCell(cellId);
      setFrase("");
      setColor(COLOR_SWATCHES[0]);
      setModalOpen(true);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const step = cellSize + GAP;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / step);
    const row = Math.floor(y / step);
    const cellId = row * colsCount + col + 1;
    const cellData = cells.get(cellId);
    if (cellData) {
      setTooltip({ x: e.clientX, y: e.clientY, cell: cellData });
    } else {
      setTooltip(null);
    }
  };

  const handleAdopt = async () => {
    if (!user || !profile || selectedCell === null) return;
    const cost = getCellCost(selectedCell);
    if (cost > satBalance) return;

    setSaving(true);
    // Insert cell
    const { error: insertError } = await supabase
      .from("registro_celle")
      .insert({
        id: selectedCell,
        user_id: user.id,
        nickname: profile.nickname,
        frase,
        sat_cost: cost,
        color,
      } as any);

    if (insertError) {
      setSaving(false);
      return;
    }

    // Deduct sat_balance
    if (cost > 0) {
      await supabase
        .from("profiles")
        .update({ sat_balance: satBalance - cost } as any)
        .eq("id", user.id);
      setSatBalance((prev) => prev - cost);
    }

    setModalOpen(false);
    setSaving(false);
  };

  const occupiedCount = cells.size;
  const freeCellsLeft = Math.max(0, 210 - occupiedCount);
  // Find next free cell cost
  let nextPrice = 0;
  for (let i = 1; i <= TOTAL_CELLS; i++) {
    if (!cells.has(i)) {
      nextPrice = getCellCost(i);
      break;
    }
  }

  const selectedCellData = selectedCell ? cells.get(selectedCell) : null;
  const selectedCost = selectedCell ? getCellCost(selectedCell) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-20 pb-12"
    >
      <SEO
        title="Il Registro dei 21.000 — Lascia il tuo Segno | BitcoinPerTe"
        description="21.000 celle. Una per ogni migliaio di Bitcoin. Adotta la tua cella, lascia una frase. Le prime 210 sono gratis. Il prezzo raddoppia come l'halving."
        path="/registro"
      />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="label-section">IL REGISTRO</p>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground leading-tight">
            21.000 Celle.{" "}
            <span className="text-primary">Una per ogni migliaio di Bitcoin.</span>
          </h1>
          <p className="text-muted-foreground text-lg mt-3 max-w-2xl">
            Lascia il tuo segno nel registro. Le prime 210 celle sono gratuite.
            Il prezzo raddoppia ogni 210 celle — come l'halving.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="card-surface p-3 text-center">
              <p className="font-mono text-lg font-bold text-foreground">
                {occupiedCount.toLocaleString("it-IT")} / 21.000
              </p>
              <p className="text-[13px] text-muted-foreground">Celle occupate</p>
            </div>
            <div className="card-surface p-3 text-center">
              <p className="font-mono text-lg font-bold text-foreground">
                {freeCellsLeft}
              </p>
              <p className="text-[13px] text-muted-foreground">Celle gratuite rimaste</p>
            </div>
            <div className="card-surface p-3 text-center">
              <p className="font-mono text-lg font-bold text-primary">
                {nextPrice} sat
              </p>
              <p className="text-[13px] text-muted-foreground">Prossimo prezzo</p>
            </div>
          </div>

          <p className="text-[12px] text-muted-foreground mt-3 bg-card border border-border rounded px-3 py-1.5 inline-block">
            Solo uso simbolico · Nessuna transazione reale · Nessuna criptovaluta
          </p>
        </div>

        {/* Canvas Grid */}
        <div ref={containerRef} className="relative w-full overflow-hidden mb-8">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={() => setTooltip(null)}
            className="cursor-pointer"
          />
          {/* Tooltip */}
          {tooltip && (
            <div
              className="fixed z-50 bg-card border border-border rounded-lg shadow-lg px-3 py-2 pointer-events-none"
              style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
            >
              <p className="text-sm font-mono text-primary">₿ {tooltip.cell.nickname}</p>
              <p className="text-sm text-muted-foreground">"{tooltip.cell.frase}"</p>
              <p className="text-[11px] text-muted-foreground">Cella #{tooltip.cell.id}</p>
            </div>
          )}
        </div>

        {/* Recent Adoptions */}
        <section className="mb-12">
          <h2 className="text-xl font-bold font-heading text-foreground mb-4">Ultime adozioni</h2>
          <div className="space-y-2">
            {recentAdoptions.length === 0 && (
              <p className="text-muted-foreground text-sm">Nessuna adozione ancora. Sii il primo!</p>
            )}
            {recentAdoptions.map((cell) => (
              <motion.div
                key={cell.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm"
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: cell.color }}
                />
                <span className="text-foreground">
                  <span className="font-mono text-primary">₿ {cell.nickname}</span>{" "}
                  ha adottato la cella <span className="font-mono">#{cell.id}</span>
                  {" · "}<span className="text-muted-foreground">"{cell.frase}"</span>
                  {" · "}<span className="text-muted-foreground">{timeAgo(cell.claimed_at)}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Adoption Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {selectedCellData ? `Cella #${selectedCell}` : `Adotta la Cella #${selectedCell}`}
            </DialogTitle>
            <DialogDescription>
              {selectedCellData
                ? "Questa cella è già occupata."
                : `Costo: ${selectedCost} sat simbolici`}
            </DialogDescription>
          </DialogHeader>

          {selectedCellData ? (
            // Occupied cell view
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedCellData.color }} />
                <span className="font-mono text-primary font-bold">₿ {selectedCellData.nickname}</span>
              </div>
              <p className="text-foreground">"{selectedCellData.frase}"</p>
              <p className="text-[12px] text-muted-foreground">
                Adottata il {new Date(selectedCellData.claimed_at).toLocaleDateString("it-IT")}
              </p>
            </div>
          ) : !user ? (
            // Not logged in
            <div className="space-y-4 text-center py-4">
              <p className="text-muted-foreground">Registrati per adottare una cella</p>
              <button
                onClick={() => { setModalOpen(false); setAuthOpen(true); }}
                className="border border-primary/30 text-primary px-5 py-2.5 rounded-md text-base font-medium hover:bg-primary/10 transition-colors font-heading"
              >
                Accedi / Registrati
              </button>
            </div>
          ) : (
            // Logged in, cell free
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Nickname</label>
                <input
                  value={profile?.nickname || ""}
                  readOnly
                  className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  La tua frase ({frase.length}/60)
                </label>
                <input
                  value={frase}
                  onChange={(e) => setFrase(e.target.value.slice(0, 60))}
                  placeholder="Il mio pensiero su Bitcoin..."
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Scegli colore</label>
                <div className="flex gap-2">
                  {COLOR_SWATCHES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        color === c ? "border-foreground scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {selectedCost === 0 ? (
                <button
                  onClick={handleAdopt}
                  disabled={saving || !frase.trim()}
                  className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-heading font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? "Salvataggio..." : "Adotta gratis →"}
                </button>
              ) : satBalance >= selectedCost ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Hai <span className="font-mono text-primary">{satBalance}</span> sat simbolici
                  </p>
                  <button
                    onClick={handleAdopt}
                    disabled={saving || !frase.trim()}
                    className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-heading font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {saving ? "Salvataggio..." : `Adotta per ${selectedCost} sat →`}
                  </button>
                </div>
              ) : (
                <div className="space-y-2 text-center">
                  <p className="text-sm text-destructive font-medium">Sat insufficienti</p>
                  <p className="text-[13px] text-muted-foreground">
                    Commenta notizie e pubblica sul wall per guadagnare sat
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </motion.div>
  );
};

export default RegistroPage;
