---
title: Arguing the case
description: "A retry policy that cites every mechanism from the last eleven weeks, the incident it produced, and a position you have to defend."
week: 12
date: 2027-05-24
teachers:
  - idris-fenn
failure_scenario: "A retry policy citing every mechanism from the semester, handed over with the incident it produced and the outcome removed, to be argued for or against."
decided_by: product
related:
  - assessments/case-against-retrying
image: ./12-arguing-the-case.avif
imageAlt: A two-pan balance scale weighing a single coin against a tall stack of coins
---

## A policy you did not write

A real service's retry policy, handed over with the incident that followed it and the outcome removed. The policy has exponential backoff with jitter, a shared budget, a classification table and a circuit breaker — every mechanism the last eleven weeks asked for.

## Approving it because it looks careful

Sign it off. It names the right mechanisms, the numbers look deliberate, and none of it is the naive loop from week 1.

## Reading it cold

Read the numbers against each other instead of one at a time. The classification table lists `409` as retryable. The breaker opens at half of the last twenty calls failing, while the dependency's own error rate at peak load is already forty percent. The deadline is thirty seconds and the schedule's tenth wait is fifty-one, so four entries in the schedule can never run. Each mechanism is defensible alone; the policy is the set of them, and nobody checked the set.

## Arguing it either way

Take a position on whether this service should have retried at all, in the terms the semester has used: attempts arriving at the dependency, latency on the path that was already working, what state a failure leaves behind, and who could see it happening. Say what you would have measured at the time to know, then argue it against a partner assigned the opposite side.

## Why this is finally a product call

`product`. Whether a checkout flow should add 400 ms to its 99th percentile so that one order in a thousand stops failing is not a question about mechanism. Engineering can state both numbers precisely and cannot choose between them, because the choice depends on what the product is for — which has been true for eleven weeks while looking like a technical question.

## In the lab

Read the policy cold, list every claim in it that could be checked against a number, and check the ones you can. Take a position and argue it, then argue the other side. Finally, write down the one measurement that would have settled it before the incident, and say whether the policy's own logging would have produced it.
