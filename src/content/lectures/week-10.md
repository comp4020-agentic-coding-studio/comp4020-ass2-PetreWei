---
title: A green dashboard hides a slow decline
description: "Why success rate stays flat while a dependency degrades for six weeks, and what has to be reported beside it."
week: 10
date: 2027-05-10
teachers:
  - idris-fenn
slides: /decks/week-10/
related:
  - sessions/10-reading-past-the-dashboard
image: ./week-10.avif
imageAlt: A house of cards standing perfectly still on a table that is visibly tilting to one side beneath it
---

Success rate answers one question: did the request eventually get a good response. A request that succeeded on its third attempt is a success by that definition, having done three times the work and waited out two backoff intervals to get there. So a dependency can degrade from one failure in a thousand to one in twenty over six weeks without the dashboard moving, while p99 latency goes from 120 ms to eleven seconds. The number that does move is attempts per request. Report it beside success rate rather than in place of it, and alert on a change in it rather than a fixed threshold, because the ratio has no correct value — only a history of its own to be compared against.

## Outline

- why success rate alone stays flat through a six-week decline
- counting attempts, not just the eventual outcome
- alerting on a change in a ratio instead of a threshold
