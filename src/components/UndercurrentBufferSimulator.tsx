import React, { useState } from "react";
import {
  Sliders,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingDown,
  Info,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { playCyberBlip, playAlarmChime } from "../utils/audio";

export function UndercurrentBufferSimulator() {
  const [outageDays, setOutageDays] = useState<number>(28);

  // Buffer math:
  // T3 has 21 days buffer
  // T2 has 14 days buffer (starts depleting after T3 starves, or receives partial shipment)
  // T1 has 7 days finished buffer
  // OEM has 3 days on-site buffer
  // Critical failure timeline:
  // If outageDays > 21, T3 runs out at day 21
  // If outageDays > 27, T2 runs out at day 28
  // If outageDays > 33, T1 runs out at day 33
  // If outageDays >= 34, OEM assembly stops on Day 34!
  const isT3Depleted = outageDays >= 21;
  const isT2Depleted = outageDays >= 28;
  const isT1Depleted = outageDays >= 33;
  const isOEMStopped = outageDays >= 34;

  const shutdownDays = isOEMStopped ? outageDays - 33 : 0;
  const totalFinancialLossM = shutdownDays * 14.2; // $14.2M/day of assembly line halt

  const handleScenario = (days: number) => {
    setOutageDays(days);
    if (days >= 34) {
      playAlarmChime();
    } else {
      playCyberBlip(540, 0.06);
    }
  };

  return (
    <section id="buffer-simulator" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl border border-white/10 bg-[#090D18]/85 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/30 px-3 py-0.5 text-xs font-mono text-amber-300">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              EXECUTIVE RESILIENCE SCENARIO ENGINE
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
              Sub-Tier Cascading Buffer Depletion Simulator
            </h2>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              Quantitative modeling of how upstream raw-material shortfalls silently consume intermediate inventory reserves across multiple vendor tiers before causing an OEM assembly halt.
            </p>
          </div>

          {/* Quick Scenario Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-zinc-500 uppercase mr-1">SCENARIOS:</span>
            <button
              type="button"
              onClick={() => handleScenario(14)}
              className="rounded border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
            >
              14d Quota Delay
            </button>
            <button
              type="button"
              onClick={() => handleScenario(28)}
              className="rounded border border-amber-500/40 bg-amber-950/40 px-3 py-1.5 text-xs font-mono text-amber-200 hover:bg-amber-900/50 transition cursor-pointer"
            >
              28d Smelter Chill
            </button>
            <button
              type="button"
              onClick={() => handleScenario(42)}
              className="rounded border border-red-500/40 bg-red-950/40 px-3 py-1.5 text-xs font-mono text-red-200 hover:bg-red-900/50 transition cursor-pointer"
            >
              42d Grid Curtailment
            </button>
          </div>
        </div>

        {/* The Outage Slider */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-cyan-400" />
              <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
                SIMULATE FACTORY A SMELTER OUTAGE DURATION:
              </span>
            </div>
            <span className="font-mono text-xl font-bold text-cyan-400">
              {outageDays} Days of Production Deficit
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="45"
            step="1"
            value={outageDays}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setOutageDays(val);
              if (val === 34) playAlarmChime();
            }}
            className="w-full h-3 bg-zinc-800 rounded-lg accent-cyan-400 cursor-pointer"
          />

          <div className="flex justify-between font-mono text-[11px] text-zinc-500">
            <span>Day 0 (Baseline)</span>
            <span className="text-amber-400">Day 21 (T3 Buffer Gone)</span>
            <span className="text-orange-400">Day 28 (T2 Starved)</span>
            <span className="text-red-400 font-bold">Day 34 (OEM Assembly Line Halt)</span>
            <span>Day 45 (Catastrophic)</span>
          </div>
        </div>

        {/* Cascade Propagation Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* T3 Busan */}
          <div
            className={`rounded-xl border p-4 transition-all ${
              isT3Depleted
                ? "border-red-500/50 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                : "border-white/10 bg-black/40"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono font-bold text-amber-400">[T3] Busan Forging</span>
              <span className="font-mono text-[10px] text-zinc-400">21d Safety Buffer</span>
            </div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full transition-all duration-300 ${isT3Depleted ? "bg-red-500" : "bg-amber-400"}`}
                style={{
                  width: `${Math.max(0, Math.min(100, ((21 - Math.min(outageDays, 21)) / 21) * 100))}%`
                }}
              />
            </div>
            <div className="font-mono text-xs">
              {isT3Depleted ? (
                <span className="text-red-400 font-semibold flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  BUFFER EXHAUSTED (Day 21)
                </span>
              ) : (
                <span className="text-zinc-300">
                  {21 - outageDays} days reserve remaining
                </span>
              )}
            </div>
            <p className="mt-2 text-[11px] text-zinc-400">
              Feeds forged caliper blanks to Tier-2.
            </p>
          </div>

          {/* T2 Hamburg */}
          <div
            className={`rounded-xl border p-4 transition-all ${
              isT2Depleted
                ? "border-red-500/50 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                : "border-white/10 bg-black/40"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono font-bold text-cyan-400">[T2] Hamburg Caliper</span>
              <span className="font-mono text-[10px] text-zinc-400">14d Safety Buffer</span>
            </div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full transition-all duration-300 ${isT2Depleted ? "bg-red-500" : "bg-cyan-400"}`}
                style={{
                  width: `${
                    outageDays <= 21
                      ? 100
                      : Math.max(0, Math.min(100, ((28 - Math.min(outageDays, 28)) / 7) * 100))
                  }%`
                }}
              />
            </div>
            <div className="font-mono text-xs">
              {isT2Depleted ? (
                <span className="text-red-400 font-semibold flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  BLANKS STARVED (Day 28)
                </span>
              ) : (
                <span className="text-zinc-300">
                  {outageDays <= 21 ? "14 days reserve intact" : `${28 - outageDays} days reserve remaining`}
                </span>
              )}
            </div>
            <p className="mt-2 text-[11px] text-zinc-400">
              Machines hydraulic calipers for Tier-1.
            </p>
          </div>

          {/* T1 Detroit */}
          <div
            className={`rounded-xl border p-4 transition-all ${
              isT1Depleted
                ? "border-red-500/50 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                : "border-white/10 bg-black/40"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono font-bold text-blue-400">[T1] Detroit Integrator</span>
              <span className="font-mono text-[10px] text-zinc-400">7d Finished Buffer</span>
            </div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full transition-all duration-300 ${isT1Depleted ? "bg-red-500" : "bg-blue-400"}`}
                style={{
                  width: `${
                    outageDays <= 28
                      ? 100
                      : Math.max(0, Math.min(100, ((33 - Math.min(outageDays, 33)) / 5) * 100))
                  }%`
                }}
              />
            </div>
            <div className="font-mono text-xs">
              {isT1Depleted ? (
                <span className="text-red-400 font-semibold flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  MODULES DEPLETED (Day 33)
                </span>
              ) : (
                <span className="text-zinc-300">
                  {outageDays <= 28 ? "Still reports 100% on-time" : `${33 - outageDays} days modules remaining`}
                </span>
              )}
            </div>
            <p className="mt-2 text-[11px] text-zinc-400">
              Contracted supplier to automotive OEM.
            </p>
          </div>

          {/* OEM Kentucky Assembly */}
          <div
            className={`rounded-xl border p-4 transition-all ${
              isOEMStopped
                ? "border-red-500 bg-red-950/40 shadow-[0_0_25px_rgba(239,68,68,0.3)]"
                : "border-white/10 bg-black/40"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono font-bold text-purple-400">[TARGET] OEM Assembly</span>
              <span className="font-mono text-[10px] text-zinc-400">3d JIT Buffer</span>
            </div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full transition-all duration-300 ${isOEMStopped ? "bg-red-600" : "bg-purple-400"}`}
                style={{ width: `${isOEMStopped ? 0 : 100}%` }}
              />
            </div>
            <div className="font-mono text-xs">
              {isOEMStopped ? (
                <span className="text-red-400 font-bold flex items-center gap-1">
                  <AlertOctagon className="h-4 w-4" />
                  LINE STOP TRIGGERED
                </span>
              ) : (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Operating (Buffers Absorbing)
                </span>
              )}
            </div>
            <p className="mt-2 text-[11px] text-zinc-400">
              1,250 vehicles/day line rate halted.
            </p>
          </div>
        </div>

        {/* Simulator Impact Callout */}
        <div className="rounded-2xl border border-zinc-800 bg-[#070B13] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">
              EXECUTIVE STRESS-TEST ASSESSMENT:
            </span>
            <p className="text-lg font-semibold text-white">
              {isOEMStopped ? (
                <span className="text-red-400">
                  Critical line-stop ongoing for {shutdownDays} days. Assembly lines 1 &amp; 2 idle.
                </span>
              ) : (
                <span className="text-cyan-300">
                  {34 - outageDays} days of total buffer runway remain before vehicle final-assembly halts.
                </span>
              )}
            </p>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              Undercurrent triggers automated early detection on Day 2 as customs declarations deviate, affording procurement teams a 32-day strategic window to dual-source magnesium billets before tier-1 depletion.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="font-mono text-[10px] text-zinc-400 block uppercase font-semibold">
                ESTIMATED CUMULATIVE EXPOSURE
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-red-400">
                ${totalFinancialLossM.toFixed(1)}M
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block">
                $14.2M/day line-stop idle surcharge
              </span>
            </div>

            <a
              href={`mailto:nikswag211@gmail.com?subject=Undercurrent%20Simulation%20Report%20-%20Day%20${outageDays}%20Outage&body=Simulation%20Parameters:%0AOutage%20Duration:%20${outageDays}%20days%0AOEM%20Line%20Stop:%20${isOEMStopped ? "TRIGGERED" : "Safe"}%0AEstimated%20Loss:%20$${totalFinancialLossM.toFixed(1)}M%0A%0AReferred%20to%20Executive%20Desk%20of%20SAGNIK%20PRADHAN.`}
              className="rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-4 py-2.5 text-center font-mono text-xs text-cyan-200 hover:bg-cyan-900/50 hover:text-white transition flex items-center gap-1.5"
            >
              Export Scenario to Executive Desk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
