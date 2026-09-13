"use client";

import React, { useState } from "react";
import { Undercurrent3DCanvas } from "./components/Undercurrent3DCanvas";
import { UndercurrentHeader } from "./components/UndercurrentHeader";
import { UndercurrentHero } from "./components/UndercurrentHero";
import { UndercurrentHUD } from "./components/UndercurrentHUD";
import { UndercurrentBufferSimulator } from "./components/UndercurrentBufferSimulator";
import { UndercurrentTelemetryGrid } from "./components/UndercurrentTelemetryGrid";
import { UndercurrentWhyNow } from "./components/UndercurrentWhyNow";
import { UndercurrentFooter } from "./components/UndercurrentFooter";
import { DossierModal } from "./components/DossierModal";
import { PilotModal } from "./components/PilotModal";
import { SecurityProtocolModal } from "./components/SecurityProtocolModal";
import { SUPPLY_CHAIN_NODES, INDUSTRY_PROFILES } from "./supplyChainData";
import { SupplyChainNode } from "./types";
import { toggleAudio, isAudioEnabled, playCyberBlip } from "./utils/audio";
import { Factory, Shield, ArrowRight, Activity, Layers, Sparkles } from "lucide-react";

export default function App() {
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode>(SUPPLY_CHAIN_NODES[0]);
  const [orbitSpeed, setOrbitSpeed] = useState<number>(1.0);
  const [bufferStrain, setBufferStrain] = useState<number>(0.6);
  const [viewMode, setViewMode] = useState<"globe" | "topology">("globe");
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(isAudioEnabled());
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [isPilotOpen, setIsPilotOpen] = useState<boolean>(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState<boolean>(false);
  const [securityInitialTab, setSecurityInitialTab] = useState<"overview" | "cryptography" | "compliance" | "disclosure">("overview");

  const handleOpenSecurity = (tab: "overview" | "cryptography" | "compliance" | "disclosure" = "overview") => {
    setSecurityInitialTab(tab);
    setIsSecurityOpen(true);
  };

  const handleToggleAudio = () => {
    const newState = toggleAudio();
    setIsAudioOn(newState);
  };

  const handleScrollToSimulator = () => {
    const el = document.getElementById("buffer-simulator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070B] text-zinc-100 selection:bg-cyan-500/30 selection:text-white">
      {/* 1. Full-bleed Fixed 3D WebGL Canvas (stays alive in background) */}
      <Undercurrent3DCanvas
        selectedNode={selectedNode}
        onSelectNode={setSelectedNode}
        orbitSpeed={orbitSpeed}
        bufferStrain={bufferStrain}
        viewMode={viewMode}
        wireframeMode={wireframeMode}
      />

      {/* 2. Interactive Foreground Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Global Navigation Header */}
        <UndercurrentHeader
          onOpenDossier={() => setIsDossierOpen(true)}
          onOpenPilot={() => setIsPilotOpen(true)}
          onOpenSecurity={handleOpenSecurity}
          isAudioOn={isAudioOn}
          onToggleAudio={handleToggleAudio}
          wireframeMode={wireframeMode}
          onToggleWireframe={() => setWireframeMode(!wireframeMode)}
        />

        {/* Hero Section */}
        <UndercurrentHero
          selectedNode={selectedNode}
          onSelectNode={setSelectedNode}
          onOpenDossier={() => setIsDossierOpen(true)}
          onOpenPilot={() => setIsPilotOpen(true)}
          onScrollToSimulator={handleScrollToSimulator}
        />

        {/* Floating 3D Telemetry HUD Dock */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-12">
          <UndercurrentHUD
            selectedNode={selectedNode}
            onSelectNode={setSelectedNode}
            orbitSpeed={orbitSpeed}
            setOrbitSpeed={setOrbitSpeed}
            bufferStrain={bufferStrain}
            setBufferStrain={setBufferStrain}
            viewMode={viewMode}
            setViewMode={setViewMode}
            wireframeMode={wireframeMode}
            setWireframeMode={setWireframeMode}
            isAudioOn={isAudioOn}
            onToggleAudio={handleToggleAudio}
          />
        </section>

        {/* Dynamic Cascading Buffer Depletion Simulator */}
        <UndercurrentBufferSimulator />

        {/* Multi-Vector Telemetry Feeds */}
        <UndercurrentTelemetryGrid
          onOpenDossier={() => setIsDossierOpen(true)}
        />

        {/* Why Tier-1s Won't Warn You (Principal-Agent Dilemma) */}
        <UndercurrentWhyNow />

        {/* Sector Vulnerability & Industry Profiles */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="rounded-3xl border border-white/10 bg-[#080C16]/85 backdrop-blur-xl p-8 sm:p-12 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3.5 py-1 text-xs font-mono text-cyan-300">
                <Factory className="h-3.5 w-3.5 text-cyan-400" />
                INDUSTRY EXPOSURE ARCHETYPES
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
                Engineered for High-Consequence Manufacturing
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Single-source sub-tier choke points exist across every complex hardware manufacturing sector.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INDUSTRY_PROFILES.map((profile) => (
                <div
                  key={profile.id}
                  className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4 hover:border-cyan-500/40 transition"
                >
                  <h3 className="text-lg font-bold text-white font-display">
                    {profile.name}
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block">
                        Tier-2/3 Exposure
                      </span>
                      <p className="text-zinc-200 mt-0.5">{profile.tier2Exposure}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block">
                        Critical Upstream Nodes
                      </span>
                      <p className="text-cyan-300 font-mono text-[11px] mt-0.5">
                        {profile.criticalUpstreamNodes}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block">
                        Reaction Window
                      </span>
                      <p className="text-amber-400 font-mono text-[11px] mt-0.5">
                        {profile.typicalLeadTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Enterprise CTA Banner */}
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-black/60 to-purple-950/40 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="text-xl font-bold text-white font-display">
                  Map Your Critical Upstream Bill of Materials
                </h4>
                <p className="text-zinc-400 text-xs max-w-xl">
                  Deploy Undercurrent on your top 5 critical components for 90 days. Detect hidden tier-2, 3, and 4 vulnerabilities with zero supplier onboarding required.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  playCyberBlip(880, 0.08);
                  setIsPilotOpen(true);
                }}
                className="rounded-lg bg-cyan-500 px-6 py-3 text-xs font-mono font-bold text-black hover:bg-cyan-400 transition shadow-[0_0_25px_rgba(0,240,255,0.35)] shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                START 90-DAY ENTERPRISE PILOT
              </button>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <UndercurrentFooter
          onOpenPilot={() => setIsPilotOpen(true)}
          onOpenSecurity={handleOpenSecurity}
        />
      </div>

      {/* Classified Evidence Dossier Modal */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Enterprise Pilot Request Modal */}
      <PilotModal
        isOpen={isPilotOpen}
        onClose={() => setIsPilotOpen(false)}
        onOpenSecurity={() => handleOpenSecurity("overview")}
      />

      {/* Zero-Trust Security Protocol & Compliance Modal */}
      <SecurityProtocolModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
        initialTab={securityInitialTab}
      />
    </div>
  );
}
