# ROUTE CACHING FLOW

This diagram shows how route geometry caching avoids redundant API calls and improves performance for the white-label transport search.

## How to read this diagram

- The flow starts when a user selects an itinerary
- The system first checks if route geometry is already cached
- If cache hit → return data immediately (no API call)
- If cache miss → build route payload and call Maps API
- The response is normalized via Geometry Adapter
- The result is saved in cache and rendered on the map

```mermaid
flowchart TD
    A["User selects itinerary"] --> B["Check cache"]

    B -->|Hit| C["Return cached geometry"]
    B -->|Miss| D["Build route payload"]

    D --> E["Call Maps API"]
    E --> F["Geometry response"]

    F --> G["Geometry Adapter"]
    G --> H["NormalizedGeometry"]

    H --> I["Save to cache"]
    I --> J["Render on map"]

    C --> J

    %% Styling
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef db fill:#ffedd5,stroke:#ea580c,stroke-width:3px,color:#431407;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;
    classDef ghost fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px,stroke-dasharray:5 5,color:#475569;

    class A,J client;
    class B,C,D,G,H action;
    class E,F server;
    class I db;
```

### 🎨 Legend

#### Node colors

| Color | Meaning |
| :--- | :--- |
| 🔵 **Blue** | Client / UI layer |
| 🟣 **Purple** | Server / external API / infrastructure |
| 🟢 **Green** | Core logic / data processing |
| 🟠 **Orange** | State / cache |
| ⚪ **Gray (pale, dashed border)** | Optional layer — not in the critical path |

#### Edge types

| Edge | Meaning |
| :--- | :--- |
| `——→` solid | Core flow — critical path |
| `- - →` dashed | Optional / async — non-blocking |
