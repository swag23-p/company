import { Check, Shield } from 'lucide-react';

interface PilotCTAProps {
  onOpenPilotModal: () => void;
}

export function PilotCTA({ onOpenPilotModal }: PilotCTAProps) {
  const pilotDeliverables = [
    {
      title: 'Tier-1 supplier list ingestion',
      detail: 'Secure onboarding of up to 250 direct suppliers via CSV or vendor master export. Zero IT or ERP integration required.',
    },
    {
      title: 'Full tier-2 & tier-3 graph inference',
      detail: 'Algorithmic mapping of your upstream supply network with explicit confidence scores derived from global customs data.',
    },
    {
      title: 'Continuous multi-signal anomaly monitoring',
      detail: '24/7 tracking of maritime vessel AIS movement, export customs clearance velocity, and industrial facility anomalies.',
    },
    {
      title: 'Weekly check-ins with dedicated intelligence analysts',
      detail: 'Regular tactical review calls with our trade intelligence desk to interpret signals, calibrate thresholds, and audit emerging alerts.',
    },
    {
      title: 'Final retrospective review & vulnerability dossier',
      detail: 'An executive-level audit of single-source sub-tier choke points and recommended secondary supplier qualifications.',
    },
  ];

  return (
    <section
      id="pilot"
      className="w-full border-b border-[#E2E4E8] bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        {/* Boxed panel container */}
        <div
          id="pilot-boxed-panel"
          className="rounded-[4px] border border-[#E2E4E8] bg-[#F7F7F4] p-6 sm:p-10 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Pilot Checklist */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#3A5A73] bg-white border border-[#E2E4E8] px-2.5 py-1 rounded-[3px]">
                  No-commitment 90-day pilot
                </span>
                <span className="font-mono text-xs text-[#C97F2A] font-medium bg-[#FFF8F0] border border-[#C97F2A]/30 px-2 py-0.5 rounded-[2px]">
                  Cohort Q3/Q4 Open
                </span>
              </div>

              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-[#161B22] tracking-tight">
                What’s included in the 90-day pilot
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#161B22]/75">
                Evaluate Undercurrent on your real supplier footprint with zero licensing fees and no software lock-in.
              </p>

              {/* Checklist */}
              <div className="mt-6 space-y-4">
                {pilotDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-white border border-[#3A5A73]/40 text-[#3A5A73]">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#161B22]">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#161B22]/75 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Limited Slots & CTA */}
            <div className="lg:col-span-5 rounded-[4px] border border-[#E2E4E8] bg-white p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#E2E4E8] pb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#3A5A73]" />
                    <span className="font-mono text-xs font-semibold text-[#161B22]">
                      COHORT CAPACITY
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#C97F2A]">
                    2 of 6 slots open
                  </span>
                </div>

                <h3 className="mt-4 text-base font-semibold text-[#161B22]">
                  Limited to 6 enterprise manufacturers per cohort
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#161B22]/80 leading-relaxed">
                  We deliberately cap each quarterly cohort to six enterprise organizations. This ensures our dedicated trade intelligence analysts directly review, corroborate, and calibrate every multi-tier alert before it reaches your supply chain risk operations team.
                </p>

                <div className="mt-4 rounded-[3px] bg-[#F7F7F4] p-3 border border-[#E2E4E8] font-mono text-xs text-[#3A5A73] space-y-1">
                  <div>• Duration: 90 days</div>
                  <div>• Software fee: $0 during pilot</div>
                  <div>• Required input: 50–250 Tier-1 vendor names</div>
                  <div>• Commitment: 30 min / bi-weekly review</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E4E8]">
                <button
                  id="pilot-panel-apply-btn"
                  type="button"
                  onClick={onOpenPilotModal}
                  className="w-full rounded-[4px] bg-[#161B22] px-5 py-3 text-center text-sm font-mono font-medium text-white transition-colors hover:bg-[#3A5A73] focus:outline-none focus:ring-2 focus:ring-[#161B22] focus:ring-offset-2 cursor-pointer shadow-xs"
                >
                  Apply for a pilot
                </button>
                <p className="mt-2 text-center font-mono text-[11px] text-[#3A5A73]">
                  Applications reviewed by our intelligence team within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
