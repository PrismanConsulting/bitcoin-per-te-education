import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

/* ─── types ─── */
interface Vitals {
  fee: number;
  mempoolSize: number;
  mempoolVsize: number;
  diffChange: number;
}

/* ─── scales & config ─── */
const scales = {
  calm:    { name: "Do♮",  freqs: [130.81, 155.56, 185, 220, 261.63, 311.13, 370, 440] },
  normal:  { name: "Re♭",  freqs: [146.83, 174.61, 196, 220, 246.94, 293.66, 349.23, 392] },
  busy:    { name: "Mi♭",  freqs: [155.56, 185, 220, 246.94, 277.18, 311.13, 369.99, 415.30] },
  chaos:   { name: "Blues", freqs: [164.81, 185, 220, 246.94, 293.66, 329.63, 392, 440] },
};

function getScaleConfig(fee: number) {
  if (fee <= 3) return { ...scales.calm, dur: [1, 2], interval: [1500, 3500], osc: "sine" as OscillatorType };
  if (fee <= 10) return { ...scales.normal, dur: [0.5, 1], interval: [600, 1300], osc: "triangle" as OscillatorType };
  if (fee <= 30) return { ...scales.busy, dur: [0.2, 0.5], interval: [200, 500], osc: "sine" as OscillatorType };
  return { ...scales.chaos, dur: [0.1, 0.2], interval: [50, 150], osc: "sawtooth" as OscillatorType };
}

function vitalColor(fee: number) {
  if (fee <= 5) return "#22c55e";
  if (fee <= 30) return "#F7931A";
  return "#ef4444";
}

function diagnosisText(fee: number) {
  if (fee <= 3) return "Rete in meditazione. Respiro lento, battito regolare.";
  if (fee <= 10) return "Parametri vitali nella norma. La rete è operativa.";
  if (fee <= 30) return "Pressione elevata. Molte transazioni competono per spazio.";
  return "Parametri critici. Tachicardia. Forte congestione.";
}

function poeticText(fee: number) {
  if (fee <= 3) return "Una brezza leggera soffia sulla rete. Ogni nota si posa come una foglia sull'acqua.";
  if (fee <= 10) return "Il ritmo della rete è costante, come un cuore sano. Ogni transazione trova il suo posto.";
  if (fee <= 30) return "Il traffico cresce, le note si rincorrono. La rete accelera il battito.";
  return "Tempesta di dati. Le note si sovrappongono in una sinfonia caotica e urgente.";
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/* ─── ECG Canvas ─── */
const ECGCanvas = ({ bpm }: { bpm: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;
    let x = 0;
    const speed = Math.max(1, bpm / 30);

    const draw = () => {
      const cw = w();
      const ch = h();
      ctx.fillStyle = "rgba(13,13,13,0.15)";
      ctx.fillRect(x - 2, 0, 40, ch);

      // grid
      ctx.strokeStyle = "rgba(247,147,26,0.06)";
      ctx.lineWidth = 0.5;
      for (let gy = 0; gy < ch; gy += 15) {
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.lineTo(x + speed + 1, gy);
        ctx.stroke();
      }

      // ECG line
      ctx.strokeStyle = "#F7931A";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const mid = ch / 2;
      const phase = (x % 120) / 120;
      let y: number;
      if (phase < 0.1) y = mid;
      else if (phase < 0.15) y = mid - ch * 0.15;
      else if (phase < 0.2) y = mid + ch * 0.05;
      else if (phase < 0.25) y = mid - ch * 0.55;
      else if (phase < 0.3) y = mid + ch * 0.2;
      else if (phase < 0.35) y = mid - ch * 0.08;
      else if (phase < 0.45) y = mid;
      else y = mid;

      ctx.moveTo(x, y);
      ctx.lineTo(x + speed, y);
      ctx.stroke();

      x += speed;
      if (x > cw) {
        x = 0;
        ctx.clearRect(0, 0, cw, ch);
      }
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [bpm]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded border border-border"
      style={{ height: 60, background: "#0d0d0d" }}
    />
  );
};

/* ─── Sinfonia Canvas ─── */
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string }

const SinfoniaCanvas = ({ fee, noteCount }: { fee: number; noteCount: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const prevCount = useRef(noteCount);

  useEffect(() => {
    if (noteCount > prevCount.current) {
      const color = vitalColor(fee);
      for (let i = 0; i < 8; i++) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(1, 3);
        particles.current.push({
          x: 130, y: 130,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1, color,
        });
      }
    }
    prevCount.current = noteCount;
  }, [noteCount, fee]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 260 * 2;
    canvas.height = 260 * 2;
    ctx.scale(2, 2);

    const draw = () => {
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, 260, 260);

      // center dot
      const pulse = 1 + Math.sin(Date.now() / 500) * 0.15;
      ctx.beginPath();
      ctx.arc(130, 130, 6 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = "#F7931A";
      ctx.fill();

      // particles
      particles.current = particles.current.filter(p => p.life > 0);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-full border border-border mx-auto"
      style={{ width: 260, height: 260 }}
    />
  );
};

/* ─── Main Page ─── */
const LivePage = () => {
  const [vitals, setVitals] = useState<Vitals>({ fee: 1, mempoolSize: 0, mempoolVsize: 0, diffChange: 0 });
  const [loading, setLoading] = useState(true);

  // audio state
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [noteCount, setNoteCount] = useState(0);
  const feeRef = useRef(1);

  // keep feeRef in sync
  useEffect(() => { feeRef.current = vitals.fee; }, [vitals.fee]);

  // fetch vitals
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [feeRes, mempoolRes, diffRes] = await Promise.all([
          fetch("https://mempool.space/api/v1/fees/recommended"),
          fetch("https://mempool.space/api/mempool"),
          fetch("https://mempool.space/api/v1/difficulty-adjustment"),
        ]);
        const feeData = await feeRes.json();
        const mempoolData = await mempoolRes.json();
        const diffData = await diffRes.json();
        setVitals({
          fee: feeData.halfHourFee ?? 1,
          mempoolSize: mempoolData.count ?? 0,
          mempoolVsize: mempoolData.vsize ?? 0,
          diffChange: diffData.difficultyChange ?? 0,
        });
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchAll();
    const iv = setInterval(fetchAll, 15_000);
    return () => clearInterval(iv);
  }, []);

  // play note
  const playNote = useCallback(() => {
    const ctx = audioCtxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;

    const cfg = getScaleConfig(feeRef.current);
    const freq = cfg.freqs[Math.floor(Math.random() * cfg.freqs.length)];
    const dur = rand(cfg.dur[0], cfg.dur[1]);

    const osc = ctx.createOscillator();
    osc.type = cfg.osc;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
    noteGain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

    osc.connect(noteGain).connect(gain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur + 0.05);

    setNoteCount(c => c + 1);

    const nextInterval = rand(cfg.interval[0], cfg.interval[1]);
    timerRef.current = setTimeout(playNote, nextInterval);
  }, []);

  // volume sync
  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.setValueAtTime(volume, audioCtxRef.current?.currentTime ?? 0);
  }, [volume]);

  const togglePlay = useCallback(() => {
    if (playing) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPlaying(false);
      return;
    }
    if (!audioCtxRef.current) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.connect(ctx.destination);
      audioCtxRef.current = ctx;
      gainRef.current = gain;
    }
    audioCtxRef.current.resume();
    setPlaying(true);
    playNote();
  }, [playing, playNote, volume]);

  // cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  const { fee, mempoolSize, mempoolVsize, diffChange } = vitals;
  const bpm = Math.min(Math.max(Math.round(60 + fee * 1.6), 40), 180);
  const temp = (36 + fee * 0.08).toFixed(1);
  const mempoolMB = (mempoolVsize / 1_000_000).toFixed(1);
  const color = vitalColor(fee);
  const scaleCfg = getScaleConfig(fee);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen pt-16"
    >
      <SEO
        title="Bitcoin Vivo — La Rete come Organismo | BitcoinPerTe"
        description="Senti la rete Bitcoin in tempo reale: parametri vitali, ECG, e la sinfonia generativa delle transazioni. Un'esperienza audiovisiva unica."
        path="/live"
      />

      <div className="container mx-auto px-4 max-w-5xl py-12 space-y-16">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <p className="label-section">ESPERIENZA LIVE</p>
          <h1 className="text-2xl md:text-4xl font-bold font-heading text-foreground">Bitcoin è Vivo</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Due modi di sentire la rete Bitcoin in tempo reale. Non dati. Emozione.
          </p>
        </div>

        {/* ═══ SEZIONE 1 — BITCOIN VIVO ═══ */}
        <section className="space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-heading text-foreground">Bitcoin Vivo</h2>
            <p className="text-muted-foreground text-sm mt-1">
              La rete come organismo biologico. Parametri vitali aggiornati ogni 15 secondi.
            </p>
          </div>

          {/* Organism SVG */}
          <div className="flex justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200" className="animate-breathe">
              {/* rotating dashed ring */}
              <circle
                cx="100" cy="100" r="85"
                fill="none" stroke={color} strokeWidth="1"
                strokeDasharray="8 6" opacity="0.3"
              >
                <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
              </circle>
              <circle
                cx="100" cy="100" r="65"
                fill="none" stroke={color} strokeWidth="0.6"
                strokeDasharray="4 8" opacity="0.15"
              >
                <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="30s" repeatCount="indefinite" />
              </circle>
              {/* pulsing center */}
              <circle cx="100" cy="100" r="28" fill={color} opacity="0.12">
                <animate attributeName="r" values="28;34;28" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="100" r="18" fill={color} opacity="0.25" />
              <text x="100" y="106" textAnchor="middle" fill={color} fontSize="22" fontFamily="monospace" fontWeight="bold">₿</text>
            </svg>
          </div>

          {/* 4 vital cards */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card-surface p-4 text-center animate-pulse h-20" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="card-surface p-4 text-center">
                <p className="text-[11px] text-muted-foreground mb-1">Battito cardiaco</p>
                <p className="font-mono text-lg font-bold" style={{ color }}>{bpm} <span className="text-xs text-muted-foreground">BPM</span></p>
              </div>
              <div className="card-surface p-4 text-center">
                <p className="text-[11px] text-muted-foreground mb-1">Pressione mempool</p>
                <p className="font-mono text-lg font-bold text-foreground">{mempoolMB} <span className="text-xs text-muted-foreground">MB</span></p>
              </div>
              <div className="card-surface p-4 text-center">
                <p className="text-[11px] text-muted-foreground mb-1">Temperatura fee</p>
                <p className="font-mono text-lg font-bold" style={{ color }}>{temp} <span className="text-xs text-muted-foreground">°C</span></p>
              </div>
              <div className="card-surface p-4 text-center">
                <p className="text-[11px] text-muted-foreground mb-1">Difficoltà Δ</p>
                <p className="font-mono text-lg font-bold text-foreground">
                  {diffChange >= 0 ? "+" : ""}{diffChange.toFixed(2)} <span className="text-xs text-muted-foreground">%</span>
                </p>
              </div>
            </div>
          )}

          {/* ECG */}
          <ECGCanvas bpm={bpm} />

          {/* Diagnosis */}
          <div className="card-surface p-4 border-l-2" style={{ borderLeftColor: color }}>
            <p className="text-[11px] text-muted-foreground mb-1">DIAGNOSI</p>
            <p className="text-sm text-foreground">{diagnosisText(fee)}</p>
          </div>
        </section>

        {/* ═══ DIVIDER ═══ */}
        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-border" />
          <span className="text-muted-foreground text-sm font-heading">· e adesso ascoltalo ·</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* ═══ SEZIONE 2 — SINFONIA ═══ */}
        <section className="space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-heading text-foreground">La Sinfonia della Rete</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Ogni transazione Bitcoin è una nota. La musica che il mondo compone senza saperlo.
            </p>
          </div>

          {/* Canvas */}
          <SinfoniaCanvas fee={fee} noteCount={noteCount} />

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={togglePlay}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-base font-medium hover:bg-primary/90 transition-colors font-heading"
            >
              {playing ? "⏸ Pausa" : "▶ Ascolta"}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-muted-foreground">Vol</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
                className="w-28 accent-primary"
              />
            </div>
          </div>

          {/* 4 stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="card-surface p-4 text-center">
              <p className="text-[11px] text-muted-foreground mb-1">Note suonate</p>
              <p className="font-mono text-lg font-bold text-primary">{noteCount}</p>
            </div>
            <div className="card-surface p-4 text-center">
              <p className="text-[11px] text-muted-foreground mb-1">Fee sat/vB</p>
              <p className="font-mono text-lg font-bold text-foreground">{fee}</p>
            </div>
            <div className="card-surface p-4 text-center">
              <p className="text-[11px] text-muted-foreground mb-1">Tx in coda</p>
              <p className="font-mono text-lg font-bold text-foreground">{(mempoolSize / 1000).toFixed(1)}K</p>
            </div>
            <div className="card-surface p-4 text-center">
              <p className="text-[11px] text-muted-foreground mb-1">Tonalità</p>
              <p className="font-mono text-lg font-bold text-primary">{scaleCfg.name}</p>
            </div>
          </div>

          {/* Poetic box */}
          <div className="card-surface p-4 border-l-2 border-l-primary">
            <p className="text-sm text-muted-foreground italic">{poeticText(fee)}</p>
          </div>
        </section>

        {/* DISCLAIMER */}
        <p className="text-center text-[12px] text-muted-foreground/60 pb-4">
          Dati da mempool.space API pubblica · Esperienza a scopo divulgativo · Audio generato dal browser via Web Audio API
        </p>
      </div>
    </motion.div>
  );
};

export default LivePage;
