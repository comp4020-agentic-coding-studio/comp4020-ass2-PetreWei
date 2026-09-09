---
title: A retry that isn't idempotent is a bug wearing a feature's clothes
description: "Why a timeout can't tell a client whether the write already happened, and what an idempotency key actually guarantees."
week: 2
date: 2027-03-01
teachers:
  - idris-fenn
slides: /decks/week-02/
related:
  - sessions/02-charging-twice-on-purpose
---

An idempotency key doesn't stop the timeout, it stops the timeout from mattering: the server checks the key before it commits the write, so a repeated request lands on the same charge instead of a new one. That's a property the client has to ask for, not one it can assume, which is the sense in which the bug here isn't the retry, it's retrying without knowing the answer.

## Outline

- why a timeout does not tell you whether the write happened
- idempotency keys, and what they actually guarantee
- the first review: bring the double charge and the fix
