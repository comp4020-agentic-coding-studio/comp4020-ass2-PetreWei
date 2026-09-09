---
title: Finding the point of no return
description: "Some steps cannot be retried at all, which makes the decision an ordering problem instead."
week: 11
date: 2027-05-17
teachers:
  - marisol-quaye
failure_scenario: "A confirmation email has already been sent and a resource lock has already been released by the time a later step in the same request fails."
decided_by: nobody
---

## The situation

A multi-step operation fails partway through, but the failure lands after an email has gone out and a lock has been released, both of which cannot be recalled.

## The reflex

Retry the whole operation from the start, the way every other failure this semester has been handled.

## What it costs

The retry repeats the steps that were never a problem and cannot touch the two that already happened, so it does not fix the failure and may send the email a second time on top of it.

## The fix, and what it trades

Reorder the operation so the irreversible step runs last, after everything that can still fail safely, and a retry either never reaches it or reaches it exactly once. It trades the assumption that the ordering is yours to choose: when a third party sends the email, the only move left is a compensating action that admits the thing happened rather than pretending it can be undone.

## Who decides

`nobody`. There is no client, library, platform, operator or product owner who gets to decide whether this step retries, because by the time anyone could decide, it has already happened — which is why the only real move is upstream, in the ordering.

## In the studio

Students are given a call graph for a multi-step operation and asked to find the one step that cannot be undone, then reorder the operation so that step runs last instead of in the middle.
