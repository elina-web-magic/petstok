# State and Storage

The system uses multiple types of state.

Understanding where state belongs is critical.

---

## 1. UI State

Stored in React client components.

Examples:

- input values
- loading state
- error messages
- modal visibility

This state is temporary.

---

## 2. Server State

Stored in the database.

Examples:

- posts
- videos
- AI metadata
- moderation status

Server state is the source of truth.

---

## 3. Derived State

Generated on the server from existing data.

Examples:

- AI tags
- AI confidence
- moderation results

Derived state should not be recomputed unnecessarily.

---

## 4. URL State

Stored in query parameters.

Examples:

- embed parameters
- preview settings
- user context

URL state should always be shareable.

---

## 5. AI State

AI results are stored in the database.

Quick AI results are temporary.

Deep AI results are persisted.

---

## Golden Rule

If state must survive a page refresh → database.

If state is UI-only → React state.
