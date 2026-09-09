---
title: Everyone retrying at once is one client, badly disguised
description: "How individually correct backoff still adds up to a synchronised spike, and why jitter has to be mandatory rather than optional."
week: 4
date: 2027-03-15
teachers:
  - idris-fenn
related:
  - sessions/04-synchronising-a-herd
---

Jitter breaks the synchrony by randomising when, inside its own window, each client actually fires, so instead of ten thousand clients hitting the same second, they spread across the whole window and the dependency sees a manageable trickle. It has to be randomised on every attempt, not just the first, or clients that started backing off together stay together. Week 3 was one client learning to wait; this week is what happens when ten thousand clients learn the same lesson at the same moment.

## Outline

- how correct individual behaviour still adds up to a synchronised spike
- jitter, and why it has to be mandatory rather than optional
- the retry audit, due this Friday
