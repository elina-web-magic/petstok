# ROUTE PAYLOAD BUILDING

This diagram shows how a normalized itinerary is transformed into a routing payload for map providers.

## How to read this diagram

- The flow starts with a normalized itinerary
- The system extracts ordered segments
- It builds a sequence of route points:
  - origin of the first segment
  - destination of each segment
- Duplicate consecutive points are removed
- Only valid coordinates are included
- The result is a clean list of points ready for Maps API

```mermaid
flowchart TD
    A["Normalized Itinerary"] --> B["Extract Segments"]

    B --> C["Build Route Points"]
    C --> D["Remove Duplicates"]
    D --> E["Filter Valid Coordinates"]

    E --> F["Route Payload (points[])"]

    %% Styling
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;

    class A client;
    class B,C,D,E,F action;
```
