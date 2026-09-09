---
title: Synchronising a herd
description: "Ten thousand clients, each backing off correctly on its own, still manage to retry on the same second."
week: 4
date: 2027-03-15
teachers:
  - idris-fenn
failure_scenario: Ten thousand clients, each backing off correctly on its own, all retry on the same second.
decided_by: platform
related:
  - assessments/retry-audit
---

## The situation

A dependency recovers from an outage. Every client that failed during the outage is, correctly, about to retry.

## The naive retry

Trust that each client's own backoff is enough, because each one is behaving well in isolation.

## What it costs

Ten thousand well-behaved clients retrying on the same second is a thundering herd: the recovering dependency is hit by a synchronised spike and falls over again, and no single client did anything wrong.

## Who decides

`platform`. No one client can see the other nine thousand nine hundred and ninety-nine, so the fix, jitter that randomises when each client's backoff actually fires, has to be a property the platform requires of every client rather than a courtesy any one of them can opt into.

## In the studio

Students run a simulated recovery with ten synchronised clients and watch it fail, then add jitter to each client's backoff independently and watch the same recovery succeed.
