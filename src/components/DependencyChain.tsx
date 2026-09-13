import { AlertTriangle, ShieldCheck, ArrowDown, Activity, FileText } from 'lucide-react';

interface DependencyChainProps {
  onOpenDossier: () => void;
}

export function DependencyChain({ onOpenDossier }: DependencyChainProps) {
  return (
    <div
      id="dependency-chain-card"
      className="w-full rounded-[4px] border border-[#E2E4E8] bg-[#F7F7F4] p-5 sm:p-6 shadow-xs select-none"
    >
      {/* Telemetry card top telemetry header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E4E8] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C97F2A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C97F2A]"></span>
          </span>
          <span className="font-mono font-medium text-[#161B22] text-[11px] tracking-wider">
            UPSTREAM TELEMETRY STREAM
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-[#3A5A73]">CONFIDENCE:</span>
          <span className="font-semibold text-[#161B22] bg-white border border-[#E2E4E8] px-1.5 py-0.5 rounded-[3px]">
            94.2%
          </span>
          <span className="text-[#3A5A73]">ALERT ID:</span>
          <span className="text-[#161B22] font-semibold">ALR-8892</span>
        </div>
      </div>

      {/* The Vertical Dependency Chain */}
      <div className="my-5 flex flex-col items-center">
        {/* Node 1: Factory A (Upstream Source - Pulsing Amber) */}
        <div
          id="node-factory-a"
          className="w-full rounded-[4px] border-2 border-[#C97F2A] bg-white p-3 sm:p-3.5 animate-pulse-amber transition-all"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-[#C97F2A] uppercase tracking-wider">
                  Tier 4 Node
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white bg-[#A63A2E] px-1.5 py-0.5 rounded-[2px] font-medium">
                  <AlertTriangle className="h-3 w-3" />
                  ANOMALY DETECTED
                </span>
              </div>
              <h4 className="mt-1 text-sm font-semibold text-[#161B22]">
                Factory A (Specialty High-Tensile Alloy Smelter)
              </h4>
              <p className="font-mono text-[11px] text-[#3A5A73] mt-0.5">
                Hebei Province • HS 7228.30 (Alloy Steel Bars)
              </p>
            </div>
            <span className="font-mono text-[10px] text-[#C97F2A] bg-[#FFF8F0] border border-[#C97F2A]/30 px-2 py-0.5 rounded-[2px] whitespace-nowrap">
              Origin of Risk
            </span>
          </div>

          {/* Anomaly metrics line */}
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 border-t border-[#E2E4E8] pt-2 text-center font-mono text-[10px]">
            <div className="bg-[#F7F7F4] p-1 rounded-[2px]">
              <span className="block text-[#3A5A73]">Customs Vol</span>
              <span className="font-semibold text-[#A63A2E]">-41% vs. 90d</span>
            </div>
            <div className="bg-[#F7F7F4] p-1 rounded-[2px]">
              <span className="block text-[#3A5A73]">AIS Vessel Dwell</span>
              <span className="font-semibold text-[#C97F2A]">+12.4 days</span>
            </div>
            <div className="bg-[#F7F7F4] p-1 rounded-[2px]">
              <span className="block text-[#3A5A73]">Grid Draw</span>
              <span className="font-semibold text-[#A63A2E]">Load drop</span>
            </div>
          </div>
        </div>

        {/* Connector 1 (Pulsing amber connector showing risk signal moving downstream) */}
        <div className="flex flex-col items-center my-1">
          <div className="h-7 w-[2.5px] animate-pulse-connector bg-[#C97F2A]"></div>
          <div className="font-mono text-[9px] text-[#C97F2A] bg-white border border-[#C97F2A]/40 px-1.5 py-0.2 rounded-[2px] -my-1 z-10">
            18–35d propagation lead
          </div>
          <div className="h-3 w-[2.5px] animate-pulse-connector bg-[#C97F2A]"></div>
          <ArrowDown className="h-3.5 w-3.5 text-[#C97F2A] -mt-1" />
        </div>

        {/* Node 2: Supplier B */}
        <div
          id="node-supplier-b"
          className="w-full rounded-[4px] border border-[#E2E4E8] bg-white px-3.5 py-2.5 opacity-95"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#3A5A73] font-medium">Tier 3</span>
              <span className="text-xs font-medium text-[#161B22]">
                Supplier B (Precision Hot-Forging Co.)
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#3A5A73]">Forged blanks</span>
          </div>
          <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-[#3A5A73]">
            <span>Est. raw inventory depletion: 21 days</span>
            <span className="text-[#C97F2A] font-medium">Downstream impact pending</span>
          </div>
        </div>

        {/* Connector 2 */}
        <div className="flex flex-col items-center">
          <div className="h-4 w-[1.5px] bg-[#3A5A73]/40"></div>
          <ArrowDown className="h-3 w-3 text-[#3A5A73]/60 -mt-0.5" />
        </div>

        {/* Node 3: Supplier C */}
        <div
          id="node-supplier-c"
          className="w-full rounded-[4px] border border-[#E2E4E8] bg-white px-3.5 py-2.5 opacity-90"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#3A5A73] font-medium">Tier 2</span>
              <span className="text-xs font-medium text-[#161B22]">
                Supplier C (Hydraulic Caliper Machining GmbH)
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#3A5A73]">Sub-assemblies</span>
          </div>
          <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-[#3A5A73]">
            <span>Safety stock buffer: 14 days</span>
            <span className="text-[#3A5A73]">No disruption declared</span>
          </div>
        </div>

        {/* Connector 3 */}
        <div className="flex flex-col items-center">
          <div className="h-4 w-[1.5px] bg-[#3A5A73]/40"></div>
          <ArrowDown className="h-3 w-3 text-[#3A5A73]/60 -mt-0.5" />
        </div>

        {/* Node 4: Supplier D */}
        <div
          id="node-supplier-d"
          className="w-full rounded-[4px] border border-[#E2E4E8] bg-white px-3.5 py-2.5 opacity-90"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#161B22] font-semibold bg-[#E2E4E8] px-1 rounded-[2px]">
                Tier 1
              </span>
              <span className="text-xs font-medium text-[#161B22]">
                Supplier D (Braking Systems Tier-1 Integrator)
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#161B22] font-medium">Direct Vendor</span>
          </div>
          <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-[#3A5A73]">
            <span>Portal status: &quot;On Schedule&quot; (unaware)</span>
            <span className="text-[#A63A2E] font-medium">0d early warning from vendor</span>
          </div>
        </div>

        {/* Connector 4 */}
        <div className="flex flex-col items-center">
          <div className="h-4 w-[1.5px] bg-[#3A5A73]/40"></div>
          <ArrowDown className="h-3 w-3 text-[#3A5A73]/60 -mt-0.5" />
        </div>

        {/* Node 5: Automotive OEM */}
        <div
          id="node-automotive"
          className="w-full rounded-[4px] border border-[#161B22] bg-[#161B22] text-white px-3.5 py-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#C97F2A]" />
              <span className="text-xs font-medium">
                Automotive Manufacturing Plant (Customer Final Assembly)
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#C97F2A] font-semibold">TARGET IMPACT</span>
          </div>
        </div>
      </div>

      {/* The Anomaly Alert Dossier Box (Exact wording from prompt) */}
      <div
        id="hero-alert-dossier-box"
        className="rounded-[4px] border border-[#C97F2A]/40 bg-white p-4"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-[11px] font-semibold text-[#A63A2E] bg-[#FDF2F1] border border-[#A63A2E]/20 px-2 py-0.5 rounded-[2px]">
            ACTIVE ANOMALY DOSSIER
          </span>
          <span className="font-mono text-[11px] text-[#3A5A73]">
            Estimated affected downstream production: <strong className="text-[#161B22]">$4.7B</strong>
          </span>
        </div>

        <p className="text-xs text-[#161B22] font-mono leading-relaxed bg-[#F7F7F4] p-2.5 rounded-[3px] border border-[#E2E4E8]">
          &quot;18–35 days — Factory A shows declining production, abnormal shipping, power interruptions. Estimated affected downstream production: $4.7B. Recommended: qualify alternate supplier, reroute shipments.&quot;
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E2E4E8] text-[11px]">
          <div className="flex items-center gap-1.5 text-[#3A5A73] font-mono">
            <Activity className="h-3.5 w-3.5 text-[#C97F2A]" />
            <span>Corroborated by customs bills, AIS vessel dwell, and power telemetry</span>
          </div>
          <button
            type="button"
            id="open-dossier-from-hero-btn"
            onClick={onOpenDossier}
            className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#3A5A73] hover:text-[#161B22] underline cursor-pointer"
          >
            <FileText className="h-3 w-3" />
            Inspect evidence dossier
          </button>
        </div>
      </div>
    </div>
  );
}
