---
title: Reproducing the reflex
description: "A read times out and the retry succeeds. Nothing was written and nothing broke, so the reflex gets learned before anyone examines it."
week: 1
date: 2027-02-22
teachers:
  - marisol-quaye
failure_scenario: "A read request times out once; a client retries it and the second attempt succeeds."
decided_by: client
image: ./01-reproducing-the-reflex.avif
imageAlt: A boomerang mid-flight, curving back toward the open hand that threw it
---

## A read that times out once

A `GET` against a read-only endpoint times out after thirty seconds. Nothing on the server changed, because that endpoint does not write.

## What everyone does next

Retry. Nobody classifies the failure first — the call did not return, so the call gets made again.

## Why it worked

The second attempt returns `200`. Sending that request twice produces the same result as sending it once, so the repeat was safe. The property is called idempotence, and here it holds for a dull reason: the endpoint only reads.

## The precondition nobody wrote down

The retry depended on a fact about this specific endpoint, and the retry code does not mention it. Write it down: repeating this call cannot change anything on the server. Change the method to `POST` and that sentence is false while the three lines of retry code stay exactly as they are. That is next week.

## Where the decision was made

`client`. The retry is inline at the call site — a loop, a counter, no configuration and no policy. Note where it sits, because by week 5 the same decision has moved two layers away and nobody can find it.

## In the lab

Point a client at a read endpoint rigged to time out on one request in four, retry it, and watch it succeed. You will spend eleven weeks being asked to distrust this, so it is worth watching it work once.
