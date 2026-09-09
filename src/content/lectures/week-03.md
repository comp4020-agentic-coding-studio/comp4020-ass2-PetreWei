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

Exponential backoff doesn't make an attempt more likely to succeed, it makes the moment of the attempt less likely to land inside the storm: each wait roughly doubles, so a degrading dependency gets a rapidly thinning trickle of requests instead of a flood that never lets up. A fixed one-second delay doesn't have this property, it just delays the flood rather than shrinking it. The other ingredient, jitter, is next week's problem: a whole fleet of clients backing off on the same clock just synchronises the flood instead of preventing it.

## Outline

- why more attempts, sooner, makes recovery slower
- exponential backoff, and why fixed backoff is not enough on its own
- what belongs in a library instead of at the call site
