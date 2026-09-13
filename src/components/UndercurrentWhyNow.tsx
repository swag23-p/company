import React from "react";
import {
  ShieldAlert,
  HelpCircle,
  TrendingDown,
  Lock,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Globe2
} from "lucide-react";

export function UndercurrentWhyNow() {
  return (
    <section id="why-undercurrent" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/30 px-3.5 py-1 text-xs font-mono text-purple-300">
          <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
          THE PRINCIPAL-AGENT VULNERABILITY
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white font-display">
          Why Your Tier-1 Will Never Warn You in Time
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          The fundamental breakdown in enterprise supply chain risk isn’t technology—it is economic incentives. Direct vendors are incentivized to hide bad news until containment is impossible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* The Old Way: Tier-1 Vendor Portals */}
        <div className="rounded-3xl border border-red-500/20 bg-[#12080A]/70 backdrop-blur-xl p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider">
                TRADITIONAL APPROACH
              </span>
              <span className="rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-[11px] font-mono text-red-400">
                REACTIVE & FLAWED
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white font-display">
              Supplier Self-Reporting & Portal Surveys
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed">
              OEMs ask Tier-1 suppliers to fill out quarterly compliance surveys or self-report disruptions on EDI web portals.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-zinc-300">
                <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Penalty Fear Incentivizes Concealment:</strong>
                  Admitting an upstream raw material deficit triggers immediate chargebacks and jeopardizes next model-year platform awards.
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-zinc-300">
                <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Sub-Tier Blindness:</strong>
                  Your Tier-1 doesn&apos;t know the Hebei smelter is stalled either—they only know their Tier-2 German supplier hasn&apos;t missed today&apos;s drop.
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-zinc-300">
                <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Zero Lead Time to React:</strong>
                  You only discover the crisis when a shipping container fails to arrive at your loading dock—giving you 0 days to substitute.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-red-950/30 border border-red-500/20 p-4 font-mono text-xs text-red-300">
            RESULT: Emergency air freight, line idle fines of $1.2M/hour, and brand damage.
          </div>
        </div>

        {/* The Undercurrent Way: Passive Upstream Telemetry */}
        <div className="rounded-3xl border border-cyan-500/30 bg-[#07131F]/70 backdrop-blur-xl p-8 space-y-6 flex flex-col justify-between shadow-[0_0_40px_rgba(0,240,255,0.07)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">
                THE UNDERCURRENT ARCHITECTURE
              </span>
              <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-mono text-cyan-300">
                PROACTIVE & INDEPENDENT
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white font-display">
              Sovereign Sensor Mesh & Trade Physics
            </h3>

            <p className="text-zinc-300 text-sm leading-relaxed">
              Undercurrent bypasses supplier portals entirely. We monitor unalterable physical indicators: customs declarations, satellite vessel transponders, and utility substations.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-zinc-200">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">No Supplier Cooperation Required:</strong>
                  Telemetry is gathered from public sovereign customs books, satellite AIS, and satellite synthetic aperture radar.
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-zinc-200">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">18–35 Day Actionable Window:</strong>
                  Receive mathematically scored alerts when the raw billet shipment drops at the port, weeks before downstream buffers deplete.
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-zinc-200">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Empowered Dual-Sourcing:</strong>
                  Immediately pre-qualify alternate mills in Korea or Germany before your competitors even know there is a shortage.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-cyan-950/40 border border-cyan-500/30 p-4 font-mono text-xs text-cyan-300">
            RESULT: Prevented assembly line stop, zero emergency air expedites, protected margins.
          </div>
        </div>
      </div>
    </section>
  );
}
