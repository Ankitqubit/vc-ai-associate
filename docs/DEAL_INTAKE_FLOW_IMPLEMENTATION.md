# 📘 Deal Intake Flow - Complete Implementation Guide

## 🎯 Final Requirements Summary

### ✅ Confirmed Behaviors:
1. **No auto-upload** - Files attach but don't process until user sends
2. **No auto-analysis** - AI doesn't analyze until user explicitly asks
3. **AI suggests actions** - After PDF is sent, AI suggests "Would you like me to analyze this deck?"
4. **Manual flow** - User controls when analysis happens
5. **DealCard in chat** - Shows with "NEW" badge, clickable to navigate
6. **All feedback in chat** - Loading states, analysis, everything appears as chat messages

---

## 📦 Components Architecture

### New Components to Create:
1. `ChatFileAttachment.tsx` - Display files in user message bubbles
2. `PendingFilePreview.tsx` - Show attached-but-not-sent files below input

### Components to Modify:
1. `DealCard.tsx` - Add "NEW" badge support
2. `ai-interface.tsx` - Complete flow rewrite
3. `deal-intake-actions.tsx` - Remove navigation, add render function

### Components to Keep:
1. `FilePreviewCard.tsx` - Keep for future use (not used in this flow)

---

## 🔨 Implementation Steps (Sequential Order)

---

### **STEP 1: Create ChatFileAttachment Component**
**Purpose**: Display file in user's message bubble after it's sent

**File**: `src/components/chat/ChatFileAttachment.tsx`

**Requirements**:
- Shows file icon (PDF = red, PPT = orange)
- Displays filename + file size
- Compact design (fits in message bubble)
- No interactive elements (already sent)
- Clean, minimal styling

**Interface**:
```typescript
interface ChatFileAttachmentProps {
  fileName: string;
  fileSize: number; // in bytes
  fileType?: string; // mime type
}
```

**Visual Design**:
```
┌────────────────────────────┐
│ 📄  Pitch Deck.pdf         │
│     5.67 MB                │
└────────────────────────────┘
```

**Styling**:
- Background: `bg-white/10`
- Border: `border border-white/20`
- Rounded: `rounded-lg`
- Padding: `p-3`
- Icon size: `w-8 h-8`
- Text: filename `text-sm font-medium`, size `text-xs text-white/70`

**Implementation**:
```typescript
"use client";

import { FileText } from "lucide-react";

interface ChatFileAttachmentProps {
  fileName: string;
  fileSize: number;
  fileType?: string;
}

export function ChatFileAttachment({ fileName, fileSize, fileType }: ChatFileAttachmentProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    if (extension === 'pdf') {
      return (
        <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded flex items-center justify-center">
          <FileText className="w-4 h-4 text-red-600" />
        </div>
      );
    } else if (extension === 'pptx' || extension === 'ppt') {
      return (
        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
          <FileText className="w-4 h-4 text-orange-600" />
        </div>
      );
    }

    return (
      <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded flex items-center justify-center">
        <FileText className="w-4 h-4 text-white" />
      </div>
    );
  };

  return (
    <div className="inline-flex items-center gap-3 px-3 py-2 bg-white/10 border border-white/20 rounded-lg">
      {getFileIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {fileName}
        </p>
        <p className="text-xs text-white/70">
          {formatFileSize(fileSize)}
        </p>
      </div>
    </div>
  );
}
```

---

### **STEP 2: Create PendingFilePreview Component**
**Purpose**: Show attached file below input before user sends

**File**: `src/components/chat/PendingFilePreview.tsx`

**Requirements**:
- Shows file icon + name + size
- Has remove button (X)
- Appears below chat input
- Simple, clean design

**Interface**:
```typescript
interface PendingFilePreviewProps {
  file: File;
  onRemove: () => void;
}
```

**Visual Design**:
```
┌────────────────────────────┐
│ 📄  Pitch Deck.pdf    [X]  │
│     5.67 MB                │
└────────────────────────────┘
```

**Styling**:
- Background: `bg-slate-50`
- Border: `border border-slate-200`
- Rounded: `rounded-lg`
- Padding: `p-3`
- Remove button: hover effect, `hover:bg-slate-100`

**Implementation**:
```typescript
"use client";

import { FileText, X } from "lucide-react";

interface PendingFilePreviewProps {
  file: File;
  onRemove: () => void;
}

export function PendingFilePreview({ file, onRemove }: PendingFilePreviewProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (extension === 'pdf') {
      return (
        <div className="flex-shrink-0 w-8 h-8 bg-red-50 rounded flex items-center justify-center">
          <FileText className="w-4 h-4 text-red-600" />
        </div>
      );
    } else if (extension === 'pptx' || extension === 'ppt') {
      return (
        <div className="flex-shrink-0 w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
          <FileText className="w-4 h-4 text-orange-600" />
        </div>
      );
    }

    return (
      <div className="flex-shrink-0 w-8 h-8 bg-slate-50 rounded flex items-center justify-center">
        <FileText className="w-4 h-4 text-slate-600" />
      </div>
    );
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
      {getFileIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">
          {file.name}
        </p>
        <p className="text-xs text-slate-500">
          {formatFileSize(file.size)}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="flex-shrink-0 p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
```

---

### **STEP 3: Update ai-interface.tsx - State Management**
**Purpose**: Add state for pending files and file metadata in messages

**File**: `src/components/layout/ai-interface.tsx`

**Changes**:

1. **Add new imports**:
```typescript
import { ChatFileAttachment } from "@/components/chat/ChatFileAttachment";
import { PendingFilePreview } from "@/components/chat/PendingFilePreview";
```

2. **Add new state**:
```typescript
const [pendingFiles, setPendingFiles] = useState<File[]>([]);
```

3. **Remove old states**:
```typescript
// DELETE: const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
```

4. **Remove old interface**:
```typescript
// DELETE: interface AttachedFile { ... }
```

---

### **STEP 4: Update ai-interface.tsx - File Drop Handler**
**Purpose**: Files attach but don't auto-process

**File**: `src/components/layout/ai-interface.tsx`

**Modify**: `handleFileDrop` function

**Current Behavior** (REMOVE):
- Immediately calls `simulateUpload`
- Sends messages to chat
- Shows progress bars

**New Behavior**:
```typescript
const handleFileDrop = (files: File[]) => {
  // Only add to pending, don't process
  setPendingFiles(prev => [...prev, ...files]);
  setIsDragging(false);

  // That's it! No auto-upload, no messages
};
```

**Also Delete**:
```typescript
// DELETE: const simulateUpload = (fileId: string, file: File) => { ... }
```

---

### **STEP 5: Update ai-interface.tsx - Submit Handler**
**Purpose**: Send file with user message, AI suggests next action

**File**: `src/components/layout/ai-interface.tsx`

**Modify**: `handleSubmit` function

**Logic Flow**:
```typescript
const handleSubmit = async () => {
  if (!inputValue.trim() && pendingFiles.length === 0) return;

  // Build message content
  let messageContent = inputValue || "Here's a file";

  // Add context if selected text exists (existing logic - keep it)
  if (selectedText) {
    messageContent = `> ${selectedText}\n\n${messageContent}`;
    clearSelection();
  }

  // If files attached, create message with file metadata
  if (pendingFiles.length > 0) {
    const fileMetadata = pendingFiles.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    // Create a custom message object with files
    const messageWithFiles = new TextMessage({
      content: messageContent,
      role: Role.User,
    });

    // Store file metadata (we'll access this in rendering)
    (messageWithFiles as any).files = fileMetadata;

    appendMessage(messageWithFiles);

    // Clear pending files
    setPendingFiles([]);
  } else {
    // Normal message without files (existing logic)
    appendMessage(new TextMessage({
      content: messageContent,
      role: Role.User,
    }));
  }

  // Clear input
  setInputValue("");
};
```

**Important**:
- Don't trigger any analysis here
- Just send the message with file info
- AI will respond naturally (handled by CopilotKit instructions)

---

### **STEP 6: Update ai-interface.tsx - Message Rendering**
**Purpose**: Display ChatFileAttachment in user messages

**File**: `src/components/layout/ai-interface.tsx`

**Modify**: `renderMessageContent` function

**Add File Detection** (at the beginning of the function):
```typescript
const renderMessageContent = (msg: any) => {
  const content = msg.content;
  const files = msg.files || [];

  // If message has files, show them
  if (files.length > 0) {
    return (
      <div className="space-y-2">
        {/* File attachments */}
        {files.map((file: any, idx: number) => (
          <ChatFileAttachment
            key={idx}
            fileName={file.name}
            fileSize={file.size}
            fileType={file.type}
          />
        ))}

        {/* Message text (if any) */}
        {content && content.trim().length > 0 && (
          <p className="leading-relaxed">{content}</p>
        )}
      </div>
    );
  }

  // ... rest of existing rendering logic
};
```

---

### **STEP 7: Update CopilotKit Instructions**
**Purpose**: AI suggests analysis, doesn't auto-analyze

**File**: `src/app/api/copilotkit/route.ts`

**Replace Instructions**:
```typescript
instructions: `You are a helpful AI assistant for a VC firm specializing in deal intake.

CRITICAL RULES FOR PITCH DECK UPLOADS:

1. WHEN USER SENDS A FILE:
   - Acknowledge the file: "Thanks! I received [filename]."
   - Suggest actions: "Would you like me to analyze this deck and extract key information?"
   - WAIT for user to respond
   - DO NOT analyze automatically

2. WHEN USER ASKS TO ANALYZE:
   - Call the analyze_pitch_deck action
   - This will show progressive feedback and extracted data
   - After analysis, ask: "Would you like me to create a deal for this company?"
   - WAIT for confirmation

3. WHEN USER SAYS "YES" TO CREATE DEAL:
   - Call create_deal_from_deck action with the extracted data
   - Use the company name, description, and metrics from the analysis
   - The deal card will appear automatically

4. CONVERSATIONAL GUIDELINES:
   - Be helpful and suggestive (offer next steps)
   - Wait for explicit user confirmation before actions
   - Keep it natural and friendly
   - Remember context from the conversation
   - If user asks questions about the deck, answer based on the analysis

DO NOT:
- Auto-analyze files without being asked
- Auto-create deals without confirmation
- Navigate away from chat (deals appear as cards)
- Make up information that wasn't in the analysis`,
```

---

### **STEP 8: Create Simulated Analysis Action**
**Purpose**: Provide mock analysis when user asks

**File**: `src/components/features/deal-intake-actions.tsx`

**Add New Action** (before create_deal_from_deck):
```typescript
// Simulate deck analysis
useCopilotAction({
  name: "analyze_pitch_deck",
  description: "Analyze an uploaded pitch deck and extract company information, metrics, and key details. Call this when the user explicitly asks to analyze a deck.",
  parameters: [
    {
      name: "fileName",
      type: "string",
      description: "Name of the file to analyze",
      required: false,
    },
  ],
  handler: async ({ fileName }) => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return mock analysis (hardcoded for now)
    return `✅ **Analysis Complete**

I've extracted the following information from the pitch deck:

📊 **Company**: Acme Corp
📝 **Description**: B2B SaaS platform for logistics automation
💰 **MRR**: $450K (+15% MoM)
👥 **Team**: 12 people
📍 **Location**: San Francisco, CA
🏢 **Industry**: B2B SaaS - Logistics Automation
📅 **Founded**: 2023

Would you like me to create a deal for this company?`;
  },
});
```

**Note**: This is temporary mock data. In production, this would call a real AI/OCR service.

---

### **STEP 9: Update create_deal_from_deck Action**
**Purpose**: Show DealCard in chat instead of navigating

**File**: `src/components/features/deal-intake-actions.tsx`

**Modify Handler**:
```typescript
handler: async ({
  companyName,
  description,
  mrr,
  teamSize,
  location,
  foundingDate,
  stage
}: {
  companyName: string;
  description: string;
  mrr?: string;
  teamSize?: number;
  location?: string;
  foundingDate?: string;
  stage?: string;
}) => {
  try {
    const dealId = `deal-${Date.now()}`;

    console.log('Creating deal with data:', {
      dealId,
      companyName,
      description,
      mrr,
      teamSize,
      location,
      foundingDate,
      stage: stage || 'Inbound'
    });

    // ❌ REMOVE: router.push('/pipeline')

    // ✅ RETURN: Success message (render will handle UI)
    return `✅ **Deal created successfully!**

📊 **${companyName}** has been added to your pipeline.

Click the card below to view full details.`;
  } catch (error) {
    console.error('Failed to create deal:', error);
    return `❌ Sorry, I encountered an error creating the deal. Please try again or create it manually.`;
  }
},
```

**Add Render Function** (after handler, before closing the action):
```typescript
// Use render to display custom UI (DealCard) in the chat
render: ({ status, result, args }) => {
  // Only render the card when action completes successfully
  if (status === "complete" && result && result.includes("✅")) {
    const { companyName, description, mrr, teamSize, location, stage } = args;
    const dealId = `deal-${Date.now()}`;

    const deal = {
      id: dealId,
      company: {
        name: companyName,
        description: description,
        location: location || 'N/A',
        teamSize: teamSize || 0,
      },
      metrics: [
        {
          id: '1',
          name: 'MRR',
          value: mrr || '$0',
          trend: '+15% MoM'
        },
        {
          id: '2',
          name: 'ARR',
          value: mrr ? `$${(parseInt(mrr.replace(/[^0-9]/g, '')) * 12)}K` : '$0',
          trend: null
        },
        {
          id: '3',
          name: 'Burn',
          value: '$120K',
          trend: null
        }
      ],
      fitScore: { score: 78 },
      stage: stage || 'Inbound',
      source: 'Pitch Deck Upload',
      owner: { name: 'Sarah Analyst' },
      lastActivity: 'Just now'
    };

    return (
      <div className="space-y-3">
        <DealCard deal={deal} isNew={true} />
      </div>
    );
  }

  // Return null for other statuses or show loading state
  if (status === "executing") {
    return <div className="text-slate-500">Creating deal...</div>;
  }

  return null;
},
```

---

### **STEP 10: Add "NEW" Badge to DealCard**
**Purpose**: Visually indicate newly created deals

**File**: `src/components/copilot/DealCard.tsx`

**Update Interface**:
```typescript
interface DealCardProps {
  deal: Deal;
  loading?: boolean;
  isNew?: boolean; // NEW PROP
}
```

**Update Component Function Signature**:
```typescript
export function DealCard({ deal, loading, isNew }: DealCardProps) {
```

**Add Badge in JSX** (after the Link opening tag):
```typescript
return (
  <Link href={`/deals/${deal.id}`} className="block group relative rounded-lg border border-border/50 bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden cursor-pointer">
    {/* Add NEW badge at top-right */}
    {isNew && (
      <div className="absolute top-3 right-3 z-10">
        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
          NEW
        </span>
      </div>
    )}

    {/* Rest of existing card content */}
    {/* ... */}
  </Link>
);
```

**Note**:
- Ensure the Link has `relative` class for absolute positioning to work
- Added `relative` to the className if not already present

---

### **STEP 11: Update UI Layout - Show Pending Files**
**Purpose**: Display pending files below input area

**File**: `src/components/layout/ai-interface.tsx`

**Location**: In the input area section, add this BEFORE the textarea/input field

**For "center" layout**:
```tsx
{/* Input Area */}
<div className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
  {/* File Upload Drop Zone */}
  {isDragging && (
    <FileUploadZone
      onFileDrop={handleFileDrop}
      onDragLeave={handleDragLeave}
    />
  )}

  {/* Pending Files Preview - ADD THIS */}
  {pendingFiles.length > 0 && (
    <div className="px-6 pt-4 space-y-2">
      {pendingFiles.map((file, idx) => (
        <PendingFilePreview
          key={`${file.name}-${idx}`}
          file={file}
          onRemove={() => {
            setPendingFiles(prev => prev.filter((_, i) => i !== idx));
          }}
        />
      ))}
    </div>
  )}

  {/* Existing input area */}
  <div className="flex items-end gap-2 p-6">
    {/* ... rest of input UI ... */}
  </div>
</div>
```

**For "floating" and "sidebar" layouts**: Add the same pending files preview section in the respective input areas.

---

### **STEP 12: Clean Up Unused Code**
**Purpose**: Remove old auto-upload implementation

**File**: `src/components/layout/ai-interface.tsx`

**Delete**:

1. **AttachedFile interface** (around line 26-32):
```typescript
// DELETE THIS:
interface AttachedFile {
  file: File;
  id: string;
  uploadProgress: number;
  status: 'uploading' | 'parsing' | 'success' | 'error';
  errorMessage?: string;
}
```

2. **attachedFiles state** (around line 67):
```typescript
// DELETE THIS:
const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
```

3. **simulateUpload function** (around lines 171-220):
```typescript
// DELETE THIS ENTIRE FUNCTION:
const simulateUpload = (fileId: string, file: File) => {
  // ... all the upload simulation code ...
};
```

4. **Auto-message sending in handleFileDrop**:
```typescript
// DELETE THIS from handleFileDrop:
// Send initial acknowledgment message
if (newFiles.length > 0) {
  const fileNames = newFiles.map(f => f.file.name).join(', ');
  appendMessage(new TextMessage({
    content: `📎 Received...`,
    role: Role.Assistant,
  }));
}

newFiles.forEach((attachedFile) => {
  simulateUpload(attachedFile.id, attachedFile.file);
});
```

5. **FilePreviewCard usage in render**:
```typescript
// DELETE any sections showing:
{attachedFiles.length > 0 && (
  <div className="space-y-2">
    {attachedFiles.map((attachedFile) => (
      <FilePreviewCard ... />
    ))}
  </div>
)}
```

6. **FilePreviewCard import**:
```typescript
// DELETE THIS:
import { FilePreviewCard } from "@/components/deals/FilePreviewCard";
```

**Keep**:
- `isDragging` state (for drag & drop visual feedback)
- Drag handlers (handleDragEnter, handleDragLeave, handleDragOver)
- File input ref and handlers
- FileUploadZone component usage

---

### **STEP 13: Verify All Imports**
**Purpose**: Ensure all new components are imported

**File**: `src/components/layout/ai-interface.tsx`

**Required Imports** (add at the top):
```typescript
import { ChatFileAttachment } from "@/components/chat/ChatFileAttachment";
import { PendingFilePreview } from "@/components/chat/PendingFilePreview";
```

**File**: `src/components/features/deal-intake-actions.tsx`

**Required Imports** (verify these exist):
```typescript
import { useCopilotAction } from "@copilotkit/react-core";
import { useRouter } from "next/navigation";
import { DealCard } from "@/components/copilot/DealCard";
```

---

## 🧪 Testing Checklist

After implementation, test this exact flow:

### Test 1: Basic Attachment Flow
- [ ] Drag PDF to chat
- [ ] Verify: Shows in pending area below input
- [ ] Click X to remove
- [ ] Verify: File disappears

### Test 2: Send File Flow
- [ ] Drag PDF to chat
- [ ] Type "here's a deck"
- [ ] Click send
- [ ] Verify: Message appears with PDF attachment card
- [ ] Verify: AI responds "Thanks! Would you like me to analyze..."

### Test 3: Analysis Flow
- [ ] Send PDF
- [ ] User types "yes, analyze it"
- [ ] Verify: AI shows "🔍 Analyzing..." message (with 2s delay)
- [ ] Verify: After delay, shows extracted data
- [ ] Verify: AI asks "Would you like me to create a deal?"

### Test 4: Deal Creation Flow
- [ ] Complete analysis
- [ ] User types "yes, create it"
- [ ] Verify: AI shows "✅ Deal created successfully!"
- [ ] Verify: DealCard appears with "NEW" badge
- [ ] Click card
- [ ] Verify: Navigates to `/deals/{id}` page

### Test 5: Edge Cases
- [ ] Send message without file (normal chat works)
- [ ] Attach file but don't send (stays in pending)
- [ ] Send file without text (shows file with default text "Here's a file")
- [ ] Remove file after attaching (clears pending)
- [ ] Drag & drop shows visual feedback (isDragging state)

### Test 6: User Experience
- [ ] File icon colors match type (PDF = red, PPT = orange)
- [ ] File sizes display correctly (MB, KB, etc.)
- [ ] NEW badge animates (pulse effect)
- [ ] DealCard is clickable and has hover effect
- [ ] Chat auto-scrolls to new messages
- [ ] Pending file preview is dismissable

---

## 📝 Implementation Order Summary

**Phase 1: Components** (Steps 1-2)
- [ ] Create ChatFileAttachment.tsx
- [ ] Create PendingFilePreview.tsx

**Phase 2: Core Logic** (Steps 3-6)
- [ ] Update ai-interface.tsx state management
- [ ] Modify handleFileDrop to only add to pending
- [ ] Update handleSubmit to include files in message
- [ ] Add file rendering in renderMessageContent

**Phase 3: AI Integration** (Steps 7-9)
- [ ] Update CopilotKit instructions in route.ts
- [ ] Add analyze_pitch_deck action
- [ ] Modify create_deal_from_deck action (remove navigation, add render)

**Phase 4: UI Polish** (Steps 10-11)
- [ ] Add NEW badge to DealCard
- [ ] Show pending files in UI

**Phase 5: Cleanup** (Steps 12-13)
- [ ] Remove old auto-upload code
- [ ] Verify all imports

**Phase 6: Testing**
- [ ] Run through complete testing checklist
- [ ] Fix any issues found
- [ ] Verify all edge cases work

---

## 🚀 Expected User Flow

```
1. User drags PDF → Shows in pending area
2. User types "analyze" → Click send
3. Message with PDF appears in chat
4. AI: "Thanks! Would you like me to analyze?"
5. User: "yes"
6. AI: "🔍 Analyzing..." (2s delay)
7. AI: "✅ Analysis Complete [extracted data]"
8. AI: "Would you like me to create a deal?"
9. User: "yes"
10. AI: "✅ Deal created successfully!"
11. DealCard appears with NEW badge
12. User clicks card → Navigate to deal page
```

---

## 🔧 Troubleshooting

### Issue: Files don't appear in pending area
- Check: `pendingFiles` state is being updated
- Check: `PendingFilePreview` is rendered conditionally
- Check: handleFileDrop is calling `setPendingFiles`

### Issue: Files don't show in user message
- Check: `files` metadata is attached to message object
- Check: `renderMessageContent` checks for `msg.files`
- Check: `ChatFileAttachment` component is imported

### Issue: AI analyzes automatically
- Check: CopilotKit instructions in route.ts
- Check: No auto-triggering in handleSubmit
- Check: analyze_pitch_deck action description is clear

### Issue: DealCard doesn't appear
- Check: `render` function in create_deal_from_deck action
- Check: `isNew` prop is being passed
- Check: DealCard import in deal-intake-actions.tsx

### Issue: NEW badge doesn't show
- Check: `isNew` prop in DealCard interface
- Check: Conditional rendering of badge in DealCard
- Check: Link has `relative` class for absolute positioning

---

## 📚 Key Files Modified

1. **New Files**:
   - `src/components/chat/ChatFileAttachment.tsx`
   - `src/components/chat/PendingFilePreview.tsx`

2. **Modified Files**:
   - `src/components/layout/ai-interface.tsx`
   - `src/components/features/deal-intake-actions.tsx`
   - `src/components/copilot/DealCard.tsx`
   - `src/app/api/copilotkit/route.ts`

3. **Unchanged Files** (for reference):
   - `src/components/deals/FilePreviewCard.tsx` (keep but not used)
   - `src/components/deals/FileUploadZone.tsx` (still used for drag drop)

---

## ✅ Definition of Done

This implementation is complete when:
- [ ] All 6 test scenarios pass
- [ ] User can attach files without auto-processing
- [ ] User can manually trigger analysis
- [ ] AI suggests actions (doesn't auto-execute)
- [ ] DealCard appears in chat with NEW badge
- [ ] Clicking DealCard navigates to deal page
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Dev server runs without issues

---

**Document Version**: 1.0
**Last Updated**: December 4, 2025
**Status**: Ready for Implementation
