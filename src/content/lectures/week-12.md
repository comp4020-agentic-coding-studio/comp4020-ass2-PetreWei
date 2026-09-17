---
title: Reading a retry policy's numbers against each other
description: "How a policy holding every mechanism from the semester still fails, and why the last question of the course is a product one."
week: 12
date: 2027-05-24
teachers:
  - idris-fenn
slides: /decks/week-12/
related:
  - sessions/12-arguing-the-case
image: ./week-12.avif
imageAlt: A two-pan balance scale weighing a single coin against a tall stack of coins
---

Every mechanism this semester has a limit that is a fact about the mechanism rather than a flaw in it. An idempotency key needs storage and a key the client remembers. Backoff adds latency to requests that were about to succeed. Jitter removes any single client's ability to state its own worst-case wait. A shared budget refuses a layer the attempt it would have recovered on. A breaker fails calls that would have worked. A deadline discards work in flight. Each of those limits can be measured, and none of them tells you whether a given service should retry. That is where the semester ends: engineering can state both numbers precisely — 400 ms added to the 99th percentile, one order in a thousand that stops failing — and cannot choose between them, because the choice depends on what the product is for.

## Outline

- the policy, read cold, with the outcome withheld
- checking each number in it against the others
- what the case against retrying is actually asking for
