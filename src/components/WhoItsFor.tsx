import { useState } from 'react';
import { IndustryProfile } from '../types';

export function WhoItsFor() {
  const industries: IndustryProfile[] = [
    {
      id: 'automotive-ev',
      name: 'Automotive & EV',
      tier2Exposure: 'High-tensile aluminum forges, battery cathode chemical precursors (lithium hydroxide / nickel sulfate), wire harness copper drawing plants, and steering rack machining centers.',
      criticalUpstreamNodes: 'Tier 2–4 specialized casting mills & chemical synthesizers',
      typicalLeadTime: '21–45 days ahead of line shut-down',
    },
    {
      id: 'semiconductors',
      name: 'Semiconductors',
      tier2Exposure: 'Ultra-pure specialty gas refiners (neon, krypton, silane), raw quartz crucibles, lead-frame stamped alloys, and photochemical resist precursor suppliers.',
      criticalUpstreamNodes: 'Tier 3–5 specialized mineral refiners & chemical plants',
      typicalLeadTime: '30–60 days ahead of wafer fab delays',
    },
    {
      id: 'pharmaceuticals',
      name: 'Pharmaceuticals',
      tier2Exposure: 'Active pharmaceutical ingredient (API) single-source synthesis facilities, USP-grade excipient providers, and specialized borosilicate glass vial molding operations.',
      criticalUpstreamNodes: 'Tier 2 key chemical intermediates & sterile packaging plants',
      typicalLeadTime: '25–40 days ahead of drug product batch failures',
    },
    {
      id: 'defense',
      name: 'Defense manufacturing',
      tier2Exposure: 'MIL-SPEC certified titanium ingot casting facilities, rad-hardened ceramic micro-packaging, aerospace-grade fastener alloys, and proprietary thermal coating centers.',
      criticalUpstreamNodes: 'Tier 3–4 precision metallurgical and coating specialists',
      typicalLeadTime: '30–90 days ahead of defense prime program reviews',
    },
    {
      id: 'logistics',
      name: 'Logistics',
      tier2Exposure: 'Deep-water transshipment feeder networks, intermodal rail chassis maintenance depots, and specialized heavy-lift container crane equipment fabricators.',
      criticalUpstreamNodes: 'Tier 2 transshipment hubs & equipment maintenance providers',
      typicalLeadTime: '14–28 days ahead of corridor congestion cascades',
    },
    {
      id: 'energy',
      name: 'Energy',
      tier2Exposure: 'Grain-oriented electrical steel (GOES) laminators for high-voltage transformers, subsea umbilical cable jacket extruders, and gas turbine blisk forge houses.',
      criticalUpstreamNodes: 'Tier 2–3 electrical metallurgy & specialized resin extruders',
      typicalLeadTime: '45–90 days ahead of grid infrastructure delays',
    },
    {
      id: 'retail',
      name: 'Large retail',
      tier2Exposure: 'Textile spinning and dyeing mills subject to localized power rationing, corrugated container pulp converters, and port-adjacent export consolidation warehouses.',
      criticalUpstreamNodes: 'Tier 2 fabric mills & packaging substrate manufacturers',
      typicalLeadTime: '18–30 days ahead of missed seasonal floor sets',
    },
  ];

  const [selectedId, setSelectedId] = useState<string>(industries[0].id);
  const activeIndustry = industries.find((i) => i.id === selectedId) || industries[0];

  return (
    <section
      id="who-its-for"
      className="w-full border-b border-[#E2E4E8] bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center font-mono text-xs font-medium text-[#3A5A73] bg-[#F7F7F4] border border-[#E2E4E8] px-2.5 py-1 rounded-[3px]">
            Target sectors
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-[#161B22] tracking-tight">
            Who it’s for
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#161B22]/80 leading-relaxed">
            Engineered for high-consequence discrete manufacturing and critical infrastructure where a single tier-3 raw material stockout halts millions in downstream output.
          </p>
        </div>

        {/* Chip List */}
        <div
          id="industry-chips-container"
          className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="Industries with tier-2 risk exposure"
        >
          {industries.map((industry) => {
            const isSelected = industry.id === selectedId;
            return (
              <button
                key={industry.id}
                id={`chip-${industry.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(industry.id)}
                className={`rounded-[4px] px-3.5 py-2 text-xs sm:text-sm font-mono transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-[#161B22] text-white border-[#161B22]'
                    : 'bg-[#F7F7F4] text-[#161B22] border-[#E2E4E8] hover:border-[#3A5A73] hover:bg-white'
                }`}
              >
                {industry.name}
              </button>
            );
          })}
        </div>

        {/* Selected Sector Risk Profile Card */}
        <div
          id="industry-detail-card"
          className="mt-8 rounded-[4px] border border-[#E2E4E8] bg-[#F7F7F4] p-6 sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E4E8] pb-4">
            <div>
              <span className="font-mono text-[11px] text-[#3A5A73] uppercase tracking-wider block">
                SECTOR SPECIFIC UPSTREAM BOTTLENECKS
              </span>
              <h3 className="text-lg font-semibold text-[#161B22] mt-0.5">
                {activeIndustry.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#3A5A73]">Lead warning window:</span>
              <span className="font-semibold text-[#161B22] bg-white border border-[#E2E4E8] px-2 py-0.5 rounded-[2px]">
                {activeIndustry.typicalLeadTime}
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-8">
              <h4 className="font-mono text-xs font-semibold text-[#161B22] uppercase tracking-wider">
                Unseen Tier-2 &amp; Tier-3 Exposure
              </h4>
              <p className="mt-2 text-sm text-[#161B22]/85 leading-relaxed">
                {activeIndustry.tier2Exposure}
              </p>
            </div>

            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#E2E4E8] pt-4 md:pt-0 md:pl-6">
              <h4 className="font-mono text-xs font-semibold text-[#3A5A73] uppercase tracking-wider">
                Critical Monitored Nodes
              </h4>
              <p className="mt-2 font-mono text-xs text-[#161B22] leading-relaxed">
                {activeIndustry.criticalUpstreamNodes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
