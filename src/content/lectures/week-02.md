---
title: A retry that isn't idempotent is a bug wearing a feature's clothes
description: "Why a timeout can't tell a client whether the write already happened, and what an idempotency key actually guarantees."
week: 2
date: 2027-03-01
teachers:
  - idris-fenn
related:
  - sessions/02-charging-twice-on-purpose
---

Apply week 1's reflex unchanged: the timeout looks the same from the outside, so retry. A second charge. The client cannot tell a lost response from a lost request, so the same retry that was free last week is expensive this week.

## Outline

- why a timeout does not tell you whether the write happened
- idempotency keys, and what they actually guarantee
- the first review: bring the double charge and the fix
