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
            avatarUrl: 'https://github.com/shadcn.png',
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
            name: 'DataFlow AI',
            description: 'Real-time data pipeline infrastructure for ML teams.',
            website: 'https://dataflow.ai',
            location: 'New York, NY',
            foundingDate: '2022',
            teamSize: 18,
        },
        stage: 'First Call',
        fitScore: {
            score: 85,
            rationale: 'Excellent fit: Strong technical team from Google/Meta. Growing market. Clear product-market fit with 50+ enterprise customers.',
            breakdown: {
                team: 95,
                market: 85,
                traction: 80,
                product: 80,
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
                name: 'ARR',
                value: '$2.5M',
                trend: '+40% YoY',
                confidence: 'High',
                source: 'Financial Statements',
            },
            {
                id: 'm5',
                name: 'NRR',
                value: '125%',
                confidence: 'High',
                source: 'Metrics Dashboard',
            },
            {
                id: 'm6',
                name: 'Customers',
                value: '52',
                trend: '+12 this quarter',
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
            name: 'HealthTech Solutions',
            description: 'AI-powered patient engagement platform for healthcare providers.',
            website: 'https://healthtech.io',
            location: 'Boston, MA',
            foundingDate: '2021',
            teamSize: 25,
        },
        stage: 'Deep Dive',
        fitScore: {
            score: 72,
            rationale: 'Good fit but regulatory concerns. Strong traction in pilot programs. Team has healthcare domain expertise.',
            breakdown: {
                team: 75,
                market: 80,
                traction: 70,
                product: 65,
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
                name: 'ARR',
                value: '$1.8M',
                trend: '+60% YoY',
                confidence: 'Medium',
                source: 'Founder Interview',
            },
            {
                id: 'm8',
                name: 'Burn',
                value: '$180K',
                confidence: 'High',
                source: 'Bank Statements',
            },
            {
                id: 'm9',
                name: 'Runway',
                value: '18 months',
                confidence: 'High',
                source: 'Financial Model',
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
            name: 'CloudScale',
            description: 'DevOps automation platform for Kubernetes deployments.',
            website: 'https://cloudscale.dev',
            location: 'Austin, TX',
            foundingDate: '2023',
            teamSize: 8,
        },
        stage: 'IC',
        fitScore: {
            score: 88,
            rationale: 'Exceptional fit: Ex-AWS/Google Cloud team. Solving real pain point. Strong early traction with Fortune 500 pilots.',
            breakdown: {
                team: 95,
                market: 90,
                traction: 75,
                product: 90,
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
                value: '$180K',
                trend: '+25% MoM',
                confidence: 'High',
                source: 'Stripe Dashboard',
            },
            {
                id: 'm11',
                name: 'CAC',
                value: '$8K',
                confidence: 'High',
                source: 'Marketing Analytics',
            },
            {
                id: 'm12',
                name: 'LTV/CAC',
                value: '4.2x',
                confidence: 'Medium',
                source: 'Financial Model',
            },
        ],
        activities: [],
    },
    {
        id: 'deal-5',
        company: {
            id: 'comp-5',
            name: 'EduLearn',
            description: 'Adaptive learning platform for K-12 education.',
            website: 'https://edulearn.com',
            location: 'Seattle, WA',
            foundingDate: '2020',
            teamSize: 35,
        },
        stage: 'Passed',
        fitScore: {
            score: 45,
            rationale: 'Weak fit: EdTech outside our focus. Low margins. Slow sales cycles. Team lacks B2B SaaS experience.',
            breakdown: {
                team: 50,
                market: 40,
                traction: 55,
                product: 35,
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
                name: 'ARR',
                value: '$800K',
                trend: '+10% YoY',
                confidence: 'Medium',
                source: 'Pitch Deck',
            },
            {
                id: 'm14',
                name: 'Churn',
                value: '8%',
                confidence: 'Low',
                source: 'Founder Estimate',
            },
        ],
        activities: [],
    },
    {
        id: 'deal-6',
        company: {
            id: 'comp-6',
            name: 'FinSync',
            description: 'API platform for embedded finance and payment processing.',
            website: 'https://finsync.io',
            location: 'San Francisco, CA',
            foundingDate: '2022',
            teamSize: 22,
        },
        stage: 'Term Sheet',
        fitScore: {
            score: 92,
            rationale: 'Outstanding fit: Stellar team (ex-Stripe, Plaid). Massive TAM. Strong unit economics. Clear path to $100M ARR.',
            breakdown: {
                team: 98,
                market: 95,
                traction: 85,
                product: 90,
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
                id: 'm15',
                name: 'ARR',
                value: '$5.2M',
                trend: '+120% YoY',
                confidence: 'High',
                source: 'Audited Financials',
            },
            {
                id: 'm16',
                name: 'Gross Margin',
                value: '78%',
                confidence: 'High',
                source: 'P&L Statement',
            },
            {
                id: 'm17',
                name: 'NRR',
                value: '140%',
                confidence: 'High',
                source: 'Cohort Analysis',
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
