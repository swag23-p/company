import React from 'react';
import {
  X,
  AlertTriangle,
  FileText,
  CheckCircle2,
  MapPin,
  Ship,
  Zap,
  Radio,
  ExternalLink,
  ShieldAlert,
  ArrowDownRight,
  Download
} from 'lucide-react';
import { ACTIVE_DOSSIER } from '../supplyChainData';
import { playCyberBlip } from '../utils/audio';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DossierModal({ isOpen, onClose }: DossierModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
    >
      <div className="relative my-8 w-full max-w-3xl rounded-2xl border border-red-500/40 bg-[#0A0E1A]/95 p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.2)] max-h-[90vh] overflow-y-auto text-zinc-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            playCyberBlip(440, 0.05);
            onClose();
          }}
          className="absolute right-5 top-5 rounded-lg border border-white/10 p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
          aria-label="Close dossier modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Dossier Header */}
        <div className="border-b border-white/10 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-red-400 bg-red-950/60 border border-red-500/30 px-2.5 py-1 rounded-md">
              <AlertTriangle className="h-3.5 w-3.5" />
              CLASSIFIED UNREDACTED ANOMALY DOSSIER
            </span>
            <span className="font-mono text-xs text-zinc-400">
              ALERT REF: <strong className="text-white">{ACTIVE_DOSSIER.alertId}</strong>
            </span>
          </div>

          <h3
            id="dossier-modal-title"
            className="mt-3 text-2xl font-bold text-white font-display"
          >
            Tangshan Smelter Upstream Disruption Audit
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-400">
            <div>Lead-time to OEM line halt: <strong className="text-amber-400 font-semibold">{ACTIVE_DOSSIER.estimatedLeadTimeToImpact}</strong></div>
            <div>Affected downstream output: <strong className="text-red-400 font-semibold">{ACTIVE_DOSSIER.affectedProductionEstimate}</strong></div>
            <div>Corroboration score: <strong className="text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded">{ACTIVE_DOSSIER.confidenceScore}%</strong></div>
          </div>
        </div>

        {/* The Exact Alert Statement from Prompt */}
        <div className="mt-5 rounded-xl border border-amber-500/40 bg-amber-950/30 p-4 shadow-inner">
          <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
            System Telemetry Directive
          </span>
          <p className="font-mono text-xs text-zinc-200 leading-relaxed">
            &quot;18–35 days — Factory A shows declining production, abnormal shipping, power interruptions. Estimated affected downstream production: $4.7B. Recommended: qualify alternate supplier, reroute shipments.&quot;
          </p>
        </div>

        {/* Upstream Propagation Path */}
        <div className="mt-6">
          <span className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
            Multi-Tier Propagation Chain
          </span>
          <div className="rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-red-400 font-bold">
              <span>[T4] Factory A — Specialty Alloy Smelter (Tangshan)</span>
              <span className="text-[10px] bg-red-950/80 border border-red-500/40 px-2 py-0.5 rounded">ORIGIN OF ANOMALY</span>
            </div>
            <div className="pl-4 text-zinc-500 text-[11px]">↓ Supplies forged billets (HS 7228.30) via Bohai Bay</div>
            <div className="flex items-center justify-between text-amber-400">
              <span>[T3] Supplier B — Precision Hot-Forging Co. (Busan)</span>
              <span className="text-[10px] text-zinc-400">Buffer: 21 days remaining</span>
            </div>
            <div className="pl-4 text-zinc-500 text-[11px]">↓ Supplies caliper piston blanks (HS 8708.30) via Suez</div>
            <div className="flex items-center justify-between text-cyan-400">
              <span>[T2] Supplier C — Hydraulic Caliper Machining GmbH (Hamburg)</span>
              <span className="text-[10px] text-zinc-400">Buffer: 14 days remaining</span>
            </div>
            <div className="pl-4 text-zinc-500 text-[11px]">↓ Supplies hydraulic brake caliper assemblies via Transatlantic</div>
            <div className="flex items-center justify-between text-blue-400">
              <span>[T1] Supplier D — Braking Systems Tier-1 Integrator (Detroit)</span>
              <span className="text-[10px] text-red-400 bg-red-950/40 border border-red-500/20 px-1.5 py-0.5 rounded">Direct vendor (unaware of deficit)</span>
            </div>
            <div className="pl-4 text-zinc-500 text-[11px]">↓ Delivers finished brake modules to assembly dock</div>
            <div className="flex items-center justify-between font-bold text-purple-400">
              <span>[TARGET] Automotive OEM Final Production Plant (Kentucky)</span>
              <span className="text-[10px] text-red-400 bg-red-950 border border-red-500/40 px-2 py-0.5 rounded">Line-Stop Risk in 18–35d</span>
            </div>
          </div>
        </div>

        {/* Anomaly Evidence Breakdown */}
        <div className="mt-6">
          <span className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
            Independent Telemetry Vectors
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs">
              <div className="font-mono text-[10px] text-zinc-500 uppercase">Vector 01</div>
              <div className="font-semibold text-white mt-0.5">Customs Filings</div>
              <div className="font-mono text-xs text-red-400 font-bold mt-1">-41.2% shipment volume</div>
              <p className="mt-1.5 text-[11px] text-zinc-400 leading-normal">
                Export manifests from Port of Tianjin dropped 41% vs. 90-day baseline across HS 7228 codes.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs">
              <div className="font-mono text-[10px] text-zinc-500 uppercase">Vector 02</div>
              <div className="font-semibold text-white mt-0.5">Maritime AIS</div>
              <div className="font-mono text-xs text-amber-400 font-bold mt-1">+12.4 days dwell time</div>
              <p className="mt-1.5 text-[11px] text-zinc-400 leading-normal">
                Chartered bulk carrier Ever Valor anchored off Caofeidian awaiting unfulfilled smelter cargo.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs">
              <div className="font-mono text-[10px] text-zinc-500 uppercase">Vector 03</div>
              <div className="font-semibold text-white mt-0.5">Power Grid Curtailed</div>
              <div className="font-mono text-xs text-cyan-400 font-bold mt-1">48 MW load drop</div>
              <p className="mt-1.5 text-[11px] text-zinc-400 leading-normal">
                Hebei provincial utility telemetry confirmed 3 distinct curtailment periods at Substation 884.
              </p>
            </div>
          </div>
        </div>

        {/* Raw Manifest Audit Trail */}
        <div className="mt-6">
          <span className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
            Auditable Raw Trade Evidence
          </span>
          <div className="rounded-xl border border-white/10 bg-black/60 divide-y divide-white/5 font-mono text-xs">
            {ACTIVE_DOSSIER.rawEvidences.map((item, idx) => (
              <div key={idx} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="text-zinc-500">{item.label}:</span>{' '}
                  <span className="font-semibold text-white">{item.recordId}</span>
                </div>
                <span className="text-zinc-400 text-[11px]">{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action Playbook */}
        <div className="mt-6 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5">
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
            Recommended Action Playbook
          </span>
          <div className="space-y-2.5 text-xs text-zinc-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>1. Pre-qualify alternate Tier-3 supplier:</strong> Initiate emergency qualification for certified hot-forging alloy stock from secondary mills in Pohang, South Korea or Saarland, Germany.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>2. Reroute logistics pipeline:</strong> Re-allocate planned ocean container shipments via alternative transshipment lanes before scheduled feeder cancelations.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>3. Audit Tier-1 brake buffer:</strong> Instruct tier-1 vendor (Supplier D) to audit finished caliper safety inventory before downstream assembly schedules are breached.</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-mono text-[11px] text-zinc-500">
              TIMESTAMP: {ACTIVE_DOSSIER.timestamp}
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="font-mono text-[11px] text-cyan-400">
              All messages referred to: <a href="mailto:nikswag211@gmail.com" className="underline underline-offset-2 hover:text-cyan-300">nikswag211@gmail.com</a>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="mailto:nikswag211@gmail.com?subject=Undercurrent%20Classified%20Audit%20ALR-2026-08892&body=Reference:%20ALR-2026-08892%20-%20Tangshan%20Smelter%20Tier-4%20Disruption%0ALead-time:%2018-35%20days%0AImpact:%20$4.7B%0AMessage:%20Please%20send%20full%20upstream%20audit%20and%20qualification%20playbook."
              className="rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3.5 py-2 text-xs font-mono font-medium text-cyan-300 hover:bg-cyan-900/50 transition cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5" />
              Transmit to nikswag211@gmail.com
            </a>
            <button
              type="button"
              onClick={() => {
                playCyberBlip(440, 0.05);
                onClose();
              }}
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-xs font-mono font-medium text-white hover:bg-white/20 transition cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
