import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do you map our entire supply chain automatically?',
      answer:
        'No. Automated full-chain mapping without grounded direct anchors produces speculative noise. We start strictly from your confirmed tier-1 supplier list (names, tax IDs, or manufacturing addresses). From there, Undercurrent traces cross-border bills of lading, customs declarations, and commercial trade filings to infer tier-2 and tier-3 connections. Every single connection carries an explicit mathematical confidence score (e.g., 94.2%) based on shipment recurrence, reciprocal trade records, and corporate registry verification. If a link falls below our confidence threshold, it is not alerted on.',
    },
    {
      question: 'How is this different from a dashboard I already have?',
      answer:
        'Existing procurement dashboards rely almost exclusively on what your direct tier-1 vendors self-report into vendor portals, or on public geopolitical news wires (port strikes, weather events) that your team already reads on Bloomberg. Undercurrent monitors the empirical operational telemetry of the suppliers behind your suppliers. We track container dwell spikes, customs declaration drops, and facility-level power anomalies weeks before your tier-1 supplier experiences a parts shortage or notifies you of a delay.',
    },
    {
      question: 'What does the pilot actually cost us?',
      answer:
        'The 90-day pilot carries zero software licensing fee for approved cohort members. There are no setup fees and no post-pilot purchase obligations. Your required commitment is strictly operational: providing an initial list of 50 to 250 direct tier-1 suppliers (CSV or vendor master export) and dedicating 30 minutes every other week for a review call with our intelligence desk to evaluate live anomaly alerts.',
    },
    {
      question: 'Do our tier-1 suppliers know they are being monitored?',
      answer:
        'No. Undercurrent operates entirely on external, commercially available trade customs data, maritime AIS transponder signals, satellite observation, and public event telemetry. We never contact your suppliers, require software agents on their internal networks, or request access to vendor ERPs. Your surveillance remains completely independent and confidential.',
    },
    {
      question: 'How do you handle supplier confidentiality and proprietary BOM data?',
      answer:
        'Your tier-1 supplier lists and resulting multi-tier relationship topologies are isolated in single-tenant encrypted environments. We do not sell, share, or cross-pollinate customer supplier networks across accounts. All data is processed under strict enterprise non-disclosure agreements.',
    },
  ];

  return (
    <section
      id="faq"
      className="w-full border-b border-[#E2E4E8] bg-[#F7F7F4] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center font-mono text-xs font-medium text-[#3A5A73] bg-white border border-[#E2E4E8] px-2.5 py-1 rounded-[3px]">
            Direct answers
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-[#161B22] tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#161B22]/80 leading-relaxed">
            Direct responses to the technical, operational, and data-provenance questions enterprise risk teams ask most.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div id="faq-list" className="mt-10 max-w-3xl divide-y divide-[#E2E4E8] border-y border-[#E2E4E8] bg-white rounded-[4px]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} id={`faq-item-${idx}`} className="transition-colors">
                <button
                  type="button"
                  id={`faq-btn-${idx}`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-[#F7F7F4]/60 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#161B22]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#3A5A73] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#161B22]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#161B22]/80 leading-relaxed border-t border-[#E2E4E8]/60 pt-3"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
