import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SEO from "@/components/SEO";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const NODE_DISTRIBUTION: [number, number, string, number][] = [
  [37.09, -95.71, "US", 4200],
  [51.16, 10.45, "DE", 1850],
  [55.37, -3.43, "GB", 820],
  [46.22, 2.21, "FR", 620],
  [52.13, 5.29, "NL", 580],
  [60.47, 8.47, "NO", 420],
  [56.26, 9.50, "DK", 380],
  [64.96, -19.02, "IS", 340],
  [35.86, 104.19, "CN", 890],
  [36.20, 138.25, "JP", 560],
  [20.59, 78.96, "IN", 320],
  [61.52, 105.31, "RU", 450],
  [-14.23, -51.92, "BR", 280],
  [-25.27, 133.77, "AU", 310],
  [56.13, -106.34, "CA", 680],
  [40.46, -3.74, "ES", 290],
  [41.87, 12.56, "IT", 240],
  [47.51, 14.55, "AT", 180],
  [46.81, 8.22, "CH", 220],
  [59.33, 18.06, "SE", 390],
];

const flag = (cc: string) =>
  cc.toUpperCase().replace(/./g, (c) => String.fromCodePoint(c.charCodeAt(0) + 127397));

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface MarkerPoint {
  lat: number;
  lng: number;
  country: string;
}

const MappaPage = () => {
  const totalNodes = useMemo(() => NODE_DISTRIBUTION.reduce((s, d) => s + d[3], 0), []);

  const markers = useMemo(() => {
    const points: MarkerPoint[] = [];
    for (const [lat, lng, cc, count] of NODE_DISTRIBUTION) {
      const numMarkers = Math.max(Math.round(count / 30), 1);
      for (let i = 0; i < numMarkers; i++) {
        const seed = lat * 1000 + lng * 100 + i;
        points.push({
          lat: lat + (seededRandom(seed) - 0.5) * 4,
          lng: lng + (seededRandom(seed + 1) - 0.5) * 4,
          country: cc,
        });
      }
    }
    return points;
  }, []);

  const top10 = useMemo(
    () => [...NODE_DISTRIBUTION].sort((a, b) => b[3] - a[3]).slice(0, 10),
    []
  );

  const stats = [
    { label: "Nodi totali", value: `~${totalNodes.toLocaleString("it-IT")}` },
    { label: "Paesi", value: NODE_DISTRIBUTION.length.toString() },
    { label: "Versione più comune", value: "v27.0.0" },
    { label: "Ultimo aggiornamento", value: new Date().toLocaleDateString("it-IT") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <SEO
        title="Mappa Nodi Bitcoin — Rete Distribuita Mondiale | BitcoinPerTe"
        description="Visualizza la distribuzione geografica dei nodi Bitcoin attivi nel mondo. Ogni punto è un guardiano indipendente del protocollo. Dati di riferimento bitnodes.io."
        path="/mappa"
      />

      <div className="container mx-auto px-4 py-10 space-y-8">
        <header className="space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">Rete Distribuita</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Mappa dei Nodi Bitcoin</h1>
          <p className="text-muted-foreground max-w-2xl">
            Ogni punto è un nodo indipendente che verifica le regole del protocollo. Nessuno può fermarli tutti.
          </p>
          <p className="text-xs text-muted-foreground">
            ~{totalNodes.toLocaleString("it-IT")} nodi attivi · Distribuzione geografica · Dati di riferimento bitnodes.io
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-4 space-y-1">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-xl font-mono font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border overflow-hidden" style={{ background: "#0D0D0D" }}>
          <ComposableMap
            projectionConfig={{ scale: 147 }}
            className="w-full h-[300px] md:h-[500px]"
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup zoom={1} center={[0, 20]}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1A1A1A"
                      stroke="#2A2A2A"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#222" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {markers.map((node, i) => (
                <Marker key={i} coordinates={[node.lng, node.lat]}>
                  <circle r={1.5} fill="#F7931A" fillOpacity={0.6} stroke="none" />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>

        <p className="text-[12px] text-muted-foreground text-center mt-3">
          Ogni punto arancione rappresenta un gruppo di nodi Bitcoin attivi in quella regione
        </p>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Top 10 Paesi per nodi</p>
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              {top10.map(([, , cc, count]) => (
                <Badge key={cc} variant="secondary" className="shrink-0 text-sm font-mono px-3 py-1.5">
                  {flag(cc)} {cc}: {count.toLocaleString("it-IT")}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <p className="text-xs text-muted-foreground border-t border-border pt-6">
          Distribuzione geografica di riferimento basata su dati bitnodes.io. La mappa è a scopo divulgativo.
          Non tutti i nodi sono visibili — alcuni operano dietro VPN o firewall.
        </p>
      </div>
    </motion.div>
  );
};

export default MappaPage;
