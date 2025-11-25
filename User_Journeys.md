# User Journeys: AI Analyst/Associate for VC

**Document owner:** Sahil
**Version:** v0.1
**Related documents:** AI_Associate_Full_PRD.md

---

## Table of Contents

1. [Day-in-the-Life Journeys](#1-day-in-the-life-journeys)
   - 1.1 Analyst/Associate Day-in-the-Life
   - 1.2 Partner Day-in-the-Life
2. [Deal Lifecycle Journey](#2-deal-lifecycle-journey)
   - 2.1 Investment Path
   - 2.2 Pass Path
3. [Task-Based Workflows](#3-task-based-workflows)
   - 3.1 Deck → Deal Record + Fit Score
   - 3.2 Call → Summary + Workspace Update
   - 3.3 Deal → Memo Draft
   - 3.4 Founder Info Gathering
   - 3.5 IC Meeting Support
4. [Founder Journeys](#4-founder-journeys)
   - 4.1 Receiving AI Email
   - 4.2 AI-Led Call
   - 4.3 Website Embed Interaction
5. [Onboarding Journeys](#5-onboarding-journeys)
   - 5.1 Fund Onboarding (Week 1-2)
   - 5.2 Individual User Onboarding
6. [Steady-State Journeys](#6-steady-state-journeys)
   - 6.1 Analyst Steady-State
   - 6.2 Partner Steady-State
7. [Error & Edge Case Journeys](#7-error--edge-case-journeys)
   - 7.1 AI Error → Correction Flow
   - 7.2 Founder Declines AI
   - 7.3 Integration Failure
   - 7.4 Conflicting Information
   - 7.5 Sensitive Topic Escalation

---

## 1. Day-in-the-Life Journeys

### 1.1 Analyst/Associate Day-in-the-Life

#### Narrative Overview

The analyst arrives at work—or opens their laptop from home—and immediately opens the AI Analyst app. Rather than facing a wall of unread emails and scattered notes, the analyst is greeted by the AI with a contextual briefing: overnight activity, new inbound deals, upcoming calls, and items requiring attention. The AI has already done the morning triage, surfacing what matters most.

Throughout the day, the analyst moves fluidly between processing new inbound deals, preparing for founder calls, conducting those calls with the AI silently recording, and handling post-call work. Tasks that once consumed hours—parsing decks, writing call summaries, updating the CRM, drafting memos—now happen largely automatically. The analyst's role shifts from data entry and document creation to quality control, relationship building, and strategic thinking.

By end of day, the analyst reviews pipeline health with the AI, flags deals for partner attention, and ensures nothing has fallen through the cracks. The AI proactively reminds them of stale deals and pending follow-ups, functioning like a diligent colleague who never forgets.

#### Step-by-Step Flow

**Morning (8:00 AM - 10:00 AM)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Analyst | Opens the app | AI greets with morning briefing |
| 2 | AI | Presents overnight summary | "Good morning, Sarah. 4 new decks came in overnight. I've created deal records and scored them. Two look promising—TechCo (fit: 82) and HealthAI (fit: 76). You also have a call with Acme at 2pm—want me to prep?" |
| 3 | Analyst | "Yes, prep for Acme. Show me TechCo first." | AI opens TechCo deal workspace |
| 4 | AI | Displays deal with parsed deck, fit score, enrichment | Shows company overview, team backgrounds, competitor landscape, thesis alignment rationale |
| 5 | Analyst | Reviews AI analysis, makes minor corrections | AI logs corrections for learning |
| 6 | Analyst | "This looks good. Schedule a first call." | AI drafts calendar invite, suggests times based on founder's timezone |
| 7 | Analyst | Approves invite | AI sends calendar invitation |
| 8 | Analyst | "What else needs attention?" | AI shows prioritized task list: 2 pending founder responses, 1 stale deal, call prep for 2pm |

**Midday (10:00 AM - 2:00 PM)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 9 | Analyst | Processes remaining new inbound | AI has pre-created records; analyst reviews and triages |
| 10 | Analyst | "Send a pass email to LowFit Corp" | AI drafts decline email using fund template |
| 11 | Analyst | Reviews and approves | AI sends email, logs activity |
| 12 | Analyst | "Show me the Acme call prep" | AI displays call prep document |
| 13 | AI | Presents call prep | Company background, hypothesis, key questions, concerns, suggested agenda—all pre-generated |
| 14 | Analyst | Adds one custom question, marks as ready | Call prep finalized |
| 15 | Analyst | Joins 2pm Acme call | AI joins as note-taker (with consent) |
| 16 | AI | Records and transcribes silently | Real-time transcription running |

**Afternoon (2:00 PM - 5:00 PM)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 17 | — | Call ends after 45 minutes | AI begins processing transcript |
| 18 | AI | Generates call summary | "Call summary ready. Key findings: $450K MRR (up from $380K in deck), 3 enterprise pilots, main risk is long sales cycles. Recommended next step: Deep Dive." |
| 19 | Analyst | Reviews summary, corrects one metric | AI updates structured fields, notes correction |
| 20 | Analyst | "Move Acme to Deep Dive stage" | AI moves deal, triggers Deep Dive checklist |
| 21 | AI | Proactively suggests | "I noticed we're missing customer concentration data. Should I ask the founder?" |
| 22 | Analyst | "Yes, send an email asking about that" | AI drafts targeted question email |
| 23 | Analyst | Approves email | AI sends, tracks for response |
| 24 | Analyst | Works on memo for another deal (DataFlow) | AI has pre-drafted memo; analyst reviews and edits |
| 25 | Analyst | "Add more detail to the market section" | AI regenerates market section with deeper analysis |

**End of Day (5:00 PM - 6:00 PM)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 26 | Analyst | "What's my pipeline looking like?" | AI shows pipeline summary with health indicators |
| 27 | AI | Flags issues | "3 deals have been idle for 7+ days. CloudStart hasn't responded in 2 weeks—want me to send a follow-up?" |
| 28 | Analyst | "Yes, follow up on CloudStart. Archive the other two." | AI sends follow-up, archives deals |
| 29 | Analyst | "Flag Acme and TechCo for partner review" | AI notifies relevant partners, adds to their queue |
| 30 | Analyst | Closes app | AI: "Have a good evening. I'll keep an eye on incoming deals." |

#### AI Behavior Highlights

- **Proactive briefing**: AI initiates with context, doesn't wait to be asked
- **Autonomous low-risk actions**: Creating deal records, parsing decks, generating call prep
- **Confirmation for high-risk actions**: Sending external emails, changing deal stages
- **Continuous learning**: Corrections logged and applied to future outputs
- **Personality example (Warm)**: "Good morning, Sarah. 4 new decks came in overnight..."

#### Touchpoints & Handoffs

- Analyst → AI: Task delegation via natural language
- AI → Analyst: Summaries, drafts, and recommendations for review
- Analyst → Partner: Flagging deals for review (AI facilitates notification)
- AI → Founder: Emails and scheduling (with analyst approval)

[DIAGRAM: Analyst daily workflow showing morning triage → deal processing → call cycle → end-of-day review]

---

### 1.2 Partner Day-in-the-Life

#### Narrative Overview

The partner's day is fragmented—back-to-back meetings, board calls, LP conversations, and context-switching between dozens of active relationships. The partner rarely has time to sit at a laptop for extended periods. The AI Analyst becomes their always-available briefer, accessible via voice on mobile while commuting, walking between meetings, or during brief breaks.

The partner starts the day with a quick voice check-in while commuting, asking the AI what needs attention. Throughout the day, they receive push notifications for high-priority items requiring approval or review. Between meetings, they use voice commands to quickly get up to speed on deals before calls, approve analyst requests, and ask ad-hoc questions about the portfolio.

Deep work happens in focused blocks—reviewing memos before IC, providing feedback on promising deals, making final investment decisions. The AI ensures the partner arrives at these moments fully prepared, with all relevant context synthesized and ready.

#### Step-by-Step Flow

**Early Morning - Commute (7:30 AM - 8:30 AM)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Partner | Opens mobile app while in car, taps voice | AI activates listening mode |
| 2 | Partner | "What do I need to know this morning?" | AI provides audio briefing |
| 3 | AI | Speaks summary | "Morning, James. Three things: First, Sarah flagged Acme for your review—strong call yesterday, $450K MRR, she's recommending Deep Dive. Second, the DataFlow memo is ready for IC tomorrow. Third, you have a founder call with Nexus at 11am—I can brief you before." |
| 4 | Partner | "Tell me more about Acme" | AI provides verbal deal summary |
| 5 | AI | Explains | "Acme is a B2B SaaS in the logistics space. Fit score 78. Team is ex-Flexport and ex-Uber Freight. Traction is solid—$450K MRR with 15% month-over-month growth. Main risk is long enterprise sales cycles. Sarah thinks it's worth a deeper look." |
| 6 | Partner | "Sounds good. Approve the Deep Dive." | AI confirms action |
| 7 | AI | "Done. I've approved moving Acme to Deep Dive and notified Sarah." | Deal stage updated |

**Mid-Morning - Between Meetings (10:45 AM)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 8 | Partner | Receives push notification | "Nexus call in 15 min. Tap to prep." |
| 9 | Partner | Taps notification, opens app | AI shows quick prep view |
| 10 | AI | Displays mobile-optimized prep | Key facts, last interaction summary, 3 talking points, open questions |
| 11 | Partner | Scrolls through in 2 minutes | Fully prepped for call |
| 12 | Partner | Joins Nexus call | AI joins to record (if permitted) |

**Lunch Break - Quick Checks (12:30 PM)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 13 | Partner | Voice query while walking | "Any updates on the Series B deals?" |
| 14 | AI | Responds verbally | "You have 4 active Series B deals. CloudNet is in due diligence—legal review underway. DataFlow goes to IC tomorrow. The other two are in early stages." |
| 15 | Partner | "What's the main risk on CloudNet?" | AI answers from deal context |
| 16 | AI | "The main concerns are customer concentration—top 3 customers are 60% of revenue—and the CTO departure last quarter. Sarah added a note that references were positive on the CTO situation." | |
| 17 | Partner | "Thanks, that's helpful" | AI: "Let me know if you need anything else." |

**Afternoon - Deep Work Block (3:00 PM - 4:30 PM)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 18 | Partner | Opens laptop, full desktop experience | AI greets with context |
| 19 | Partner | "Show me the DataFlow memo for IC" | AI opens memo in full editor |
| 20 | AI | Displays memo | Full investment memo with AI-generated sections, citations, risk analysis |
| 21 | Partner | Reads through, adds comments | "Market size feels aggressive—check assumptions" |
| 22 | Partner | "What's the source for the $50B TAM?" | AI shows citation |
| 23 | AI | "That's from a 2024 McKinsey report on enterprise automation. I can pull the original if you want." | Link to source provided |
| 24 | Partner | Finishes review, adds overall assessment | Memo marked as partner-reviewed |
| 25 | Partner | "Notify the team that DataFlow is ready for IC" | AI sends notifications |

**Evening - Mobile Check (7:00 PM)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 26 | Partner | Quick app check on phone | AI shows evening summary |
| 27 | AI | "Quiet evening. One new inbound scored 71—healthcare AI, might be interesting. Sarah will review tomorrow. No urgent items." | |
| 28 | Partner | "Add it to my watch list" | AI adds deal to partner's personal watch list |

#### AI Behavior Highlights

- **Voice-first mobile experience**: Full functionality without typing
- **Contextual brevity**: Short, relevant answers calibrated to partner's time constraints
- **Smart notifications**: Only high-priority items push to partner
- **Instant context retrieval**: Any question about any deal, answered in seconds
- **Personality example (Sharp)**: "Morning, James. Three things: First, Sarah flagged Acme..."

#### Touchpoints & Handoffs

- AI → Partner: Push notifications for approvals, flagged deals
- Partner → AI: Voice commands, quick approvals
- Partner → Analyst: Feedback via comments (AI notifies analyst)
- Partner → IC: Memo approval triggers IC scheduling

[DIAGRAM: Partner daily flow showing mobile touchpoints interspersed with meetings and focused review blocks]

---

## 2. Deal Lifecycle Journey

### 2.1 Investment Path

#### Narrative Overview

This journey follows a single deal—"Acme"—from the moment it enters the fund's pipeline to a successful investment. The journey spans multiple weeks and involves all three personas: the analyst who manages day-to-day progression, the partner who provides strategic guidance and makes the final decision, and the founder who engages with both humans and AI throughout the process.

The AI plays a crucial role at every stage: creating the initial deal record, scoring thesis fit, preparing for calls, summarizing conversations, drafting memos, gathering missing information from the founder, supporting the IC meeting, and tracking due diligence. The journey illustrates how AI reduces friction and time-to-decision while keeping humans in control of judgment calls.

#### Step-by-Step Flow

**Stage 1: Inbound (Day 0)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Founder | Sends deck via intro email to partner | Email arrives in partner's inbox |
| 2 | Partner | Forwards email to fund's intake address | AI receives and begins processing |
| 3 | AI | Creates deal record | Company: Acme, Source: Partner referral, Referrer: [Name from email] |
| 4 | AI | Parses deck | Extracts problem, solution, product, traction, team, funding ask |
| 5 | AI | Generates fit score | Score: 78/100. Rationale: "Strong thesis fit on B2B SaaS, Series A stage, US-based. Team has relevant domain experience. Initial traction promising." |
| 6 | AI | Enriches with research | Competitor landscape, team LinkedIn profiles, funding history, market context |
| 7 | AI | Notifies analyst | "New deal: Acme. Fit score 78. Partner referral. Ready for review." |

**Stage 2: First Look (Day 0-1)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 8 | Analyst | Opens deal workspace | Sees full AI analysis: parsed deck, fit score, enrichment, recommended next steps |
| 9 | Analyst | Reviews AI work, minor corrections | Corrects one team member's role; AI learns |
| 10 | Analyst | "Looks promising. Schedule a first call." | AI drafts email to founder proposing times |
| 11 | Analyst | Approves email | AI sends scheduling email |
| 12 | AI | Moves deal to "First Call Scheduled" | Stage updated, activity logged |

**Stage 3: First Call (Day 3)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 13 | AI | Generates call prep (day before) | Who they are, hypothesis, key questions, concerns, agenda |
| 14 | Analyst | Reviews prep, adds custom question | Call prep finalized |
| 15 | Analyst | Joins call with founder | AI joins as note-taker |
| 16 | AI | Records and transcribes | Real-time transcription |
| 17 | — | 45-minute call completes | — |
| 18 | AI | Generates call summary | Key learnings, metrics shared, risks identified, recommended next steps |
| 19 | AI | Updates deal record | MRR updated to $450K (was $380K in deck), new metrics added |
| 20 | Analyst | Reviews summary, approves accuracy | Summary finalized |

**Stage 4: Deep Dive (Day 4-10)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 21 | Analyst | "Move to Deep Dive" | AI updates stage, triggers Deep Dive checklist |
| 22 | AI | Identifies information gaps | "Missing: customer concentration, unit economics detail, reference contacts" |
| 23 | AI | Suggests founder outreach | "Should I email the founder to gather this information?" |
| 24 | Analyst | Approves | AI sends targeted question email to founder |
| 25 | Founder | Responds with data | AI parses response, updates structured fields |
| 26 | Analyst | Conducts second call (deeper dive) | AI records, summarizes, updates record |
| 27 | AI | Proactively researches | Market sizing, competitive dynamics, customer references |
| 28 | Analyst | Flags for partner | "Ready for partner review" |
| 29 | Partner | Reviews deal, asks questions via chat | AI answers from deal context |
| 30 | Partner | "Let's take this to IC" | Deal moves to Pre-IC |

**Stage 5: Pre-IC / Memo (Day 11-14)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 31 | AI | Generates memo draft | Full investment memo using fund template, with citations |
| 32 | Analyst | Reviews and edits memo | AI tracks human edits separately from AI content |
| 33 | Partner | Reviews memo, adds comments | "Strengthen the competitive moat section" |
| 34 | Analyst | Asks AI to regenerate section | AI produces revised section with more depth |
| 35 | Analyst | Finalizes memo | Memo marked ready for IC |
| 36 | AI | Notifies IC participants | "Acme memo ready for IC on [date]" |

**Stage 6: IC Meeting (Day 15)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 37 | AI | Joins IC meeting (with permission) | Records and transcribes discussion |
| 38 | Team | Discusses Acme deal | AI captures key points, concerns raised, questions |
| 39 | Partner | "We're going to move forward with DD" | Decision captured |
| 40 | AI | Logs IC decision | "IC Decision: Proceed to Due Diligence. Key conditions: [list]" |
| 41 | AI | Updates deal stage | Moves to Due Diligence, creates DD checklist |
| 42 | AI | Drafts follow-up email to founder | "Great news—we'd like to proceed to due diligence..." |

**Stage 7: Due Diligence (Day 16-30)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 43 | Analyst | Manages DD process | AI tracks checklist items, deadlines |
| 44 | AI | Organizes data room documents | Categorizes, summarizes key documents |
| 45 | AI | Schedules reference calls | Coordinates with references provided by founder |
| 46 | Analyst | Conducts reference calls | AI records and summarizes |
| 47 | AI | Flags any concerns | "Reference mentioned high CAC—doesn't match founder's claims" |
| 48 | Analyst | Investigates, resolves | Adds clarification to deal record |
| 49 | Partner | Final review | All DD items complete |

**Stage 8: Term Sheet & Close (Day 31-45)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 50 | Partner | Decision to invest | "Let's send a term sheet" |
| 51 | AI | Updates stage to "Term Sheet" | Activity logged |
| 52 | — | Legal/terms negotiation (outside AI scope) | — |
| 53 | Partner | Deal closes | Final investment made |
| 54 | AI | Updates to "Closed - Won" | Logs investment details, moves to portfolio |
| 55 | AI | Creates portfolio record | Links to deal history, all documents preserved |

#### AI Behavior Highlights

- **Stage-appropriate actions**: Different AI behaviors at each funnel stage
- **Continuous enrichment**: AI keeps researching and updating throughout
- **Decision logging**: Every major decision captured with context
- **Handoff facilitation**: Smooth transitions between analyst and partner

#### Touchpoints & Handoffs

| Stage | Primary Owner | AI Role | Partner Involvement |
|-------|---------------|---------|---------------------|
| Inbound | AI | Creates record, scores | Receives notification if high-fit |
| First Look | Analyst | Analysis ready for review | Optional early flag |
| First Call | Analyst | Prep and summary | Reviews if flagged |
| Deep Dive | Analyst | Research, gap-filling | Active review |
| Pre-IC | Analyst + Partner | Memo drafting | Edits and approval |
| IC | Partner | Meeting support | Decision maker |
| DD | Analyst | Tracking, summaries | Final sign-off |
| Close | Partner | Record keeping | Decision maker |

[DIAGRAM: Deal funnel visualization showing stages, conversion points, and AI actions at each stage]

---

### 2.2 Pass Path

#### Narrative Overview

Not every deal progresses to investment. In fact, the vast majority don't—of 20-30 weekly inbound deals, perhaps 5 reach a first call and only 1 reaches IC. The pass path is equally important to design well: founders deserve respectful communication, the fund needs clean pipeline hygiene, and the AI must learn from pass decisions to improve future scoring.

This journey covers three pass scenarios: early pass (low fit score, no human review needed), mid-funnel pass (after first call), and late-stage pass (after IC or during DD). Each scenario requires different handling, communication, and logging.

#### Scenario A: Early Pass (Auto-Decline)

**Narrative**: A deck arrives that clearly doesn't fit the fund's thesis—wrong stage, wrong geography, or excluded sector. The AI scores it low and, based on fund-configured automation rules, sends a polite decline without requiring analyst review.

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Founder | Submits deck | AI creates deal record |
| 2 | AI | Parses and scores | Fit score: 22/100. Reason: "Pre-seed stage (fund invests Series A+), hardware focus (excluded sector)" |
| 3 | AI | Checks automation rules | Rule: "IF fit_score < 30 AND hard_constraint_fail THEN auto_decline" |
| 4 | AI | Sends decline email | "Thank you for thinking of us. After reviewing, we don't think we're the right fit at this stage given our focus on Series A+ software investments. We wish you the best..." |
| 5 | AI | Logs activity | Deal marked "Passed - Auto", reason logged, no analyst time spent |

**AI Behavior**: Fully autonomous for clear mismatches, but always logs reasoning. Decline emails are professional and encourage future outreach if circumstances change.

#### Scenario B: Mid-Funnel Pass (After First Call)

**Narrative**: A deal looked promising on paper, but the first call revealed concerns—weak team dynamics, uncompelling traction story, or misaligned expectations. The analyst decides to pass, and the AI helps communicate respectfully.

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Analyst | Completes first call, reviews summary | AI has captured key concerns |
| 2 | Analyst | Opens deal, adds pass reasoning | "Team dynamic felt off—founder dismissive of co-founder. Traction story inconsistent with deck." |
| 3 | Analyst | "Pass on this deal" | AI prompts for pass reason category |
| 4 | Analyst | Selects "Team concerns" + "Traction concerns" | Categories logged |
| 5 | AI | Drafts pass email | "Thank you for taking the time to speak with us. After careful consideration, we've decided not to move forward at this time. While we were impressed by [specific positive], we had concerns about [gentle framing of issues]. We'd be happy to reconnect if circumstances change..." |
| 6 | Analyst | Reviews, adjusts tone slightly | Approves send |
| 7 | AI | Sends email, updates deal | Stage: "Passed - After First Call", reasons logged |
| 8 | AI | Learns from decision | Adjusts internal model: this deal profile + these signals = likely pass |

**AI Behavior**: Drafts personalized, respectful decline. Always highlights something positive. Never reveals confidential concerns directly. Logs for pattern learning.

#### Scenario C: Late-Stage Pass (After IC or DD)

**Narrative**: A deal made it deep into the funnel—through multiple calls, a full memo, and IC discussion—but ultimately the partnership decides not to invest. This requires the most careful handling: significant relationship has been built, and the founder deserves a thoughtful explanation.

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Team | IC meeting concludes with pass decision | AI captures: "IC Decision: Pass. Reasons: Market timing concerns, competitive dynamics with [portfolio company]" |
| 2 | AI | Logs decision with full context | All IC discussion points preserved |
| 3 | Partner | "I'll call the founder personally" | AI notes: human-led communication |
| 4 | Partner | Has call with founder | AI can join to record if appropriate, or partner logs notes manually |
| 5 | AI | Offers to draft follow-up email | "Want me to draft a follow-up email summarizing the conversation?" |
| 6 | Partner | Dictates key points | AI drafts email |
| 7 | Partner | Reviews, personalizes, sends | Email sent from partner's address |
| 8 | AI | Updates deal | Stage: "Passed - After IC", detailed reasoning preserved |
| 9 | AI | Adds to "relationships to maintain" | Founder tagged for potential future reconnection |

**AI Behavior**: Recognizes sensitivity of late-stage passes. Offers support but defers to human judgment on communication. Preserves relationship for potential future engagement.

#### Pass Path Summary

| Pass Type | AI Autonomy | Communication | Learning Value |
|-----------|-------------|---------------|----------------|
| Early (auto) | Full | Templated email | Low (clear mismatch) |
| Mid-funnel | Draft + approval | Personalized email | Medium (refines scoring) |
| Late-stage | Support only | Human-led, AI assists | High (complex signals) |

#### AI Behavior Highlights

- **Graceful decline templates**: Professional, kind, leaves door open
- **Pass reason taxonomy**: Structured categories for learning
- **Relationship preservation**: Late-stage passes flagged for future reconnection
- **Pattern learning**: Every pass decision feeds back into scoring model

[DIAGRAM: Pass decision tree showing different paths based on stage and severity]

---

## 3. Task-Based Workflows

### 3.1 Deck → Deal Record + Fit Score

#### Narrative Overview

The deck intake workflow is the entry point for most deals. When a pitch deck arrives—via email forward, direct upload, or link paste—the AI springs into action. Within minutes, a fully structured deal record exists: company information extracted, deck parsed into logical sections, thesis fit scored with detailed rationale, and initial research completed. What once took an analyst 30-60 minutes now happens automatically.

This workflow demonstrates the AI's value proposition most clearly: it handles the grunt work, freeing humans to focus on judgment. The analyst's role shifts from data entry to quality review.

#### Step-by-Step Flow

**Trigger: Email Forward**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | User | Forwards intro email with deck to deals@fund.ai | Email received by system |
| 2 | AI | Extracts metadata | Sender, subject, intro context, attachment detected |
| 3 | AI | Creates deal record | Company name extracted, source: email, referrer: parsed from intro |
| 4 | AI | Parses deck | Extracts slides into structured sections |

**Trigger: Direct Upload**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Analyst | Clicks "Add Deal" in app | Upload modal appears |
| 2 | Analyst | Uploads PDF/PPTX | File received |
| 3 | Analyst | Adds source/referrer (optional) | Metadata captured |
| 4 | AI | Processes deck | Same parsing flow |

**Trigger: Link Paste**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Analyst | Pastes DocSend/Google Drive link | AI detects link type |
| 2 | AI | Fetches deck from link | Downloads or accesses via API |
| 3 | AI | Processes as above | Same parsing flow |

**Core Processing (All Triggers)**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 5 | AI | Parses deck structure | Identifies: Problem, Solution, Product, Market, Traction, Team, Financials, Ask |
| 6 | AI | Extracts key data points | Company name, founding date, location, funding history, key metrics |
| 7 | AI | Identifies team members | Names, roles, backgrounds (matched to LinkedIn if possible) |
| 8 | AI | Extracts traction metrics | MRR, ARR, growth rate, customers, etc. |
| 9 | AI | Generates fit score | Compares against ThesisConfig |
| 10 | AI | Writes fit rationale | "Score: 78/100. Strong fit on: B2B SaaS (preferred), Series A stage (target), US-based (required). Concerns: No clear moat articulated, competitive market." |
| 11 | AI | Performs initial enrichment | Team LinkedIn, company website, Crunchbase, news mentions |
| 12 | AI | Compiles competitor overview | 3-5 key competitors with brief descriptions |
| 13 | AI | Creates deal workspace | All information organized and ready for review |
| 14 | AI | Notifies appropriate user | Based on assignment rules or default to submitter |

**Review & Refinement**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 15 | Analyst | Opens deal notification | Deal workspace displayed |
| 16 | Analyst | Reviews AI extraction | Checks accuracy of parsed data |
| 17 | Analyst | Corrects any errors | "CEO name is John, not Jon" |
| 18 | AI | Updates record, logs correction | Learns from correction pattern |
| 19 | Analyst | Reviews fit score rationale | Checks if AI reasoning makes sense |
| 20 | Analyst | Adjusts score if needed | "Actually, they have a patent—bump fit to 82" |
| 21 | AI | Logs adjustment with reason | Feedback captured for learning |
| 22 | Analyst | Determines next step | Schedule call, request more info, or pass |

#### AI Behavior Highlights

- **Multi-format support**: PDF, PPTX, Google Slides, DocSend links
- **Intelligent extraction**: Not just OCR—understands slide context and structure
- **Confidence indicators**: "High confidence on metrics" vs "Couldn't find clear revenue data"
- **Duplicate detection**: "This looks similar to TechCorp submitted last month. Same company?"
- **Personality example (Balanced)**: "I've processed the Acme deck. Fit score is 78/100. The team looks strong, and traction is promising. Main gap: I couldn't find clear unit economics. Would you like me to flag that for founder follow-up?"

#### Output Artifact

**Deal Record includes:**
- Company overview (name, description, website, location)
- Parsed deck sections with source slides linked
- Key metrics (with confidence levels)
- Team profiles
- Fit score + detailed rationale
- Competitor landscape
- Enrichment data
- Recommended next steps

[DIAGRAM: Deck processing pipeline showing input → parsing → scoring → enrichment → output]

---

### 3.2 Call → Summary + Workspace Update

#### Narrative Overview

Founder calls are the richest source of deal information—but traditionally, capturing that information was painful. Analysts scrambled to take notes while staying engaged in conversation, then spent 30+ minutes afterward writing up summaries and updating various systems.

With the AI handling transcription and summarization, the analyst can be fully present in the conversation. After the call, a structured summary appears within minutes, key metrics are extracted into structured fields, and the CRM syncs automatically. The analyst's role becomes quality control: reviewing the AI's work and adding human judgment.

#### Step-by-Step Flow

**Pre-Call Setup**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | AI | Detects upcoming call (via calendar) | Prepares for call handling |
| 2 | AI | Generates call prep doc | Background, hypothesis, questions, agenda |
| 3 | Analyst | Reviews prep, adds custom items | Prep finalized |
| 4 | AI | Sends calendar update | Adds AI note-taker to meeting invite |

**During Call**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 5 | Analyst + Founder | Join video call | Call begins |
| 6 | AI | Joins as "[Fund Name] AI" | Announces presence, confirms recording consent |
| 7 | AI | Records audio, generates transcript | Real-time transcription running |
| 8 | Analyst | Focuses on conversation | No note-taking needed |
| 9 | AI | Tags key moments | Detects metrics, decisions, action items as they occur |

**Post-Call Processing**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 10 | — | Call ends | AI begins summary generation |
| 11 | AI | Processes full transcript | Analyzes conversation flow and content |
| 12 | AI | Generates structured summary | |

**Summary Structure:**
```
## Call Summary: Acme - First Call
**Date:** March 15, 2025
**Attendees:** Sarah (Analyst), John Smith (Founder/CEO)
**Duration:** 47 minutes

### Key Learnings
- Company pivoted 6 months ago from B2C to B2B; traction accelerated significantly
- Current MRR is $450K (updated from $380K in deck—grew since deck was made)
- Primary ICP is mid-market logistics companies (500-2000 employees)

### Metrics Discussed
| Metric | Value | Source | Confidence |
|--------|-------|--------|------------|
| MRR | $450K | Founder stated | High |
| MoM Growth | 15% | Founder stated | High |
| Customers | 23 | Founder stated | High |
| CAC | ~$15K | Founder estimate | Medium |
| ACV | $80K | Calculated | High |

### Risks & Concerns
- Long enterprise sales cycles (3-6 months) could slow growth
- Founder mentioned challenges hiring senior engineers
- Competitive market with well-funded players (Flexport, Project44)

### Open Questions
- Customer concentration (top 3 = what % of revenue?)
- Unit economics detail (LTV, payback period)
- Reference customers for calls

### Next Steps
- [ ] Sarah to send customer concentration question
- [ ] Founder to share financial model
- [ ] Schedule deep dive call if metrics check out

### Recommendation
**Proceed to Deep Dive** - Strong traction, relevant team, good market. Worth deeper investigation pending unit economics clarity.
```

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 13 | AI | Updates deal record | MRR field: $380K → $450K (source: call) |
| 14 | AI | Syncs to CRM | Key fields pushed to Affinity/HubSpot |
| 15 | AI | Notifies analyst | "Call summary ready for Acme. I've updated MRR and added 3 open questions." |

**Review & Refinement**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 16 | Analyst | Opens summary | Reviews AI work |
| 17 | Analyst | Spots error | "CAC was $12K, not $15K" |
| 18 | Analyst | Inline correction | Clicks metric, types correct value |
| 19 | AI | Updates everywhere | Summary, deal record, CRM all updated |
| 20 | Analyst | Approves summary | Marked as reviewed |
| 21 | Analyst | Adds human insight | "Founder seemed slightly evasive on competitive positioning—worth probing" |
| 22 | AI | Appends note to summary | Human observation preserved |

#### AI Behavior Highlights

- **Real-time awareness**: Tags important moments during call
- **Metric extraction**: Pulls numbers into structured fields automatically
- **Contradiction detection**: "Deck said $380K MRR but founder said $450K—which should I use?"
- **Confidence levels**: Distinguishes firm numbers from estimates
- **Personality example (Warm)**: "Great call! I've got your summary ready. Looks like Acme is doing better than the deck suggested—$450K MRR now. A few things I couldn't catch clearly, so I've marked those for your review."

#### Touchpoints & Handoffs

- AI → Analyst: Summary ready notification
- Analyst → AI: Corrections and additions
- AI → CRM: Automatic sync of key fields
- AI → Partner: Notification if deal is flagged for review

[DIAGRAM: Call workflow showing pre-call prep → recording → processing → summary → sync]

---

### 3.3 Deal → Memo Draft

#### Narrative Overview

The investment memo is the culmination of deal evaluation—a comprehensive document that synthesizes everything known about an opportunity for IC discussion. Traditionally, writing a memo takes hours: gathering information from multiple sources, structuring arguments, ensuring completeness, and formatting to the fund's standards.

The AI transforms this from a writing task to an editing task. It generates a first draft that pulls from all available sources—deck, call transcripts, research, notes—structured according to the fund's template. The analyst and partner then refine, adding human judgment and ensuring accuracy.

#### Step-by-Step Flow

**Trigger & Initiation**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Analyst | Moves deal to "Pre-IC" stage | AI detects stage requiring memo |
| 2 | AI | Prompts memo generation | "Acme is now Pre-IC. Want me to draft an investment memo?" |
| 3 | Analyst | "Yes, generate the memo" | AI begins processing |

*Alternative trigger: Analyst manually requests "Generate memo for this deal"*

**AI Drafting Process**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 4 | AI | Gathers all sources | Deck, call transcripts, notes, research, external data |
| 5 | AI | Loads fund's memo template | Sections, order, required fields |
| 6 | AI | Generates each section | |

**Memo Structure (Example):**
```
# Investment Memo: Acme

## Executive Summary
[2-3 paragraph synthesis of the opportunity]

## Company Overview
- **What they do:** [Product/service description]
- **Founded:** [Date]
- **Location:** [HQ]
- **Team size:** [Number]
- **Funding to date:** [Amount, investors]

## The Opportunity
### Problem
[What problem they solve, citing deck slides]

### Solution
[How they solve it, product description]

### Market
[TAM/SAM/SOM analysis, market dynamics]
*Source: [McKinsey report, deck slide 7]*

## Traction & Metrics
| Metric | Value | Trend | Source |
|--------|-------|-------|--------|
| MRR | $450K | +15% MoM | Founder (Call 1) |
| Customers | 23 | +3 this month | Founder (Call 1) |
| ACV | $80K | Stable | Calculated |
[...]

## Team
[Founder backgrounds, key hires, gaps]
*Cited from LinkedIn research and call notes*

## Thesis Fit
- **Stage:** Series A ✓ (target)
- **Sector:** B2B SaaS ✓ (preferred)
- **Geography:** US ✓ (required)
- **Check size:** $5-8M ask, fits range ✓

## Competitive Landscape
[Competitor analysis with differentiation]

## Risks & Mitigations
| Risk | Severity | Mitigation |
|------|----------|------------|
| Long sales cycles | Medium | Land-and-expand motion reduces pressure |
| Competitive market | High | Team's domain expertise is differentiator |
[...]

## Open Questions
- [ ] Customer concentration detail
- [ ] Reference calls
- [ ] Deep dive on unit economics

## Investment Recommendation
[AI's synthesis, clearly marked as AI-generated]
**Recommendation:** Proceed to IC
**Conviction level:** Medium-High
**Key condition:** Unit economics must validate

---
*Sources: Pitch deck (March 2025), Call transcript (March 15), LinkedIn research, Crunchbase*
```

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 7 | AI | Adds citations throughout | Every claim linked to source |
| 8 | AI | Marks confidence levels | "High confidence" vs "Needs verification" |
| 9 | AI | Saves draft | Memo appears in deal workspace |
| 10 | AI | Notifies analyst | "Memo draft ready. 2 sections need human input: competitive moat and recommendation." |

**Review & Editing**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 11 | Analyst | Opens memo editor | Full document with AI attribution markers |
| 12 | Analyst | Reviews each section | AI content shown with subtle indicator |
| 13 | Analyst | Edits market section | Adds nuance from personal knowledge |
| 14 | AI | Tracks edit | Section now marked "Human edited" |
| 15 | Analyst | "Regenerate the risks section with more detail" | AI produces new version |
| 16 | Analyst | Compares versions, picks preferred | Version saved |
| 17 | Analyst | Adds personal recommendation | Human judgment clearly attributed |
| 18 | Analyst | Marks memo ready for partner | Notification sent |

**Partner Review**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 19 | Partner | Opens memo | Sees full document with attribution |
| 20 | Partner | Adds comment on market size | "@sarah - this feels aggressive, can we validate?" |
| 21 | Analyst | Responds with source | Links to McKinsey report |
| 22 | Partner | Satisfied, adds overall assessment | "Strong opportunity, worth IC time" |
| 23 | Partner | Approves for IC | Memo marked final, IC scheduled |

#### AI Behavior Highlights

- **Template adherence**: Follows fund's specific memo structure
- **Source synthesis**: Pulls from multiple sources, reconciles conflicts
- **Citation discipline**: Every claim has a source
- **Human/AI distinction**: Clear visual markers for AI vs human content
- **Regeneration**: Any section can be regenerated with feedback
- **Personality example (Sharp)**: "Memo drafted. 12 sections complete. Two gaps: I couldn't find clear data on customer retention, and the competitive moat section needs your input. Estimated IC-readiness: 85%."

[DIAGRAM: Memo generation pipeline showing sources → AI synthesis → draft → human review → final]

---

### 3.4 Founder Info Gathering

#### Narrative Overview

Often, the information needed to evaluate a deal isn't in the deck or doesn't come up naturally in calls. Traditionally, gathering this information required awkward email chains or scheduling additional calls—adding friction and delay.

The AI can gather missing information directly from founders, through targeted emails or short focused calls. This workflow is carefully designed with guardrails: the AI always identifies itself, sticks to approved topics, and escalates anything sensitive. Human approval is required before any founder contact.

#### Step-by-Step Flow

**Gap Identification**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | AI | Analyzes deal record | Identifies missing information |
| 2 | AI | Categorizes gaps | Factual (metrics, data) vs. Judgment (strategy, plans) |
| 3 | AI | Suggests outreach | "I noticed gaps in: MRR breakdown by customer, CAC by channel, reference contacts. Should I reach out to the founder?" |
| 4 | Analyst | Reviews suggested questions | Can add, remove, or modify |
| 5 | Analyst | Approves outreach | Selects email or call |

**Email Q&A Flow**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 6 | AI | Drafts email | |

```
Subject: Quick follow-up questions - [Fund Name]

Hi John,

I'm an AI assistant working with the [Fund Name] team to help
gather some additional information following your recent conversation
with Sarah.

We had a few specific questions:

1. Could you share the MRR breakdown by customer segment
   (enterprise vs mid-market vs SMB)?
2. What's your approximate CAC by acquisition channel?
3. Would you be able to connect us with 2-3 customer references?

Once you respond, a team member will review and follow up if there's
mutual interest in moving forward.

Best,
[AI Name]
AI Assistant, [Fund Name]
```

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 7 | Analyst | Reviews draft | Minor adjustments if needed |
| 8 | Analyst | Approves send | Email sent from fund domain |
| 9 | Founder | Receives email | Clear AI identification |
| 10 | Founder | Replies with answers | Response received |
| 11 | AI | Parses response | Extracts structured data |
| 12 | AI | Updates deal record | MRR breakdown added, CAC added |
| 13 | AI | Notifies analyst | "Founder responded. I've updated the deal record with new metrics." |
| 14 | Analyst | Reviews parsed data | Confirms accuracy |

**AI Call Flow**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 6b | AI | Suggests call for complex gaps | "These questions might be better discussed on a quick call. Should I schedule 15 minutes?" |
| 7b | Analyst | Approves call approach | AI sends scheduling email |
| 8b | Founder | Books time | Calendar invite sent |
| 9b | AI | Prepares call script | Specific questions, probing follow-ups |
| 10b | — | Call time arrives | — |
| 11b | AI | Introduces itself | "Hi John, I'm [AI Name], an AI assistant working with [Fund Name]. Thanks for taking a few minutes. I have a few specific questions the team wanted to clarify..." |
| 12b | AI | Asks prepared questions | Natural conversational flow |
| 13b | AI | Probes based on answers | "You mentioned CAC varies by channel—could you break that down?" |
| 14b | AI | Handles scope boundaries | (See escalation scenarios below) |
| 15b | — | Call concludes | — |
| 16b | AI | Generates summary | Answers extracted, transcript available |
| 17b | AI | Updates deal record | Structured data added |
| 18b | AI | Notifies analyst | "Call complete. Key answers captured." |

**Escalation Scenarios**

| Situation | AI Response |
|-----------|-------------|
| Founder asks about terms/valuation | "That's something the team would discuss directly with you. Let me flag that for follow-up." |
| Founder gets frustrated | "I understand. Would you prefer to speak with someone from our team directly?" |
| Founder asks off-topic questions | "I'm specifically focused on [topic] today, but I can pass that question to the team." |
| Founder requests human | "Absolutely. I'll have Sarah reach out to you directly. Thanks for your time." |

#### AI Behavior Highlights

- **Always identifies as AI**: Clear, upfront disclosure
- **Narrow scope**: Sticks to approved questions
- **Professional tone**: Respectful, not pushy
- **Easy opt-out**: Founder can request human at any time
- **Structured extraction**: Responses become structured data
- **Personality example (Balanced)**: "Hi John, I'm [AI Name], an AI assistant working with [Fund Name]. I'm reaching out to gather some specific information to help the team with their evaluation. This should just take a few minutes..."

#### Guardrails Summary

| Rule | Implementation |
|------|----------------|
| AI disclosure | First line of every email/call |
| Approved topics only | Questions pre-approved by analyst |
| No negotiation | Terms, valuation, pricing discussions refused |
| No sensitive topics | Legal, HR matters refused |
| Human fallback | Always offered, immediate handoff |
| Full logging | All interactions logged and reviewable |

[DIAGRAM: Founder outreach decision tree showing approval → channel selection → interaction → parsing → update]

---

### 3.5 IC Meeting Support

#### Narrative Overview

The Investment Committee meeting is where deals are debated and investment decisions are made. The AI can attend these meetings (with fund permission), capturing the discussion, logging decisions, and ensuring nothing falls through the cracks. This transforms IC from a moment in time to a documented, actionable event.

#### Step-by-Step Flow

**Pre-IC Preparation**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | AI | IC meeting approaches | Checks readiness |
| 2 | AI | Verifies memo is final | All required sections complete |
| 3 | AI | Prepares IC packet | Memo + supporting docs + open questions |
| 4 | AI | Sends to attendees | "IC packet for Acme ready. 3 deals on agenda." |
| 5 | AI | Generates discussion guide | Key questions, decision points, risks to address |

**During IC Meeting**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 6 | Team | Joins IC meeting | AI joins as silent observer (if permitted) |
| 7 | AI | Records and transcribes | Captures full discussion |
| 8 | AI | Tags key moments | Questions raised, concerns voiced, decisions made |
| 9 | Partner | "Let's move forward with Acme" | AI detects decision |
| 10 | Partner | "But we need to resolve the customer concentration question first" | AI captures condition |
| 11 | Partner | "Pass on TechFlow—market timing isn't right" | AI captures pass decision and reason |

**Post-IC Processing**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 12 | — | Meeting ends | AI processes recording |
| 13 | AI | Generates IC summary | |

```
## IC Meeting Summary - March 20, 2025

### Deals Discussed

#### Acme
**Decision:** Proceed to Due Diligence
**Conditions:**
- [ ] Resolve customer concentration question
- [ ] Complete 2 reference calls
**Key discussion points:**
- Team strength was highlighted (Partner A)
- Concerns about competitive market (Partner B)
- Agreed that unit economics justify further investigation
**Vote:** 3-1 in favor

#### TechFlow
**Decision:** Pass
**Reason:** Market timing concerns—enterprise budgets tightening
**Key discussion points:**
- Strong team but wrong macro environment
- Suggested revisiting in 12 months if conditions change
**Vote:** Unanimous pass

#### DataSync
**Decision:** Need more information
**Action items:**
- [ ] Schedule founder call to discuss pivot strategy
- [ ] Research competitor acquisition rumors
**Next review:** March 27 IC
```

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 14 | AI | Updates deal stages | Acme → Due Diligence, TechFlow → Passed |
| 15 | AI | Creates action items | Tasks assigned to relevant owners |
| 16 | AI | Logs decisions | Full audit trail with rationale |
| 17 | AI | Notifies team | "IC summary ready. 3 deals updated. 5 action items created." |

**Post-IC Actions**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 18 | AI | Drafts founder communications | "Good news" email for Acme, thoughtful pass email for TechFlow |
| 19 | Analyst | Reviews and sends | Communications go out same day |
| 20 | AI | Tracks conditions | Monitors progress on DD conditions |
| 21 | AI | Reminds on deadlines | "Customer concentration data still pending for Acme" |

#### AI Behavior Highlights

- **Silent observation**: Doesn't participate, only records
- **Decision detection**: Recognizes when decisions are made
- **Condition tracking**: Captures caveats and requirements
- **Automatic stage updates**: Deals move based on decisions
- **Action item creation**: Tasks auto-assigned from discussion
- **Audit trail**: Full record of what was said and decided

[DIAGRAM: IC workflow showing prep → meeting recording → processing → updates → follow-through]

---

## 4. Founder Journeys

### 4.1 Receiving AI Email

#### Narrative Overview

A founder receives an email from an AI assistant at a VC fund. This might feel unusual, but when done well, it's efficient and respectful. The founder gets specific questions that are easy to answer, clear disclosure that they're interacting with AI, and confidence that a human will review their response.

This journey covers the founder's experience from receiving the email to having their response incorporated into the fund's evaluation.

#### Step-by-Step Flow

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 1 | Founder | Receives email | Subject: "Quick follow-up questions - [Fund Name]" |
| 2 | Founder | Opens email | Sees clear AI identification in first line |
| 3 | Founder | Reads questions | 3-5 specific, answerable questions |
| 4 | Founder | Notes human follow-up mention | "Once you respond, a team member will review..." |
| 5 | Founder | Decides to respond | Questions are reasonable, low friction |
| 6 | Founder | Types responses | Direct answers to each question |
| 7 | Founder | Hits send | Response goes to fund |
| 8 | — | (AI processes response) | — |
| 9 | Founder | Receives confirmation | "Thanks for the information. A team member will be in touch." |
| 10 | Founder | Later: human follow-up | Sarah reaches out to schedule next call |

**Alternative Path: Founder Prefers Human**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 5b | Founder | Replies: "I'd rather speak with someone directly" | Preference expressed |
| 6b | AI | Acknowledges | "Absolutely. I'll have Sarah reach out to you directly." |
| 7b | AI | Notifies analyst | "Founder requested human contact for Acme" |
| 8b | Analyst | Reaches out personally | Seamless handoff |

**Alternative Path: Founder Ignores**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 5c | Founder | Doesn't respond | Email sits in inbox |
| 6c | AI | (After configured delay) | Sends one polite follow-up |
| 7c | Founder | Still no response | No further AI contact |
| 8c | AI | Marks deal | "Awaiting founder response" status |
| 9c | Analyst | Decides next step | Manual outreach or move on |

#### Founder Experience Principles

- **Transparency**: Always clear it's an AI
- **Respect**: Questions are specific, not fishing expeditions
- **Efficiency**: Easy to answer, doesn't waste founder time
- **Control**: Founder can opt out instantly
- **Human backstop**: Always a human reviewing and following up

[DIAGRAM: Founder email journey showing receive → evaluate → respond/opt-out → outcome]

---

### 4.2 AI-Led Call

#### Narrative Overview

For more complex information gathering, the AI may schedule a short call with the founder. This is a focused 15-minute conversation to fill specific gaps. The founder knows they're speaking with an AI, the scope is clearly defined, and human handoff is always available.

#### Step-by-Step Flow

**Scheduling**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 1 | Founder | Receives scheduling email | "We'd like to schedule a brief call to discuss a few specific topics..." |
| 2 | Founder | Sees it's AI-led | "This will be a 15-minute call with [AI Name], our AI assistant..." |
| 3 | Founder | Books time slot | Selects from available times |
| 4 | Founder | Receives calendar invite | Clear agenda and AI identification |

**The Call**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 5 | Founder | Joins call | Video call interface |
| 6 | AI | Greets founder | "Hi John, I'm [AI Name], an AI assistant working with [Fund Name]. Thanks for taking a few minutes to chat." |
| 7 | AI | Explains scope | "I have a few specific questions about [topic] that will help the team with their evaluation. This should take about 15 minutes." |
| 8 | AI | Confirms consent | "Just to confirm, this call will be recorded and transcribed for the team's review. Is that okay?" |
| 9 | Founder | Confirms | "Yes, that's fine" |
| 10 | AI | Asks first question | "Great. Let me start with—can you walk me through your MRR breakdown by customer segment?" |
| 11 | Founder | Responds | Provides answer |
| 12 | AI | Follows up intelligently | "You mentioned enterprise is 60%—how many enterprise customers does that represent?" |
| 13 | — | Conversation continues | Natural Q&A flow |

**Handling Boundaries**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 14 | Founder | "What kind of valuation are you thinking?" | Off-limits topic |
| 15 | AI | Redirects gracefully | "That's something the partners would discuss directly with you once we're further along. I'm focused on the operational questions today." |
| 16 | Founder | Accepts | Conversation continues |

**Wrapping Up**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 17 | AI | Summarizes | "Thanks John. To recap, I heard [key points]. Did I capture that correctly?" |
| 18 | Founder | Confirms or corrects | "Actually, the CAC was $12K, not $15K" |
| 19 | AI | Acknowledges | "Got it, I'll make sure that's noted correctly." |
| 20 | AI | Closes call | "Thanks so much for your time. Sarah will be in touch with next steps." |
| 21 | Founder | Call ends | Positive impression of efficiency |

**Post-Call**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 22 | Founder | Receives follow-up email | Brief thank you with summary of what was discussed |
| 23 | Founder | Later: human follow-up | Sarah reaches out with decision/next steps |

#### Founder Experience Principles

- **Clear expectations**: Knows it's AI before the call
- **Professional demeanor**: AI is polite, efficient, not robotic
- **Focused scope**: Doesn't waste time, sticks to agenda
- **Respectful of boundaries**: Redirects gracefully when appropriate
- **Human continuity**: AI isn't the relationship—humans are

[DIAGRAM: AI call flow showing scheduling → call → topics → boundaries → wrap-up → follow-up]

---

### 4.3 Website Embed Interaction

#### Narrative Overview

Some funds embed the AI on their website as an alternative to a simple "submit your deck" form. Founders visiting the site can interact with the AI directly, providing information and getting immediate feedback on potential fit. This creates a better founder experience while capturing richer initial data.

#### Step-by-Step Flow

**Discovery & Initiation**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 1 | Founder | Visits fund website | Looking to submit a deck |
| 2 | Founder | Finds "Share your startup" button | Prominent CTA |
| 3 | Founder | Clicks button | Chat interface opens |
| 4 | AI | Greets founder | "Hi! I'm [AI Name], an AI assistant for [Fund Name]. I can help you share your startup with our team and give you a quick sense of potential fit. Would you like to get started?" |
| 5 | Founder | "Yes" | Interaction begins |

**Information Gathering**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 6 | AI | Asks first question | "Great! Let's start with the basics. What's your company name and what do you do?" |
| 7 | Founder | Provides overview | Types or speaks response |
| 8 | AI | Follows up | "Got it. And what stage are you at? Have you raised funding before?" |
| 9 | Founder | "We're raising our Series A. Previously raised $2M seed." | |
| 10 | AI | Continues gathering | Questions about market, traction, team |
| 11 | AI | Requests deck | "This sounds interesting. Do you have a deck you can share?" |
| 12 | Founder | Uploads deck | Drag-and-drop or file picker |
| 13 | AI | Acknowledges | "Thanks! Give me a moment to review this..." |

**Immediate Feedback**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 14 | AI | Provides initial assessment | "Based on what you've shared, there's potential alignment with our focus areas. We primarily invest in B2B SaaS at Series A, which matches your profile." |
| 15 | AI | Sets expectations | "I've shared your information with our team. Typically, if there's interest, someone will reach out within a few days." |
| 16 | AI | Offers to answer questions | "Do you have any questions about [Fund Name] or our process?" |
| 17 | Founder | Asks question | "What sectors do you focus on?" |
| 18 | AI | Answers from fund knowledge | "We're generalists within B2B software, but have particular expertise in fintech and healthcare IT..." |

**Wrap-Up**

| Step | Actor | Action | Experience |
|------|-------|--------|------------|
| 19 | AI | Collects contact info | "What's the best email to reach you?" |
| 20 | Founder | Provides email | john@acme.com |
| 21 | AI | Confirms | "Perfect. I've created a profile for Acme and shared it with our team. You'll hear from us soon. Good luck!" |
| 22 | Founder | Closes chat | Positive experience—felt heard, got immediate feedback |

**Backend Processing**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 23 | AI | Creates deal record | All gathered information structured |
| 24 | AI | Parses uploaded deck | Standard deck processing |
| 25 | AI | Generates fit score | Based on conversation + deck |
| 26 | AI | Notifies analyst | "New inbound via website: Acme, Fit score 74" |

#### Founder Experience Principles

- **Immediate engagement**: No black hole of form submissions
- **Interactive**: Feels like a conversation, not a form
- **Feedback**: Gets sense of fit immediately
- **Efficient**: ~5 minutes instead of wondering for weeks
- **Human follow-up**: Still connects to real people

#### Guardrails (Same as Other Founder Flows)

- Clear AI identification
- No discussion of terms/valuation
- No commitments or promises
- Human follow-up for any serious interest

[DIAGRAM: Website embed flow showing landing → conversation → deck upload → feedback → deal creation]

---

## 5. Onboarding Journeys

### 5.1 Fund Onboarding (Week 1-2)

#### Narrative Overview

Onboarding a new fund is like hiring a new team member—it takes time for the AI to understand how the fund operates. This is a structured 1-2 week process that configures the platform to match the fund's unique workflows, imports historical context, and trains the team on working with their new AI colleague.

This investment in setup pays dividends: a well-configured AI becomes dramatically more useful than a generic one.

#### Step-by-Step Flow

**Day 1: Workspace Setup**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Admin | Creates fund workspace | New workspace initialized |
| 2 | Admin | Configures basic settings | Fund name, logo, domain |
| 3 | Admin | Invites team members | Invitation emails sent |
| 4 | Team | Accept invitations | Accounts created |
| 5 | Admin | Assigns roles | Partners, Associates, Analysts designated |
| 6 | AI | Introduces itself | Welcome message in workspace |

**AI Introduction (Warm personality):**
> "Welcome to [Fund Name]'s workspace! I'm [AI Name], and I'll be your AI teammate. Over the next couple of weeks, we'll get to know each other—I'll learn how you work, and you'll learn what I can do. Let's get started with some setup. First up: telling me about your investment thesis..."

**Day 2-3: Thesis Configuration**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 7 | Partner | Opens thesis configuration wizard | Guided setup flow |
| 8 | AI | Asks about stage focus | "What stages do you invest in?" |
| 9 | Partner | Selects: Series A, Series B | Preferences saved |
| 10 | AI | Asks about geography | "What's your geographic focus?" |
| 11 | Partner | Selects: US, Canada | Preferences saved |
| 12 | AI | Asks about check size | "What's your typical check size range?" |
| 13 | Partner | Enters: $5M - $15M | Preferences saved |
| 14 | AI | Asks about sectors | "Any sectors you focus on or avoid?" |
| 15 | Partner | Focus: B2B SaaS, Fintech. Avoid: Hardware, Crypto | Preferences saved |
| 16 | AI | Asks about soft preferences | "What matters most: team, market, or traction?" |
| 17 | Partner | Ranks: Team > Market > Traction | Weights configured |
| 18 | AI | Confirms configuration | "Got it. I'll use these criteria to score deals and prioritize what you see." |

**Day 4-5: Workflow & Pipeline Configuration**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 19 | Admin | Opens workflow configuration | Pipeline editor |
| 20 | Admin | Defines deal stages | Inbound → First Look → First Call → Deep Dive → Pre-IC → IC → DD → Close |
| 21 | Admin | Sets stage requirements | "Memo required before IC" |
| 22 | Admin | Configures assignments | "Round-robin for new inbound" |
| 23 | Admin | Sets automation rules | "Auto-decline if fit < 30 and hard constraint fail" |
| 24 | AI | Confirms workflow | "Workflow saved. I'll follow these stages and rules." |

**Day 6-7: Templates & Integrations**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 25 | Partner | Customizes memo template | Adjusts sections, order, required fields |
| 26 | Partner | Sets tone preference | "Sharp & efficient" selected |
| 27 | Admin | Connects CRM | Affinity OAuth flow |
| 28 | AI | Tests connection | "Connected to Affinity. I can sync deal stages and key metrics." |
| 29 | Admin | Connects calendar | Google Calendar OAuth |
| 30 | AI | Tests connection | "Calendar connected. I can see upcoming meetings and attach prep docs." |
| 31 | Admin | Sets up email forwarding | Configures deals@fund.com forwarding |
| 32 | AI | Tests intake | "Email forwarding working. Decks sent here will create deal records." |

**Week 2, Day 1-2: Historical Import**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 33 | Admin | Uploads historical deals | CSV export from previous system |
| 34 | AI | Processes import | Creates deal records, maps fields |
| 35 | AI | Reports results | "Imported 847 deals. 23 had missing data—I've flagged them for review." |
| 36 | Admin | Uploads historical memos | Folder of past IC memos |
| 37 | AI | Ingests documents | Learns fund's memo style and past decisions |
| 38 | Admin | Uploads thesis documents | Investment criteria, sector notes |
| 39 | AI | Processes knowledge base | "I've ingested 12 documents. This will help me understand your perspective." |

**Week 2, Day 3-4: Team Training**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 40 | Team | Joins training session | Walkthrough of key workflows |
| 41 | AI | Demonstrates capabilities | Live demo of deck processing, call summary, memo generation |
| 42 | Team | Practices with test deal | Hands-on experience |
| 43 | AI | Provides guidance | "Try asking me to generate a call prep for this deal" |
| 44 | Team | Asks questions | AI and onboarding team answer |

**Week 2, Day 5: Go Live**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 45 | Team | Begins using with real deals | First live inbound processed |
| 46 | AI | Processes first real deck | Creates deal record, scores fit |
| 47 | Analyst | Reviews AI work | Provides first corrections |
| 48 | AI | Learns from feedback | "Thanks for the correction. I'll remember that." |
| 49 | AI | Check-in message | "First week complete! I've processed 12 deals and learned from 8 corrections. Ready to keep improving." |

#### Onboarding Completion Checklist

- [ ] All team members have accounts and understand basic workflows
- [ ] Thesis config is captured and validated
- [ ] Deal stages and workflow rules are configured
- [ ] Memo template is customized
- [ ] At least one integration is connected (CRM or calendar)
- [ ] Historical deals are imported (if available)
- [ ] Knowledge base has core documents ingested
- [ ] Team has successfully processed at least 3-5 deals through the system

[DIAGRAM: Onboarding timeline showing Day 1-14 milestones and activities]

---

### 5.2 Individual User Onboarding

#### Narrative Overview

When a new team member joins an already-configured fund, their onboarding is simpler but still intentional. The AI introduces itself, learns the user's preferences, and guides them through their first tasks. Within a day, the new user should feel comfortable working with their AI teammate.

#### Step-by-Step Flow

**First Login**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | New User | Accepts invitation email | Clicks link to create account |
| 2 | New User | Creates password, logs in | Enters workspace |
| 3 | AI | Greets new user | Personal welcome |

**AI Welcome (Warm personality):**
> "Hey Sarah! Welcome to [Fund Name]. I'm [AI Name], the team's AI assistant. I've been working with the fund for a few months now, so I know the thesis, the workflows, and all the deals. Think of me as your always-available colleague who never forgets anything. Want me to show you around?"

**Guided Tour**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 4 | New User | "Yes, show me around" | Tour begins |
| 5 | AI | Shows conversational home | "This is where we'll chat. Ask me anything—about a deal, the pipeline, or how to do something." |
| 6 | AI | Shows deal workspace | "When you're looking at a deal, I'll be right here in the sidebar. Ask me to summarize, research, or draft something." |
| 7 | AI | Shows command bar | "Press Cmd+K anytime to search or give me commands. Try typing 'show me recent deals'." |
| 8 | New User | Tries command bar | Recent deals appear |
| 9 | AI | Shows voice input | "You can also talk to me. Tap this mic icon or just start speaking." |

**Preference Setup**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 10 | AI | Asks about preferences | "A few quick questions to personalize your experience..." |
| 11 | AI | Notification preferences | "How do you want me to notify you? Real-time, daily digest, or only urgent items?" |
| 12 | New User | Selects preference | "Daily digest for most things, real-time for my deals" |
| 13 | AI | Personality preference | "The fund uses 'Sharp & efficient' as default, but you can adjust. Want to try a different style?" |
| 14 | New User | Keeps default | "Sharp is fine" |
| 15 | AI | Confirms | "Great. You're all set. I'm here whenever you need me." |

**First Task**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 16 | AI | Suggests first task | "You have 2 deals assigned to you. Want to start with TechCo? I can give you a quick briefing." |
| 17 | New User | "Yes, brief me on TechCo" | AI provides summary |
| 18 | AI | Summarizes deal | Key facts, current status, pending actions |
| 19 | New User | Asks follow-up | "What's the main concern with this deal?" |
| 20 | AI | Answers from context | "The main risk flagged is long sales cycles. Marcus noted this after the first call." |
| 21 | New User | Continues working | Now comfortable with basic interactions |

#### Touchpoints Over First Week

| Day | AI Behavior |
|-----|-------------|
| Day 1 | Welcome, tour, first tasks |
| Day 2 | "How did yesterday go? Any questions about how things work?" |
| Day 3 | Proactive tip: "Did you know you can ask me to draft emails? Just say 'draft a follow-up to [founder]'" |
| Day 5 | Check-in: "You've processed 8 deals this week! Any feedback on how I can be more helpful?" |

[DIAGRAM: New user journey from invite → first login → tour → preferences → first task]

---

## 6. Steady-State Journeys

### 6.1 Analyst Steady-State

#### Narrative Overview

After months of working with the AI, the analyst's workflow has transformed. Tasks that once consumed hours happen automatically. The AI anticipates needs, surfaces relevant information proactively, and handles routine work without being asked. The analyst's role has elevated from data entry to strategic support.

This journey illustrates what "normal" looks like once the AI is fully integrated into daily work.

#### A Typical Steady-State Day

**Morning Routine (Streamlined)**

| Time | Activity | AI Role |
|------|----------|---------|
| 8:00 AM | Opens app | AI has already processed 3 overnight decks, scored them, and prepared a prioritized list |
| 8:05 AM | Reviews AI briefing | "2 deals worth a look. 1 auto-passed (wrong stage). Marcus's call yesterday is summarized—want to see it?" |
| 8:15 AM | Quick scan of new deals | Spends 2 min each on AI-prepared summaries instead of 30 min parsing raw decks |
| 8:30 AM | Schedules one first call | AI drafts invite, proposes times, sends on approval |
| 8:35 AM | Done with morning intake | Previously took until 10 AM |

**Calls (Enhanced)**

| Time | Activity | AI Role |
|------|----------|---------|
| 10:00 AM | Upcoming call with Founder A | AI prepped call doc yesterday, analyst reviews in 3 minutes |
| 10:30 AM | Call starts | AI joins, records, tags key moments in real-time |
| 11:15 AM | Call ends | Summary available 5 minutes later |
| 11:20 AM | Reviews summary | 2 quick corrections, approves |
| 11:25 AM | "Move to Deep Dive" | AI updates stage, creates checklist, starts researching gaps |

**Research & Memos (Transformed)**

| Time | Activity | AI Role |
|------|----------|---------|
| 2:00 PM | Need competitive analysis for Deal X | "Find competitors to Deal X in the procurement space" |
| 2:02 PM | AI returns analysis | 5 competitors with summaries, funding history, differentiation |
| 2:15 PM | Memo needed for upcoming IC | AI has been building draft progressively; 80% complete |
| 2:20 PM | Reviews draft | Adds 2 paragraphs of personal insight, adjusts market section |
| 2:45 PM | Memo finalized | Previously would have taken 3+ hours |

**End of Day (Effortless)**

| Time | Activity | AI Role |
|------|----------|---------|
| 5:30 PM | "What needs my attention?" | AI: "CloudCo hasn't responded in 5 days. DataFlow memo needs partner review. Tomorrow you have 2 calls." |
| 5:35 PM | "Follow up on CloudCo" | AI sends follow-up email |
| 5:40 PM | "Ping Marcus about DataFlow" | AI notifies partner |
| 5:45 PM | Done for the day | Pipeline is clean, nothing forgotten |

#### Key Steady-State Behaviors

| Before AI | After AI (Steady State) |
|-----------|-------------------------|
| 30-60 min parsing each new deck | 2-3 min reviewing AI summary |
| 30+ min writing call summaries | 5 min reviewing AI summary |
| 3+ hours writing IC memo | 30-45 min editing AI draft |
| Manual CRM updates | Automatic sync |
| Things falling through cracks | AI-powered reminders |
| Context scattered across tools | Everything in one place |

#### AI Anticipation Examples

The AI doesn't just respond—it anticipates:

- "You have a call with Acme tomorrow. Based on last call, you wanted to probe on unit economics. I've added that to the prep doc."
- "It's been 10 days since the IC approved DataFlow for DD. 3 of 5 checklist items are complete. Want me to ping the founder about the outstanding docs?"
- "I noticed you always add a 'team composition' section to memos. I've started including it by default."

[DIAGRAM: Steady-state analyst day showing time savings at each workflow step]

---

### 6.2 Partner Steady-State

#### Narrative Overview

For partners, the steady-state experience is defined by leverage—the ability to stay informed and make decisions without being bottlenecked by information gathering. The AI becomes a trusted extension of their attention, surfacing what matters and providing instant context on demand.

Voice and mobile become primary interfaces. The partner can be fully effective without ever opening a laptop.

#### A Typical Steady-State Day

**Morning Commute (Full Briefing)**

| Time | Activity | AI Role |
|------|----------|---------|
| 7:30 AM | Taps voice in car | AI activates |
| Partner | "Catch me up" | |
| AI | Provides audio briefing | "Morning. Three things: First, Sarah's recommending we pass on TechFlow—market timing concern. I agree, fit score dropped to 45 after yesterday's call. Second, Acme DD is 80% complete—references are positive. Third, you have board prep due for Portfolio Co tomorrow." |
| Partner | "Tell me more about the TechFlow decision" | |
| AI | Expands | "The founder revealed they're pivoting from enterprise to SMB. That's a major strategy shift, and their enterprise traction was the main appeal. Sarah's call notes say..." |
| Partner | "Fine, approve the pass" | |
| AI | "Done. Pass recorded, Sarah notified." | |

**Between Meetings (Quick Decisions)**

| Time | Activity | AI Role |
|------|----------|---------|
| 11:45 AM | Push notification | "DataFlow memo ready for IC. Review now?" |
| Partner | Taps notification | Opens memo on mobile |
| Partner | Skims memo (5 min) | AI-generated summary section first |
| Partner | Adds voice comment | "Market size section feels thin. Sarah, can you validate the TAM?" |
| AI | Creates comment, notifies Sarah | Comment thread started |

**Lunch Meeting Follow-up**

| Time | Activity | AI Role |
|------|----------|---------|
| 1:30 PM | Met founder at event | Wants to check if fund has seen them before |
| Partner | Voice query | "Have we seen anything from a company called NovaTech?" |
| AI | Searches fund history | "Yes. NovaTech submitted a deck 8 months ago. Sarah reviewed and passed—too early stage at the time. They've since raised a seed round. Want me to pull up the old record?" |
| Partner | "Yes, and see if Sarah wants to reconnect" | |
| AI | Opens record, drafts note to Sarah | "Sarah—Marcus met NovaTech founder at lunch. They've raised since we last saw them. Worth another look?" |

**Evening Review**

| Time | Activity | AI Role |
|------|----------|---------|
| 8:00 PM | Quick check on phone | Glances at app |
| AI | Evening summary | "Quiet evening. Sarah scheduled 2 first calls for this week. Acme DD on track. No urgent items." |
| Partner | Closes app | Nothing needs attention tonight |

#### Key Steady-State Behaviors

| Need | Partner Action | AI Response |
|------|----------------|-------------|
| Understand a deal quickly | "Brief me on X" | 30-second verbal summary |
| Make a decision | "Approve/Pass on X" | Instant execution |
| Find historical context | "Have we seen X before?" | Full history search |
| Prepare for a meeting | Opens notification | Call prep ready |
| Stay informed | Passive | AI surfaces only what matters |

#### Trust & Confidence

By steady state, partners trust the AI because:

- **Accuracy**: AI summaries match reality; corrections have been minimal
- **Judgment**: AI escalates appropriately; doesn't bother with low-priority items
- **Memory**: AI remembers everything; partner can rely on it for historical context
- **Speed**: Instant responses; no waiting for analysts to research

[DIAGRAM: Partner steady-state touchpoints throughout the day—mobile-centric view]

---

## 7. Error & Edge Case Journeys

### 7.1 AI Error → Correction Flow

#### Narrative Overview

The AI won't always be right. Metrics might be misheard from a call, context might be misunderstood, or extraction might fail on a poorly formatted deck. The system is designed to make corrections easy and valuable—every correction improves future performance.

#### Step-by-Step Flow

**Error Discovery**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Analyst | Reviews call summary | Reads AI-generated content |
| 2 | Analyst | Spots error | "MRR is listed as $500K but founder said $450K" |

**Inline Correction**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 3 | Analyst | Clicks on incorrect metric | Edit interface appears |
| 4 | Analyst | Types correct value | "$450K" |
| 5 | AI | Prompts for context (optional) | "Want to note why this was wrong? (Helps me learn)" |
| 6 | Analyst | Adds note | "Misheard—check transcript at 23:45" |
| 7 | AI | Confirms correction | "Updated. This change will apply to the summary, deal record, and any synced systems." |

**Propagation**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 8 | AI | Updates call summary | MRR changed to $450K |
| 9 | AI | Updates deal record | MRR field updated |
| 10 | AI | Updates CRM (if synced) | Affinity record updated |
| 11 | AI | Logs correction | Correction recorded with context for learning |

**Learning Application**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 12 | AI | Analyzes correction pattern | Identifies that this type of error occurs in noisy audio |
| 13 | AI | Adjusts confidence | Future similar extractions marked "Medium confidence—verify" |
| 14 | AI | (Over time) | Pattern learning improves extraction accuracy |

#### AI Behavior Highlights

- **Easy correction**: One click to fix any AI output
- **Full propagation**: Correction applies everywhere automatically
- **Learning capture**: Corrections feed back into improvement
- **No defensiveness**: AI accepts corrections gracefully
- **Personality example (Warm)**: "Thanks for catching that! I've updated everything. I'll be more careful with audio quality issues."

[DIAGRAM: Correction flow showing error → fix → propagation → learning]

---

### 7.2 Founder Declines AI

#### Narrative Overview

Not every founder will be comfortable interacting with an AI. The system must handle opt-outs gracefully, ensuring the founder feels respected and the deal continues through human channels.

#### Step-by-Step Flow

**Scenario A: Declines AI Email**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Founder | Receives AI email | Sees AI identification |
| 2 | Founder | Replies: "I'd prefer to speak with a person" | Opt-out expressed |
| 3 | AI | Acknowledges immediately | "Absolutely understood. I'll have Sarah from our team reach out to you directly." |
| 4 | AI | Notifies analyst | "Acme founder prefers human contact. Deal marked for manual outreach." |
| 5 | AI | Updates deal record | Flag: "Founder prefers human communication" |
| 6 | Analyst | Reaches out personally | Seamless handoff |
| 7 | AI | Remembers preference | Will not initiate AI contact with this founder again |

**Scenario B: Opts Out During AI Call**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | AI + Founder | In AI-led call | Conversation underway |
| 2 | Founder | "Actually, I'd rather talk to a real person" | Opt-out during call |
| 3 | AI | Responds gracefully | "Of course, I completely understand. I'll wrap up here and have Sarah call you. Is there a good time?" |
| 4 | Founder | "Tomorrow afternoon works" | Preference captured |
| 5 | AI | Confirms | "Perfect. Sarah will reach out tomorrow afternoon. Thanks for your time today, and sorry for any inconvenience." |
| 6 | AI | Ends call | Polite close |
| 7 | AI | Creates handoff package | Summary of conversation so far, founder preference, scheduling note |
| 8 | AI | Notifies analyst | "Acme founder opted out of AI call. Partial notes attached. They're available tomorrow afternoon." |

**Scenario C: Declines via Website**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Founder | Interacting with website embed | Conversation started |
| 2 | Founder | "Is there a way to just submit my deck normally?" | Preference for traditional flow |
| 3 | AI | Offers alternative | "Of course! You can upload your deck here, and our team will review it directly. No AI conversation needed." |
| 4 | Founder | Uploads deck | Deck received |
| 5 | AI | Confirms | "Thanks! Your deck has been submitted. You'll hear from our team if there's interest." |
| 6 | AI | Creates deal record | Marked as "Submitted via website (opted out of AI intake)" |

#### Key Principles

- **Immediate respect**: Opt-out honored instantly, no pushback
- **Graceful language**: "Of course," "Absolutely," "I completely understand"
- **Smooth handoff**: Human has all context to continue
- **Memory**: Preference stored—AI won't try again
- **No penalty**: Deal proceeds normally through human channels

[DIAGRAM: Opt-out paths showing different scenarios and handoff flows]

---

### 7.3 Integration Failure

#### Narrative Overview

External integrations (CRM, calendar, transcription) can fail. The system must degrade gracefully, notify users clearly, and provide manual fallbacks so work can continue.

#### Step-by-Step Flow

**Scenario: CRM Sync Fails**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | AI | Attempts to sync deal to Affinity | API call fails |
| 2 | AI | Retries (automatic) | 2 more attempts, still failing |
| 3 | AI | Logs error | Error details captured for debugging |
| 4 | AI | Notifies user | "I couldn't sync Acme to Affinity. The connection might be down. Data is saved here—I'll retry automatically." |
| 5 | Analyst | Sees notification | Understands issue, not blocked |
| 6 | AI | Continues retrying (background) | Every 30 minutes |
| 7 | — | Sync succeeds later | AI notifies: "Affinity sync restored. All pending updates applied." |

**Scenario: Transcript Upload Fails**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Analyst | Uploads call recording | File received |
| 2 | AI | Attempts transcription | Service unavailable |
| 3 | AI | Notifies user | "Transcription service is temporarily unavailable. I've saved the recording—want me to retry in an hour, or can you upload a transcript directly?" |
| 4 | Analyst | "Retry in an hour" | AI schedules retry |
| 5 | — | One hour later | AI retries, succeeds, notifies analyst |

**Scenario: Calendar Integration Lost**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | AI | Detects calendar disconnection | OAuth token expired |
| 2 | AI | Notifies admin | "Calendar integration disconnected. I can't see upcoming meetings until it's reconnected." |
| 3 | AI | Shows status in settings | Integration status: "Disconnected—action required" |
| 4 | Admin | Reconnects calendar | OAuth flow completed |
| 5 | AI | Confirms | "Calendar reconnected. I can see your meetings again." |

#### Fallback Capabilities

| Integration | Failure Impact | Fallback |
|-------------|----------------|----------|
| CRM | Can't sync deal data | Data stored locally, retry queue, manual export option |
| Calendar | Can't auto-attach prep docs | Manual deal-meeting linking |
| Transcription | Can't generate summaries | Manual transcript upload or paste |
| Email | Can't send founder emails | Draft provided for manual send |

#### Key Principles

- **No silent failures**: Always notify user of issues
- **Graceful degradation**: Core functionality continues
- **Automatic retry**: System recovers without user intervention when possible
- **Clear status**: Users can see integration health at any time
- **Manual fallbacks**: Always a way to work around failures

[DIAGRAM: Integration failure handling showing detection → notification → fallback → recovery]

---

### 7.4 Conflicting Information

#### Narrative Overview

Information about a deal can come from multiple sources: deck, calls, emails, founder website. Sometimes these sources contradict each other. The AI must surface conflicts rather than silently picking one version.

#### Step-by-Step Flow

**Conflict Detection**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | AI | Processes call transcript | Extracts metrics |
| 2 | AI | Compares to existing data | Detects discrepancy |
| 3 | AI | Flags conflict | MRR: Deck says $380K, Call says $450K |
| 4 | AI | Notifies user | "I found a discrepancy: MRR was $380K in the deck but $450K on the call. Which should I use?" |

**Resolution Flow**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 5 | Analyst | Reviews conflict | Sees both values with sources |
| 6 | Analyst | Selects correct value | Chooses $450K (more recent) |
| 7 | Analyst | Adds context (optional) | "Deck was from 2 months ago; MRR has grown" |
| 8 | AI | Confirms selection | "Got it. Using $450K as the current MRR. I've noted the deck had older data." |
| 9 | AI | Updates all records | Single source of truth established |
| 10 | AI | Logs decision | Audit trail: who resolved, when, reasoning |

**Conflict Types & Handling**

| Conflict Type | Example | Resolution Approach |
|---------------|---------|---------------------|
| Deck vs Call | MRR mismatch | Ask user, usually call is more recent |
| Multiple sources | Two partners noted different things | Surface both, let user reconcile |
| AI vs Human | AI extracted $500K, human entered $450K | Flag, human entry typically wins |
| App vs CRM | Stage mismatch | Based on sync rules, surface discrepancy |

**Proactive Conflict Dashboard**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 11 | Analyst | Opens pipeline view | Sees conflict indicators |
| 12 | AI | Shows conflict count | "3 deals have unresolved data conflicts" |
| 13 | Analyst | Clicks to review | List of conflicts with context |
| 14 | Analyst | Resolves each | Quick resolution flow |

#### Key Principles

- **Surface, don't hide**: Never silently pick one version
- **Show sources**: Clear attribution for each conflicting value
- **Easy resolution**: One-click selection with optional context
- **Audit trail**: All resolutions logged
- **Learn from patterns**: If deck data is often outdated, adjust confidence weighting

[DIAGRAM: Conflict detection and resolution flow]

---

### 7.5 Sensitive Topic Escalation

#### Narrative Overview

During founder interactions, certain topics are off-limits for the AI: valuation, terms, legal matters, personnel issues. When a founder raises these topics, the AI must recognize them, deflect gracefully, and escalate to humans with full context.

#### Step-by-Step Flow

**Scenario: Founder Asks About Valuation**

| Step | Actor | Action | AI Response |
|------|-------|--------|-------------|
| 1 | Founder | "What valuation range are you thinking?" | Sensitive topic detected |
| 2 | AI | Deflects gracefully | "Valuation is something our partners would discuss with you directly once we're further along in the process. I'm focused on gathering operational information today." |
| 3 | Founder | "Can you give me a rough sense?" | Pushes slightly |
| 4 | AI | Maintains boundary | "I really can't speak to that—it's outside my scope. But I can make sure the team knows you'd like to discuss it. For now, shall we continue with the other questions?" |
| 5 | Founder | "OK, let's continue" | Conversation proceeds |
| 6 | AI | Logs escalation | "Founder asked about valuation—deflected, flagged for partner follow-up" |

**Scenario: Founder Raises Legal Concern**

| Step | Actor | Action | AI Response |
|------|-------|--------|-------------|
| 1 | Founder | "We have some IP litigation pending—is that a problem?" | Sensitive topic detected |
| 2 | AI | Acknowledges, escalates | "Thanks for mentioning that. Legal matters are something our team would want to understand directly. I'll flag this for follow-up, and someone will reach out to discuss." |
| 3 | AI | Notes but doesn't probe | Does not ask for details about litigation |
| 4 | AI | Continues with other topics | "In the meantime, let me continue with the other questions..." |
| 5 | AI | Creates escalation | Alert to analyst with context |

**Scenario: Founder Gets Frustrated**

| Step | Actor | Action | AI Response |
|------|-------|--------|-------------|
| 1 | Founder | "This is ridiculous—I want to talk to a real person" | Frustration expressed |
| 2 | AI | Immediate accommodation | "I completely understand, and I apologize for any frustration. Let me connect you with Sarah from our team. Is there a good time for her to call?" |
| 3 | Founder | "Today if possible" | Urgency noted |
| 4 | AI | Confirms | "I'll have Sarah reach out today. Thank you for your patience." |
| 5 | AI | High-priority notification | "URGENT: Acme founder frustrated, requested human contact immediately" |
| 6 | Analyst | Calls founder within hour | Relationship preserved |

**Sensitive Topic Categories**

| Category | Examples | AI Behavior |
|----------|----------|-------------|
| Valuation/Terms | Price, ownership, terms | Deflect, flag for partner |
| Legal | IP, litigation, contracts | Acknowledge, don't probe, escalate |
| HR/Personnel | Layoffs, team conflicts | Acknowledge, don't probe, escalate |
| Competitive | Other VCs considering | Note but don't dig |
| Personal | Founder personal matters | Express empathy, redirect |

**Escalation Package**

When escalating, AI provides:
- What the founder said (exact quote if available)
- Context of the conversation
- Recommended follow-up action
- Urgency level (normal, elevated, urgent)

#### Key Principles

- **Clear boundaries**: AI knows what's off-limits
- **Graceful deflection**: Never makes founder feel interrogated
- **Immediate human access**: Founder can always reach a person
- **Full context handoff**: Human has everything needed to continue
- **Learning**: Escalation patterns inform training

[DIAGRAM: Escalation decision tree showing topic detection → deflection → escalation → handoff]

---

## Appendix: Journey Cross-Reference

### Journeys by Persona

| Journey | Analyst | Partner | Founder |
|---------|---------|---------|---------|
| Day-in-the-Life | Primary | Primary | — |
| Deal Lifecycle | Primary | Secondary | Touchpoints |
| Deck → Deal | Primary | Notification | Trigger |
| Call → Summary | Primary | Consumer | Participant |
| Deal → Memo | Primary | Reviewer | — |
| Founder Info Gathering | Approver | — | Primary |
| IC Meeting | Participant | Primary | — |
| Founder Email | — | — | Primary |
| Founder Call | — | — | Primary |
| Website Embed | — | — | Primary |
| Onboarding (Fund) | Participant | Primary | — |
| Onboarding (User) | Primary | Primary | — |
| Steady State | Primary | Primary | — |
| Error Flows | Primary | Secondary | Occasional |

### Journeys by AI Capability

| AI Capability | Relevant Journeys |
|---------------|-------------------|
| Deck Parsing | Deck → Deal, Website Embed |
| Fit Scoring | Deck → Deal, Deal Lifecycle |
| Call Recording | Call → Summary, IC Meeting |
| Summarization | Call → Summary, IC Meeting |
| Memo Generation | Deal → Memo |
| Research | Day-in-the-Life, Deal Lifecycle |
| Founder Interaction | Founder Info Gathering, Email, Call, Website |
| Voice Interface | Partner Day-in-the-Life, Mobile usage |
| Learning | Error Correction, Steady State |

---

*Document version: v0.1*
*Last updated: [Date]*
