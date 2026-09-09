---
title: A breaker that never closes was never protecting anything
description: "Why a circuit breaker is shared state the platform has to hold, and why it needs to close again as much as it needs to open."
week: 8
date: 2027-04-26
teachers:
  - idris-fenn
related:
  - sessions/08-watching-a-breaker-trip
---

A circuit breaker's half-open state is the part that actually matters: once enough failures trip it open, it stops sending requests for a cooldown period, then lets exactly one probe through to ask whether the dependency has recovered, closing again only if that probe succeeds. Skip the half-open step and a breaker either never risks finding out the dependency is back, or floods it the instant it reopens, which is week 3's problem again in a different disguise, just delayed: backoff spaces out attempts against a dependency recovering on its own, a breaker decides whether to attempt at all against one that isn't.

## Outline

- circuit breakers: open, half-open, closed
- a breaker that never closes is as broken as one that never opens
- the retry policy defence: what the reviewer will actually challenge
