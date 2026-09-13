export interface SupplyChainNode {
  id: string;
  tier: "T4" | "T3" | "T2" | "T1" | "TARGET";
  name: string;
  role: string;
  facility: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
  status: "CRITICAL_ANOMALY" | "BUFFER_STRAIN" | "WATCH" | "NORMAL" | "TARGET_OEM";
  colorHex: string;
  confidenceScore: number;
  bufferDaysRemaining: number;
  leadTimeToTarget: string;
  outputRate: string;
  deviation: string;
  materialSupplied: string;
  downstreamRecipient: string;
  hsCode?: string;
  vesselsEnRoute?: number;
  telemetrySummary: string;
}

export interface TradeRouteArc {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  name: string;
  carrier: string;
  transitDays: number;
  vesselsActive: number;
  status: "NORMAL" | "CONGESTED" | "DEFICIT";
  colorHex: string;
}

export interface IndustryProfile {
  id: string;
  name: string;
  tier2Exposure: string;
  criticalUpstreamNodes: string;
  typicalLeadTime: string;
}

export interface PilotFormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  industry: string;
  tier1Count: string;
  primaryRiskConcern: string;
}

export interface AnomalyVector {
  type: string;
  observed: string;
  baseline: string;
  deviation: string;
  source: string;
}

export interface AlertDossier {
  alertId: string;
  timestamp: string;
  confidenceScore: number;
  upstreamTier: number;
  facilityName: string;
  location: string;
  downstreamCustomer: string;
  estimatedLeadTimeToImpact: string;
  affectedProductionEstimate: string;
  summary: string;
  recommendedAction: string;
  vectors: AnomalyVector[];
  rawEvidences: {
    label: string;
    recordId: string;
    description: string;
  }[];
}

