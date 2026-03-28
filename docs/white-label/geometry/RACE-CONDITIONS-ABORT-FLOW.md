# RACE CONDITIONS AND ABORT FLOW

This diagram shows how the system prevents stale responses from overriding the latest user action.

## How to read this diagram

- The user triggers multiple requests by selecting different itineraries
- Each new request cancels the previous one
- Only the latest request is allowed to complete
- Aborted requests are ignored and do not affect state or cache
- This guarantees correct UI behavior

```mermaid
flowchart TD
    A["User selects itinerary A"] --> B["Request A"]
    B --> C["Controller A"]

    A2["User selects itinerary B"] --> D["Abort A"]
    D --> E["Request B"]
    E --> F["Controller B"]

    C -->|Aborted| G["Ignore result"]
    F -->|Success| H["Process result"]

    H --> I["Update cache"]
    I --> J["Render UI"]

    %% Styling
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;
    classDef ghost fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px,stroke-dasharray:5 5,color:#475569;

    class A,A2,J client;
    class B,E,F action;
    class C,D,G ghost;
    class H,I action;
```
