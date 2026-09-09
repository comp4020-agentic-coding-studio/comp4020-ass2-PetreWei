---
title: Finding the point of no return
description: "An operation fails after an email has already gone out and a lock has already been released, and neither can be recalled by trying again."
week: 11
date: 2027-05-17
teachers:
  - marisol-quaye
failure_scenario: A confirmation email has already been sent and a resource lock has already been released by the time a later step in the same request fails.
decided_by: nobody
---

## The situation

A multi-step operation fails partway through, but the failure lands after an email has gone out and a lock has been released, both of which cannot be recalled.

## The naive retry

Retry the whole operation from the start, the way every other failure this semester has been handled.

## What it costs

Everything the naive retry assumes: it repeats the steps that were never a problem and cannot touch the two that already happened, so retrying does not fix the failure and may duplicate the email on top of it.

## Who decides

`nobody`. There is no client, library, platform, operator, or product owner who gets to decide whether this step retries, because by the time anyone could decide, it has already happened, which is why the only real move is to put the irreversible step last.

## In the studio

Students are given a call graph for a multi-step operation and asked to find the one step that cannot be undone, then reorder the operation so that step runs last instead of in the middle.
