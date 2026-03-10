# Frontend Philosophy

This project follows a product-first, architecture-aware frontend philosophy.

The goal is to build a frontend that is:

- predictable
- debuggable
- scalable
- understandable by future contributors

---

## 1. Server First

Default to **React Server Components**.

Server Components should handle:

- data fetching
- database access
- data transformation
- initial rendering

Client Components should only handle:

- interactivity
- form state
- UI state
- browser APIs

Rule:

Server first → Client only when necessary.

---

## 2. Minimal Client State

Avoid unnecessary client state.

Use client state only for:

- form inputs
- loading state
- error state
- toggles
- UI transitions

Never store:

- server data
- API results long-term
- normalized entities

Those belong on the server.

---

## 3. Data Comes From the Server

Frontend should not reinvent backend data.

Sources of truth:

1. database
2. server actions
3. API routes

The UI should only display server results.

---

## 4. Predictable Data Flow

Data should move in one direction:

UI  
→ API / server action  
→ database  
→ UI refresh

Avoid:

- hidden state mutation
- global event buses
- indirect data mutation

---

## 5. UI Components Must Be Reusable

Components should not contain business logic.

Bad:

component decides database logic

Good:

component renders props

Example:

Preview component only renders video.

It does not know about posts or AI.

---

## 6. Avoid Over-Engineering

Do not introduce abstractions before they are needed.

Avoid:

- unnecessary hooks
- global stores
- premature caching
- over-generic utilities

Prefer simple code that is easy to reason about.

---

## 7. Clear Layer Boundaries

Frontend should not know:

- database structure
- Prisma queries
- AI provider logic

Frontend should only know:

- API contracts
- UI behavior

---

## 8. Mobile First

The UI is designed for **mobile-first vertical video**.

Primary width target:

550px

Layouts should behave well on:

- small mobile
- medium mobile
- desktop preview

---

## 9. Consistent Visual Language

All UI elements should use shared primitives:

- Button
- Input
- Field
- Alert
- AspectRatio

This prevents UI drift.

---

## 10. UI Must Be Debuggable

The UI should always show enough information to debug:

Examples:

- post id
- moderation status
- AI confidence

Debug visibility is a feature during development.
