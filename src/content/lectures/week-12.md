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

Every fix this semester traded something for safety: an idempotency key trades storage, backoff trades latency, jitter trades a predictable worst case, a budget trades locality, a breaker trades availability, a deadline trades work that would have succeeded. None of those trades were free and none were really technical decisions — they were product decisions wearing a technical decision's clothes, which is the same disguise week 1's reflex wore. Arguing this case cold is the only way to notice you are making the trade before somebody tells you what it cost.

## Outline

- the case, read cold, with the outcome withheld
- arguing both sides before committing to one
- what the case against retrying is actually asking for
