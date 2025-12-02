import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
    try {
        const { transcript, metadata } = await req.json();

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock response for MVP testing
        // In production, this would call OpenAI with the transcript
        const mockSummary = {
            whatWeLearned: [
                "Strong early traction with 12 hospital customers",
                "Product-market fit validated by 85% patient engagement rate",
                "Regulatory clearance is the main bottleneck for scaling"
            ],
            metricsShared: [
                { name: "ARR", value: "$2.1M", change: "+17% MoM" },
                { name: "Customers", value: "12", change: "+4" },
                { name: "Engagement", value: "85%", change: null }
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
                date: metadata?.date || new Date().toISOString().split('T')[0],
                participants: metadata?.participants || [],
                duration: 45
            }
        };

        return NextResponse.json({ summary: mockSummary });

    } catch (error) {
        console.error("Error summarizing call:", error);
        return NextResponse.json(
            { error: "Failed to summarize call" },
            { status: 500 }
        );
    }
}
