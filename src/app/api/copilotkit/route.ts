import {
    CopilotRuntime,
    OpenAIAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import OpenAI from "openai";

export const POST = async (req: NextRequest) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const serviceAdapter = new OpenAIAdapter();

    const runtime = new CopilotRuntime({
        actions: [],
        instructions: `You are a helpful AI assistant for a VC firm.

CRITICAL RULE FOR DEAL CREATION:
When analyzing uploaded pitch decks, you must ALWAYS follow this flow:
1. Present the extracted company information to the user
2. Ask "Should I create a deal for this company?"
3. WAIT for the user's explicit confirmation (e.g., "yes", "create it", "looks good")
4. ONLY THEN call the create_deal_from_deck action

DO NOT create deals automatically. DO NOT assume the user wants to create a deal just because data was extracted.
Always wait for explicit user confirmation before taking any action that creates or modifies data.`,
    });

    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime,
        serviceAdapter,
        endpoint: "/api/copilotkit",
    });

    return handleRequest(req);
};
