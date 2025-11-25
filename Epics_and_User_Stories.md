# Epics & User Stories: AI Analyst/Associate for VC

**Document owner:** Sahil
**Version:** v0.1
**Related documents:** AI_Associate_Full_PRD.md, User_Journeys.md

---

## Table of Contents

1. [Epics Overview](#epics-overview)
2. [E1: Deal Intake & Triage](#e1-deal-intake--triage)
3. [E2: Call Management](#e2-call-management)
4. [E3: Memo Generation](#e3-memo-generation)
5. [E4: Founder Interaction](#e4-founder-interaction)
6. [E5: Ask-the-Analyst](#e5-ask-the-analyst)
7. [E6: IC Meeting Support](#e6-ic-meeting-support)
8. [E7: Pipeline & Deal Management](#e7-pipeline--deal-management)
9. [E8: Collaboration](#e8-collaboration)
10. [E9: Notifications & Alerts](#e9-notifications--alerts)
11. [E10: Configuration & Settings](#e10-configuration--settings)
12. [E11: Onboarding](#e11-onboarding)
13. [E12: Error Handling & Recovery](#e12-error-handling--recovery)
14. [Appendix: Story Summary](#appendix-story-summary)

---

## Epics Overview

| Epic | Description | Stories | P0 | P1 | P2 |
|------|-------------|---------|----|----|-----|
| **E1: Deal Intake & Triage** | Deck processing, deal creation, fit scoring, auto-routing | 12 | 8 | 3 | 1 |
| **E2: Call Management** | Call prep, recording, transcription, summarization | 10 | 7 | 2 | 1 |
| **E3: Memo Generation** | AI-drafted memos, editing, versioning, citations | 9 | 6 | 2 | 1 |
| **E4: Founder Interaction** | AI email, AI calls, website embed, guardrails | 11 | 5 | 4 | 2 |
| **E5: Ask-the-Analyst** | Chat interface, voice input, research queries, actions | 10 | 6 | 3 | 1 |
| **E6: IC Meeting Support** | Meeting recording, decision capture, post-IC actions | 7 | 4 | 2 | 1 |
| **E7: Pipeline & Deal Management** | Deal workspace, pipeline views, stage management | 11 | 8 | 2 | 1 |
| **E8: Collaboration** | Comments, mentions, activity feeds | 8 | 4 | 3 | 1 |
| **E9: Notifications & Alerts** | Push, email, in-app notifications, digests | 8 | 5 | 2 | 1 |
| **E10: Configuration & Settings** | Thesis config, workflow setup, templates, integrations | 10 | 6 | 3 | 1 |
| **E11: Onboarding** | Fund setup, user onboarding, guided tours | 8 | 5 | 2 | 1 |
| **E12: Error Handling & Recovery** | Corrections, conflicts, fallbacks | 9 | 6 | 2 | 1 |
| **TOTAL** | | **113** | **70** | **30** | **13** |

---

## E1: Deal Intake & Triage

**Epic Description:** Enable deals to enter the system through multiple channels (email, upload, link) and be automatically processed, scored, and routed.

**Source:** PRD Section 7.1, User Journey 3.1

---

#### E1-S01: Upload Deck via File

**Story:** As an Analyst, I want to upload a pitch deck file so that a deal record is created automatically.

**Priority:** P0 | **Size:** M | **Depends on:** None

**Acceptance Criteria:**
- User can drag-and-drop PDF or PPTX files onto upload area
- User can click to browse and select files
- Upload progress indicator displays during upload
- Maximum file size: 50MB
- Success confirmation appears when upload completes
- Error message displays for unsupported file types

**Notes:** Support PDF, PPTX, Google Slides export. Consider batch upload for multiple decks.

---

#### E1-S02: Upload Deck via Link

**Story:** As an Analyst, I want to paste a DocSend or Google Drive link so that the deck is fetched and processed automatically.

**Priority:** P0 | **Size:** M | **Depends on:** None

**Acceptance Criteria:**
- User can paste URL into link input field
- System recognizes DocSend, Google Drive, Dropbox links
- System fetches document from link
- Progress indicator shows fetch status
- Error message if link is inaccessible or requires authentication

**Notes:** May require OAuth for some providers. Handle password-protected DocSend links.

---

#### E1-S03: Forward Deck via Email

**Story:** As an Analyst, I want to forward an intro email with deck to a dedicated address so that a deal is created from the email.

**Priority:** P0 | **Size:** L | **Depends on:** E10-S07 (Email integration)

**Acceptance Criteria:**
- Given an email with deck attachment is forwarded to deals@[fund].ai
- When the system processes the email
- Then:
  - Deal record is created
  - Attachment is extracted and processed
  - Referrer is parsed from email intro text
  - Original sender is captured as source

**Notes:** Parse "intro" patterns to identify referrer. Handle multiple attachments.

---

#### E1-S04: AI Deck Parsing

**Story:** As an Analyst, I want the AI to automatically parse deck content so that key information is extracted into structured fields.

**Priority:** P0 | **Size:** XL | **Depends on:** E1-S01 or E1-S02 or E1-S03

**Acceptance Criteria:**
- Given a deck has been uploaded
- When AI processing completes (target: < 60 seconds)
- Then the following sections are extracted:
  - Company name and description
  - Problem statement
  - Solution/Product
  - Market size (TAM/SAM/SOM if present)
  - Business model
  - Traction metrics
  - Team members and backgrounds
  - Funding ask
  - Key metrics (MRR, ARR, growth rate, etc.)
- Each extraction includes source slide reference
- Confidence level indicated for each extraction

**Notes:** Use slide-level citations. Flag low-confidence extractions for review.

---

#### E1-S05: Fit Score Generation

**Story:** As an Analyst, I want the AI to generate a fit score against our thesis so that I can quickly prioritize deals.

**Priority:** P0 | **Size:** L | **Depends on:** E1-S04, E10-S01 (Thesis config)

**Acceptance Criteria:**
- Given deck parsing is complete and thesis config exists
- When fit scoring runs
- Then:
  - Fit score (0-100) is generated
  - Score rationale explains key factors
  - Hard constraint violations are flagged (wrong stage, excluded sector, etc.)
  - Soft preference matches are weighted and explained
  - Score is displayed prominently on deal record

**Notes:** Rationale should cite specific thesis criteria. Show breakdown by category (team, market, traction).

---

#### E1-S06: Deal Enrichment

**Story:** As an Analyst, I want the AI to automatically enrich deals with external data so that I have more context without manual research.

**Priority:** P0 | **Size:** L | **Depends on:** E1-S04

**Acceptance Criteria:**
- Given a deal record exists
- When enrichment runs (automatically after parsing)
- Then the following are gathered:
  - Team LinkedIn profiles and backgrounds
  - Company website analysis
  - Crunchbase funding history
  - News mentions (last 12 months)
  - Basic competitor identification (3-5 companies)
- Each enrichment item includes source link
- "Last enriched" timestamp displayed

**Notes:** Enrichment should be incremental—don't re-fetch unchanged data.

---

#### E1-S07: Duplicate Detection

**Story:** As an Analyst, I want the system to detect potential duplicate deals so that I don't create redundant records.

**Priority:** P0 | **Size:** M | **Depends on:** E1-S04

**Acceptance Criteria:**
- Given a new deal is being created
- When company name or domain matches existing deal
- Then:
  - Warning is displayed: "This may be a duplicate of [Deal Name]"
  - User can view existing deal
  - User can choose to merge or create separate record
  - If merged, new materials are added to existing deal

**Notes:** Match on company name, domain, and founder names. Allow fuzzy matching.

---

#### E1-S08: Manual Deal Creation

**Story:** As an Analyst, I want to manually create a deal record so that I can track deals that arrive outside normal channels.

**Priority:** P0 | **Size:** S | **Depends on:** E7-S01 (Deal data model)

**Acceptance Criteria:**
- User can click "Add Deal" to open creation form
- Required fields: Company name
- Optional fields: Description, website, source, referrer, stage
- Deal is created immediately on save
- User can attach deck after creation

**Notes:** Minimal friction—only company name required to start.

---

#### E1-S09: Deal Source Tracking

**Story:** As an Analyst, I want to record where each deal came from so that we can track source quality over time.

**Priority:** P1 | **Size:** M | **Depends on:** E7-S01

**Acceptance Criteria:**
- Every deal has source fields:
  - Source type (Inbound, Referral, Outbound, Event, Portfolio intro)
  - Referrer (person or firm)
  - Intro path (chain of introductions)
  - Original submitter
  - Submission date
- Source fields can be edited after creation
- Source is auto-populated from email parsing when possible

**Notes:** Source data feeds into analytics for referrer quality tracking.

---

#### E1-S10: Auto-Routing Rules

**Story:** As a Partner, I want deals to be automatically assigned based on rules so that the right person sees the right deals.

**Priority:** P1 | **Size:** M | **Depends on:** E1-S05, E10-S03

**Acceptance Criteria:**
- Admin can configure assignment rules:
  - By sector (fintech → Sarah)
  - By source (partner referrals → partner's analyst)
  - By fit score (high scores → senior analyst)
  - Round-robin for unmatched
- Rules are evaluated in priority order
- Assigned owner is notified
- Assignment can be manually overridden

**Notes:** Start with simple rules; complex logic in V2.

---

#### E1-S11: Auto-Decline for Low Fit

**Story:** As an Analyst, I want obviously poor-fit deals to be auto-declined so that I don't waste time on them.

**Priority:** P1 | **Size:** M | **Depends on:** E1-S05, E10-S04

**Acceptance Criteria:**
- Given automation rules are configured (e.g., "auto-decline if fit < 30 AND hard constraint fail")
- When a deal matches auto-decline criteria
- Then:
  - AI sends decline email using fund template
  - Deal is marked "Passed - Auto"
  - Activity is logged with reason
  - No analyst review required
- Auto-decline can be disabled per deal or globally

**Notes:** Decline emails should be professional and leave door open. Log for audit.

---

#### E1-S12: Intake Notification

**Story:** As an Analyst, I want to be notified when new deals are assigned to me so that I can review them promptly.

**Priority:** P2 | **Size:** S | **Depends on:** E1-S10, E9-S01

**Acceptance Criteria:**
- When a deal is assigned to user
- User receives notification (in-app and/or push based on preferences)
- Notification includes: Company name, fit score, source
- Tapping notification opens deal workspace

**Notes:** Batch notifications for high-volume periods (e.g., "5 new deals this morning").

---

## E2: Call Management

**Epic Description:** Support the full lifecycle of founder calls—from preparation through recording to post-call summarization.

**Source:** PRD Section 7.2-7.3, User Journey 3.2

---

#### E2-S01: Call Prep Generation

**Story:** As an Analyst, I want the AI to generate a call prep document so that I'm prepared for founder calls.

**Priority:** P0 | **Size:** L | **Depends on:** E1-S04, E1-S06

**Acceptance Criteria:**
- Given a call is scheduled with a deal
- When user requests call prep (or auto-generated before call)
- Then call prep document includes:
  - Company overview (who they are, what they do)
  - Thesis fit hypothesis
  - Key questions to ask (based on gaps and concerns)
  - Risks and concerns to probe
  - Suggested agenda
- Each section cites sources (deck slides, enrichment data)
- User can edit and add custom questions

**Notes:** Auto-generate 24 hours before scheduled call if calendar integrated.

---

#### E2-S02: AI Note-Taker Join

**Story:** As an Analyst, I want the AI to join my video calls so that the conversation is recorded and transcribed.

**Priority:** P0 | **Size:** XL | **Depends on:** E10-S08 (Calendar integration)

**Acceptance Criteria:**
- Given a call is scheduled and linked to a deal
- When the call time arrives
- Then:
  - AI bot joins the video call (Zoom, Google Meet)
  - Bot appears as "[Fund Name] AI" in participant list
  - Bot announces presence and requests recording consent
  - Audio is recorded throughout call
  - Recording consent is captured

**Notes:** Implement via Zoom/Meet APIs. Handle consent carefully—some jurisdictions require all-party consent.

---

#### E2-S03: Call Transcription

**Story:** As an Analyst, I want the call to be automatically transcribed so that I have a searchable record of the conversation.

**Priority:** P0 | **Size:** L | **Depends on:** E2-S02

**Acceptance Criteria:**
- Given a call recording exists
- When transcription processing completes
- Then:
  - Full transcript is generated with speaker labels
  - Timestamps are included for each segment
  - Transcript is attached to deal record
  - Transcript is searchable

**Notes:** Speaker diarization important for identifying founder vs analyst. Target transcription within 10 minutes of call end.

---

#### E2-S04: Manual Transcript Upload

**Story:** As an Analyst, I want to upload a transcript manually so that calls recorded outside the system can be processed.

**Priority:** P0 | **Size:** S | **Depends on:** None

**Acceptance Criteria:**
- User can upload transcript file (TXT, VTT, SRT)
- User can paste transcript text directly
- System processes uploaded transcript same as auto-generated
- Call summary generation works on uploaded transcripts

**Notes:** Fallback for when AI note-taker can't join or external recording used.

---

#### E2-S05: Call Summary Generation

**Story:** As an Analyst, I want the AI to generate a structured call summary so that key information is captured without manual note-taking.

**Priority:** P0 | **Size:** XL | **Depends on:** E2-S03 or E2-S04

**Acceptance Criteria:**
- Given a transcript exists
- When summary generation completes (target: < 5 minutes)
- Then summary includes:
  - Key learnings (3-5 bullet points)
  - Metrics discussed (table with values, sources, confidence)
  - Risks and concerns identified
  - Open questions remaining
  - Recommended next steps
  - Overall recommendation (proceed/pass/need more info)
- Each point cites transcript timestamps
- Summary appears in deal workspace

**Notes:** Summary should be scannable in <2 minutes. Link timestamps for verification.

---

#### E2-S06: Metric Extraction to Structured Fields

**Story:** As an Analyst, I want metrics from calls to automatically update deal fields so that the record stays current.

**Priority:** P0 | **Size:** M | **Depends on:** E2-S05

**Acceptance Criteria:**
- Given call summary identifies metrics (MRR, growth rate, etc.)
- When processing completes
- Then:
  - Corresponding deal fields are updated
  - Source is marked as "Call - [date]"
  - If value differs from existing, conflict is flagged
  - Change history is logged

**Notes:** Don't auto-overwrite—flag conflicts for user resolution (see E12-S04).

---

#### E2-S07: CRM Sync After Call

**Story:** As an Analyst, I want call outcomes to sync to our CRM so that external systems stay updated.

**Priority:** P1 | **Size:** M | **Depends on:** E2-S05, E10-S06 (CRM integration)

**Acceptance Criteria:**
- Given CRM integration is configured
- When call summary is finalized
- Then:
  - Key fields sync to CRM (stage, last contact, notes summary)
  - Sync status is displayed
  - Errors are surfaced to user

**Notes:** Define field mapping during CRM setup. Handle sync failures gracefully.

---

#### E2-S08: Call Prep Editing

**Story:** As an Analyst, I want to edit the AI-generated call prep so that I can customize it for specific calls.

**Priority:** P0 | **Size:** S | **Depends on:** E2-S01

**Acceptance Criteria:**
- User can edit any section of call prep
- User can add custom questions
- User can reorder sections
- User can mark prep as "finalized"
- Edit history is preserved

**Notes:** Simple rich text editing. "Finalized" prevents further AI regeneration.

---

#### E2-S09: Call Summary Editing

**Story:** As an Analyst, I want to edit the AI-generated call summary so that I can correct errors and add context.

**Priority:** P1 | **Size:** S | **Depends on:** E2-S05

**Acceptance Criteria:**
- User can edit any section of summary
- User can add personal observations
- Human edits are visually distinguished from AI content
- Corrections propagate to structured fields (see E12-S01)

**Notes:** Human additions should be clearly marked as human-authored.

---

#### E2-S10: Calendar Integration for Call Detection

**Story:** As an Analyst, I want calls to be automatically detected from my calendar so that AI note-taker joins without manual setup.

**Priority:** P2 | **Size:** L | **Depends on:** E10-S08

**Acceptance Criteria:**
- Given calendar is connected
- When a meeting with external participant matches a deal
- Then:
  - Meeting is linked to deal automatically
  - AI note-taker is scheduled to join
  - Call prep is auto-generated
- User can unlink or disable AI for specific meetings

**Notes:** Match on attendee email/domain. Don't join internal meetings by default.

---

## E3: Memo Generation

**Epic Description:** Enable AI-drafted investment memos with human editing, versioning, and citation tracking.

**Source:** PRD Section 7.4, User Journey 3.3

---

#### E3-S01: Memo Draft Generation

**Story:** As an Analyst, I want the AI to draft an investment memo so that I can start from a solid foundation instead of a blank page.

**Priority:** P0 | **Size:** XL | **Depends on:** E1-S04, E2-S05, E10-S02

**Acceptance Criteria:**
- Given a deal has deck and at least one call summary
- When user requests memo generation (or triggered by stage change)
- Then AI generates memo with:
  - Executive summary
  - Company overview
  - Problem and solution
  - Market analysis
  - Traction and metrics
  - Team assessment
  - Thesis fit analysis
  - Competitive landscape
  - Risks and mitigations
  - Open questions
  - Recommendation (AI's assessment)
- Memo follows fund's configured template
- Each section includes source citations
- Generation completes within 2 minutes

**Notes:** Use all available sources: deck, calls, enrichment, notes. Template order matters.

---

#### E3-S02: Memo Template Configuration

**Story:** As a Partner, I want to configure our memo template so that AI-generated memos match our format.

**Priority:** P0 | **Size:** M | **Depends on:** None

**Acceptance Criteria:**
- Admin can define memo sections (add, remove, reorder)
- Admin can mark sections as required vs optional
- Admin can set section-specific prompts/guidance
- Admin can upload example memos for style reference
- Changes apply to future memo generations

**Notes:** Start with sensible default template. Allow per-stage templates (e.g., shorter for first look).

---

#### E3-S03: Memo Editor

**Story:** As an Analyst, I want to edit the memo in a rich editor so that I can refine the AI draft.

**Priority:** P0 | **Size:** L | **Depends on:** E3-S01

**Acceptance Criteria:**
- Full rich text editor with formatting (headers, bullets, tables)
- Inline editing of any section
- Clear visual distinction between AI-generated and human-edited content
- Real-time save (no manual save button)
- Keyboard shortcuts for common actions

**Notes:** Consider collaborative editing capabilities for V2.

---

#### E3-S04: Section Regeneration

**Story:** As an Analyst, I want to regenerate specific memo sections so that I can improve weak sections without starting over.

**Priority:** P0 | **Size:** M | **Depends on:** E3-S01

**Acceptance Criteria:**
- User can select a section and click "Regenerate"
- User can provide feedback ("too optimistic", "add more detail", "focus on X")
- AI generates new version of that section only
- User can compare versions and choose preferred
- Unchosen versions are discarded (not cluttering history)

**Notes:** Feedback tags help AI improve output. Don't lose user's manual edits in other sections.

---

#### E3-S05: Citation Panel

**Story:** As a Partner, I want to see sources for AI claims so that I can verify accuracy.

**Priority:** P0 | **Size:** M | **Depends on:** E3-S01

**Acceptance Criteria:**
- Citation links appear inline in memo text
- Clicking citation opens source in side panel:
  - Deck slide with highlight
  - Transcript excerpt with timestamp
  - External source with link
- Citation panel can be collapsed/expanded
- Missing citations are flagged for review

**Notes:** Trust requires traceability. Every factual claim should have a source.

---

#### E3-S06: Memo Version History

**Story:** As an Analyst, I want to see memo version history so that I can track changes and revert if needed.

**Priority:** P1 | **Size:** M | **Depends on:** E3-S03

**Acceptance Criteria:**
- Each save creates a version snapshot
- Version list shows timestamp and editor
- User can view any previous version
- User can compare two versions (diff view)
- User can restore a previous version

**Notes:** Auto-save creates versions; don't create version for every keystroke (debounce).

---

#### E3-S07: AI vs Human Attribution

**Story:** As a Partner, I want to see which parts of the memo are AI-generated vs human-written so that I know what to scrutinize.

**Priority:** P0 | **Size:** S | **Depends on:** E3-S03

**Acceptance Criteria:**
- AI-generated content has subtle visual indicator (light background or icon)
- Human-edited sections are marked as human-authored
- Indicator is visible but not distracting
- Attribution persists through version history

**Notes:** Once human edits a section, that section becomes "human-edited" even if AI content remains.

---

#### E3-S08: Memo Sharing and Finalization

**Story:** As an Analyst, I want to share the memo with partners for review so that we can prepare for IC.

**Priority:** P1 | **Size:** S | **Depends on:** E3-S03, E8-S01

**Acceptance Criteria:**
- User can mark memo as "Ready for Review"
- Partners are notified
- Memo can be marked as "Final" (locks editing except by admins)
- Final memo can be exported as PDF

**Notes:** "Final" status triggers IC packet generation (see E6-S01).

---

#### E3-S09: Memo From Scratch

**Story:** As an Analyst, I want to start a memo from scratch using the template so that I can write without AI assistance when preferred.

**Priority:** P2 | **Size:** S | **Depends on:** E3-S02

**Acceptance Criteria:**
- User can create new memo with empty template
- All sections are blank with placeholder prompts
- User can later request AI to fill specific sections
- Manual memo has same editing capabilities as AI-generated

**Notes:** Some users may prefer to write first, use AI to enhance later.

---

## E4: Founder Interaction

**Epic Description:** Enable AI to communicate directly with founders via email, calls, and website embed—with appropriate guardrails.

**Source:** PRD Section 7.5, User Journeys 3.4, 4.1-4.3

---

#### E4-S01: Gap Identification

**Story:** As an Analyst, I want the AI to identify information gaps so that I know what questions to ask founders.

**Priority:** P0 | **Size:** M | **Depends on:** E1-S04, E2-S05

**Acceptance Criteria:**
- AI analyzes deal record for missing information:
  - Missing metrics (MRR breakdown, CAC, etc.)
  - Unclear strategy points
  - Unverified claims
  - Missing references
- Gaps are categorized (factual vs strategic)
- Gaps are prioritized by importance
- Gap list is displayed in deal workspace

**Notes:** Gaps should be specific ("MRR by segment") not vague ("more traction info").

---

#### E4-S02: Founder Outreach Suggestion

**Story:** As an Analyst, I want the AI to suggest reaching out to founders to fill gaps so that I can approve and initiate contact.

**Priority:** P0 | **Size:** S | **Depends on:** E4-S01

**Acceptance Criteria:**
- AI suggests outreach: "I noticed gaps in [X, Y, Z]. Should I contact the founder?"
- Analyst can review suggested questions
- Analyst can add, remove, or edit questions
- Analyst chooses channel: email or call
- Outreach only happens after explicit approval

**Notes:** Human-in-the-loop is critical. AI never contacts founders without approval.

---

#### E4-S03: AI Email to Founder

**Story:** As an Analyst, I want the AI to send targeted question emails to founders so that I can gather information efficiently.

**Priority:** P0 | **Size:** L | **Depends on:** E4-S02

**Acceptance Criteria:**
- Given analyst approves email outreach
- AI drafts email with:
  - Clear AI identification in opening
  - Specific, answerable questions (3-5 max)
  - Professional tone
  - Note that human will follow up
- Analyst can edit draft before sending
- Email is sent from fund domain
- Activity is logged on deal record

**Notes:** AI identification is mandatory. Use templates that can be customized per fund.

---

#### E4-S04: Founder Email Response Parsing

**Story:** As an Analyst, I want founder email responses to be automatically parsed so that answers update the deal record.

**Priority:** P1 | **Size:** M | **Depends on:** E4-S03

**Acceptance Criteria:**
- Given founder replies to AI email
- When system receives response
- Then:
  - Answers are extracted and matched to questions
  - Structured data updates deal fields
  - Full response is logged in activity
  - Analyst is notified of response
- Parsing confidence is indicated

**Notes:** Handle varied response formats. Flag unclear answers for human review.

---

#### E4-S05: AI Call with Founder

**Story:** As an Analyst, I want the AI to conduct short information-gathering calls with founders so that complex gaps can be filled conversationally.

**Priority:** P1 | **Size:** XL | **Depends on:** E4-S02

**Acceptance Criteria:**
- Given analyst approves call outreach
- AI schedules 15-minute call with founder
- AI conducts call:
  - Introduces itself as AI
  - Explains scope and purpose
  - Asks approved questions
  - Probes based on answers
  - Handles boundaries (see E4-S07)
- Call is recorded and transcribed
- Answers are extracted to deal record

**Notes:** Complex feature—may be Phase 1 beta only. Voice quality critical.

---

#### E4-S06: Website Embed for Founders

**Story:** As a Partner, I want founders to interact with AI on our website so that they can submit deals with richer initial data.

**Priority:** P2 | **Size:** XL | **Depends on:** E4-S03

**Acceptance Criteria:**
- Embeddable chat widget for fund website
- AI greets founder, explains purpose
- AI gathers structured information conversationally
- Founder can upload deck through widget
- Conversation creates deal record
- AI provides immediate fit feedback (general, not specific score)
- Same guardrails as email/call interactions

**Notes:** V2 feature—complex to implement and support.

---

#### E4-S07: Sensitive Topic Guardrails

**Story:** As a Partner, I want the AI to avoid sensitive topics when talking to founders so that we maintain appropriate boundaries.

**Priority:** P0 | **Size:** M | **Depends on:** E4-S03 or E4-S05

**Acceptance Criteria:**
- AI recognizes prohibited topics:
  - Valuation/terms
  - Legal matters
  - Personnel issues
  - Competitive intelligence about other funds
- When founder raises prohibited topic:
  - AI deflects gracefully
  - AI explains topic requires human discussion
  - Escalation is logged and analyst notified
- Prohibited topic list is configurable

**Notes:** Deflection language should be natural, not robotic. Always offer human follow-up.

---

#### E4-S08: Founder Opt-Out Handling

**Story:** As a Founder, I want to opt out of AI interaction so that I can speak with humans instead.

**Priority:** P0 | **Size:** S | **Depends on:** E4-S03 or E4-S05

**Acceptance Criteria:**
- Founder can request human at any point
- AI acknowledges immediately and gracefully
- Deal is marked "prefers human contact"
- Analyst is notified with context
- AI will not initiate further contact with this founder
- Opt-out is respected across all channels

**Notes:** Respect is paramount. One request = permanent opt-out for that founder.

---

#### E4-S09: AI Disclosure Requirements

**Story:** As a Founder, I want to know when I'm talking to an AI so that I can make informed decisions about the interaction.

**Priority:** P0 | **Size:** S | **Depends on:** E4-S03 or E4-S05

**Acceptance Criteria:**
- AI identifies itself in first line of every email
- AI introduces itself at start of every call
- Identification is clear: "I'm [AI Name], an AI assistant working with [Fund Name]"
- Purpose is explained: "I'm gathering preliminary information to help the team evaluate fit"
- Human follow-up is mentioned

**Notes:** Transparency builds trust. Never deceive founders about AI nature.

---

#### E4-S10: Founder Communication Logging

**Story:** As an Analyst, I want all AI-founder communications logged so that I can review what was said.

**Priority:** P0 | **Size:** S | **Depends on:** E4-S03, E4-S05

**Acceptance Criteria:**
- All emails (sent and received) are logged in deal activity
- All call transcripts are attached to deal
- Logs include timestamps and full content
- Logs are searchable
- Export available for compliance

**Notes:** Full audit trail required for trust and compliance.

---

#### E4-S11: Fund-Level AI Toggle

**Story:** As a Partner, I want to enable/disable founder-facing AI for the fund so that we can control when and how AI contacts founders.

**Priority:** P1 | **Size:** S | **Depends on:** E4-S03

**Acceptance Criteria:**
- Fund-level setting: "Enable AI founder contact"
- When disabled, AI cannot initiate any founder contact
- When enabled, per-deal overrides still apply
- Toggle is accessible to Partners only
- Change is logged for audit

**Notes:** Some funds may want to pilot carefully. Respect fund preferences.

---

## E5: Ask-the-Analyst

**Epic Description:** Enable fund team members to interact with AI via chat and voice to ask questions, request research, and take actions.

**Source:** PRD Section 7.6, User Journeys 1.1, 1.2

---

#### E5-S01: Chat Interface

**Story:** As an Analyst, I want to chat with the AI so that I can ask questions and request actions naturally.

**Priority:** P0 | **Size:** L | **Depends on:** None

**Acceptance Criteria:**
- Chat panel available from any screen
- User can type natural language messages
- AI responds with text, formatted as appropriate
- Conversation history is preserved within session
- Chat can be collapsed/expanded

**Notes:** This is the primary interaction paradigm. Should feel conversational.

---

#### E5-S02: Voice Input

**Story:** As a Partner, I want to speak to the AI so that I can interact hands-free.

**Priority:** P0 | **Size:** L | **Depends on:** E5-S01

**Acceptance Criteria:**
- Tap-to-talk button in chat interface
- Push and hold to speak, release to send
- Speech-to-text converts voice to query
- Works on mobile and desktop
- Visual feedback during recording

**Notes:** Voice is critical for partner mobile use case. Low latency essential.

---

#### E5-S03: Voice Output

**Story:** As a Partner, I want the AI to speak responses so that I can listen while multitasking.

**Priority:** P1 | **Size:** M | **Depends on:** E5-S02

**Acceptance Criteria:**
- User can toggle voice output on/off
- AI responses are spoken aloud when enabled
- Voice is natural-sounding, not robotic
- User can interrupt (tap to stop speaking)
- Works alongside text display

**Notes:** Voice output optional but valuable for mobile/driving use cases.

---

#### E5-S04: Deal-Specific Queries

**Story:** As an Analyst, I want to ask questions about specific deals so that I can get information quickly.

**Priority:** P0 | **Size:** M | **Depends on:** E5-S01

**Acceptance Criteria:**
- User can ask: "What are the main risks for Acme?"
- AI retrieves relevant information from deal record, calls, notes
- Response cites sources (transcript timestamps, deck slides)
- Context is maintained in conversation (follow-up questions work)

**Notes:** AI should understand deal context from conversation or current view.

---

#### E5-S05: Research Requests

**Story:** As an Analyst, I want to ask the AI to research topics so that I can get information without leaving the app.

**Priority:** P0 | **Size:** L | **Depends on:** E5-S01

**Acceptance Criteria:**
- User can ask: "Find competitors to Acme in logistics SaaS"
- AI performs research using web and fund data
- Response includes structured findings with sources
- Results can be saved to deal record
- Research can be deep ("market analysis") or quick ("who is their CEO?")

**Notes:** Web access required. Balance speed vs depth based on query.

---

#### E5-S06: Action Requests

**Story:** As an Analyst, I want to ask the AI to take actions so that I can work efficiently.

**Priority:** P0 | **Size:** L | **Depends on:** E5-S01

**Acceptance Criteria:**
- User can request actions:
  - "Draft a follow-up email to Acme"
  - "Move Acme to Deep Dive stage"
  - "Generate a memo for this deal"
  - "Schedule a call with the founder"
- AI performs action or drafts for approval
- High-risk actions require confirmation
- Action completion is confirmed

**Notes:** Distinguish low-risk (draft) vs high-risk (send email) actions.

---

#### E5-S07: Cross-Deal Queries

**Story:** As a Partner, I want to ask questions across all deals so that I can understand portfolio and pipeline patterns.

**Priority:** P1 | **Size:** M | **Depends on:** E5-S01

**Acceptance Criteria:**
- User can ask: "Show me all fintech deals from last month"
- User can ask: "Which deals have been idle for more than a week?"
- User can ask: "How does Acme compare to similar deals we've seen?"
- AI queries across entire fund deal history
- Results can be filtered and explored

**Notes:** Powerful for partner leverage. Requires efficient data querying.

---

#### E5-S08: Context-Aware Responses

**Story:** As an Analyst, I want the AI to understand my current context so that I don't have to repeat information.

**Priority:** P0 | **Size:** M | **Depends on:** E5-S01

**Acceptance Criteria:**
- AI knows which deal/memo/screen user is viewing
- "Summarize this" works without specifying what "this" is
- Follow-up questions maintain context ("What about their team?")
- Context can be explicitly changed ("Let's talk about DataFlow instead")

**Notes:** Context awareness dramatically improves UX. Track view state.

---

#### E5-S09: "I Don't Know" Handling

**Story:** As an Analyst, I want the AI to admit when it doesn't know something so that I don't get false information.

**Priority:** P0 | **Size:** S | **Depends on:** E5-S01

**Acceptance Criteria:**
- When AI lacks information, it says so clearly
- Response includes what it couldn't find
- AI suggests alternatives: "Would you like me to research this online?"
- AI never fabricates facts or sources

**Notes:** Honesty about limitations builds trust. No hallucination.

---

#### E5-S10: Command Bar

**Story:** As an Analyst, I want to use a command bar for quick actions so that I can work efficiently with keyboard.

**Priority:** P1 | **Size:** M | **Depends on:** E5-S01

**Acceptance Criteria:**
- Cmd+K / Ctrl+K opens command bar
- User can type natural language or commands
- Recent items are shown by default
- Commands execute immediately or open relevant view
- Keyboard navigation through results

**Notes:** Power user feature. Important for analyst efficiency.

---

## E6: IC Meeting Support

**Epic Description:** Support Investment Committee meetings with recording, decision capture, and post-meeting actions.

**Source:** PRD Section 10.3, User Journey 3.5

---

#### E6-S01: IC Packet Generation

**Story:** As an Analyst, I want the AI to compile an IC packet so that all relevant materials are ready for the meeting.

**Priority:** P0 | **Size:** M | **Depends on:** E3-S08

**Acceptance Criteria:**
- When memo is marked "Final" or deal moves to IC stage
- AI compiles IC packet:
  - Investment memo
  - Key supporting documents
  - Open questions list
  - Recommended discussion points
- Packet is shareable with IC attendees
- Packet can be exported as PDF bundle

**Notes:** Reduce prep burden on analysts. Include only essential materials.

---

#### E6-S02: IC Meeting Recording

**Story:** As a Partner, I want IC meetings to be recorded so that decisions and discussions are captured.

**Priority:** P0 | **Size:** L | **Depends on:** E2-S02

**Acceptance Criteria:**
- AI note-taker can join IC meetings (when permitted)
- Recording and transcription work as with founder calls
- Internal meeting mode: more permissive content handling
- Participants are aware of recording

**Notes:** Some funds may not want IC recordings. Make optional per-fund.

---

#### E6-S03: Decision Capture

**Story:** As a Partner, I want IC decisions to be automatically captured so that outcomes are recorded without manual entry.

**Priority:** P0 | **Size:** L | **Depends on:** E6-S02

**Acceptance Criteria:**
- Given IC meeting transcript exists
- AI identifies decisions made:
  - "Proceed to DD" / "Pass" / "Need more info"
  - Conditions attached to decision
  - Key discussion points
  - Vote outcome if mentioned
- Decisions are logged to deal records
- AI seeks confirmation before applying: "I detected a 'Proceed to DD' decision for Acme. Confirm?"

**Notes:** Decision detection is complex. Confirmation prevents errors.

---

#### E6-S04: Post-IC Action Items

**Story:** As an Analyst, I want action items from IC to be automatically created so that nothing falls through the cracks.

**Priority:** P1 | **Size:** M | **Depends on:** E6-S03

**Acceptance Criteria:**
- AI extracts action items from IC discussion
- Action items have:
  - Description
  - Owner (extracted or assigned)
  - Due date (if mentioned)
  - Related deal
- Items are created as tasks in deal workspace
- Owners are notified

**Notes:** Action items should be specific and assignable.

---

#### E6-S05: IC Summary Generation

**Story:** As a Partner, I want a summary of the IC meeting so that decisions and discussions are documented.

**Priority:** P1 | **Size:** M | **Depends on:** E6-S02

**Acceptance Criteria:**
- AI generates IC meeting summary:
  - Deals discussed
  - Decisions for each deal
  - Key discussion points
  - Action items
- Summary is distributed to IC attendees
- Summary is attached to relevant deals

**Notes:** Similar to call summary but optimized for multi-deal discussion format.

---

#### E6-S06: Deal Stage Update Post-IC

**Story:** As an Analyst, I want deal stages to update automatically after IC decisions so that the pipeline reflects reality.

**Priority:** P0 | **Size:** S | **Depends on:** E6-S03

**Acceptance Criteria:**
- Given an IC decision is confirmed
- Deal stage updates automatically:
  - "Proceed to DD" → Due Diligence stage
  - "Pass" → Passed stage with reason
  - "Need more info" → stage unchanged, task created
- Stage change is logged with IC reference

**Notes:** Automatic but with confirmation. Reduces manual work.

---

#### E6-S07: Post-IC Founder Communication

**Story:** As an Analyst, I want the AI to draft post-IC emails to founders so that we communicate decisions promptly.

**Priority:** P2 | **Size:** M | **Depends on:** E6-S03, E4-S03

**Acceptance Criteria:**
- After IC decision is confirmed
- AI drafts appropriate email:
  - "Good news" email for proceed decisions
  - Thoughtful decline for pass decisions
  - Information request for "need more info"
- Draft includes deal-specific context
- Analyst reviews and sends

**Notes:** Templates should be customizable. Human always reviews before send.

---

## E7: Pipeline & Deal Management

**Epic Description:** Core deal workspace and pipeline management functionality.

**Source:** PRD Sections 7.1, 8.7, User Journey 2

---

#### E7-S01: Deal Data Model

**Story:** As an Analyst, I want a comprehensive deal record so that all relevant information is captured in one place.

**Priority:** P0 | **Size:** L | **Depends on:** None

**Acceptance Criteria:**
- Deal record includes:
  - Company info (name, description, website, location)
  - Contacts (founders, key team)
  - Funding (stage, ask, history)
  - Metrics (MRR, growth, etc.)
  - Thesis fit score and rationale
  - Stage and pipeline status
  - Owner and assignments
  - Source and provenance
  - Activity history
  - Attached documents
- Fields support custom additions
- Field changes are tracked in history

**Notes:** Core entity—design for extensibility. Use structured schemas.

---

#### E7-S02: Deal Workspace View

**Story:** As an Analyst, I want a deal workspace so that I can see everything about a deal in one place.

**Priority:** P0 | **Size:** XL | **Depends on:** E7-S01

**Acceptance Criteria:**
- Deal workspace includes:
  - Header: Company name, logo, fit score, stage, owner
  - Overview tab: Key metrics, thesis fit, AI summary
  - Timeline tab: Chronological activity feed
  - Documents tab: Deck, memos, transcripts, files
  - AI panel: Contextual chat for this deal
- Tabs can be navigated without page reload
- AI panel can be collapsed/expanded

**Notes:** This is the primary deal interface. Must feel fast and comprehensive.

---

#### E7-S03: Pipeline List View

**Story:** As an Analyst, I want a pipeline list so that I can see and manage all deals at a glance.

**Priority:** P0 | **Size:** L | **Depends on:** E7-S01

**Acceptance Criteria:**
- List displays all accessible deals
- Columns: Company, stage, fit score, owner, last activity
- Sortable by any column
- Filterable by stage, owner, date range, score range
- Quick actions: Change stage, assign owner, archive
- Keyboard navigation

**Notes:** Performance critical—must handle hundreds of deals smoothly.

---

#### E7-S04: Kanban Pipeline View

**Story:** As a Partner, I want a Kanban view so that I can visualize the pipeline by stage.

**Priority:** P1 | **Size:** M | **Depends on:** E7-S03

**Acceptance Criteria:**
- Deals displayed as cards in stage columns
- Drag-and-drop to change stage
- Card shows: Company, fit score, owner, days in stage
- Columns match configured pipeline stages
- Filter and search apply to Kanban view

**Notes:** Visual alternative to list. Some users strongly prefer this.

---

#### E7-S05: Deal Stage Management

**Story:** As an Analyst, I want to move deals between stages so that the pipeline reflects deal progress.

**Priority:** P0 | **Size:** M | **Depends on:** E7-S01, E10-S03

**Acceptance Criteria:**
- User can change deal stage via:
  - Dropdown in deal workspace
  - Quick action in list
  - Drag-and-drop in Kanban
  - AI command
- Stage change is validated against requirements (e.g., "memo required for IC")
- Stage change is logged with timestamp and user
- Notifications sent per configuration

**Notes:** Stage requirements prevent premature advancement.

---

#### E7-S06: Deal Search

**Story:** As an Analyst, I want to search deals so that I can find specific companies quickly.

**Priority:** P0 | **Size:** M | **Depends on:** E7-S01

**Acceptance Criteria:**
- Search across company name, description, notes
- Results update as user types
- Matching terms highlighted
- Search works from any screen (via command bar)
- Recent searches remembered

**Notes:** Fast, fuzzy search essential for large deal volumes.

---

#### E7-S07: AI-Powered Deal Search

**Story:** As a Partner, I want to search deals with natural language so that I can ask complex questions.

**Priority:** P1 | **Size:** M | **Depends on:** E7-S06, E5-S01

**Acceptance Criteria:**
- User can ask: "Show me Series A fintech deals with MRR over $100K"
- AI translates to structured query
- Results displayed in list/Kanban view
- Query can be saved as filter

**Notes:** Extension of basic search. Powered by Ask-the-Analyst.

---

#### E7-S08: Deal Archiving

**Story:** As an Analyst, I want to archive deals so that passed or closed deals don't clutter the active pipeline.

**Priority:** P0 | **Size:** S | **Depends on:** E7-S01

**Acceptance Criteria:**
- User can archive deals (passed, closed-won, closed-lost)
- Archived deals are hidden from default views
- Archived deals are searchable and viewable
- Deals can be unarchived
- Bulk archive supported

**Notes:** Pipeline hygiene is important. Make archiving easy.

---

#### E7-S09: Deal Activity Feed

**Story:** As an Analyst, I want to see all activity on a deal so that I understand its history.

**Priority:** P0 | **Size:** M | **Depends on:** E7-S02

**Acceptance Criteria:**
- Activity feed shows chronological events:
  - Stage changes
  - Calls and summaries
  - Documents added
  - Comments and notes
  - AI actions
  - Emails sent/received
- Feed can be filtered by type
- Each item links to relevant detail

**Notes:** Complete audit trail of deal lifecycle.

---

#### E7-S10: Deal Comparison

**Story:** As a Partner, I want to compare multiple deals so that I can evaluate relative strength.

**Priority:** P2 | **Size:** M | **Depends on:** E7-S01

**Acceptance Criteria:**
- User can select 2-4 deals to compare
- Side-by-side comparison shows:
  - Key metrics
  - Fit scores
  - Team backgrounds
  - Stage and timing
- Differences highlighted
- AI can summarize comparison

**Notes:** Useful for IC prep and portfolio decisions.

---

#### E7-S11: Deal Notes

**Story:** As an Analyst, I want to add notes to deals so that I can capture observations and context.

**Priority:** P0 | **Size:** S | **Depends on:** E7-S02

**Acceptance Criteria:**
- User can add free-form notes to any deal
- Notes support rich text formatting
- Notes appear in activity feed
- Notes are searchable
- Notes can be tagged (e.g., "from call", "risk")

**Notes:** Simple but essential for capturing human context.

---

## E8: Collaboration

**Epic Description:** Team collaboration features including comments, mentions, and activity tracking.

**Source:** PRD Section 8.9

---

#### E8-S01: Inline Comments

**Story:** As an Analyst, I want to add comments on memos and summaries so that I can discuss specific points with teammates.

**Priority:** P0 | **Size:** M | **Depends on:** E3-S03

**Acceptance Criteria:**
- User can select text and add comment
- Comments appear as thread in margin/panel
- Comments support replies
- Comments show author and timestamp
- Comments can be resolved

**Notes:** Essential for memo review workflow.

---

#### E8-S02: @Mentions

**Story:** As an Analyst, I want to @mention teammates so that they're notified about relevant discussions.

**Priority:** P0 | **Size:** S | **Depends on:** E8-S01

**Acceptance Criteria:**
- Typing "@" shows teammate suggestions
- Selecting user creates mention
- Mentioned user receives notification
- Mention links to specific comment
- Works in comments, notes, and AI chat

**Notes:** Standard collaboration pattern. Must feel snappy.

---

#### E8-S03: Comment Resolution

**Story:** As an Analyst, I want to resolve comments so that addressed items are marked complete.

**Priority:** P1 | **Size:** S | **Depends on:** E8-S01

**Acceptance Criteria:**
- Comment threads can be marked: Open, Addressed, Dismissed
- Resolution shows who resolved and when
- Resolved comments can be hidden/shown
- Unresolved comment count displayed
- "All comments addressed" indicator for IC prep

**Notes:** Helps track memo readiness.

---

#### E8-S04: Fund Activity Feed

**Story:** As a Partner, I want to see all activity across the fund so that I stay informed.

**Priority:** P1 | **Size:** M | **Depends on:** E7-S09

**Acceptance Criteria:**
- Feed shows activity across all deals:
  - New deals
  - Stage changes
  - Memos created/finalized
  - High-fit deals flagged
  - Team comments
- Filterable by type, person, time
- Notification badge for new items

**Notes:** Partner dashboard component. Don't overwhelm.

---

#### E8-S05: Deal Flagging for Partner

**Story:** As an Analyst, I want to flag deals for partner attention so that important items are surfaced.

**Priority:** P0 | **Size:** S | **Depends on:** E7-S01

**Acceptance Criteria:**
- User can flag deal for specific partner
- Flag includes optional message
- Partner is notified
- Flagged deals appear in partner's queue
- Flag can be cleared after review

**Notes:** Key handoff mechanism from analyst to partner.

---

#### E8-S06: Deal Assignment

**Story:** As a Partner, I want to assign deals to team members so that ownership is clear.

**Priority:** P0 | **Size:** S | **Depends on:** E7-S01

**Acceptance Criteria:**
- Deal has owner field (single person)
- Deal can have additional followers
- Owner receives notifications for deal activity
- Assignment can be changed at any time
- Assignment history tracked

**Notes:** Clear ownership prevents deals falling through cracks.

---

#### E8-S07: Shared Views/Filters

**Story:** As an Analyst, I want to save and share pipeline views so that team uses consistent filters.

**Priority:** P2 | **Size:** M | **Depends on:** E7-S03

**Acceptance Criteria:**
- User can save current filter/sort as named view
- Views can be private or shared with fund
- Shared views appear in view selector
- Views can be edited or deleted by creator/admin

**Notes:** Power user feature. Helps standardize workflows.

---

#### E8-S08: Real-Time Updates

**Story:** As an Analyst, I want to see changes from teammates in real-time so that I'm always working with current data.

**Priority:** P1 | **Size:** L | **Depends on:** E7-S02

**Acceptance Criteria:**
- Changes by other users appear without refresh
- Indicator shows when updates are available
- Concurrent editing shows other user's presence
- No data loss on simultaneous edits

**Notes:** Important for collaboration. WebSocket-based updates.

---

## E9: Notifications & Alerts

**Epic Description:** Notification system for keeping users informed across channels.

**Source:** PRD Section 8.10

---

#### E9-S01: In-App Notification Center

**Story:** As an Analyst, I want an in-app notification center so that I can see recent activity and alerts.

**Priority:** P0 | **Size:** M | **Depends on:** None

**Acceptance Criteria:**
- Notification bell in header with unread count
- Clicking opens notification panel
- Notifications grouped by type/time
- Each notification links to relevant item
- Mark as read individually or all

**Notes:** Central hub for all notifications.

---

#### E9-S02: Push Notifications (Mobile)

**Story:** As a Partner, I want push notifications on mobile so that I'm alerted to important items.

**Priority:** P0 | **Size:** M | **Depends on:** E9-S01

**Acceptance Criteria:**
- Push notifications for mobile app
- User can configure which types push
- Tapping notification opens relevant screen
- Notification includes preview text
- Respects device quiet hours

**Notes:** Critical for partner mobile experience.

---

#### E9-S03: Email Notifications

**Story:** As an Analyst, I want email notifications so that I'm informed even when not in the app.

**Priority:** P1 | **Size:** M | **Depends on:** E9-S01

**Acceptance Criteria:**
- Configurable email notifications
- Options: Individual emails, daily digest, weekly digest
- Emails include actionable links
- Unsubscribe link in each email
- Branded email templates

**Notes:** Balance informativeness vs email overload.

---

#### E9-S04: Notification Preferences

**Story:** As an Analyst, I want to configure notification preferences so that I only receive what's relevant.

**Priority:** P0 | **Size:** M | **Depends on:** E9-S01

**Acceptance Criteria:**
- Per-notification-type settings:
  - Enable/disable
  - Channel: In-app, push, email
  - Frequency: Real-time, digest
- Presets: "All", "Important only", "Minimal"
- Settings apply to user across devices

**Notes:** Power users want granular control. Defaults should be sensible.

---

#### E9-S05: AI Update Notifications

**Story:** As an Analyst, I want to be notified when AI completes work so that I can review promptly.

**Priority:** P0 | **Size:** S | **Depends on:** E9-S01

**Acceptance Criteria:**
- Notifications for:
  - Deck processing complete
  - Call summary ready
  - Memo draft ready
  - Founder response received
- Notification includes key preview
- Link goes directly to result

**Notes:** AI work is async; notifications close the loop.

---

#### E9-S06: Deal Activity Alerts

**Story:** As an Analyst, I want alerts for important deal events so that I don't miss critical updates.

**Priority:** P1 | **Size:** S | **Depends on:** E9-S01, E7-S09

**Acceptance Criteria:**
- Configurable alerts for:
  - Stage changes on my deals
  - Comments on my deals
  - Founder responses
  - Stale deal warnings
- Alerts respect notification preferences

**Notes:** Subset of notification system focused on deals.

---

#### E9-S07: Stale Deal Reminders

**Story:** As an Analyst, I want reminders about stale deals so that nothing falls through the cracks.

**Priority:** P1 | **Size:** M | **Depends on:** E9-S01, E7-S01

**Acceptance Criteria:**
- System detects deals idle for configurable period (default: 7 days)
- Owner receives reminder notification
- Reminder suggests actions: Follow up, Archive, Snooze
- Snooze postpones reminder for set period
- Stale deals highlighted in pipeline view

**Notes:** Pipeline hygiene automation. Reduces deal rot.

---

#### E9-S08: Morning Briefing Digest

**Story:** As a Partner, I want a morning digest so that I'm caught up without opening the app.

**Priority:** P2 | **Size:** M | **Depends on:** E9-S03

**Acceptance Criteria:**
- Optional daily email digest at configured time
- Digest includes:
  - New high-fit deals
  - Deals awaiting review
  - Upcoming calls
  - Recent team activity
- Digest is scannable in < 2 minutes
- Links to app for details

**Notes:** Reduces app-opening friction for busy partners.

---

## E10: Configuration & Settings

**Epic Description:** Fund and user-level configuration including thesis, workflows, templates, and integrations.

**Source:** PRD Section 5

---

#### E10-S01: Thesis Configuration

**Story:** As a Partner, I want to configure our investment thesis so that AI scoring reflects our criteria.

**Priority:** P0 | **Size:** L | **Depends on:** None

**Acceptance Criteria:**
- Configure hard constraints:
  - Stage preferences (Seed, A, B, etc.)
  - Geography (US, Europe, etc.)
  - Check size range
  - Excluded sectors
- Configure soft preferences with weighting:
  - Team vs market vs traction importance
  - Sector appetites
  - Business model preferences
- Anti-portfolio patterns (optional)
- ThesisConfig is versioned

**Notes:** Core configuration that drives scoring. Guided wizard for setup.

---

#### E10-S02: Memo Template Configuration

**Story:** As a Partner, I want to configure our memo template so that AI-generated memos match our format.

**Priority:** P0 | **Size:** M | **Depends on:** None

**Acceptance Criteria:**
- Define memo sections (add, remove, reorder)
- Mark sections as required vs optional
- Set section-specific guidance
- Upload example memos for style reference
- Preview template before saving

**Notes:** See E3-S02 for full requirements.

---

#### E10-S03: Pipeline Stage Configuration

**Story:** As a Partner, I want to configure our deal stages so that the pipeline matches our workflow.

**Priority:** P0 | **Size:** M | **Depends on:** None

**Acceptance Criteria:**
- Define custom stages (not limited to defaults)
- Set stage order
- Configure stage requirements (e.g., "memo required")
- Configure stage permissions (who can move to stage)
- Default stages provided for new funds

**Notes:** Every fund has different terminology and flow.

---

#### E10-S04: Automation Rules

**Story:** As a Partner, I want to configure automation rules so that routine actions happen automatically.

**Priority:** P1 | **Size:** L | **Depends on:** E10-S01, E10-S03

**Acceptance Criteria:**
- Rule builder: IF [condition] THEN [action] WITH [approval]
- Conditions: Fit score, stage, source, idle time, etc.
- Actions: Send email, change stage, notify, flag
- Approval levels: Auto, Analyst, Partner
- Rules can be enabled/disabled
- Rules are logged when triggered

**Notes:** Power feature. Start with simple rules; complex logic in V2.

---

#### E10-S05: User Preferences

**Story:** As an Analyst, I want to configure my preferences so that the app works the way I prefer.

**Priority:** P0 | **Size:** M | **Depends on:** None

**Acceptance Criteria:**
- Notification preferences (see E9-S04)
- AI personality preference (warm, sharp, balanced)
- Appearance (light/dark mode)
- Default views
- Voice input/output preferences

**Notes:** User-level overrides fund defaults where applicable.

---

#### E10-S06: CRM Integration

**Story:** As an Analyst, I want to connect our CRM so that deal data syncs between systems.

**Priority:** P0 | **Size:** XL | **Depends on:** None

**Acceptance Criteria:**
- OAuth connection flow for supported CRMs (Affinity first)
- Field mapping configuration
- Sync direction per field (app→CRM, CRM→app, bidirectional)
- Sync status and last sync time displayed
- Manual sync trigger
- Error handling with user notification

**Notes:** Deep integration required. Start with one CRM done well.

---

#### E10-S07: Email Integration

**Story:** As an Analyst, I want to connect email so that deal communications are tracked.

**Priority:** P0 | **Size:** L | **Depends on:** None

**Acceptance Criteria:**
- Configure fund intake email (deals@fund.ai)
- Forward emails to create deals (see E1-S03)
- Send emails from app with fund branding
- Track sent/received emails on deals
- OAuth for Gmail/Outlook (V2)

**Notes:** Start with forwarding; full OAuth in V2.

---

#### E10-S08: Calendar Integration

**Story:** As an Analyst, I want to connect my calendar so that calls are automatically linked to deals.

**Priority:** P1 | **Size:** L | **Depends on:** None

**Acceptance Criteria:**
- OAuth connection for Google Calendar, Outlook
- Auto-detect meetings with external participants
- Link meetings to deals by attendee matching
- AI note-taker scheduling
- Calendar display within app

**Notes:** Enables auto call prep and note-taker scheduling.

---

#### E10-S09: Fund User Management

**Story:** As a Partner, I want to manage fund users so that the right people have access.

**Priority:** P0 | **Size:** M | **Depends on:** None

**Acceptance Criteria:**
- Invite new users by email
- Assign roles (Partner, Associate, Analyst, Read-only)
- Deactivate/remove users
- View user list with roles
- Audit log of access changes

**Notes:** Admin function. SSO integration in V2.

---

#### E10-S10: AI Personality Selection

**Story:** As a Partner, I want to choose the AI's personality so that it matches our fund's culture.

**Priority:** P1 | **Size:** S | **Depends on:** None

**Acceptance Criteria:**
- Fund-level default personality:
  - Warm & approachable
  - Sharp & efficient
  - Balanced professional
- User-level override option
- Preview of each personality style
- Personality affects all AI text output

**Notes:** See PRD 8.6 for personality descriptions.

---

## E11: Onboarding

**Epic Description:** Fund and user onboarding experience including setup wizards and guided tours.

**Source:** PRD Section 13, User Journey 5

---

#### E11-S01: Fund Onboarding Wizard

**Story:** As a Partner, I want a guided setup wizard so that I can configure the fund properly.

**Priority:** P0 | **Size:** L | **Depends on:** E10-S01, E10-S03

**Acceptance Criteria:**
- Step-by-step wizard covering:
  1. Workspace basics (name, logo)
  2. User invites
  3. Thesis configuration
  4. Pipeline stages
  5. Memo template
  6. Integrations
- Progress indicator
- Can save and resume later
- Skip options for optional steps

**Notes:** Critical first impression. Should take 30-60 minutes total.

---

#### E11-S02: Historical Deal Import

**Story:** As an Analyst, I want to import historical deals so that our full pipeline is in the system.

**Priority:** P0 | **Size:** L | **Depends on:** E7-S01

**Acceptance Criteria:**
- Import from CSV, Excel
- Import from Affinity, Notion (via export)
- Field mapping UI
- Preview before import
- Progress indicator for large imports
- Report of imported vs failed records

**Notes:** Data migration is critical for adoption. Handle messy data gracefully.

---

#### E11-S03: Knowledge Base Ingestion

**Story:** As a Partner, I want to upload our investment documents so that AI understands our perspective.

**Priority:** P0 | **Size:** L | **Depends on:** None

**Acceptance Criteria:**
- Upload thesis decks, IC memos, sector notes
- Documents are processed and indexed
- AI uses documents for context in scoring and memos
- Upload history displayed
- Documents can be removed

**Notes:** Fund-specific knowledge is key differentiator.

---

#### E11-S04: User First Login Experience

**Story:** As a new user, I want a welcoming first experience so that I understand how to use the app.

**Priority:** P0 | **Size:** M | **Depends on:** E5-S01

**Acceptance Criteria:**
- AI greets new user by name
- AI explains its role and capabilities
- Brief interactive tour of key features
- User can configure initial preferences
- "Ask me anything" prompt to try chat

**Notes:** Set expectations and build relationship with AI from start.

---

#### E11-S05: Feature Tours

**Story:** As a new user, I want guided tours of features so that I learn how to use them.

**Priority:** P1 | **Size:** M | **Depends on:** E11-S04

**Acceptance Criteria:**
- Tours available for major features:
  - Deal workspace
  - Chat interface
  - Pipeline views
  - Memo editor
- Tours highlight key elements with explanations
- Tours can be dismissed and replayed
- Progress tracked per user

**Notes:** Contextual help. Don't force tours on experienced users.

---

#### E11-S06: Sample Data for New Funds

**Story:** As a Partner, I want to see example data so that I understand how the product works.

**Priority:** P2 | **Size:** M | **Depends on:** E11-S01

**Acceptance Criteria:**
- Option to populate with sample deals during onboarding
- Sample data demonstrates all features
- Sample data is clearly marked as "example"
- Easy cleanup when ready for real data

**Notes:** Helps during evaluation. Remove before production use.

---

#### E11-S07: Onboarding Progress Tracking

**Story:** As a Partner, I want to see onboarding progress so that I know what's left to set up.

**Priority:** P1 | **Size:** S | **Depends on:** E11-S01

**Acceptance Criteria:**
- Onboarding checklist in settings
- Items: Users invited, thesis configured, integrations connected, etc.
- Visual progress indicator
- Links to incomplete items
- Checklist dismissible when complete

**Notes:** Drives completion of setup.

---

#### E11-S08: AI Proactive Tips

**Story:** As a new user, I want the AI to proactively offer tips so that I discover useful features.

**Priority:** P2 | **Size:** S | **Depends on:** E5-S01

**Acceptance Criteria:**
- AI offers contextual tips during first week:
  - "Did you know you can ask me to draft emails?"
  - "Try using voice—tap the mic icon"
- Tips appear in chat panel
- Tips can be dismissed
- Tips stop after onboarding period

**Notes:** Gentle discovery, not intrusive.

---

## E12: Error Handling & Recovery

**Epic Description:** Handle errors, corrections, conflicts, and edge cases gracefully.

**Source:** User Journey 7

---

#### E12-S01: Inline Content Correction

**Story:** As an Analyst, I want to correct AI-generated content inline so that errors are fixed easily.

**Priority:** P0 | **Size:** M | **Depends on:** E2-S05, E3-S01

**Acceptance Criteria:**
- Click on any AI content to edit
- Correction interface appears
- User can provide correct value
- Optional: Explain why AI was wrong
- Correction saves and propagates to related fields
- Correction is logged for AI learning

**Notes:** Central to trust. Make corrections effortless.

---

#### E12-S02: Correction Propagation

**Story:** As an Analyst, I want corrections to propagate automatically so that I don't have to fix multiple places.

**Priority:** P0 | **Size:** M | **Depends on:** E12-S01

**Acceptance Criteria:**
- When a metric is corrected in summary, deal field updates
- When a deal field is corrected, CRM syncs (if connected)
- All propagations are logged
- User is informed of what was updated

**Notes:** Single source of truth. Fix once, fixed everywhere.

---

#### E12-S03: Feedback Collection

**Story:** As an Analyst, I want to provide feedback on AI outputs so that the AI improves over time.

**Priority:** P0 | **Size:** S | **Depends on:** E2-S05, E3-S01

**Acceptance Criteria:**
- Thumbs up/down on any AI output
- Optional tags: "Too optimistic", "Missing key info", "Wrong metric", etc.
- Optional free-text feedback
- Feedback is logged with AI output context
- Aggregate feedback visible to admins

**Notes:** Feedback fuels improvement. Make it low-friction.

---

#### E12-S04: Conflict Detection & Resolution

**Story:** As an Analyst, I want to be alerted to conflicting information so that I can resolve discrepancies.

**Priority:** P0 | **Size:** L | **Depends on:** E7-S01, E2-S05

**Acceptance Criteria:**
- AI detects conflicts:
  - Deck says X, call says Y
  - Manual entry differs from AI extraction
  - App differs from CRM
- Conflict is surfaced to user with both values
- User selects authoritative value
- Resolution propagates and is logged

**Notes:** Don't hide conflicts. Explicit resolution prevents confusion.

---

#### E12-S05: Integration Failure Handling

**Story:** As an Analyst, I want integration failures to be handled gracefully so that I can continue working.

**Priority:** P0 | **Size:** M | **Depends on:** E10-S06

**Acceptance Criteria:**
- When integration fails:
  - User is notified of failure
  - System retries automatically
  - Manual fallback is provided
  - Data is not lost
- Integration status is visible in settings
- Clear error messages with suggested actions

**Notes:** Graceful degradation is critical. Never block user workflow.

---

#### E12-S06: AI Uncertainty Indicators

**Story:** As an Analyst, I want to know when AI is uncertain so that I can verify important claims.

**Priority:** P1 | **Size:** S | **Depends on:** E1-S04, E2-S05

**Acceptance Criteria:**
- AI indicates confidence: High, Medium, Low
- Low-confidence items are visually marked
- Hovering shows why confidence is low
- Low-confidence items are prioritized for review

**Notes:** Transparency about limitations builds trust.

---

#### E12-S07: Escalation Logging

**Story:** As an Analyst, I want founder escalations to be logged so that I have full context for follow-up.

**Priority:** P0 | **Size:** S | **Depends on:** E4-S07, E4-S08

**Acceptance Criteria:**
- When AI escalates to human:
  - Escalation reason is logged
  - Relevant context is captured
  - Analyst is notified with summary
- Escalation history visible in deal activity
- Exportable for compliance

**Notes:** Full audit trail for founder interactions.

---

#### E12-S08: Data Export

**Story:** As a Partner, I want to export all fund data so that we're not locked in.

**Priority:** P0 | **Size:** M | **Depends on:** E7-S01

**Acceptance Criteria:**
- Full data export on request
- Formats: CSV, JSON, PDF for documents
- Export includes: Deals, memos, transcripts, activity
- Export is delivered securely
- Self-service for admins

**Notes:** Compliance and trust requirement. No lock-in.

---

#### E12-S09: Audit Log

**Story:** As a Partner, I want an audit log so that I can review who did what.

**Priority:** P1 | **Size:** M | **Depends on:** E10-S09

**Acceptance Criteria:**
- Log of significant actions:
  - User logins
  - Deal stage changes
  - External emails sent
  - Data exports
  - Settings changes
- Log is searchable and filterable
- Retained for compliance (minimum 1 year)
- Access restricted to admins

**Notes:** Compliance and debugging. Don't log everything—focus on significant events.

---

## Appendix: Story Summary

### By Priority

| Priority | Count | Percentage |
|----------|-------|------------|
| P0 | 70 | 62% |
| P1 | 30 | 27% |
| P2 | 13 | 11% |
| **Total** | **113** | **100%** |

### By Epic

| Epic | P0 | P1 | P2 | Total |
|------|----|----|-----|-------|
| E1: Deal Intake | 8 | 3 | 1 | 12 |
| E2: Call Management | 7 | 2 | 1 | 10 |
| E3: Memo Generation | 6 | 2 | 1 | 9 |
| E4: Founder Interaction | 5 | 4 | 2 | 11 |
| E5: Ask-the-Analyst | 6 | 3 | 1 | 10 |
| E6: IC Meeting Support | 4 | 2 | 1 | 7 |
| E7: Pipeline & Deal Management | 8 | 2 | 1 | 11 |
| E8: Collaboration | 4 | 3 | 1 | 8 |
| E9: Notifications | 5 | 2 | 1 | 8 |
| E10: Configuration | 6 | 3 | 1 | 10 |
| E11: Onboarding | 5 | 2 | 1 | 8 |
| E12: Error Handling | 6 | 2 | 1 | 9 |

### Key Dependencies

```
E1 (Deal Intake) → E7 (Pipeline) → E2 (Calls) → E3 (Memos) → E6 (IC)
                                       ↓
E10 (Config) ──────────────────→ E4 (Founder)
                                       ↓
E5 (Ask-the-Analyst) ←──────────────────┘
                                       ↓
E9 (Notifications) ←─── E8 (Collaboration)
                                       ↓
E11 (Onboarding) ←─────────────────────┘
                                       ↓
E12 (Error Handling) ←─────────────────┘
```

---

*Document version: v0.1*
*Last updated: [Date]*
*Total Stories: 113 (P0: 70, P1: 30, P2: 13)*
