---
title: A breaker stuck open protects nothing
description: "Why a circuit breaker is shared state the platform has to hold, and why it needs to close again as much as it needs to open."
week: 8
date: 2027-04-26
teachers:
  - idris-fenn
slides: /decks/week-08/
related:
  - sessions/08-watching-a-breaker-trip
image: ./week-08.avif
imageAlt: An industrial circuit-breaker switch lever caught in its half-thrown middle position
---

A circuit breaker counts failures across requests and, past a threshold, stops making the call at all: requests fail immediately, with no network round trip. That is the easy half. The half that decides whether the breaker is any use is half-open — after a cooldown it admits exactly one probe, and closes only if the probe succeeds. Without it, a breaker either never finds out the dependency came back, or returns to full traffic the instant the cooldown expires, which is week 3's flood with a timer in front of it. The difference from backoff is worth stating plainly: backoff spaces out attempts against a dependency that is recovering, and a breaker decides whether to attempt at all against one that is not.

## Outline

- circuit breakers: open, half-open, closed
- why a breaker that never closes is as broken as one that never opens
- the retry policy defence: what the reviewer will actually challenge
