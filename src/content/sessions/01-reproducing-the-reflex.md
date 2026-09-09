---
title: Reproducing the reflex
description: "Retrying a failed read costs nothing, and that free success is where the semester's bad habit is learned."
week: 1
date: 2027-02-22
teachers:
  - marisol-quaye
failure_scenario: "A read request times out once; a client retries it and the second attempt succeeds."
decided_by: client
---

## The situation

A request to a read-only endpoint times out. Nothing was written, nothing was charged, and trying again is free.

## The reflex

Retry immediately, without asking whether this failure is the kind retrying fixes.

## What it costs

Nothing, this time. That is exactly the problem: the reflex gets rewarded before it has been examined.

## The fix, and what it trades

There is nothing to fix yet, and the honest move is to write down what the bare retry relied on: this call reads, so repeating it cannot change anything. That sentence is the only thing standing between this week and next week's double charge. It trades nothing at all, which is precisely why the reflex survives long enough to become expensive.

## Who decides

`client`. The decision is small enough, and safe enough here, that the calling code just makes it inline.

## In the studio

Students trigger a real timeout against a flaky read endpoint and watch a bare retry succeed, so the reflex they will be asked to distrust all semester is one they have just watched work.
