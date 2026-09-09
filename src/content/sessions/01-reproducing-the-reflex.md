---
title: Reproducing the reflex
description: "Week 1 sets up the semester's one recurring question by watching the case where the obvious answer is actually right."
week: 1
date: 2027-02-22
teachers:
  - marisol-quaye
failure_scenario: A read request times out once; a client retries it and the second attempt succeeds.
decided_by: client
---

## The situation

A request to a read-only endpoint times out. Nothing was written, nothing was charged, and trying again is free.

## The naive retry

Retry immediately, without asking whether this failure is the kind retrying fixes.

## What it costs

Nothing, this time. That is exactly the problem: the reflex gets rewarded before it has been examined.

## Who decides

`client`. The decision is small enough, and safe enough here, that the calling code just makes it inline.

## In the studio

Students trigger a real timeout against a flaky read endpoint and watch a bare retry succeed, so the reflex they will be asked to distrust all semester is one they have just watched work.
