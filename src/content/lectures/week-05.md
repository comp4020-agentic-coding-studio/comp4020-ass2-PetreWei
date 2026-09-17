---
title: A budget beats a per-call count
description: "Why retries compound multiplicatively across a call stack, and what a shared retry budget has to track to stop them."
week: 5
date: 2027-03-22
teachers:
  - marisol-quaye
slides: /decks/week-05/
related:
  - sessions/05-counting-to-twenty-seven
image: ./week-05.avif
imageAlt: A pressure gauge with its needle pinned into a red zone near the top of the dial
---

Three attempts at each of three layers is twenty-seven attempts at the bottom, because each layer multiplies the layer beneath it rather than adding to it. No layer is misconfigured: three is a defensible number, and each layer can only see its own. A retry budget replaces the count with a ratio — the fraction of recent calls that are retries, capped at something like ten percent — held in one place that the whole call stack reads, so retries throttle themselves as the ratio approaches the cap. The shape is week 4's again: behaviour that is correct in isolation and wrong in aggregate, visible only from a vantage point no single layer has.

## Outline

- why retries multiply across layers instead of adding
- retry budgets, and what a shared budget has to track
- the run-up to the break: what to leave in a working state
