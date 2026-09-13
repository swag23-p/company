import React from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Clock,
  DollarSign,
  ShieldAlert,
  Sliders,
  FileText,
  Activity,
  Layers,
  Sparkles,
  Ship,
  MapPin,
  ChevronRight
} from "lucide-react";
import { SupplyChainNode } from "../types";
import { playCyberBlip, playAlarmChime, playTierSelectSound } from "../utils/audio";
import { SUPPLY_CHAIN_NODES } from "../supplyChainData";

interface UndercurrentHeroProps {
  selectedNode: SupplyChainNode;
  onSelectNode: (node: SupplyChainNode) => void;
  onOpenDossier: () => void;
  onOpenPilot: () => void;
  onScrollToSimulator: () => void;
}

export function UndercurrentHero({
  selectedNode,
  onSelectNode,
  onOpenDossier,
  onOpenPilot,
  onScrollToSimulator
}: UndercurrentHeroProps) {
  const isAnomalyOrigin = selectedNode.tier === "T4";

  return (
    <section id="hero-telemetry" className="relative pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Warning Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-950/30 backdrop-blur-md px-4 py-2.5 shadow-lg mb-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-300">
            CRITICAL INTELLIGENCE DISPATCH: TIER-4 SMELTER DISRUPTION [ALR-2026-08892]
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs text-zinc-300">
          <span className="hidden sm:inline text-zinc-400">
            Disruption Horizon: <strong className="text-amber-300 font-semibold">18–35 days</strong>
          </span>
          <span className="hidden md:inline text-zinc-400">
            OEM Assembly Exposure: <strong className="text-white font-semibold">$4.7B</strong>
          </span>
          <button
            type="button"
            onClick={() => {
              playAlarmChime();
              onOpenDossier();
            }}
            className="flex items-center gap-1.5 rounded bg-red-500/20 border border-red-500/40 px-3 py-1 text-[11px] font-bold text-red-200 hover:bg-red-500/30 transition cursor-pointer"
          >
            <FileText className="h-3 w-3 text-red-300" />
            EXECUTIVE DOSSIER
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Mission & Strategic Value */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            SOVEREIGN CUSTOMS MANIFESTS &amp; AIS MARITIME RADAR MESH
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.08]">
            Foresee Sub-Tier Supply Collapses <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-amber-500">Weeks Before</span> Your Tier-1 Is Aware.
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Tier-1 suppliers cannot warn automotive and industrial OEMs of disruptions they cannot see. Undercurrent's passive sensor network triangulates sovereign customs manifests, port container AIS dwell intervals, and smelter power grid anomalies across multi-tier supplier networks to deliver 18–35 days of early warning before production lines halt.
          </p>

          {/* Interactive Tier Quick-Selector Strip */}
          <div className="rounded-xl border border-zinc-800 bg-[#0A0E18]/90 backdrop-blur-md p-4 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
              <span className="uppercase tracking-wider font-semibold">UPSTREAM CASCADE STAGES:</span>
              <span className="text-cyan-300 text-[11px]">Select node to inspect telemetry</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {SUPPLY_CHAIN_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      onSelectNode(node);
                      playTierSelectSound(node.tier);
                    }}
                    className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition cursor-pointer ${
                      isSelected
                        ? "border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                        : "border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/40"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-mono text-xs font-bold" style={{ color: node.colorHex }}>
                        {node.tier}
                      </span>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: node.colorHex }} />
                    </div>
                    <span className="font-semibold text-xs text-white truncate w-full">
                      {node.name.split(" ")[0]}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400 truncate w-full">
                      {node.bufferDaysRemaining}d buffer
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                playCyberBlip(720, 0.08);
                onOpenPilot();
              }}
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-xs sm:text-sm font-semibold text-white hover:from-cyan-400 hover:to-blue-500 transition shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2 cursor-pointer border border-cyan-400/30"
            >
              <Sparkles className="h-4 w-4" />
              Schedule Executive Pilot Briefing
            </button>

            <button
              type="button"
              onClick={() => {
                playCyberBlip(540, 0.06);
                onScrollToSimulator();
              }}
              className="rounded-lg border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-xs sm:text-sm font-medium text-white hover:bg-zinc-800 transition flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="h-4 w-4 text-cyan-300" />
              Simulate Buffer Depletion Model
            </button>
          </div>

          {/* Email message routing indicator */}
          <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>Executive briefings &amp; inquiries directed to:</span>
            <a
              href="mailto:nikswag211@gmail.com?subject=Undercurrent%20OEM%20Supply-Chain%20Briefing"
              className="text-cyan-300 hover:text-cyan-200 underline font-semibold"
            >
              nikswag211@gmail.com
            </a>
          </div>
        </div>

        {/* Right Column: Active Node Telemetry Card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-zinc-800 bg-[#090D18]/95 backdrop-blur-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold">
                  ACTIVE SUPPLY CHAIN NODE
                </span>
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-2 mt-0.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: selectedNode.colorHex }}
                  />
                  {selectedNode.tier} — {selectedNode.name}
                </h3>
              </div>
              <span
                className="font-mono text-[10px] font-bold px-2.5 py-1 rounded border"
                style={{
                  color: selectedNode.colorHex,
                  borderColor: `${selectedNode.colorHex}66`,
                  backgroundColor: `${selectedNode.colorHex}15`
                }}
              >
                {selectedNode.status.replace("_", " ")}
              </span>
            </div>

            {/* Location & Facility */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-zinc-800/80 bg-black/40 p-2.5">
                <span className="font-mono text-[10px] text-zinc-400 uppercase block font-semibold">
                  Facility Location
                </span>
                <span className="text-white font-medium flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-cyan-400" />
                  {selectedNode.location}
                </span>
                <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                  Lat {selectedNode.lat.toFixed(2)}° / Lng {selectedNode.lng.toFixed(2)}°
                </span>
              </div>

              <div className="rounded-lg border border-zinc-800/80 bg-black/40 p-2.5">
                <span className="font-mono text-[10px] text-zinc-400 uppercase block font-semibold">
                  HS Customs Classification
                </span>
                <span className="font-mono text-cyan-300 font-semibold mt-0.5 block">
                  {selectedNode.hsCode || "HS 8708.xx"}
                </span>
                <span className="font-mono text-[10px] text-zinc-400 block mt-0.5 truncate">
                  {selectedNode.materialSupplied.split("(")[0]}
                </span>
              </div>
            </div>

            {/* Metrics Matrix */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-zinc-800/80 bg-black/40 p-2.5">
                <span className="font-mono text-[10px] text-zinc-400 block font-semibold">BUFFER RUNWAY</span>
                <span
                  className="font-mono text-base font-bold block mt-1"
                  style={{ color: selectedNode.bufferDaysRemaining === 0 ? "#EF4444" : selectedNode.colorHex }}
                >
                  {selectedNode.bufferDaysRemaining} Days
                </span>
                <span className="text-[10px] text-zinc-500 block">Safety stock</span>
              </div>

              <div className="rounded-lg border border-zinc-800/80 bg-black/40 p-2.5">
                <span className="font-mono text-[10px] text-zinc-400 block font-semibold">CONFIDENCE</span>
                <span className="font-mono text-base font-bold text-white block mt-1">
                  {selectedNode.confidenceScore}%
                </span>
                <span className="text-[10px] text-zinc-500 block">Sensor audit</span>
              </div>

              <div className="rounded-lg border border-zinc-800/80 bg-black/40 p-2.5">
                <span className="font-mono text-[10px] text-zinc-400 block font-semibold">LEAD TIME</span>
                <span className="font-mono text-xs font-bold text-amber-300 block mt-1 truncate">
                  {selectedNode.leadTimeToTarget}
                </span>
                <span className="text-[10px] text-zinc-500 block">Assembly hop</span>
              </div>
            </div>

            {/* Raw Telemetry Summary */}
            <div className="rounded-lg border border-zinc-800/80 bg-black/60 p-3 text-xs space-y-1">
              <span className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider block font-semibold">
                CORROBORATING SENSOR FEEDS:
              </span>
              <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                {selectedNode.telemetrySummary}
              </p>
            </div>

            {/* Downstream Recipient Link */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-zinc-800 pt-3">
              <span>Next Downstream Recipient:</span>
              <span className="text-cyan-300 font-semibold truncate max-w-[200px]">
                {selectedNode.downstreamRecipient}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
