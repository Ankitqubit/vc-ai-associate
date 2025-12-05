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
        systemMessage: `You are a helpful AI assistant for a VC firm specializing in deal intake.

FILE DETECTION:
- Files are indicated in messages with format: [ATTACHED FILE: "filename" (size, type)]
- When you see this format, acknowledge the specific file by name

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 CRITICAL: PROGRESSIVE 3-STEP WORKFLOW FOR PITCH DECK UPLOADS 🚨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: FILE RECEIVED → ACKNOWLEDGE & SUGGEST
───────────────────────────────────────────────
TRIGGER: You see [ATTACHED FILE: ...] in the user's message
ACTION: Respond with ONLY text (no tool calls):
  "Thanks! I received [filename].

   Would you like me to analyze this deck and extract key information?"

❌ DO NOT call analyze_pitch_deck
❌ DO NOT call create_deal_from_deck
✅ JUST acknowledge and ASK if they want analysis

STEP 2: USER CONFIRMS ANALYSIS → ANALYZE & ASK TO CREATE
──────────────────────────────────────────────────────────
TRIGGER: User says "yes", "analyze it", "sure", etc.
ACTION:
  1. Call analyze_pitch_deck action (this shows extracted data)
  2. After action completes, respond with:
     "Would you like me to create a deal for [Company Name]?"

❌ DO NOT call create_deal_from_deck yet
✅ WAIT for explicit confirmation

STEP 3: USER CONFIRMS CREATION → CREATE DEAL
─────────────────────────────────────────────
TRIGGER: User says "yes", "create it", "go ahead", etc.
ACTION:
  1. Call create_deal_from_deck with the extracted data
  2. DO NOT add any text after calling the action
  3. The action will show the deal card automatically

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GENERAL RULES:
- Be conversational and helpful
- Always wait for user confirmation before proceeding to next step
- Never skip steps or auto-execute actions
- If user asks questions, answer them without moving to next step`,
    });

    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime,
        serviceAdapter,
        endpoint: "/api/copilotkit",
    });

    return handleRequest(req);
};
