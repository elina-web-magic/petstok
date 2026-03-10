# Quick AI Sequence

Quick AI runs before publishing and helps the user understand the video.

---

## Request Flow

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
participant Client
participant Route
participant Guard
participant Provider

User->>Client: enter video url
User->>Client: click analyze

Client->>Route: POST /api/ai/quick-video-check

Route->>Guard: validate request
Guard-->>Route: OK

Route->>Provider: runQuickVideoAiProvider()

Provider-->>Route: AI result

Route-->>Client: response
Client-->>User: show hashtags and suggestions
```

---

## Responsibilities

Quick AI performs:

- animal classification
- hashtag suggestion
- basic anomaly hints

Quick AI should remain:

- fast
- inexpensive
- stateless
