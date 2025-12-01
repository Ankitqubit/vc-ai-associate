import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, ...data } = body;

        // Simulate network delay (500ms - 1500ms)
        const delay = Math.floor(Math.random() * 1000) + 500;
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Simulate random failure (Disabled for stability)
        // if (Math.random() < 0.1) {
        //     return NextResponse.json(
        //         { success: false, error: 'Random simulation error' },
        //         { status: 500 }
        //     );
        // }

        if (action === 'update_company') {
            console.log(`[Mock DB] Updating company info:`, data);
        } else {
            console.log(`[Mock DB] Processed action: ${action}`, data);
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Invalid request' },
            { status: 400 }
        );
    }
}
