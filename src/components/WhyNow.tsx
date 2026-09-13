import { Check, X } from 'lucide-react';

export function WhyNow() {
  const whatChanged = [
    {
      title: 'Planetary maritime AIS tracking',
      detail: 'Satellite and terrestrial Automatic Identification Systems (AIS) now track 250,000+ cargo vessels with minute-by-minute positional and port-dwell cadence worldwide.',
    },
    {
      title: 'Digitized customs & bills of lading',
      detail: 'Standardized customs manifests and export declarations across 140+ trading jurisdictions provide auditable, transaction-level trade flow evidence.',
    },
    {
      title: 'Facility-level physical telemetry',
      detail: 'Public and commercial event feeds, localized power grid telemetry, and port congestion sensors capture physical operational slowdowns as they occur.',
    },
    {
      title: 'Deterministic entity resolution',
      detail: 'Algorithmic reconciliation maps multi-lingual foreign factory names, tax registries, and shipping subsidiaries to confirmed parent corporate trees.',
    },
  ];

  const whatHasnt = [
    {
      title: 'Suppliers guard their sub-tier networks',
      detail: 'Direct suppliers routinely cite commercial sensitivity and NDAs, refusing to disclose which smelters, fabricators, or chemical plants supply them.',
    },
    {
      title: 'Reliance on annual self-reported surveys',
      detail: 'Risk teams continue to issue static questionnaires that reflect what suppliers wish to report rather than their real-time production status.',
    },
    {
      title: 'Discovery happens at the receiving dock',
      detail: 'Companies still discover a tier-2 or tier-3 disruption only when their tier-1 vendor sends a force majeure letter or misses a scheduled container.',
    },
    {
      title: 'Costly reactive freight expediting',
      detail: 'When shortages strike without warning, manufacturers spend millions on emergency air freight, spot-market parts brokers, and emergency re-tooling.',
    },
  ];

  return (
    <section
      id="why-now"
      className="w-full border-b border-[#E2E4E8] bg-[#F7F7F4] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center font-mono text-xs font-medium text-[#3A5A73] bg-white border border-[#E2E4E8] px-2.5 py-1 rounded-[3px]">
            Timing &amp; structural shift
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-[#161B22] tracking-tight">
            Why now
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#161B22]/80 leading-relaxed">
            The data required to observe sub-tier supplier operations now exists outside company walls. Yet enterprise supply chains remain as blind upstream as they were thirty years ago.
          </p>
        </div>

        {/* Two-Column Comparison */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Column 1: What changed */}
          <div
            id="what-changed-card"
            className="flex flex-col justify-between rounded-[4px] border border-[#3A5A73]/30 bg-white p-6 sm:p-8"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#E2E4E8] pb-4">
                <h3 className="text-lg font-semibold text-[#161B22]">
                  What changed
                </h3>
                <span className="font-mono text-xs font-semibold text-[#3A5A73] bg-[#F7F7F4] border border-[#E2E4E8] px-2 py-0.5 rounded-[2px]">
                  EXTERNAL TELEMETRY ACCESS
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {whatChanged.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-[#F7F7F4] border border-[#E2E4E8] text-[#3A5A73]">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#161B22]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-[#161B22]/75 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-[#E2E4E8] pt-4">
              <p className="font-mono text-xs text-[#3A5A73]">
                The operational reality of sub-tier manufacturing can now be detected externally without supplier cooperation.
              </p>
            </div>
          </div>

          {/* Column 2: What hasn't */}
          <div
            id="what-hasnt-changed-card"
            className="flex flex-col justify-between rounded-[4px] border border-[#E2E4E8] bg-white p-6 sm:p-8"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#E2E4E8] pb-4">
                <h3 className="text-lg font-semibold text-[#161B22]">
                  What hasn&apos;t
                </h3>
                <span className="font-mono text-xs font-semibold text-[#A63A2E] bg-[#FDF2F1] border border-[#A63A2E]/20 px-2 py-0.5 rounded-[2px]">
                  PROCUREMENT BLIND SPOTS
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {whatHasnt.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-[#FDF2F1] border border-[#A63A2E]/30 text-[#A63A2E]">
                      <X className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#161B22]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-[#161B22]/75 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-[#E2E4E8] pt-4">
              <p className="font-mono text-xs text-[#A63A2E]">
                Most enterprises still learn of an upstream breakdown only when a missed shipment idles their assembly lines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
