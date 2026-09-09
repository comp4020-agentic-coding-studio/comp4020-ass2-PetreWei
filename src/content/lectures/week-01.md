---
title: Retrying is usually right, which is what makes it dangerous
description: "Why the reflex to retry is rewarded so often that nobody thinks to examine it, and what changes from week 2 onward."
week: 1
date: 2027-02-22
teachers:
  - marisol-quaye
slides: /decks/week-01/
related:
  - sessions/01-reproducing-the-reflex
---

A retry is a bet that the world hasn't changed since the request failed, and for a read, that bet is usually good: nothing was written, so trying again costs nothing but time. The reflex generalises past reads because nothing in the interface tells you which bet you're actually making. From week 2, one assumption behind that bet gets removed at a time, first whether the call writes anything, then how long a retry waits, then how many other clients are retrying alongside you, and each removal is what turns the same reflex from correct to expensive.

## Outline

- what this course is for, and why it is shaped as twelve failures rather than twelve topics
- the reflex: why retrying looks like diligence
- the plan for the semester, and what changes in week 2
