import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Key,
  Server,
  EyeOff,
  AlertOctagon,
  X,
  CheckCircle2,
  Terminal,
  Cpu,
  Mail,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
import { playCyberBlip } from "../utils/audio";

interface SecurityProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "overview" | "cryptography" | "compliance" | "disclosure";
}

export function SecurityProtocolModal({
  isOpen,
  onClose,
  initialTab = "overview"
}: SecurityProtocolModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "cryptography" | "compliance" | "disclosure">(initialTab);
  const [copiedHash, setCopiedHash] = useState(false);

  if (!isOpen) return null;

  const sampleLedgerHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sampleLedgerHash);
    setCopiedHash(true);
    playCyberBlip(880, 0.05);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="security-modal-title"
    >
      <div className="relative my-8 w-full max-w-3xl rounded-2xl border border-cyan-500/40 bg-[#070B14]/95 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.2)] text-zinc-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            playCyberBlip(440, 0.05);
            onClose();
          }}
          className="absolute right-5 top-5 rounded-lg border border-white/10 p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
          aria-label="Close Security Modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-white/10 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-md">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              DEFENSE-GRADE ENTERPRISE SECURITY POSTURE
            </span>
            <span className="font-mono text-xs text-zinc-400">
              OWNER &amp; OVERSIGHT: <strong className="text-white">SAGNIK PRADHAN</strong>
            </span>
          </div>

          <h2
            id="security-modal-title"
            className="mt-3 text-2xl sm:text-3xl font-bold text-white font-display"
          >
            Zero-Trust Telemetry &amp; Data Protection Architecture
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Undercurrent operates under an impenetrable non-invasive architecture. We never request OEM internal credentials, never interface with vendor firewall write-APIs, and treat all upstream physical evidence with cryptographic non-repudiation.
          </p>

          {/* Navigation Tabs */}
          <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-4">
            {[
              { id: "overview", label: "Zero-Trust Mesh" },
              { id: "cryptography", label: "SHA-256 Audit Ledger" },
              { id: "compliance", label: "ITAR & SOC2 Standards" },
              { id: "disclosure", label: "Security & Vulnerability SLA" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playCyberBlip(600, 0.04);
                  setActiveTab(tab.id as any);
                }}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "bg-white/5 text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Zero-Trust Mesh Overview */}
        {activeTab === "overview" && (
          <div className="mt-6 space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-[11px]">
                  <Lock className="h-4 w-4" />
                  ZERO-CREDENTIAL INGESTION
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  We require <strong>zero supplier passwords, zero ERP write tokens, and zero internal database tunnels</strong>. Telemetry is gathered passively from sovereign public manifests and radar transponders.
                </p>
              </div>

              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-[11px]">
                  <Key className="h-4 w-4" />
                  AES-256-GCM AT REST
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  All enterprise Bill-of-Materials mappings are stored in isolated cryptographic enclaves with per-customer asymmetric key rotation and FIPS 140-3 Hardware Security Modules.
                </p>
              </div>

              <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-mono font-bold text-[11px]">
                  <Server className="h-4 w-4" />
                  AIR-GAPPED ENCLAVES
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  Cross-OEM data contamination is mathematically impossible. Each tenant&apos;s digital twin pipeline executes in logically air-gapped serverless micro-enclaves.
                </p>
              </div>
            </div>

            {/* Live Security Monitor Checklist */}
            <div className="rounded-xl border border-white/10 bg-black/50 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  LIVE SYSTEM SECURITY POSTURE
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded">
                  ALL MONITORS PASSING
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-[11px]">
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded border border-white/5 text-zinc-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>TLS 1.3 Transport Security: <strong>Enforced</strong></span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded border border-white/5 text-zinc-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>XSS / CSRF Anti-Injection Shield: <strong>Active</strong></span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded border border-white/5 text-zinc-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Supplier Zero-Privilege Sandbox: <strong>Isolated</strong></span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded border border-white/5 text-zinc-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>BOM Anonymization &amp; Hashing: <strong>100% Salted</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Cryptographic Audit Ledger */}
        {activeTab === "cryptography" && (
          <div className="mt-6 space-y-4 text-xs">
            <div className="rounded-xl border border-cyan-500/30 bg-black/60 p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-bold uppercase">IMMUTABLE EVIDENCE LEDGER RECORD</span>
                <span className="text-zinc-500 text-[10px]">HASH ALGORITHM: SHA-256</span>
              </div>

              <p className="text-zinc-300 text-[11px] font-sans">
                Every upstream customs filing, AIS beacon timestamp, and power load curtailment vector is hashed upon ingestion to form an immutable chain of custody admissible in dispute arbitration.
              </p>

              <div className="rounded-lg bg-zinc-950 p-3 border border-white/10 flex items-center justify-between gap-3">
                <div className="truncate text-emerald-400 text-[11px] select-all">
                  SHA256: {sampleLedgerHash}
                </div>
                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="rounded border border-white/20 bg-white/10 px-2 py-1 text-[10px] text-white hover:bg-white/20 transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedHash ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  {copiedHash ? "Copied" : "Copy Hash"}
                </button>
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-400 pt-2 border-t border-white/10">
                <div>• Provenance Node: <strong>Port of Tianjin BoL Book #CN-TJ-2026-9921</strong></div>
                <div>• Verification Signer: <strong>Undercurrent Sovereign Ingestion Key 0x4B29...F8</strong></div>
                <div>• Merkle Root Verification: <strong className="text-emerald-400">0x9F33...VALIDATED</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: ITAR & SOC2 Standards */}
        {activeTab === "compliance" && (
          <div className="mt-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold">
                  <FileCheck className="h-4 w-4 text-cyan-400" />
                  SOC2 Type II &amp; ISO 27001
                </div>
                <p className="text-zinc-300 leading-relaxed text-[11px]">
                  Annual independent third-party audits examining Security, Availability, and Confidentiality trust principles. Continuous automated monitoring across 120+ control baselines.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  ITAR &amp; EAR Defense Compliance
                </div>
                <p className="text-zinc-300 leading-relaxed text-[11px]">
                  Compliant with International Traffic in Arms Regulations (ITAR) and Export Administration Regulations (EAR99). US-citizen personnel screening and dedicated sovereign GovCloud instances available.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2">
              <span className="font-mono text-white font-bold block text-xs">GDPR &amp; CCPA Sovereign Privacy Compliance</span>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                Zero personal identifiable information (PII) is processed in upstream trade analysis. All individual customs declarant references are masked prior to algorithmic model indexing.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Vulnerability Disclosure */}
        {activeTab === "disclosure" && (
          <div className="mt-6 space-y-4 text-xs">
            <div className="rounded-xl border border-cyan-500/30 bg-black/40 p-5 space-y-3">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block">
                COORDINATED VULNERABILITY DISCLOSURE &amp; SECURITY DESK
              </span>

              <p className="text-zinc-300 leading-relaxed text-[11px]">
                Undercurrent maintains a zero-tolerance policy for unauthorized access and offers a bug bounty program for ethical security researchers.
              </p>

              <div className="rounded-lg bg-cyan-950/30 border border-cyan-500/30 p-3 font-mono text-xs text-zinc-200 space-y-1.5">
                <div>• Primary Security Lead &amp; Owner: <strong className="text-white">SAGNIK PRADHAN</strong></div>
                <div>
                  • Secure Reporting Inbox:{" "}
                  <a
                    href="mailto:nikswag211@gmail.com?subject=SECURITY%20VULNERABILITY%20DISCLOSURE%20-%20URGENT"
                    className="text-cyan-400 font-bold underline hover:text-cyan-300"
                  >
                    nikswag211@gmail.com
                  </a>
                </div>
                <div>• Emergency Incident Response SLA: <strong className="text-emerald-400">&lt; 15 minutes</strong></div>
                <div>• PGP Public Key Fingerprint: <span className="text-zinc-400 text-[10px]">8B7F 44C1 99A2 004E 33DF 88AC 1278 F9A1</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-emerald-400" />
            <span>Encrypted with AES-256-GCM &amp; TLS 1.3 Strict Mode</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="mailto:nikswag211@gmail.com?subject=Enterprise%20Security%20Whitepaper%20Request"
              className="rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 text-xs font-mono text-cyan-300 hover:bg-cyan-900/50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="h-3.5 w-3.5" />
              Request Security Whitepaper
            </a>
            <button
              type="button"
              onClick={() => {
                playCyberBlip(440, 0.05);
                onClose();
              }}
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-mono font-medium text-white hover:bg-white/20 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
