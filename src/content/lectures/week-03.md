---
title: Your retry loop is the outage now
description: "Why more attempts, sooner, makes recovery slower, and why spacing retries out belongs in a library rather than at each call site."
week: 3
date: 2027-03-08
teachers:
  - marisol-quaye
related:
  - sessions/03-becoming-the-outage
image: ./week-03.avif
imageAlt: A single tap turned fully open, overflowing a basin faster than the drain can take it
---

Exponential backoff does not improve any single attempt's chance of succeeding. It changes when the attempt arrives. Each wait roughly doubles — 100 ms, 200 ms, 400 ms — so a failing dependency sees a thinning stream of requests instead of a constant flood, and gets idle time to work through the queue that is already there. A fixed one-second delay has none of that property: ten thousand clients retrying every second is still ten thousand requests a second, arriving a beat later. The schedule belongs in the client library, because a call site that writes its own loop picks its own numbers, and once every call site has done that nobody can state the service's worst-case attempt rate. Jitter is the other half and it is next week: a fleet backing off on the same doubling clock stays in step.

## Outline

- why more attempts, sooner, makes recovery slower
- exponential backoff, and why a fixed delay is not enough on its own
- what belongs in a library instead of at the call site
