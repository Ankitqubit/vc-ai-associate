# AI Analyst / AI Associate for VC – Full PRD (Phase I)

**Document owner:** Sahil
**Version:** v0.2 (Execution PRD – Phase I / Design Partner Beta)
**Audience:** Product, Engineering, Design, GTM, Customer Success

---

## 1. Overview

### 1.1 Product Vision

> **"The best employee I ever hired."**

We are building an **AI-powered junior team member** for VC funds—not a tool, not a feature, but a true teammate. The AI (name TBD) sits inside the fund's workflows and operates like a conscientious, capable analyst who:

- **Is proactive:** Automatically kicks off workflows when deals arrive, identifies info gaps, and suggests next steps without being asked.
- **Has memory:** Remembers every deal, every call, every decision, and every piece of feedback across the fund's entire history.
- **Exercises judgment:** Knows when to act autonomously, when to ask for confirmation, and when to escalate to humans.
- **Learns from feedback:** Improves over time based on corrections, preferences, and decisions—just like a junior employee growing into the role.

This is not a general-purpose AI assistant or a generic RAG system. It is **fund-specific and deal-centric**, trained on each fund's thesis, historical decisions, and unique way of operating.

### 1.2 What Makes This Different

Most AI tools in the VC space are point solutions: deck parsers, memo generators, CRM plugins. They require humans to drive every interaction.

Our AI operates differently:

- **It takes initiative.** When a deck arrives, it doesn't wait to be told what to do—it creates the deal record, parses the deck, scores the fit, enriches context, and prepares for the next step.
- **It provides evidence.** Every recommendation, score, and suggestion comes with citations: specific slides, transcript quotes, thesis references, or comparisons to similar past deals.
- **It knows its limits.** When uncertain, it says "I don't have enough information to answer that" rather than guessing. When topics are sensitive, it escalates to humans.
- **It adapts to each fund.** The platform is highly configurable—different workflows, different templates, different thesis criteria—because every fund operates differently.

### 1.3 Scope of this PRD

This PRD covers **Phase I / Design Partner Beta**:

- A **broad but opinionated initial product** that:
  - Delivers several end-to-end workflows that feel genuinely useful.
  - Is good enough for daily use by 2–5 design partner funds.
- A small number of **"hero workflows"** must be highly reliable and polished.
- Non-essential workflows may ship with limited scope and rough edges, but they must not compromise trust, data integrity, or reputation.

Longer-term vision (V2 / V2+) is captured in the Concept & Job Map document and is **out of scope** for this execution PRD except where explicitly referenced.

---

## 2. AI Capabilities & Behavior

This section defines what the AI can do, how it behaves, and what users should expect. These principles apply across all features and workflows.

### 2.1 Research & Information Gathering

The AI can perform any research task a junior analyst with internet access could do:

- **Deal-specific research:** Company background, team profiles, funding history, competitor landscape.
- **Market research:** TAM/SAM estimates, market trends, industry analysis.
- **Competitive intelligence:** What other VCs are investing in, recent deals in a sector, fund strategy analysis.
- **Fund data queries:** Search across all deals, memos, transcripts, and notes in the fund's workspace.

The AI synthesizes information from multiple sources and always provides citations for its findings.

### 2.2 Action-Taking Abilities

The AI can take actions on behalf of users, not just answer questions:

- **Create and update records:** Deal records, notes, tasks, contact information.
- **Draft communications:** Emails to founders, follow-up messages, internal updates.
- **Move deals through stages:** With appropriate confirmation for critical transitions.
- **Schedule and prepare:** Calendar invites (via integration), call prep docs, meeting agendas.
- **Generate artifacts:** Memos, summaries, research reports, IC packs.

**Confirmation model:** For low-risk actions (updating notes, generating drafts), the AI acts autonomously. For high-risk actions (changing deal stage, sending external emails), the AI proposes and waits for human confirmation.

### 2.3 Evidence & Citation Requirements

Every AI output that involves judgment or recommendation must include supporting evidence:

- **Fit scores:** Cite specific thesis criteria matched/unmatched, with references to deck slides or call quotes.
- **Summaries:** Link to specific transcript timestamps or document sections.
- **Recommendations:** Reference similar past deals, thesis documents, or partner feedback.
- **Risk assessments:** Point to specific data points that raised concerns.

The goal is transparency: users should always be able to trace AI conclusions back to source material.

### 2.4 Handling Uncertainty

The AI must be honest about what it doesn't know:

- **Explicit uncertainty:** When data is insufficient, the AI says "I don't have enough information to answer that" or "Based on limited data, my confidence is low."
- **No hallucination:** The AI never fabricates facts, metrics, or sources. If information isn't available, it says so.
- **Confidence indicators:** Where appropriate, the AI signals confidence levels (e.g., "High confidence based on multiple sources" vs "Preliminary estimate based on deck claims only").

### 2.5 Learning & Improvement

The AI improves over time through multiple feedback mechanisms:

**Explicit feedback:**
- Thumbs up/down on any AI output.
- Tags indicating specific issues ("too optimistic," "missed key risk," "wrong metric").
- Detailed corrections with explanations (most valuable for learning).

**Implicit signals:**
- Whether AI-generated content was accepted, edited, or discarded.
- How often users override AI suggestions.
- Which artifacts get shared or referenced in decisions.

**Decision learning:**
- The AI considers past fund decisions (investments, passes, and their rationales) when scoring and recommending.
- Over time, it learns the fund's actual preferences, not just stated thesis criteria.

**Critical expectation:** If a partner rates a deal at 50 but the AI scored it 75, this is a significant miss that requires investigation and learning. The system should ask for feedback explaining the gap and use it to improve future scoring.

### 2.6 Cross-Deal Intelligence

The AI doesn't just operate on individual deals—it surfaces patterns and connections:

- **Comparisons:** "This deal is similar to 5 others you saw this quarter. Here's how they compare."
- **Conflict detection:** "This company competes with [portfolio company]. Flagging for review."
- **Network insights:** "This founder previously worked at [portfolio company]" or "You met them at [event]."
- **Pattern recognition:** "You've passed on 4 similar deals recently. Common reasons: [X, Y, Z]."

---

## 3. Goals, Non-Goals, and Success Metrics

### 3.1 Product goals (Phase I)

1. **Reduce analyst grunt work.** Cut the time analysts spend on intake, structuring, call prep, and post-call updates by at least **30–50%** for design partners.
2. **Increase partner leverage.** Allow partners to get up to speed on a deal in **<5 minutes** through summaries and memos instead of reading raw decks and notes.
3. **Improve pipeline hygiene.** Ensure that **most active deals** at design partner funds have structured records, up-to-date notes, and recent call summaries.
4. **Test founder-facing AI safely.** Run a **limited, guardrailed beta** of founder-facing AI (email and short calls) with clear consent and escalation patterns.
5. **Establish trust and reliability.** Demonstrate that the AI is predictable, auditable, and correctable; it should feel like a conscientious junior, not a black box.

### 3.2 Non-goals (for Phase I)

Phase I will **not**:

- Build a full-blown **valuation or financial modeling engine** (detailed DCFs, complex cap tables).
- Replace lawyers or do **full legal document analysis & negotiation**.
- Own **outbound sourcing** (lists, personalized outreach) as a primary workflow.
- Provide full **portfolio management & LP reporting** (only light experiments if time).
- Serve as a general-purpose AI or open-ended RAG layer for arbitrary documents.

### 3.3 Success metrics (first pass)

**Usage & coverage**

- % of inbound deals that are **auto-structured** into a deal record in the app.
- % of partner/associate calls that have an **AI-generated summary** attached within X hours.

**Efficiency**

- Average analyst time per **new deal from intake → first memo draft**, baseline vs with AI.
- Time from **first touch → IC memo draft** for deals that progress to IC discussion.

**Quality & satisfaction**

- Partner/associate rating of AI artifacts (summaries, memos, call prep) on a 1–5 scale.
- % of AI-generated outputs that are **accepted with minor edits vs heavily rewritten**.

**Business health**

- Number of **active funds** and weekly active users per fund among design partners.
- Retention and expansion across design partners (e.g., more users, more workflows adopted).

Exact metric targets will be refined with early usage, but these dimensions define what “good” looks like.

---

## 4. Users, Roles, and Personas

### 4.1 Personas

1. **Analyst / Associate (Primary user)**
   - Heavy, daily user of the app.
   - Owns deal intake, structuring, research, call prep, and post-call updates.
   - Uses the AI to draft memos and keep the deal workspace up to date.

2. **Partner / Principal**
   - Senior decision maker; time-poor and context-switching.
   - Uses the AI to quickly understand deals, review memos, and ask ad-hoc questions.
   - Prefers mobile-friendly and chat/voice-first access.

3. **Platform / Operations / IR (Later in Phase I / early V2)**
   - Focus on portfolio health and LP-facing materials.
   - Uses the AI to pull updates and draft internal/LP summaries.
   - Phase I: mostly read access + light internal reporting.

4. **Founder (Limited beta in Phase I, expanding later)**
   - Provides information via AI-led email Q&A and short AI calls.
   - Expects clarity about talking to an AI, plus easy opt-out to humans.

### 4.2 Roles & permissions (product-level)

Initial roles (can be mapped to actual fund job titles):

- **Partner**
  - Full access to all deals in the fund by default.
  - Can read and comment on all AI artifacts; can override system decisions (e.g., deal stage).
  - Can enable/disable founder-facing AI for their fund or specific deals.

- **Associate / Analyst**
  - Create and edit deals they own; can be granted access to others.
  - Full access to AI features for deals they can see (intake, summaries, memos).
  - Can initiate founder-facing flows where permitted.

- **Ops / IR**
  - Read access to most deals; write access to internal notes and selected artifacts.
  - Initiate or view LP-facing drafts (later).

- **Read-only / Guest**
  - Primarily for limited internal or external stakeholders (e.g., some LPs).
  - Read-only access to selected deals, memos, or views.

Permission model for Phase I should be **fund-simple**:

- Start with fund-level defaults (partners see all; associates see most).
- Support **deal-level overrides** (e.g., “stealth” deals visible only to a subset of users).

---

## 5. Configurability Framework

Every fund operates differently. The platform must adapt to each fund's unique workflows, templates, and preferences rather than forcing a one-size-fits-all approach.

### 5.1 Philosophy

- **Opinionated defaults:** Funds without defined processes get a sensible starting workflow that works out of the box.
- **Deep customization:** Funds with existing processes can configure the platform to match their way of working.
- **Onboarding as hiring:** Configuration happens during a 1-2 week onboarding period, similar to bringing a new team member up to speed.

### 5.2 Workflow & Pipeline Configuration

Funds can define their own deal pipeline:

- **Custom stages:** Not limited to a fixed set—funds define stages like "Inbound," "First Call," "Deep Dive," "Pre-IC," "IC," "Partner Vote," "Term Sheet," etc.
- **Stage requirements:** What artifacts are required before a deal can move to the next stage (e.g., "Memo required before IC").
- **Transition rules:** Who can move deals between stages, and which transitions require approval.
- **Assignments:** How deals get assigned to owners (round-robin, by sector, manual, etc.).

**Default workflow provided:** For funds without a defined process, we provide a standard pipeline that covers typical VC stages.

### 5.3 Thesis Configuration

The ThesisConfig drives fit scoring, question generation, and deal prioritization:

**Hard constraints:**
- Stage preferences (Seed only, Series A-B, etc.)
- Geography (US only, Europe, global, etc.)
- Check size range
- Excluded sectors (no crypto, no hardware, etc.)

**Soft preferences with weighting:**
- Relative importance of team vs market vs traction
- Sector appetites (currently interested in fintech, less interested in consumer)
- Business model preferences (SaaS, marketplace, etc.)

**Anti-portfolio patterns:**
- "We passed on [company] because [reason]"—helps the AI understand blind spots and edge cases

**Time-varying preferences:**
- "We're currently overweight fintech" or "Looking for more healthcare deals"
- Easy to update as fund strategy evolves

ThesisConfig is set during onboarding and can be updated by partners at any time. Changes propagate across fit scoring, question generation, and recommendations.

### 5.4 Memo & Artifact Templates

Funds can customize how memos and other artifacts are structured:

- **Section order:** Some funds want "Team" first; others want "Risks" front and center.
- **Required vs optional sections:** Some funds always want unit economics; others only care for later-stage deals.
- **Tone and style:** Bullet-heavy vs prose paragraphs, formal vs casual.
- **Custom sections:** Ability to add fund-specific sections.

**V2:** Per-partner preferences (Partner A likes detailed financials; Partner B prefers narrative summaries).

### 5.5 Automation Rules

The platform supports configurable automation with human-in-the-loop checkpoints:

**Structure:** IF [condition] THEN [action] WITH [approval level]

**Examples:**
- IF fit_score < 30 AND no_thesis_match THEN send_decline_template WITH approval: auto
- IF founder_from_tier1_companies THEN flag_for_partner WITH approval: auto
- IF deal_idle > 7_days THEN remind_owner WITH approval: auto
- IF stage = "Pre-IC" THEN generate_memo WITH approval: analyst

**Approval levels:**
- **Auto:** AI executes without confirmation
- **Analyst:** AI proposes, analyst confirms
- **Partner:** AI proposes, partner confirms

### 5.6 Notification Preferences

Users can configure how and when they receive updates:

- **Channel:** In-app, email, Slack (V2)
- **Frequency:** Real-time, daily digest, weekly summary
- **Types:** All activity, only deals I own, only high-priority items

**V2:** Tunable proactivity levels (some users want an eager assistant; others want it to speak only when spoken to).

---

## 6. Hero Workflows (Phase I)

These are the **hero workflows** that must feel polished and reliable for design partner funds.

### 6.1 Deck → Deal record + fit score

- Trigger:
  - Analyst forwards a deck or intro email to a special address, uploads a deck, or pastes a link.
- Outcome:
  - A structured **Deal record** is created/updated with key fields.
  - Deck is parsed into problem/solution/product/traction/team, etc.
  - A **fit score** (0–100) and short rationale are generated against the fund’s **ThesisConfig**.

### 6.2 Call → Summary + updated workspace/CRM

- Trigger:
  - A founder call is recorded via a supported provider or a transcript is uploaded.
- Outcome:
  - AI generates a structured **call summary** (what we learned, metrics, risks, next steps).
  - The **deal workspace** is updated (stage, key metrics, next tasks).
  - If CRM sync is configured, key fields are updated there as well.

### 6.3 Deal → Memo draft for IC / partner review

- Trigger:
  - Analyst indicates a deal is ready for deeper review (e.g., moves to “Pre-IC”).
- Outcome:
  - AI drafts an **investment memo** in the fund’s template, with citations to sources.
  - Memo includes thesis fit, key metrics, risks, open questions, and recommendation field for humans.
  - Partners can read, edit, and comment, with clear distinction between AI text and human edits.

### 6.4 Founder info gathering (email + short calls, beta)

- Trigger:
  - Analyst marks specific info gaps on a deal and opts into AI founder outreach for those gaps.
- Outcome:
  - AI conducts **pre-approved, narrow-scope** Q&A with founders via email or short call.
  - Answers are parsed into structured fields and notes, with clear logs and ability to review.
  - Any sensitive or ambiguous topics are escalated to humans with a summary.

---

## 7. Functional Requirements

This section organizes key functional requirements by area. Many map directly to the job map in the Concept & Job Map document; here we emphasize **what must exist in Phase I**.

### 7.1 Deal capture & triage

- Support **email, file upload, and manual entry** as intake paths for new deals.
- Create/merge **Deal records** to avoid duplicates.
- Parse decks and one-pagers into a structured schema (problem, solution, product, business model, traction, team, funding, key metrics).
- Generate **fit scores** and rationales against the configured thesis, including hard constraints (stage, geo, cheque size) and soft preferences.

### 7.2 Pre-call research & call prep

- Lightweight **deal enrichment** (team, funding history, competitors) using public web data where available.
- Generate **call prep docs**:
  - Who they are, what they do.
  - Hypothesis/thesis fit.
  - Key questions and concerns.
  - Suggested agenda.
- Enable analysts to easily edit/extend call prep and mark sections as “final” before calls.

### 7.3 Call handling & post-call work

- Ingest **call transcripts** from supported providers or uploads.
- Generate structured **call summaries** with:
  - What we learned.
  - Metrics shared (with values captured).
  - Risks & concerns.
  - Next steps and owners.
- Update the **Deal record** and CRM (if configured) based on summary:
  - Stage, metrics, notes, tasks.
- Provide easy **inline corrections** (e.g., “Metric X is wrong, correct to Y”) that update both notes and structured fields.

### 7.4 Deep research & memo drafting

- Generate **investment memo drafts** using the fund’s memo template:
  - Overview, thesis fit, team, market, traction, unit economics (if available), risks, open questions.
  - Citations to decks, transcripts, and internal docs where possible.
- Allow users to **regenerate sections** or the entire memo with feedback tags (e.g., “too optimistic”).
- Store memo versions and distinguish **AI-generated text vs human edits**.

### 7.5 Founder-facing AI (limited beta)

This is a strategic differentiator that allows the AI to gather missing information directly from founders, reducing back-and-forth and accelerating deal evaluation.

#### 7.5.1 Trigger & Flow

The AI proactively identifies information gaps after parsing a deck:

1. AI analyzes the deal and identifies missing information (e.g., "MRR not disclosed," "customer breakdown unclear," "GTM strategy not explained").
2. AI suggests outreach: "I noticed gaps in [X, Y, Z]. Should I contact the founder to gather this information?"
3. **Human confirms before any outreach happens.** The AI never contacts founders without explicit approval.

#### 7.5.2 Channel Selection

- **Email (default):** For short question lists (3-5 questions), the AI sends a concise, professional email.
- **Call:** For longer gaps or topics better discussed verbally, the AI suggests a 15-minute call.
- **Founder preference respected:** If a founder prefers email over a call (or vice versa), the AI adapts.

#### 7.5.3 Email Q&A Flow

- AI sends targeted questions based on pre-approved question templates.
- Questions are specific and actionable: "What was your MRR as of last month?" not "Tell me about your traction."
- Replies are parsed automatically—structured data extracted into deal fields, context added to notes.
- If the founder's reply raises new questions, the AI can suggest follow-ups (with human approval).

#### 7.5.4 AI Call Flow

- **Duration:** 15 minutes max, focused on specific information gaps.
- **Structure:** AI follows a script-based flow with flexibility to probe based on answers.
- **Recording:** Calls are recorded and transcribed (with founder consent).
- **Output:** Structured answers extracted into deal record, full transcript available, summary generated.

#### 7.5.5 Fallback Flows

- **Founder declines AI call:** AI sends email with the questions instead.
- **Founder declines AI entirely:** Deal marked as "needs manual outreach," owner notified.
- **Founder requests human:** AI gracefully hands off with a summary: "I'll have someone from our team reach out directly."
- **Standard fallback message:** "Once you respond, a human from our team will review and follow up if there's mutual interest."

#### 7.5.6 Guardrails & Disclosure

**Mandatory disclosure:**
- AI identifies itself clearly at the start of every interaction: "Hi, I'm [AI Name], an AI assistant working with [Fund Name]."
- Explains scope: "I'm reaching out to gather some preliminary information to help the team evaluate fit."

**Prohibited topics (Phase I):**
- Terms, valuation, or pricing discussions
- Legal matters or contractual questions
- Sensitive HR topics (layoffs, personnel issues)
- Anything that could be construed as negotiation

**Escalation behavior:**
- If a founder brings up a prohibited topic, the AI responds: "That's something our team would discuss directly with you. Let me flag this for follow-up."
- Escalation triggers a notification to the deal owner with context.

#### 7.5.7 Opt-in Model

- **Fund-level toggle:** Partners can enable or disable founder-facing AI for the entire fund.
- **Deal-level override:** Even if enabled at fund level, can be disabled for specific sensitive deals.
- **Founder-level consent:** Founders can opt out at any time; the AI respects this immediately.

#### 7.5.8 Website Integration (Optional)

Funds can embed the AI on their website as an alternative to a simple deck upload form:
- AI greets the founder and collects structured information upfront.
- Same guardrails apply as with email/call flows.
- Captured data flows directly into a new deal record.

### 7.6 Ask-the-Analyst interface

Anyone in the fund can talk to the AI like they would a junior team member—asking questions, requesting research, or asking it to take actions.

#### 7.6.1 Scope of Queries

The AI can handle anything a junior analyst with internet access and fund data could do:

**Deal-specific queries:**
- "Summarize our last 2 calls with ACME"
- "What are the main risks we've identified for this deal?"
- "Has the founder responded to our last email?"

**Research requests:**
- "Find 10 competitors to this startup"
- "What's the TAM for vertical SaaS in healthcare?"
- "What has Sequoia been investing in lately?"
- "Pull together a quick market overview for edtech in Southeast Asia"

**Cross-deal queries:**
- "Show me all deals in B2B SaaS with MRR > $50k"
- "Which deals have been idle for more than a week?"
- "How does this compare to similar deals we've seen?"

**Action requests:**
- "Draft a follow-up email to the founder"
- "Move this deal to the Deep Dive stage"
- "Schedule a call with the founder for next week"
- "Generate a memo for this deal"

#### 7.6.2 Interaction Modes

- **In-app chat:** Primary interface, always available in the app
- **Voice:** Speak queries and receive spoken responses (useful for partners on mobile)
- **Context-aware:** The AI knows which deal/memo/view you're looking at and responds accordingly

#### 7.6.3 Citations & Evidence

All responses include:
- **Links** to relevant deals, memos, transcripts, or documents
- **Citations** to specific sources (e.g., "According to the Q3 call transcript...")
- **Confidence indicators** where appropriate

#### 7.6.4 Action Confirmation

For queries that result in actions:
- **Low-risk actions** (generating a draft, searching): Execute immediately
- **High-risk actions** (sending emails, changing deal stage): Present for confirmation first

#### 7.6.5 Handling "I Don't Know"

When the AI doesn't have enough information:
- It says so clearly: "I don't have data on that" or "I couldn't find information about X"
- It suggests alternatives: "Would you like me to research this online?" or "Should I add this as an open question on the deal?"

### 7.7 Knowledge & thesis

- Ingest a set of **thesis decks, IC memos, ‘why we passed’ docs, and sector notes** for each fund.
- Store a structured **ThesisConfig**:
  - Stage, cheque size, geo, sectors, no-gos, preferences.
- Use ThesisConfig consistently for:
  - Fit scoring.
  - Question generation for call prep and founder Q&A.
  - Highlighting relevant prior deals/docs (even if basic at first).

### 7.8 Feedback & learning

- Allow inline **thumbs up/down and tags** on AI outputs (e.g., “too shallow”, “missed key risk”).
- Use feedback to:
  - Improve future generations for the same deal and similar contexts.
  - Inform future tuning or prompt updates (even if manual in Phase I).
- Begin collecting data needed for future **decision-learning**, but keep actual automated re-scoring and pattern insight as a later-phase feature.

---

## 8. UX & Interaction Model

This product is **AI-native**, not traditional software with AI features bolted on. The interface should feel like working with a teammate, not operating a tool.

### 8.1 Design Philosophy: The AI-Led Workspace

We are building an **"AI-led workspace"**—a hybrid model where:

- **The AI is the primary navigation mechanism.** Users talk to the AI, and it materializes the right workspace, data, or artifact.
- **Structured workspaces appear contextually.** When you need to see a deal, memo, or pipeline, the AI pulls it up. You're not clicking through menus.
- **Workspaces are rich and editable.** Once the AI shows you something, you're in a familiar, powerful interface (like Notion or Linear) where you can edit, comment, and navigate.
- **The AI remains present everywhere.** From any screen, you can talk to the AI. It knows where you are and what you're looking at.

This is not a chatbot with a dashboard behind it. It's not a dashboard with a chat widget. It's a new paradigm where conversation and structured interfaces are seamlessly integrated.

### 8.2 Core Interaction Paradigm

#### 8.2.1 Conversational Home

When users open the app, they land in a **conversational state**:

- The AI greets them with context: "Good morning. 3 deals updated overnight. ACME sent their data room—want me to summarize?"
- Users can respond naturally: "Yes, show me ACME" or "What's on my plate today?"
- The AI responds with information, summaries, or by pulling up relevant workspaces.

This is the **default state**—not a dashboard of charts, but a conversation with a teammate who knows everything.

#### 8.2.2 Contextual Workspace Materialization

Based on the conversation, the AI surfaces structured workspaces:

- "Show me the ACME deal" → Deal workspace slides into view
- "What's my pipeline?" → Filtered deal list appears
- "Draft a memo for this" → Memo editor opens with AI-generated first draft

Users can also navigate directly to workspaces via:
- **Command bar** (`Cmd+K` / `Ctrl+K`): Type natural language or structured commands
- **Quick links**: Recent deals, pinned items, notifications

#### 8.2.3 AI Presence Layer

The AI is always accessible, regardless of which workspace you're in:

- **Side panel**: Persistent chat/voice panel that can be expanded or collapsed
- **Inline actions**: AI action buttons on relevant content (e.g., "Summarize this call," "Generate memo")
- **Command bar**: Natural language commands from anywhere
- **Voice activation**: "Hey [AI Name]" or tap-to-talk

### 8.3 Voice & Conversation

Voice is a first-class interaction mode—like talking to a real teammate.

#### 8.3.1 Voice Input

- **Tap-to-talk**: Press a button to speak, release to send
- **Continuous conversation**: For hands-free use, enable continuous listening mode
- **Works everywhere**: Voice input available on any screen, mobile and desktop

#### 8.3.2 Voice Output

Users can toggle between:

- **Text responses**: AI responds with text (default for most contexts)
- **Voice responses**: AI speaks responses aloud (useful for mobile, hands-free, or accessibility)
- **Automatic mode**: Voice in → Voice out; Text in → Text out

Voice output should feel natural—conversational pace, appropriate pauses, not robotic.

#### 8.3.3 Conversation Memory

The AI remembers conversation context:

- "What about their competitors?" works after discussing a deal—no need to re-specify which deal
- "Go back to what you showed me earlier" works within a session
- Cross-session context for ongoing work ("Continue where we left off on the ACME memo")

### 8.4 AI Visibility & Transparency

Users should always know what the AI is doing, what it generated, and where information came from.

#### 8.4.1 AI Work Visibility

When the AI is working, show progress:

- "Parsing deck... Extracting key metrics... Comparing to thesis..."
- Progress indicators with meaningful stages, not just spinners
- Ability to see intermediate results as they're generated

This builds trust and makes the AI feel like a real worker, not a black box.

#### 8.4.2 Content Attribution

Clear visual distinction between AI-generated and human content:

- **AI content**: Subtle visual indicator (e.g., light gray background, small AI icon, or different text color)
- **Human edits**: Marked as human-authored once edited
- **Citations**: AI content includes clickable links to sources (specific deck slides, transcript timestamps, thesis documents)

Example: In a memo, AI-generated sections show a subtle "✦ AI" badge. Each claim has a citation link. Once a human edits a section, the badge changes to show human authorship.

#### 8.4.3 Confidence & Uncertainty

When AI isn't certain, it shows:

- **Confidence indicators**: "High confidence" vs "Based on limited data"
- **Missing information callouts**: "I couldn't find revenue data in the deck—should I ask the founder?"
- **Alternative interpretations**: "The deck says $500K MRR, but the founder mentioned $400K on the call. Which should I use?"

### 8.5 Platform Experiences

#### 8.5.1 Desktop Web App (Primary)

The full-featured experience for deep work:

- **Multi-panel layout**: Conversation + workspace side-by-side
- **Keyboard-first navigation**: Command bar, shortcuts for power users
- **Rich editing**: Full memo editor, detailed deal views, bulk operations
- **Large-screen optimized**: Take advantage of screen real estate

#### 8.5.2 Mobile App (First-Class Citizen)

Mobile is not a stripped-down afterthought—it's optimized for on-the-go workflows:

**Conversation-first design:**
- Home screen is the AI conversation
- Voice interaction is prominent and natural
- Workspaces accessible but secondary

**Optimized actions for mobile:**
- Quick deal lookups ("What's the status on ACME?")
- Approvals and confirmations ("Yes, send that email")
- Voice queries while walking/driving
- Notification responses
- Quick note capture

**Not optimized for mobile (use desktop):**
- Long-form memo editing
- Complex pipeline management
- Detailed configuration

**Design considerations:**
- Large touch targets
- Swipe gestures for common actions
- Works well one-handed
- Offline support for viewing recent data

#### 8.5.3 Appearance Settings

- **Light mode** (default): Clean, professional appearance
- **Dark mode**: For users who prefer it
- **System preference**: Automatically match device settings

### 8.6 AI Personality & Customization

The AI should feel like a real teammate, with personality that can be configured.

#### 8.6.1 Personality Options

Funds can choose the AI's communication style:

- **Warm & approachable**: Friendly, uses casual language, feels like a helpful colleague
  - "Hey! I just finished analyzing the ACME deck. Looks interesting—they've got solid traction. Want me to walk you through it?"

- **Sharp & efficient**: Direct, concise, no fluff—like a high-performing analyst
  - "ACME deck analyzed. Fit score: 78. Key highlights: $500K MRR, 15% MoM growth, B2B SaaS. Ready for call prep?"

- **Balanced professional**: Middle ground—professional but not cold
  - "I've completed the analysis of the ACME deck. The fit score is 78/100. Shall I prepare a call prep document?"

#### 8.6.2 Customization Scope

- **Fund-level default**: Set the default personality for the whole fund
- **User-level override**: Individual users can adjust for their preference
- **Context-aware**: AI may adjust tone based on context (more formal in founder-facing emails)

#### 8.6.3 AI Name & Identity

- The AI has a name (TBD) and consistent identity
- Introduces itself during onboarding with personality
- Maintains consistent voice across all interactions

### 8.7 Key Screens & Views

While the AI-led paradigm is primary, structured workspaces are essential for complex tasks.

#### 8.7.1 Conversation Home

- AI greeting with context (new updates, pending items, suggested actions)
- Recent conversation history
- Quick action buttons for common tasks
- Voice input prominently available

#### 8.7.2 Deal Workspace

When the AI surfaces a deal, users see:

- **Header**: Company name, logo, fit score, current stage, owner
- **Overview tab**: Key metrics, thesis fit rationale, AI summary
- **Timeline tab**: Chronological activity (calls, emails, notes, AI actions)
- **Documents tab**: Deck, memos, transcripts, data room files
- **AI panel**: Contextual to this deal—"Ask me anything about ACME"

#### 8.7.3 Deal List / Pipeline

- Filterable, sortable list of deals
- Key columns: Company, stage, fit score, owner, last activity
- Quick actions: Change stage, assign owner, archive
- AI-powered search: "Show me Series A deals in fintech with fit score > 70"

#### 8.7.4 Memo Editor

- Template-structured content with AI pre-fill
- Section-by-section editing with inline AI suggestions
- Clear attribution (AI vs human content)
- Citation panel showing sources for AI claims
- Version history with diff view

#### 8.7.5 Call/Transcript View

- Full transcript with speaker labels and timestamps
- AI summary panel (collapsible)
- Highlight & annotate functionality
- Quick correction controls ("This metric is wrong—correct to X")
- Jump-to-timestamp from any AI citation

#### 8.7.6 Settings & Configuration

- Fund settings: Thesis config, workflow stages, templates, automation rules
- User settings: Notification preferences, appearance, AI personality
- Integration settings: Connected apps, sync status
- Admin settings: User management, permissions, audit logs

### 8.8 Interaction Patterns

#### 8.8.1 Command Bar

`Cmd+K` / `Ctrl+K` opens a universal command bar:

- **Natural language**: "Show me deals from last week" or "Draft a memo for ACME"
- **Structured commands**: "deal:ACME" or "new:memo"
- **Recent items**: Quick access to recently viewed deals, memos, etc.
- **Actions**: "Add deal," "Generate call prep," "Search transcripts for..."

#### 8.8.2 Explicit Confirmation for High-Risk Actions

AI suggests; user confirms for critical actions:

- Changing deal stage
- Sending external communications
- Deleting or archiving deals
- Publishing memos

Low-risk actions (generating drafts, internal notes) can proceed without confirmation.

#### 8.8.3 Inline Corrections

When AI gets something wrong:

- Click on any AI-generated content to correct it
- "This is wrong—MRR is actually $400K, not $500K"
- Correction propagates to structured data and is logged
- AI learns from corrections (feeds into improvement)

#### 8.8.4 Contextual Actions

AI actions appear where they're relevant:

- On a transcript: "Summarize," "Extract metrics," "Add to deal notes"
- On a deal: "Generate memo," "Prepare for call," "Contact founder"
- On a memo: "Regenerate section," "Add more detail," "Check facts"

### 8.9 Collaboration Features

Fund workflows involve heavy collaboration. The platform supports team communication on deals and artifacts:

#### 8.9.1 Inline Comments

- Comment on any artifact: memos, summaries, deal records, call notes
- Comments are threaded for focused discussions
- Clear visual distinction between AI-generated content and human comments
- @mentions to notify team members: "@sarah what do you think about the team?"

#### 8.9.2 Resolution Tracking

- Comments can be marked as: Open, Addressed, Dismissed
- Tracks who resolved and when
- Useful for IC prep: "All comments addressed before IC meeting"

#### 8.9.3 Activity Feed

- Each deal has a chronological feed of all activity
- AI actions, human edits, comments, stage changes
- Filterable by type (AI activity, human activity, comments only)
- Fund-level feed for overall activity visibility

### 8.10 Notifications & Alerts

#### 8.10.1 Notification Types

- **AI updates**: "I've finished analyzing the ACME deck"
- **Deal activity**: Stage changes, new documents, comments
- **Mentions**: "@you" in comments or discussions
- **Reminders**: Stale deals, pending follow-ups
- **Founder responses**: Replies to AI outreach

#### 8.10.2 Delivery Preferences

Users configure per-notification-type:

- **In-app**: Always visible in notification center
- **Push (mobile)**: For urgent or important items
- **Email digest**: Daily or weekly summary
- **Real-time vs batched**: Some users want immediate; others prefer consolidated

#### 8.10.3 Smart Prioritization

AI helps prioritize notifications:

- High-fit deals get higher priority
- Stale deals surface appropriately
- Learns from user behavior (what they click on, what they ignore)

---

## 9. Data Model & System of Record

### 9.1 Key entities (Phase I)

At minimum:

- **Fund**
- **User**
- **Company**
- **Deal**
- **Call / Meeting**
- **Transcript**
- **Memo**
- **ThesisConfig**
- **Feedback**
- **IntegrationConnection** (for external tools)
- **DealSource** (for provenance tracking)
- **Comment** (for collaboration)

Each entity should have a clear set of core fields for Phase I; extended fields can be added as needed with care to avoid schema churn.

### 9.2 System of record

- The app is the **canonical system of record** for:
  - Deals and their lifecycle stages.
  - Call summaries and memos.
  - AI-generated artifacts and feedback.
- External CRMs (Affinity, HubSpot, Salesforce, etc.) are **connected mirrors**:
  - Key fields are synced out and optionally synced back.
  - CRMs are not the source of truth for deal structure or AI artifacts.

**This is non-negotiable.** The platform's value depends on being the authoritative source for deal data. Funds that want to continue using their CRM as the primary system can sync bidirectionally, but AI artifacts and structured deal data live here.

### 9.3 Deal Provenance & Attribution

VCs care deeply about where deals come from. Every deal must track its origin:

**Required fields:**
- **Source type:** Inbound, referral, outbound, event, portfolio intro, etc.
- **Referrer:** Who made the introduction (person, firm, or source)
- **Intro path:** The chain of introductions if applicable
- **Original submitter:** Who first added this deal to the system
- **Submission date:** When the deal first entered the pipeline

**Analytics enabled:**
- Conversion rate by source (which referrers send the best deals?)
- Referrer quality scoring over time
- Partner sourcing effectiveness
- Source-to-close analysis

### 9.4 Conflict Resolution

When contradictory information is detected, the system must surface and resolve it:

**Types of conflicts:**
- **Deck vs call:** Deck says $500K MRR, founder said $400K on call
- **Multiple sources:** Two partners have conflicting notes on the same deal
- **AI vs human:** AI extracted a metric that doesn't match manual entry
- **App vs CRM:** Stage mismatch between systems

**Resolution flow:**
1. Surface the discrepancy to the user with both values and their sources.
2. User selects the authoritative value.
3. Decision propagates to all dependent fields and artifacts.
4. Resolution is logged for audit (who, when, what was chosen, why if provided).

**Proactive detection:**
- AI flags potential conflicts when processing new information.
- Dashboard shows unresolved conflicts across the fund's deals.

### 9.5 Sync & Integration Principles

- Define explicit rules for each integrated field:
  - "App wins" vs "CRM wins" vs "last-write wins".
- Surface **discrepancies** (e.g., stage mismatch) to users with suggested resolution.
- Log all changes originating from integrations for debugging and auditability.
- **Graceful degradation:** If sync fails, continue operating and alert users.

---

## 10. Integrations (Phase I)

### 10.1 Integration philosophy

- Start with a **minimum viable integration set** driven by design partner needs.
- Optimize for **depth over breadth**: one CRM done well is better than three partial ones.
- Prefer **official APIs** and avoid brittle scraping or unsupported flows.

### 10.2 Target integration types

- **Calendar**
  - Use: map meetings to deals, pre-attach call prep.
  - Phase I: optional; manual mapping acceptable if calendar integration slips.

- **Email**
  - Use: intake (forwarded decks, intros), founder-facing beta emails.
  - Phase I: support forwarding to a unique address; full send-on-behalf can be limited/beta.

- **CRM**
  - Use: reflect key deal fields and notes; keep external system somewhat aligned.
  - Phase I: select **one CRM** for deep integration; support basic export/import for others.

- **Call / Transcription provider**
  - Use: ingest call transcripts and recordings.
  - Phase I: support at least one primary path (e.g., integrated transcript provider or manual upload).

### 10.3 Built-in Note-Taker

Rather than requiring funds to use separate note-taking tools and then import transcripts, we provide integrated call recording and transcription:

**Capabilities:**
- Join video calls (Zoom, Google Meet, Teams) as a participant
- Record audio and generate transcripts automatically
- Transcripts flow directly into the deal workspace

**Implementation:**
- Built via API integration with existing transcription services (not built from scratch)
- Appears as "[Fund Name] AI" or similar in the call participant list

**Modes:**
- **Human-led calls (passive):** AI joins silently, records, transcribes, and summarizes. Does not speak.
- **AI-led calls (active):** For founder info-gathering calls, AI conducts the conversation (see Section 7.5).
- **Internal meetings:** Can join IC meetings, deal reviews, etc. where permitted—captures discussion for learning and decision logging.

**Consent:**
- Clear notification that the call is being recorded
- Founders/participants can request the AI not join

**Phase I scope:**
- Focus on one or two video platforms (likely Zoom + Google Meet)
- Manual upload remains available as fallback

### 10.4 Integration reliability requirements

- Graceful degradation:
  - If an integration fails, the app should fail **soft** (e.g., show a warning, allow manual upload).
- Clear status:
  - Show integration connection status and last sync time.

---

## 11. Trust, Privacy & Permissions

### 11.1 Data boundaries

- Each fund’s data is **logically isolated**; no cross-fund training or sharing by default.
- Founder data is used solely to:
  - Serve the fund(s) involved in the relationship.
  - Improve that fund’s experience within agreed contractual bounds.

### 11.2 Roles & visibility

- Fund-level defaults:
  - Partners see all deals by default.
  - Associates see most deals, with ability to restrict specific deals.
- Deal-level overrides:
  - Support marking deals as “restricted” or “stealth” with limited visibility.

### 11.3 Auditability

- Log:
  - Who triggered each AI action (user, fund).
  - When it ran.
  - What key inputs it used (e.g., transcript, deck, memo).
- Provide an admin-friendly way to **review logs** for critical workflows (founder-facing AI, memo drafts).

### 11.4 Founder-facing transparency & consent

- The AI must:
  - Clearly introduce itself as an AI assistant.
  - Explain what it will do with the information.
  - Offer clear opt-out and fallback to human communication.
- All founder-facing conversations should be **reviewable** by fund users.

---

## 12. Compliance & Data Governance

Given the sensitivity of VC deal data and founder information, compliance is a core product requirement, not an afterthought.

### 12.1 SOC 2 Type II Compliance

SOC 2 Type II certification is required before production launch with paying customers:

- **Security:** Access controls, encryption at rest and in transit, secure authentication
- **Availability:** System uptime commitments, disaster recovery procedures
- **Processing Integrity:** Data processing accuracy and completeness
- **Confidentiality:** Protection of confidential information
- **Privacy:** Personal information handling per privacy commitments

### 12.2 Data Isolation

Strict fund-level data isolation is enforced:

- **Logical separation:** Each fund's data is completely isolated; no cross-fund queries or access
- **Separate workspaces:** Each fund operates in its own workspace
- **Separate credentials:** Users with access to multiple funds must use separate logins for each (Phase I)
- **No cross-fund training:** AI models are not trained on one fund's data to benefit another

### 12.3 Data Portability & Export

Funds own their data and can export it at any time:

- **Full export:** Complete data export available on request (deals, memos, transcripts, notes, all artifacts)
- **Standard formats:** Export in standard formats (CSV, JSON, PDF for documents)
- **Churn export:** If a fund leaves, they receive a complete data package
- **No lock-in:** Data structure is documented; migration to other systems is feasible

### 12.4 Data Residency

Some funds may have data residency requirements:

- **Default:** Data stored in US-based infrastructure
- **Regional options:** EU data residency available for funds requiring it (Phase I or early V2)
- **Documentation:** Clear documentation of where data is stored and processed

### 12.5 Audit Logging

All significant actions are logged for compliance and debugging:

- **AI actions:** Every AI generation, recommendation, and action is logged with inputs and outputs
- **User actions:** Significant user actions (stage changes, approvals, data modifications) are logged
- **Access logs:** Who accessed what data and when
- **Retention:** Logs retained per compliance requirements (minimum 1 year)

### 12.6 Founder Data Handling

Special care for founder-provided information:

- **Purpose limitation:** Founder data used only to serve the fund-founder relationship
- **Transparency:** Founders informed about how their data is used
- **Deletion requests:** Process for handling founder data deletion requests

---

## 13. Onboarding Model

Onboarding a new fund is like hiring a new team member—it takes time for the AI to understand the fund's unique way of operating.

### 13.1 Philosophy

- **1-2 week onboarding period:** Sufficient time to configure the platform properly, not a "sign up and start" experience
- **Guided process:** Dedicated onboarding support for design partners; self-serve with documentation for scale
- **Learning period:** The AI improves significantly in the first few weeks as it ingests data and receives feedback

### 13.2 Onboarding Steps

1. **Workspace setup & user invites**
   - Create fund workspace
   - Invite team members with appropriate roles
   - Configure authentication (SSO if required)

2. **Thesis configuration**
   - Guided wizard to capture thesis criteria
   - Stage, geography, check size, sectors, no-gos
   - Soft preferences and weighting

3. **Workflow & pipeline configuration**
   - Define deal stages (or accept defaults)
   - Set stage requirements and transition rules
   - Configure automation rules

4. **Memo & template setup**
   - Customize memo template sections and order
   - Set tone/style preferences
   - Upload example memos for reference

5. **Integration connections**
   - Connect CRM (if applicable)
   - Connect calendar
   - Set up email forwarding address
   - Configure note-taker access

6. **Historical deal import**
   - Import existing deals from spreadsheets, Notion, Affinity, or other sources
   - Best-effort AI analysis backfill on historical decks
   - Mark incomplete fields as "not available"

7. **Knowledge base ingestion**
   - Upload thesis decks and investment criteria documents
   - Upload past IC memos and "why we passed" docs
   - Upload sector notes and research

8. **Team training & orientation**
   - Walkthrough of key workflows
   - Best practices for working with the AI
   - Feedback mechanisms and how to improve AI performance

### 13.3 Handling Funds Without Defined Processes

For funds that don't have established workflows:

- Provide **opinionated defaults** based on common VC practices
- Standard deal stages: Inbound → First Look → First Call → Deep Dive → Pre-IC → IC → Due Diligence → Term Sheet → Closed/Passed
- Standard memo template with typical sections
- Default automation rules for common scenarios
- Encourage customization over time as they learn what works

### 13.4 Success Criteria for Onboarding

Onboarding is complete when:

- [ ] All team members have accounts and understand basic workflows
- [ ] Thesis config is captured and validated
- [ ] At least one integration is connected (CRM or calendar)
- [ ] Historical deals are imported (if available)
- [ ] Knowledge base has core documents ingested
- [ ] Team has successfully processed at least 3-5 deals through the system

---

## 14. Operational Requirements

### 14.1 Performance

- Call summary generation:
  - Target: summary available within **X minutes** after transcript is available.
- Memo drafting:
  - Target: initial memo draft within **Y seconds** of user request, for typical deal sizes.
- Ask-the-Analyst:
  - Target: responses within **a few seconds** for most queries.

Exact X/Y values to be refined, but performance should feel comfortably “real-time” for daily usage.

### 14.2 Reliability & failure modes

- If an AI generation fails:
  - Show a clear error and allow retry.
  - Never silently drop tasks.
- If an integration fails:
  - Notify users in-app.
  - Allow manual fallback (upload transcript, paste emails, etc.).

### 14.3 Human override

- Users (at least associates and partners) can:
  - Undo AI-suggested updates to critical fields (stage, key metrics).
  - Disable or pause founder-facing AI for a fund or specific deals.
  - Mark certain artifacts as “final” to prevent AI overwriting them without explicit consent.

---

## 15. Rollout & Open Questions

### 15.1 Design partner rollout

- Start with **2–5 design partner funds** that:
  - Have clear pain around analyst time and pipeline hygiene.
  - Are willing to co-design workflows and tolerate early-stage edges.
- Run a **structured beta**:
  - Initial onboarding and data ingestion.
  - Regular check-ins on workflows and metrics.
  - Feedback loop to refine product and prompts.

### 15.2 Feature flags

- Founder-facing AI (email + calls) behind:
  - Fund-level and deal-level flags.
  - Separate logging for monitoring.
- Decision-learning features (if any experimentation occurs) behind:
  - Internal-only flags initially.

### 15.3 Open questions / to-be-decided

- Which **CRM** to integrate deeply with first?
- Which **transcription path** is most practical for Phase I (native vs partner)?
- How strongly do early funds care about **calendar integration** vs manual mapping?
- What is the minimum viable **mobile experience** (responsive web vs dedicated app)?
- Are there **regulatory or data residency** constraints for any initial design partner?
- What should the AI's **name** be?

These questions should be resolved before finalizing the implementation plan and timelines for Phase I.

