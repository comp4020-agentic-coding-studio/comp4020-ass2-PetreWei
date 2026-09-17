---
title: Becoming the outage
description: "A two-second slowdown, a retry loop with no delay between attempts, and a client that keeps the dependency down long after the original problem passed."
week: 3
date: 2027-03-08
teachers:
  - marisol-quaye
failure_scenario: "A client with no delay between attempts retries into a dependency that is down for two seconds."
decided_by: library
image: ./03-becoming-the-outage.avif
imageAlt: A single tap turned fully open, overflowing a basin faster than the drain can take it
---

## A two-second blip

A dependency slows down for two seconds. Not an outage — a garbage collection pause, a leader election, a spike in queue depth. Requests already in flight time out.

## Retrying immediately, and again

Retry in a tight loop with no delay, on the theory that more attempts recover sooner. One client with a `while` loop and a 100 ms timeout issues about twenty requests a second.

## How a blip becomes a flood

The dependency slowed down because it was already near its limit. Now every caller that timed out is sending twenty requests a second into it, so the queue it was trying to drain grows faster than it did before the blip. Two seconds of degradation turns into an outage that outlasts its own cause, and the thing keeping it alive is the retry loop.

## Waiting longer each time

Exponential backoff: wait 100 ms, then 200, then 400, then 800, doubling up to a ceiling. The dependency sees a thinning trickle instead of a constant flood, which leaves it enough idle capacity to drain the queue.

The limit is on the fast path. Backoff delays every retried request, including the ones that would have succeeded immediately — a dependency that recovers 90 ms in does not get asked again until the current wait expires. The recovering case gets slower so the bad case becomes survivable.

## Why the library owns the schedule

`library`. Nothing about this call site is special: the same curve works for any caller talking to any dependency. The client asks for a retry and the library decides when. It also means there is one place to change the numbers when they turn out to be wrong, which they will.

## In the lab

Point a zero-delay retry loop at a service seeded to degrade for two seconds and watch it fail to recover. Add exponential backoff, rerun the same two-second degradation, and watch it pass. Then look at what happened to p99 latency on the requests that succeeded.
