---
title: The mechanism does not care whether there is code involved
description: "Why some weeks have no client, library or platform to hand the decision to, and what a runbook has in common with a retry library."
week: 6
date: 2027-04-12
teachers:
  - idris-fenn
related:
  - sessions/06-two-people-one-payout
---

Every fix so far this semester has lived in a client, a library or a platform, because there was code between the failure and the retry. Take the code away and the same failure modes are still possible, no idempotency check, no backoff, no shared state between the two people acting, they just need a runbook line, a wait-and-check step, and a shared incident channel instead of a shared variable. A runbook is a retry policy a human executes instead of a process, which is why it can be wrong in exactly the same ways.

## Outline

- welcome back: why the course restarts on a week with no code in it
- runbooks as the retry policy for people instead of code
- what a lock looks like when the resource is a spreadsheet
