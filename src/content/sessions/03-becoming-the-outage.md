---
title: Becoming the outage
description: "Trading latency for a dependency's breathing room, and what happens when you refuse to pay it."
week: 3
date: 2027-03-08
teachers:
  - marisol-quaye
failure_scenario: "A client with no delay between attempts retries into a dependency that is down for two seconds."
decided_by: library
---

## The situation

A dependency degrades for two seconds, a blip rather than an outage, while a client is mid-request.

## The reflex

Retry in a tight loop with no delay, on the theory that more attempts recover faster.

## What it costs

The two-second blip becomes a sustained flood of requests against a service that was already struggling, long enough to turn a blip into an outage the dependency does not recover from.

## The fix, and what it trades

Exponential backoff: each wait roughly doubles, so a struggling dependency sees a thinning trickle instead of a flood that never lets up. It trades the caller's latency for the dependency's room to recover, and it trades away the best case too — a dependency that comes back in the first hundred milliseconds will not be asked again until the window has run, so the fix makes the fast path slower to make the bad path survivable.

## Who decides

`library`. Nothing about this call site is special: the same curve works for anything talking to anything, so the client only has to ask for a retry, not choose how long to wait before the next one.

## In the studio

Students point a zero-delay retry loop at a service seeded to degrade for two seconds, watch it fail to recover, then add exponential backoff and watch the same two-second blip pass without incident.
