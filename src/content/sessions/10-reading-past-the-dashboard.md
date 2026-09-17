---
title: Reading past the dashboard
description: "A dependency degrades for six weeks, retries absorb every failure, and the success-rate dashboard never moves."
week: 10
date: 2027-05-10
teachers:
  - idris-fenn
failure_scenario: "Retries quietly absorb a dependency degrading over six weeks, and the dashboard stays green while the retried latency climbs unmeasured."
decided_by: platform
image: ./10-reading-past-the-dashboard.avif
imageAlt: A house of cards standing perfectly still on a table that is visibly tilting to one side beneath it
---

## A dependency getting slowly worse

A dependency's failure rate has been climbing for six weeks, from about one request in a thousand to one in twenty. No deploy lines up with it. A table grew and an index stopped fitting in memory.

## Retries absorb it

Every failure is retried and nearly every retry succeeds. Success rate stays above 99.9%, because a request that succeeds on its second attempt is a success.

## Six weeks of decline, no alert

Nothing pages anybody. Per-request p99 latency has gone from 120 ms to eleven seconds, because a request that succeeds on its third attempt waits out two backoff intervals first. Retry traffic is now a noticeable share of what reaches the dependency, so the retries are contributing to the failure rate they are hiding. The first alert arrives when the failure rate crosses the point where three attempts stop being enough, and then six weeks of decline arrives at once, as an outage.

## Counting attempts per request

Measure attempts per request and report it beside success rate rather than in place of it. Success rate after retries answers whether the user got an answer; attempts per request answers how much work that took, and it is the number that moves while the other one is flat. Alert on a change in the ratio rather than on a fixed threshold.

Two limits. The ratio has no correct value: a service where five percent of requests need a second attempt might be healthy or might be two weeks from an outage, and the only way to tell is to compare it against its own history — so the alert is close to useless for the first month after you add it. And you now have a signal that fires when nobody has to do anything today, which is how a real signal gets tuned out before the week it matters.

## Why this lands on the platform

`platform`. A single request cannot report that it took three attempts; by the time it succeeds it has discarded the two failures. The number exists only in aggregate, which puts it with whoever owns the metrics pipeline and the dashboard definitions, not in the call site that moved on as soon as it had an answer.

## In the lab

Take six weeks of request logs in which success rate never drops below 99.9% and find the decline using only what is in the logs. Then name the one metric that would have surfaced it in the first week, compute it from the same logs, and check that it actually would have.
