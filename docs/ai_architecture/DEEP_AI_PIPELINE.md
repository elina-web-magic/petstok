# Deep AI Pipeline

Deep AI performs post-publish analysis of videos.  
Unlike Quick AI, this pipeline runs **after a post is created** and writes persistent metadata to the database.

Deep AI is responsible for:

- metadata enrichment
- moderation signals
- disability detection
- dataset preparation for future ML models

---

## Deep AI Flow

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#EEF2FF",
    "primaryBorderColor": "#6366F1",
    "lineColor": "#64748B",
    "fontSize": "14px"
  }
}}%%

flowchart TD

PostPage["Post Page"] --> Trigger["Trigger deep AI"]

Trigger --> DeepRoute["POST /api/posts/[postId]/deep-ai"]

DeepRoute --> Validation["Validation Layer"]
Validation --> Guard["Deep AI Guard"]

Guard --> Action["Deep AI Action"]

Action --> Provider["Deep AI Provider"]

Provider --> FrameLoop["Frame Analysis"]

FrameLoop --> Result["AI Analysis Result"]

Result --> Persist["Persistence Service"]

Persist --> DB[(Database)]
```

---

## Deep AI Sequence

```mermaid
%%{init: {
  "theme": "base",
  "sequence": { "showSequenceNumbers": true },
  "themeVariables": {
    "actorBorder": "#3B82F6",
    "actorBkg": "#EFF6FF",
    "activationBorderColor": "#6366F1"
  }
}}%%

sequenceDiagram

participant User
participant PostPage
participant Route
participant Action
participant Guard
participant Provider
participant Persistence
participant DB

User->>PostPage: open post
PostPage->>Route: POST /deep-ai

Route->>Action: runDeepVideoAiCheck()

Action->>Guard: validate request
Guard-->>Action: OK

Action->>Provider: runDeepProvider()

loop analyze frames
Provider->>Provider: process frame
end

Provider-->>Action: analysis result

Action->>Persistence: persist metadata

Persistence->>DB: update video metadata

DB-->>PostPage: updated analysis
```

---

## Frame Analysis Loop

Deep AI analyzes videos frame-by-frame.

Instead of targeting a single condition type, the pipeline is designed to support **multiple visual analysis modules**.

Typical pipeline:

1. extract frames from the video
2. detect relevant visual regions
3. prepare inputs for analysis modules
4. run condition-specific analyzers
5. aggregate results across frames

```mermaid
%%{init: { "theme": "base" }}%%
flowchart LR

Video["Video"] --> Frames["Frame extraction"]

Frames --> Regions["Detect relevant regions"]

Regions --> Prepare["Prepare analysis inputs"]

Prepare --> Modules["Run analysis modules"]

Modules --> Aggregate["Aggregate results"]
```

---

## Analysis Modules

The **analysis modules layer** allows the system to run multiple independent detectors.

Each module analyzes a specific category of visual signals.

Examples of modules include:

- eye condition signals
- mobility signals
- asymmetry detection
- behavioral signals

The system may run multiple modules for the same video.

Example:

```mermaid
%%{init: { "theme": "base" }}%%
flowchart TD

Frame["Frame"]

Frame --> EyeModule["Eye analysis module"]

Frame --> MobilityModule["Mobility signals module"]

Frame --> BehaviorModule["Behavior signals module"]

EyeModule --> Result["Signals"]

MobilityModule --> Result

BehaviorModule --> Result

```

---

## Result Aggregation

Since multiple frames and modules are analyzed, the system aggregates results before storing metadata.

Aggregation may include:

- confidence scoring
- signal frequency
- multi-frame validation
- anomaly detection

Example logic:

```text
frame1 → eye signal detected
frame2 → no signal
frame3 → eye signal detected

Final result:
signal: possible_eye_condition
confidence: medium
```

This approach improves robustness when video quality is poor or lighting conditions vary.

---

## Stored Metadata

Deep AI writes results to the `video` table.

Typical fields:

- `aiTags`
- `aiConfidence`
- `aiDescription`
- `moderationStatus`
- `moderationReason`

Example structure:

```text
video
 ├─ postId
 ├─ aiTags
 ├─ aiConfidence
 ├─ aiDescription
 ├─ moderationStatus
 └─ moderationReason
```

---

## Deep AI Design Principles

Deep AI must be:

- deterministic
- modular
- extensible

The pipeline should allow adding new analysis modules without changing the core flow.

Examples of future modules:

- eye condition detection
- mobility impairment detection
- asymmetry analysis
- behavioral signals
