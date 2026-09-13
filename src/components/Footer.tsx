export function Footer() {
  return (
    <footer
      id="main-footer"
      className="w-full bg-white border-t border-[#E2E4E8] py-14 sm:py-16 text-xs text-[#161B22]"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Tagline */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2.5">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#161B22]"
                aria-hidden="true"
              >
                <rect x="2" y="3" width="7" height="7" rx="1" fill="#161B22" />
                <rect x="15" y="14" width="7" height="7" rx="1" stroke="#161B22" strokeWidth="1.5" />
                <path
                  d="M9 6.5H18.5V14"
                  stroke="#3A5A73"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                <circle cx="5.5" cy="6.5" r="1.5" fill="#C97F2A" />
                <circle cx="18.5" cy="17.5" r="1.5" fill="#3A5A73" />
              </svg>
              <span className="font-semibold text-base text-[#161B22] tracking-tight">
                Undercurrent
              </span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-[#161B22]/75 leading-relaxed max-w-md">
              Continuous multi-tier supply chain anomaly intelligence. Monitoring the suppliers behind your known direct vendors via trade customs records, maritime AIS tracking, and physical facility telemetry.
            </p>

            <div className="mt-4 font-mono text-xs text-[#3A5A73]">
              Contact risk desk: <a href="mailto:nikswag211@gmail.com" className="text-[#161B22] font-medium underline hover:text-[#3A5A73]">nikswag211@gmail.com</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <span className="font-mono text-xs font-semibold text-[#3A5A73] uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a href="#how-it-works" className="text-[#161B22]/80 hover:text-[#161B22] underline-offset-2 hover:underline">
                  How it works
                </a>
              </li>
              <li>
                <a href="#why-now" className="text-[#161B22]/80 hover:text-[#161B22] underline-offset-2 hover:underline">
                  Why now
                </a>
              </li>
              <li>
                <a href="#who-its-for" className="text-[#161B22]/80 hover:text-[#161B22] underline-offset-2 hover:underline">
                  Who it’s for
                </a>
              </li>
              <li>
                <a href="#pilot" className="text-[#161B22]/80 hover:text-[#161B22] underline-offset-2 hover:underline">
                  90-day pilot
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[#161B22]/80 hover:text-[#161B22] underline-offset-2 hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* System Telemetry & Feed Status */}
          <div className="md:col-span-3">
            <span className="font-mono text-xs font-semibold text-[#3A5A73] uppercase tracking-wider block">
              Telemetry Status
            </span>
            <div className="mt-3 rounded-[3px] border border-[#E2E4E8] bg-[#F7F7F4] p-3 font-mono text-[11px] text-[#3A5A73] space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Customs Feeds:</span>
                <span className="font-semibold text-[#161B22]">142 active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Vessel AIS Telemetry:</span>
                <span className="font-semibold text-[#161B22]">99.8% uptime</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Alert Latency:</span>
                <span className="font-semibold text-[#161B22]">&lt; 45 sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-[#E2E4E8] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#3A5A73]">
          <div>
            &copy; {new Date().getFullYear()} Undercurrent Intelligence Inc. All rights reserved to <a href="mailto:nikswag211@gmail.com" className="text-[#161B22] font-semibold underline">nikswag211@gmail.com</a>.
          </div>
          <div>
            Enterprise Upstream Risk Telemetry &amp; Anomaly Detection
          </div>
        </div>
      </div>
    </footer>
  );
}
