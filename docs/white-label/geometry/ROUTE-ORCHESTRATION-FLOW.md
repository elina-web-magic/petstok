# ROUTE ORCHESTRATION FLOW

This diagram shows how route data is fetched, normalized, cached, and returned to the UI.

## How to read this diagram

- The flow starts when a user selects an itinerary
- The system checks cache first
- If not cached:
  - builds route payload
  - calls Maps API
  - normalizes geometry
- The result is cached and returned
- This layer orchestrates all steps into a single flow

```mermaid
flowchart TD
    A["User selects itinerary"] --> B["Check cache"]

    B -->|Hit| C["Return cached geometry"]
    B -->|Miss| D["Build route payload"]

    D --> E["Fetch route (Maps API)"]
    E --> F["Geometry Adapter"]

    F --> G["NormalizedGeometry"]
    G --> H["Cache result"]
    H --> I["Return to UI"]

    C --> I

    %% Styling
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;
    classDef db fill:#ffedd5,stroke:#ea580c,stroke-width:3px,color:#431407;

    class A,I client;
    class B,D,F,G action;
    class E server;
    class H db;
```
