# AI Architecture Overview

This document describes the high level AI architecture used in Petstok.

The system separates **Quick AI** (pre-publish analysis) and **Deep AI** (post-publish analysis).

Quick AI helps the user **before publishing**, while Deep AI performs **persistent analysis and disability detection**.

---

## System Architecture

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

Client["Client UI"] --> QuickRoute["POST /api/ai/quick-video-check"]

QuickRoute --> QuickValidation["Validation"]
QuickValidation --> QuickGuard["Guard"]
QuickGuard --> QuickProvider["Quick AI Provider"]

QuickProvider --> QuickResult["Quick AI Result"]

Client --> PublishRoute["POST /api/posts"]
PublishRoute --> DB[(Database)]

DB --> PostPage["/posts/[postId]"]

PostPage --> DeepTrigger["Run deep analysis"]

DeepTrigger --> DeepRoute["POST /api/posts/[postId]/deep-ai"]
DeepRoute --> DeepAction["Deep AI Action"]
DeepAction --> DeepGuard["Deep AI Guard"]
DeepGuard --> DeepProvider["Deep AI Provider"]

DeepProvider --> Persistence["Persistence Service"]
Persistence --> DB
```

---

## Key Concepts

### Quick AI

Runs before publishing.

Purpose:

- provide immediate feedback
- generate suggested hashtags
- detect basic anomalies

Quick AI **does not persist results**.

---

### Deep AI

Runs after a post is created.

Purpose:

- persistent metadata analysis
- moderation signals
- disability detection
- dataset collection

Deep AI **writes results to the database**.
