---
title: Finding the point of no return
description: "Some steps cannot be retried at all, which makes the decision an ordering problem instead."
week: 11
date: 2027-05-17
teachers:
  - marisol-quaye
failure_scenario: "A confirmation email has already been sent and a resource lock has already been released by the time a later step in the same request fails."
decided_by: nobody
image: ./11-finding-the-point-of-no-return.avif
imageAlt: A row of dominoes with the last one already fallen, out of order ahead of the ones still standing
---

## A sequence that got halfway

An order does five things in order: reserve the stock, charge the card, send the confirmation email, release the reservation lock, write the order row. The fifth one fails.

## Replaying it from the top

Retry the whole operation. Eleven weeks have been about making exactly that safe, and this call has all of it — an idempotency key, a schedule with jitter, a shared budget, a classification table.

## The two steps that already happened

Week 2's key covers the charge, so the card is not charged twice. It does not cover the email, because the email has left your system: the second run sends a second confirmation to a customer whose order still does not exist. The lock is already released, so the stock it was protecting may now be reserved by somebody else, and the replay can fail on a step that succeeded the first time. The retry does not fix the original failure and adds one of its own.

## Finding the step you cannot undo

Find the step with an effect outside your system that you cannot recall, and move it after everything that can still fail. Reserve, charge, write the row, then email, and release the lock in a cleanup path that runs either way. A retry then either never reaches the irreversible step or reaches it exactly once.

Where the ordering is not yours — a payment provider that emails the customer itself, a partner API that despatches the parcel on receipt — there is nothing to reorder, and what is left is a compensating action: a second operation that acknowledges the first one happened. A refund is not an un-charge and a correction email is not an un-sent email. The customer sees both.

## Why nobody owns this one

`nobody`. No client, library, platform, operator or product owner gets to decide whether this step is retried, because by the time any of them could decide, the effect has already left. This is the week where the answer arrives before the question, and the only move available is upstream, in the ordering.

## In the lab

Take the call graph for a five-step operation and mark each step reversible or not. Find the point of no return, reorder the sequence so it comes last, then inject a failure after it and confirm the retry is now safe. Finally make one irreversible step belong to a third party, and write the compensating action instead.
