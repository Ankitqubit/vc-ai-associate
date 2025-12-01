# Tech Stack Research: AI-Native Venture Capital Associate

## Executive Summary

To build a truly "AI-Native" application where the AI is not just a chatbot sidebar but deeply integrated into the UI (Generative UI) and workflow (Agentic Workflows), we need a specialized stack.

**Recommendation:** Adopt **CopilotKit** as the core AI infrastructure.

It provides the most robust, production-ready framework for:
1.  **Context-Awareness**: Reading app state (deals, emails, notes) automatically.
2.  **Action-Taking**: Performing actions (update stage, draft email) via simple hooks.
3.  **Generative UI**: Rendering React components (deal snapshots, research cards) inside the chat.
4.  **Agentic Backend**: Seamless integration with LangChain/LangGraph for complex multi-step reasoning.

---

## Part 1: The "AI-Native" Requirement

Standard chatbots (ChatGPT wrappers) are insufficient for a VC workflow.

| Feature | Standard Chatbot | AI-Native App (Goal) |
| :--- | :--- | :--- |
| **Context** | User must copy-paste data | AI reads screen & DB automatically |
| **Action** | Text output only ("Here is a draft...") | Direct execution (Drafts email in UI) |
| **UI** | Markdown text | Interactive Cards, Charts, Forms |
| **Scope** | Isolated sidebar | Integrated into every text area & view |

---

## Part 2: Framework Options Analysis

### 1. Vercel AI SDK (Current Standard)
*   **Pros**: Lightweight, standard for Next.js, great streaming support.
*   **Cons**: "Generative UI" is manual (you build the loop). "Context" is manual (you feed the system prompt).
*   **Verdict**: Good for simple chat, too much boilerplate for complex agentic apps.

### 2. LangChain.js / LangGraph.js
*   **Pros**: Powerful backend logic, state machines, multi-agent orchestration.
*   **Cons**: No frontend opinion. You still have to build the UI, the streaming protocol, the optimistic updates, etc.
*   **Verdict**: **Essential for the backend**, but not a full stack solution.

### 3. CopilotKit (Recommended)
*   **Pros**:
    *   **Frontend-First**: Built specifically for React apps.
    *   **`useCopilotReadable`**: Hook to make any React state visible to AI.
    *   **`useCopilotAction`**: Hook to let AI call your functions.
    *   **Generative UI**: Built-in streaming of React components.
    *   **CoAgents**: First-class support for LangGraph agents.
*   **Cons**: Newer ecosystem than Vercel AI SDK (but growing fast).
*   **Verdict**: **The best fit for this project.** It bridges the gap between the App (React) and the Agent (LangGraph).

---

## Part 3: The Chosen Stack

### Frontend (User Experience)
*   **Framework**: **Next.js 15 (App Router)** — Performance, server components.
*   **Language**: **TypeScript** — Type safety is critical for AI protocols.
*   **Styling**: **Tailwind CSS** + **shadcn/ui** — Beautiful, accessible, copy-paste components.
*   **AI Client**: **CopilotKit (`@copilotkit/react-core`)** — The nervous system connecting UI to AI.
*   **State Management**: **React Context / Nuqs (URL state)** — Simple state that CopilotKit can read.

### Backend (Intelligence)
*   **Runtime**: **Next.js API Routes (Edge/Serverless)**.
*   **Model Provider**: **Anthropic Claude 3.5 Sonnet** (via API). Best for coding and reasoning.
*   **Agent Framework**: **LangGraph** (via `@copilotkit/runtime`). For complex "Research Deal" workflows that require steps.
*   **Database**: **Supabase (PostgreSQL)**. Vector support (pgvector) for RAG if needed later.

---

## Part 4: Detailed Component Breakdown

### 1. The "Brain" (CopilotKit)
Instead of writing a massive system prompt, we distribute intelligence across components.

*   **In `DealDashboard`**:
    ```tsx
    useCopilotReadable({
      description: "The list of active deals",
      value: deals
    });
    ```
*   **In `DealDetail`**:
    ```tsx
    useCopilotAction({
      name: "updateDealStage",
      description: "Move deal to next stage",
      parameters: [ ... ],
      handler: async ({ stage }) => { ... }
    });
    ```

### 2. Generative UI (AG-UI)
We don't just stream text. We stream **UI**.

*   **Scenario**: User asks "Analyze this startup".
*   **Response**: AI streams a `<ResearchCard />` component containing:
    *   Competitor map (interactive)
    *   Founder background (linked to LinkedIn)
    *   Market sizing charts

### 3. Editor Integration
VCs write a lot (memos, emails).
*   **Tool**: **Tiptap** (Headless editor).
*   **AI**: **CopilotKit Textarea** (Autocomplete, "rewrite this", "make it friendlier").

### 4. Other Key Libraries

| Category | Library | Why? |
| :--- | :--- | :--- |
| **Data Fetching** | TanStack Query | Caching, optimistic updates (critical for AI actions) |
| **Forms** | React Hook Form + Zod | Type-safe forms that AI can autofill |
| **Rich Text** | Tiptap | Best headless editor for "Notion-like" experience |
| **Drag & Drop** | dnd-kit | For Kanban board (AI can also "move" cards) |
| **File Upload** | react-dropzone | Dragging pitch decks for analysis |
| **PDF Viewing** | react-pdf | Rendering decks in-browser |
| **Notifications** | Sonner | Clean toasts for "AI updated the deal" |
| **Voice** | react-speech-recognition | "Hey AI, take a note..." |
| **Mobile** | Expo | (Future) Native mobile experience |

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
