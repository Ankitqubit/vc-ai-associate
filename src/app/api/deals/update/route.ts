import { NextRequest, NextResponse } from 'next/server';
import { updateDealStage, updateDealMetric, updateDealFitScore, updateDealCompany } from '@/lib/data/mock-db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, dealId, ...data } = body;

        console.log('[API /deals/update] Received request:', { action, dealId, data });

        // Simulate network delay (500ms - 1500ms)
        const delay = Math.floor(Math.random() * 1000) + 500;
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Actually update the mock data based on action
        let success = false;

        switch (action) {
            case 'update_stage':
                console.log(`[API] Calling updateDealStage(${dealId}, ${data.newStage})`);
                success = updateDealStage(dealId, data.newStage);
                console.log(`[API] updateDealStage result: ${success}`);
                break;
            case 'update_metric':
                success = updateDealMetric(dealId, data.metricName, data.newValue, data.trend);
                console.log(`[API] Updated metric ${data.metricName} for ${dealId}: ${success}`);
                break;
            case 'update_fit_score':
                success = updateDealFitScore(dealId, data.newScore, data.rationale);
                console.log(`[API] Updated fit score for ${dealId}: ${success}`);
                break;
            case 'update_company':
                success = updateDealCompany(dealId, { name: data.companyName, teamSize: data.teamSize });
                console.log(`[API] Updated company info for ${dealId}: ${success}`);
                break;
            case 'add_note':
                // Notes are handled in context, not persisted to mock DB for now
                success = true;
                console.log(`[API] Note added for ${dealId}`);
                break;
            default:
                console.log(`[API] Unknown action: ${action}`);
                success = true; // Don't fail on unknown actions
        }

        if (!success) {
            console.error(`[API] Update failed for ${dealId}`);
            return NextResponse.json(
                { success: false, error: 'Deal not found or update failed' },
                { status: 404 }
            );
        }

        console.log(`[API] Successfully processed ${action} for ${dealId}`);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('[API] Error processing request:', error);
        return NextResponse.json(
            { success: false, error: 'Invalid request' },
            { status: 400 }
        );
    }
}
