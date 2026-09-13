import React from "react";
import { Activity, ShieldCheck, Globe, Database, Terminal, ArrowUpRight } from "lucide-react";

export function UndercurrentFooter({
  onOpenPilot,
  onOpenSecurity
}: {
  onOpenPilot: () => void;
  onOpenSecurity?: (tab?: "overview" | "cryptography" | "compliance" | "disclosure") => void;
}) {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#040609]/90 backdrop-blur-xl text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                <Activity className="h-4 w-4" />
              </div>
              <span className="font-display font-bold tracking-wider text-base text-white">
                UNDERCURRENT
              </span>
            </div>
            <p className="text-zinc-400 text-xs font-sans max-w-md leading-relaxed">
              Continuous upstream supply-chain risk monitoring for tier-2 suppliers and beyond. Cross-mining sovereign customs declarations, vessel AIS dwell times, and regional power grid telemetry to prevent downstream assembly halts.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-zinc-500 pt-1 flex-wrap">
              <button
                type="button"
                onClick={() => onOpenSecurity?.("compliance")}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                SOC2 Type II Certified
              </button>
              <button
                type="button"
                onClick={() => onOpenSecurity?.("overview")}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
              >
                <Database className="h-3.5 w-3.5 text-cyan-400" />
                Zero Supplier Login Required
              </button>
            </div>
          </div>

          {/* Telemetry Nodes Covered */}
          <div className="space-y-2">
            <span className="text-white font-bold tracking-wider uppercase text-[11px] block">
              SENSOR SURFACES
            </span>
            <ul className="space-y-1.5 text-zinc-400 text-[11px]">
              <li>• Sovereign Customs BoL Declarations</li>
              <li>• Satellite AIS Transponder Feeds</li>
              <li>• Regional Power Grid Load Telemetry</li>
              <li>• Thermal Infrared SAR Constellations</li>
              <li>• Export Manifest Delta Scoring</li>
            </ul>
          </div>

          {/* Pilot Onboarding */}
          <div className="space-y-2">
            <span className="text-white font-bold tracking-wider uppercase text-[11px] block">
              ENTERPRISE PILOT & CONTACT
            </span>
            <p className="text-zinc-400 text-[11px] font-sans">
              All messages, pilot inquiries, and risk desk dispatches are referred to:
            </p>
            <a
              href="mailto:nikswag211@gmail.com"
              className="inline-block text-cyan-400 hover:text-cyan-300 font-mono text-[12px] font-bold underline underline-offset-2"
            >
              nikswag211@gmail.com
            </a>
            <div>
              <button
                type="button"
                onClick={onOpenPilot}
                className="mt-2 inline-flex items-center gap-1 rounded bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 text-[11px] font-bold text-white transition cursor-pointer"
              >
                Request Scoping Call
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            Owner: <strong className="text-white font-semibold">SAGNIK PRADHAN</strong> • © {new Date().getFullYear()} Undercurrent Intelligence Inc. All rights reserved and all messages referred to <a href="mailto:nikswag211@gmail.com" className="text-zinc-300 hover:text-cyan-400 font-semibold underline underline-offset-2">nikswag211@gmail.com</a>.
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => onOpenSecurity?.("overview")}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Security Protocol
            </button>
            <button
              type="button"
              onClick={() => onOpenSecurity?.("compliance")}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              ITAR &amp; EAR Compliance
            </button>
            <button
              type="button"
              onClick={() => onOpenSecurity?.("disclosure")}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Security Desk SLA
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
