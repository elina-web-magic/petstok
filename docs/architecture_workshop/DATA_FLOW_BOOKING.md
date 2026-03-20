# Data Flow for API-Driven Booking System

## Purpose

This document describes a typical async data flow in an API-heavy ecommerce-like system.

The goal is to model how frontend interacts with backend services during a multi-step user journey, ensuring consistency, resilience, and clear state transitions.

---

## Scope

This flow represents a simplified but realistic booking lifecycle:

- search → results → selection → booking → payment → confirmation

It reflects how a frontend should orchestrate multiple dependent API calls without coupling UI directly to backend complexity.

---

## Flow Goals

### 🟢 Deterministic flow

Each step should be explicit and isolated.

### 🟠 Controlled state transitions

Every stage must have clear loading, success, and error states.

### 🔴 Failure resilience

Failures should not break the entire flow — only the current step.

### 🔵 UI decoupling

UI should not depend on transport-level implementation.

---

## Flow Breakdown

## 1. Search Phase

User initiates search with parameters.

System behavior:

- trigger API request
- cache results
- handle loading and empty states

Important:

- debounce input
- cancel outdated requests
- avoid race conditions

---

## 2. Results Phase

User sees available options.

System behavior:

- render list (virtualized if large)
- allow filtering and sorting
- maintain stable identifiers (keys)

Important:

- do not refetch unnecessarily
- reuse cached results when possible

---

## 3. Selection Phase

User selects an item.

System behavior:

- store selected entity in flow state
- prepare data for booking step

Important:

- selection should not trigger booking yet
- state must persist across UI transitions

---

## 4. Booking Phase

User initiates booking.

System behavior:

- send POST request to create booking
- receive bookingId
- transition to next step

Important:

- treat booking as mutation
- handle partial failures (e.g. inventory change)

---

## 5. Payment Phase

User proceeds with payment.

System behavior:

- initiate payment request
- handle redirects or external providers
- confirm payment status

Important:

- payment must be idempotent
- ensure backend is source of truth

---

## 6. Confirmation Phase

Final state of the flow.

System behavior:

- fetch latest booking status
- display confirmation UI

Important:

- do not trust cached state blindly
- revalidate critical data

---

## Failure Handling Strategy

Failures should be scoped per step.

Examples:

- search fails → retry or show fallback
- booking fails → allow retry or reselect
- payment fails → retry or alternative method

Never:

- propagate failure globally unless system-wide issue

---

## Retry Strategy

Safe retries:

- search requests
- idempotent reads

Controlled retries:

- booking (only if safe)
- payment (only with backend guarantees)

---

## Caching Strategy

Cache:

- search results (short-lived)
- user selections

Do not cache blindly:

- booking state
- payment status

---

## Key Senior Insight

This flow is not just API calls — it is a **state machine across distributed systems**.

A senior engineer:

- separates each step
- prevents coupling
- models failures explicitly
- ensures UI always reflects real system state

---

## Interview Framing

Use this flow when answering:

- How do you design async flows?
- How do you handle multi-step operations?
- How do you prevent inconsistent UI states?
- How do you deal with failures in distributed systems?

Strong answer:

- defines steps
- explains transitions
- mentions retries and idempotency
- highlights backend as source of truth

---

## Summary

This booking flow is composed of:

- independent async steps
- controlled transitions
- scoped error handling
- clear separation between UI and data orchestration

It represents a production-ready mental model for API-heavy frontend systems.

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#1e293b",
    "primaryTextColor": "#f8fafc",
    "primaryBorderColor": "#334155",
    "secondaryColor": "#0f172a",
    "tertiaryColor": "#1e293b",
    "background": "#0f172a",
    "mainBkg": "#1e293b",
    "noteBkgColor": "#334155",
    "noteTextColor": "#f8fafc",
    "activationBkgColor": "#334155",
    "activationBorderColor": "#64748b",
    "sequenceNumberColor": "#f8fafc",
    "loopTextColor": "#f8fafc",
    "labelBoxBkgColor": "#1e293b",
    "labelBoxBorderColor": "#475569",
    "labelTextColor": "#cbd5e1",
    "signalColor": "#94a3b8",
    "signalTextColor": "#f1f5f9",
    "actorBkg": "#1e293b",
    "actorBorder": "#475569",
    "actorTextColor": "#f8fafc",
    "actorLineColor": "#475569"
  }
}}%%
sequenceDiagram
    box rgba(56,189,248,0.15) Client Layer
        participant UI as 🖥️ UI Layer
        participant HOOKS as 🪝 Hooks Layer
    end

    box rgba(74,222,128,0.15) Domain Logic
        participant SERVICES as ⚙️ Domain Services
    end

    box rgba(167,139,250,0.15) Server Layer
        participant API as 🔌 API Client
        participant BACKEND as 🗄️ Backend APIs
    end

    rect rgba(56,189,248,0.08)
        Note over UI,BACKEND: 🔍 SEARCH PHASE
        UI->>HOOKS: search(query)
        HOOKS->>SERVICES: executeSearch
        SERVICES->>API: GET /search
        API->>BACKEND: request
        BACKEND-->>API: results
        API-->>SERVICES: data
        SERVICES-->>HOOKS: mapped results
        HOOKS-->>UI: render results
    end

    rect rgba(251,191,36,0.08)
        Note over UI,HOOKS: 📌 SELECTION PHASE
        UI->>HOOKS: select(item)
        HOOKS-->>UI: store selection
    end

    rect rgba(74,222,128,0.08)
        Note over UI,BACKEND: 📋 BOOKING PHASE
        UI->>HOOKS: createBooking
        HOOKS->>SERVICES: createBooking
        SERVICES->>API: POST /booking
        API->>BACKEND: request
        BACKEND-->>API: bookingId
        API-->>SERVICES: response
        SERVICES-->>HOOKS: booking data
        HOOKS-->>UI: proceed to payment
    end

    rect rgba(244,114,182,0.08)
        Note over UI,BACKEND: 💳 PAYMENT PHASE
        UI->>HOOKS: initiatePayment
        HOOKS->>SERVICES: processPayment
        SERVICES->>API: POST /payment
        API->>BACKEND: request
        BACKEND-->>API: payment status
        API-->>SERVICES: response
        SERVICES-->>HOOKS: payment result
        HOOKS-->>UI: show confirmation
    end

linkStyle 0,1,2,3 stroke:#38bdf8,stroke-width:2px
linkStyle 4,5,6,7 stroke:#38bdf8,stroke-width:2px,stroke-dasharray:5
linkStyle 8,9 stroke:#fbbf24,stroke-width:2px
linkStyle 10,11,12,13 stroke:#4ade80,stroke-width:2px
linkStyle 14,15,16,17 stroke:#4ade80,stroke-width:2px,stroke-dasharray:5
linkStyle 18,19,20,21 stroke:#f472b6,stroke-width:2px
linkStyle 22,23,24,25 stroke:#f472b6,stroke-width:2px,stroke-dasharray:5
```

### Legend

| Color | Phase | Meaning |
| ----- | ----- | --------- |
| 🔵 `#38bdf8` (blue) | Search | Outgoing requests & incoming results |
| 🟡 `#fbbf24` (amber) | Selection | Local state transitions |
| 🟢 `#4ade80` (green) | Booking | Mutation flow (POST) |
| 🩷 `#f472b6` (pink) | Payment | Payment lifecycle |
| **Solid** arrow | → | Forward request / action |
| **Dashed** arrow | ⇢ | Response / return data |
