---
title: Your retry loop is the outage now
description: "Why more attempts, sooner, makes recovery slower, and why spacing retries out belongs in a library rather than at each call site."
week: 3
date: 2027-03-08
teachers:
  - marisol-quaye
related:
  - sessions/03-becoming-the-outage
---

Retry in a tight loop with no delay, on the theory that more attempts recover faster. The two-second blip becomes a sustained flood of requests against a service that was already struggling, long enough to turn a blip into an outage the dependency does not recover from.

## Outline

- why more attempts, sooner, makes recovery slower
- exponential backoff, and why fixed backoff is not enough on its own
- what belongs in a library instead of at the call site
