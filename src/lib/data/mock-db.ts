import { Deal } from '../types';

export const mockDeals: Deal[] = [
    {
        id: 'deal-1',
        company: {
            id: 'comp-1',
            name: 'Acme Corp',
            description: 'B2B SaaS platform for logistics automation.',
            website: 'https://acme.ai',
            location: 'San Francisco, CA',
            foundingDate: '2023',
            teamSize: 12,
        },
        stage: 'Inbound',
        fitScore: {
            score: 78,
            rationale: 'Strong thesis fit: B2B SaaS, Series A, US-based. Team has relevant exits. Flag: competitive market, no clear moat articulated.',
            breakdown: {
                team: 90,
                market: 70,
                traction: 85,
                product: 65,
            },
        },
        owner: {
            name: 'Sarah Analyst',
            avatarUrl: 'https://github.com/shadcn.png', // Placeholder
        },
        lastActivity: new Date().toISOString(),
        source: 'Partner Referral',
        metrics: [
            {
                id: 'm1',
                name: 'MRR',
                value: '$450K',
                trend: '+15% MoM',
                confidence: 'High',
                source: 'Founder Call (Mar 15)',
            },
            {
                id: 'm2',
                name: 'CAC',
                value: '$15K',
                confidence: 'Medium',
                source: 'Pitch Deck',
            },
            {
                id: 'm3',
                name: 'Burn',
                value: '$120K',
                confidence: 'High',
                source: 'Pitch Deck',
            },
        ],
        activities: [
            {
                id: 'a1',
                type: 'ai_action',
                content: 'Parsed pitch deck and generated fit score (78/100).',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
                author: {
                    name: 'AI Associate',
                    isAi: true,
                },
            },
            {
                id: 'a2',
                type: 'email',
                content: 'Forwarded deck from Partner James.',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
                author: {
                    name: 'James Partner',
                },
            },
        ],
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
