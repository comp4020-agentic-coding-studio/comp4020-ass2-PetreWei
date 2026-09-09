---
title: Watching a breaker trip
description: "Giving up availability on purpose, so every caller stops paying to rediscover the same outage."
week: 8
date: 2027-04-26
teachers:
  - idris-fenn
failure_scenario: "A dependency is down for an extended period, and every request still knocks on its door before giving up."
decided_by: platform
related:
  - assessments/retry-policy
---

## The situation

A dependency goes down for minutes, not seconds, long enough that no per-request backoff is going to help.

## The reflex

Keep retrying each request against the dependency individually, on the same schedule that worked for a two-second blip in week 3.

## What it costs

Every request still pays the full timeout finding out the dependency is down, which spends the client's own latency budget on a fact that was already known after the first failure.

## The fix, and what it trades

A circuit breaker that opens once enough requests have failed, waits, then lets exactly one probe through to ask whether the dependency is back, closing only if that probe succeeds. It trades availability it might have had: while the breaker is open, requests fail that would have worked, which is the course's most explicit purchase so far — a known small loss now, instead of an unknown larger one spread across every caller.

## Who decides

`platform`. A circuit breaker that stops requests from even trying, once enough of them have failed, is a shared piece of state the whole client needs to see, which puts the decision at the platform level rather than the individual request.

## In the studio

Students wire a circuit breaker in front of a dependency seeded to fail for an extended window, watch requests stop reaching it once the breaker opens, and confirm it closes again once the dependency recovers, including the failure mode where it does not.
