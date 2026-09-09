---
title: Becoming the outage
description: "A retry loop with no delay meets a two-second blip, and the retrying itself is what turns the blip into an outage."
week: 3
date: 2027-03-08
teachers:
  - marisol-quaye
failure_scenario: A client with no delay between attempts retries into a dependency that is down for two seconds.
decided_by: library
---

## The situation

A dependency degrades for two seconds, a blip rather than an outage, while a client is mid-request.

## The naive retry

Retry in a tight loop with no delay, on the theory that more attempts recover faster.

## What it costs

The two-second blip becomes a sustained flood of requests against a service that was already struggling, long enough to turn a blip into an outage the dependency does not recover from.

## Who decides

`library`. Once a retry is worth doing at all, spacing the attempts out is not a judgement call worth repeating at every call site, so it belongs in the retry library rather than the client.

## In the studio

Students point a zero-delay retry loop at a service seeded to degrade for two seconds, watch it fail to recover, then add exponential backoff and watch the same two-second blip pass without incident.
