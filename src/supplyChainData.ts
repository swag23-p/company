import { SupplyChainNode, TradeRouteArc, AlertDossier, IndustryProfile } from './types';

export const SUPPLY_CHAIN_NODES: SupplyChainNode[] = [
  {
    id: "t4-tangshan",
    tier: "T4",
    name: "Tangshan Specialty Alloy Smelter",
    role: "Sub-Tier Raw Material Smelter & Billet Foundry",
    facility: "Factory A — Blast Furnace Complex 03",
    location: "Tangshan, Hebei Province",
    country: "China",
    lat: 39.63,
    lng: 118.18,
    status: "CRITICAL_ANOMALY",
    colorHex: "#EF4444",
    confidenceScore: 94.2,
    bufferDaysRemaining: 0,
    leadTimeToTarget: "18–35 days",
    outputRate: "59% (Abnormal)",
    deviation: "-41.2% volume drop",
    materialSupplied: "High-grade structural alloy steel billets (HS 7228.30)",
    downstreamRecipient: "Busan Precision Hot-Forging Co. (Tier 3)",
    hsCode: "7228.30.90",
    vesselsEnRoute: 3,
    telemetrySummary: "Customs export manifests down 41%; 3 chartered bulk vessels anchored with +12.4d dwell; electrical substation curtailment logs confirmed."
  },
  {
    id: "t3-busan",
    tier: "T3",
    name: "Busan Precision Hot-Forging Co.",
    role: "Sub-Tier Primary Machining & Forging Mill",
    facility: "Noksan Industrial Complex Plant 2",
    location: "Busan Maritime District",
    country: "South Korea",
    lat: 35.18,
    lng: 129.07,
    status: "BUFFER_STRAIN",
    colorHex: "#F59E0B",
    confidenceScore: 89.6,
    bufferDaysRemaining: 21,
    leadTimeToTarget: "28–42 days",
    outputRate: "92% (Drawing down safety buffer)",
    deviation: "Raw billet stock -38%",
    materialSupplied: "Forged caliper piston blanks & mounting brackets",
    downstreamRecipient: "Hamburg Hydraulic Caliper Machining GmbH (Tier 2)",
    hsCode: "8708.30.10",
    vesselsEnRoute: 5,
    telemetrySummary: "Current production sustained by on-site safety buffer. Inventory of Tangshan alloy steel will exhaust in 21 days at current furnace velocity."
  },
  {
    id: "t2-hamburg",
    tier: "T2",
    name: "Hamburg Hydraulic Caliper Machining GmbH",
    role: "Sub-Tier Precision Hydraulic Specialist",
    facility: "Harburg Advanced Machining Center",
    location: "Hamburg Port Zone",
    country: "Germany",
    lat: 53.55,
    lng: 9.99,
    status: "WATCH",
    colorHex: "#00F0FF",
    confidenceScore: 91.4,
    bufferDaysRemaining: 14,
    leadTimeToTarget: "14–22 days",
    outputRate: "98% (Normal cadence)",
    deviation: "Upstream delay undetected",
    materialSupplied: "Dual-piston hydraulic brake caliper sub-assemblies",
    downstreamRecipient: "Detroit Braking Systems Integrator (Tier 1)",
    hsCode: "8708.30.50",
    vesselsEnRoute: 4,
    telemetrySummary: "Machining cells operating normally. Unaware that Busan hot-forging feedstock will be interrupted in 3 weeks."
  },
  {
    id: "t1-detroit",
    tier: "T1",
    name: "Detroit Braking Systems Integrator",
    role: "Contracted Tier-1 Module Integrator",
    facility: "Metro Detroit Integration Facility",
    location: "Auburn Hills, Michigan",
    country: "United States",
    lat: 42.33,
    lng: -83.05,
    status: "NORMAL",
    colorHex: "#3B82F6",
    confidenceScore: 98.0,
    bufferDaysRemaining: 7,
    leadTimeToTarget: "3–7 days",
    outputRate: "100% (Reported green to OEM)",
    deviation: "Zero warning to customer",
    materialSupplied: "Fully wired active brake modulation modules",
    downstreamRecipient: "Automotive OEM Assembly Complex (Kentucky)",
    hsCode: "8708.30.99",
    vesselsEnRoute: 2,
    telemetrySummary: "Contractually committed direct supplier. Internal ERP shows 'green' on-time status because their own supplier hasn't notified them."
  },
  {
    id: "target-oem",
    tier: "TARGET",
    name: "Kentucky Automotive OEM Assembly Complex",
    role: "Target Customer Final Assembly Facility",
    facility: "High-Volume Light Truck & SUV Production Lines 1 & 2",
    location: "Georgetown, Kentucky",
    country: "United States",
    lat: 38.20,
    lng: -84.55,
    status: "TARGET_OEM",
    colorHex: "#A855F7",
    confidenceScore: 96.5,
    bufferDaysRemaining: 3,
    leadTimeToTarget: "VULNERABLE (18–35d line-stop)",
    outputRate: "1,250 vehicles/day",
    deviation: "$4.7B quarterly exposure",
    materialSupplied: "Finished commercial and passenger vehicles",
    downstreamRecipient: "Global Dealer Networks (140k units/qtr)",
    hsCode: "8703.24.00",
    vesselsEnRoute: 0,
    telemetrySummary: "Target assembly lines carry 3 days of JIT buffer. Line halt triggers automatically when Tier-1 brake modules run out at Day 34."
  }
];

export const TRADE_ROUTES: TradeRouteArc[] = [
  {
    id: "route-tangshan-busan",
    fromNodeId: "t4-tangshan",
    toNodeId: "t3-busan",
    name: "Bohai Bay -> Yellow Sea Feeder",
    carrier: "COSCO Shipping Bulk Lines",
    transitDays: 3,
    vesselsActive: 3,
    status: "DEFICIT",
    colorHex: "#EF4444"
  },
  {
    id: "route-busan-hamburg",
    fromNodeId: "t3-busan",
    toNodeId: "t2-hamburg",
    name: "Busan -> Hamburg Container Lane (via Suez)",
    carrier: "Hapag-Lloyd / Maersk Alliance",
    transitDays: 28,
    vesselsActive: 7,
    status: "CONGESTED",
    colorHex: "#F59E0B"
  },
  {
    id: "route-hamburg-detroit",
    fromNodeId: "t2-hamburg",
    toNodeId: "t1-detroit",
    name: "Transatlantic North Maritime Corridor",
    carrier: "Atlantic Container Line (ACL)",
    transitDays: 11,
    vesselsActive: 4,
    status: "NORMAL",
    colorHex: "#00F0FF"
  },
  {
    id: "route-detroit-kentucky",
    fromNodeId: "t1-detroit",
    toNodeId: "target-oem",
    name: "Interstate I-75 / Norfolk Southern Rail Corridor",
    carrier: "JIT Dedicated Automotive Logistics",
    transitDays: 1,
    vesselsActive: 12,
    status: "NORMAL",
    colorHex: "#3B82F6"
  }
];

export const ACTIVE_DOSSIER: AlertDossier = {
  alertId: "ALR-2026-08892",
  timestamp: "2026-09-12 14:22:08 UTC",
  confidenceScore: 94.2,
  upstreamTier: 4,
  facilityName: "Factory A (Specialty Alloy Smelter Complex)",
  location: "Tangshan Industrial District, Hebei (39.63° N, 118.18° E)",
  downstreamCustomer: "Global Automotive OEM — Georgetown Assembly",
  estimatedLeadTimeToImpact: "18–35 days",
  affectedProductionEstimate: "$4.7 Billion",
  summary: "Factory A shows declining production, abnormal shipping manifests, and recurrent power interruptions. Estimated affected downstream vehicle production: $4.7B across two major vehicle platforms. Recommended: qualify alternate supplier, reroute shipments.",
  recommendedAction: "Immediately initiate emergency qualification for dual-source alloy stock with secondary mills in Pohang, South Korea or Saarland, Germany. Audit Tier-1 finished brake buffer inventory before Tier-2 blanks deplete.",
  vectors: [
    {
      type: "Customs & Port Manifests",
      observed: "1,420 MT / week",
      baseline: "2,410 MT / week",
      deviation: "-41.2% volume deficit",
      source: "China Customs BoL Declarations (Port of Tianjin / Jingtang)"
    },
    {
      type: "Maritime AIS Dwell",
      observed: "14.8 days anchorage",
      baseline: "2.4 days average",
      deviation: "+12.4 days dwell time",
      source: "Satellite AIS Transponders (IMO 9823417 Ever Valor & 2 bulkers)"
    },
    {
      type: "Power Grid Telemetry",
      observed: "48 MW intermittent load",
      baseline: "92 MW continuous baseload",
      deviation: "47.8% curtailment events",
      source: "State Grid Hebei Electric regional substation telemetry"
    },
    {
      type: "Thermal SAR Infrared",
      observed: "340°C furnace shell bloom",
      baseline: "510°C normal operation",
      deviation: "-33.3% thermal signature",
      source: "Copernicus Sentinel-2 & Commercial SAR constellation"
    }
  ],
  rawEvidences: [
    {
      label: "Customs Manifest Record",
      recordId: "COS-TSN-2026-9041A",
      description: "HS 7228.30.90 (Alloy Steel Bars, Hot-Rolled) — Shipped volume 59% of contractual quota."
    },
    {
      label: "Vessel AIS Position Log",
      recordId: "AIS-IMO-9823417-TSN",
      description: "Bulk carrier Ever Valor held at outer anchorage off Caofeidian for 12 days awaiting smelter delivery."
    },
    {
      label: "Substation Telemetry Anomaly",
      recordId: "SGE-HB-SUB884-FLT",
      description: "Three unannounced load shedding curtailments logged between Aug 28 and Sept 09."
    },
    {
      label: "Thermal Infrared Audit",
      recordId: "SAT-SAR-IR-88219",
      description: "Crucible 2 cooling cycle detected. Blast furnace 3 offline for unscheduled refractory maintenance."
    }
  ]
};

export const INDUSTRY_PROFILES: IndustryProfile[] = [
  {
    id: "automotive",
    name: "Automotive & EV OEMs",
    tier2Exposure: "High (Forgings, specialty alloys, ECU substrates, wire harnesses)",
    criticalUpstreamNodes: "Tier-3 billet smelters, Tier-4 copper mines, Tier-2 sensor packaging",
    typicalLeadTime: "14–45 days buffer before line stoppage"
  },
  {
    id: "aerospace",
    name: "Aerospace & Defense",
    tier2Exposure: "Critical (Vacuum arc remelt titanium, specialized fasteners, radome pre-pregs)",
    criticalUpstreamNodes: "Tier-3 ingot forgers, Tier-4 raw titanium sponges, Tier-2 avionics ASICs",
    typicalLeadTime: "60–180 days buffer with zero FAA substitution leeway"
  },
  {
    id: "industrial",
    name: "Heavy Machinery & Energy",
    tier2Exposure: "Elevated (Large ductile iron castings, hydraulic manifolds, bearings)",
    criticalUpstreamNodes: "Tier-3 sand-casting foundries, Tier-4 metallurgical coke, Tier-2 seals",
    typicalLeadTime: "21–60 days buffer before assembly idle"
  }
];
