Here’s a full PRD-style document you can share directly with your team (Notion / GDocs / Confluence friendly). I’ll write it assuming **zero prior context**.

---

# AI Analyst / AI Associate for VC

## Product Requirements – Concept & Job Map

**Document owner:** Sahil
**Version:** v0.1
**Audience:** Product, Engineering, Design, Sales, Customer Success

---

## 1. Background & Motivation

Most VC funds still operate on a very **manual, human-intensive process**:

* Analysts and associates are buried in **decks, calls, and spreadsheets**.
* Partners make decisions based on **fragmented information**, scattered across email, Slack, Notion, and their heads.
* There is a huge amount of **repeatable, pattern-based work** that *does not* require purely human judgment but still consumes most of their time.

At the same time:

* There is a wave of point solutions (deck parsers, memo generators, CRMs with AI features), but
* Very few products behave like a **true “AI associate”** that:

  * knows the fund’s **thesis & preferences**,
  * understands the **context across deals**,
  * learns from **partner feedback**, and
  * is accessible via the channels the team already uses (Slack, email, WhatsApp, app).

### Our opportunity

We want to build an **AI Analyst / AI Associate** that:

> Feels like a real junior team member sitting in the middle of a VC fund’s workflows, handling 60–80% of the analyst/associate work, while humans focus on judgment, relationships, and final decisions.

This doc explains:

1. **What** we want to build (product concept).
2. **For whom** (personas).
3. **How it works end-to-end** (job map, by stage).
4. **What’s in MVP vs V2 vs V2+** (phasing / scope).

---

## 2. Product Vision

### 2.1 One-line vision

> **“An AI Analyst that sits inside a VC fund, automates the repetitive work of analysts/associates, and learns the fund’s unique thesis, style, and decision patterns over time.”**

### 2.2 What “AI Analyst” means in practice

The AI Analyst should:

* **Ingest** everything relevant to a deal:

  * Decks, emails, financials, call transcripts, internal notes.
* **Organize** it into a coherent **deal workspace**.
* **Prepare**:

  * Fit scoring vs thesis, call prep, research, and first-draft memos.
* **Summarize & update**:

  * Every call, change in metrics, and decision.
* **Communicate**:

  * With **internal users** via app, Slack, email, WhatsApp & voice.
  * With **founders** (carefully) to gather missing information.
* **Learn**:

  * From fund documents (thesis, IC memos, past passes) and
  * From ongoing partner feedback & decisions.

---

## 3. Target Users & Personas

### 3.1 Internal users

1. **Analyst / Associate (Primary user)**

   * Day-to-day heavy user.
   * Wants to save time on admin and grunt work, but maintain control over quality.
   * Uses the AI Analyst to:

     * Capture & triage deals.
     * Prepare calls and follow up.
     * Draft memos and updates.

2. **Partner / Principal**

   * Senior decision maker.
   * Time-poor, context-switching across many deals.
   * Uses the AI Analyst to:

     * Get quick summaries on deals.
     * Read or tweak memos, not write from scratch.
     * Ask questions on mobile (Slack, WhatsApp, in-app voice).
     * Ensure team is not missing key deals.

3. **Platform / Operations / IR (later phase)**

   * Focus on portfolio performance, founder support, LP relationships.
   * Uses the AI Analyst to:

     * Monitor portfolio developments.
     * Draft LP updates and internal reports.

### 3.2 External user

4. **Founder (Phase 2+)**

   * Interacts with the AI Analyst in early funnel.
   * Provides additional information via AI-led email Q&A and short calls.
   * Expects transparency (“you’re talking to an AI assistant”) and clarity.

---

## 4. High-level User Journey

At a high level, for a single deal:

1. **Deal appears** (deck via intro, inbound form, or outbound).
2. **AI Analyst**:

   * Creates a **deal record**,
   * Parses the deck,
   * Scores the fit vs thesis.
3. If worth exploring:

   * AI enriches context,
   * Prepares a **call prep doc** for the first call.
4. After calls:

   * AI summarizes transcripts,
   * Updates the deal workspace & CRM,
   * Suggests follow-ups.
5. As conviction builds:

   * AI drafts **IC memos** based on fund templates,
   * Maintains a **risk & open questions list**.
6. At decision:

   * Outcome + rationale is captured,
   * AI learns from decisions over time (later phase).
7. Throughout:

   * Fund communicates with AI via **in-app chat & voice, Slack, email, WhatsApp**.
   * AI uses the fund’s **own thesis docs and prior memos** as context.

---

## 5. Product Phasing (MVP / V2 / V2+)

We are not trying to build “everything” on day one.

**Phase legend:**

* **MVP** – first version that actually feels like a real AI associate and delivers clear value.
* **V2** – deepen workflows + channels once core is stable.
* **V2+** – advanced / data-heavy / portfolio & fund-level features.

### 5.1 MVP – Core loop

MVP should cover:

* Deal capture & deck parsing.
* Fit scoring vs thesis.
* Light enrichment & call prep.
* Call summarization & CRM updates.
* Drafting investment memos.
* Decision logging.
* In-app chat/voice with the AI.
* Basic knowledge ingestion & thesis configuration.
* Simple feedback (“thumbs up/down”) on outputs.

### 5.2 V2 – Deepen workflows

V2 focuses on:

* Email & Slack interfaces.
* Founder-facing AI for info gathering (email + short calls).
* Richer research, risk register, IC packs.
* Calendar linking, follow-up drafting.
* Personalized behavior per partner.
* Better usage of internal knowledge in context.

### 5.3 V2+ – Extended analyst / firm capabilities

V2+ extends to:

* WhatsApp interface.
* Portco monitoring & LP updates.
* Outbound sourcing, reference checks, valuation snapshots, cap table scenarios.
* Term sheet comparison, DD checklist tracking.
* Fund-level analytics (pipeline health, exposure, etc.).
* Deeper “learning from outcomes” tuning of scoring.

---

## 6. Detailed Job Map (by Stage)

Below is the **job map**: everything the AI Analyst is responsible for, grouped by stage, with **phase labels**.

---

### Stage 1 – Deal Capture & Triage

**Goal:** Make sure every relevant opportunity enters the system, is structured, and gets a first-pass assessment.

1. **Capture new deals from all channels** – **MVP**

   * Inputs: inbound emails, intros, submissions, spreadsheets.
   * Output: canonical **Deal record** (company, URL, referrer, stage, sector, geo, amount).
   * Behavior:

     * Auto-detect new deals (via email addresses, subject lines, forms).
     * Create/merge deal records and avoid duplicates.

2. **Deck & doc parsing** – **MVP**

   * Inputs: pitch decks, one-pagers, basic financials.
   * Output: structured schema: problem, solution, product, business model, traction, funding history, team, timeline, key metrics (if available).
   * Behavior:

     * Parse PDF/PPT/links, map content into fields.
     * Provide slide/page citations for each extracted element.

3. **Fit scoring vs thesis** – **MVP**

   * Inputs: structured deal data + ThesisConfig.
   * Output: 0–100 fit score, plain-language rationale, suggested action: ignore / track / meet / deep-dive.
   * Behavior:

     * Apply hard constraints (stage, geo, cheque size).
     * Integrate soft preferences (e.g., sector appetite).
     * Provide transparent explanation.

4. **Prioritization & queues** – **V2**

   * Inputs: all open deals, scores, age.
   * Output: prioritized pipeline per user (e.g. “Top 10 to review today”).
   * Behavior:

     * Maintain dynamic queues and surface key deals.

---

### Stage 2 – Pre-Call Research & Preparation

**Goal:** Make every founder call well prepared with context and clear questions.

5. **Deal enrichment & context building (light)** – **MVP**

   * Inputs: company domain, LinkedIn, public data (funding, founders, competitors).
   * Output: short enrichment: team, last known funding, 2–3 likely competitors, quick market note.
   * Behavior:

     * Run enrichment when call is booked or on-demand.

6. **Auto call-prep doc** – **MVP**

   * Inputs: enriched profile, thesis config, prior internal notes.
   * Output: 1–2 page call prep doc:

     * Who they are, what they do.
     * Our hypothesis/thesis fit.
     * Key questions & concerns.
     * Suggested agenda.
   * Behavior:

     * Auto-generate a call prep per founder call.
     * Make it easy to adjust/append by analyst.

7. **Calendar & event linking** – **V2**

   * Inputs: calendar events, invitees, descriptions.
   * Output: mapping between calls and deals; prep docs attached.
   * Behavior:

     * Detect which deal a meeting is about based on title, participants, emails.

---

### Stage 3 – Call Handling & Post-Call Work

**Goal:** Keep every call captured, summarized, and reflected in the deal system with minimal human effort.

8. **Call transcript digestion & summary** – **MVP**

   * Inputs: call recording/transcript, deal context, prep doc.
   * Output: call summary with sections:

     * What we learned
     * Metrics shared
     * Risks & concerns
     * Next steps
   * Behavior:

     * Automatically summarize recorded calls.
     * Link summary to transcript (timestamps).

9. **Auto-update deal & CRM** – **MVP**

   * Inputs: call summary + existing data.
   * Output: updated deal workspace & CRM fields (stage, key metrics, notes, tasks).
   * Behavior:

     * Extract structured updates from the summary.
     * Write back into the system-of-record.

10. **Suggested follow-ups & drafts** – **V2**

* Inputs: call summary, open questions, tone guidelines.
* Output: draft follow-up email + bullet list of what to ask/share.
* Behavior:

  * Generate a ready-to-edit email aligned with fund style.

---

### Stage 4 – Deep Research, Numbers & Memos

**Goal:** Turn raw information into investor-grade analysis with minimal manual effort.

11. **Market & competitor research** – **V2**

* Inputs: company description, sector keywords, geo.
* Output: brief research pack: market structure, TAM/SAM ballpark, competitor table, recent trends.
* Behavior:

  * Pull structured insights with citations.

12. **Financial extraction & sanity checks** – **V2**

* Inputs: financial slides/models, tables.
* Output: standardized metrics (MRR, growth, churn, CAC/LTV, margins, runway) + inconsistencies/missing data.
* Behavior:

  * Extract numeric tables, compute metrics, highlight anomalies.

13. **Draft investment memo** – **MVP**

* Inputs: deck, summaries, research, transcripts, thesis.
* Output: first-draft investment / IC memo in the fund’s format (sections, bullets, citations).
* Behavior:

  * Use the fund’s existing memo template.
  * Generate a strong v1 for analysts to refine.

14. **Risk register & open questions** – **V2**

* Inputs: memos, calls, checklists.
* Output: structured list of risks + open questions + pending diligence items per deal.
* Behavior:

  * Maintain and update a living risk & questions list.

---

### Stage 5 – IC Support, Decisions & Learning

**Goal:** Support IC discussions and learn from decisions.

15. **IC meeting pack** – **V2**

* Inputs: memo, metrics, history, risk register.
* Output: condensed IC pack: memo + key points + scenarios.
* Behavior:

  * Automatically assemble one IC-ready bundle.

16. **Log decisions & rationale** – **MVP**

* Inputs: decision (pass / invest / follow-up), partner notes.
* Output: structured log attached to each deal: outcome, tags (reason categories), free-text explanation.
* Behavior:

  * Provide a quick UI or prompt to capture rationale.

17. **Learn from decisions (scoring evolution)** – **V2+**

* Inputs: decisions + deal features + historical scores.
* Output: improved triage model + pattern insights; meta-knowledge like “we passed most X because Y”.
* Behavior:

  * Continuously refine scoring, while exposing reasoning and letting partners override.

---

### Stage 6 – Founder-facing AI Agent

**Goal:** Offload early-stage information gathering to an AI agent, while keeping humans for relationship & judgment.

20. **AI info-gathering call** – **V2**

* Inputs: deal record, info gaps, founder consent.
* Output: AI-run short interview; transcript; structured answers; updated metrics; unresolved questions.
* Behavior:

  * Introduce itself clearly as AI.
  * Ask structured questions to fill missing fields (metrics, customer breakdown, GTM, etc.).

21. **AI email Q&A with founders** – **V2**

* Inputs: info gaps + founder email.
* Output: email thread where AI asks specific questions; extracted answers into the deal record.
* Behavior:

  * Ask targeted questions.
  * Parse replies and update fields.

22. **Routing & escalation to humans** – **V2**

* Inputs: conversation context + escalation rules (e.g., terms, valuation, sensitive topics).
* Output: notification & summary to human; polite handover message to founder.
* Behavior:

  * Detect “human-only” topics and stop; escalate with context.

---

### Stage 7 – Fund ↔ AI Communication Channels

**Goal:** Let team members talk to the AI Analyst where they already are.

23. **In-app “Ask the Analyst” (chat + voice)** – **MVP**

* Inputs: text or voice queries inside our app.
* Output: answers, summaries, drafts, actions (with links & citations).
* Behavior examples:

  * “Summarize our last 2 calls with ACME.”
  * “Draft 3 bullets for IC about risks.”

24. **Email interface (forward/BCC)** – **V2**

* Inputs: emails forwarded or BCC’d to AI (e.g. [analyst@fund.ai](mailto:analyst@fund.ai)).
* Output: thread summaries, suggested actions; emails attached to correct deals.
* Behavior:

  * On forward: summarize and suggest next steps.
  * On BCC: auto-log email in deal history.

25. **Slack interface** – **V2**

* Inputs: Slack messages, attachments, slash commands.
* Output: thread replies, summaries, new/updated deals, channel digests.
* Behavior examples:

  * `/analyst summary` in a thread → summary + links.
  * Auto-suggest creating a deal when a new company is discussed.

26. **WhatsApp interface (text + voice notes)** – **V2+**

* Inputs: messages & voice notes from verified phones.
* Output: concise responses, triggered actions, all logged centrally.
* Behavior examples:

  * Partner voice note: “What’s the latest on ACME?” → short answer + link to memo.

---

### Stage 8 – Fund Knowledge & Thesis Ingestion

**Goal:** Give the AI Analyst the fund’s “brain” – thesis, historical memos, and learnings.

27. **Bulk ingestion of fund knowledge** – **MVP**

* Inputs: thesis decks, IC memos, “why we passed” docs, sector notes, LP decks from Drive/Notion/etc.
* Output: indexed knowledge base with doc types and metadata.
* Behavior:

  * Ingest selected folders.
  * Classify content (thesis, memo, learning, template).

28. **Thesis configuration & constraints** – **MVP**

* Inputs: structured mandate (stage, cheque size, geo, sectors, no-gos, preferences).
* Output: machine-readable **ThesisConfig** used across the system (for scoring, routing, questions).
* Behavior:

  * Easy UI for partners to set & update thesis; propagate everywhere.

29. **Surface internal knowledge in context** – **V2**

* Inputs: current task (e.g., drafting memo for ACME SaaS) + knowledge base.
* Output: suggestions of relevant internal docs (similar deals, thesis sections, past passes), with short summaries.
* Behavior:

  * E.g., while writing a memo:

    * “You passed on NovaSaaS for XYZ reason; this is similar.”

---

### Stage 9 – Feedback & Learning from Partners

**Goal:** Let the AI improve like a human junior would, based on feedback from seniors.

30. **Inline feedback on AI outputs** – **MVP**

* Inputs: any AI-generated artifact + simple feedback (👍/👎, tags).
* Output: feedback log; optional auto-regeneration with feedback applied.
* Behavior:

  * Lightweight buttons: “too optimistic”, “too shallow”, “missed key risk” etc.

31. **Partner-specific style & preferences** – **V2**

* Inputs: partner-specific edits & feedback over time.
* Output: per-partner style profile (tone, structure, what they care about).
* Behavior:

  * Tailor outputs depending on who it’s for:

    * Some want bullets & numbers.
    * Others want more narrative & risks highlighted first.

32. **Deeper learning from decisions** – **V2+**

* Inputs: decision logs & reasons, deal features, historical scores.
* Output: improved triage patterns & insights (“we over-indexed on X”, etc.).
* Behavior:

  * Periodic re-evaluation of scoring.
  * Transparent explanation of changes and ability to override.

---

### Stage 10 – Portfolio & LP (Future Scope)

**Goal (later):** Extend AI Analyst to post-investment work and fund reporting.

18. **Portco monitoring & alerts** – **V2+**
19. **LP update drafting** – **V2+**

These are important but **not required** for the first product to feel like a true analyst/associate.

---

## 7. Non-Goals (for MVP)

To avoid scope creep, MVP will **not**:

* Build a full-blown **valuation or financial modelling engine** (detailed DCFs, complex cap tables).
* Replace lawyers or do **full legal doc analysis & negotiation**.
* Own **outbound sourcing** (lists, personalized outreach) in v1 – that’s a future extension.
* Serve as a general-purpose RAG for anything; it is **fund & deal-focused**.

---

## 8. Summary

We are building:

* A **fund-specific AI Analyst**, not just a deck parser or memo generator.
* It will:

  * Ingest all relevant deal info,
  * Support analysts & partners at every step from intake to IC,
  * Communicate across channels (app, Slack, email, WhatsApp),
  * Use the fund’s thesis & historical knowledge as context,
  * Learn from ongoing feedback and decisions.

**MVP** focuses on the critical loop:

> **Deal capture → deck parsing → fit scoring → enrichment & call prep → call summary & CRM update → memo drafting → decision logging → feedback on outputs → all accessible via in-app assistant.**

**V2 and V2+** deepen this into founder-facing automation, multi-channel interfaces, portfolio & fund analytics, and richer learning from decisions.
