# Memo Collaboration & Version Control Features

## Document Overview
This document outlines the requirements and implementation plan for version history and collaborative editing features in the Investment Memo system, based on analysis of the Full PRD, PRD Job Map, and Tech Stack Research documents.

**Last Updated:** 2025-12-03
**Status:** Planning Phase

---

## Table of Contents
1. [Feature Summary](#feature-summary)
2. [Phase 1: MVP Requirements](#phase-1-mvp-requirements)
3. [Phase 2: V2 Enhancements](#phase-2-v2-enhancements)
4. [Technical Architecture](#technical-architecture)
5. [Implementation Checklist](#implementation-checklist)
6. [References](#references)

---

## Feature Summary

### Priority Matrix

| Feature | Priority | Phase | Size | Status |
|---------|----------|-------|------|--------|
| Version History with Diff View | P1 | MVP | L | ⏳ Not Started |
| Inline Comments & @mentions | P0 | MVP | M | ⏳ Not Started |
| Activity Feed | P1 | MVP | M | ⏳ Not Started |
| Resolution Tracking | P1 | MVP | S | ⏳ Not Started |
| Real-Time Updates | P1 | MVP | L | ⏳ Not Started |
| Concurrent Editing | P1 | V2 | XL | 📋 Planned |

**Legend:**
- ✅ Complete
- 🚧 In Progress
- ⏳ Not Started
- 📋 Planned for Future

---

## Phase 1: MVP Requirements

### 1. Version History System

**Priority:** P1 (High Priority)
**Size:** Large
**User Story (E4-S02):** As a Partner, I want to review past versions of a memo so that I can see how the analysis evolved.

#### Requirements

**Source:** AI_Associate_Full_PRD.md - Section 8.7.4, Line 750
**Source:** Information_Architecture.md - Screen MEMOS-002c, Lines 679-692

**Core Functionality:**
- ✅ Version list with timestamp and author
- ✅ Diff view to compare versions
- ✅ Restore previous versions capability
- ✅ Track AI-generated text vs human edits
- ✅ Version indicator (draft/review/final status)

**UI Specifications:**
```
ID: MEMOS-002c
Name: Version History
Type: Drawer (slides in from right)
Entry Point: "History" button in editor toolbar
Exit Points: Close drawer, Restore version

Key Components:
├── Version List
│   ├── Timestamp
│   ├── Author name/avatar
│   └── Change summary
├── Diff View
│   ├── Side-by-side comparison
│   ├── Inline changes highlighting
│   └── AI vs Human edit indicators
├── Restore Button
└── Compare Toggle
```

**Mobile Variant:**
- Full-screen modal with version list
- Swipe between versions

**Data Requirements:**
- Store complete memo state for each version
- Timestamp (ISO 8601 format)
- Author ID and name
- Change type (AI-generated, human-edited, restored)
- Diff metadata (additions, deletions, modifications)

**Edge Cases to Handle:**
- Version retention policy (TBD - needs specification)
- Permissions for restore (TBD - needs specification)
- Large version lists (pagination/virtualization)
- Restoring old versions (create new version or overwrite?)

**Acceptance Criteria:**
- [ ] User can view list of all memo versions
- [ ] User can see who made changes and when
- [ ] User can compare any two versions side-by-side
- [ ] User can see diff highlighting (additions in green, deletions in red)
- [ ] User can restore a previous version
- [ ] User can distinguish AI-generated content from human edits
- [ ] Version history updates in real-time when others make changes
- [ ] Mobile version works as full-screen modal

---

### 2. Inline Comments System

**Priority:** P0 (Critical)
**Size:** Medium
**User Story:** As an Analyst, I want to comment on specific parts of a memo so that I can provide feedback and ask questions.

#### Requirements

**Source:** AI_Associate_Full_PRD.md - Section 8.9.1, Lines 810-816
**Source:** Information_Architecture.md - Screen MEMOS-002f, Line 197

**Core Functionality:**
- ✅ Comment on any text in memos
- ✅ Threaded discussions (reply to comments)
- ✅ @mentions to notify team members
- ✅ Clear visual distinction between AI content and human comments
- ✅ Rich text support in comments

**UI Specifications:**
```
Comment Thread Component (Popover/Sidebar)
├── Highlighted Text Context
├── Comment Thread
│   ├── Original Comment
│   │   ├── Avatar
│   │   ├── Author name
│   │   ├── Timestamp
│   │   ├── Comment text (rich text)
│   │   └── Actions (Reply, Resolve, Delete)
│   └── Replies (nested)
│       ├── Same structure as original
│       └── Indent level indicator
├── New Comment Input
│   ├── @mention autocomplete
│   ├── Rich text toolbar
│   └── Submit/Cancel buttons
└── Resolution Status Indicator
```

**@Mention Functionality:**
- Autocomplete list appears on typing "@"
- Shows team members with avatars
- Sends notification to mentioned users
- Example: "@sarah what do you think about the team?"

**Visual Design:**
- Comment indicators in margin (thread count badge)
- Highlighted text with subtle background color
- Different colors for AI vs human content
- Active comment thread highlighted

**Data Requirements:**
- Comment ID
- Parent comment ID (for threading)
- Author ID
- Memo section ID or text range
- Comment text (rich text/markdown)
- Mentions (array of user IDs)
- Created/updated timestamps
- Status (open/addressed/dismissed)

**Acceptance Criteria:**
- [ ] User can select text and add a comment
- [ ] User can reply to existing comments (threading)
- [ ] User can @mention team members with autocomplete
- [ ] Mentioned users receive notifications
- [ ] Comments show author, timestamp, and status
- [ ] User can edit their own comments
- [ ] User can delete their own comments
- [ ] Comment threads can be collapsed/expanded
- [ ] AI-generated content is visually distinct from human comments

---

### 3. Resolution Tracking

**Priority:** P1 (High Priority)
**Size:** Small
**User Story:** As a Partner, I want to track which comments have been addressed so that I know what still needs attention before the IC meeting.

#### Requirements

**Source:** AI_Associate_Full_PRD.md - Section 8.9.2, Lines 818-822

**Core Functionality:**
- ✅ Three resolution states: Open, Addressed, Dismissed
- ✅ Track who resolved and when
- ✅ Filter comments by resolution status
- ✅ Show resolution statistics

**States:**
1. **Open** - Active discussion, needs attention
2. **Addressed** - Issue resolved, changes made
3. **Dismissed** - Not relevant, no action needed

**UI Elements:**
```
Resolution Controls
├── Status Badge (Open/Addressed/Dismissed)
├── Resolve Button
│   └── Resolution Reason (optional text)
├── Reopen Button
└── Resolution Metadata
    ├── Resolved by: [User name]
    └── Resolved at: [Timestamp]

Comment Filter Toolbar
├── All Comments (count)
├── Open (count)
├── Addressed (count)
└── Dismissed (count)
```

**Use Cases:**
- Pre-IC meeting: "All comments addressed before IC meeting"
- Audit trail: "Why was this comment dismissed?"
- Progress tracking: "15 open, 8 addressed, 2 dismissed"

**Data Requirements:**
- Resolution status (enum: open/addressed/dismissed)
- Resolved by (user ID)
- Resolved at (timestamp)
- Resolution reason (optional text)
- Status change history (audit log)

**Acceptance Criteria:**
- [ ] User can mark comment as Addressed or Dismissed
- [ ] User can reopen resolved comments
- [ ] User can add resolution reason
- [ ] System tracks who resolved and when
- [ ] User can filter comments by status
- [ ] Comment counts update in real-time
- [ ] Resolution status persists across sessions

---

### 4. Activity Feed

**Priority:** P1 (High Priority)
**Size:** Medium
**User Story:** As a Partner, I want to see all changes made to a memo so that I can track its evolution.

#### Requirements

**Source:** AI_Associate_Full_PRD.md - Section 8.9.3, Lines 824-829

**Core Functionality:**
- ✅ Chronological feed of all memo activity
- ✅ AI actions, human edits, comments, status changes
- ✅ Filterable by activity type
- ✅ Expandable details for each activity
- ✅ Real-time updates

**Activity Types:**
```
Activity Categories
├── AI Actions
│   ├── Memo generated
│   ├── Section regenerated
│   └── Content suggested
├── Human Edits
│   ├── Text added
│   ├── Text deleted
│   ├── Text modified
│   └── Formatting changed
├── Comments
│   ├── Comment added
│   ├── Comment replied
│   └── Comment resolved
├── Status Changes
│   ├── Version saved
│   ├── Status updated (draft/review/final)
│   └── Memo shared
└── Collaboration
    ├── User joined editing session
    └── User left editing session
```

**UI Specifications:**
```
Activity Feed (Sidebar/Panel)
├── Filter Controls
│   ├── All Activity
│   ├── AI Activity
│   ├── Human Activity
│   └── Comments Only
├── Activity Items (chronological, newest first)
│   ├── Avatar/Icon
│   ├── Activity Description
│   │   └── "[User] [action] [target] [timestamp]"
│   ├── Expandable Details
│   │   ├── Before/after preview (for edits)
│   │   └── Full comment text (for comments)
│   └── Quick Actions
│       ├── View version
│       ├── Jump to location
│       └── Undo (if applicable)
└── Load More (pagination)
```

**Example Activity Items:**
- "AI generated Executive Summary • 2 hours ago"
- "Sarah edited Market Analysis • 45 minutes ago"
- "@john commented on Team section • 10 minutes ago"
- "Status changed from Draft to Review • 5 minutes ago"

**Data Requirements:**
- Activity ID
- Activity type (enum)
- Actor (user ID or "AI")
- Target (section ID, comment ID, etc.)
- Action description
- Timestamp
- Metadata (before/after values, location, etc.)

**Acceptance Criteria:**
- [ ] Activity feed shows all memo changes chronologically
- [ ] User can filter by activity type
- [ ] Each activity shows actor, action, target, and time
- [ ] User can expand activity for more details
- [ ] User can jump to specific location from activity
- [ ] Activity feed updates in real-time
- [ ] Feed is performant with 100+ activities (virtualization)
- [ ] Fund-level feed aggregates activity across all deals

---

### 5. Real-Time Updates

**Priority:** P1 (High Priority)
**Size:** Large
**User Story (E8-S08):** As an Analyst, I want to see changes from teammates in real-time so that I'm always working with current data.

#### Requirements

**Source:** Epics_and_User_Stories.md - Story E8-S08, Lines 1540-1553
**Source:** AI_Associate_Full_PRD.md - Section 8.7.4, Line 551

**Core Functionality:**
- ✅ Changes appear without page refresh
- ✅ Indicator shows when updates are available
- ✅ Concurrent editing with presence indicators
- ✅ No data loss on simultaneous edits
- ✅ Auto-save (no manual save button)

**Presence Indicators:**
```
User Presence System
├── Active Users List
│   ├── Avatar
│   ├── Name
│   ├── Current section (if viewing specific section)
│   └── Editing indicator (pulse animation)
├── Cursor Indicators (V2 - see Phase 2)
└── Section Lock Indicators (if needed)
```

**Real-Time Events to Sync:**
- Text edits (insertions, deletions)
- Comments added/updated/deleted
- Resolution status changes
- Version saves
- User joined/left session
- Status updates (draft/review/final)

**Technical Requirements:**
- WebSocket connection for real-time updates
- Reconnection logic for dropped connections
- Optimistic updates (show immediately, sync in background)
- Conflict resolution (operational transform or CRDT)
- Graceful degradation if sync fails

**UI Indicators:**
```
Real-Time Status Indicators
├── Connection Status
│   ├── Connected (green dot)
│   ├── Syncing (yellow pulse)
│   └── Disconnected (red with retry)
├── Save Status
│   ├── All changes saved (checkmark)
│   ├── Saving... (spinner)
│   └── Failed to save (warning, retry button)
└── Update Notification
    ├── "New changes available" banner
    └── "Refresh to see latest" button
```

**Acceptance Criteria:**
- [ ] Changes by other users appear within 1 second
- [ ] Connection status is always visible
- [ ] User can see who else is viewing/editing
- [ ] Auto-save triggers within 2 seconds of edit
- [ ] User notified if save fails with retry option
- [ ] Concurrent edits don't cause data loss
- [ ] System handles reconnection after network failure
- [ ] Performance remains smooth with 5+ concurrent users

**Dependencies:**
- Requires E7-S02 (WebSocket infrastructure)

---

## Phase 2: V2 Enhancements

### 6. Concurrent Multi-User Editing

**Priority:** P1 (High Priority)
**Size:** Extra Large
**Consideration:** Explicitly mentioned for V2 in E4-S02, Line 554

#### Requirements

**Source:** Epics_and_User_Stories.md - Story E4-S02, Line 554
**Source:** Tech_Stack_Research.md - Lines 159-161, 237

**Core Functionality:**
- ✅ Multiple users editing simultaneously
- ✅ Live cursor positions for each user
- ✅ Character-by-character synchronization
- ✅ Conflict-free merging (CRDT)
- ✅ User selection highlights

**Technical Implementation:**

**Stack:**
- **Yjs** - CRDT framework for collaborative editing
  - GitHub: https://github.com/yjs/yjs
  - Handles conflict-free merging automatically
  - Industry standard for collaborative editing

- **Tiptap** - Headless rich text editor
  - GitHub: https://github.com/ueberdosis/tiptap
  - Native Yjs integration
  - Provides Notion-like editing experience

- **WebSocket Provider** - Real-time sync
  - y-websocket or custom WebSocket server
  - Broadcasts changes to all connected clients

**Architecture:**
```
Collaborative Editing Stack
├── Frontend
│   ├── Tiptap Editor
│   │   └── Yjs Prosemirror Plugin
│   ├── Yjs Document (shared state)
│   └── WebSocket Client
├── Backend
│   ├── WebSocket Server
│   │   ├── Connection management
│   │   └── Message broadcasting
│   ├── Yjs Document Storage
│   │   └── Persisted updates
│   └── Authentication & Authorization
└── Database
    ├── Document snapshots (periodic saves)
    └── Update history (for recovery)
```

**Visual Features:**
```
Collaborative Editing UI
├── Live Cursors
│   ├── Named cursor with user color
│   ├── User avatar at cursor position
│   └── Smooth cursor animations
├── Selection Highlights
│   ├── Colored background for each user's selection
│   └── User name tooltip on hover
├── Active Users Panel
│   ├── List of online users
│   ├── Current section for each user
│   └── Color indicator matching cursor
└── Conflict Indicators (if any)
    └── Rarely needed with CRDT
```

**Acceptance Criteria (V2):**
- [ ] Multiple users can edit simultaneously without conflicts
- [ ] Each user sees others' cursors in real-time
- [ ] Selections are highlighted with user-specific colors
- [ ] Changes propagate within 100ms
- [ ] System handles 10+ concurrent editors
- [ ] Offline edits sync when reconnected
- [ ] No data loss even with network issues
- [ ] Performance remains smooth with large documents (10,000+ words)

**Implementation Notes:**
- Start with Yjs + Tiptap integration
- Use y-websocket for MVP, consider custom provider later
- Implement periodic snapshots for recovery
- Add monitoring for sync conflicts (should be rare with CRDT)
- Test thoroughly with high latency connections

---

## Technical Architecture

### Data Model Extensions

#### 1. Version History Schema

```typescript
interface MemoVersion {
  id: string;                          // UUID
  memoId: string;                      // Parent memo ID
  versionNumber: number;               // Sequential version number
  content: MemoContent;                // Full memo state
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;                   // ISO 8601 timestamp
  changeType: 'ai_generated' | 'human_edited' | 'restored' | 'auto_saved';
  changeSummary: string;               // Brief description of changes
  diff: {
    additions: number;                 // Character count
    deletions: number;                 // Character count
    modifications: number;             // Section count
  };
  metadata: {
    status: 'draft' | 'review' | 'final';
    wordCount: number;
    completeness: number;              // Percentage
  };
}

interface MemoContent {
  title: string;
  sections: MemoSection[];
  metadata: Record<string, any>;
}
```

#### 2. Comment Schema

```typescript
interface Comment {
  id: string;                          // UUID
  memoId: string;                      // Parent memo ID
  parentCommentId: string | null;      // For threading
  author: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  content: string;                     // Rich text (markdown or HTML)
  mentions: string[];                  // Array of mentioned user IDs
  target: {
    type: 'section' | 'text_range';
    sectionId?: string;                // If commenting on section
    startOffset?: number;              // If commenting on text range
    endOffset?: number;
    quotedText?: string;               // Text being commented on
  };
  status: 'open' | 'addressed' | 'dismissed';
  resolution: {
    resolvedBy?: string;               // User ID
    resolvedAt?: string;               // ISO 8601 timestamp
    reason?: string;                   // Why resolved/dismissed
  };
  createdAt: string;                   // ISO 8601 timestamp
  updatedAt: string;                   // ISO 8601 timestamp
  reactions: {                         // Optional: emoji reactions
    emoji: string;
    users: string[];
  }[];
}
```

#### 3. Activity Schema

```typescript
interface Activity {
  id: string;                          // UUID
  memoId: string;                      // Parent memo ID
  dealId: string;                      // For deal-level feed
  type: ActivityType;
  actor: {
    type: 'user' | 'ai';
    id: string;                        // User ID or 'ai'
    name: string;
  };
  target: {
    type: 'memo' | 'section' | 'comment' | 'version';
    id: string;
    name: string;                      // Human-readable name
  };
  action: string;                      // Past tense verb (e.g., "edited", "commented", "generated")
  description: string;                 // Full activity description
  metadata: {
    before?: any;                      // Before state (for edits)
    after?: any;                       // After state (for edits)
    location?: string;                 // Section name or line number
    comment?: Comment;                 // For comment activities
    version?: MemoVersion;             // For version activities
  };
  createdAt: string;                   // ISO 8601 timestamp
}

enum ActivityType {
  AI_GENERATED = 'ai_generated',
  AI_REGENERATED = 'ai_regenerated',
  HUMAN_EDITED = 'human_edited',
  COMMENT_ADDED = 'comment_added',
  COMMENT_REPLIED = 'comment_replied',
  COMMENT_RESOLVED = 'comment_resolved',
  VERSION_SAVED = 'version_saved',
  VERSION_RESTORED = 'version_restored',
  STATUS_CHANGED = 'status_changed',
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left',
}
```

#### 4. Presence Schema (Real-Time)

```typescript
interface UserPresence {
  userId: string;
  memoId: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    color: string;                     // Assigned color for cursors/highlights
  };
  status: 'viewing' | 'editing' | 'idle';
  location: {
    sectionId?: string;
    cursorPosition?: number;           // Character offset (V2)
    selectionStart?: number;           // Selection start (V2)
    selectionEnd?: number;             // Selection end (V2)
  };
  lastActiveAt: string;                // ISO 8601 timestamp
  connectionId: string;                // WebSocket connection ID
}
```

### API Endpoints

#### Version History Endpoints

```typescript
// Get all versions for a memo
GET /api/memos/{memoId}/versions
Response: MemoVersion[]

// Get specific version
GET /api/memos/{memoId}/versions/{versionId}
Response: MemoVersion

// Get diff between two versions
GET /api/memos/{memoId}/versions/{versionId}/diff?compare={compareVersionId}
Response: {
  additions: DiffBlock[];
  deletions: DiffBlock[];
  modifications: DiffBlock[];
}

// Restore a previous version
POST /api/memos/{memoId}/versions/{versionId}/restore
Response: {
  success: boolean;
  newVersion: MemoVersion;
}

// Create manual version (snapshot)
POST /api/memos/{memoId}/versions
Body: {
  changeSummary?: string;
}
Response: MemoVersion
```

#### Comment Endpoints

```typescript
// Get all comments for a memo
GET /api/memos/{memoId}/comments
Query: ?status=open|addressed|dismissed&includeReplies=true
Response: Comment[]

// Get specific comment thread
GET /api/memos/{memoId}/comments/{commentId}/thread
Response: Comment[]

// Create comment
POST /api/memos/{memoId}/comments
Body: {
  content: string;
  target: CommentTarget;
  mentions?: string[];
  parentCommentId?: string;
}
Response: Comment

// Update comment
PATCH /api/memos/{memoId}/comments/{commentId}
Body: {
  content?: string;
  status?: 'open' | 'addressed' | 'dismissed';
  resolution?: CommentResolution;
}
Response: Comment

// Delete comment
DELETE /api/memos/{memoId}/comments/{commentId}
Response: { success: boolean }
```

#### Activity Feed Endpoints

```typescript
// Get memo activity feed
GET /api/memos/{memoId}/activity
Query: ?type=ai|human|comment&limit=50&offset=0
Response: {
  activities: Activity[];
  total: number;
  hasMore: boolean;
}

// Get deal-level activity feed
GET /api/deals/{dealId}/activity
Query: ?type=ai|human|comment&limit=50&offset=0
Response: {
  activities: Activity[];
  total: number;
  hasMore: boolean;
}

// Get fund-level activity feed
GET /api/funds/{fundId}/activity
Query: ?type=ai|human|comment&limit=50&offset=0
Response: {
  activities: Activity[];
  total: number;
  hasMore: boolean;
}
```

#### Real-Time WebSocket Events

```typescript
// Client -> Server
{
  type: 'subscribe',
  memoId: string,
  userId: string,
}

{
  type: 'presence_update',
  memoId: string,
  presence: UserPresence,
}

{
  type: 'content_update',
  memoId: string,
  changes: ContentChange[],
}

// Server -> Client
{
  type: 'user_joined',
  presence: UserPresence,
}

{
  type: 'user_left',
  userId: string,
}

{
  type: 'content_changed',
  changes: ContentChange[],
  author: User,
}

{
  type: 'comment_added',
  comment: Comment,
}

{
  type: 'version_saved',
  version: MemoVersion,
}

{
  type: 'presence_changed',
  presence: UserPresence,
}
```

### Frontend State Management

#### Context Providers Needed

```typescript
// 1. Version History Context
interface VersionHistoryContextType {
  versions: MemoVersion[];
  currentVersion: MemoVersion | null;
  selectedVersion: MemoVersion | null;
  isLoading: boolean;
  isDrawerOpen: boolean;

  fetchVersions: () => Promise<void>;
  selectVersion: (versionId: string) => void;
  compareVersions: (v1: string, v2: string) => Promise<Diff>;
  restoreVersion: (versionId: string) => Promise<void>;
  openDrawer: () => void;
  closeDrawer: () => void;
}

// 2. Comments Context
interface CommentsContextType {
  comments: Comment[];
  activeThreadId: string | null;
  filterStatus: 'all' | 'open' | 'addressed' | 'dismissed';
  isLoading: boolean;

  addComment: (comment: CreateCommentInput) => Promise<void>;
  replyToComment: (parentId: string, content: string) => Promise<void>;
  updateComment: (commentId: string, updates: Partial<Comment>) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  resolveComment: (commentId: string, reason?: string) => Promise<void>;
  setActiveThread: (threadId: string | null) => void;
  setFilterStatus: (status: 'all' | 'open' | 'addressed' | 'dismissed') => void;
}

// 3. Activity Feed Context
interface ActivityFeedContextType {
  activities: Activity[];
  filterType: ActivityType | 'all';
  isLoading: boolean;
  hasMore: boolean;

  fetchActivities: () => Promise<void>;
  loadMore: () => Promise<void>;
  setFilterType: (type: ActivityType | 'all') => void;
  refresh: () => Promise<void>;
}

// 4. Presence Context
interface PresenceContextType {
  activeUsers: UserPresence[];
  currentUser: UserPresence | null;
  isConnected: boolean;

  updatePresence: (location: PresenceLocation) => void;
  disconnect: () => void;
}
```

### Component Structure

```
src/components/memo/
├── version-history/
│   ├── VersionHistoryDrawer.tsx       // Main drawer container
│   ├── VersionList.tsx                // List of versions
│   ├── VersionItem.tsx                // Single version card
│   ├── DiffViewer.tsx                 // Side-by-side diff view
│   ├── RestoreVersionDialog.tsx       // Confirmation dialog
│   └── VersionHistoryButton.tsx       // Toolbar button to open
│
├── comments/
│   ├── CommentThread.tsx              // Thread container
│   ├── CommentItem.tsx                // Single comment
│   ├── CommentComposer.tsx            // New comment input
│   ├── CommentHighlight.tsx           // Highlighted text in editor
│   ├── CommentIndicator.tsx           // Margin indicator
│   ├── ResolutionControls.tsx         // Resolve/reopen buttons
│   ├── MentionAutocomplete.tsx        // @mention dropdown
│   └── CommentFilterBar.tsx           // Filter by status
│
├── activity/
│   ├── ActivityFeed.tsx               // Main feed container
│   ├── ActivityItem.tsx               // Single activity
│   ├── ActivityIcon.tsx               // Activity type icon
│   ├── ActivityFilters.tsx            // Filter controls
│   └── ActivityDetails.tsx            // Expandable details
│
├── presence/
│   ├── PresenceIndicators.tsx         // Active users list
│   ├── UserAvatar.tsx                 // User avatar with status
│   ├── CursorOverlay.tsx              // Live cursors (V2)
│   └── ConnectionStatus.tsx           // Connection indicator
│
└── editor/
    ├── CollaborativeEditor.tsx        // Tiptap + Yjs integration (V2)
    └── AutoSaveIndicator.tsx          // Save status indicator
```

---

## Implementation Checklist

### Phase 1: MVP Features

#### Sprint 1: Version History (2 weeks)
- [ ] **Backend: Version Storage**
  - [ ] Create `MemoVersion` table/collection
  - [ ] Implement version creation on save
  - [ ] Add version retrieval endpoints
  - [ ] Add diff calculation logic
  - [ ] Add restore version endpoint

- [ ] **Frontend: Version History UI**
  - [ ] Create `VersionHistoryContext`
  - [ ] Build `VersionHistoryDrawer` component
  - [ ] Build `VersionList` component
  - [ ] Build `DiffViewer` component
  - [ ] Add "History" button to editor toolbar
  - [ ] Implement restore version flow with confirmation
  - [ ] Add mobile full-screen variant

- [ ] **Testing**
  - [ ] Unit tests for version storage
  - [ ] Unit tests for diff calculation
  - [ ] Integration tests for restore flow
  - [ ] E2E tests for version history UI
  - [ ] Test with large documents (10,000+ words)

#### Sprint 2: Comments & Resolution (2 weeks)
- [ ] **Backend: Comments System**
  - [ ] Create `Comment` table/collection
  - [ ] Implement comment CRUD endpoints
  - [ ] Add threading support
  - [ ] Add @mention notification logic
  - [ ] Add resolution tracking

- [ ] **Frontend: Comments UI**
  - [ ] Create `CommentsContext`
  - [ ] Build `CommentThread` component
  - [ ] Build `CommentComposer` with rich text
  - [ ] Build `MentionAutocomplete` component
  - [ ] Add comment indicators to editor
  - [ ] Add highlighted text context
  - [ ] Build `ResolutionControls` component
  - [ ] Add `CommentFilterBar`

- [ ] **Testing**
  - [ ] Unit tests for comment operations
  - [ ] Unit tests for threading logic
  - [ ] Integration tests for @mentions
  - [ ] E2E tests for comment flow
  - [ ] Test notification delivery

#### Sprint 3: Activity Feed & Real-Time (2 weeks)
- [ ] **Backend: Activity Tracking**
  - [ ] Create `Activity` table/collection
  - [ ] Implement activity logging middleware
  - [ ] Add activity feed endpoints (memo/deal/fund level)
  - [ ] Add activity filtering logic
  - [ ] Set up WebSocket server

- [ ] **Frontend: Activity Feed UI**
  - [ ] Create `ActivityFeedContext`
  - [ ] Build `ActivityFeed` component
  - [ ] Build `ActivityItem` component
  - [ ] Add activity type icons
  - [ ] Implement filtering
  - [ ] Add virtualization for large feeds

- [ ] **Real-Time Infrastructure**
  - [ ] Set up WebSocket client
  - [ ] Implement presence tracking
  - [ ] Build `PresenceIndicators` component
  - [ ] Add `ConnectionStatus` component
  - [ ] Implement auto-save logic
  - [ ] Add optimistic updates
  - [ ] Add reconnection handling

- [ ] **Testing**
  - [ ] Unit tests for activity logging
  - [ ] Integration tests for WebSocket connection
  - [ ] E2E tests for real-time updates
  - [ ] Load testing with multiple concurrent users
  - [ ] Network failure recovery testing

### Phase 2: V2 Features

#### Sprint 4: Concurrent Editing (3-4 weeks)
- [ ] **Backend: Yjs Infrastructure**
  - [ ] Set up Yjs document storage
  - [ ] Implement WebSocket provider
  - [ ] Add periodic snapshot logic
  - [ ] Add conflict monitoring

- [ ] **Frontend: Collaborative Editor**
  - [ ] Integrate Tiptap editor
  - [ ] Add Yjs Prosemirror plugin
  - [ ] Implement live cursors
  - [ ] Implement selection highlights
  - [ ] Add user color assignment
  - [ ] Build `CursorOverlay` component

- [ ] **Testing**
  - [ ] Unit tests for Yjs integration
  - [ ] Integration tests for concurrent edits
  - [ ] E2E tests with multiple users
  - [ ] Load testing with 10+ concurrent editors
  - [ ] Stress testing with high latency
  - [ ] Offline/online transition testing

---

## References

### Source Documents
1. **AI_Associate_Full_PRD.md**
   - Section 7.4 (Line 390): Store memo versions, distinguish AI vs human edits
   - Section 8.7.4 (Line 750): Version history with diff view
   - Section 8.9 (Lines 806-829): Collaboration features
   - Section 8.9.1 (Lines 810-816): Inline comments
   - Section 8.9.2 (Lines 818-822): Resolution tracking
   - Section 8.9.3 (Lines 824-829): Activity feed
   - Section 9.1 (Line 876): Comment entity in data model
   - Section 9.4 (Lines 909-928): Conflict resolution

2. **AI_Associate_PRD_JOB_Map.md**
   - Information_Architecture.md - Screen MEMOS-002c (Lines 679-692): Version History drawer spec
   - Epics_and_User_Stories.md - Story E8-S08 (Lines 1540-1553): Real-time updates
   - Epics_and_User_Stories.md - Story E4-S02 (Line 554): V2 collaborative editing consideration

3. **Tech_Stack_Research.md**
   - Lines 159-161: Architecture diagram with Yjs/CRDT
   - Line 237: Yjs listed in supporting libraries
   - Line 113: Tiptap as rich text editor
   - Lines 103-106: Editor integration details

### External Resources
- [Yjs Documentation](https://docs.yjs.dev/)
- [Tiptap Documentation](https://tiptap.dev/docs/editor/introduction)
- [y-websocket Provider](https://github.com/yjs/y-websocket)
- [Notion's Collaboration Approach](https://www.notion.so/help/collaboration)
- [Operational Transformation vs CRDT](https://www.inkandswitch.com/local-first/)

### Design Inspiration
- **Notion** - Collaborative editing, comments, version history
- **Linear** - Comments, activity feed, resolution tracking
- **Google Docs** - Real-time cursors, presence indicators
- **Figma** - User presence, live collaboration

---

## Questions & Decisions

### Open Questions

1. **Version History**
   - ❓ How many versions should we retain? (All, or prune old ones?)
   - ❓ Should restoring create a new version or overwrite?
   - ❓ Who has permission to restore versions? (All users, or just Partners?)

2. **Comments**
   - ❓ Should we support emoji reactions on comments?
   - ❓ Maximum comment length?
   - ❓ Can users edit/delete others' comments? (Probably not)

3. **Real-Time**
   - ❓ What happens if two users restore different versions simultaneously?
   - ❓ Maximum concurrent users before performance degrades?
   - ❓ Should we lock sections being edited? (Probably no with CRDT)

4. **Activity Feed**
   - ❓ Should activity be retained forever or pruned?
   - ❓ Should we generate daily/weekly activity summaries?
   - ❓ Notification preferences for activity types?

### Decisions Made

1. ✅ **Use Yjs + Tiptap** for collaborative editing (from Tech Stack Research)
2. ✅ **WebSocket-based** real-time updates (from E8-S08)
3. ✅ **Notion-inspired** UI design (from PRD Section 8.1)
4. ✅ **Three resolution states**: Open, Addressed, Dismissed (from PRD 8.9.2)
5. ✅ **Auto-save** with no manual save button (from PRD 8.7.4)
6. ✅ **AI vs Human distinction** in all features (from PRD 7.4)

---

## Success Metrics

### Phase 1 (MVP) KPIs
- **Version History**
  - % of memos with version history accessed
  - Average versions per memo
  - % of versions restored

- **Comments**
  - Average comments per memo
  - % of comments resolved before IC
  - @mention usage rate

- **Activity Feed**
  - Activity feed views per user per day
  - % of users using activity filters

- **Real-Time**
  - Average save latency (target: <2s)
  - % of sessions with concurrent editors
  - WebSocket connection success rate (target: >99%)

### Phase 2 (V2) KPIs
- **Concurrent Editing**
  - Average concurrent editors per session
  - Conflict resolution rate (target: <0.1%)
  - User satisfaction with collaborative editing

---

**Document End**
