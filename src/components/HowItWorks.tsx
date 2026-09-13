export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Customer provides tier-1 list',
      summary: 'You provide a list of your confirmed direct tier-1 vendors—names, tax IDs, or manufacturing addresses. No software installation, API integration, or supplier questionnaires required.',
      technicalMeta: 'Input: Direct vendor master list • Zero supplier friction',
    },
    {
      num: '02',
      title: 'System infers tier-2 dependencies',
      summary: 'Using international trade customs data, maritime bills of lading, and export declarations, Undercurrent maps the suppliers feeding your tier-1 nodes, weighting every link with an empirical confidence score.',
      technicalMeta: 'Depth: Tier 2 through Tier 5 • Confidence-scored links',
    },
    {
      num: '03',
      title: 'Continuous anomaly monitoring',
      summary: 'Each upstream facility is continuously monitored against its historical operational baselines: AIS vessel departure rhythms, container dwell intervals, customs filing frequency, and localized grid events.',
      technicalMeta: 'Telemetry: 24/7 trade & vessel streams • Baselined models',
    },
    {
      num: '04',
      title: 'Alerts show source and confidence',
      summary: 'When a supplier anomaly emerges, Undercurrent generates an alert before the disruption reaches your inventory. Every alert links directly to raw customs records, vessel IDs, and estimated lead times to line impact.',
      technicalMeta: 'Evidence: Auditable manifests • Lead time: 18–35 days',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full border-b border-[#E2E4E8] bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center font-mono text-xs font-medium text-[#3A5A73] bg-[#F7F7F4] border border-[#E2E4E8] px-2.5 py-1 rounded-[3px]">
            Methodology &amp; data flow
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-[#161B22] tracking-tight">
            How it works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#161B22]/80 leading-relaxed">
            Deterministic upstream mapping built on international trade customs, maritime tracking, and facility-level anomaly modeling—without relying on tier-1 self-reporting.
          </p>
        </div>

        {/* 4-column card grid */}
        <div
          id="how-it-works-grid"
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <div
              key={step.num}
              id={`how-it-works-step-${step.num}`}
              className="flex flex-col justify-between rounded-[4px] border border-[#E2E4E8] bg-[#F7F7F4] p-5 sm:p-6 transition-all hover:border-[#3A5A73]/60 hover:bg-white"
            >
              <div>
                {/* Step number */}
                <div className="flex items-center justify-between border-b border-[#E2E4E8] pb-3">
                  <span className="font-mono text-lg font-bold text-[#3A5A73]">
                    {step.num}
                  </span>
                  <span className="font-mono text-[11px] text-[#3A5A73]">
                    PHASE {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-base font-semibold text-[#161B22] leading-snug">
                  {step.title}
                </h3>

                {/* Body */}
                <p className="mt-2 text-xs sm:text-sm text-[#161B22]/80 leading-relaxed">
                  {step.summary}
                </p>
              </div>

              {/* Technical Meta Tag */}
              <div className="mt-6 border-t border-[#E2E4E8] pt-3">
                <span className="font-mono text-[11px] text-[#3A5A73] block leading-tight">
                  {step.technicalMeta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
