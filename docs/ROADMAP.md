# Petstok Roadmap

AI-powered platform for analyzing pet videos and detecting potential eye health issues.

---

## Phase 1 — Core Product (MVP)

Goal: Build a minimal working product where users can upload a video and see AI analysis.

### Upload Flow

- [x] Video URL upload panel
- [x] Video preview component
- [x] Basic validation (video URL)
- [x] Quick AI check before publish

### AI Quick Analysis

- [x] `/api/ai/quick-video-check`
- [x] validation layer
- [x] guard layer
- [x] provider layer
- [x] mock AI result

Architecture:

client  
→ route  
→ validation  
→ guard  
→ provider  

### Post Creation

- [x] Create post API `/api/posts`
- [x] Post persistence in database
- [x] Redirect to `/posts/[postId]`

### Post Page

- [x] `/posts/[postId]` page
- [x] Fetch post via `getPostById`
- [x] Render:
  - video preview
  - caption
  - AI metadata
  - moderation status

### Backend Architecture

- [x] Separate layers:
  - route
  - action
  - guard
  - provider
  - persistence

---

## Phase 2 — Deep AI Pipeline

Goal: run deeper analysis after post is published.

### Deep AI Trigger

- [ ] POST `/api/posts/[postId]/deep-ai`
- [ ] deep AI action
- [ ] deep AI provider
- [ ] persistence to `video` table

Flow:

post page  
→ deep AI trigger  
→ AI provider  
→ save results  

### AI Metadata Storage

Database fields:

- aiTags
- aiConfidence
- aiDescription
- moderationStatus
- moderationReason

### Moderation System

Statuses:

- PENDING
- APPROVED
- REJECTED
- FLAGGED

---

## Phase 3 — AI Provider Integration

Goal: replace mock AI with real AI.

Possible providers:

### Option A — OpenAI Vision

Use cases:

- scene description
- tag generation
- rough anomaly detection

Pros:

- fast integration
- no dataset required

Cons:

- limited medical precision

### Option B — Cloudinary AI

Use cases:

- tag extraction
- content moderation
- media analysis

---

## Phase 4 — Data Collection

Goal: prepare dataset for custom model.

### Dataset

Collect examples of:

- healthy eyes
- partially blind
- fully blind
- early signs of deterioration

Include:

- different lighting
- different angles
- different breeds
- different video quality

### Labels

Initial labels:

- healthy
- suspicious
- severe
- blind

Later possible labels:

- cataract
- closed_eye
- cloudy_eye
- asymmetry

---

## Phase 5 — Custom AI Model

Goal: build specialized model for eye condition detection.

### Dataset Tooling

- Roboflow (dataset management)
- manual labeling
- dataset versioning

### Model Training

Environment:

- Google Colab (GPU)

Possible models:

- YOLO (object detection)
- Vision Transformer (classification)

Possible pipeline:

frame  
→ detect pet face  
→ crop eye region  
→ classify eye condition

### Model Output

Example output:
