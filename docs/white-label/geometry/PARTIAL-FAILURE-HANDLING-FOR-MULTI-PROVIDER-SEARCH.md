# PARTIAL FAILURE HANDLING FOR MULTI-PROVIDER SEARCH

This document describes the architecture for handling partial failures in a multi-provider transport search system.

The goal is to keep search responsive and return usable results even when one or more providers fail, timeout, or degrade.

## How to read this diagram

- The flow starts when the user submits a search request
- The orchestrator sends requests to multiple providers in parallel
- Each provider can return:
  - success
  - timeout
  - error
- Only successful responses are passed into the normalization layer
- Failed or timed out providers are tracked as partial failures
- The system returns partial results together with metadata about incomplete coverage

## Key architectural concepts

### Parallel orchestration

The orchestrator executes provider requests in parallel to reduce total latency and avoid one provider blocking the whole flow.

### Per-provider timeout

Each provider request is limited independently so that one slow integration does not delay the full search response.

### Partial failure model

Timeouts and provider errors are treated as degraded outcomes, not as full search failure.

### Normalization boundary

Only successful provider responses are normalized and merged into the final itinerary list.

### Search health metadata

The result may include metadata such as:

- `partial`
- `failedProviders`
- `timedOutProviders`

### Frontend contract

The frontend receives:

- usable itineraries
- stable result shape
- optional metadata for soft warning or observability
- no provider-specific error handling logic

```mermaid
flowchart TD
    A["User submits search"] --> B["Search Orchestrator"]

    B --> C["Provider A Request"]
    B --> D["Provider B Request"]
    B --> E["Provider C Request"]

    C --> F["Success / Timeout / Error"]
    D --> G["Success / Timeout / Error"]
    E --> H["Success / Timeout / Error"]

    F --> I["Collect successful responses"]
    G --> I
    H --> I

    I --> J["Normalize successful results"]
    J --> K["Merge itineraries"]
    K --> L["Return partial search result + metadata"]

    %% Styling
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;
    classDef ghost fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px,stroke-dasharray:5 5,color:#475569;

    class A,L client;
    class B,I,J,K action;
    class C,D,E,F,G,H server;
```
