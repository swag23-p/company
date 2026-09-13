import React, { useState } from "react";
import {
  Activity,
  Volume2,
  VolumeX,
  FileText,
  Sparkles,
  Sliders,
  Menu,
  X,
  ShieldAlert,
  ShieldCheck,
  Globe2,
  Radio,
  Lock
} from "lucide-react";
import { playCyberBlip } from "../utils/audio";

interface UndercurrentHeaderProps {
  onOpenDossier: () => void;
  onOpenPilot: () => void;
  onOpenSecurity?: (tab?: "overview" | "cryptography" | "compliance" | "disclosure") => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  wireframeMode: boolean;
  onToggleWireframe: () => void;
}

export function UndercurrentHeader({
  onOpenDossier,
  onOpenPilot,
  onOpenSecurity,
  isAudioOn,
  onToggleAudio,
  wireframeMode,
  onToggleWireframe
}: UndercurrentHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    playCyberBlip(520, 0.05);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-800/80 bg-[#06090F]/95 backdrop-blur-xl">
      {/* Institutional Executive Status & Owner Bar */}
      <div className="bg-[#080D17] border-b border-zinc-800/60 px-4 sm:px-6 py-2 font-mono text-[11px] text-zinc-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">EXECUTIVE OVERSIGHT:</span>
            <span className="font-bold text-white tracking-wide text-xs bg-zinc-800/90 border border-zinc-700 px-2 py-0.5 rounded text-zinc-100 shadow-sm">
              SAGNIK PRADHAN
            </span>
            <span className="hidden md:inline-block text-zinc-500 text-[10px]">| FOUNDER &amp; PRINCIPAL ARCHITECT</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400 text-[10px] uppercase tracking-wider">EXECUTIVE INQUIRIES:</span>
              <a
                href="mailto:nikswag211@gmail.com?subject=Executive%20Inquiry%20for%20SAGNIK%20PRADHAN%20-%20Undercurrent"
                className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-2 transition"
              >
                nikswag211@gmail.com
              </a>
            </div>
            <span className="hidden lg:inline text-zinc-700">|</span>
            <button
              type="button"
              onClick={() => {
                playCyberBlip(550, 0.05);
                onOpenSecurity?.("overview");
              }}
              className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition cursor-pointer text-[10px] bg-emerald-950/40 border border-emerald-500/40 px-2.5 py-0.5 rounded font-mono"
            >
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>SOC2 &amp; ITAR SECURITY ASSURED</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Status Badge */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo("hero-telemetry")}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-950 to-blue-950 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <Activity className="h-4.5 w-4.5 text-cyan-400 group-hover:scale-105 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold tracking-wider text-lg text-white block leading-none">
                  UNDERCURRENT
                </span>
                <span className="hidden sm:inline-block rounded bg-zinc-800/80 border border-zinc-700 px-1.5 py-0.5 text-[9px] font-mono text-zinc-300 font-medium leading-none">
                  SAGNIK PRADHAN
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase block mt-1">
                UPSTREAM SUPPLY CHAIN INTELLIGENCE
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5 font-mono text-xs text-zinc-300">
          <button
            type="button"
            onClick={() => scrollTo("hero-telemetry")}
            className="hover:text-cyan-300 transition cursor-pointer"
          >
            Digital Twin
          </button>
          <button
            type="button"
            onClick={() => scrollTo("buffer-simulator")}
            className="hover:text-cyan-300 transition cursor-pointer"
          >
            Resilience Engine
          </button>
          <button
            type="button"
            onClick={() => scrollTo("telemetry-vectors")}
            className="hover:text-cyan-300 transition cursor-pointer"
          >
            Customs &amp; AIS
          </button>
          <button
            type="button"
            onClick={() => scrollTo("why-undercurrent")}
            className="hover:text-cyan-300 transition cursor-pointer"
          >
            Strategic Value
          </button>
          <button
            type="button"
            onClick={() => {
              playCyberBlip(580, 0.05);
              onOpenSecurity?.("overview");
            }}
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Security Architecture
          </button>
          <button
            type="button"
            onClick={() => {
              playCyberBlip(620, 0.06);
              onOpenDossier();
            }}
            className="flex items-center gap-1.5 rounded border border-red-500/30 bg-red-950/30 px-2 py-1 text-red-400 hover:text-red-300 transition cursor-pointer"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Alert ALR-2026-08892</span>
          </button>
        </nav>

        {/* Right Utility Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={onToggleAudio}
            title={isAudioOn ? "Mute Acoustic Feedback" : "Enable Acoustic Feedback"}
            className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
          >
            {isAudioOn ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4 text-zinc-500" />}
          </button>

          {/* Wireframe toggle */}
          <button
            type="button"
            onClick={onToggleWireframe}
            title="Toggle 3D Schematic Topology View"
            className={`rounded-lg border p-2 transition cursor-pointer font-mono text-[10px] flex items-center gap-1.5 ${
              wireframeMode
                ? "border-cyan-500/60 bg-cyan-950/40 text-cyan-300"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white"
            }`}
          >
            <Radio className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">{wireframeMode ? "TOPOLOGY" : "SURFACE"}</span>
          </button>

          {/* Request Pilot CTA */}
          <button
            type="button"
            onClick={() => {
              playCyberBlip(880, 0.08);
              onOpenPilot();
            }}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-mono font-bold text-white hover:from-cyan-400 hover:to-blue-500 transition shadow-[0_0_20px_rgba(0,240,255,0.25)] flex items-center gap-2 cursor-pointer border border-cyan-400/30"
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span>SCHEDULE PILOT BRIEFING</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onToggleAudio}
            className="p-2 text-zinc-400"
          >
            {isAudioOn ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-zinc-800 bg-[#070B13]/98 p-4 space-y-3 font-mono text-xs">
          {/* Mobile Owner Attribution */}
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-center space-y-1">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Executive Oversight</div>
            <div className="text-white font-bold text-sm tracking-wide">SAGNIK PRADHAN</div>
            <div className="text-[11px] text-zinc-400">Founder &amp; Principal Architect</div>
            <a
              href="mailto:nikswag211@gmail.com?subject=Executive%20Inquiry%20for%20SAGNIK%20PRADHAN"
              className="text-cyan-300 hover:text-cyan-200 text-xs underline block pt-0.5"
            >
              nikswag211@gmail.com
            </a>
          </div>

          <button
            type="button"
            onClick={() => scrollTo("hero-telemetry")}
            className="block w-full text-left py-2 text-zinc-300 hover:text-white"
          >
            Digital Twin Simulation
          </button>
          <button
            type="button"
            onClick={() => scrollTo("buffer-simulator")}
            className="block w-full text-left py-2 text-zinc-300 hover:text-white"
          >
            Buffer Resilience Engine
          </button>
          <button
            type="button"
            onClick={() => scrollTo("telemetry-vectors")}
            className="block w-full text-left py-2 text-zinc-300 hover:text-white"
          >
            Customs &amp; Satellite Feeds
          </button>
          <button
            type="button"
            onClick={() => scrollTo("why-undercurrent")}
            className="block w-full text-left py-2 text-zinc-300 hover:text-white"
          >
            Strategic Architecture
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSecurity?.("overview");
            }}
            className="block w-full text-left py-2 text-emerald-400 font-semibold"
          >
            Security &amp; Zero-Trust Protocol
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDossier();
            }}
            className="block w-full text-left py-2 text-red-400"
          >
            Declassified Evidence Dossier (ALR-2026-08892)
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPilot();
            }}
            className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 font-bold text-white text-center mt-2 shadow-sm"
          >
            Schedule Executive Pilot
          </button>
          <a
            href="mailto:nikswag211@gmail.com?subject=Undercurrent%20Intelligence%20Inquiry"
            className="block text-center text-[11px] text-zinc-400 py-1 underline hover:text-cyan-300"
          >
            Direct Inquiry: nikswag211@gmail.com
          </a>
        </div>
      )}
    </header>
  );
}
