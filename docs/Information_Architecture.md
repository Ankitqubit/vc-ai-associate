# Information Architecture: AI Analyst/Associate for VC

**Document owner:** Sahil
**Version:** v0.1
**Related documents:** AI_Associate_Full_PRD.md, User_Journeys.md, Epics_and_User_Stories.md

---

## Table of Contents

1. [Navigation Model](#1-navigation-model)
2. [Site Map](#2-site-map)
3. [Screen Inventory](#3-screen-inventory)
   - 3.1 Deal Intake Flow
   - 3.2 Call Workflow
   - 3.3 Memo Creation Flow
   - 3.4 Partner Review Flow
   - 3.5 Founder Interaction Flow
   - 3.6 IC Process Flow
   - 3.7 Onboarding Flow
   - 3.8 Settings & Configuration
4. [Navigation Patterns](#4-navigation-patterns)
5. [Component Placement](#5-component-placement)
6. [Keyboard Shortcuts & Commands](#6-keyboard-shortcuts--commands)
7. [URL Structure & Deep Linking](#7-url-structure--deep-linking)

---

## 1. Navigation Model

### 1.1 Design Philosophy

This product uses an **AI-led hybrid navigation model**:

| Priority | Navigation Method | Use Case |
|----------|-------------------|----------|
| **Primary** | Conversational | "Show me Acme" → workspace appears |
| **Secondary** | Command Bar (Cmd+K) | Power users, quick actions |
| **Tertiary** | Icon Rail | Direct access to main sections |

**Key Principle:** The AI is the primary navigation mechanism. Users can accomplish most tasks through conversation. Structured navigation exists for users who prefer direct access or need to browse.

### 1.2 Desktop Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Logo]     [─────── Command Bar (Cmd+K) ───────]    [🔔] [Avatar ▾] │
├──────┬───────────────────────────────────────────────────────────────┤
│      │                                                               │
│  💬  │                                                               │
│      │                    Main Content Area                          │
│ ──── │                                                               │
│      │              (Conversational Home / Workspace)                │
│  📊  │                                                               │
│      │                                                 ┌────────────┐│
│ ──── │                                                 │            ││
│      │                                                 │  AI Panel  ││
│  ⚙️  │                                                 │ (collapse) ││
│      │                                                 │            ││
│      │                                                 └────────────┘│
└──────┴───────────────────────────────────────────────────────────────┘
   │                        │                                  │
   │                        │                                  │
Icon Rail            Main Content                        AI Side Panel
(48px wide)          (flexible)                          (320px, collapsible)
```

**Icon Rail Items:**
| Icon | Label | Destination |
|------|-------|-------------|
| 💬 | Chat | Conversational Home |
| 📊 | Pipeline | Pipeline List/Kanban View |
| ⚙️ | Settings | Settings Hub |

**Header Components:**
- **Logo**: Click returns to Conversational Home
- **Command Bar**: Always visible, click or Cmd+K to focus
- **Notifications**: Bell icon with unread count badge
- **User Menu**: Avatar dropdown with profile, preferences, logout

### 1.3 Mobile Layout

```
┌─────────────────────────────┐
│  [☰]    [Logo]       [🔔]   │  ← Header (56px)
├─────────────────────────────┤
│                             │
│                             │
│                             │
│    Conversational           │
│    Interface                │
│    (Full Screen)            │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│  [🎤]  [  Type a message  ] │  ← Input Bar (64px)
└─────────────────────────────┘
```

**Mobile Navigation:**
- **Hamburger Menu (☰)**: Opens full-screen drawer with all navigation
- **Conversation is Home**: Default view is always the AI chat
- **Voice Prominent**: Microphone button is large and always visible
- **Swipe Gestures**: Swipe from left edge opens menu

**Hamburger Menu Contents:**
```
┌─────────────────────────────┐
│  [✕]           [User Name]  │
│                [user@fund]  │
├─────────────────────────────┤
│  💬  Home                   │
│  📊  Pipeline               │
│  🔔  Notifications          │
│  ⚙️  Settings               │
├─────────────────────────────┤
│  📤  Log Out                │
└─────────────────────────────┘
```

### 1.4 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, hamburger menu |
| Tablet | 768px - 1024px | Icon rail + content, AI panel overlays |
| Desktop | > 1024px | Full layout with persistent AI panel |
| Large Desktop | > 1440px | Wider content area, larger AI panel |

---

## 2. Site Map

### 2.1 Complete Hierarchy

```
🏠 AI Analyst
│
├── 💬 Conversational Home
│   ├── Morning Briefing
│   ├── Active Conversation
│   └── Conversation History
│
├── 📊 Pipeline
│   ├── List View
│   │   ├── All Deals
│   │   ├── My Deals
│   │   └── Saved Filters
│   ├── Kanban View
│   └── Search Results
│
├── 📁 Deal Workspace (per deal)
│   ├── Overview Tab
│   │   ├── Key Metrics
│   │   ├── Thesis Fit
│   │   └── AI Summary
│   ├── Timeline Tab
│   │   ├── Activity Feed
│   │   └── Filter by Type
│   ├── Documents Tab
│   │   ├── Deck
│   │   ├── Memos
│   │   ├── Transcripts
│   │   └── Files
│   └── AI Panel (contextual)
│
├── 📝 Memo Editor
│   ├── Edit Mode
│   ├── Preview Mode
│   ├── Version History
│   └── Citation Panel
│
├── 📞 Call Views
│   ├── Call Prep
│   ├── Transcript View
│   └── Summary View
│
├── 🔔 Notifications
│   ├── All Notifications
│   ├── Unread
│   └── By Type Filter
│
├── ⚙️ Settings
│   ├── Fund Settings
│   │   ├── General
│   │   ├── Thesis Config
│   │   ├── Pipeline Stages
│   │   ├── Memo Templates
│   │   └── Automation Rules
│   ├── Integrations
│   │   ├── CRM
│   │   ├── Calendar
│   │   ├── Email
│   │   └── Note-Taker
│   ├── Team
│   │   ├── Members
│   │   ├── Roles
│   │   └── Invitations
│   └── User Preferences
│       ├── Notifications
│       ├── AI Personality
│       └── Appearance
│
├── 🎓 Onboarding (overlay)
│   ├── Welcome
│   ├── Setup Wizard
│   └── Feature Tours
│
└── 🌐 Founder Portal (separate)
    ├── Website Embed
    └── Email/Call Interfaces
```

### 2.2 Primary Navigation Paths

```
                    ┌─────────────────┐
                    │ Conversational  │
                    │     Home        │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
     ┌──────────┐     ┌──────────┐     ┌──────────┐
     │ Pipeline │     │   Deal   │     │ Settings │
     │   View   │     │Workspace │     │          │
     └────┬─────┘     └────┬─────┘     └──────────┘
          │                │
          │                ├──────────────┐
          │                │              │
          ▼                ▼              ▼
     ┌──────────┐     ┌──────────┐  ┌──────────┐
     │   Deal   │     │   Memo   │  │   Call   │
     │Workspace │     │  Editor  │  │  Views   │
     └──────────┘     └──────────┘  └──────────┘
```

---

## 3. Screen Inventory

### 3.1 Deal Intake Flow

#### 3.1.1 Conversational Home

| Attribute | Details |
|-----------|---------|
| **Purpose** | Landing page; AI greeting, morning briefing, conversation interface |
| **Entry Points** | App launch, Logo click, 💬 icon, "Go home" command |
| **Exit Points** | Any conversation action, icon rail clicks, command bar |
| **Key Components** | AI greeting, conversation history, message input, voice button |
| **Mobile Difference** | Full screen; voice button more prominent |

**States:**
- Empty (first launch, no context)
- Morning briefing (start of day)
- Active conversation (mid-interaction)
- Deal context (after discussing a deal)

---

#### 3.1.2 Upload Modal

| Attribute | Details |
|-----------|---------|
| **Purpose** | Upload deck files or paste links |
| **Entry Points** | "Add Deal" button, "Upload deck" command, drag file onto app |
| **Exit Points** | Upload complete → Processing, Cancel → Previous screen |
| **Key Components** | Drop zone, file browser, link input, source/referrer fields |
| **Mobile Difference** | Full screen sheet instead of modal |

**States:**
- Empty (awaiting input)
- File selected (preview shown)
- Link pasted (validating)
- Uploading (progress bar)
- Error (invalid file/link)

---

#### 3.1.3 Processing State

| Attribute | Details |
|-----------|---------|
| **Purpose** | Show AI processing progress for deck parsing |
| **Entry Points** | After upload completes |
| **Exit Points** | Auto-transition to Deal Workspace when complete |
| **Key Components** | Progress stages, animated indicators, cancel option |
| **Mobile Difference** | Same as desktop |

**Progress Stages Shown:**
1. "Uploading deck..."
2. "Parsing content..."
3. "Extracting metrics..."
4. "Scoring thesis fit..."
5. "Enriching with research..."
6. "Creating deal record..."

---

#### 3.1.4 Deal Created Confirmation

| Attribute | Details |
|-----------|---------|
| **Purpose** | Confirm deal creation, show initial results |
| **Entry Points** | Processing completes |
| **Exit Points** | "View Deal" → Deal Workspace, "Add Another" → Upload Modal |
| **Key Components** | Deal summary card, fit score, key fields, action buttons |
| **Mobile Difference** | Full screen with prominent CTA |

---

### 3.2 Call Workflow

#### 3.2.1 Call Prep View

| Attribute | Details |
|-----------|---------|
| **Purpose** | Display AI-generated call prep document |
| **Entry Points** | Calendar event, "Prep for call" command, deal workspace action |
| **Exit Points** | Edit → Edit mode, Done → Deal workspace, Join call → Video |
| **Key Components** | Company overview, hypothesis, questions list, concerns, agenda |
| **Mobile Difference** | Scrollable single column; quick-glance mode |

**States:**
- Generated (AI content, unreviewed)
- Reviewed (user has scrolled through)
- Edited (user made changes)
- Finalized (marked ready)

---

#### 3.2.2 Call Prep Edit Mode

| Attribute | Details |
|-----------|---------|
| **Purpose** | Edit/customize call prep |
| **Entry Points** | "Edit" button on Call Prep View |
| **Exit Points** | Save → Call Prep View, Cancel → Discard changes |
| **Key Components** | Rich text editor, section reordering, add question button |
| **Mobile Difference** | Full screen editor with simplified toolbar |

---

#### 3.2.3 Active Call State

| Attribute | Details |
|-----------|---------|
| **Purpose** | Minimal UI during call (AI is recording) |
| **Entry Points** | Call starts (detected via calendar) |
| **Exit Points** | Call ends → Summary generation |
| **Key Components** | Recording indicator, quick notes input, key moment flags |
| **Mobile Difference** | Floating overlay; doesn't interfere with video app |

**States:**
- Joining (AI connecting)
- Recording (active)
- Paused (if applicable)
- Ending (processing starting)

---

#### 3.2.4 Summary Review

| Attribute | Details |
|-----------|---------|
| **Purpose** | Review AI-generated call summary |
| **Entry Points** | Call ends, notification tap, deal workspace |
| **Exit Points** | Approve → Deal updated, Edit → Summary edit mode |
| **Key Components** | Summary sections, metric extractions, correction buttons, approve CTA |
| **Mobile Difference** | Card-based layout for each section |

**States:**
- Just generated (new, unreviewed)
- Reviewing (user scrolling)
- Has corrections (user made inline edits)
- Approved (finalized)

---

#### 3.2.5 Transcript View

| Attribute | Details |
|-----------|---------|
| **Purpose** | View full call transcript with search and annotations |
| **Entry Points** | "View transcript" from summary, deal documents tab |
| **Exit Points** | Back → Previous view, Citation click → Jump to timestamp |
| **Key Components** | Transcript text, speaker labels, timestamps, search, highlights |
| **Mobile Difference** | Simplified view; search via voice |

---

### 3.3 Memo Creation Flow

#### 3.3.1 Memo Generation Trigger

| Attribute | Details |
|-----------|---------|
| **Purpose** | Initiate memo generation (modal/toast) |
| **Entry Points** | Stage change to Pre-IC, "Generate memo" command |
| **Exit Points** | Confirm → Processing, Cancel → Deal workspace |
| **Key Components** | Template selection (if multiple), confirm button, estimated time |
| **Mobile Difference** | Bottom sheet |

---

#### 3.3.2 Memo Generation Progress

| Attribute | Details |
|-----------|---------|
| **Purpose** | Show memo drafting progress |
| **Entry Points** | After generation trigger confirmed |
| **Exit Points** | Complete → Memo Editor |
| **Key Components** | Section-by-section progress, preview of completed sections |
| **Mobile Difference** | Full screen with progress list |

**Progress Stages:**
- Executive Summary
- Company Overview
- Market Analysis
- Traction & Metrics
- Team Assessment
- Competitive Landscape
- Risks
- Recommendation

---

#### 3.3.3 Memo Editor

| Attribute | Details |
|-----------|---------|
| **Purpose** | Edit AI-generated memo |
| **Entry Points** | Generation complete, "Edit memo" from deal workspace |
| **Exit Points** | Save → Deal workspace, Share → Partner notification |
| **Key Components** | Section navigation, rich editor, AI attribution badges, citation panel |
| **Mobile Difference** | Single section view; swipe between sections |

**Layout (Desktop):**
```
┌────────────────────────────────────────────────────────┐
│  [← Back]  Memo: Acme                    [Share] [⋮]  │
├──────────┬────────────────────────────────┬───────────┤
│          │                                │           │
│ Sections │     Editor Area                │ Citations │
│          │                                │           │
│ • Exec   │  ## Executive Summary          │ [Source 1]│
│ • Company│                                │ [Source 2]│
│ • Market │  Acme is a B2B SaaS company... │           │
│ • Traction                                │           │
│ • Team   │  [AI ✦]                        │           │
│ • Risks  │                                │           │
│          │                                │           │
└──────────┴────────────────────────────────┴───────────┘
```

---

#### 3.3.4 Memo Version History

| Attribute | Details |
|-----------|---------|
| **Purpose** | View and restore previous memo versions |
| **Entry Points** | "Version history" in memo editor menu |
| **Exit Points** | Close → Editor, Restore → Confirm modal |
| **Key Components** | Version list, timestamp, author, diff view, restore button |
| **Mobile Difference** | Full screen list; tap to preview |

---

#### 3.3.5 Section Regeneration Modal

| Attribute | Details |
|-----------|---------|
| **Purpose** | Regenerate specific memo section with feedback |
| **Entry Points** | "Regenerate" button on section |
| **Exit Points** | Generate → New version appears, Cancel → No change |
| **Key Components** | Feedback tags, free text input, generate button |
| **Mobile Difference** | Bottom sheet |

---

### 3.4 Partner Review Flow

#### 3.4.1 Partner Notification View

| Attribute | Details |
|-----------|---------|
| **Purpose** | Show notification that requires partner attention |
| **Entry Points** | Push notification tap, notification center |
| **Exit Points** | Action taken → Deal/Memo, Dismiss → Notification center |
| **Key Components** | Context summary, preview, action buttons |
| **Mobile Difference** | Full notification with inline actions |

---

#### 3.4.2 Quick Deal View (Partner)

| Attribute | Details |
|-----------|---------|
| **Purpose** | Summarized deal view optimized for quick partner review |
| **Entry Points** | "Quick view" from notification, voice response |
| **Exit Points** | "Full view" → Deal workspace, Action → Pipeline update |
| **Key Components** | Key metrics card, fit score, AI summary, approve/pass buttons |
| **Mobile Difference** | Card stack; swipe to approve/pass |

---

#### 3.4.3 Approval Confirmation

| Attribute | Details |
|-----------|---------|
| **Purpose** | Confirm partner approval action |
| **Entry Points** | Approve button on deal/memo |
| **Exit Points** | Confirm → Action taken, Cancel → Previous view |
| **Key Components** | Action summary, optional comment, confirm button |
| **Mobile Difference** | Bottom sheet |

---

### 3.5 Founder Interaction Flow

#### 3.5.1 Gap Detection Panel

| Attribute | Details |
|-----------|---------|
| **Purpose** | Show AI-identified information gaps on a deal |
| **Entry Points** | Deal workspace (automatic), "Show gaps" command |
| **Exit Points** | "Contact founder" → Outreach approval, Dismiss → Stays visible |
| **Key Components** | Gap list, priority indicators, suggested questions |
| **Mobile Difference** | Collapsible card in deal view |

---

#### 3.5.2 Outreach Approval Modal

| Attribute | Details |
|-----------|---------|
| **Purpose** | Review and approve AI outreach to founder |
| **Entry Points** | "Contact founder" from gap panel |
| **Exit Points** | Approve → Email/Call initiated, Edit → Modify questions, Cancel |
| **Key Components** | Question list editor, channel selector (email/call), preview, approve |
| **Mobile Difference** | Full screen with sections |

---

#### 3.5.3 Email Draft Preview

| Attribute | Details |
|-----------|---------|
| **Purpose** | Preview AI-generated founder email before sending |
| **Entry Points** | Email channel selected in outreach approval |
| **Exit Points** | Send → Email sent, Edit → Modify draft, Cancel |
| **Key Components** | Email preview, edit button, send button |
| **Mobile Difference** | Full screen email view |

---

#### 3.5.4 Founder Response View

| Attribute | Details |
|-----------|---------|
| **Purpose** | View and verify parsed founder response |
| **Entry Points** | Notification of founder reply |
| **Exit Points** | Approve parsing → Deal updated, Correct → Edit fields |
| **Key Components** | Original email, parsed data, field mappings, approve/correct |
| **Mobile Difference** | Two-panel: original vs parsed |

---

#### 3.5.5 AI Call Scheduling

| Attribute | Details |
|-----------|---------|
| **Purpose** | Schedule AI-led call with founder |
| **Entry Points** | Call channel selected in outreach approval |
| **Exit Points** | Schedule sent → Awaiting confirmation, Cancel |
| **Key Components** | Time slot selector, duration, topic summary, send invite |
| **Mobile Difference** | Calendar picker optimized for touch |

---

### 3.6 IC Process Flow

#### 3.6.1 IC Packet View

| Attribute | Details |
|-----------|---------|
| **Purpose** | View compiled IC materials |
| **Entry Points** | "IC packet" from deal, IC meeting notification |
| **Exit Points** | Download PDF, Share link, Open memo |
| **Key Components** | Material list, memo preview, open questions, export options |
| **Mobile Difference** | Document list with previews |

---

#### 3.6.2 IC Meeting Recording State

| Attribute | Details |
|-----------|---------|
| **Purpose** | Indicate AI is recording IC meeting |
| **Entry Points** | IC meeting starts with AI note-taker |
| **Exit Points** | Meeting ends → Summary generation |
| **Key Components** | Recording indicator, deals being discussed, pause control |
| **Mobile Difference** | Minimal overlay |

---

#### 3.6.3 IC Summary View

| Attribute | Details |
|-----------|---------|
| **Purpose** | Review AI-captured IC decisions and discussion |
| **Entry Points** | IC meeting ends, notification |
| **Exit Points** | Confirm decisions → Deals updated, Edit → Modify |
| **Key Components** | Per-deal decisions, vote counts, action items, confirm button |
| **Mobile Difference** | Card per deal; swipe through |

---

#### 3.6.4 Decision Confirmation Modal

| Attribute | Details |
|-----------|---------|
| **Purpose** | Confirm AI-detected IC decision before applying |
| **Entry Points** | AI detects decision in transcript |
| **Exit Points** | Confirm → Deal updated, Edit → Modify decision, Reject |
| **Key Components** | Decision summary, conditions, deal stage change preview |
| **Mobile Difference** | Bottom sheet |

---

### 3.7 Onboarding Flow

#### 3.7.1 Welcome Screen

| Attribute | Details |
|-----------|---------|
| **Purpose** | First-time user greeting |
| **Entry Points** | First login (new user) |
| **Exit Points** | "Get Started" → Wizard (new fund) or Tour (existing fund) |
| **Key Components** | AI greeting, logo, value prop, get started CTA |
| **Mobile Difference** | Full screen; large CTA |

---

#### 3.7.2 Fund Setup Wizard

| Attribute | Details |
|-----------|---------|
| **Purpose** | Guide fund admin through initial configuration |
| **Entry Points** | New fund creation, "Get Started" from welcome |
| **Exit Points** | Complete → Conversational Home, Skip → Partial config |
| **Key Components** | Step indicator, current step form, next/back buttons, skip option |
| **Mobile Difference** | One step per screen; swipe navigation |

**Wizard Steps:**
1. Fund basics (name, logo)
2. Invite team
3. Thesis configuration
4. Pipeline stages
5. Integrations
6. Import historical deals

---

#### 3.7.3 Thesis Configuration Step

| Attribute | Details |
|-----------|---------|
| **Purpose** | Configure investment thesis for scoring |
| **Entry Points** | Wizard step 3, Settings → Thesis |
| **Exit Points** | Save → Next step/Settings, Skip → Defaults used |
| **Key Components** | Stage selector, geography picker, sector chips, preference sliders |
| **Mobile Difference** | Section accordion; one section at a time |

---

#### 3.7.4 Integration Connection

| Attribute | Details |
|-----------|---------|
| **Purpose** | Connect external services (CRM, calendar, etc.) |
| **Entry Points** | Wizard step 5, Settings → Integrations |
| **Exit Points** | Connected → Success confirmation, Skip → No integration |
| **Key Components** | Service list, connect buttons, OAuth flows, status indicators |
| **Mobile Difference** | Opens OAuth in system browser |

---

#### 3.7.5 Historical Import

| Attribute | Details |
|-----------|---------|
| **Purpose** | Import deals from external sources |
| **Entry Points** | Wizard step 6, Settings → Import |
| **Exit Points** | Import complete → Summary, Skip → Empty pipeline |
| **Key Components** | Source selector, file upload, field mapping, preview, import button |
| **Mobile Difference** | Limited to file upload; mapping on desktop recommended |

---

#### 3.7.6 Feature Tour Overlay

| Attribute | Details |
|-----------|---------|
| **Purpose** | Guide user through key features |
| **Entry Points** | After setup wizard, "Take tour" from help |
| **Exit Points** | Complete → Dismiss, Skip → Dismiss |
| **Key Components** | Highlighted element, tooltip with explanation, next/skip buttons |
| **Mobile Difference** | Same pattern; touch-friendly targets |

---

#### 3.7.7 First Deal Guided Experience

| Attribute | Details |
|-----------|---------|
| **Purpose** | Walk user through processing first real deal |
| **Entry Points** | After setup, no deals exist |
| **Exit Points** | Deal created → Deal workspace with contextual tips |
| **Key Components** | AI prompts, upload guidance, celebration on completion |
| **Mobile Difference** | Same flow; voice encouraged |

---

### 3.8 Settings & Configuration

#### 3.8.1 Settings Hub

| Attribute | Details |
|-----------|---------|
| **Purpose** | Central settings navigation |
| **Entry Points** | ⚙️ icon, "Settings" command, user menu |
| **Exit Points** | Category click → Sub-settings, Back → Previous view |
| **Key Components** | Category cards/list, search, quick links |
| **Mobile Difference** | Full screen list |

**Categories:**
- Fund Settings
- Integrations
- Team
- User Preferences

---

#### 3.8.2 Fund Settings Page

| Attribute | Details |
|-----------|---------|
| **Purpose** | Configure fund-level settings |
| **Entry Points** | Settings hub → Fund Settings |
| **Exit Points** | Save → Confirmation, Back → Settings hub |
| **Key Components** | Tabs for sub-sections, form fields, save button |
| **Mobile Difference** | Accordion sections |

**Sub-sections:**
- General (name, logo, domain)
- Thesis Config
- Pipeline Stages
- Memo Templates
- Automation Rules
- AI Personality

---

#### 3.8.3 Pipeline Stage Editor

| Attribute | Details |
|-----------|---------|
| **Purpose** | Configure custom deal stages |
| **Entry Points** | Fund Settings → Pipeline Stages |
| **Exit Points** | Save → Applied, Cancel → Discard changes |
| **Key Components** | Stage list, drag reorder, add/delete, requirements editor |
| **Mobile Difference** | Simplified; full editing on desktop |

---

#### 3.8.4 Automation Rules Editor

| Attribute | Details |
|-----------|---------|
| **Purpose** | Configure IF/THEN automation rules |
| **Entry Points** | Fund Settings → Automation Rules |
| **Exit Points** | Save → Rules active, Cancel → Discard |
| **Key Components** | Rule list, rule builder, condition/action selectors, enable toggle |
| **Mobile Difference** | View only; editing on desktop |

---

#### 3.8.5 Integrations Page

| Attribute | Details |
|-----------|---------|
| **Purpose** | Manage connected services |
| **Entry Points** | Settings hub → Integrations |
| **Exit Points** | Connect → OAuth flow, Disconnect → Confirmation |
| **Key Components** | Service cards, connection status, sync status, configure button |
| **Mobile Difference** | Card list; OAuth in browser |

---

#### 3.8.6 Team Management

| Attribute | Details |
|-----------|---------|
| **Purpose** | Manage fund users and roles |
| **Entry Points** | Settings hub → Team |
| **Exit Points** | Invite → Modal, Edit user → Modal |
| **Key Components** | User list, role badges, invite button, edit/remove actions |
| **Mobile Difference** | Simplified list; actions in menu |

---

#### 3.8.7 User Preferences

| Attribute | Details |
|-----------|---------|
| **Purpose** | Configure personal settings |
| **Entry Points** | Settings hub → User Preferences, User menu |
| **Exit Points** | Save → Applied immediately, Back → Settings hub |
| **Key Components** | Notification settings, AI personality selector, appearance toggle |
| **Mobile Difference** | Same; toggles touch-friendly |

---

#### 3.8.8 Notification Preferences

| Attribute | Details |
|-----------|---------|
| **Purpose** | Configure notification channels and frequency |
| **Entry Points** | User Preferences → Notifications |
| **Exit Points** | Save → Applied, Back → User Preferences |
| **Key Components** | Per-type toggles, channel selectors, frequency options |
| **Mobile Difference** | Same layout |

---

## 4. Navigation Patterns

### 4.1 Conversational Navigation

Users can navigate entirely through conversation:

| User Says | AI Action |
|-----------|-----------|
| "Show me Acme" | Opens Acme deal workspace |
| "What's my pipeline?" | Opens Pipeline view (filtered to "My Deals") |
| "Open the memo for DataFlow" | Opens memo editor for DataFlow |
| "Go to settings" | Opens Settings hub |
| "Show me notifications" | Opens Notification center |
| "Help me prep for my 2pm call" | Opens call prep for that meeting |

**Context Awareness:**
- "Show me their deck" (while discussing Acme) → Opens Acme's deck
- "Go back" → Returns to previous screen
- "What was I looking at earlier?" → Returns to recent deal/memo

### 4.2 Command Bar Behavior

**Activation:** Cmd+K (Mac) / Ctrl+K (Windows) or click command bar

**Input Types:**
| Input | Result |
|-------|--------|
| Company name | Jump to deal workspace |
| "new deal" | Open upload modal |
| "memo" | List recent memos, select to open |
| "@sarah" | Open team member profile |
| "/settings" | Open settings |
| Natural language | AI interprets and navigates |

**Command Bar Layout:**
```
┌────────────────────────────────────────────────┐
│  🔍 Search or type a command...               │
├────────────────────────────────────────────────┤
│  Recent                                        │
│  📁 Acme - Deal                               │
│  📝 DataFlow Memo                             │
│  📞 Call with TechCo (Yesterday)              │
├────────────────────────────────────────────────┤
│  Quick Actions                                 │
│  ➕ Add new deal                              │
│  📊 View pipeline                             │
│  ⚙️ Open settings                             │
└────────────────────────────────────────────────┘
```

### 4.3 Back/Forward Behavior

- **Browser back/forward**: Works as expected with URL history
- **In-app back**: Arrow button returns to logical parent
- **Escape key**: Closes modals/panels, then returns to previous view
- **Conversation context**: Preserved across navigation

### 4.4 Mobile-Specific Navigation

| Gesture | Action |
|---------|--------|
| Swipe from left edge | Open hamburger menu |
| Swipe down on conversation | Refresh/load earlier messages |
| Long press on deal card | Quick actions menu |
| Double tap microphone | Continuous voice mode |
| Swipe between tabs | Navigate deal workspace tabs |

---

## 5. Component Placement

### 5.1 AI Panel Positioning

**Desktop:**
- Right side panel, 320px wide
- Collapsible via toggle button
- Contextual to current view (deal-specific, memo-specific, etc.)
- Persists across navigation within same context

**Mobile:**
- AI is the main interface (full screen)
- Workspaces appear as overlays/sheets
- Dismiss sheet to return to AI conversation

### 5.2 Modal vs Inline Decision Framework

| Use Modal When | Use Inline When |
|----------------|-----------------|
| Destructive action confirmation | Non-destructive edits |
| Multi-step process (wizard) | Single field changes |
| Focus required (email compose) | Contextual actions |
| Mobile: complex forms | Quick toggles |

### 5.3 Header/Navigation Persistence

| Screen Type | Header | Icon Rail | AI Panel |
|-------------|--------|-----------|----------|
| Conversational Home | ✅ | ✅ | Main content |
| Pipeline | ✅ | ✅ | ✅ Contextual |
| Deal Workspace | ✅ | ✅ | ✅ Deal-specific |
| Memo Editor | ✅ (simplified) | ❌ Hidden | ✅ Citations |
| Settings | ✅ | ✅ | ❌ Hidden |
| Modals | ❌ Overlay | ❌ | ❌ |

### 5.4 Toast/Notification Placement

- **Desktop**: Top-right corner, stacked
- **Mobile**: Top of screen, full width
- **Duration**: Auto-dismiss after 5 seconds (errors persist)
- **Actions**: Max 2 buttons (e.g., "View", "Dismiss")

---

## 6. Keyboard Shortcuts & Commands

### 6.1 Global Shortcuts

| Shortcut | Action |
|----------|--------|
| Cmd/Ctrl + K | Open command bar |
| Cmd/Ctrl + / | Open keyboard shortcut help |
| Cmd/Ctrl + N | New deal (upload) |
| Cmd/Ctrl + F | Search in current view |
| Cmd/Ctrl + , | Open settings |
| Escape | Close modal/panel, clear selection |
| ? | Open help (when not in text input) |

### 6.2 Navigation Shortcuts

| Shortcut | Action |
|----------|--------|
| G then H | Go to Home (conversation) |
| G then P | Go to Pipeline |
| G then S | Go to Settings |
| G then N | Go to Notifications |
| [ | Go back |
| ] | Go forward |

### 6.3 Deal/Pipeline Shortcuts

| Shortcut | Action |
|----------|--------|
| J | Next deal in list |
| K | Previous deal in list |
| Enter | Open selected deal |
| E | Edit deal |
| M | Generate/open memo |
| A | Archive deal |
| S | Change stage (opens picker) |

### 6.4 Memo Editor Shortcuts

| Shortcut | Action |
|----------|--------|
| Cmd/Ctrl + S | Save memo |
| Cmd/Ctrl + Shift + S | Save and share |
| Cmd/Ctrl + B | Bold text |
| Cmd/Ctrl + I | Italic text |
| Cmd/Ctrl + R | Regenerate section |
| Tab | Next section |
| Shift + Tab | Previous section |

### 6.5 Command Bar Commands

| Command | Action |
|---------|--------|
| `/new` | Create new deal |
| `/memo [deal]` | Open/create memo for deal |
| `/prep [deal]` | Open call prep for deal |
| `/settings` | Open settings |
| `/help` | Open help |
| `/logout` | Log out |

---

## 7. URL Structure & Deep Linking

### 7.1 URL Patterns

| Route | Screen |
|-------|--------|
| `/` | Conversational Home |
| `/pipeline` | Pipeline List View |
| `/pipeline/kanban` | Pipeline Kanban View |
| `/deals/:id` | Deal Workspace (Overview tab) |
| `/deals/:id/timeline` | Deal Workspace (Timeline tab) |
| `/deals/:id/documents` | Deal Workspace (Documents tab) |
| `/deals/:id/memo` | Memo Editor for deal |
| `/deals/:id/memo/history` | Memo version history |
| `/deals/:id/calls/:callId` | Call transcript view |
| `/deals/:id/calls/:callId/summary` | Call summary view |
| `/deals/:id/prep/:callId` | Call prep view |
| `/settings` | Settings Hub |
| `/settings/fund` | Fund Settings |
| `/settings/integrations` | Integrations |
| `/settings/team` | Team Management |
| `/settings/preferences` | User Preferences |
| `/notifications` | Notification Center |
| `/onboarding` | Onboarding Wizard |
| `/onboarding/step/:step` | Specific onboarding step |

### 7.2 Query Parameters

| Parameter | Use |
|-----------|-----|
| `?view=kanban` | Switch pipeline view mode |
| `?filter=my-deals` | Apply pipeline filter |
| `?search=query` | Pre-fill search |
| `?highlight=:id` | Scroll to and highlight item |
| `?tab=timeline` | Select tab in deal workspace |

### 7.3 Deep Link Examples

```
# Open specific deal
https://app.aianalyst.com/deals/abc123

# Open deal's memo
https://app.aianalyst.com/deals/abc123/memo

# Open pipeline filtered to fintech deals
https://app.aianalyst.com/pipeline?filter=sector-fintech

# Open specific notification
https://app.aianalyst.com/notifications?highlight=notif456

# Jump to transcript timestamp
https://app.aianalyst.com/deals/abc123/calls/call789?t=1234
```

### 7.4 State Preservation

**Preserved in URL:**
- Current screen/route
- Active filters and sorts
- Selected tab
- Search query
- Scroll position (via hash)

**Preserved in Session:**
- Conversation context
- Expanded/collapsed panels
- Recent items list

**Preserved in User Data:**
- Notification preferences
- Default views
- Saved filters

---

## Appendix: Screen Count Summary

| Flow | Screens/States | Modals |
|------|---------------|--------|
| Deal Intake | 4 | 1 |
| Call Workflow | 5 | 0 |
| Memo Creation | 5 | 2 |
| Partner Review | 3 | 1 |
| Founder Interaction | 5 | 1 |
| IC Process | 4 | 1 |
| Onboarding | 7 | 0 |
| Settings | 8 | 2 |
| Core Navigation | 5 | 0 |
| **Total** | **46** | **8** |

**Additional States:** ~38 (loading, empty, error states across screens)

**Grand Total: 84 screens/states/modals**

---

*Document version: v0.1*
*Last updated: [Date]*
