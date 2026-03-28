# ROUTE DATA NORMALIZATION

This diagram shows how raw transport provider data is normalized into a consistent domain model used across the system.

## How to read this diagram

- The flow starts with raw data coming from multiple transport providers
- Each provider may return different formats (timezones, structures, naming)
- The system normalizes:
  - date/time into ISO format with timezone
  - locations into consistent shape (id, name, lat, lng)
  - segments into unified transport segments
- Normalized segments are combined into itineraries
- The result is a consistent, provider-agnostic data structure used by the UI and further processing layers

```mermaid
flowchart TD
    A["Provider APIs (Train / Bus / Ferry)"] --> B["Raw Transport Data"]

    B --> C["Normalize DateTime"]
    B --> D["Normalize Location"]

    C --> E["Normalize Segment"]
    D --> E

    E --> F["Normalized Itinerary"]

    %% Styling
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef db fill:#ffedd5,stroke:#ea580c,stroke-width:3px,color:#431407;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;

    class A,B server;
    class C,D,E,F action;
```
