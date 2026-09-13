import React from "react";
import {
  FileText,
  Ship,
  Zap,
  Radio,
  ExternalLink,
  ShieldAlert,
  ArrowDownRight,
  TrendingDown,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { ACTIVE_DOSSIER } from "../supplyChainData";
import { playCyberBlip } from "../utils/audio";

interface UndercurrentTelemetryGridProps {
  onOpenDossier: () => void;
}

export function UndercurrentTelemetryGrid({ onOpenDossier }: UndercurrentTelemetryGridProps) {
  return (
    <section id="telemetry-vectors" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-4 text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3.5 py-1 text-xs font-mono text-cyan-300">
          <Radio className="h-3.5 w-3.5 text-cyan-400" />
          MULTI-VECTOR VERIFIABLE TELEMETRY MESH
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white font-display">
          Multi-Source Intelligence Triangulation
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Undercurrent bypasses voluntary supplier surveys. We passively ingest sovereign customs declarations, commercial maritime AIS telemetry, and industrial sensor signatures to generate unforgeable upstream visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Vector 1: Customs Declarations */}
        <div className="rounded-2xl border border-zinc-800 bg-[#080C16]/90 backdrop-blur-md p-6 space-y-4 hover:border-cyan-500/30 transition shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2.5 text-red-400">
              <FileText className="h-5 w-5" />
            </div>
            <span className="font-mono text-[10px] font-semibold text-red-400 uppercase bg-red-500/10 px-2 py-0.5 rounded">
              -41.2% DEFICIT
            </span>
          </div>

          <div>
            <span className="font-mono text-[11px] text-zinc-400 uppercase font-semibold">Vector 01</span>
            <h3 className="text-lg font-bold text-white font-display mt-0.5">
              Sovereign Customs Manifests
            </h3>
          </div>

          <div className="rounded-lg bg-black/60 border border-zinc-800/80 p-3 space-y-1 font-mono text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Observed Tonnage:</span>
              <span className="text-red-400 font-bold">1,420 MT/wk</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>90-Day Baseline:</span>
              <span className="text-zinc-300">2,410 MT/wk</span>
            </div>
            <div className="flex justify-between text-zinc-400 border-t border-zinc-800 pt-1 mt-1">
              <span>HS Classification:</span>
              <span className="text-cyan-300">7228.30.90</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Tianjin Port customs clearance manifests confirmed a 41.2% export shortfall in magnesium billet shipments destined for Tier-3 forging facilities.
          </p>
        </div>

        {/* Vector 2: Maritime AIS Vessel Tracking */}
        <div className="rounded-2xl border border-zinc-800 bg-[#080C16]/90 backdrop-blur-md p-6 space-y-4 hover:border-cyan-500/30 transition shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-amber-400">
              <Ship className="h-5 w-5" />
            </div>
            <span className="font-mono text-[10px] font-semibold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded">
              +12.4d DWELL
            </span>
          </div>

          <div>
            <span className="font-mono text-[11px] text-zinc-400 uppercase font-semibold">Vector 02</span>
            <h3 className="text-lg font-bold text-white font-display mt-0.5">
              Satellite AIS Marine Radar
            </h3>
          </div>

          <div className="rounded-lg bg-black/60 border border-zinc-800/80 p-3 space-y-1 font-mono text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Anchorage Dwell:</span>
              <span className="text-amber-400 font-bold">14.8 Days</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Historical Port Mean:</span>
              <span className="text-zinc-300">2.4 Days</span>
            </div>
            <div className="flex justify-between text-zinc-400 border-t border-zinc-800 pt-1 mt-1">
              <span>Tracked IMO:</span>
              <span className="text-cyan-300">9823417 Ever Valor</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            3 chartered bulk transport vessels remained anchored off Caofeidian terminal awaiting delayed smelter cargo, delaying downstream ocean transits.
          </p>
        </div>

        {/* Vector 3: Industrial Power Grid Telemetry */}
        <div className="rounded-2xl border border-zinc-800 bg-[#080C16]/90 backdrop-blur-md p-6 space-y-4 hover:border-cyan-500/30 transition shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-2.5 text-cyan-400">
              <Zap className="h-5 w-5" />
            </div>
            <span className="font-mono text-[10px] font-semibold text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded">
              47.8% CURTAILED
            </span>
          </div>

          <div>
            <span className="font-mono text-[11px] text-zinc-400 uppercase font-semibold">Vector 03</span>
            <h3 className="text-lg font-bold text-white font-display mt-0.5">
              Industrial Grid Telemetry
            </h3>
          </div>

          <div className="rounded-lg bg-black/60 border border-zinc-800/80 p-3 space-y-1 font-mono text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Observed Draw:</span>
              <span className="text-cyan-400 font-bold">48 MW Load</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Nominal Baseline:</span>
              <span className="text-zinc-300">92 MW Load</span>
            </div>
            <div className="flex justify-between text-zinc-400 border-t border-zinc-800 pt-1 mt-1">
              <span>Substation Node:</span>
              <span className="text-cyan-300">Hebei Grid #884</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Regional power transmission logs documented 3 high-voltage curtailments affecting blast furnace induction units during mandatory regional air quality restrictions.
          </p>
        </div>

        {/* Vector 4: Thermal SAR Satellite */}
        <div className="rounded-2xl border border-zinc-800 bg-[#080C16]/90 backdrop-blur-md p-6 space-y-4 hover:border-cyan-500/30 transition shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-2.5 text-purple-400">
              <Radio className="h-5 w-5" />
            </div>
            <span className="font-mono text-[10px] font-semibold text-purple-400 uppercase bg-purple-500/10 px-2 py-0.5 rounded">
              -33.3% THERMAL
            </span>
          </div>

          <div>
            <span className="font-mono text-[11px] text-zinc-400 uppercase font-semibold">Vector 04</span>
            <h3 className="text-lg font-bold text-white font-display mt-0.5">
              Satellite SAR Thermal Bloom
            </h3>
          </div>

          <div className="rounded-lg bg-black/60 border border-zinc-800/80 p-3 space-y-1 font-mono text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Furnace Shell:</span>
              <span className="text-purple-400 font-bold">340°C Bloom</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Nominal Operating:</span>
              <span className="text-zinc-300">510°C Bloom</span>
            </div>
            <div className="flex justify-between text-zinc-400 border-t border-zinc-800 pt-1 mt-1">
              <span>Constellation:</span>
              <span className="text-cyan-300">Copernicus Sentinel</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Infrared satellite passes confirmed anomalous thermal reductions across Smelter Crucible 2, indicating unscheduled maintenance and molten metal chill.
          </p>
        </div>
      </div>

      {/* Audit Banner CTA */}
      <div className="mt-10 rounded-2xl border border-zinc-800 bg-[#070B13] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-950 border border-cyan-500/30 p-2 text-cyan-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">
              All intelligence records are cryptographically timestamped with immutable proof hashes.
            </h4>
            <p className="text-zinc-400 text-xs mt-0.5">
              Telemetry packages include sovereign manifest IDs, vessel MMSI coordinates, and satellite bounding boxes. Inquiries directed to SAGNIK PRADHAN at <a href="mailto:nikswag211@gmail.com" className="text-cyan-300 underline font-semibold">nikswag211@gmail.com</a>.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playCyberBlip(880, 0.08);
            onOpenDossier();
          }}
          className="rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-4 py-2.5 text-xs font-mono font-bold text-cyan-200 hover:bg-cyan-900/50 hover:text-white transition flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>VIEW RAW AUDIT STREAM</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
}
