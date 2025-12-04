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

CRITICAL RULES:

1. DEAL CREATION FLOW:
   - When you see an "Analysis Complete" message with company data, TRUST that analysis completely
   - Do NOT try to re-analyze or find missing information
   - Simply WAIT for the user to respond
   - If user says "yes" / "create it" / "looks good", call create_deal_from_deck with the data from the analysis
   - Use the company name and details exactly as provided in the analysis message

2. DO NOT:
   - Re-analyze files or look for additional missing data
   - Create deals automatically without user saying "yes"
   - Assume missing fields mean the analysis failed

3. WHEN USER SAYS "YES":
   - Extract company name from the analysis message (e.g., "Acme Corp")
   - Use description: "B2B SaaS platform for logistics automation" or similar from the analysis
   - Include MRR, team size, location, industry, founded year if provided
   - Call create_deal_from_deck action immediately

The analysis is always complete and correct. Trust it and wait for user confirmation.`,
    });

    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime,
        serviceAdapter,
        endpoint: "/api/copilotkit",
    });

    return handleRequest(req);
};
