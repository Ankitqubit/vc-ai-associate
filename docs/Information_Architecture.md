# Information Architecture: AI Analyst/Associate for VC

**Document owner:** Sahil
**Version:** v0.1
**Related documents:** AI_Associate_Full_PRD.md, User_Journeys.md, Epics_and_User_Stories.md

---

## Table of Contents

1. [Navigation Model](#1-navigation-model)
2. [Site Map](#2-site-map)
3. [Screen Inventory](#3-screen-inventory)
4. [Navigation Patterns](#4-navigation-patterns)
5. [Component Placement](#5-component-placement)
6. [State Management](#6-state-management)
7. [Flow Mapping](#7-flow-mapping)

---

## 1. Navigation Model

### 1.1 Design Philosophy

The AI Analyst uses a **hybrid navigation model** that combines:
- **Conversation-first**: The default experience centers on AI interaction
- **Traditional navigation**: Available for direct access when users know where they want to go
- **AI-driven navigation**: Users can ask the AI to take them anywhere

This approach supports both the "AI-led workspace" vision and the practical needs of power users who want direct access.

### 1.2 Desktop Navigation

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo]    [Search]                    [Notifications] [User Menu]  │  ← Header (persistent)
├─────────┬───────────────────────────────────────────────────────────┤
│         │                                                           │
│  Home   │                                                           │
│         │                                                           │
│  Deals  │              Main Content Area                            │
│         │                                                           │
│  Memos  │                                                           │
│         │                                                           │
│  Calls  │                                                           │
│         │                                            ┌─────────────┤
│ ─────── │                                            │  AI Panel   │  ← Contextual
│Settings │                                            │  (when in   │
│         │                                            │  workspace) │
└─────────┴────────────────────────────────────────────┴─────────────┘
     ↑
  Sidebar
(collapsible)
```

**Primary Navigation (Sidebar)**
| Item | Icon | Description |
|------|------|-------------|
| Home | 💬 | Conversation Home - AI chat interface |
| Deals | 📊 | Pipeline views and deal workspaces |
| Memos | 📝 | Investment memo list and editor |
| Calls | 📞 | Call prep, transcripts, summaries |
| Settings | ⚙️ | Fund and user configuration |

**Sidebar Behavior:**
- Default: Expanded (showing icons + labels)
- Collapsible to icons-only via toggle
- Remembers user preference
- Hover on collapsed sidebar shows tooltip with label

**Header Elements:**
| Element | Position | Behavior |
|---------|----------|----------|
| Logo | Left | Click → Conversation Home |
| Search | Center | Click or Cmd+K → Command bar |
| Notifications | Right | Click → Notification drawer |
| User Menu | Right | Click → User dropdown |

**AI Panel:**
- Appears contextually within workspaces (Deal, Memo, Call)
- Global access via Cmd+/ (opens drawer from right)
- Can be resized (default 320px width)
- Can be collapsed within workspace

### 1.3 Mobile Navigation

```
┌─────────────────────────────────┐
│  [Back]    [Title]    [Actions] │  ← Context header
├─────────────────────────────────┤
│                                 │
│                                 │
│        Main Content             │
│                                 │
│                                 │
│                         [Chat]  │  ← Floating action button
├─────────────────────────────────┤
│  🏠    📊    🔔    👤          │  ← Bottom tab bar
│ Home  Deals Activity Profile    │
└─────────────────────────────────┘
```

**Bottom Tab Bar:**
| Tab | Icon | Destination |
|-----|------|-------------|
| Home | 🏠 | Conversation Home |
| Deals | 📊 | Pipeline List |
| Activity | 🔔 | Activity/Notification feed |
| Profile | 👤 | User settings and preferences |

**Floating Chat Button:**
- Appears on all screens (except Conversation Home)
- Position: Bottom-right, above tab bar
- Tap → Opens AI chat drawer from bottom
- Long-press → Voice input

**Stack Navigation:**
- Screens stack on top of each other
- Back button in header to return
- Swipe from left edge to go back (iOS)
- Native navigation patterns per platform

### 1.4 Navigation Hierarchy

```
Level 0: App Shell
├── Level 1: Primary Sections (Tab bar / Sidebar)
│   ├── Level 2: Section Views (List, Kanban, etc.)
│   │   ├── Level 3: Item Workspaces (Deal, Memo, Call)
│   │   │   └── Level 4: Modals & Drawers
│   │   └── Level 3: Modals (Creation, Comparison)
│   └── Level 2: Settings Subsections
│       └── Level 3: Settings Details & Modals
└── Overlays: Command Bar, Search, Notifications (any level)
```

---

## 2. Site Map

### 2.1 Complete Site Map

```
AI Analyst
│
├── 🏠 Conversation Home [HOME]
│   ├── Morning Briefing State [HOME-001]
│   ├── Active Conversation State [HOME-002]
│   ├── Empty/New User State [HOME-003]
│   └── Voice Input Mode [HOME-004]
│
├── 📊 Deals [DEALS]
│   ├── Pipeline List View [DEALS-001]
│   │   ├── Filter Panel (drawer) [DEALS-001a]
│   │   ├── Sort Options (dropdown) [DEALS-001b]
│   │   ├── Column Customization (modal) [DEALS-001c]
│   │   └── Bulk Actions Bar [DEALS-001d]
│   │
│   ├── Pipeline Kanban View [DEALS-002]
│   │   ├── Stage Settings (dropdown) [DEALS-002a]
│   │   └── Card Quick View (popover) [DEALS-002b]
│   │
│   ├── Deal Workspace [DEALS-003]
│   │   ├── Overview Tab [DEALS-003a]
│   │   │   ├── Fit Score Detail (expandable) [DEALS-003a-1]
│   │   │   ├── Metrics Grid [DEALS-003a-2]
│   │   │   └── AI Summary Section [DEALS-003a-3]
│   │   ├── Timeline Tab [DEALS-003b]
│   │   │   ├── Activity Filter (dropdown) [DEALS-003b-1]
│   │   │   └── Activity Detail (expandable) [DEALS-003b-2]
│   │   ├── Documents Tab [DEALS-003c]
│   │   │   ├── Document Viewer (modal) [DEALS-003c-1]
│   │   │   └── Upload Modal [DEALS-003c-2]
│   │   ├── AI Panel (embedded) [DEALS-003d]
│   │   ├── Edit Deal Modal [DEALS-003e]
│   │   ├── Stage Change Confirmation [DEALS-003f]
│   │   └── Archive Confirmation [DEALS-003g]
│   │
│   ├── Deal Creation Modal [DEALS-004]
│   │   ├── Manual Entry Form [DEALS-004a]
│   │   ├── Deck Upload [DEALS-004b]
│   │   └── Link Import [DEALS-004c]
│   │
│   └── Deal Comparison Modal [DEALS-005]
│
├── 📝 Memos [MEMOS]
│   ├── Memo List [MEMOS-001]
│   │   ├── Filter Options (dropdown) [MEMOS-001a]
│   │   └── Status Tabs [MEMOS-001b]
│   │
│   ├── Memo Editor [MEMOS-002]
│   │   ├── Section Editor [MEMOS-002a]
│   │   ├── Citation Panel (drawer) [MEMOS-002b]
│   │   ├── Version History (drawer) [MEMOS-002c]
│   │   ├── Regenerate Section Modal [MEMOS-002d]
│   │   ├── AI Panel (embedded) [MEMOS-002e]
│   │   ├── Comment Thread (popover) [MEMOS-002f]
│   │   └── Export Options Modal [MEMOS-002g]
│   │
│   └── Memo Preview [MEMOS-003]
│       └── PDF Export [MEMOS-003a]
│
├── 📞 Calls [CALLS]
│   ├── Upcoming Calls List [CALLS-001]
│   │   └── Calendar View Toggle [CALLS-001a]
│   │
│   ├── Call Prep View [CALLS-002]
│   │   ├── Edit Section Mode [CALLS-002a]
│   │   ├── Add Question Modal [CALLS-002b]
│   │   └── Finalize Confirmation [CALLS-002c]
│   │
│   ├── Transcript View [CALLS-003]
│   │   ├── Summary Panel (collapsible) [CALLS-003a]
│   │   ├── Speaker Filter [CALLS-003b]
│   │   ├── Search in Transcript [CALLS-003c]
│   │   ├── Timestamp Navigation [CALLS-003d]
│   │   └── Correction Mode [CALLS-003e]
│   │
│   ├── Call Summary View [CALLS-004]
│   │   ├── Edit Summary Mode [CALLS-004a]
│   │   ├── Metrics Verification [CALLS-004b]
│   │   └── Send to CRM Modal [CALLS-004c]
│   │
│   └── Upload Transcript Modal [CALLS-005]
│
├── ⚙️ Settings [SETTINGS]
│   ├── Fund Configuration [SETTINGS-001]
│   │   ├── Thesis Configuration [SETTINGS-001a]
│   │   │   ├── Stage Preferences [SETTINGS-001a-1]
│   │   │   ├── Geography Settings [SETTINGS-001a-2]
│   │   │   ├── Sector Preferences [SETTINGS-001a-3]
│   │   │   └── Soft Criteria Weighting [SETTINGS-001a-4]
│   │   ├── Pipeline Stages [SETTINGS-001b]
│   │   │   ├── Add Stage Modal [SETTINGS-001b-1]
│   │   │   ├── Edit Stage Modal [SETTINGS-001b-2]
│   │   │   └── Stage Requirements Modal [SETTINGS-001b-3]
│   │   ├── Memo Templates [SETTINGS-001c]
│   │   │   ├── Template Editor [SETTINGS-001c-1]
│   │   │   └── Preview Template [SETTINGS-001c-2]
│   │   └── Automation Rules [SETTINGS-001d]
│   │       ├── Rule Builder Modal [SETTINGS-001d-1]
│   │       └── Rule Test Modal [SETTINGS-001d-2]
│   │
│   ├── User Preferences [SETTINGS-002]
│   │   ├── Notification Settings [SETTINGS-002a]
│   │   ├── AI Personality Selection [SETTINGS-002b]
│   │   ├── Appearance (Theme) [SETTINGS-002c]
│   │   └── Voice Settings [SETTINGS-002d]
│   │
│   ├── Integrations [SETTINGS-003]
│   │   ├── CRM Connection [SETTINGS-003a]
│   │   │   ├── OAuth Flow (external) [SETTINGS-003a-1]
│   │   │   ├── Field Mapping Modal [SETTINGS-003a-2]
│   │   │   └── Sync Settings [SETTINGS-003a-3]
│   │   ├── Calendar Connection [SETTINGS-003b]
│   │   │   └── OAuth Flow (external) [SETTINGS-003b-1]
│   │   ├── Email Setup [SETTINGS-003c]
│   │   └── Integration Status Dashboard [SETTINGS-003d]
│   │
│   └── Team Management [SETTINGS-004]
│       ├── User List [SETTINGS-004a]
│       ├── Invite User Modal [SETTINGS-004b]
│       ├── Edit User Role Modal [SETTINGS-004c]
│       ├── Remove User Confirmation [SETTINGS-004d]
│       └── Audit Log [SETTINGS-004e]
│
├── 🎓 Onboarding [ONBOARD]
│   ├── Welcome Screen [ONBOARD-001]
│   ├── Thesis Wizard [ONBOARD-002]
│   │   ├── Step 1: Stage [ONBOARD-002a]
│   │   ├── Step 2: Geography [ONBOARD-002b]
│   │   ├── Step 3: Check Size [ONBOARD-002c]
│   │   ├── Step 4: Sectors [ONBOARD-002d]
│   │   └── Step 5: Preferences [ONBOARD-002e]
│   ├── Workflow Setup [ONBOARD-003]
│   ├── Template Setup [ONBOARD-004]
│   ├── Integration Setup [ONBOARD-005]
│   ├── Import Wizard [ONBOARD-006]
│   │   ├── Source Selection [ONBOARD-006a]
│   │   ├── File Upload [ONBOARD-006b]
│   │   ├── Field Mapping [ONBOARD-006c]
│   │   ├── Preview & Confirm [ONBOARD-006d]
│   │   └── Import Progress [ONBOARD-006e]
│   ├── Knowledge Base Upload [ONBOARD-007]
│   └── Completion Screen [ONBOARD-008]
│
└── 🌐 Global Elements [GLOBAL]
    ├── Command Bar (overlay) [GLOBAL-001]
    │   ├── Search Results [GLOBAL-001a]
    │   ├── Recent Items [GLOBAL-001b]
    │   └── Quick Actions [GLOBAL-001c]
    ├── Notification Center (drawer) [GLOBAL-002]
    │   ├── Notification Item [GLOBAL-002a]
    │   ├── Notification Settings Link [GLOBAL-002b]
    │   └── Mark All Read [GLOBAL-002c]
    ├── AI Chat Panel (drawer) [GLOBAL-003]
    │   ├── Chat Input [GLOBAL-003a]
    │   ├── Voice Input Mode [GLOBAL-003b]
    │   ├── Message Thread [GLOBAL-003c]
    │   └── Action Confirmation [GLOBAL-003d]
    ├── User Menu (dropdown) [GLOBAL-004]
    │   ├── Profile Link [GLOBAL-004a]
    │   ├── Settings Link [GLOBAL-004b]
    │   ├── Help Link [GLOBAL-004c]
    │   └── Logout [GLOBAL-004d]
    ├── Toast Notifications [GLOBAL-005]
    ├── Error Modal [GLOBAL-006]
    ├── Confirmation Modal [GLOBAL-007]
    └── Loading States [GLOBAL-008]
```

### 2.2 Site Map Statistics

| Category | Screens | Modals/Drawers | States | Total |
|----------|---------|----------------|--------|-------|
| Conversation Home | 1 | 0 | 4 | 5 |
| Deals | 5 | 12 | 3 | 20 |
| Memos | 3 | 6 | 2 | 11 |
| Calls | 5 | 6 | 2 | 13 |
| Settings | 4 | 14 | 0 | 18 |
| Onboarding | 8 | 5 | 0 | 13 |
| Global Elements | 0 | 8 | 4 | 12 |
| **Total** | **26** | **51** | **15** | **92** |

[DIAGRAM: Visual site map showing hierarchy and relationships between screens]

---

## 3. Screen Inventory

### 3.1 Conversation Home

#### HOME-001: Morning Briefing State

| Attribute | Value |
|-----------|-------|
| **ID** | HOME-001 |
| **Name** | Morning Briefing State |
| **Type** | State |
| **Purpose** | Welcome user with contextual summary of overnight activity and suggested actions |
| **Entry Points** | App launch (first visit of day), Return after extended absence |
| **Exit Points** | Any sidebar item, Command bar action, Click on briefing item |
| **Key Components** | AI greeting, Activity summary cards, Suggested actions, Quick action buttons |
| **AI Presence** | AI initiates with personalized greeting and briefing |
| **Mobile Variant** | Same content, vertical card layout, voice output option |
| **Related Screens** | HOME-002, DEALS-001, DEALS-003 |

**Sample AI Greeting (Warm personality):**
> "Good morning, Sarah! Here's what happened while you were away: 3 new deals came in overnight—TechCo looks promising with a fit score of 82. You have a call with Acme at 2pm, and the DataFlow memo is ready for your review. What would you like to tackle first?"

---

#### HOME-002: Active Conversation State

| Attribute | Value |
|-----------|-------|
| **ID** | HOME-002 |
| **Name** | Active Conversation State |
| **Type** | State |
| **Purpose** | Ongoing chat conversation with AI for queries, research, and actions |
| **Entry Points** | Continue from briefing, Return to Home during session, Voice activation |
| **Exit Points** | Navigate away via sidebar, AI surfaces workspace, Idle timeout |
| **Key Components** | Message thread, Chat input, Voice button, Suggested prompts, Action cards |
| **AI Presence** | Full conversational interface, AI responds to all messages |
| **Mobile Variant** | Full-screen chat, voice input prominent, swipe to dismiss |
| **Related Screens** | All screens (AI can navigate anywhere) |

---

#### HOME-003: Empty/New User State

| Attribute | Value |
|-----------|-------|
| **ID** | HOME-003 |
| **Name** | Empty/New User State |
| **Type** | State |
| **Purpose** | Onboard new users and guide them to first actions |
| **Entry Points** | First login, Empty fund with no deals |
| **Exit Points** | Start onboarding, Add first deal, Explore with AI |
| **Key Components** | Welcome message, Getting started checklist, Sample prompts, Help links |
| **AI Presence** | AI introduces itself and offers guidance |
| **Mobile Variant** | Same content, simplified layout |
| **Related Screens** | ONBOARD-001, DEALS-004 |

---

#### HOME-004: Voice Input Mode

| Attribute | Value |
|-----------|-------|
| **ID** | HOME-004 |
| **Name** | Voice Input Mode |
| **Type** | State |
| **Purpose** | Hands-free voice interaction with AI |
| **Entry Points** | Tap voice button, Long-press floating button (mobile), "Hey [AI Name]" |
| **Exit Points** | Release to send, Tap to cancel, Voice response completes |
| **Key Components** | Audio waveform visualization, Cancel button, Voice level indicator |
| **AI Presence** | AI listens and responds with voice (if enabled) |
| **Mobile Variant** | Full-screen takeover with large waveform |
| **Related Screens** | HOME-002 |

---

### 3.2 Deals

#### DEALS-001: Pipeline List View

| Attribute | Value |
|-----------|-------|
| **ID** | DEALS-001 |
| **Name** | Pipeline List View |
| **Type** | Screen |
| **Purpose** | View and manage all deals in a sortable, filterable list |
| **Entry Points** | Sidebar "Deals", Command bar "show deals", AI "show me the pipeline" |
| **Exit Points** | Click deal → DEALS-003, Create deal → DEALS-004, Switch to Kanban → DEALS-002 |
| **Key Components** | Data table, Column headers (sortable), Filter button, View toggle, Search, Add Deal button |
| **AI Presence** | Contextual AI panel available via Cmd+/, AI search via command bar |
| **Mobile Variant** | Card list instead of table, swipe actions, pull-to-refresh |
| **Related Screens** | DEALS-002, DEALS-003, DEALS-004 |

**Columns (Default):**
| Column | Sortable | Filterable |
|--------|----------|------------|
| Company | Yes | Yes (search) |
| Stage | Yes | Yes (multi-select) |
| Fit Score | Yes | Yes (range) |
| Owner | Yes | Yes (multi-select) |
| Last Activity | Yes | Yes (date range) |
| Source | No | Yes (multi-select) |

---

#### DEALS-001a: Filter Panel (Drawer)

| Attribute | Value |
|-----------|-------|
| **ID** | DEALS-001a |
| **Name** | Filter Panel |
| **Type** | Drawer |
| **Purpose** | Apply complex filters to pipeline view |
| **Entry Points** | Click Filter button on DEALS-001 |
| **Exit Points** | Apply filters, Clear all, Click outside to close |
| **Key Components** | Filter groups (Stage, Score, Owner, Date, Source), Apply button, Clear button, Save filter option |
| **AI Presence** | None directly; AI search is alternative |
| **Mobile Variant** | Full-screen modal instead of drawer |
| **Related Screens** | DEALS-001 |

---

#### DEALS-002: Pipeline Kanban View

| Attribute | Value |
|-----------|-------|
| **ID** | DEALS-002 |
| **Name** | Pipeline Kanban View |
| **Type** | Screen |
| **Purpose** | Visual pipeline management with drag-and-drop stage changes |
| **Entry Points** | View toggle from DEALS-001, Command bar "kanban view" |
| **Exit Points** | Click card → DEALS-003, Switch to List → DEALS-001 |
| **Key Components** | Stage columns, Deal cards, Drag handles, Column headers with count, Collapse/expand columns |
| **AI Presence** | Contextual AI panel available via Cmd+/ |
| **Mobile Variant** | Horizontal scroll columns, tap to expand card |
| **Related Screens** | DEALS-001, DEALS-003 |

**Card Content:**
- Company name and logo
- Fit score badge
- Owner avatar
- Days in stage indicator
- Quick action menu (...)

---

#### DEALS-003: Deal Workspace

| Attribute | Value |
|-----------|-------|
| **ID** | DEALS-003 |
| **Name** | Deal Workspace |
| **Type** | Screen |
| **Purpose** | Comprehensive view of a single deal with all related information |
| **Entry Points** | Click deal from list/kanban, Command bar "show [company]", AI "tell me about [company]" |
| **Exit Points** | Back to pipeline, Navigate to related memo, Navigate to call |
| **Key Components** | Header (company, score, stage, owner), Tab bar, Content area, AI panel (embedded) |
| **AI Presence** | Embedded AI panel specific to this deal context |
| **Mobile Variant** | Tabs become horizontal scroll, AI panel is bottom sheet |
| **Related Screens** | DEALS-001, MEMOS-002, CALLS-003 |

**Header Elements:**
| Element | Interactive |
|---------|-------------|
| Company name | Editable on click |
| Company logo | Uploadable |
| Fit score | Click for detail expansion |
| Stage dropdown | Select to change stage |
| Owner selector | Assign/reassign |
| Actions menu | Archive, Delete, Flag for partner |

---

#### DEALS-003a: Overview Tab

| Attribute | Value |
|-----------|-------|
| **ID** | DEALS-003a |
| **Name** | Deal Overview Tab |
| **Type** | Tab Content |
| **Purpose** | Summary view of key deal information |
| **Entry Points** | Default tab when opening Deal Workspace |
| **Exit Points** | Switch tabs, Click through to detail |
| **Key Components** | AI summary card, Metrics grid, Thesis fit rationale, Team section, Funding section, Quick actions |
| **AI Presence** | AI summary is prominent; "Ask about this deal" prompt |
| **Mobile Variant** | Vertical card stack, collapsible sections |
| **Related Screens** | DEALS-003b, DEALS-003c |

---

#### DEALS-003b: Timeline Tab

| Attribute | Value |
|-----------|-------|
| **ID** | DEALS-003b |
| **Name** | Deal Timeline Tab |
| **Type** | Tab Content |
| **Purpose** | Chronological activity feed for the deal |
| **Entry Points** | Click Timeline tab in Deal Workspace |
| **Exit Points** | Click activity item, Switch tabs |
| **Key Components** | Activity feed, Filter dropdown, Activity items (calls, emails, notes, AI actions), Add note button |
| **AI Presence** | AI actions appear in timeline with attribution |
| **Mobile Variant** | Same vertical feed, tap to expand items |
| **Related Screens** | CALLS-003, MEMOS-002 |

**Activity Types:**
| Type | Icon | Description |
|------|------|-------------|
| Call | 📞 | Call completed with summary link |
| Email | ✉️ | Email sent/received |
| Note | 📝 | Manual note added |
| Stage Change | 🔄 | Deal moved to new stage |
| AI Action | ✦ | AI-initiated action (parsing, research, etc.) |
| Document | 📄 | Document uploaded |
| Comment | 💬 | Team comment added |

---

#### DEALS-003c: Documents Tab

| Attribute | Value |
|-----------|-------|
| **ID** | DEALS-003c |
| **Name** | Deal Documents Tab |
| **Type** | Tab Content |
| **Purpose** | Access all documents associated with the deal |
| **Entry Points** | Click Documents tab in Deal Workspace |
| **Exit Points** | Open document viewer, Upload new document |
| **Key Components** | Document list, Upload button, Document categories, Search, Preview thumbnails |
| **AI Presence** | "Summarize this document" action on each |
| **Mobile Variant** | Grid view of thumbnails, tap to preview |
| **Related Screens** | DEALS-003c-1 (Document Viewer) |

**Document Categories:**
- Pitch Deck
- Memos
- Call Transcripts
- Data Room
- Other

---

#### DEALS-004: Deal Creation Modal

| Attribute | Value |
|-----------|-------|
| **ID** | DEALS-004 |
| **Name** | Deal Creation Modal |
| **Type** | Modal |
| **Purpose** | Create a new deal record via multiple methods |
| **Entry Points** | "Add Deal" button, Command bar "new deal", AI "create a deal for [company]" |
| **Exit Points** | Save deal, Cancel, Close modal |
| **Key Components** | Tab bar (Manual, Upload, Link), Form fields, Submit button |
| **AI Presence** | AI processes deck if uploaded |
| **Mobile Variant** | Full-screen modal with camera option for deck photos |
| **Related Screens** | DEALS-003 |

**Creation Methods:**
1. **Manual Entry**: Company name (required), optional fields
2. **Deck Upload**: Drag-and-drop or file picker
3. **Link Import**: Paste DocSend/Google Drive URL

---

#### DEALS-005: Deal Comparison Modal

| Attribute | Value |
|-----------|-------|
| **ID** | DEALS-005 |
| **Name** | Deal Comparison Modal |
| **Type** | Modal |
| **Purpose** | Compare 2-4 deals side by side |
| **Entry Points** | Select multiple deals → Compare action, Command bar "compare [deal] and [deal]" |
| **Exit Points** | Close modal, Click deal to open workspace |
| **Key Components** | Deal selector, Comparison table, Highlight differences toggle |
| **AI Presence** | "Summarize comparison" button |
| **Mobile Variant** | Swipe between deals instead of side-by-side |
| **Related Screens** | DEALS-001, DEALS-003 |

---

### 3.3 Memos

#### MEMOS-001: Memo List

| Attribute | Value |
|-----------|-------|
| **ID** | MEMOS-001 |
| **Name** | Memo List |
| **Type** | Screen |
| **Purpose** | View and manage all investment memos |
| **Entry Points** | Sidebar "Memos", Command bar "show memos" |
| **Exit Points** | Click memo → MEMOS-002, Create new memo |
| **Key Components** | Memo cards, Status tabs (Draft, Review, Final), Filter, Search, New Memo button |
| **AI Presence** | Contextual AI panel available |
| **Mobile Variant** | Card list, status as colored badges |
| **Related Screens** | MEMOS-002, DEALS-003 |

**Memo Card Content:**
- Deal/Company name
- Status badge (Draft, In Review, Final)
- Last edited timestamp
- Editor/Author
- Progress indicator (sections complete)

---

#### MEMOS-002: Memo Editor

| Attribute | Value |
|-----------|-------|
| **ID** | MEMOS-002 |
| **Name** | Memo Editor |
| **Type** | Screen |
| **Purpose** | Edit and refine investment memo content |
| **Entry Points** | Click memo from list, "Edit memo" from deal workspace, AI "generate memo for [deal]" |
| **Exit Points** | Back to list, Navigate to deal, Mark as Final |
| **Key Components** | Section navigation, Rich text editor, AI attribution badges, Citation links, Comment threads, Action bar |
| **AI Presence** | Embedded AI panel, Regenerate section button, AI content badges |
| **Mobile Variant** | Section-by-section editing, simplified toolbar |
| **Related Screens** | MEMOS-001, MEMOS-002b, MEMOS-002c, DEALS-003 |

**Editor Features:**
| Feature | Description |
|---------|-------------|
| Section nav | Left sidebar with section list |
| AI badges | Subtle indicator on AI-generated content |
| Citations | Inline citation links to sources |
| Comments | Highlight text to add comment |
| Regenerate | Button to regenerate section with feedback |
| Version indicator | Shows draft/review/final status |

---

#### MEMOS-002b: Citation Panel (Drawer)

| Attribute | Value |
|-----------|-------|
| **ID** | MEMOS-002b |
| **Name** | Citation Panel |
| **Type** | Drawer |
| **Purpose** | View and verify sources for AI-generated claims |
| **Entry Points** | Click citation link in memo, "View sources" button |
| **Exit Points** | Close drawer, Click source to open original |
| **Key Components** | Citation list, Source preview, Link to original, Confidence indicator |
| **AI Presence** | Citations are AI-generated |
| **Mobile Variant** | Bottom sheet with source preview |
| **Related Screens** | MEMOS-002, CALLS-003, DEALS-003c |

---

#### MEMOS-002c: Version History (Drawer)

| Attribute | Value |
|-----------|-------|
| **ID** | MEMOS-002c |
| **Name** | Version History |
| **Type** | Drawer |
| **Purpose** | View and restore previous memo versions |
| **Entry Points** | "History" button in editor toolbar |
| **Exit Points** | Close drawer, Restore version |
| **Key Components** | Version list (timestamp, author), Diff view, Restore button, Compare toggle |
| **AI Presence** | None |
| **Mobile Variant** | Full-screen modal with version list |
| **Related Screens** | MEMOS-002 |

---

#### MEMOS-002d: Regenerate Section Modal

| Attribute | Value |
|-----------|-------|
| **ID** | MEMOS-002d |
| **Name** | Regenerate Section Modal |
| **Type** | Modal |
| **Purpose** | Regenerate a memo section with specific feedback |
| **Entry Points** | "Regenerate" button on memo section |
| **Exit Points** | Accept new version, Keep original, Cancel |
| **Key Components** | Feedback tags, Custom feedback input, Preview of new content, Compare toggle |
| **AI Presence** | AI regenerates based on feedback |
| **Mobile Variant** | Full-screen modal |
| **Related Screens** | MEMOS-002 |

**Feedback Tags:**
- Too optimistic
- Too pessimistic
- Add more detail
- Make more concise
- Missing key information
- Wrong focus

---

### 3.4 Calls

#### CALLS-001: Upcoming Calls List

| Attribute | Value |
|-----------|-------|
| **ID** | CALLS-001 |
| **Name** | Upcoming Calls List |
| **Type** | Screen |
| **Purpose** | View scheduled calls and access call prep |
| **Entry Points** | Sidebar "Calls", Command bar "show calls" |
| **Exit Points** | Click call → CALLS-002, View past call → CALLS-003 |
| **Key Components** | Call list (upcoming + past tabs), Calendar toggle, Prep status indicator, Quick prep button |
| **AI Presence** | Contextual AI panel available |
| **Mobile Variant** | Card list with swipe to prep |
| **Related Screens** | CALLS-002, CALLS-003, DEALS-003 |

---

#### CALLS-002: Call Prep View

| Attribute | Value |
|-----------|-------|
| **ID** | CALLS-002 |
| **Name** | Call Prep View |
| **Type** | Screen |
| **Purpose** | Review and customize AI-generated call prep |
| **Entry Points** | Click "Prep" from call list, Navigate from deal workspace |
| **Exit Points** | Mark as finalized, Navigate to deal |
| **Key Components** | Company overview, Hypothesis, Key questions, Concerns, Agenda, Edit buttons, Finalize button |
| **AI Presence** | AI generates all content; edit to customize |
| **Mobile Variant** | Collapsible sections, voice readout option |
| **Related Screens** | CALLS-001, DEALS-003 |

**Prep Sections:**
1. Company Overview
2. Thesis Fit Hypothesis
3. Key Questions (reorderable)
4. Concerns to Probe
5. Suggested Agenda

---

#### CALLS-003: Transcript View

| Attribute | Value |
|-----------|-------|
| **ID** | CALLS-003 |
| **Name** | Transcript View |
| **Type** | Screen |
| **Purpose** | View full call transcript with AI summary and corrections |
| **Entry Points** | Click completed call from list, Navigate from deal timeline |
| **Exit Points** | Navigate to deal, Navigate to summary |
| **Key Components** | Full transcript, Speaker labels, Timestamps, Summary panel, Correction mode, Search |
| **AI Presence** | Summary panel, "Ask about this call" prompt |
| **Mobile Variant** | Summary first, tap to expand transcript |
| **Related Screens** | CALLS-004, DEALS-003 |

---

#### CALLS-003e: Correction Mode

| Attribute | Value |
|-----------|-------|
| **ID** | CALLS-003e |
| **Name** | Transcript Correction Mode |
| **Type** | State |
| **Purpose** | Correct AI extraction errors in call summary |
| **Entry Points** | Click "Correct" on a metric or summary item |
| **Exit Points** | Save correction, Cancel |
| **Key Components** | Editable field, Original value, Correction input, Optional explanation, Save button |
| **AI Presence** | AI learns from corrections |
| **Mobile Variant** | Bottom sheet with input |
| **Related Screens** | CALLS-003, CALLS-004 |

---

#### CALLS-004: Call Summary View

| Attribute | Value |
|-----------|-------|
| **ID** | CALLS-004 |
| **Name** | Call Summary View |
| **Type** | Screen |
| **Purpose** | Review and edit AI-generated call summary |
| **Entry Points** | "View Summary" from transcript, Navigate from deal timeline |
| **Exit Points** | Back to transcript, Approve summary, Edit summary |
| **Key Components** | Key learnings, Metrics table, Risks, Open questions, Next steps, Edit mode, Approve button |
| **AI Presence** | All content AI-generated with edit capability |
| **Mobile Variant** | Collapsible sections, inline editing |
| **Related Screens** | CALLS-003, DEALS-003 |

---

### 3.5 Settings

#### SETTINGS-001: Fund Configuration

| Attribute | Value |
|-----------|-------|
| **ID** | SETTINGS-001 |
| **Name** | Fund Configuration |
| **Type** | Screen |
| **Purpose** | Configure fund-wide settings (thesis, workflow, templates) |
| **Entry Points** | Sidebar "Settings" → Fund Configuration tab |
| **Exit Points** | Navigate to subsection, Back to settings overview |
| **Key Components** | Settings navigation, Configuration cards, Status indicators |
| **AI Presence** | None directly |
| **Mobile Variant** | List of setting categories |
| **Related Screens** | SETTINGS-001a through SETTINGS-001d |

---

#### SETTINGS-001a: Thesis Configuration

| Attribute | Value |
|-----------|-------|
| **ID** | SETTINGS-001a |
| **Name** | Thesis Configuration |
| **Type** | Screen |
| **Purpose** | Configure investment thesis criteria for fit scoring |
| **Entry Points** | Fund Configuration → Thesis |
| **Exit Points** | Save changes, Cancel, Back to Fund Configuration |
| **Key Components** | Hard constraints section, Soft preferences section, Weighting sliders, Preview score impact |
| **AI Presence** | Preview how changes affect sample deals |
| **Mobile Variant** | Multi-step wizard format |
| **Related Screens** | SETTINGS-001, ONBOARD-002 |

**Configuration Sections:**
1. **Hard Constraints**: Stage, Geography, Check Size, Excluded Sectors
2. **Soft Preferences**: Team vs Market vs Traction weights, Sector appetites, Business model preferences
3. **Preview**: Sample deals with new vs old scores

---

#### SETTINGS-001b: Pipeline Stages

| Attribute | Value |
|-----------|-------|
| **ID** | SETTINGS-001b |
| **Name** | Pipeline Stages |
| **Type** | Screen |
| **Purpose** | Configure deal pipeline stages and requirements |
| **Entry Points** | Fund Configuration → Pipeline Stages |
| **Exit Points** | Save changes, Back to Fund Configuration |
| **Key Components** | Stage list (reorderable), Add stage button, Stage requirements, Permissions per stage |
| **AI Presence** | None |
| **Mobile Variant** | Drag handle for reorder, tap to edit |
| **Related Screens** | SETTINGS-001, DEALS-003 |

---

#### SETTINGS-002: User Preferences

| Attribute | Value |
|-----------|-------|
| **ID** | SETTINGS-002 |
| **Name** | User Preferences |
| **Type** | Screen |
| **Purpose** | Configure individual user settings |
| **Entry Points** | Sidebar "Settings" → User Preferences, User menu → Preferences |
| **Exit Points** | Save changes, Back |
| **Key Components** | Notification settings, AI personality selector, Appearance toggle, Voice settings |
| **AI Presence** | Personality preview |
| **Mobile Variant** | Standard settings list UI |
| **Related Screens** | SETTINGS-002a through SETTINGS-002d |

---

#### SETTINGS-003: Integrations

| Attribute | Value |
|-----------|-------|
| **ID** | SETTINGS-003 |
| **Name** | Integrations |
| **Type** | Screen |
| **Purpose** | Connect and manage external integrations |
| **Entry Points** | Sidebar "Settings" → Integrations |
| **Exit Points** | Connect integration, Manage integration, Back |
| **Key Components** | Integration cards, Connection status, Last sync time, Configure button |
| **AI Presence** | None |
| **Mobile Variant** | Card list with status badges |
| **Related Screens** | SETTINGS-003a through SETTINGS-003d |

**Integration Cards:**
| Integration | Status Options |
|-------------|----------------|
| CRM (Affinity) | Not connected, Connected, Error |
| Calendar (Google/Outlook) | Not connected, Connected |
| Email | Not configured, Active |

---

#### SETTINGS-004: Team Management

| Attribute | Value |
|-----------|-------|
| **ID** | SETTINGS-004 |
| **Name** | Team Management |
| **Type** | Screen |
| **Purpose** | Manage fund team members and permissions |
| **Entry Points** | Sidebar "Settings" → Team (Partners only) |
| **Exit Points** | Invite user, Edit user, Back |
| **Key Components** | User list table, Invite button, Role badges, Action menu per user |
| **AI Presence** | None |
| **Mobile Variant** | User cards with role indicator |
| **Related Screens** | SETTINGS-004a through SETTINGS-004e |

---

### 3.6 Onboarding

#### ONBOARD-001: Welcome Screen

| Attribute | Value |
|-----------|-------|
| **ID** | ONBOARD-001 |
| **Name** | Welcome Screen |
| **Type** | Screen |
| **Purpose** | Welcome new fund and introduce AI assistant |
| **Entry Points** | First login for new fund |
| **Exit Points** | Start setup → ONBOARD-002 |
| **Key Components** | AI introduction, Value proposition, Start button, Estimated time |
| **AI Presence** | AI introduces itself with personality preview |
| **Mobile Variant** | Same content, optimized layout |
| **Related Screens** | ONBOARD-002 |

**AI Introduction (Warm personality):**
> "Hi! I'm [AI Name], and I'm excited to be your fund's new AI teammate. Over the next few minutes, I'll learn about your investment thesis, your workflow, and how you like to work. The more you share, the more helpful I can be. Ready to get started?"

---

#### ONBOARD-002: Thesis Wizard

| Attribute | Value |
|-----------|-------|
| **ID** | ONBOARD-002 |
| **Name** | Thesis Wizard |
| **Type** | Screen |
| **Purpose** | Guided configuration of investment thesis |
| **Entry Points** | Welcome screen → Start, Settings → Thesis (re-configuration) |
| **Exit Points** | Complete → ONBOARD-003, Skip (with warning) |
| **Key Components** | Step indicator, Current step content, Back/Next buttons, Progress bar |
| **AI Presence** | AI explains each step and asks clarifying questions |
| **Mobile Variant** | Same wizard flow, full-screen steps |
| **Related Screens** | ONBOARD-001, ONBOARD-003, SETTINGS-001a |

**Wizard Steps:**
1. Stage preferences
2. Geography focus
3. Check size range
4. Sector preferences
5. Soft criteria weighting

---

#### ONBOARD-006: Import Wizard

| Attribute | Value |
|-----------|-------|
| **ID** | ONBOARD-006 |
| **Name** | Import Wizard |
| **Type** | Screen |
| **Purpose** | Import historical deals from external sources |
| **Entry Points** | Onboarding flow, Settings → Import |
| **Exit Points** | Complete import, Skip |
| **Key Components** | Source selector, File upload, Field mapping, Preview, Progress |
| **AI Presence** | AI assists with field mapping suggestions |
| **Mobile Variant** | Limited—recommend desktop for import |
| **Related Screens** | ONBOARD-005, ONBOARD-007 |

---

### 3.7 Global Elements

#### GLOBAL-001: Command Bar

| Attribute | Value |
|-----------|-------|
| **ID** | GLOBAL-001 |
| **Name** | Command Bar |
| **Type** | Overlay |
| **Purpose** | Universal search and command interface |
| **Entry Points** | Cmd+K (desktop), Search icon in header |
| **Exit Points** | Select item, Press Escape, Click outside |
| **Key Components** | Search input, Results list, Recent items, Quick actions, Keyboard hints |
| **AI Presence** | Natural language queries processed by AI |
| **Mobile Variant** | Full-screen search with voice option |
| **Related Screens** | All screens |

**Command Types:**
| Type | Example | Action |
|------|---------|--------|
| Search | "Acme" | Show matching deals |
| Navigation | "deals" | Go to Deals section |
| Natural language | "show me fintech deals" | AI processes and shows results |
| Action | "new deal" | Open deal creation |
| Command | "settings" | Go to settings |

---

#### GLOBAL-002: Notification Center

| Attribute | Value |
|-----------|-------|
| **ID** | GLOBAL-002 |
| **Name** | Notification Center |
| **Type** | Drawer |
| **Purpose** | View and manage notifications |
| **Entry Points** | Click notification bell in header |
| **Exit Points** | Close drawer, Click notification |
| **Key Components** | Notification list, Unread indicator, Mark all read, Settings link |
| **AI Presence** | AI activity notifications appear here |
| **Mobile Variant** | Full-screen Activity tab |
| **Related Screens** | All screens, SETTINGS-002a |

---

#### GLOBAL-003: AI Chat Panel

| Attribute | Value |
|-----------|-------|
| **ID** | GLOBAL-003 |
| **Name** | AI Chat Panel (Global) |
| **Type** | Drawer |
| **Purpose** | Access AI assistant from any screen |
| **Entry Points** | Cmd+/ (desktop), Floating button (mobile), "Hey [AI Name]" |
| **Exit Points** | Close drawer, AI navigates to workspace |
| **Key Components** | Chat input, Voice button, Message thread, Suggested prompts, Context indicator |
| **AI Presence** | Full AI chat interface |
| **Mobile Variant** | Bottom sheet, swipe to dismiss |
| **Related Screens** | All screens |

**Context Awareness:**
- Panel shows current context: "You're viewing Acme deal"
- Queries scoped to context unless specified otherwise
- "Ask about something else" to switch context

---

#### GLOBAL-005: Toast Notifications

| Attribute | Value |
|-----------|-------|
| **ID** | GLOBAL-005 |
| **Name** | Toast Notifications |
| **Type** | Overlay |
| **Purpose** | Show brief feedback messages for actions |
| **Entry Points** | System triggers (action complete, error, info) |
| **Exit Points** | Auto-dismiss (5 seconds), Manual dismiss, Click action |
| **Key Components** | Icon, Message, Action link (optional), Dismiss button |
| **AI Presence** | AI completion toasts use AI icon |
| **Mobile Variant** | Same, positioned at bottom |
| **Related Screens** | All screens |

**Toast Types:**
| Type | Icon | Example |
|------|------|---------|
| Success | ✓ | "Deal saved" |
| Error | ✗ | "Failed to sync" |
| Info | ℹ | "Memo draft ready" |
| AI | ✦ | "Call summary generated" |

---

## 4. Navigation Patterns

### 4.1 Keyboard Shortcuts (Desktop)

| Shortcut | Action | Context |
|----------|--------|---------|
| `Cmd+K` | Open Command Bar | Global |
| `Cmd+/` | Open AI Chat Panel | Global |
| `Cmd+N` | New Deal | Deals section |
| `Cmd+S` | Save | Editors |
| `Cmd+Enter` | Send message | Chat |
| `Escape` | Close modal/drawer | Modals |
| `G then D` | Go to Deals | Global |
| `G then M` | Go to Memos | Global |
| `G then C` | Go to Calls | Global |
| `G then S` | Go to Settings | Global |
| `G then H` | Go to Home | Global |
| `J` / `K` | Navigate list down/up | Lists |
| `Enter` | Open selected item | Lists |
| `?` | Show keyboard shortcuts | Global |

### 4.2 Mobile Gestures

| Gesture | Action | Context |
|---------|--------|---------|
| Swipe left on card | Quick actions (archive, delete) | Lists |
| Swipe right on card | Primary action (view, prep) | Lists |
| Swipe from left edge | Go back | All screens |
| Swipe down on drawer | Dismiss drawer | Drawers/sheets |
| Pull down on list | Refresh | Lists |
| Long press on mic | Voice input | Global |
| Pinch on document | Zoom | Document viewer |

### 4.3 AI-Driven Navigation

Users can navigate using natural language with the AI:

| User Says | AI Action |
|-----------|-----------|
| "Show me Acme" | Opens Acme deal workspace |
| "Go to deals" | Navigates to Deals list |
| "Open the DataFlow memo" | Opens memo editor |
| "What calls do I have today?" | Shows upcoming calls |
| "Take me to settings" | Navigates to Settings |
| "Show me deals like this" | Opens comparison/filtered view |

### 4.4 Deep Linking Structure

```
/                           → Conversation Home
/deals                      → Pipeline List
/deals/kanban               → Pipeline Kanban
/deals/:dealId              → Deal Workspace
/deals/:dealId/overview     → Deal Overview Tab
/deals/:dealId/timeline     → Deal Timeline Tab
/deals/:dealId/documents    → Deal Documents Tab
/deals/new                  → Deal Creation Modal
/memos                      → Memo List
/memos/:memoId              → Memo Editor
/memos/:memoId/preview      → Memo Preview
/calls                      → Calls List
/calls/:callId/prep         → Call Prep View
/calls/:callId/transcript   → Transcript View
/calls/:callId/summary      → Summary View
/settings                   → Settings Overview
/settings/fund              → Fund Configuration
/settings/user              → User Preferences
/settings/integrations      → Integrations
/settings/team              → Team Management
/onboarding                 → Onboarding Wizard
/onboarding/:step           → Specific Onboarding Step
```

---

## 5. Component Placement

### 5.1 Desktop Layout Zones

```
┌────────────────────────────────────────────────────────────────────────┐
│                              HEADER                                     │
│  [Logo] [Breadcrumb/Title]               [Search] [Notifications] [User]│
├──────────┬─────────────────────────────────────────────────┬───────────┤
│          │                                                 │           │
│          │                                                 │           │
│  SIDEBAR │              MAIN CONTENT                       │ AI PANEL  │
│          │                                                 │ (optional)│
│  [Home]  │                                                 │           │
│  [Deals] │                                                 │           │
│  [Memos] │                                                 │           │
│  [Calls] │                                                 │           │
│  [-----] │                                                 │           │
│  [Settin]│                                                 │           │
│          │                                                 │           │
└──────────┴─────────────────────────────────────────────────┴───────────┘
```

| Zone | Width | Behavior |
|------|-------|----------|
| Header | Full width, 56px height | Fixed, always visible |
| Sidebar | 240px expanded, 64px collapsed | Collapsible, remembers state |
| Main Content | Flexible | Scrollable, contains primary content |
| AI Panel | 320px default | Contextual (in workspace), global via Cmd+/ |

### 5.2 Mobile Layout Zones

```
┌─────────────────────────────┐
│         HEADER              │  ← Context-specific (back, title, actions)
├─────────────────────────────┤
│                             │
│                             │
│       MAIN CONTENT          │
│       (scrollable)          │
│                             │
│                             │
│                       [FAB] │  ← Floating Action Button (chat)
├─────────────────────────────┤
│  🏠     📊     🔔     👤   │  ← Bottom Tab Bar
└─────────────────────────────┘
```

### 5.3 Component Placement by Screen

| Screen | Header | Sidebar | AI Panel | FAB |
|--------|--------|---------|----------|-----|
| Conversation Home | Minimal | Visible | N/A (is the main content) | N/A |
| Deals List | Standard | Visible | Available (Cmd+/) | Chat |
| Deal Workspace | Standard | Visible | Embedded right side | Chat |
| Memo Editor | Standard | Collapsed | Embedded right side | Chat |
| Call Prep | Standard | Visible | Available (Cmd+/) | Chat |
| Settings | Standard | Visible | N/A | N/A |
| Onboarding | Minimal | Hidden | N/A | N/A |

---

## 6. State Management

### 6.1 Loading States

| Component | Loading Indicator | Behavior |
|-----------|-------------------|----------|
| Screen | Full skeleton | Show structure with animated placeholders |
| Section | Section skeleton | Individual section shows loader |
| List | Skeleton rows | 5 placeholder rows while loading |
| AI Response | Typing indicator | Animated dots while AI processes |
| Button | Spinner | Button shows spinner, disabled during action |
| Background | Progress bar | Thin progress bar at top of screen |

### 6.2 Empty States

| Screen | Empty State Content |
|--------|---------------------|
| Deals List | "No deals yet. Upload your first deck or create a deal manually." + Add Deal button |
| Memos List | "No memos yet. Memos will appear here as deals progress." |
| Calls List | "No upcoming calls. Connect your calendar to see scheduled calls." |
| Timeline (Deal) | "No activity yet. Activity will appear as you work on this deal." |
| Documents (Deal) | "No documents. Upload a deck or other files." |
| Search Results | "No results found. Try a different search term." |
| Notifications | "All caught up! No new notifications." |

### 6.3 Error States

| Error Type | Display | User Action |
|------------|---------|-------------|
| Page Error | Full-screen error message | Retry button, Back to home link |
| Section Error | Inline error banner | Retry button, Dismiss option |
| Form Validation | Inline field errors | Highlight fields, show messages |
| Network Error | Toast notification | Auto-retry, manual retry option |
| Integration Error | Settings banner | Link to integration settings |
| AI Error | Chat message | "I encountered an error. Please try again." |

### 6.4 Permission States

| Scenario | Display | Behavior |
|----------|---------|----------|
| Restricted Deal | Banner: "You don't have access" | Back button, request access link |
| Partner-Only Setting | Disabled controls | "Contact a partner to change this" |
| Read-Only View | Edit buttons hidden | View-only indicators |
| Not Logged In | Redirect to login | Return to original URL after login |

---

## 7. Flow Mapping

### 7.1 Deal Intake Flow

```
[Email/Upload/Link]
       │
       ▼
┌─────────────────┐
│  DEALS-004      │  Deal Creation
│  Deal Creation  │  (or automatic via email)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Processing...  │  AI parses deck
│  (GLOBAL-008)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  DEALS-003      │  Deal Workspace
│  Deal Workspace │  (Overview tab)
└─────────────────┘
```

### 7.2 Call Workflow

```
┌─────────────────┐
│  CALLS-001      │  Upcoming Calls
│  Calls List     │
└────────┬────────┘
         │ Click "Prep"
         ▼
┌─────────────────┐
│  CALLS-002      │  Review prep, add questions
│  Call Prep      │
└────────┬────────┘
         │ Call happens (AI records)
         ▼
┌─────────────────┐
│  Processing...  │  AI transcribes
│  (GLOBAL-008)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  CALLS-003      │────▶│  CALLS-004      │
│  Transcript     │     │  Summary        │
└─────────────────┘     └────────┬────────┘
                                 │ Approve
                                 ▼
                        ┌─────────────────┐
                        │  DEALS-003      │  Updated with call data
                        │  Deal Workspace │
                        └─────────────────┘
```

### 7.3 Memo Creation Flow

```
┌─────────────────┐
│  DEALS-003      │  Deal at Pre-IC stage
│  Deal Workspace │
└────────┬────────┘
         │ "Generate Memo"
         ▼
┌─────────────────┐
│  Processing...  │  AI drafts memo
│  (GLOBAL-008)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  MEMOS-002      │  Edit and refine
│  Memo Editor    │
└────────┬────────┘
         │ Partner reviews
         ▼
┌─────────────────┐
│  MEMOS-002      │  Comments and revisions
│  (with comments)│
└────────┬────────┘
         │ Mark as Final
         ▼
┌─────────────────┐
│  MEMOS-003      │  Ready for IC
│  Memo Preview   │
└─────────────────┘
```

### 7.4 Partner Review Flow (Mobile-First)

```
┌─────────────────┐
│  HOME           │  Morning briefing
│  (Briefing)     │
└────────┬────────┘
         │ "Show me flagged deals"
         ▼
┌─────────────────┐
│  DEALS-001      │  Filtered to flagged
│  (filtered)     │
└────────┬────────┘
         │ Tap deal
         ▼
┌─────────────────┐
│  DEALS-003      │  Review AI summary
│  (Mobile)       │
└────────┬────────┘
         │ "Show me the memo"
         ▼
┌─────────────────┐
│  MEMOS-003      │  Read memo
│  Memo Preview   │
└────────┬────────┘
         │ Add comment
         ▼
┌─────────────────┐
│  MEMOS-002f     │  Voice comment
│  Comment Thread │
└────────┬────────┘
         │ Done
         ▼
┌─────────────────┐
│  HOME           │  "What's next?"
│  (Chat)         │
└─────────────────┘
```

---

## Appendix: Screen ID Reference

### Quick Reference Table

| ID Range | Section |
|----------|---------|
| HOME-xxx | Conversation Home |
| DEALS-xxx | Deals |
| MEMOS-xxx | Memos |
| CALLS-xxx | Calls |
| SETTINGS-xxx | Settings |
| ONBOARD-xxx | Onboarding |
| GLOBAL-xxx | Global Elements |

### Total Screen Count

| Type | Count |
|------|-------|
| Primary Screens | 26 |
| Modals | 23 |
| Drawers | 12 |
| Dropdowns/Popovers | 8 |
| States | 15 |
| **Total Documented** | **84** |

---

*Document version: v0.1*
*Last updated: [Date]*
