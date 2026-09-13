import { useState } from 'react';
import { ThreeSupplyChainViewer } from './ThreeSupplyChainViewer';
import { Globe, Network, ShieldAlert, Cpu, Radio, Sparkles } from 'lucide-react';

interface ThreeTelemetrySectionProps {
  onOpenPilotModal: () => void;
  onOpenDossier: () => void;
}

export function ThreeTelemetrySection({
  onOpenPilotModal,
  onOpenDossier,
}: ThreeTelemetrySectionProps) {
  const [activeTab, setActiveTab] = useState<'globe' | 'topology'>('globe');

  return (
    <section
      id="3d-telemetry"
      className="relative w-full border-b border-[#E2E4E8] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E2E4E8]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span
                id="three-section-eyebrow"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#3A5A73] bg-[#F7F7F4] border border-[#E2E4E8] px-2.5 py-1 rounded-[3px]"
              >
                <Radio className="h-3.5 w-3.5 text-[#C97F2A] animate-pulse" />
                Live 3D Digital Twin
              </span>
              <span className="font-mono text-[11px] text-[#A63A2E] bg-[#A63A2E]/10 border border-[#A63A2E]/30 px-2 py-0.5 rounded-[2px]">
                Active Anomaly Detected (Tier 4)
              </span>
            </div>
            <h2
              id="three-section-title"
              className="mt-3 text-2xl sm:text-3xl font-semibold text-[#161B22] tracking-tight"
            >
              Interactive 3D Upstream Network Twin
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#161B22]/80 leading-relaxed">
              Explore your sub-tier supplier constellation in three dimensions. Track AIS vessel trajectories across global shipping straits, pinpoint customs volume collapses at tier-4 smelters, and visualize multi-tier latency propagation before direct vendors are aware.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex flex-col items-start md:items-end gap-1.5 font-mono text-xs text-[#3A5A73]">
            <div className="flex items-center gap-2 bg-[#F7F7F4] border border-[#E2E4E8] px-3 py-1.5 rounded-[3px]">
              <Cpu className="h-3.5 w-3.5 text-[#3A5A73]" />
              <span>Three.js WebGL Engine</span>
              <span className="text-[#161B22] font-semibold">60 FPS</span>
            </div>
            <span className="text-[11px] text-[#161B22]/60">Drag to rotate • Scroll to zoom</span>
          </div>
        </div>

        {/* 3D App Canvas Container */}
        <div className="mt-8">
          <ThreeSupplyChainViewer
            onOpenPilotModal={onOpenPilotModal}
            onOpenDossier={onOpenDossier}
            initialMode={activeTab}
          />
        </div>

        {/* Technical Capabilities Matrix */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
          <div className="p-4 rounded-[3px] border border-[#E2E4E8] bg-[#F7F7F4]">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#161B22]">
              <Globe className="h-4 w-4 text-[#3A5A73]" />
              Spatial AIS Vessel Geodesics
            </div>
            <p className="mt-2 text-[#161B22]/80 leading-relaxed">
              Correlates vessel positions, port dwell times, and canal bottleneck transit times directly with billed bill-of-lading declarations to calculate true maritime transit risk.
            </p>
          </div>

          <div className="p-4 rounded-[3px] border border-[#E2E4E8] bg-[#F7F7F4]">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#161B22]">
              <Network className="h-4 w-4 text-[#C97F2A]" />
              Multi-Tier Topology Propagation
            </div>
            <p className="mt-2 text-[#161B22]/80 leading-relaxed">
              Maps non-linear supplier dependencies up to Tier 6. When a tier-4 alloy smelter restricts output, Undercurrent calculates inventory buffer depletion across every intermediate sub-tier.
            </p>
          </div>

          <div className="p-4 rounded-[3px] border border-[#E2E4E8] bg-[#F7F7F4]">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#161B22]">
              <ShieldAlert className="h-4 w-4 text-[#A63A2E]" />
              Confidence-Scored Anomaly Thresholds
            </div>
            <p className="mt-2 text-[#161B22]/80 leading-relaxed">
              No false alarms from routine seasonality. Alerts trigger only when multi-source telemetry crosses deviation thresholds with at least 85% statistical confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
