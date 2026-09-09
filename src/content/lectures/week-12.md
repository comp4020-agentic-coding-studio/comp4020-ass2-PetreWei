---
title: Retrying is a decision, not a default
description: "Why whether to retry is finally a product decision about what a business is willing to trade, dressed up as a technical one all semester."
week: 12
date: 2027-05-24
teachers:
  - idris-fenn
related:
  - sessions/12-arguing-the-case
---

Every fix this semester traded something for safety: an idempotency key trades storage, backoff trades latency, a circuit breaker trades availability for correctness while it's open, a retry budget trades throughput. None of those trades were free, and none were really technical decisions, they were product decisions wearing a technical decision's clothes, the same disguise week 1's reflex wore. Arguing this case cold is the only way to notice you're making that trade before someone tells you what it cost.

## Outline

- the case, read cold, with the outcome withheld
- arguing both sides before committing to one
- what the case against retrying assessment is actually asking for
