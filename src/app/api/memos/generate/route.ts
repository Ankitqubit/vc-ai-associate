import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { mockDeals, getMemoTemplate, createMemo } from '@/lib/data/mock-db';
import { InvestmentMemo, MemoSection, Citation } from '@/lib/types';
import { injectCitations } from '@/lib/utils/citations';

// Toggle this to use real OpenAI or mock data
const USE_MOCK_GENERATION = true; // Set to false to use real OpenAI

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Mock content generator for fast development
function generateMockContent(sectionTitle: string, deal: any): string {
    const mockContent: Record<string, string> = {
        'Executive Summary': `<p>${deal.company.name} is a ${deal.company.description} The company is currently at ${deal.metrics[0].value} in MRR<cite id="cite-exec-1"></cite> with ${deal.metrics[0].trend || 'steady growth'}. Based on our thesis criteria<cite id="cite-exec-2"></cite>, the deal scores ${deal.fitScore.score}/100, indicating ${deal.fitScore.score >= 80 ? 'strong' : deal.fitScore.score >= 60 ? 'moderate' : 'weak'} alignment. The team consists of ${deal.company.teamSize} members with relevant industry experience. We ${deal.fitScore.score >= 75 ? 'recommend proceeding to deeper diligence' : 'suggest further evaluation before proceeding'}.</p>`,

        'Company Overview': `<p>${deal.company.name} was founded in ${deal.company.foundingDate}<cite id="cite-co-1"></cite> and is based in ${deal.company.location}. The company operates in the ${deal.company.description.includes('B2B') ? 'B2B SaaS' : 'B2C'} space with a current team of ${deal.company.teamSize} employees<cite id="cite-co-2"></cite>. The founding team brings significant expertise from previous roles at leading technology companies.</p>`,

        'Problem & Solution': `<p>The market faces significant challenges in operational efficiency and scalability. ${deal.company.name} addresses this by providing an automated platform that reduces manual work by up to 60%<cite id="cite-ps-1"></cite>. The solution leverages modern technology to streamline workflows and improve productivity for enterprise customers.</p>`,

        'Market Analysis': `The total addressable market (TAM) is estimated at $50B globally, with a serviceable addressable market (SAM) of $12B in North America. The market is growing at 25% CAGR, driven by digital transformation initiatives and increasing demand for automation. Key market trends include the shift to cloud-based solutions and the need for real-time analytics.`,

        'Product': `The product is a cloud-based platform that integrates with existing enterprise systems. Key features include automated workflow management, real-time analytics dashboards, and AI-powered optimization. The technical architecture is built on modern microservices, ensuring scalability and reliability. Current customers report 40% improvement in operational efficiency.`,

        'Traction & Metrics': `<p>Current MRR stands at ${deal.metrics[0].value}<cite id="cite-tm-1"></cite> with ${deal.metrics[0].trend || 'consistent growth'}. The company has acquired 45 enterprise customers with an average contract value of $25K annually<cite id="cite-tm-2"></cite>. Customer retention rate is 95%, indicating strong product-market fit. Month-over-month growth has averaged 15% for the past 6 months.</p>`,

        'Team': `<p>The founding team consists of experienced operators with complementary skill sets. The CEO previously led product at a Series C SaaS company<cite id="cite-team-1"></cite>. The CTO has 15 years of engineering experience at major tech companies<cite id="cite-team-2"></cite>. The team has successfully built and scaled products before, bringing valuable learnings to this venture. Current gaps include sales leadership, which they plan to fill with the Series A funding.</p>`,

        'Business Model': `${deal.company.name} operates on an annual subscription model with tiered pricing based on company size. Average contract value is $25K with 20% year-over-year increases. The sales cycle averages 45 days for mid-market and 90 days for enterprise. Customer acquisition cost (CAC) is ${deal.metrics.find(m => m.name === 'CAC')?.value || '$15K'} with an LTV/CAC ratio of 4.5x.`,

        'Competitive Landscape': `The competitive landscape includes both established players and emerging startups. Main competitors include LegacyCorp (market leader with 40% share) and TechStartup (growing fast with modern approach). ${deal.company.name} differentiates through superior user experience, faster implementation (2 weeks vs 3 months), and AI-powered features that competitors lack. The key competitive moat is their proprietary algorithm and strong customer relationships.`,

        'Thesis Fit Analysis': `This opportunity aligns strongly with our investment thesis across multiple dimensions:\n\n• Sector Focus: ${deal.company.description.includes('B2B') ? '✓' : '✗'} B2B SaaS (Score: ${deal.fitScore.breakdown.market}/100)\n• Stage: ✓ Series A with proven traction\n• Geography: ✓ US-based company\n• Team: ${deal.fitScore.breakdown.team >= 80 ? '✓' : '~'} Strong team (Score: ${deal.fitScore.breakdown.team}/100)\n• Traction: ${deal.fitScore.breakdown.traction >= 75 ? '✓' : '~'} Solid metrics (Score: ${deal.fitScore.breakdown.traction}/100)\n• Product: ${deal.fitScore.breakdown.product >= 70 ? '✓' : '~'} Differentiated offering (Score: ${deal.fitScore.breakdown.product}/100)\n\n Overall Fit Score: ${deal.fitScore.score}/100`,

        'Risks & Concerns': `Key risks to consider:\n\n1. **Market Risk**: The market is becoming increasingly competitive with well-funded competitors entering the space. Market consolidation could impact growth trajectory.\n\n2. **Execution Risk**: Scaling from $500K to $5M ARR requires building out sales and marketing infrastructure that the team hasn't managed before.\n\n3. **Technical Risk**: Product roadmap is ambitious and may face delays. Technical debt from rapid initial development needs to be addressed.\n\n4. **Competitive Risk**: Larger competitors could replicate core features quickly. Customer lock-in is moderate, creating switching risk.\n\n5. **Team Risk**: Key person dependency on founders. Need to build out leadership team for next stage of growth.`,

        'Open Questions': `Questions requiring further diligence:\n\n• What is the customer churn reason analysis? Need to understand why the 5% who churn are leaving.\n• How defensible is the technology moat? Can competitors replicate the core algorithm?\n• What is the roadmap for international expansion? Timeline and resource requirements?\n• How will the company handle enterprise security and compliance requirements for larger deals?\n• What is the plan for building out the sales team? Hiring timeline and ramp expectations?`,

        'Recommendation': `**Recommendation: PROCEED TO TERM SHEET**\n\n${deal.company.name} represents a ${deal.fitScore.score >= 80 ? 'strong' : 'solid'} investment opportunity aligned with our thesis. The combination of proven traction, experienced team, and large market opportunity justifies moving forward. Key strengths include strong unit economics, high customer retention, and clear product differentiation.\n\nSuggested terms:\n• Investment: $3-5M at $15-18M pre-money valuation\n• Structure: Series A Preferred\n• Board seat: Yes\n• Pro-rata rights: Yes\n\nNext steps: 1) Deeper technical diligence, 2) Customer reference calls, 3) Detailed financial modeling, 4) Background checks on founders.`
    };

    return mockContent[sectionTitle] || `This is the ${sectionTitle} section content for ${deal.company.name}. The analysis includes detailed insights based on the company's performance, market position, and strategic fit with our investment thesis.`;
}

export async function POST(req: NextRequest) {
    try {
        const { dealId } = await req.json();

        if (!dealId) {
            return NextResponse.json(
                { error: 'dealId is required' },
                { status: 400 }
            );
        }

        // Get deal data
        const deal = mockDeals.find(d => d.id === dealId);
        if (!deal) {
            return NextResponse.json(
                { error: 'Deal not found' },
                { status: 404 }
            );
        }

        // Get memo template
        const template = getMemoTemplate();

        // Generate memo sections
        const sections: MemoSection[] = [];

        if (USE_MOCK_GENERATION) {
            // FAST: Use mock content for development
            console.log('Using MOCK generation (instant)');

            for (const templateSection of template.sections) {
                let content = generateMockContent(templateSection.title, deal);

                // Create mock citations for this section
                const citations: Citation[] = [];

                // Add citations based on section
                if (templateSection.title === 'Executive Summary') {
                    citations.push({
                        id: 'cite-exec-1',
                        type: 'deck',
                        source: `${deal.company.name} Pitch Deck`,
                        content: 'Our current MRR is $450K with 15% month-over-month growth. We have 45 enterprise customers.',
                        slideNumber: 8,
                        confidence: 'high',
                    });
                    citations.push({
                        id: 'cite-exec-2',
                        type: 'transcript',
                        source: 'Call with Sarah Chen',
                        content: 'The deal aligns perfectly with our B2B SaaS thesis, particularly in the logistics automation space.',
                        timestamp: '12:30',
                        confidence: 'high',
                    });
                } else if (templateSection.title === 'Company Overview') {
                    citations.push({
                        id: 'cite-co-1',
                        type: 'deck',
                        source: `${deal.company.name} Pitch Deck`,
                        content: `Founded in ${deal.company.foundingDate} by experienced entrepreneurs from leading tech companies.`,
                        slideNumber: 3,
                        confidence: 'high',
                    });
                    citations.push({
                        id: 'cite-co-2',
                        type: 'deck',
                        source: `${deal.company.name} Pitch Deck`,
                        content: `Team has grown to ${deal.company.teamSize} employees across engineering, product, and sales.`,
                        slideNumber: 12,
                        confidence: 'high',
                    });
                } else if (templateSection.title === 'Problem & Solution') {
                    citations.push({
                        id: 'cite-ps-1',
                        type: 'deck',
                        source: `${deal.company.name} Pitch Deck`,
                        content: 'Our platform reduces manual work by 60%, saving enterprises an average of 200 hours per month.',
                        slideNumber: 6,
                        confidence: 'high',
                    });
                } else if (templateSection.title === 'Traction & Metrics') {
                    citations.push({
                        id: 'cite-tm-1',
                        type: 'deck',
                        source: `${deal.company.name} Pitch Deck`,
                        content: `Current MRR: ${deal.metrics[0].value}, growing at ${deal.metrics[0].trend || '15% MoM'}`,
                        slideNumber: 8,
                        confidence: 'high',
                    });
                    citations.push({
                        id: 'cite-tm-2',
                        type: 'transcript',
                        source: 'Call with CEO',
                        content: '45 enterprise customers with ACV of $25K. Customer retention is 95%, which is best in class.',
                        timestamp: '18:45',
                        confidence: 'high',
                    });
                } else if (templateSection.title === 'Team') {
                    citations.push({
                        id: 'cite-team-1',
                        type: 'deck',
                        source: `${deal.company.name} Pitch Deck`,
                        content: 'CEO: Former VP of Product at Series C SaaS company, led product from $10M to $100M ARR.',
                        slideNumber: 11,
                        confidence: 'high',
                    });
                    citations.push({
                        id: 'cite-team-2',
                        type: 'transcript',
                        source: 'Call with CTO',
                        content: 'CTO has 15 years at Google and Amazon, built distributed systems serving millions of users.',
                        timestamp: '08:20',
                        confidence: 'high',
                    });
                }

                // Inject citation nodes into HTML content
                const contentWithCitations = injectCitations(content, citations);

                sections.push({
                    id: `section-${sections.length + 1}`,
                    type: templateSection.type,
                    title: templateSection.title,
                    content: contentWithCitations,
                    source: 'ai',
                    citations,
                    confidence: 'high',
                    lastEditedBy: {
                        name: 'AI Associate',
                        isAi: true,
                        timestamp: new Date().toISOString(),
                    },
                    version: 1,
                });
            }
        } else {
            // REAL OpenAI generation (slow but high quality)
            console.log('Using REAL OpenAI generation (may take 30-60 seconds)');

            const dealContext = {
                company: deal.company,
                fitScore: deal.fitScore,
                metrics: deal.metrics,
                stage: deal.stage,
                callSummaries: deal.callSummaries || [],
            };

            for (const templateSection of template.sections) {
                console.log(`Generating section: ${templateSection.title}`);

                const completion = await openai.chat.completions.create({
                    model: 'gpt-4-turbo-preview',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an expert investment analyst writing an investment committee memo.

Write the "${templateSection.title}" section of the IC memo.

Guidelines:
- ${templateSection.prompt}
- Be concise but comprehensive
- Use bullet points where appropriate
- Include specific numbers and metrics when available
- Cite sources in your writing (e.g., "According to the pitch deck..." or "From the founder call...")
- Be objective and analytical, not promotional

Context about the deal:
${JSON.stringify(dealContext, null, 2)}`,
                        },
                        {
                            role: 'user',
                            content: `Write the ${templateSection.title} section.`,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 800,
                });

                const content = completion.choices[0].message.content || '';

                // Create citations
                const citations = [];
                if (content.toLowerCase().includes('deck') || content.toLowerCase().includes('pitch')) {
                    citations.push({
                        id: `cite-${sections.length}-1`,
                        type: 'deck' as const,
                        source: `${deal.company.name} Pitch Deck`,
                        content: 'Slide preview would go here',
                        confidence: 'high' as const,
                    });
                }
                if (deal.callSummaries && deal.callSummaries.length > 0 &&
                    (content.toLowerCase().includes('call') || content.toLowerCase().includes('conversation'))) {
                    citations.push({
                        id: `cite-${sections.length}-2`,
                        type: 'transcript' as const,
                        source: `Call with ${deal.callSummaries[0].metadata.participants[0]} on ${deal.callSummaries[0].metadata.date}`,
                        content: 'Transcript excerpt would go here',
                        timestamp: '15:30',
                        confidence: 'high' as const,
                    });
                }

                sections.push({
                    id: `section-${sections.length + 1}`,
                    type: templateSection.type,
                    title: templateSection.title,
                    content,
                    source: 'ai',
                    citations,
                    confidence: 'high',
                    lastEditedBy: {
                        name: 'AI Associate',
                        isAi: true,
                        timestamp: new Date().toISOString(),
                    },
                    version: 1,
                });
            }
        }

        // Create the memo
        const memo: InvestmentMemo = {
            id: `memo-${Date.now()}`,
            dealId,
            title: `${deal.company.name} - Investment Memo`,
            status: 'draft',
            sections,
            template,
            versions: [],
            currentVersion: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: {
                name: 'AI Associate',
                isAi: true,
            },
            metadata: {
                completeness: (sections.filter(s => s.content.length > 50).length / sections.length) * 100,
                wordCount: sections.reduce((sum, s) => sum + s.content.split(' ').length, 0),
                estimatedReadTime: Math.ceil(sections.reduce((sum, s) => sum + s.content.split(' ').length, 0) / 200),
            },
        };

        // Save to mock database
        createMemo(memo);

        // Create initial version
        const { saveMemoVersion, getMemoVersions } = require('@/lib/data/mock-db');
        saveMemoVersion(memo.id, 'Initial memo generation');

        // Fetch the updated memo with version
        const updatedVersions = getMemoVersions(memo.id);
        memo.versions = updatedVersions;

        return NextResponse.json({ memo });

    } catch (error) {
        console.error('Memo generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate memo', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
