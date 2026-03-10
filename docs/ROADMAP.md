# Petstok Roadmap

AI-powered platform for analyzing pet videos and detecting potential **disability-related visual signals in pets**.

The system evolves from **simple AI-assisted metadata** to **specialized ML models trained on real-world data**.

---

## Product Direction

The platform has two AI layers.

## 1. Quick AI (pre-publish)

Runs before publishing.

Purpose:

- help the user understand the video
- suggest hashtags
- provide lightweight analysis

Characteristics:

- fast
- stateless
- cheap
- does not persist metadata

---

## 2. Deep AI (post-publish)

Runs after the post is created.

Purpose:

- enrich metadata
- run moderation
- detect disability-related signals
- persist results to database

Deep AI is designed as a **modular analysis pipeline**.

Eye-condition detection is the **first specialized module**, not the only one.

---

## Phase 1 — Core Product (MVP)

Goal: users can upload a video, run quick AI, publish a post, and view the post page.

---

## Upload Flow

- [x] Video URL upload panel
- [x] Video preview component
- [x] Video URL validation
- [x] reference image support

---

## Quick AI

Endpoint:

```text
POST /api/ai/quick-video-check
```

Architecture:

```text
route
→ validation
→ guard
→ provider
```

Implemented:

- [x] validation layer
- [x] guard layer
- [x] provider layer
- [x] mock AI response

Responsibilities:

- suggest hashtags
- rough animal classification
- basic anomaly hints

Quick AI should **never block publishing**.

---

## Post Creation

Endpoint:

```text
POST /api/posts
```

Features:

- [x] create post
- [x] persist videoUrl
- [x] persist caption
- [x] persist petId

Flow:

```text
client
→ publish API
→ database
→ redirect /posts/[postId]
```

---

## Post Page

Page:

```text
/posts/[postId]
```

Features:

- [x] shared `getPostById`
- [x] video preview component
- [x] caption display
- [x] pet id
- [x] placeholder AI metadata

Purpose:

This page becomes the **entry point for deep AI analysis**.

---

## Phase 2 — Deep AI Pipeline

Goal: analyze published videos and persist metadata.

Deep AI runs **after publish**.

---

## Deep AI Endpoint

```text
POST /api/posts/[postId]/deep-ai
```

Architecture:

```text
route
→ validation
→ guard
→ action
→ provider
→ persistence
```

Tasks:

- run deeper video analysis
- generate metadata
- run moderation
- store results

---

## Persisted Metadata

Stored in the `video` table.

Fields:

```text
aiTags
aiConfidence
aiDescription
moderationStatus
moderationReason
```

---

## Moderation Status

Possible states:

```text
PENDING
APPROVED
REJECTED
FLAGGED
```

Moderation signals may come from:

- AI providers
- rule-based checks
- future ML models

---

## Phase 3 — Real AI Integration

Replace mock providers with real APIs.

Possible providers:

- GoogleGenAI Vision
- multimodal LLMs
- Cloudinary AI

Use cases:

- video description
- tag extraction
- anomaly hints
- moderation signals

These providers feed the **Deep AI pipeline**.

---

## Phase 4 — Modular Disability Detection

Deep AI must support **pluggable analyzers**.

Modules:

```text
Deep AI
├─ moderation module
├─ metadata module
└─ disability detection module
```

Disability module supports multiple detectors.

First module:

```text
eye-condition signals
```

Future modules:

```text
mobility signals
asymmetry signals
behavior signals
```

Each module produces **structured signals**.

---

## Phase 5 — Dataset Collection

Goal: prepare real-world dataset for ML training.

Collected data includes:

- healthy eyes
- partially blind
- fully blind
- uncertain cases

Dataset diversity is important.

Examples:

- different lighting
- different breeds
- different ages
- different camera quality

Collected data feeds the **training pipeline**.

---

## Phase 6 — Custom Model Training

Tools:

```text
Roboflow
manual labeling
dataset versioning
Google Colab
```

Possible training approaches:

### Classification models

Detect eye conditions from cropped images.

Examples:

```text
EfficientNet
ResNet
Vision Transformers
```

---

### Detection models

Detect eye regions before classification.

Examples:

```text
YOLOv8
YOLOv9
```

Pipeline example:

```text
video
→ frame extraction
→ detect face
→ crop eye
→ classify condition
```

---

## Phase 7 — Production AI Infrastructure

Goal: run AI reliably at scale.

Possible improvements:

### Background processing

Deep AI should run asynchronously.

Architecture:

```text
API
→ job queue
→ worker
→ AI pipeline
→ database
```

---

### Retry strategy

Jobs may fail.

System should support:

- retries
- partial analysis
- fallback providers

---

### Frame analysis pipeline

Improve analysis accuracy by using:

```text
multi-frame sampling
temporal aggregation
confidence scoring
```

---

### Multi-model analysis

Future pipeline:

```text
video
→ eye model
→ mobility model
→ behavior model
→ aggregated result
```

This allows Petstok to detect **multiple disability signals**.

---

## Long-Term Vision

Petstok becomes a **data-driven AI platform for pet health signals**.

Long-term goals:

- build domain-specific dataset
- train specialized models
- improve early detection of visual impairments
- provide insights to pet owners
