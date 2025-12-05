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
  | 'Closed Lost'
  | 'Passed';

export interface Company {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  website: string;
  location: string;
  foundingDate?: string;
  teamSize?: number;
  enrichment?: any; // EnrichmentData from mock-companies.ts
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

export interface CallSummary {
  id?: string;
  whatWeLearned: string[];
  metricsShared: Array<{ name: string; value: string; change?: string }>;
  risksAndConcerns: string[];
  nextSteps: string[];
  metadata: {
    date: string;
    participants: string[];
    duration?: number;
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
  callSummaries?: CallSummary[];
}

// ============================================
// MEMO TYPES
// ============================================

export type MemoSectionType =
  | 'executive_summary'
  | 'company_overview'
  | 'problem_solution'
  | 'market_analysis'
  | 'product'
  | 'traction_metrics'
  | 'team'
  | 'business_model'
  | 'competitive_landscape'
  | 'thesis_fit'
  | 'risks_concerns'
  | 'open_questions'
  | 'recommendation';

export type MemoSectionSource = 'ai' | 'human' | 'mixed';
export type MemoStatus = 'draft' | 'review' | 'final';
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface Citation {
  id: string;
  type: 'deck' | 'transcript' | 'research' | 'note' | 'external';
  source: string; // "Acme Deck, Slide 8" or "Call with CEO, 23:45"
  content: string; // Preview text
  url?: string; // Link to view full source
  timestamp?: string; // For transcripts
  slideNumber?: number; // For decks
  confidence: ConfidenceLevel;
}

export interface MemoSection {
  id: string;
  type: MemoSectionType;
  title: string;
  content: string; // Rich text content
  source: MemoSectionSource; // Who created this section
  citations: Citation[]; // References supporting this section
  confidence?: ConfidenceLevel; // AI confidence if applicable
  lastEditedBy: {
    name: string;
    isAi: boolean;
    timestamp: string;
  };
  version: number; // For tracking changes
}

export interface MemoVersion {
  id: string;
  memoId: string;
  versionNumber: number;
  sections: MemoSection[];
  createdAt: string;
  createdBy: {
    name: string;
    isAi: boolean;
  };
  changeDescription?: string; // "Regenerated risks section"
}

export interface VersionDiff {
  sectionId: string;
  sectionTitle: string;
  type: 'added' | 'removed' | 'modified' | 'unchanged';
  oldContent?: string;
  newContent?: string;
  changes: DiffChange[];
}

export interface DiffChange {
  type: 'add' | 'remove' | 'unchanged';
  value: string;
  lineNumber?: number;
}

export interface MemoTemplate {
  id: string;
  name: string;
  description: string;
  sections: Array<{
    type: MemoSectionType;
    title: string;
    required: boolean;
    order: number;
    prompt?: string; // Guidance for AI generation
  }>;
}

export interface InvestmentMemo {
  id: string;
  dealId: string;
  title: string; // e.g., "Acme Corp - Series A Investment Memo"
  status: MemoStatus;
  sections: MemoSection[];
  template: MemoTemplate;
  versions: MemoVersion[]; // Version history
  currentVersion: number;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    name: string;
    isAi: boolean;
  };
  metadata: {
    completeness: number; // 0-100 percentage
    wordCount: number;
    estimatedReadTime: number; // minutes
  };
}

// Comment and Collaboration Types

export type CommentStatus = 'open' | 'resolved';

export interface CommentMention {
  userId: string;
  userName: string;
  position: number; // Position in comment text where @mention appears
}

export interface CommentThread {
  id: string;
  memoId: string;
  sectionId: string;
  // Text selection range
  textRange: {
    from: number; // Character position in section content
    to: number;
    text: string; // The highlighted text
  };
  // Root comment
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isAi: boolean;
  };
  mentions: CommentMention[];
  createdAt: string;
  updatedAt: string;
  // Thread metadata
  status: CommentStatus;
  resolvedBy?: {
    id: string;
    name: string;
    timestamp: string;
  };
  // Replies
  replies: CommentReply[];
}

export interface CommentReply {
  id: string;
  threadId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isAi: boolean;
  };
  mentions: CommentMention[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'partner' | 'principal' | 'analyst' | 'associate';
}
