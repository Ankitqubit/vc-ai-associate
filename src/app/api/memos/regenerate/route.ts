import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { mockMemos, mockDeals } from '@/lib/data/mock-db';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { memoId, sectionId, feedback } = await req.json();

        if (!memoId || !sectionId) {
            return NextResponse.json(
                { error: 'memoId and sectionId are required' },
                { status: 400 }
            );
        }

        // Get memo
        const memo = mockMemos.find(m => m.id === memoId);
        if (!memo) {
            return NextResponse.json(
                { error: 'Memo not found' },
                { status: 404 }
            );
        }

        // Get section
        const section = memo.sections.find(s => s.id === sectionId);
        if (!section) {
            return NextResponse.json(
                { error: 'Section not found' },
                { status: 404 }
            );
        }

        // Get deal context
        const deal = mockDeals.find(d => d.id === memo.dealId);
        if (!deal) {
            return NextResponse.json(
                { error: 'Deal not found' },
                { status: 404 }
            );
        }

        const dealContext = {
            company: deal.company,
            fitScore: deal.fitScore,
            metrics: deal.metrics,
            stage: deal.stage,
            callSummaries: deal.callSummaries || [],
        };

        // Get template section for prompts
        const templateSection = memo.template.sections.find(ts => ts.type === section.type);

        // Build prompt with feedback
        let userPrompt = `Regenerate the ${section.title} section.`;
        if (feedback) {
            userPrompt += `\n\nUser feedback: ${feedback}`;
        }
        userPrompt += `\n\nPrevious version:\n${section.content}`;

        // Regenerate section
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert investment analyst revising an investment committee memo section.

Guidelines:
- ${templateSection?.prompt || 'Provide comprehensive analysis'}
- Incorporate the user's feedback
- Improve upon the previous version
- Be concise but comprehensive
- Use bullet points where appropriate
- Include specific numbers and metrics when available
- Cite sources in your writing

Context about the deal:
${JSON.stringify(dealContext, null, 2)}`,
                },
                {
                    role: 'user',
                    content: userPrompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 800,
        });

        const newContent = completion.choices[0].message.content || section.content;

        // Update section in memo
        section.content = newContent;
        section.lastEditedBy = {
            name: 'AI Associate',
            isAi: true,
            timestamp: new Date().toISOString(),
        };
        section.version += 1;

        memo.updatedAt = new Date().toISOString();

        // Update metadata
        memo.metadata.wordCount = memo.sections.reduce((sum, s) => sum + s.content.split(' ').length, 0);
        memo.metadata.estimatedReadTime = Math.ceil(memo.metadata.wordCount / 200);

        // Create version snapshot after regeneration
        const { saveMemoVersion } = require('@/lib/data/mock-db');
        saveMemoVersion(memo.id, `Regenerated ${section.title} section`);

        return NextResponse.json({
            section: {
                id: section.id,
                content: newContent,
                version: section.version,
            }
        });

    } catch (error) {
        console.error('Section regeneration error:', error);
        return NextResponse.json(
            { error: 'Failed to regenerate section', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
