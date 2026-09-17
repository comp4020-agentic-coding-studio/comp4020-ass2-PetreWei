---
title: Some steps only happen once, by design
description: "Why an irreversible step has no retry decision to make, and why the fix is ordering it to run last instead."
week: 11
date: 2027-05-17
teachers:
  - marisol-quaye
slides: /decks/week-11/
related:
  - sessions/11-finding-the-point-of-no-return
image: ./week-11.avif
imageAlt: A row of dominoes with the last one already fallen, out of order ahead of the ones still standing
---

An irreversible step fails like any other step. What is different is that you cannot take it back once it has run, so the question stops being how to retry it and becomes when to run it. Put every step that can still fail first, and the send-the-email and release-the-lock steps last: a retry of the whole operation then either never reaches them, or reaches them once, on the attempt that succeeds. Where the ordering belongs to somebody else — a payment provider that emails the customer itself — there is nothing to reorder, and what is left is a compensating action: a refund, a correction email, a second effect that acknowledges the first. This is the one week where none of client, library, platform, operator or product makes the retry decision, because the ordering already made it, upstream of the failure.

## Outline

- why some steps have no retry decision to make
- ordering an operation so the irreversible step comes last
- compensating actions, for when the ordering is not yours
