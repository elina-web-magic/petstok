# GEOMETRY ADAPTER

This diagram shows how different map provider responses are normalized into a unified geometry format.

## How to read this diagram

- The system receives geometry from different providers
- Each provider returns a different format:
  - Google → encoded polyline
  - Mapbox → GeoJSON coordinates
- The adapter converts each format into a unified structure
- The UI works only with normalized geometry

```mermaid
flowchart TD
    A["Maps API Response"] --> B{"Provider"}

    B -->|Google| C["Encoded Polyline"]
    B -->|Mapbox| D["GeoJSON Coordinates"]

    C --> E["Decode / Transform"]
    D --> E

    E --> F["NormalizedGeometry (points[])"]

    %% Styling
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;

    class A,B,C,D server;
    class E,F action;
```
