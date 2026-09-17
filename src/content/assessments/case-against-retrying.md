---
title: The case against retrying
description: "A failure from earlier in the semester, read cold with the outcome removed — argue for or against having retried at all."
week: 12
due: 2027-05-28T12:00:00+10:00
weight: 40
marking:
  mode: holistic
  description: "Judged as a single argument rather than a checklist: whether the case correctly identifies what the retry actually did — attempts arriving at the dependency, latency on the path that was already working, the state a failed attempt left behind, who could see it happening — whether it commits to a position instead of hedging between both, and whether the measurement it proposes would actually have settled the question at the time, not only in hindsight."
spec:
  - takes a clear position, for or against having retried, rather than presenting both sides unresolved
  - names what that decision did to the dependency, to the caller's latency, and to the state a failed attempt left behind
  - proposes a measurement that would have told the decision-maker whether they were right, before the outcome was known
  - engages the strongest version of the opposing argument, not a weaker one it's easier to beat
related:
  - sessions/12-arguing-the-case
image: ./case-against-retrying.avif
imageAlt: A gavel resting on a closed case file
---

## The brief

> Read the case with its outcome removed, and argue whether the retry it describes should have happened.

Eleven weeks have mostly been about retries going wrong, which makes the reflex assumption of this assessment "no" — and that reflex is exactly what week 12 asks you to distrust the same way week 1 asked you to distrust the reflex to say "yes". The case will not tell you whether the retry helped. You have to argue it from what was known at the time, not from how it turned out.

## What you submit

A written argument, no more than the length stated in the lab brief, taking one side and defending it: what you would have retried or not, what that decision does to the dependency and to the caller still waiting on it, and what you would have measured to know you were right before the outcome was in.

## How it's marked

There is no criterion table here on purpose: a case argued well is one thing, not a sum of separable parts, and splitting "took a position" from "engaged the opposing argument" would reward answers that do both badly but score on the boxes.
