---
title: A budget beats a per-call count
description: "Why retries compound multiplicatively across a call stack, and what a shared retry budget has to track to stop them."
week: 5
date: 2027-03-22
teachers:
  - marisol-quaye
related:
  - sessions/05-counting-to-twenty-seven
---

A retry budget tracks a ratio, not a count: the fraction of recent calls that were retries, capped at something like ten percent, so retries throttle themselves as the ratio nears the cap instead of every layer independently deciding three is a small number. The three layers in this week's incident weren't wrong on their own terms, which is the same shape as week 4's thundering herd: correct in isolation, compounding in aggregate, and only visible from a vantage point no single layer has.

## Outline

- why retries multiply across layers instead of adding
- retry budgets, and what a shared budget has to track
- the run-up to the break: what to leave in a working state
