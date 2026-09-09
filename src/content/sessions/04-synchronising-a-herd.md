---
title: Synchronising a herd
description: "Ten thousand clients, each correct alone, that fall over the dependency together the moment it recovers."
week: 4
date: 2027-03-15
teachers:
  - idris-fenn
failure_scenario: "Ten thousand clients, each backing off correctly on its own, all retry on the same second."
decided_by: platform
related:
  - assessments/retry-audit
---

## The situation

A dependency recovers from an outage. Every client that failed during the outage is, correctly, about to retry.

## The reflex

Trust that each client's own backoff is enough, because each one is behaving well in isolation.

## What it costs

Ten thousand well-behaved clients retrying on the same second is a thundering herd: the recovering dependency is hit by a synchronised spike and falls over again, and no single client did anything wrong.

## The fix, and what it trades

Randomise each client's wait inside its backoff window, on every attempt rather than only the first. It trades nothing a single client can feel, which is exactly why it gets left out: the cost lands on whoever operates the fleet rather than on the caller, because no client can now state its own worst-case latency, only the shape of its distribution.

## Who decides

`platform`. No one client can see the other nine thousand nine hundred and ninety-nine, so the fix has to be a property the platform requires of every client rather than a courtesy any one of them can opt into.

## In the studio

Students run a simulated recovery with ten synchronised clients and watch it fail, then add jitter to each client's backoff independently and watch the same recovery succeed.
