---
title: The mechanism does not care whether there is code involved
description: "Why some weeks have no client, library or platform to hand the decision to, and what a runbook has in common with a retry library."
week: 9
date: 2027-05-03
teachers:
  - marisol-quaye
related:
  - sessions/09-two-people-one-payout
---

Whoever gets there first just resends the payout, since that is what fixing it has always meant. Two payouts, from two people who each did the reasonable thing alone. There is no code to blame and no retry loop to point at; the failure this week has the same shape as every other week's, with the state living in a spreadsheet instead of a queue.

## Outline

- why this week has no client, library, or platform to hand the decision to
- runbooks as the retry policy for people instead of code
- what a lock looks like when the resource is a spreadsheet
