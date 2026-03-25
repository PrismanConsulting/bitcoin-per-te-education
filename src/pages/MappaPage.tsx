import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SEO from "@/components/SEO";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const API_URL = "https://bitnodes.io/api/v1/snapshots/latest/?limit=5000";

interface NodeData {
  lat: number;
  lng: number;
  country: string;
  city: string;
}

const flag = (cc: string) =>
  cc.toUpperCase().replace(/./g, (c) => String.fromCodePoint(c.charCodeAt(0) + 127397));

const MappaPage = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [totalNodes, setTotalNodes] = useState<number | null>(null);
  const [userAgents, setUserAgents] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [hoveredNode, setHoveredNode] = useState<{ x: number; y: number; label: string } | null>(null);

  const fetchNodes = () => {
    setError(false);
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        setTotalNodes(data.total_nodes ?? 0);
        const entries = Object.values(data.nodes) as any[][];
        const parsed: NodeData[] = [];
        const agents: Record<string, number> = {};

        for (const e of entries) {
          const lat = e[7];
          const lng = e[8];
          const cc = e[5];
          const city = e[6];
          const ua = e[3] as string;

          if (lat && lng && lat !== 0 && lng !== 0) {
            parsed.push({ lat, lng, country: cc || "??", city: city || "Unknown" });
          }

          const match = ua?.match(/\/Satoshi:(\d+\.\d+\.\d+)\//);
          if (match) {
            const ver = match[1];
            agents[ver] = (agents[ver] || 0) + 1;
          }
        }

        setNodes(parsed);
        setUserAgents(agents);
        setLastUpdate(new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNodes();
    const interval = setInterval(fetchNodes, 600_000);
    return () => clearInterval(interval);
  }, []);

  const uniqueCountries = useMemo(() => new Set(nodes.map((n) => n.country)).size, [nodes]);

  const topVersion = useMemo(() => {
    const sorted = Object.entries(userAgents).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] ?? "—";
  }, [userAgents]);

  const top10Countries = useMemo(() => {
    const counts: Record<string, number> = {};
    nodes.forEach((n) => {
      counts[n.country] = (counts[n.country] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [nodes]);

  const stats = [
    { label: "Nodi totali", value: totalNodes?.toLocaleString("it-IT") ?? "—" },
    { label: "Paesi", value: uniqueCountries > 0 ? uniqueCountries.toLocaleString("it-IT") : "—" },
    { label: "Versione più comune", value: topVersion ? `v${topVersion}` : "—" },
    { label: "Ultimo aggiornamento", value: lastUpdate || "—" },
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
        description="Visualizza in tempo reale i nodi Bitcoin attivi nel mondo. Ogni punto è un guardiano indipendente del protocollo. Dati live da bitnodes.io."
        path="/mappa"
      />

      <div className="container mx-auto px-4 py-10 space-y-8">
        {/* HEADER */}
        <header className="space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Rete Distribuita
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Mappa dei Nodi Bitcoin
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Ogni punto è un nodo indipendente che verifica le regole del protocollo.
            Nessuno può fermarli tutti.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span>live</span>
            <span className="text-border">·</span>
            <span>Fonte: bitnodes.io</span>
          </div>
        </header>

        {/* STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-card p-4 space-y-1"
            >
              <p className="text-xs text-muted-foreground">{s.label}</p>
              {loading ? (
                <Skeleton className="h-7 w-20" />
              ) : (
                <p className="text-xl font-mono font-bold text-foreground">{s.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* MAP */}
        {error ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center text-muted-foreground">
            Dati temporaneamente non disponibili. Riprova più tardi.
          </div>
        ) : (
          <div className="rounded-lg border border-border overflow-hidden" style={{ background: "#0D0D0D" }}>
            {loading ? (
              <Skeleton className="w-full h-[300px] md:h-[500px]" />
            ) : (
              <ComposableMap
                projectionConfig={{ scale: 147 }}
                className="w-full h-[300px] md:h-[500px]"
                style={{ width: "100%", height: "auto" }}
              >
                <ZoomableGroup>
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
                  {nodes.map((node, i) => (
                    <Marker key={i} coordinates={[node.lng, node.lat]}>
                      <circle
                        r={2.5}
                        fill="#F7931A"
                        fillOpacity={0.7}
                        stroke="none"
                        className="cursor-pointer transition-all duration-150"
                        onMouseEnter={(e) => {
                          const target = e.target as SVGCircleElement;
                          target.setAttribute("r", "4");
                          setHoveredNode({
                            x: e.clientX,
                            y: e.clientY,
                            label: `${node.city}, ${node.country}`,
                          });
                        }}
                        onMouseLeave={(e) => {
                          const target = e.target as SVGCircleElement;
                          target.setAttribute("r", "2.5");
                          setHoveredNode(null);
                        }}
                      />
                    </Marker>
                  ))}
                </ZoomableGroup>
              </ComposableMap>
            )}
          </div>
        )}

        {/* TOOLTIP */}
        {hoveredNode && (
          <div
            className="fixed z-50 pointer-events-none rounded bg-card border border-border px-3 py-1.5 text-xs text-foreground shadow-lg"
            style={{ left: hoveredNode.x + 12, top: hoveredNode.y - 10 }}
          >
            {hoveredNode.label}
          </div>
        )}

        {/* TOP 10 COUNTRIES */}
        {top10Countries.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Top 10 Paesi per nodi</p>
            <ScrollArea className="w-full">
              <div className="flex gap-2 pb-2">
                {top10Countries.map(([cc, count]) => (
                  <Badge
                    key={cc}
                    variant="secondary"
                    className="shrink-0 text-sm font-mono px-3 py-1.5"
                  >
                    {flag(cc)} {cc}: {count.toLocaleString("it-IT")}
                  </Badge>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}

        {/* DISCLAIMER */}
        <p className="text-xs text-muted-foreground border-t border-border pt-6">
          Dati tecnici forniti da bitnodes.io API pubblica. La mappa è a scopo divulgativo.
          Non tutti i nodi sono visibili — alcuni operano dietro VPN o firewall.
        </p>
      </div>
    </motion.div>
  );
};

export default MappaPage;
