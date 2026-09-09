---
title: A retry policy you have to defend
description: "Write a retry policy for a real service, then defend it against a panel that has read weeks 5 to 8 as closely as you have."
week: 8
due: 2027-04-30T12:00:00+10:00
weight: 35
marking:
  mode: weighted
  criteria:
    - name: The policy itself
      weight: 40
    - name: Justification against the alternatives it rejects
      weight: 35
    - name: Handling of the panel's challenges
      weight: 25
spec:
  - the policy names a real service and covers what happens on failure end to end, not one mechanism in isolation
  - it states a retry budget, a backoff strategy and a breaker condition, and says how they interact
  - it names at least one alternative design it rejected, and why
  - the defence responds to the specific challenge raised, not a rehearsed answer prepared in advance
related:
  - sessions/08-watching-a-breaker-trip
---

## The brief

> Choose a service, real or one you know well enough to be honest about, and write the retry policy it should have.

By week 8 you've seen a retry loop cause its own outage, a herd synchronise by accident, a budget replace a per-call count, and a breaker that has to close again as much as it has to open. A policy that only covers one of these is not a policy, it's a fix for last week's failure. State what retries when, how long it backs off, when the breaker trips, and how those three interact under load.

## What you submit

A written policy, plus a short defence in the studio session where a panel — your teacher and a rotating pair of classmates — challenges one part of it. The written document is marked on its own; the defence is marked on how you respond to the actual challenge raised, not on how well the policy was rehearsed beforehand.

## How it's marked

The policy is worth the most because it's the artefact that has to work; the defence is worth less because it tests something narrower, whether you can explain a decision you made rather than one you're seeing for the first time.
