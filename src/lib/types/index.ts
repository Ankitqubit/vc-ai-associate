export type DealStage = 
  | 'Inbound' 
  | 'First Look' 
  | 'First Call' 
  | 'Deep Dive' 
  | 'Pre-IC' 
  | 'IC' 
  | 'Due Diligence' 
  | 'Term Sheet' 
  | 'Closed Won' 
  | 'Closed Lost';

export interface Company {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  website: string;
  location: string;
  foundingDate?: string;
  teamSize?: number;
}

export interface FitScore {
  score: number; // 0-100
  rationale: string;
  breakdown: {
    team: number;
    market: number;
    traction: number;
    product: number;
  };
}

export interface Metric {
  id: string;
  name: string;
  value: string;
  trend?: string; // e.g., "+15% MoM"
  confidence: 'High' | 'Medium' | 'Low';
  source: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'note' | 'stage_change' | 'ai_action' | 'document';
  content: string;
  timestamp: string;
  author: {
    name: string;
    avatarUrl?: string;
    isAi?: boolean;
  };
}

export interface Deal {
  id: string;
  company: Company;
  stage: DealStage;
  fitScore: FitScore;
  owner: {
    name: string;
    avatarUrl?: string;
  };
  lastActivity: string; // ISO date
  source: string;
  metrics: Metric[];
  activities: Activity[];
}
