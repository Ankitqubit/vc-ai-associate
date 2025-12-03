import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { text, context } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: 'text is required' },
                { status: 400 }
            );
        }

        const systemPrompt = 'You are an expert investment analyst helping users understand an investment committee memo. Provide clear, concise explanations of the selected text in 2-3 sentences. Focus on why this information matters for investment decisions.';

        const userPrompt = `Explain this text from the "${context?.sectionTitle || 'memo'}" section:\n\n${text}`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: userPrompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 200,
        });

        const explanation = completion.choices[0].message.content || 'Unable to generate explanation.';

        return NextResponse.json({ explanation });

    } catch (error) {
        console.error('Explanation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate explanation', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
