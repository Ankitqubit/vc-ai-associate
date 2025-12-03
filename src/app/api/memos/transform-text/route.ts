import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { text, action, context } = await req.json();

        if (!text || !action) {
            return NextResponse.json(
                { error: 'text and action are required' },
                { status: 400 }
            );
        }

        let systemPrompt = '';
        let userPrompt = '';

        switch (action) {
            case 'rewrite':
                systemPrompt = 'You are an expert investment analyst helping to improve an investment committee memo. Rewrite the given text to be more clear, concise, and professional while preserving all key information and maintaining the same tone and style.';
                userPrompt = `Rewrite this text from the "${context?.sectionTitle}" section:\n\n${text}`;
                break;

            case 'expand':
                systemPrompt = 'You are an expert investment analyst helping to enhance an investment committee memo. Expand the given text with more detail, supporting information, and specific examples while maintaining professionalism and accuracy.';
                userPrompt = `Expand this text from the "${context?.sectionTitle}" section with more detail:\n\n${text}`;
                break;

            case 'simplify':
                systemPrompt = 'You are an expert investment analyst helping to improve an investment committee memo. Simplify the given text to be more concise and easier to understand while preserving the core message and key information.';
                userPrompt = `Simplify this text from the "${context?.sectionTitle}" section:\n\n${text}`;
                break;

            default:
                return NextResponse.json(
                    { error: 'Invalid action' },
                    { status: 400 }
                );
        }

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
            max_tokens: 500,
        });

        const transformedText = completion.choices[0].message.content || text;

        return NextResponse.json({ transformedText });

    } catch (error) {
        console.error('Text transformation error:', error);
        return NextResponse.json(
            { error: 'Failed to transform text', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
