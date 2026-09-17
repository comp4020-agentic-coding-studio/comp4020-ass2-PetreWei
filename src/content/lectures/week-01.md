---
title: A retried read is safe for a reason nobody writes down
description: "Why the retry reflex gets learned on requests where it cannot do harm, and what changes as soon as the call writes something."
week: 1
date: 2027-02-22
teachers:
  - marisol-quaye
related:
  - sessions/01-reproducing-the-reflex
image: ./week-01.avif
imageAlt: A boomerang mid-flight, curving back toward the open hand that threw it
---

A retry assumes the request had no effect before it failed. For a `GET` that assumption holds: nothing was written, so the second attempt reads the same row and the caller waits a few hundred milliseconds longer. The assumption is nowhere in the code. `client.get(url)` and `client.post(url, body)` are the same shape at the call site, and neither carries a note about what happens if it runs twice. From week 2 we remove one part of the assumption at a time — whether the call writes, how long the retry waits, how many other clients are retrying alongside you — and the same three lines stop being correct.

## Outline

- what the course covers, and why it is built around twelve specific failures
- why retrying a read works, and what that teaches by accident
- what changes in week 2
