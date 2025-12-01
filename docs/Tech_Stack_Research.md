# Open Source Libraries for AI-Native VC Associate Product

> Research compiled: November 2024
> Focus: AI-native product with AI at the center

---

## Executive Summary

This document outlines the recommended open-source libraries for the VC Associate product. **CopilotKit + AG-UI Protocol** is the recommended AI infrastructure, with supporting libraries for specific features.

### Key Decisions

| Layer | Recommendation | Rationale |
|-------|----------------|-----------|
| **AI Infrastructure** | CopilotKit + AG-UI | Purpose-built for AI copilots, open protocol |
| **UI Framework** | shadcn/ui + Tailwind | Industry standard, AI ecosystem aligned |
| **Rich Text Editor** | Tiptap + Yjs | Best balance of features + collaboration |
| **Data/State** | TanStack Table + Zustand | Headless, performant |
| **Mobile** | Expo (React Native) | Official RN recommendation |

### What's Redundant (If Using CopilotKit)

| ❌ No Longer Needed | Replaced By |
|--------------------|-------------|
| assistant-ui | CopilotChat, CopilotSidebar |
| Vercel AI SDK (UI hooks) | AG-UI Protocol |
| Custom streaming logic | AG-UI events |
| Custom action/tool system | useCopilotAction |
| Custom state injection | useCopilotReadable |

---

## Part 1: AI Infrastructure

### Primary Recommendation: CopilotKit + AG-UI Protocol

| Attribute | Details |
|-----------|---------|
| GitHub | [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| Stars | 22k+ |
| Protocol | AG-UI (open standard) |
| Users | 100k+ developers, Fortune 500 companies |

#### What is CopilotKit?

CopilotKit is the **Agentic Application Framework** — everything you need to integrate AI agents into user-facing apps. It provides:

- **React components** for chat UI (CopilotChat, CopilotSidebar, CopilotPopup)
- **Hooks** for state sharing and action execution
- **Runtime** for LLM integration (OpenAI, Anthropic, etc.)
- **CoAgents** for LangGraph/CrewAI multi-agent workflows

#### What is AG-UI?

AG-UI (Agent-User Interaction Protocol) is an open, event-based protocol that standardizes how AI agents connect to frontends. It's the third leg of the AI protocol stack:

| Protocol | Purpose |
|----------|---------|
| **MCP** (Anthropic) | Agent ↔ Tools/Context |
| **A2A** | Agent ↔ Agent |
| **AG-UI** | Agent ↔ User Interface |

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Your React App                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│   │ CopilotKit  │  │  Readable   │  │   Actions   │        │
│   │  Provider   │  │   State     │  │   System    │        │
│   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│          │                │                │                │
│          └────────────────┼────────────────┘                │
│                           │                                 │
│                    ┌──────▼──────┐                          │
│                    │   AG-UI     │ ← Event-based protocol   │
│                    │  Protocol   │                          │
│                    └──────┬──────┘                          │
│                           │                                 │
├───────────────────────────┼─────────────────────────────────┤
│                           │                                 │
│                    ┌──────▼──────┐                          │
│                    │  Copilot    │ ← Server-side runtime    │
│                    │  Runtime    │                          │
│                    └──────┬──────┘                          │
│                           │                                 │
│          ┌────────────────┼────────────────┐                │
│          │                │                │                │
│   ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐        │
│   │   OpenAI    │  │  Anthropic  │  │  LangGraph  │        │
│   │   Adapter   │  │   Adapter   │  │   CoAgent   │        │
│   └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

### CopilotKit Components

| Component | What It Does | Your Use Case |
|-----------|--------------|---------------|
| **CopilotKit Provider** | Wraps app, provides context | Root of your app |
| **CopilotChat** | Full chat interface | Main conversation UI |
| **CopilotPopup** | Floating chat bubble | Mobile/quick access |
| **CopilotSidebar** | Collapsible side panel | Deal workspace AI panel |
| **CopilotTextarea** | AI-powered textarea | Memo editor with autocomplete |

### CopilotKit Hooks

| Hook | Purpose | Your Use Case |
|------|---------|---------------|
| `useCopilotReadable` | Share app state with AI | AI sees current deal, pipeline, user context |
| `useCopilotAction` | Define actions AI can execute | Move deal, draft email, schedule call |
| `useCopilotChat` | Programmatic chat control | Control chat from any component |
| `useCopilotChatSuggestions` | Dynamic suggestions | "Show me high-fit deals" suggestions |
| `useCoAgent` | Bidirectional LangGraph state | Complex multi-step workflows |
| `useCoAgentStateRender` | Render agent state as UI | Show deal cards in chat |
| `useHumanInTheLoop` | Approval workflows | Founder outreach approval |

---

### Mapping to VC Associate Requirements

#### AI-Led Workspace (Conversation as Primary Navigation)

```jsx
// User says: "Show me the ACME deal"
// AI understands context and executes action

useCopilotAction({
  name: "showDeal",
  description: "Navigate to a specific deal workspace",
  parameters: [
    { name: "dealName", type: "string", description: "Deal or company name" }
  ],
  handler: async ({ dealName }) => {
    const deal = await findDeal(dealName);
    router.push(`/deals/${deal.id}`);
    return `Opening ${deal.name} workspace`;
  }
});
```

#### AI Can Read App State

```jsx
function DealWorkspace({ deal }) {
  // AI can see all of this
  useCopilotReadable({
    description: "Current deal being viewed",
    value: {
      id: deal.id,
      name: deal.name,
      stage: deal.stage,
      fitScore: deal.fitScore,
      lastCall: deal.lastCall,
      openQuestions: deal.openQuestions
    }
  });

  // Now AI can answer: "What stage is this deal?"
  // Without building a custom RAG system
}
```

#### AI Can Execute Actions

```jsx
useCopilotAction({
  name: "moveDealToStage",
  description: "Move deal to a pipeline stage",
  parameters: [
    { name: "stage", type: "string", enum: ["First Look", "Deep Dive", "Pre-IC", "IC"] }
  ],
  handler: async ({ stage }) => {
    await updateDeal(deal.id, { stage });
    return `Moved ${deal.name} to ${stage}`;
  }
});

useCopilotAction({
  name: "draftFounderEmail",
  description: "Draft an email to the founder",
  parameters: [
    { name: "purpose", type: "string" },
    { name: "tone", type: "string", enum: ["formal", "casual", "follow-up"] }
  ],
  handler: async ({ purpose, tone }) => {
    const draft = await generateEmail(deal, purpose, tone);
    openEmailComposer(draft);
    return `Draft ready for review`;
  }
});
```

#### Generative UI (AI Returns Components)

```jsx
// AI can return React components in chat
useCoAgentStateRender({
  name: "deal_search_results",
  render: ({ state }) => (
    <div className="grid gap-2">
      {state.deals.map(deal => (
        <DealCard
          key={deal.id}
          deal={deal}
          onSelect={() => router.push(`/deals/${deal.id}`)}
        />
      ))}
    </div>
  )
});

// User: "Show me Series A fintech deals"
// AI: Returns interactive DealCard components in chat
```

#### Human-in-the-Loop (Founder Outreach Approval)

```jsx
// LangGraph agent with interrupt for approval
const founderOutreachAgent = {
  nodes: {
    identifyGaps: analyzeForInfoGaps,
    draftQuestions: generateQuestions,

    // INTERRUPT: Wait for human approval
    awaitApproval: {
      interrupt: true,
      render: ({ state }) => (
        <ApprovalCard
          title="Send questions to founder?"
          questions={state.draftedQuestions}
          onApprove={() => continueAgent()}
          onEdit={() => openEditor(state.draftedQuestions)}
          onReject={() => cancelAgent()}
        />
      )
    },

    sendEmail: sendFounderEmail
  }
};
```

#### AI-Powered Textarea (Memo Autocomplete)

```jsx
<CopilotTextarea
  placeholder="Start writing your investment memo..."
  autosuggestionsConfig={{
    textareaPurpose: "Investment memo for VC deal evaluation",
    contextCategories: ["dealContext", "thesisFit", "marketResearch"]
  }}
  className="min-h-[400px]"
  value={memoContent}
  onChange={setMemoContent}
/>
```

---

### AG-UI Protocol Details

#### Event Types (16 Total)

**Lifecycle Events** — Track agent execution:
- `RunStarted` → Agent begins work
- `StepStarted` / `StepFinished` → Discrete processing phases
- `RunFinished` → Work complete
- `RunError` → Failure with error message

**Text Streaming Events** — Live content generation:
- `TextMessageStart` → Opens message stream
- `TextMessageContent` → Incremental text chunks (delta)
- `TextMessageEnd` → Stream complete

**Tool Call Events** — AI executing actions:
- `ToolCallStart` → Tool invocation begins
- `ToolCallArgs` → Arguments streamed as JSON
- `ToolCallEnd` → Tool call complete
- `ToolCallResult` → Execution result

**State Sync Events** — Bidirectional state:
- `StateSnapshot` → Full state sent
- `StateDelta` → JSON Patch incremental updates (RFC 6902)

#### Mapping AG-UI to Requirements

| AG-UI Feature | Your Requirement | Implementation |
|---------------|------------------|----------------|
| **Streaming events** | "AI work visibility" | `StepStarted`: "Parsing deck...", "Extracting metrics..." |
| **State sync** | Deal workspace state synced | `StateSnapshot` + `StateDelta` for real-time updates |
| **Tool calls** | AI controls UI | AI calls `showDeal()`, `openMemo()`, `movePipeline()` |
| **Interrupt handling** | Human-in-the-loop | Pause agent, user approves, resume |

---

### Supported Agent Frameworks

AG-UI has first-party integrations with:

| Framework | Language | Best For |
|-----------|----------|----------|
| **LangGraph** | Python/JS | Complex orchestration workflows |
| **CrewAI** | Python | Multi-agent coordination |
| **Mastra** | TypeScript | Finance/data-driven copilots |
| **Pydantic AI** | Python | Type-safe agents |
| **LlamaIndex** | Python | Data retrieval workflows |

**Coming soon:** OpenAI Agent SDK, Google ADK, Vercel AI SDK, AWS Bedrock Agents

---

### Alternative: Vercel AI SDK + assistant-ui

If you prefer a simpler approach with more UI control:

| Attribute | Details |
|-----------|---------|
| GitHub | [vercel/ai](https://github.com/vercel/ai) + [assistant-ui](https://github.com/assistant-ui/assistant-ui) |
| Downloads | 2M+ weekly (AI SDK) |
| Approach | Composable primitives |

**Choose this if:**
- You want maximum UI control (Radix-like composability)
- Simpler architecture is preferred
- AI is a feature, not the entire product

**Choose CopilotKit if:**
- AI IS the product (AI-native)
- You need proactive AI, state sync, actions
- Multi-agent workflows are required
- Open protocol (AG-UI) matters

---

## Part 2: Libraries Still Needed

These libraries are **NOT replaced** by CopilotKit and remain part of the stack.

---

### Voice Input/Output

| Library | Purpose |
|---------|---------|
| [react-speech-recognition](https://github.com/JamesBrill/react-speech-recognition) | Speech-to-text (tap-to-talk) |
| Web Speech API (`SpeechSynthesis`) | Text-to-speech |

```javascript
// TTS example
const utterance = new SpeechSynthesisUtterance("Here's your deal summary");
speechSynthesis.speak(utterance);
```

**Note:** CopilotKit handles the chat/AI response part; voice is separate.

---

### Command Bar (Cmd+K)

| Library | Details |
|---------|---------|
| [cmdk](https://github.com/pacocoursey/cmdk) | Used by Linear, Vercel, Raycast |

**Note:** CopilotChat provides natural language commands, but cmdk is still valuable for:
- Quick keyboard navigation
- Non-AI commands (settings, shortcuts)
- Power user workflows

If you want to simplify, CopilotChat can replace most command bar use cases.

---

### Rich Text Editor (Memos, Notes)

| Library | Details |
|---------|---------|
| [Tiptap](https://github.com/ueberdosis/tiptap) | ProseMirror-based, React-first |
| [Yjs](https://github.com/yjs/yjs) | CRDT for real-time collaboration |
| [Hocuspocus](https://hocuspocus.dev/) | Yjs backend (self-hosted) |

**Why still needed:** `CopilotTextarea` is for simple AI autocomplete. Investment memos need:
- Rich formatting (headers, lists, tables)
- Collaborative editing (multiple users)
- Citations and links
- Version history

**Key Tiptap Extensions:**
- `@tiptap/extension-collaboration` — Yjs integration
- `@tiptap/extension-collaboration-cursor` — Live cursors
- `@tiptap/extension-mention` — @mentions for team
- `@tiptap/extension-link` — Citations to sources

---

### Data Tables & Pipeline Views

| Library | Details |
|---------|---------|
| [TanStack Table](https://github.com/TanStack/table) | Headless, bring your own UI |

**Features needed:**
- Sorting, filtering, grouping
- Row selection
- Pagination
- Custom cell renderers (fit scores, stage badges)

---

### Kanban Board (Pipeline Visualization)

| Library | Details |
|---------|---------|
| [dnd-kit](https://dndkit.com/) | Modern React drag-and-drop |

**Note:** `react-beautiful-dnd` is deprecated. Use dnd-kit.

**Starter:** [react-dnd-kit-tailwind-shadcn-ui](https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui)

---

### Base UI Component Framework

| Library | Details |
|---------|---------|
| [shadcn/ui](https://ui.shadcn.com/) | Components live in YOUR codebase |
| [Radix UI](https://www.radix-ui.com/) | Accessible primitives (used by shadcn) |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |

**Included components:** Dialog, Dropdown, Tabs, Toast (Sonner), Command (cmdk), Form, and 40+ more.

---

### Forms & Validation

| Library | Purpose |
|---------|---------|
| [react-hook-form](https://react-hook-form.com/) | Form state management |
| [Zod](https://zod.dev/) | Schema validation + TypeScript types |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Integration |

---

### File Upload & PDF

| Library | Purpose |
|---------|---------|
| [react-dropzone](https://react-dropzone.js.org/) | Drag-and-drop file upload |
| [react-pdf](https://github.com/wojtekmaj/react-pdf) | PDF viewing (deck display) |
| [@react-pdf/renderer](https://react-pdf.org/) | PDF generation (IC packets) |

---

### Notifications & Toasts

| Library | Details |
|---------|---------|
| [Sonner](https://github.com/emilkowalski/sonner) | Official toast for shadcn/ui |

---

### Markdown Rendering

| Library | Purpose |
|---------|---------|
| [react-markdown](https://github.com/remarkjs/react-markdown) | Render AI responses |
| [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) | Code blocks |

---

### Mobile / Cross-Platform

| Library | Details |
|---------|---------|
| [Expo](https://expo.dev/) | React Native framework |
| expo-speech | Text-to-speech on mobile |
| expo-av | Audio recording |
| react-native-voice | Speech-to-text |

**Code sharing:** Separate optimized apps (Next.js + Expo) with shared business logic in a monorepo.

---

## Part 3: Redundancy Analysis

### What CopilotKit Replaces

| Original Library | Status | CopilotKit Replacement |
|-----------------|--------|------------------------|
| **assistant-ui** | ❌ REMOVE | `CopilotChat`, `CopilotSidebar`, `CopilotPopup` |
| **Vercel AI SDK (UI hooks)** | ❌ REMOVE | AG-UI protocol handles streaming |
| **Custom streaming logic** | ❌ REMOVE | AG-UI `TextMessageContent` events |
| **Custom action/tool system** | ❌ REMOVE | `useCopilotAction` |
| **Custom state injection** | ❌ REMOVE | `useCopilotReadable` |
| **Custom generative UI** | ❌ REMOVE | `useCoAgentStateRender` |
| **Custom approval workflows** | ❌ REMOVE | `useHumanInTheLoop` |

### What to Keep

| Library | Status | Reason |
|---------|--------|--------|
| **shadcn/ui** | ✅ KEEP | General UI components |
| **Tiptap + Yjs** | ✅ KEEP | Rich text + collaboration (CopilotTextarea is basic) |
| **TanStack Table** | ✅ KEEP | Data grids not provided |
| **dnd-kit** | ✅ KEEP | Drag-and-drop not provided |
| **cmdk** | ⚡ OPTIONAL | CopilotChat overlaps for NL commands |
| **react-hook-form + Zod** | ✅ KEEP | Forms not provided |
| **react-dropzone** | ✅ KEEP | File upload not provided |
| **react-pdf** | ✅ KEEP | PDF viewing not provided |
| **Sonner** | ✅ KEEP | Toasts not provided |
| **Expo** | ✅ KEEP | Mobile framework |
| **Zustand** | ⚡ PARTIAL | Keep for non-AI state; CopilotKit handles AI state |

---

## Part 4: Final Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    CORE AI INFRASTRUCTURE                    │
│                                                              │
│  CopilotKit + AG-UI Protocol                                │
│  ├── CopilotChat / Sidebar / Popup (Chat UI)                │
│  ├── CopilotTextarea (AI writing assist)                    │
│  ├── useCopilotReadable (State → AI)                        │
│  ├── useCopilotAction (AI → Actions)                        │
│  ├── useCoAgent (LangGraph integration)                     │
│  ├── useHumanInTheLoop (Approvals)                          │
│  └── useCoAgentStateRender (Generative UI)                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    SUPPORTING LIBRARIES                      │
│                                                              │
│  UI Framework:        shadcn/ui + Tailwind                  │
│  Rich Text Editor:    Tiptap + Yjs + Hocuspocus             │
│  Data Tables:         TanStack Table                        │
│  Drag & Drop:         dnd-kit                               │
│  Command Bar:         cmdk (optional)                       │
│  Forms:               react-hook-form + Zod                 │
│  File Upload:         react-dropzone                        │
│  PDF Viewing:         react-pdf                             │
│  Notifications:       Sonner                                │
│  Voice:               react-speech-recognition              │
│  Mobile:              Expo                                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    REMOVED (REDUNDANT)                       │
│                                                              │
│  ❌ assistant-ui                                            │
│  ❌ Vercel AI SDK UI hooks                                  │
│  ❌ Custom streaming logic                                  │
│  ❌ Custom tool/action system                               │
│  ❌ Custom state injection                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Part 5: Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│              AI-Native Architecture (CopilotKit)             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    CopilotKit                         │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │   │
│  │  │  Readable   │ │   Actions   │ │  CoAgents   │    │   │
│  │  │   State     │ │ (AI→App)    │ │ (LangGraph) │    │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘    │   │
│  │                        │                             │   │
│  │           AG-UI Protocol (Events/Streaming)          │   │
│  └──────────────────────────┬───────────────────────────┘   │
│                             │                               │
│  ┌──────────────┐    ┌──────▼───────┐    ┌──────────────┐  │
│  │  Chat/Voice  │    │  Workspaces  │    │   Command    │  │
│  │   (Primary)  │    │ (Contextual) │    │    Bar       │  │
│  │              │    │              │    │   (Cmd+K)    │  │
│  │ CopilotChat  │    │   Tiptap +   │    │    cmdk      │  │
│  │ + Voice API  │    │  TanStack +  │    │  (optional)  │  │
│  │              │    │   dnd-kit    │    │              │  │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘  │
│         │                   │                   │           │
│         └───────────────────┼───────────────────┘           │
│                             │                               │
│                    ┌────────▼────────┐                      │
│                    │   shadcn/ui     │                      │
│                    │  Design System  │                      │
│                    └────────┬────────┘                      │
│                             │                               │
│         ┌───────────────────┼───────────────────┐           │
│         │                   │                   │           │
│  ┌──────▼───────┐    ┌──────▼───────┐    ┌──────▼───────┐  │
│  │    Next.js   │    │   Expo App   │    │  Yjs/CRDT    │  │
│  │   (Desktop)  │    │   (Mobile)   │    │   (Collab)   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Part 6: Implementation Roadmap

### Phase 1: Proof of Concept (1-2 days)

```bash
# Initialize CopilotKit
npx copilotkit@latest init

# Install packages
npm install @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime
```

```jsx
// app/layout.tsx
import { CopilotKit } from "@copilotkit/react-core";

export default function Layout({ children }) {
  return (
    <CopilotKit runtimeUrl="/api/copilot">
      {children}
    </CopilotKit>
  );
}
```

### Phase 2: Core Features (1 week)

1. **Deal Context** — `useCopilotReadable` for deal state
2. **Basic Actions** — `useCopilotAction` for navigation, stage changes
3. **Chat UI** — `CopilotSidebar` in deal workspace

### Phase 3: Advanced Features (2 weeks)

1. **LangGraph Agents** — Research, writing, outreach agents
2. **Human-in-the-Loop** — Approval flows for founder contact
3. **Generative UI** — Deal cards, fit scores in chat

### Phase 4: Polish (1 week)

1. **Custom UI** — Match your design system (headless mode)
2. **Mobile** — Expo integration
3. **Voice** — Add speech recognition to chat

---

## Part 7: Decision Summary

| Question | Answer |
|----------|--------|
| **Is CopilotKit production-ready?** | Yes — Fortune 500 companies, 22k GitHub stars |
| **Is AG-UI an open standard?** | Yes — not locked to CopilotKit |
| **Can we switch later if needed?** | Yes — AG-UI is protocol-based, actions are portable |
| **What's the learning curve?** | Medium — more concepts than simpler libs, but pays off |
| **Does it fit our requirements?** | Almost perfectly aligned with AI-native, proactive, action-based needs |

---

## Sources

### AI Infrastructure
- [CopilotKit Documentation](https://docs.copilotkit.ai/)
- [CopilotKit GitHub](https://github.com/CopilotKit/CopilotKit)
- [AG-UI Protocol Specification](https://docs.ag-ui.com/)
- [AG-UI GitHub](https://github.com/ag-ui-protocol/ag-ui)
- [CopilotKit Examples](https://www.copilotkit.ai/examples)

### Supporting Libraries
- [shadcn/ui](https://ui.shadcn.com/)
- [Tiptap](https://github.com/ueberdosis/tiptap)
- [Yjs](https://github.com/yjs/yjs)
- [TanStack Table](https://github.com/TanStack/table)
- [dnd-kit](https://dndkit.com/)
- [cmdk](https://github.com/pacocoursey/cmdk)
- [react-hook-form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [react-dropzone](https://react-dropzone.js.org/)
- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- [Sonner](https://github.com/emilkowalski/sonner)
- [Expo](https://expo.dev/)
- [react-speech-recognition](https://github.com/JamesBrill/react-speech-recognition)
