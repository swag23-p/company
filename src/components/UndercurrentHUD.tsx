import React from "react";
import {
  RotateCw,
  Globe,
  GitCommit,
  Sliders,
  Eye,
  Radio,
  Volume2,
  VolumeX,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import { SupplyChainNode } from "../types";
import { SUPPLY_CHAIN_NODES } from "../supplyChainData";
import { playCyberBlip, playTierSelectSound } from "../utils/audio";

interface UndercurrentHUDProps {
  selectedNode: SupplyChainNode;
  onSelectNode: (node: SupplyChainNode) => void;
  orbitSpeed: number;
  setOrbitSpeed: (v: number) => void;
  bufferStrain: number;
  setBufferStrain: (v: number) => void;
  viewMode: "globe" | "topology";
  setViewMode: (m: "globe" | "topology") => void;
  wireframeMode: boolean;
  setWireframeMode: (w: boolean) => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
}

export function UndercurrentHUD({
  selectedNode,
  onSelectNode,
  orbitSpeed,
  setOrbitSpeed,
  bufferStrain,
  setBufferStrain,
  viewMode,
  setViewMode,
  wireframeMode,
  setWireframeMode,
  isAudioOn,
  onToggleAudio
}: UndercurrentHUDProps) {
  const handleModeChange = (mode: "globe" | "topology") => {
    setViewMode(mode);
    playCyberBlip(mode === "globe" ? 620 : 780, 0.06);
  };

  const handleWireframeToggle = () => {
    setWireframeMode(!wireframeMode);
    playCyberBlip(540, 0.05);
  };

  const handleReset = () => {
    setOrbitSpeed(1);
    setBufferStrain(0.5);
    setViewMode("globe");
    setWireframeMode(false);
    onSelectNode(SUPPLY_CHAIN_NODES[0]);
    playCyberBlip(880, 0.08);
  };

  return (
    <div
      id="undercurrent-hud-dock"
      className="rounded-xl border border-white/10 bg-[#090D16]/80 backdrop-blur-md p-4 text-xs shadow-2xl transition-all"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-wider text-cyan-400 uppercase">
            3D DIGITAL TWIN TELEMETRY HUD
          </span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <a
            href="mailto:nikswag211@gmail.com?subject=Undercurrent%203D%20Telemetry%20Inquiry"
            className="hidden md:inline font-mono text-[10px] text-zinc-400 hover:text-cyan-300 transition"
          >
            Messages: <span className="underline text-cyan-400">nikswag211@gmail.com</span>
          </a>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Audio toggle button */}
          <button
            type="button"
            onClick={onToggleAudio}
            title={isAudioOn ? "Mute Acoustic Feedback" : "Enable Acoustic Feedback"}
            className="rounded border border-white/10 bg-white/5 p-1.5 text-zinc-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
          >
            {isAudioOn ? <Volume2 className="h-3.5 w-3.5 text-cyan-400" /> : <VolumeX className="h-3.5 w-3.5 text-zinc-500" />}
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            title="Reset Telemetry Perspective"
            className="rounded border border-white/10 bg-white/5 p-1.5 text-zinc-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Mode & Node Selectors */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* View Mode Toggle */}
        <div>
          <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
            Projection Matrix
          </span>
          <div className="grid grid-cols-2 gap-1 rounded-lg border border-white/10 bg-black/40 p-1">
            <button
              type="button"
              onClick={() => handleModeChange("globe")}
              className={`flex items-center justify-center gap-1.5 rounded py-1.5 font-mono text-[11px] font-medium transition cursor-pointer ${
                viewMode === "globe"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              Global Earth
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("topology")}
              className={`flex items-center justify-center gap-1.5 rounded py-1.5 font-mono text-[11px] font-medium transition cursor-pointer ${
                viewMode === "topology"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <GitCommit className="h-3.5 w-3.5" />
              Exploded Tiers
            </button>
          </div>
        </div>

        {/* Wireframe Radar Mode */}
        <div>
          <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
            Sensor Rendering
          </span>
          <button
            type="button"
            onClick={handleWireframeToggle}
            className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-[11px] transition cursor-pointer ${
              wireframeMode
                ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-300"
                : "border-white/10 bg-black/40 text-zinc-300 hover:bg-white/5"
            }`}
          >
            <span className="flex items-center gap-2">
              <Eye className="h-3.5 w-3.5 text-cyan-400" />
              Radar Wireframe Mesh
            </span>
            <span className="text-[10px] uppercase font-bold text-cyan-400">
              {wireframeMode ? "ENABLED" : "OFF"}
            </span>
          </button>
        </div>
      </div>

      {/* Sliders: Orbital Speed & Buffer Anomaly Strain */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-white/10 pt-3">
        <div>
          <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 mb-1">
            <span>ORBITAL REVOLUTION SPEED</span>
            <span className="text-cyan-400">{orbitSpeed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0"
            max="2.5"
            step="0.1"
            value={orbitSpeed}
            onChange={(e) => {
              setOrbitSpeed(parseFloat(e.target.value));
            }}
            className="w-full accent-cyan-400 h-1.5 bg-black/60 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 mb-1">
            <span className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-red-400" />
              ANOMALY PULSE AMPLITUDE
            </span>
            <span className="text-red-400">{Math.round(bufferStrain * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.5"
            step="0.05"
            value={bufferStrain}
            onChange={(e) => {
              setBufferStrain(parseFloat(e.target.value));
            }}
            className="w-full accent-red-500 h-1.5 bg-black/60 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Interactive Tier Quick-Jump Bar */}
      <div className="mt-3 border-t border-white/10 pt-2.5">
        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 mb-1.5">
          <span>ACTIVE TELEMETRY TARGET:</span>
          <span className="text-white font-semibold truncate max-w-[200px]">
            {selectedNode.tier} — {selectedNode.facility}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
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
                className={`flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] transition cursor-pointer ${
                  isSelected
                    ? "bg-white text-black font-bold shadow-lg"
                    : "border border-white/10 bg-black/40 text-zinc-400 hover:text-white hover:border-white/30"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: node.colorHex }}
                />
                <span>{node.tier}</span>
                <span className="hidden sm:inline opacity-70">
                  {node.country}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
