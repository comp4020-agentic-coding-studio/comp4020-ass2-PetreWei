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

Keep retrying each request against the dependency individually, on the same schedule that worked for a two-second blip in week 3. Every request still pays the full timeout finding out the dependency is down, which spends the client's own latency budget on a fact that was already known after the first failure.

## Outline

- circuit breakers: open, half-open, closed
- a breaker that never closes is as broken as one that never opens
- the retry policy defence: what the reviewer will actually challenge
