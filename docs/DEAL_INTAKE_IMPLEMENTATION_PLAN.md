# Deal Intake Flow - Implementation Plan

## 📋 Overview

This document outlines the complete implementation plan for building a ChatGPT-style deal intake experience where users can drag & drop pitch decks, paste links, or upload files directly into the AI chat to automatically create and analyze deals.

---

## 🎯 Goals

Create a seamless deal intake experience that allows users to:
- **Drag & drop** pitch decks (PDF/PPTX) directly into the AI chat
- **Paste links** (DocSend, Google Drive, etc.) in the chat
- **Click the paperclip icon** to browse and upload files
- **AI automatically processes** and creates deals with extracted data
- **Confirm or edit** extracted information before deal creation

---

## 📱 User Flow & Experience

### Current State
- ✅ AI chat panel exists (right sidebar in deals page)
- ✅ Paperclip icon present (line 185 in `ai-panel.tsx`)
- ✅ Text input with send button
- ✅ Voice mode toggle
- ❌ No file upload capability
- ❌ No drag & drop zone
- ❌ No link parsing
- ❌ No deck processing pipeline

### Target Experience (ChatGPT-style)

#### **User Journey:**

**Step 1: User initiates upload**
```
Options:
a) DRAG PDF file onto chat area
   → Shows blue overlay: "Drop deck here to analyze"
   → On drop: Shows file preview card

b) CLICK paperclip icon
   → File picker opens
   → Select PDF/PPTX
   → Shows file preview card

c) PASTE link in chat (e.g., docsend.com/view/xxx)
   → AI detects URL automatically
   → Shows: "I'll fetch that deck..."

d) TYPE message with attached file
   → File card appears above input
   → User types: "Analyze this deck"
   → AI processes both message and file
```

**Step 2: AI processes the deck**
```
AI Message: "I'm analyzing the deck..."

Progress indicator:
┌────────────────────────────┐
│ 📄 Acme_Deck.pdf          │
│ Parsing slides... 8/12     │
│ ████████░░░░ 67%          │
└────────────────────────────┘

AI extracts:
- Company name
- Founding date
- Team size & members
- Metrics (MRR, growth, customers)
- Market size (TAM/SAM)
- Problem & solution
- Competitive landscape
```

**Step 3: AI shows extracted data**
```
AI Message:
"Found the following information:

📊 Acme Corp
- Founded: 2023
- Location: San Francisco, CA
- Team: 12 people
- MRR: $450K (+15% MoM)
- Customers: 45 enterprises
- Market: Logistics automation (TAM: $50B)

Should I create a deal for Acme Corp?"

User options:
[✓ Yes, create deal] [✏️ Edit info first]
```

**Step 4: Deal creation**
```
Option A - User clicks "Yes":
AI: "✓ Deal created! Fit score: 78/100
     📋 View deal
     Want me to draft founder questions?"

Option B - User clicks "Edit":
Shows inline form with extracted fields
User edits → Confirms → Deal created
```

**Step 5: Continue conversation**
```
User can immediately:
- "Draft 5 questions for the founder"
- "Research their competitors"
- "What are the key risks?"
- "Generate an investment memo"
```

---

## 🏗️ Technical Architecture

### Component Structure

```
src/
├── components/
│   ├── layout/
│   │   └── ai-panel.tsx              (MODIFY - Add file upload)
│   ├── deals/
│   │   ├── FileUploadZone.tsx        (NEW - Drag & drop overlay)
│   │   ├── FilePreviewCard.tsx       (NEW - Show uploaded files)
│   │   ├── DeckParsingProgress.tsx   (NEW - Progress indicator)
│   │   └── DealConfirmation.tsx      (NEW - Confirm extracted data)
├── lib/
│   ├── services/
│   │   ├── deckParser.ts             (NEW - PDF/PPTX parsing logic)
│   │   ├── linkParser.ts             (NEW - URL parsing/fetching)
│   │   └── dealCreation.ts           (NEW - Deal creation workflow)
│   └── hooks/
│       └── useFileUpload.ts          (NEW - File upload hook)
├── app/
│   └── api/
│       └── deals/
│           ├── upload-deck/route.ts   (NEW - File upload endpoint)
│           ├── parse-deck/route.ts    (NEW - Parsing endpoint)
│           ├── parse-link/route.ts    (NEW - Link parsing endpoint)
│           └── parsing-status/route.ts (NEW - Progress tracking)
```

---

## 📝 Detailed Implementation Plan

### **Phase 1: File Upload UI (ChatGPT-style)**

#### **1.1 Install Dependencies**
```bash
npm install react-dropzone
npm install @react-pdf-viewer/core @react-pdf-viewer/default-layout
```

#### **1.2 Create FileUploadZone Component**
**File:** `src/components/deals/FileUploadZone.tsx`

Features:
- Drag & drop overlay that appears when dragging files over chat
- Blue gradient background with "Drop deck here" message
- File type validation (PDF, PPTX, DOC, DOCX)
- Multiple file support
- Animations (fade in/out)

**Props:**
```typescript
interface FileUploadZoneProps {
  isActive: boolean;        // Show overlay when true
  onDrop: (files: File[]) => void;
  acceptedTypes?: string[]; // Default: ['.pdf', '.pptx', '.docx']
}
```

#### **1.3 Create FilePreviewCard Component**
**File:** `src/components/deals/FilePreviewCard.tsx`

Features:
- Shows file icon (PDF/PPTX)
- Displays filename and size
- Remove button (X)
- Upload progress bar (0-100%)
- Success/error states

**Props:**
```typescript
interface FilePreviewCardProps {
  file: File;
  uploadProgress?: number;  // 0-100
  status: 'uploading' | 'parsing' | 'success' | 'error';
  onRemove: () => void;
  errorMessage?: string;
}
```

#### **1.4 Modify AIPanel Component**
**File:** `src/components/layout/ai-panel.tsx`

Changes:
- Add file upload state management
- Implement drag & drop zone integration
- Make paperclip icon functional (opens file picker)
- Show attached files above input
- Handle file removal
- Send files with messages

**New State:**
```typescript
const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
const [isDragging, setIsDragging] = useState(false);
const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
```

#### **1.5 UI/UX Details**

**Drag & Drop Overlay:**
```
┌─────────────────────────────────────┐
│          AI Associate               │
├─────────────────────────────────────┤
│   ┌───────────────────────────┐    │
│   │   🎯                      │    │
│   │   Drop deck here          │    │
│   │   to analyze              │    │
│   │                           │    │
│   │   Supports: PDF, PPTX     │    │
│   └───────────────────────────┘    │
└─────────────────────────────────────┘
```

**File Preview Card (Attached):**
```
┌────────────────────────────┐
│ 📄 Acme_Deck.pdf      [x]  │
│ 2.4 MB                     │
│ ████████░░ 80%             │
└────────────────────────────┘
```

**Input Area with File:**
```
┌────────────────────────────┐
│ 📄 Acme_Deck.pdf      [x]  │
└────────────────────────────┘
┌────────────────────────────┐
│ [📎] Ask anything... [🎤][→]│
└────────────────────────────┘
```

---

### **Phase 2: File Upload Backend**

#### **2.1 Create Upload API Endpoint**
**File:** `src/app/api/deals/upload-deck/route.ts`

**Endpoint:** `POST /api/deals/upload-deck`

**Request:**
- Content-Type: `multipart/form-data`
- Body: File (PDF/PPTX)
- Optional: metadata (dealId, userId)

**Response:**
```typescript
{
  success: boolean;
  fileId: string;           // Unique identifier
  fileName: string;         // Original filename
  fileUrl: string;          // Cloud storage URL or local path
  fileSize: number;         // Size in bytes
  fileType: string;         // 'pdf' | 'pptx' | 'docx'
  uploadedAt: string;       // ISO timestamp
}
```

**Implementation:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint'
    ];

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and PPTX supported.' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'uploads', 'decks');
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const fileId = `deck-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const extension = file.name.split('.').pop();
    const fileName = `${fileId}.${extension}`;
    const filePath = join(uploadsDir, fileName);

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      fileId,
      fileName: file.name,
      fileUrl: `/uploads/decks/${fileName}`,
      fileSize: file.size,
      fileType: extension,
      uploadedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
```

#### **2.2 File Storage Strategy**

**Development:**
- Local filesystem (`/uploads/decks/`)
- Add to `.gitignore`

**Production:**
- AWS S3 or similar cloud storage
- Environment variables for credentials
- Signed URLs for secure access

**Configuration:**
```typescript
// lib/config/storage.ts
export const STORAGE_CONFIG = {
  provider: process.env.STORAGE_PROVIDER || 'local', // 'local' | 's3'
  s3: {
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  local: {
    uploadsDir: '/uploads/decks',
  }
};
```

---

### **Phase 3: Deck Parsing (AI-Powered)**

#### **3.1 Install Parsing Libraries**
```bash
npm install pdf-parse          # PDF parsing
npm install pptx-parser        # PPTX parsing
npm install mammoth            # DOCX parsing (optional)
```

#### **3.2 Create Deck Parser Service**
**File:** `src/lib/services/deckParser.ts`

**Features:**
- Extract text from PDF/PPTX
- Send to LLM for structured data extraction
- Parse LLM response into deal fields
- Handle errors and partial data

**API:**
```typescript
interface ParsedDeckData {
  company: {
    name: string;
    foundingDate?: string;
    location?: string;
    website?: string;
    description: string;
  };
  team: {
    size?: number;
    founders: Array<{
      name: string;
      role: string;
      background?: string;
    }>;
  };
  metrics: {
    mrr?: string;
    arr?: string;
    growthRate?: string;
    customers?: number;
    revenue?: string;
  };
  market: {
    tam?: string;
    sam?: string;
    description?: string;
  };
  product: {
    problem: string;
    solution: string;
    differentiation?: string;
  };
  funding?: {
    seeking?: string;
    stage?: string;
    valuation?: string;
  };
  confidence: 'high' | 'medium' | 'low'; // How confident AI is
  missingFields: string[];                // What's missing
}

export async function parseDeck(
  fileUrl: string,
  fileType: 'pdf' | 'pptx'
): Promise<ParsedDeckData>;
```

**Implementation:**
```typescript
import pdf from 'pdf-parse';
import fs from 'fs/promises';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function parseDeck(
  filePath: string,
  fileType: 'pdf' | 'pptx'
): Promise<ParsedDeckData> {

  // Step 1: Extract text
  let extractedText = '';

  if (fileType === 'pdf') {
    const dataBuffer = await fs.readFile(filePath);
    const pdfData = await pdf(dataBuffer);
    extractedText = pdfData.text;
  } else if (fileType === 'pptx') {
    // Use pptx-parser or similar
    // extractedText = await parsePPTX(filePath);
  }

  // Step 2: Send to LLM for structuring
  const prompt = `
You are an expert at analyzing pitch decks. Extract structured information from this deck.

DECK CONTENT:
${extractedText}

Extract the following fields. If a field is not found, omit it or mark as null:

{
  "company": {
    "name": "string (REQUIRED)",
    "foundingDate": "string (year or date)",
    "location": "string (city, state/country)",
    "website": "string (URL)",
    "description": "string (1-2 sentences)"
  },
  "team": {
    "size": number,
    "founders": [
      { "name": "string", "role": "string", "background": "string" }
    ]
  },
  "metrics": {
    "mrr": "string (e.g., '$450K')",
    "arr": "string",
    "growthRate": "string (e.g., '+15% MoM')",
    "customers": number,
    "revenue": "string"
  },
  "market": {
    "tam": "string (e.g., '$50B')",
    "sam": "string",
    "description": "string"
  },
  "product": {
    "problem": "string (what problem they solve)",
    "solution": "string (how they solve it)",
    "differentiation": "string (competitive advantage)"
  },
  "funding": {
    "seeking": "string (amount raising)",
    "stage": "string (Seed, Series A, etc.)",
    "valuation": "string"
  }
}

Return ONLY valid JSON. Be as accurate as possible.
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: 'You extract structured data from pitch decks. Return only JSON.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
  });

  const parsedData = JSON.parse(completion.choices[0].message.content || '{}');

  // Step 3: Validate and assess confidence
  const missingFields: string[] = [];
  if (!parsedData.company?.name) missingFields.push('company name');
  if (!parsedData.company?.description) missingFields.push('company description');
  if (!parsedData.metrics?.mrr && !parsedData.metrics?.arr) missingFields.push('revenue metrics');

  const confidence =
    missingFields.length === 0 ? 'high' :
    missingFields.length <= 2 ? 'medium' : 'low';

  return {
    ...parsedData,
    confidence,
    missingFields
  };
}
```

#### **3.3 Create Parsing API Endpoint**
**File:** `src/app/api/deals/parse-deck/route.ts`

**Endpoint:** `POST /api/deals/parse-deck`

**Request:**
```typescript
{
  fileId: string;      // From upload response
  fileUrl: string;     // File path or URL
  fileType: 'pdf' | 'pptx';
}
```

**Response:**
```typescript
{
  success: boolean;
  data: ParsedDeckData; // Structured deck data
  warnings?: string[];  // Any parsing warnings
}
```

#### **3.4 Progress Tracking**

For long-running parsing jobs, implement progress tracking:

**Endpoint:** `GET /api/deals/parsing-status?jobId=xxx`

**Response:**
```typescript
{
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;      // 0-100
  currentStep: string;   // "Extracting text...", "Analyzing content..."
  result?: ParsedDeckData;
  error?: string;
}
```

---

### **Phase 4: Deal Creation Flow**

#### **4.1 Create DealConfirmation Component**
**File:** `src/components/deals/DealConfirmation.tsx`

Features:
- Shows extracted data in chat as AI message
- Editable fields (inline editing)
- Confirm button → Creates deal
- Cancel button → Discards
- Edit button → Shows form with all fields

**UI:**
```
┌─────────────────────────────────────┐
│ [AI]: Found this information:       │
│                                     │
│ 📊 Acme Corp                        │
│ ├─ Founded: 2023          [Edit]   │
│ ├─ Team: 12 people       [Edit]   │
│ ├─ MRR: $450K (+15%)     [Edit]   │
│ ├─ Market: Logistics ($50B) [Edit] │
│ └─ Location: SF, CA      [Edit]   │
│                                     │
│ Missing: Funding amount, TAM       │
│                                     │
│ [✓ Create Deal] [✏️ Edit All] [✕]  │
└─────────────────────────────────────┘
```

#### **4.2 Deal Creation API**
**File:** `src/app/api/deals/create/route.ts`

Uses existing deal creation logic, but accepts parsed deck data:

**Request:**
```typescript
{
  parsedData: ParsedDeckData;
  source: 'deck_upload';
  fileId: string;
  createdBy: string; // userId
}
```

**Response:**
```typescript
{
  success: boolean;
  deal: Deal;  // Full deal object
  fitScore?: number;
}
```

#### **4.3 AI Conversation Flow**

After deal creation, AI should:
1. Confirm creation: "✓ Deal created for Acme Corp!"
2. Show fit score: "Fit score: 78/100 (Strong B2B SaaS alignment)"
3. Suggest next actions:
   - "Want me to draft questions for the founder?"
   - "Should I research their competitors?"
   - "Need help writing the investment memo?"

---

### **Phase 5: Link Parsing (DocSend, Google Drive)**

#### **5.1 URL Detection**

In AI Panel, detect URLs in user messages:

```typescript
const urlPattern = /(https?:\/\/[^\s]+)/g;
const detectUrls = (message: string): string[] => {
  const urls = message.match(urlPattern);
  return urls || [];
};
```

#### **5.2 Link Parsers**

**File:** `src/lib/services/linkParser.ts`

```typescript
interface LinkParserResult {
  type: 'docsend' | 'gdrive' | 'dropbox' | 'unknown';
  fileUrl?: string;     // Downloaded file URL
  fileName?: string;
  error?: string;
}

export async function parseDocSendLink(url: string): Promise<LinkParserResult>;
export async function parseGoogleDriveLink(url: string): Promise<LinkParserResult>;
```

**DocSend:**
- Fetch page HTML
- Extract download link
- Download PDF
- Return local file path

**Google Drive:**
- Use Google Drive API
- Check permissions
- Download file
- Return local file path

#### **5.3 API Endpoint**
**File:** `src/app/api/deals/parse-link/route.ts`

**Endpoint:** `POST /api/deals/parse-link`

**Request:**
```typescript
{
  url: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  fileUrl: string;      // Local path after download
  fileName: string;
  fileType: 'pdf' | 'pptx';
}
```

---

## 📊 Implementation Timeline

### **Week 1: File Upload UI (ChatGPT-style)**
**Goal:** User can drag/drop files and see them attached

- **Day 1-2:**
  - Install dependencies (`react-dropzone`)
  - Create `FileUploadZone` component
  - Implement drag & drop overlay

- **Day 3:**
  - Create `FilePreviewCard` component
  - Add remove functionality
  - Style like ChatGPT

- **Day 4-5:**
  - Modify `AIPanel` to integrate file upload
  - Make paperclip icon functional
  - Handle multiple files
  - Polish animations and transitions

**Deliverable:** User can attach files to chat messages

---

### **Week 2: Backend & Parsing**
**Goal:** Files are uploaded and parsed into structured data

- **Day 1-2:**
  - Create upload API (`/api/deals/upload-deck`)
  - Implement file storage (local/S3)
  - Add file validation

- **Day 3-4:**
  - Install parsing libraries (`pdf-parse`)
  - Create `deckParser.ts` service
  - Integrate OpenAI for data extraction
  - Test with sample decks

- **Day 5:**
  - Create parsing API (`/api/deals/parse-deck`)
  - Add progress tracking
  - Error handling and validation
  - Unit tests

**Deliverable:** Uploaded decks are parsed and structured

---

### **Week 3: Deal Creation & Polish**
**Goal:** Complete end-to-end flow from upload to deal creation

- **Day 1-2:**
  - Create `DealConfirmation` component
  - AI shows extracted data
  - User can edit inline
  - Confirm button creates deal

- **Day 3:**
  - Integrate deal creation API
  - Show success message
  - Link to deal page
  - Add to pipeline

- **Day 4:**
  - Link parsing (DocSend, Google Drive)
  - URL detection in messages
  - Download and process

- **Day 5:**
  - End-to-end testing
  - Bug fixes
  - Polish UI/UX
  - Documentation

**Deliverable:** Full deal intake flow working

---

## 🚀 MVP Scope (What to Build First)

### **Must Have (P0)**
✅ These features are essential for MVP:

1. **Drag & Drop PDF onto chat**
   - Overlay appears when dragging
   - Shows "Drop here" message
   - Accepts drop and shows preview

2. **Click Paperclip to Upload PDF**
   - Opens file picker
   - User selects PDF
   - Shows preview card

3. **Show File Preview Card**
   - Filename, size, icon
   - Remove button
   - Upload progress bar

4. **Basic PDF Text Extraction**
   - Use `pdf-parse` library
   - Extract all text content
   - Handle multi-page PDFs

5. **LLM Parsing to Extract Data**
   - Send text to GPT-4
   - Extract company name, metrics, team
   - Return structured JSON

6. **AI Shows Extracted Data in Chat**
   - Format as message with fields
   - Show confidence level
   - List missing fields

7. **User Confirms → Deal Created**
   - Confirm button
   - Creates deal via API
   - Shows success message
   - Redirects or links to deal

### **Nice to Have (V2)**
🔄 These can be added later:

- PPTX support
- DOCX support
- Link parsing (DocSend, Google Drive)
- Multi-file upload (batch)
- OCR for image-based PDFs
- Edit extracted data before creating
- Progress indicators with ETA
- Parsing history/cache
- Duplicate deck detection

---

## 🎨 UI/UX Reference

### ChatGPT File Upload Pattern

**Features to Replicate:**
1. **Paperclip icon** in input area (we already have this!)
2. **Drag & drop overlay** with blue gradient
3. **File preview cards** with remove button
4. **Inline file display** above input
5. **Progress indicators** during upload
6. **Error states** with retry option

**Styling:**
- Blue accent colors (#4F46E5 - Indigo)
- Rounded corners (16px)
- Smooth animations (fade, slide)
- Shadow effects for depth
- Responsive hover states

---

## 🛠️ Technical Stack Summary

### **Frontend**
- **React** with TypeScript
- **react-dropzone** - Drag & drop
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Framer Motion** (optional) - Animations

### **Backend**
- **Next.js API Routes** - REST endpoints
- **pdf-parse** - PDF text extraction
- **pptx-parser** - PPTX parsing
- **OpenAI GPT-4** - Data structuring
- **AWS S3** (prod) or local filesystem (dev) - File storage

### **APIs**
```
POST /api/deals/upload-deck      - Upload file
POST /api/deals/parse-deck       - Parse content
POST /api/deals/parse-link       - Parse URL
GET  /api/deals/parsing-status   - Progress tracking
POST /api/deals/create           - Create deal
```

---

## 📋 Testing Plan

### **Unit Tests**
- PDF parsing logic
- Data extraction validation
- URL detection
- File type validation

### **Integration Tests**
- Upload → Parse → Create flow
- Link parsing → Download → Process
- Error handling scenarios

### **E2E Tests**
1. User drags PDF → AI processes → Deal created
2. User clicks paperclip → Selects file → Confirms
3. User pastes DocSend link → AI fetches → Parses
4. User attaches multiple files → Batch processing

### **Manual Testing Checklist**
- [ ] Drag & drop PDF works
- [ ] Drag & drop PPTX works
- [ ] Paperclip icon opens file picker
- [ ] File preview shows correct info
- [ ] Remove file button works
- [ ] Upload progress displays correctly
- [ ] Parsing extracts correct data
- [ ] AI message shows extracted fields
- [ ] Confirm button creates deal
- [ ] Deal appears in pipeline
- [ ] Error handling works (invalid file, network error, etc.)

---

## 🔒 Security Considerations

### **File Upload Security**
- Validate file types (whitelist: PDF, PPTX only)
- Limit file size (max 50MB)
- Scan for malware (ClamAV or similar)
- Generate unique filenames (prevent overwrite)
- Store in isolated directory

### **API Security**
- Require authentication (user session)
- Rate limiting (max 10 uploads/hour per user)
- Input validation (file type, size, format)
- Sanitize filenames (prevent path traversal)

### **Data Privacy**
- Encrypt files at rest (S3 encryption)
- Use signed URLs (temporary access)
- Delete old files (30-day retention)
- Log access (audit trail)

---

## 📊 Success Metrics

### **Performance Targets**
- File upload: < 5 seconds (for 5MB PDF)
- Parsing: < 30 seconds (for 12-slide deck)
- Deal creation: < 2 seconds
- End-to-end: < 1 minute total

### **Quality Metrics**
- Parsing accuracy: > 85% of fields correct
- Data extraction: > 90% company names correct
- User satisfaction: > 4/5 rating
- Error rate: < 5% of uploads fail

---

## 🚧 Known Limitations & Future Work

### **Current Limitations**
- PDF only (no PPTX initially)
- English language only
- Text-based PDFs (no OCR for images)
- Single file at a time (no batch)
- No link parsing initially

### **Future Enhancements**
- Multi-language support
- OCR for image-based PDFs
- Batch upload (multiple decks)
- Link parsing (DocSend, Google Drive, Dropbox)
- Image extraction from decks
- Financial data extraction (cap tables, P&L)
- Automatic duplicate detection
- Smart field suggestions
- Historical data comparison

---

## 📚 Resources & References

### **Documentation**
- [pdf-parse NPM](https://www.npmjs.com/package/pdf-parse)
- [react-dropzone Docs](https://react-dropzone.js.org/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Next.js File Upload Guide](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body-formdata)

### **Design References**
- ChatGPT file upload UX
- Notion drag & drop
- Linear attachment system
- Slack file sharing

---

## ✅ Next Steps

**Immediate Actions:**
1. ✅ Create feature branch: `feature/deal-intake-flow`
2. ✅ Install dependencies: `react-dropzone`, `pdf-parse`
3. ✅ Create component structure (folders, files)
4. ✅ Start with FileUploadZone component
5. ✅ Implement drag & drop overlay

**First PR:**
- File upload UI (drag & drop + paperclip)
- File preview cards
- No backend yet (just UI)

**Second PR:**
- Upload API endpoint
- File storage
- Basic PDF parsing

**Third PR:**
- LLM integration
- Deal creation flow
- End-to-end working

---

## 🤝 Contributors

- **Implementation Lead:** Claude Code
- **Product Owner:** Ankit Sharma
- **Feature Branch:** `feature/deal-intake-flow`
- **Target Completion:** 3 weeks

---

**Last Updated:** December 4, 2025
**Status:** Planning Phase → Ready for Implementation
**Next Review:** After Week 1 (UI completion)
