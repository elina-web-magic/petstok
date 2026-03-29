# GEOMETRY ADAPTER AND UNIFIED MAP ROUTING INTEGRATION

This document describes the architecture for integrating multiple map providers (e.g., Google Maps, Mapbox) into a unified routing system.

The goal is to ensure that all route geometry returned from external providers is normalized into a consistent format that can be safely consumed by the frontend.

## How to read this diagram

- The flow starts when a user selects an itinerary
- The system builds a route payload from normalized transport data
- The orchestrator calls a provider-specific routing API
- Each provider returns geometry in a different format:
  - Google → Encoded Polyline
  - Mapbox → GeoJSON coordinates
- The Geometry Adapter transforms provider-specific formats into a unified structure
- The final output is a stable `NormalizedGeometry` object used by the frontend map

## Key architectural concepts

### Provider abstraction

Routing providers are isolated behind a common interface. The system does not depend on provider-specific formats outside the adapter layer.

### Geometry normalization

All geometry data is transformed into a unified structure:

- `{ lat, lng }[]`
- no provider-specific fields

### Orchestration layer

The orchestration layer:

- coordinates payload building
- calls the routing provider
- applies geometry normalization
- integrates caching and request control

### Compatibility with normalization layer

The routing system consumes normalized transport data:

- locations → `{ lat, lng, id }`
- segments → consistent structure
- time → ISO format

### Frontend contract

The frontend receives:

- stable geometry format
- no knowledge of provider differences
- predictable structure for rendering

## Outcome

- Provider-agnostic routing system
- Consistent geometry format across all providers
- Clean separation of concerns
- Scalable architecture for adding new providers

```mermaid
flowchart TD
    A["User selects itinerary"] --> B["Build route payload"]

    B --> C["Orchestrator"]

    C --> D["Call Routing API"]

    D --> E{"Provider"}

    E -->|Google| F["Encoded Polyline"]
    E -->|Mapbox| G["GeoJSON Coordinates"]

    F --> H["Geometry Adapter"]
    G --> H

    H --> I["NormalizedGeometry (points[])"]

    I --> J["Return to UI"]

    %% Styling
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;

    class A,J client;
    class B,C,H,I action;
    class D,E,F,G server;
```
