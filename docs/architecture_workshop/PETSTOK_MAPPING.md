# Mapping Petstok to Real-World B2B Frontend Systems

## Purpose

This document maps the Petstok project to real-world production frontend patterns.

The goal is to transform Petstok from a "pet project" into a **strong interview narrative** that demonstrates:

- system design thinking
- async flow handling
- API architecture
- resilience and scalability

This mapping allows you to answer most interview questions using **real experience instead of theory**.

---

## Core Insight

Petstok is not just a TikTok clone.

It is an **API-driven, async, multi-stage processing system**, which is very similar to:

- ecommerce flows (search → booking → payment)
- data pipelines
- B2B integrations
- background processing systems

---

## Mapping Overview

| Petstok Concept | Real-World Equivalent |
| :--- | :--- |
| Quick AI | synchronous lightweight processing (search/autocomplete) |
| Deep AI | async background processing (booking/payment/processing jobs) |
| Post publish flow | transaction start |
| Deep AI pipeline | distributed processing system |
| AI providers | third-party integrations |
| Moderation | validation / business rules |
| AI metadata | enriched backend data |

---

## 1. Async Flow Mapping

### Petstok Flow

```text
upload → quick AI → publish → deep AI → metadata ready
