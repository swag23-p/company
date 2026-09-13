import { useState } from 'react';
import { DependencyChain } from './DependencyChain';
import { ThreeSupplyChainViewer } from './ThreeSupplyChainViewer';
import { Box, Layers } from 'lucide-react';

interface HeroProps {
  onOpenPilotModal: () => void;
  onOpenDossier: () => void;
}

export function Hero({ onOpenPilotModal, onOpenDossier }: HeroProps) {
  const [heroView, setHeroView] = useState<'3d' | '2d'>('3d');

  return (
    <section
      id="hero"
      className="relative w-full border-b border-[#E2E4E8] bg-white py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Messaging & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow Label (clean, technical, no all-caps decorative) */}
            <div className="mb-4">
              <span
                id="hero-eyebrow"
                className="inline-flex items-center font-mono text-xs font-medium text-[#3A5A73] bg-[#F7F7F4] border border-[#E2E4E8] px-2.5 py-1 rounded-[3px]"
              >
                Upstream supply-chain risk monitoring
              </span>
            </div>

            {/* Headline: Exactly as requested, no single-word highlight, no gradient */}
            <h1
              id="hero-headline"
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#161B22] leading-[1.15] tracking-tight"
            >
              You can see your suppliers. Not theirs.
            </h1>

            {/* Sub-line */}
            <p
              id="hero-subline"
              className="mt-5 text-base sm:text-lg text-[#161B22]/85 leading-relaxed"
            >
              Undercurrent watches the suppliers behind your known direct suppliers (tier 2 and beyond) using international trade customs, AIS vessel tracking, and public event telemetry. Receive confidence-scored anomaly alerts weeks before an upstream failure reaches your customer operations.
            </p>

            {/* Two CTA buttons: strictly no arrow-appended text */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                id="hero-primary-pilot-cta-btn"
                type="button"
                onClick={onOpenPilotModal}
                className="inline-flex items-center justify-center rounded-[4px] bg-[#161B22] px-5 py-3 text-sm font-mono font-medium text-white transition-colors hover:bg-[#3A5A73] focus:outline-none focus:ring-2 focus:ring-[#161B22] focus:ring-offset-2 cursor-pointer shadow-xs"
              >
                Apply for a pilot
              </button>
              <button
                id="hero-secondary-dossier-btn"
                type="button"
                onClick={onOpenDossier}
                className="inline-flex items-center justify-center rounded-[4px] border border-[#E2E4E8] bg-[#F7F7F4] px-5 py-3 text-sm font-mono font-medium text-[#161B22] transition-colors hover:bg-white hover:border-[#3A5A73] focus:outline-none focus:ring-2 focus:ring-[#3A5A73] cursor-pointer"
              >
                View sample alert dossier
              </button>
            </div>

            {/* Trust line naming target roles and industries */}
            <div className="mt-10 border-t border-[#E2E4E8] pt-6">
              <p
                id="hero-trustline"
                className="font-mono text-xs text-[#3A5A73] leading-normal"
              >
                Designed for VP Procurement, Chief Supply Chain Officers, and Risk Continuity Operations across Automotive &amp; EV, Semiconductors, Defense Manufacturing, and Critical Industry.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive 3D / 2D Dependency View */}
          <div className="lg:col-span-6 w-full flex flex-col">
            {/* View Switcher Header */}
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="font-mono text-[11px] text-[#3A5A73] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C97F2A] animate-pulse"></span>
                LIVE UPSTREAM TELEMETRY VIEW
              </span>
              <div className="flex items-center gap-1 border border-[#E2E4E8] bg-[#F7F7F4] p-0.5 rounded-[3px]">
                <button
                  type="button"
                  id="hero-switch-3d-btn"
                  onClick={() => setHeroView('3d')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-[2px] font-mono text-[11px] font-medium transition-colors cursor-pointer ${
                    heroView === '3d'
                      ? 'bg-[#161B22] text-white shadow-xs'
                      : 'text-[#161B22] hover:bg-white'
                  }`}
                >
                  <Box className="h-3 w-3" />
                  3D Spatial Twin
                </button>
                <button
                  type="button"
                  id="hero-switch-2d-btn"
                  onClick={() => setHeroView('2d')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-[2px] font-mono text-[11px] font-medium transition-colors cursor-pointer ${
                    heroView === '2d'
                      ? 'bg-[#161B22] text-white shadow-xs'
                      : 'text-[#161B22] hover:bg-white'
                  }`}
                >
                  <Layers className="h-3 w-3" />
                  2D Schematic Chain
                </button>
              </div>
            </div>

            {heroView === '3d' ? (
              <ThreeSupplyChainViewer
                onOpenPilotModal={onOpenPilotModal}
                onOpenDossier={onOpenDossier}
                initialMode="globe"
                isEmbedded={true}
              />
            ) : (
              <DependencyChain onOpenDossier={onOpenDossier} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
