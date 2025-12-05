import { Deal, MemoTemplate, InvestmentMemo, TeamMember, CommentThread } from '../types';
import { MOCK_COMPANIES } from './mock-companies';

// Map mock companies to deals
const SecureShield = MOCK_COMPANIES.find(c => c.name === 'SecureShield')!;
const DataFlowAI = MOCK_COMPANIES.find(c => c.name === 'DataFlow AI')!;
const HealthTrack = MOCK_COMPANIES.find(c => c.name === 'HealthTrack')!;
const CloudSyncPro = MOCK_COMPANIES.find(c => c.name === 'CloudSync Pro')!;
const EduLearn = MOCK_COMPANIES.find(c => c.name === 'EduLearn')!;
const FinOpsHub = MOCK_COMPANIES.find(c => c.name === 'FinOps Hub')!;

export const mockDeals: Deal[] = [
    {
        id: 'deal-1',
        company: {
            id: 'comp-1',
            name: SecureShield.name,
            description: SecureShield.description,
            website: SecureShield.enrichment?.website || 'https://secureshield.io',
            location: SecureShield.location,
            foundingDate: SecureShield.founded,
            teamSize: SecureShield.teamSize,
            enrichment: SecureShield.enrichment,
        },
        stage: 'Inbound',
        fitScore: {
            score: SecureShield.fitScore,
            rationale: 'Excellent fit. B2B SaaS - Cybersecurity aligns perfectly with thesis, Series A stage matches target, and team of 22 has strong execution capacity with proven enterprise traction.',
            breakdown: {
                team: 95,
                market: 90,
                traction: 92,
                product: 88,
            },
        },
        owner: {
            name: 'Sarah Analyst',
            avatarUrl: 'https://github.com/shadcn.png',
        },
        lastActivity: new Date().toISOString(),
        source: 'Partner Referral',
        metrics: [
            {
                id: 'm1',
                name: 'MRR',
                value: SecureShield.mrr,
                trend: '+22% MoM',
                confidence: 'High',
                source: 'Founder Call (Nov 15)',
            },
            {
                id: 'm2',
                name: 'ARR',
                value: SecureShield.arr || '$7.0M',
                confidence: 'High',
                source: 'Financial Statements',
            },
            {
                id: 'm3',
                name: 'Customers',
                value: '28 Enterprise',
                confidence: 'High',
                source: 'Pitch Deck',
            },
            {
                id: 'm4',
                name: 'Threat Detection',
                value: '99.9%',
                confidence: 'High',
                source: 'Product Demo',
            },
        ],
        activities: [
            {
                id: 'a1',
                type: 'ai_action',
                content: 'Parsed pitch deck and generated fit score (78/100).',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                author: {
                    name: 'AI Associate',
                    isAi: true,
                },
            },
            {
                id: 'a2',
                type: 'email',
                content: 'Forwarded deck from Partner James.',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
                author: {
                    name: 'James Partner',
                },
            },
        ],
        callSummaries: [
            {
                id: 'cs-1',
                whatWeLearned: [
                    "Strong early traction with 12 hospital customers",
                    "Product-market fit validated by 85% patient engagement rate",
                    "Regulatory clearance is the main bottleneck for scaling"
                ],
                metricsShared: [
                    { name: "ARR", value: "$450K", change: "+15% MoM" },
                    { name: "Customers", value: "12", change: "+4" },
                    { name: "Engagement", value: "85%" }
                ],
                risksAndConcerns: [
                    "FDA clearance timeline is uncertain (Q3 target)",
                    "Sales cycles are longer than expected (9-12 months)",
                    "Heavy reliance on top 3 customers"
                ],
                nextSteps: [
                    "Schedule technical DD call with CTO",
                    "Request customer references",
                    "Review regulatory strategy"
                ],
                metadata: {
                    date: '2024-03-15',
                    participants: ['Sarah Chen', 'Mike Ross'],
                    duration: 45
                }
            }
        ]
    },
    {
        id: 'deal-2',
        company: {
            id: 'comp-2',
            name: DataFlowAI.name,
            description: DataFlowAI.description,
            website: DataFlowAI.enrichment?.website || 'https://dataflow-ai.com',
            location: DataFlowAI.location,
            foundingDate: DataFlowAI.founded,
            teamSize: DataFlowAI.teamSize,
            enrichment: DataFlowAI.enrichment,
        },
        stage: 'First Call',
        fitScore: {
            score: DataFlowAI.fitScore,
            rationale: 'Excellent fit: Strong technical team from Databricks/Google. Growing data infrastructure market. Clear product-market fit with early paying customers.',
            breakdown: {
                team: 90,
                market: 85,
                traction: 80,
                product: 85,
            },
        },
        owner: {
            name: 'Sarah Analyst',
            avatarUrl: 'https://github.com/shadcn.png',
        },
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        source: 'Inbound',
        metrics: [
            {
                id: 'm4',
                name: 'MRR',
                value: DataFlowAI.mrr,
                trend: '+35% MoM',
                confidence: 'High',
                source: 'Financial Statements',
            },
            {
                id: 'm5',
                name: 'ARR',
                value: DataFlowAI.arr || '$2.2M',
                confidence: 'High',
                source: 'Financial Statements',
            },
            {
                id: 'm6',
                name: 'Customers',
                value: '15',
                trend: 'NRR: 120%',
                confidence: 'High',
                source: 'CRM Export',
            },
        ],
        activities: [],
    },
    {
        id: 'deal-3',
        company: {
            id: 'comp-3',
            name: HealthTrack.name,
            description: HealthTrack.description,
            website: 'https://healthtrack.io',
            location: HealthTrack.location,
            foundingDate: HealthTrack.founded,
            teamSize: HealthTrack.teamSize,
            enrichment: HealthTrack.enrichment,
        },
        stage: 'Deep Dive',
        fitScore: {
            score: HealthTrack.fitScore,
            rationale: 'Moderate fit. Healthcare Tech is adjacent to thesis focus, Pre-Seed stage acceptable, team of 6 may need reinforcement for scale.',
            breakdown: {
                team: 70,
                market: 75,
                traction: 70,
                product: 72,
            },
        },
        owner: {
            name: 'Michael Chen',
            avatarUrl: 'https://github.com/shadcn.png',
        },
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        source: 'Conference',
        metrics: [
            {
                id: 'm7',
                name: 'MRR',
                value: HealthTrack.mrr,
                trend: '+25% MoM',
                confidence: 'Medium',
                source: 'Founder Interview',
            },
            {
                id: 'm8',
                name: 'ARR',
                value: HealthTrack.arr || '$1.1M',
                confidence: 'High',
                source: 'Financial Statements',
            },
            {
                id: 'm9',
                name: 'Clinics',
                value: '8',
                trend: 'Patients: 2,400',
                confidence: 'High',
                source: 'CRM Data',
            },
        ],
        activities: [],
        callSummaries: [
            {
                id: 'cs-3',
                whatWeLearned: [
                    "Pilot with Mayo Clinic is showing 40% efficiency gain",
                    "AI model accuracy improved to 98.5%",
                    "Need to hire 2 more senior ML engineers"
                ],
                metricsShared: [
                    { name: "Pilot Efficiency", value: "40%", change: "+10%" },
                    { name: "Model Accuracy", value: "98.5%", change: "+1.5%" }
                ],
                risksAndConcerns: [
                    "Hiring market for ML engineers is very competitive",
                    "Data privacy compliance (HIPAA) is becoming complex"
                ],
                nextSteps: [
                    "Review HIPAA compliance audit report",
                    "Intro to potential ML candidates",
                    "Plan Series A fundraising timeline"
                ],
                metadata: {
                    date: '2024-03-20',
                    participants: ['Dr. Emily Zhang', 'David Kim'],
                    duration: 60
                }
            }
        ]
    },
    {
        id: 'deal-4',
        company: {
            id: 'comp-4',
            name: CloudSyncPro.name,
            description: CloudSyncPro.description,
            website: CloudSyncPro.enrichment?.website || 'https://cloudsync.pro',
            location: CloudSyncPro.location,
            foundingDate: CloudSyncPro.founded,
            teamSize: CloudSyncPro.teamSize,
            enrichment: CloudSyncPro.enrichment,
        },
        stage: 'IC',
        fitScore: {
            score: CloudSyncPro.fitScore,
            rationale: 'Strong fit. B2B SaaS - DevOps is within focus area, Series A stage is appropriate, though team size of 15 could be larger for scale.',
            breakdown: {
                team: 85,
                market: 80,
                traction: 75,
                product: 78,
            },
        },
        owner: {
            name: 'Sarah Analyst',
            avatarUrl: 'https://github.com/shadcn.png',
        },
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        source: 'YC Network',
        metrics: [
            {
                id: 'm10',
                name: 'MRR',
                value: CloudSyncPro.mrr,
                trend: '+30% MoM',
                confidence: 'High',
                source: 'Financial Statements',
            },
            {
                id: 'm11',
                name: 'ARR',
                value: CloudSyncPro.arr || '$5.4M',
                confidence: 'High',
                source: 'Financial Statements',
            },
            {
                id: 'm12',
                name: 'Customers',
                value: '42 Enterprise',
                trend: '+12 in Q4',
                confidence: 'High',
                source: 'CRM Data',
            },
        ],
        activities: [],
    },
    {
        id: 'deal-5',
        company: {
            id: 'comp-5',
            name: EduLearn.name,
            description: EduLearn.description,
            website: 'https://edulearn.com',
            location: EduLearn.location,
            foundingDate: EduLearn.founded,
            teamSize: EduLearn.teamSize,
            enrichment: EduLearn.enrichment,
        },
        stage: 'Passed',
        fitScore: {
            score: EduLearn.fitScore,
            rationale: 'Weaker fit. EdTech - K-12 Education outside core focus, Pre-Seed stage early, and team of 5 needs significant growth.',
            breakdown: {
                team: 65,
                market: 60,
                traction: 70,
                product: 75,
            },
        },
        owner: {
            name: 'Michael Chen',
            avatarUrl: 'https://github.com/shadcn.png',
        },
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        source: 'Cold Outreach',
        metrics: [
            {
                id: 'm13',
                name: 'MRR',
                value: EduLearn.mrr,
                trend: '+12% MoM',
                confidence: 'Medium',
                source: 'Founder Interview',
            },
            {
                id: 'm14',
                name: 'ARR',
                value: EduLearn.arr || '$780K',
                confidence: 'Medium',
                source: 'Financial Statements',
            },
            {
                id: 'm15',
                name: 'Schools',
                value: '12',
                trend: 'Students: 3,500',
                confidence: 'High',
                source: 'Product Dashboard',
            },
        ],
        activities: [],
    },
    {
        id: 'deal-6',
        company: {
            id: 'comp-6',
            name: FinOpsHub.name,
            description: FinOpsHub.description,
            website: FinOpsHub.enrichment?.website || 'https://finopshub.com',
            location: FinOpsHub.location,
            foundingDate: FinOpsHub.founded,
            teamSize: FinOpsHub.teamSize,
            enrichment: FinOpsHub.enrichment,
        },
        stage: 'Term Sheet',
        fitScore: {
            score: FinOpsHub.fitScore,
            rationale: 'Excellent fit. B2B SaaS - FinTech aligns perfectly with thesis, Seed stage matches target, and team of 12 has strong execution capacity.',
            breakdown: {
                team: 90,
                market: 88,
                traction: 85,
                product: 88,
            },
        },
        owner: {
            name: 'Sarah Analyst',
            avatarUrl: 'https://github.com/shadcn.png',
        },
        lastActivity: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        source: 'Partner Referral',
        metrics: [
            {
                id: 'm16',
                name: 'MRR',
                value: FinOpsHub.mrr,
                trend: '+30% MoM',
                confidence: 'High',
                source: 'Financial Statements',
            },
            {
                id: 'm17',
                name: 'ARR',
                value: FinOpsHub.arr || '$3.8M',
                confidence: 'High',
                source: 'Financial Statements',
            },
            {
                id: 'm18',
                name: 'Customers',
                value: '65',
                trend: '+30% MoM growth',
                confidence: 'High',
                source: 'CRM Data',
            },
        ],
        activities: [],
    },
];

export const getDealById = (id: string): Deal | undefined => {
    return mockDeals.find((d) => d.id === id);
};

export const getRecentDeals = (): Deal[] => {
    return mockDeals;
};

export const getAllDeals = (): Promise<Deal[]> => {
    // Simulate async fetch
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockDeals), 500);
    });
};

// Mutable update functions for prototyping
export const updateDealStage = (dealId: string, newStage: string): boolean => {
    console.log(`[mock-db] updateDealStage called: dealId=${dealId}, newStage=${newStage}`);
    console.log(`[mock-db] Current deals:`, mockDeals.map(d => ({ id: d.id, name: d.company.name, stage: d.stage })));

    const deal = mockDeals.find(d => d.id === dealId);
    if (!deal) {
        console.error(`[mock-db] Deal not found: ${dealId}`);
        return false;
    }

    console.log(`[mock-db] Found deal: ${deal.company.name}, current stage: ${deal.stage}`);
    deal.stage = newStage as any; // Type assertion for prototype
    deal.lastActivity = new Date().toISOString();
    console.log(`[mock-db] Updated deal stage to: ${deal.stage}`);
    return true;
};

export const updateDealMetric = (dealId: string, metricName: string, newValue: string, trend?: string): boolean => {
    const deal = mockDeals.find(d => d.id === dealId);
    if (!deal) return false;

    const metric = deal.metrics.find(m => m.name === metricName);
    if (!metric) return false;

    metric.value = newValue;
    if (trend) metric.trend = trend;
    deal.lastActivity = new Date().toISOString();
    return true;
};

export const updateDealFitScore = (dealId: string, newScore: number, rationale: string): boolean => {
    const deal = mockDeals.find(d => d.id === dealId);
    if (!deal) return false;

    deal.fitScore.score = newScore;
    deal.fitScore.rationale = rationale;
    deal.lastActivity = new Date().toISOString();
    return true;
};

export const updateDealCompany = (dealId: string, updates: Partial<Deal['company']>): boolean => {
    const deal = mockDeals.find(d => d.id === dealId);
    if (!deal) return false;

    deal.company = { ...deal.company, ...updates };
    deal.lastActivity = new Date().toISOString();
    return true;
};

// ============================================
// MEMO TEMPLATES & DATA
// ============================================

export const defaultMemoTemplate: MemoTemplate = {
    id: 'template-1',
    name: 'Standard IC Memo',
    description: 'Our standard investment committee memo format for Series A deals',
    sections: [
        {
            type: 'executive_summary',
            title: 'Executive Summary',
            required: true,
            order: 1,
            prompt: 'Provide a 3-4 sentence overview covering: what the company does, key traction metrics, thesis fit, and investment recommendation.'
        },
        {
            type: 'company_overview',
            title: 'Company Overview',
            required: true,
            order: 2,
            prompt: 'Describe the company, founding team, location, and founding date.'
        },
        {
            type: 'problem_solution',
            title: 'Problem & Solution',
            required: true,
            order: 3,
            prompt: 'What problem are they solving? How does their solution work? What makes it unique?'
        },
        {
            type: 'market_analysis',
            title: 'Market Analysis',
            required: true,
            order: 4,
            prompt: 'TAM/SAM/SOM estimates, market trends, growth drivers, and competitive dynamics.'
        },
        {
            type: 'product',
            title: 'Product',
            required: true,
            order: 5,
            prompt: 'Describe the product, key features, technical architecture, and differentiation.'
        },
        {
            type: 'traction_metrics',
            title: 'Traction & Metrics',
            required: true,
            order: 6,
            prompt: 'MRR, growth rate, customer count, retention, unit economics (CAC, LTV), and key milestones.'
        },
        {
            type: 'team',
            title: 'Team',
            required: true,
            order: 7,
            prompt: 'Founder backgrounds, relevant experience, prior exits, team composition, and gaps.'
        },
        {
            type: 'business_model',
            title: 'Business Model',
            required: true,
            order: 8,
            prompt: 'How do they make money? Pricing model, sales cycle, go-to-market strategy.'
        },
        {
            type: 'competitive_landscape',
            title: 'Competitive Landscape',
            required: true,
            order: 9,
            prompt: 'Who are the main competitors? What is their competitive advantage and moat?'
        },
        {
            type: 'thesis_fit',
            title: 'Thesis Fit Analysis',
            required: true,
            order: 10,
            prompt: 'How does this deal align with our investment thesis? Scoring breakdown and rationale.'
        },
        {
            type: 'risks_concerns',
            title: 'Risks & Concerns',
            required: true,
            order: 11,
            prompt: 'What are the key risks? Market risks, execution risks, competitive risks, team risks.'
        },
        {
            type: 'open_questions',
            title: 'Open Questions',
            required: false,
            order: 12,
            prompt: 'What questions remain unanswered? What additional diligence is needed?'
        },
        {
            type: 'recommendation',
            title: 'Recommendation',
            required: true,
            order: 13,
            prompt: 'Should we proceed? Pass? Need more information? Why?'
        },
    ]
};

export const mockMemos: InvestmentMemo[] = [];

// Memo helper functions
export const getMemoByDealId = (dealId: string): InvestmentMemo | undefined => {
    return mockMemos.find(m => m.dealId === dealId);
};

export const createMemo = (memo: InvestmentMemo): void => {
    mockMemos.push(memo);
};

export const updateMemoSection = (memoId: string, sectionId: string, content: string): boolean => {
    const memo = mockMemos.find(m => m.id === memoId);
    if (!memo) return false;

    const section = memo.sections.find(s => s.id === sectionId);
    if (!section) return false;

    section.content = content;
    section.lastEditedBy = {
        name: 'Human User',
        isAi: false,
        timestamp: new Date().toISOString(),
    };
    section.version += 1;

    memo.updatedAt = new Date().toISOString();
    return true;
};

export const getMemoTemplate = (): MemoTemplate => {
    return defaultMemoTemplate;
};

// ============================================
// VERSION HISTORY FUNCTIONS
// ============================================

/**
 * Create a new version snapshot of a memo
 */
export const saveMemoVersion = (memoId: string, changeDescription?: string): boolean => {
    const memo = mockMemos.find(m => m.id === memoId);
    if (!memo) return false;

    const newVersion = {
        id: `version-${Date.now()}`,
        memoId: memo.id,
        versionNumber: memo.versions.length + 1,
        sections: JSON.parse(JSON.stringify(memo.sections)), // Deep copy
        createdAt: new Date().toISOString(),
        createdBy: {
            name: 'Human User',
            isAi: false,
        },
        changeDescription,
    };

    memo.versions.push(newVersion);
    memo.currentVersion = newVersion.versionNumber;
    memo.updatedAt = new Date().toISOString();

    return true;
};

/**
 * Get all versions for a memo
 */
export const getMemoVersions = (memoId: string) => {
    const memo = mockMemos.find(m => m.id === memoId);
    if (!memo) return [];

    return memo.versions;
};

/**
 * Get a specific version by ID
 */
export const getMemoVersionById = (memoId: string, versionId: string) => {
    const memo = mockMemos.find(m => m.id === memoId);
    if (!memo) return undefined;

    return memo.versions.find(v => v.id === versionId);
};

/**
 * Restore a previous version
 */
export const restoreMemoVersion = (memoId: string, versionId: string): boolean => {
    const memo = mockMemos.find(m => m.id === memoId);
    if (!memo) return false;

    const version = memo.versions.find(v => v.id === versionId);
    if (!version) return false;

    // Create a new version before restoring (so we don't lose current state)
    saveMemoVersion(memoId, `Auto-save before restoring v${version.versionNumber}`);

    // Restore sections from the version
    memo.sections = JSON.parse(JSON.stringify(version.sections)); // Deep copy

    // Update all sections to mark as restored
    memo.sections.forEach(section => {
        section.lastEditedBy = {
            name: 'Human User',
            isAi: false,
            timestamp: new Date().toISOString(),
        };
    });

    // Create a new version for the restore action
    saveMemoVersion(memoId, `Restored from v${version.versionNumber}`);

    memo.updatedAt = new Date().toISOString();

    return true;
};

// Team Members and Comments

/**
 * Mock team members for @mentions
 */
export const mockTeamMembers: TeamMember[] = [
    {
        id: 'user-1',
        name: 'Sarah Chen',
        email: 'sarah@vc-firm.com',
        role: 'partner',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
        id: 'user-2',
        name: 'Michael Rodriguez',
        email: 'michael@vc-firm.com',
        role: 'principal',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    },
    {
        id: 'user-3',
        name: 'Emily Johnson',
        email: 'emily@vc-firm.com',
        role: 'analyst',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
    {
        id: 'user-4',
        name: 'David Park',
        email: 'david@vc-firm.com',
        role: 'associate',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    },
    {
        id: 'user-current',
        name: 'You',
        email: 'you@vc-firm.com',
        role: 'analyst',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
    },
];

/**
 * Mock comments storage
 */
export const mockComments: CommentThread[] = [];

// Comment helper functions

export const getCommentsByMemoId = (memoId: string): CommentThread[] => {
    return mockComments.filter(c => c.memoId === memoId);
};

export const getCommentsBySectionId = (memoId: string, sectionId: string): CommentThread[] => {
    return mockComments.filter(c => c.memoId === memoId && c.sectionId === sectionId);
};

export const getCommentById = (commentId: string): CommentThread | undefined => {
    return mockComments.find(c => c.id === commentId);
};

export const createComment = (comment: CommentThread): void => {
    mockComments.push(comment);
};

export const updateCommentStatus = (
    commentId: string,
    status: CommentThread['status'],
    resolvedBy?: CommentThread['resolvedBy']
): boolean => {
    const comment = mockComments.find(c => c.id === commentId);
    if (!comment) return false;

    comment.status = status;
    comment.resolvedBy = resolvedBy;
    comment.updatedAt = new Date().toISOString();

    return true;
};

export const addCommentReply = (
    commentId: string,
    reply: CommentThread['replies'][0]
): boolean => {
    const comment = mockComments.find(c => c.id === commentId);
    if (!comment) return false;

    comment.replies.push(reply);
    comment.updatedAt = new Date().toISOString();

    return true;
};

export const deleteComment = (commentId: string): boolean => {
    const index = mockComments.findIndex(c => c.id === commentId);
    if (index === -1) return false;

    mockComments.splice(index, 1);
    return true;
};

export const getTeamMembers = (): TeamMember[] => {
    return mockTeamMembers;
};

export const searchTeamMembers = (query: string): TeamMember[] => {
    const lowerQuery = query.toLowerCase();
    return mockTeamMembers.filter(
        member =>
            member.name.toLowerCase().includes(lowerQuery) ||
            member.email.toLowerCase().includes(lowerQuery)
    );
};
