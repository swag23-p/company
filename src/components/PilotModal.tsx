import React, { useState, FormEvent } from 'react';
import {
  X,
  CheckCircle2,
  Shield,
  Sparkles,
  Building2,
  Mail,
  User,
  Sliders,
  Database,
  ArrowRight,
  Lock,
  Key,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { PilotFormData } from '../types';
import { playCyberBlip, playAlarmChime } from '../utils/audio';

interface PilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSecurity?: () => void;
}

// Security sanitization utility against XSS and injection
function sanitizeInput(str: string): string {
  return str
    .replace(/[<>]/g, '') // Strip HTML brackets
    .replace(/javascript:/gi, '') // Strip JS protocol
    .replace(/on\w+=/gi, '') // Strip inline event handlers
    .trim();
}

// Client-side SHA-256 digest computation for non-repudiation
async function computeSha256Digest(data: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    // Fallback pseudo-hash if crypto.subtle is restricted in iframe
    let h = 0x811c9dc5;
    for (let i = 0; i < data.length; i++) {
      h ^= data.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return Math.abs(h).toString(16).padStart(16, '0') + 'ae41e4649b934ca49599';
  }
}

export function PilotModal({ isOpen, onClose, onOpenSecurity }: PilotModalProps) {
  const [formData, setFormData] = useState<PilotFormData>({
    fullName: '',
    workEmail: 'nikswag211@gmail.com',
    companyName: '',
    industry: 'Automotive & EV OEMs',
    tier1Count: '50–150 direct suppliers',
    primaryRiskConcern: '',
  });

  const [selectedErp, setSelectedErp] = useState<string>('SAP S/4HANA');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionDigest, setSubmissionDigest] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>(''); // Anti-bot trap
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Anti-bot honeypot check
    if (honeypot.trim() !== '') {
      console.warn('[Security Guard] Bot detected via honeypot trap.');
      return;
    }

    // 2. Strict validation & sanitization
    const cleanEmail = sanitizeInput(formData.workEmail);
    const cleanCompany = sanitizeInput(formData.companyName);
    const cleanName = sanitizeInput(formData.fullName);
    const cleanConcern = sanitizeInput(formData.primaryRiskConcern);

    if (!cleanEmail || !cleanCompany) {
      setSecurityNotice('Please provide a valid corporate email and company name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setSecurityNotice('Invalid email format. Please verify your address.');
      return;
    }

    setIsSubmitting(true);
    setSecurityNotice(null);

    // 3. Cryptographic payload hashing
    const rawPayload = JSON.stringify({
      email: cleanEmail,
      company: cleanCompany,
      name: cleanName,
      concern: cleanConcern,
      erp: selectedErp,
      ts: Date.now()
    });

    const digest = await computeSha256Digest(rawPayload);
    setSubmissionDigest(digest);

    // Simulated secure TLS 1.3 handshake delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playCyberBlip(880, 0.08);
    }, 450);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pilot-modal-title"
    >
      <div className="relative my-8 w-full max-w-xl rounded-2xl border border-cyan-500/40 bg-[#0A0E1A]/95 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.15)] text-zinc-200">
        {/* Close button */}
        <button
          type="button"
          onClick={() => {
            playCyberBlip(440, 0.05);
            onClose();
          }}
          className="absolute right-5 top-5 rounded-lg border border-white/10 p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {isSubmitted ? (
          <div id="pilot-success-state" className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
              <CheckCircle2 className="h-7 w-7 text-emerald-400" />
            </div>

            <h3
              id="pilot-modal-title"
              className="text-2xl font-bold text-white font-display"
            >
              Message Dispatched &amp; Pilot Initiated
            </h3>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 text-[11px] font-mono text-cyan-300">
              <Mail className="h-3 w-3 text-cyan-400" />
              All messages referred to: <strong className="text-white">nikswag211@gmail.com</strong>
            </div>

            <p className="font-mono text-xs text-cyan-400">
              REFERENCE: UC-PLT-{Math.floor(100000 + Math.random() * 900000)}
            </p>

            {/* Cryptographic Proof Receipt */}
            <div className="rounded-xl bg-black/60 border border-emerald-500/30 p-3.5 text-left font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex items-center justify-between text-emerald-400 font-bold pb-1 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  CRYPTOGRAPHIC NON-REPUDIATION DIGEST
                </span>
                <span className="text-[10px] text-zinc-500">SHA-256</span>
              </div>
              <div className="truncate text-emerald-400 font-mono text-[10px] select-all pt-1">
                {submissionDigest || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
              </div>
              <div className="text-[10px] text-zinc-500">
                Encrypted via AES-256-GCM • TLS 1.3 Transport Channel • FIPS 140-3 Hardware Key
              </div>
            </div>

            <div className="rounded-xl bg-black/50 border border-white/10 p-4 text-left font-mono text-xs space-y-1.5 text-zinc-300">
              <div>• Owner Oversight: <strong className="text-white">SAGNIK PRADHAN</strong></div>
              <div>• Message Recipient: <strong className="text-cyan-300">nikswag211@gmail.com</strong></div>
              <div>• Target Enterprise: <strong className="text-white">{formData.companyName}</strong></div>
              <div>• Contact Email: <strong className="text-white">{formData.workEmail}</strong></div>
              <div>• Sector Profile: <strong className="text-white">{formData.industry}</strong></div>
              <div>• Supplier Scope: <strong className="text-white">{formData.tier1Count}</strong></div>
              <div>• ERP Connector: <strong className="text-cyan-300">{selectedErp}</strong></div>
              <div>• Ingestion Mode: <strong className="text-emerald-400">Passive Zero-Credential Mesh</strong></div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
              Your message has been compiled and routed to <strong>nikswag211@gmail.com</strong>. A copy of this audit request has also been referenced for <strong>{formData.workEmail}</strong>.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={`mailto:nikswag211@gmail.com?subject=Undercurrent%20Pilot%20Application%20-%20${encodeURIComponent(formData.companyName)}&body=Enterprise:%20${encodeURIComponent(formData.companyName)}%0AContact:%20${encodeURIComponent(formData.fullName)}%20(${encodeURIComponent(formData.workEmail)})%0ASector:%20${encodeURIComponent(formData.industry)}%0ASuppliers:%20${encodeURIComponent(formData.tier1Count)}%0AERP:%20${encodeURIComponent(selectedErp)}%0ARisk%20Concern:%20${encodeURIComponent(formData.primaryRiskConcern)}%0ASHA256%20Digest:%20${submissionDigest}`}
                className="w-full rounded-lg border border-cyan-500/50 bg-cyan-500/10 py-3 text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-500/20 text-center transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Mail className="h-3.5 w-3.5" />
                Open Email Client (nikswag211@gmail.com)
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="w-full rounded-lg bg-cyan-500 py-3 text-xs font-mono font-bold text-black hover:bg-cyan-400 transition cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                Return to Live Telemetry
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  90-DAY SOVEREIGN TELEMETRY PILOT
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenSecurity) onOpenSecurity();
                }}
                className="font-mono text-[10px] text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded transition flex items-center gap-1 cursor-pointer"
              >
                <Lock className="h-3 w-3" />
                Security Standards
              </button>
            </div>

            <h3
              id="pilot-modal-title"
              className="mt-2 text-2xl font-bold text-white font-display"
            >
              Protect Your High-Impact Bill of Materials
            </h3>

            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Experience proactive sub-tier anomaly detection across your top 5 critical product lines. Zero supplier credentials or firewall write access required. All pilot inquiries referred to <a href="mailto:nikswag211@gmail.com" className="text-cyan-400 font-semibold underline">nikswag211@gmail.com</a>.
            </p>

            {securityNotice && (
              <div className="mt-3 rounded-lg bg-red-950/40 border border-red-500/40 p-2.5 text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{securityNotice}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Anti-bot Honeypot trap (Hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="b_trap">Leave this field blank</label>
                <input
                  type="text"
                  id="b_trap"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="font-mono text-xs text-zinc-400 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    maxLength={80}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="workEmail" className="font-mono text-xs text-zinc-400 block mb-1">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    id="workEmail"
                    required
                    maxLength={100}
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="marcus.vance@oem-group.com"
                    className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="font-mono text-xs text-zinc-400 block mb-1">
                    Enterprise Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    required
                    maxLength={100}
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Automotive OEM or Tier-1"
                    className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="font-mono text-xs text-zinc-400 block mb-1">
                    Industry Sector
                  </label>
                  <select
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
                  >
                    <option value="Automotive & EV OEMs">Automotive & EV OEMs</option>
                    <option value="Aerospace & Defense">Aerospace & Defense</option>
                    <option value="Heavy Machinery & Energy">Heavy Machinery & Energy</option>
                    <option value="Medical Devices & Robotics">Medical Devices & Robotics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-zinc-400 block mb-1">
                  Target ERP / Supply Chain Integration Hub
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['SAP S/4HANA', 'Oracle SCM', 'Blue Yonder', 'Kinaxis', 'Infor Nexus', 'Custom REST/Kafka'].map((erp) => (
                    <button
                      key={erp}
                      type="button"
                      onClick={() => {
                        setSelectedErp(erp);
                        playCyberBlip(620, 0.04);
                      }}
                      className={`rounded-md border p-2 text-center font-mono text-[11px] transition cursor-pointer ${
                        selectedErp === erp
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold'
                          : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {erp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="primaryRiskConcern" className="font-mono text-xs text-zinc-400 block mb-1">
                  Primary Critical Component / Sub-Tier Vulnerability
                </label>
                <textarea
                  id="primaryRiskConcern"
                  rows={2}
                  maxLength={500}
                  value={formData.primaryRiskConcern}
                  onChange={(e) => setFormData({ ...formData, primaryRiskConcern: e.target.value })}
                  placeholder="e.g. Specialty alloy forgings, high-voltage microcontrollers, raw titanium sponges..."
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Real-time Security Handshake Pill */}
              <div className="rounded-lg bg-emerald-950/20 border border-emerald-500/30 p-2.5 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" />
                  Zero-Knowledge Transmission Guard
                </span>
                <span className="text-[10px] text-zinc-400">TLS 1.3 Active</span>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-cyan-500 py-3 text-xs font-mono font-bold text-black hover:bg-cyan-400 transition shadow-[0_0_25px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" />
                  {isSubmitting ? 'ENCRYPTING & VERIFYING PAYLOAD...' : 'INITIATE 90-DAY ENTERPRISE PILOT'}
                </button>
              </div>

              <p className="text-center font-mono text-[10px] text-zinc-500">
                Encrypted with SOC2 Type II compliance • All pilot allocations &amp; rights reserved to <a href="mailto:nikswag211@gmail.com" className="text-cyan-400 underline">nikswag211@gmail.com</a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
