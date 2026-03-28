# Map API & System Design Patterns

## Goal

```text
 • Render consistent and correct route geometry for multiple providers with reliable async behavior and good performance.

```

## Decisions

```text
 • Introduce a normalization layer to unify provider data (time, locations, segments)
 •  Use a geometry adapter to isolate map providers and standardize output
 • Add a client-side orchestrator with caching and AbortController to handle async flow and prevent race conditions
```

## Trade-offs

```text
 • Additional layers increase complexity but improve scalability and separation of concerns
 • Client-side caching improves performance but introduces cache management complexity
```

## Why

```text
 • This ensures consistent data flow, prevents stale UI updates, and allows easy integration of new providers in a scalable white-label system.
```

## 🧩 STEP 1: High-Level Architecture

The system follows a standard client-server model with an orchestration layer that communicates with multiple external providers, internal storage, and enrichment services.

```mermaid
flowchart LR
    CLIENT[Client]
    BACKEND[Search Service]
    CACHE[Cache]
    DB[Database]
    PROVIDERS[Transport Providers]
    MAPS[Maps / Routing API]
    TZ[Timezone Service]

    CLIENT --> BACKEND
    BACKEND --> CACHE
    BACKEND --> DB
    BACKEND --> PROVIDERS
    BACKEND --> MAPS
    BACKEND --> TZ

    %% Styling
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef db fill:#ffedd5,stroke:#ea580c,stroke-width:3px,color:#431407;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;
    classDef ghost fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px,stroke-dasharray:5 5,color:#475569;

    class CLIENT client;
    class BACKEND action;
    class CACHE,DB db;
    class PROVIDERS,MAPS,TZ server;
```

**Theory:**

* **Backend:** Acts as the orchestration layer coordinating all requests.
* **Providers:** Primary data sources for transport options.
* **Maps:** Enrichment layer for route geometry and coordinates.
* **Timezone Service:** Resolves offsets for stations to ensure UTC/Local alignment.
* **Cache:** Performance optimization for frequently accessed routes.

---

## 🧩 STEP 2: Orchestration & Normalization Flow

The Orchestrator coordinates multiple adapters and ensures data consistency through several levels of normalization and enrichment.

```mermaid
flowchart TD
    ORCH[Orchestrator]
    ADAPTERS[Provider Adapters]
    RAW[Raw Responses]
    NORM[Normalizer]
    TZN[Timezone Normalizer]
    LOC[Location Enricher]
    STATE[Final Normalized State]

    ORCH --> ADAPTERS
    ADAPTERS --> RAW
    RAW --> NORM
    NORM --> TZN
    TZN --> LOC
    LOC --> STATE

    %% Styling
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef db fill:#ffedd5,stroke:#ea580c,stroke-width:3px,color:#431407;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;
    classDef ghost fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px,stroke-dasharray:5 5,color:#475569;

    class ORCH,ADAPTERS,NORM,TZN,LOC action;
    class RAW,STATE client;
```

**Theory:**

* **Normalizer:** Maps provider-specific fields into the internal domain model.
* **Timezone Normalizer:** Resolves offsets for all timestamps (ISO 8601 with offset). It ensures `departureTime` and `arrivalTime` can be compared globally.
* **Location Enricher:** Adds latitude/longitude and station-specific metadata required for map rendering.
* **Pattern:** Multi-stage enrichment preserves original data while preparing it for UI rendering.

---

## 🧩 STEP 3: Timezone Handling Patterns

For cross-border transport, the system must handle the "Arrival Offset" challenge and local display logic.

**Key Requirements:**

* **ISO 8601 with Offset:** Every timestamp must include an offset (e.g., `+02:00`).
* **UTC Comparison:** All sorting and filtering in the Orchestrator happen using UTC-millisecond equivalents.
* **Station Local Time:** The UI must display the local time at the station, not the user's current device time.
* **Next Day Indicator:** If arrival time local offset leads to a different calendar day than departure, the "next day" badge (`+1`) must be computed in the backend.

---

## 🧩 STEP 4: Map / Route Geometry Flow

Geometry (the polyline on the map) is high-payload data and implementation varies by map provider (Google, Mapbox, Deck.gl).

```mermaid
flowchart TD
    SELECT[User selects itinerary]
    UI[Frontend UI]
    BE[Backend]
    DATA[Get itinerary details]
    MAPI[Maps API]
    GRAW[Raw Geometry]
    GADAPT[Geometry Adapter]
    MERGE[Merge Data]
    FINAL[Ready for Render]

    SELECT --> UI
    UI --> BE
    BE --> DATA
    DATA --> MAPI
    MAPI --> GRAW
    GRAW --> GADAPT
    GADAPT --> MERGE
    MERGE --> FINAL

    %% Styling
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef db fill:#ffedd5,stroke:#ea580c,stroke-width:3px,color:#431407;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;
    classDef ghost fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px,stroke-dasharray:5 5,color:#475569;

    class SELECT,UI,FINAL client;
    class BE,DATA,GADAPT,MERGE action;
    class MAPI,GRAW server;
```

**Theory:**

* **Geometry Adapter:** Normalizes provider formats (Encoded Polyline vs GeoJSON) into a format understood by the white-label map component.
* **Optimization:** Heavy geometry should be fetched lazily (only when a specific itinerary is clicked).
* **Attributions:** The backend/component must extract and pass through provider-required attributions (e.g., "Map data © Google").

---

## 🧩 STEP 5: Partial Failure & Resilience

Resilience is achieved by allowing the system to return partial results when some providers fail or timeout.

```mermaid
flowchart TD
    REQ[Request]
    ORCH[Orchestrator]
    AA[Adapter A]
    AB[Adapter B]
    AC[Adapter C]
    RES[Collect Results]
    NORM[Normalizer]
    PARTIAL[Partial Response]

    REQ --> ORCH
    ORCH --> AA
    ORCH --> AB
    ORCH --> AC

    AA -- Success/Timeout --> RES
    AB -- Success/Timeout --> RES
    AC -- Success/Timeout --> RES

    RES --> NORM
    NORM --> PARTIAL

    %% Styling
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef db fill:#ffedd5,stroke:#ea580c,stroke-width:3px,color:#431407;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;
    classDef ghost fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px,stroke-dasharray:5 5,color:#475569;

    class REQ,PARTIAL client;
    class ORCH,AA,AB,AC,RES,NORM action;
```

**Theory:**

* **Parallelism:** All providers are queried simultaneously.
* **Timeouts:** Per-provider timeouts prevent a single slow source from blocking the entire response.
* **Resilience:** The "Partial Results" pattern ensures the user sees available data regardless of individual failures.

---

## 🧩 STEP 6: Frontend Architecture (React + TanStack Query)

Modern frontend state management simplifies async orchestration and caching.

**Key Features:**

* **TanStack Query:** Handles server state synchronization, caching, and invalidation.
* **Query Keys:** Uses `["route", itineraryId]` to uniquely identify and cache results.
* **Automatic Handling:** Provides built-in loading states, error boundaries, and request deduplication.
* **Geometry Caching:** Heavy route data is cached with a longer `staleTime` than search results to avoid re-fetching on view interaction.

---

## 🧩 STEP 7: Async Control & Cancellation

Using `AbortController` ensures consistent UI state and network efficiency during rapid user interactions.

```mermaid
flowchart TD
    USER[User selects itinerary]
    ST[Update Client State]
    TQ[TanStack Query start]
    ABORT[Abort previous request]
    NEW[Send new with AbortSignal]
    BACK[Backend Response]
    CACHE[Update Cache]
    RENDER[Render Map]
    FAIL[Request Fails]
    ERROR[Show Error/Retry]

    USER --> ST
    ST --> TQ
    TQ --> ABORT
    TQ --> NEW
    NEW --> BACK
    BACK --> CACHE
    CACHE --> RENDER
    NEW --> FAIL
    FAIL --> ERROR

    %% Styling
    classDef server fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#1e1b4b;
    classDef client fill:#bae6fd,stroke:#0284c7,stroke-width:3px,color:#082f49;
    classDef db fill:#ffedd5,stroke:#ea580c,stroke-width:3px,color:#431407;
    classDef action fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16;
    classDef ghost fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px,stroke-dasharray:5 5,color:#475569;

    class USER,ST,RENDER,ERROR client;
    class TQ,ABORT,NEW,CACHE action;
    class BACK server;
```

**Theory:**

* **AbortController:** Prevents "last one wins" bugs where older requests overwrite newer data.
* **Network Efficiency:** Stops unnecessary data transfer for cancelled requests.
* **Predictability:** Ensures that the UI always aligns with the most recent user selection.

---

### 🎨 Legend

#### Node colors

| Color | Meaning |
| :--- | :--- |
| 🔵 **Blue** | Client / UI layer |
| 🟣 **Purple** | Server / external API / infrastructure |
| 🟢 **Green** | Core logic / data processing |
| 🟠 **Orange** | State / cache |
| ⚪ **Gray (pale, dashed border)** | Optional layer / Ignored state |

#### Edge types

| Edge | Meaning |
| :--- | :--- |
| `——→` solid | Core flow — critical path |
| `- - →` dashed | Optional / async — non-blocking |
| `——x` cross | Cancelled / Aborted flow |
