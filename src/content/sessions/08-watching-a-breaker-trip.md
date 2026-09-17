---
title: Watching a breaker trip
description: "A dependency down for minutes, and a breaker that refuses calls outright rather than letting every request find out for itself."
week: 8
date: 2027-04-26
teachers:
  - idris-fenn
failure_scenario: "A dependency is down for an extended period, and every request still knocks on its door before giving up."
decided_by: platform
related:
  - assessments/retry-policy
image: ./08-watching-a-breaker-trip.avif
imageAlt: An industrial circuit-breaker switch lever caught in its half-thrown middle position
---

## A dependency down for minutes

A dependency is down for minutes, not seconds. Week 3's backoff assumes the thing comes back within a few waits. This one does not.

## Backing off, one request at a time

Every request retries on the week 3 curve, independently. The schedule is right for a two-second pause and useless here, and nothing in the request can tell the difference.

## Every caller rediscovers the same outage

Every request waits out its full thirty-second timeout to establish what the first failure already established. With backoff on top, a single request can hold a thread for over a minute before it gives up, and threads are finite. The pool fills with calls waiting on a dependency that is not going to answer, and requests with no interest in that dependency start queueing behind them. This is how one dependency's outage becomes your service's outage.

## Refusing calls, and the half-open probe

A circuit breaker holds failure state shared across requests. It counts failures over a window, and past a threshold — half of the last twenty calls, say — it opens and fails immediately, with no network call at all. After a cooldown it goes half-open and admits exactly one probe. If the probe succeeds the breaker closes. If it fails, the cooldown restarts.

While the breaker is open, requests fail that would have worked. You are refusing calls on the evidence of earlier ones, and if the dependency recovers one second into a thirty-second cooldown, everything in that window fails for no reason. The half-open probe exists to shorten that window rather than to remove it.

## Why the breaker is platform state

`platform`. A breaker is only useful if the failures counted into it are the failures every caller saw. A per-request retry counter cannot open anything, because it forgets everything between requests. Something has to hold that state, keep it consistent across processes and expose it, which is infrastructure — and which also means one badly chosen threshold refuses calls for every caller at once.

## In the lab

Wire a breaker in front of a dependency seeded to fail for two minutes. Watch requests stop reaching it once the breaker opens, and time how long a call takes with the breaker open against how long it takes closed. Then make the dependency recover partway through the cooldown and count the requests that failed after it was already healthy.
