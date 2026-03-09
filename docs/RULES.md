# Project Rules

These rules ensure code consistency and maintainability.

---

## TypeScript Rules

- Do not use `any`
- Prefer explicit types
- Prefer shared types
- Avoid type duplication

---

## Function Rules

Use arrow functions.

Correct:

const createPost = async () => {}

Avoid:

function createPost() {}

---

## File Responsibilities

Each file should have one responsibility.

Examples:

validation file → request shape validation  
guard file → business safety checks  
provider file → external AI logic  

---

## Server vs Client

Client components:

- UI interaction
- local state
- browser APIs

Server components:

- data fetching
- DB access
- data formatting

---

## API Routes

Routes should be thin.

Routes should:

- parse request
- validate input
- call action
- return response

Routes should not contain business logic.

---

## Logging

Routes must log:

- request start
- invalid input
- errors

Providers must log:

- AI invocation
- classification results
- fallback cases

---

## UI Rules

- reuse components
- avoid duplicated layout patterns
- avoid inline styling logic

Use shared primitives whenever possible.

---

## Simplicity Rule

If the code is hard to explain in 30 seconds,
it is probably too complicated.
