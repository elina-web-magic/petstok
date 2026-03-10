# Technology Stack

This document describes the main technologies used in the Petstok project and the reasoning behind their selection.

The goal of the stack is to support:

- a server-first frontend architecture
- modular backend services
- AI inference pipelines
- future machine learning training workflows

---

## Framework

Next.js (App Router)

Reasons:

- React Server Components
- server-first rendering model
- built-in API routes
- predictable routing
- optimized bundling

The project follows a **server-first UI architecture** where most data fetching and logic remain on the server.

---

## Language

TypeScript

Benefits:

- static type safety
- self-documenting interfaces
- easier refactoring
- shared types between server and client

Example:

```text
type PostDetails = {
  id: number
  videoUrl: string
  caption?: string
}
```

---

## UI Styling

Tailwind CSS

Reasons:

- fast iteration
- predictable utility classes
- mobile-first layout
- minimal runtime overhead

Tailwind allows UI components to remain lightweight and composable.

---

## UI Components

shadcn/ui

Used for reusable UI primitives:

- buttons
- inputs
- alerts
- dialogs
- layout components

This provides a consistent design system without introducing heavy UI frameworks.

---

## Database

PostgreSQL

Reasons:

- strong relational model
- reliable transactions
- good support for analytics and indexing
- widely supported in production environments

---

## ORM

Prisma

Reasons:

- type-safe queries
- schema-driven development
- predictable migrations
- strong TypeScript integration

Typical query flow:

```text
server service
→ Prisma client
→ database
```

---

## Logging

Custom Logger abstraction.

Current sink:

- console

Future sinks may include:

- remote logging services
- observability platforms
- structured log pipelines

Logging helps trace:

- API requests
- AI provider calls
- error conditions

---

## AI Providers

Initial stage:

```text
mock AI provider
```

Used for:

- testing pipeline architecture
- validating API contracts

Future integrations may include:

```text
OpenAI Vision
Cloudinary AI
multimodal LLMs
```

These providers will be used for:

- video description
- tag extraction
- anomaly hints
- moderation signals

---

## Custom AI Models (future)

Later stages of the project will introduce custom computer vision models.

Training tools:

- Roboflow (dataset management)
- Google Colab (GPU training)
- manual labeling pipelines

Possible model types:

```text
YOLO object detection
classification models
vision transformers
```

These models will eventually power the **Deep AI pipeline**.

---

## Media Storage

Videos are expected to be stored in a CDN-backed storage service.

Possible options:

```text
Cloudinary
S3-compatible storage
CDN-backed media services
```

The media layer must support:

- fast video delivery
- global CDN caching
- efficient streaming

---

## Deployment (future)

Potential deployment targets include:

```text
Vercel
Docker-based infrastructure
cloud GPU inference services
```

Production infrastructure may include:

- background workers
- job queues
- AI inference services
- model deployment pipelines
