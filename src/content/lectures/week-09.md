---
title: Nobody is waiting for your third attempt
description: "What a deadline bounds that an attempt count cannot, and why only the caller knows whether an answer is still wanted."
week: 9
date: 2027-05-03
teachers:
  - marisol-quaye
related:
  - sessions/09-retrying-into-an-empty-room
---

A deadline is a different kind of bound to a retry count: the count asks how many times you have tried, the deadline asks whether the answer is still worth having. Propagating one means every layer passes down the time remaining instead of starting its own fresh timeout, which is also the only version of week 5's budget the person waiting can reason about, because seconds are a unit they actually share. Weeks 1 and 2 asked the client whether retrying was safe; this is the same client, asked whether it is still wanted.

## Outline

- what a deadline bounds that an attempt count does not
- propagating the time remaining instead of starting a fresh timeout
- cancelling work that was about to succeed, on purpose
