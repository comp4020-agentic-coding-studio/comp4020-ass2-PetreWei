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

Let each layer retry the call below it up to three times, since three retries at any one layer seems modest. Twenty-seven requests reach the failing dependency for the one the user made, because the retries compound multiplicatively up the stack rather than adding.

## Outline

- why retries multiply across layers instead of adding
- retry budgets, and what a shared budget has to track
- the run-up to the break: what to leave in a working state
