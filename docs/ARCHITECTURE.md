# Petstok Technical Architecture Roadmap

Production-style technical roadmap for Petstok — a mobile-first pet video platform with AI analysis and future custom eye-condition detection.

---

## 1. Project Goals

### Primary Goal

Build a full-stack portfolio-grade application where users can:

- upload pet videos
- run quick AI analysis before publish
- publish posts
- view post details
- run deeper AI analysis after publish
- eventually detect eye-condition signals in pets

### Secondary Goal

Evolve the system from:

- generic AI inference
to
- custom computer vision model for eye health screening

---

## 2. Current Architecture Principles

### Layering

We use a layered architecture:

```text
client
↓
route
↓
validation
↓
action
↓
guard
↓
provider
↓
persistence / db
