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

Trust that each client's own backoff is enough, because each one is behaving well in isolation. Ten thousand well-behaved clients retrying on the same second is a thundering herd: the recovering dependency is hit by a synchronised spike and falls over again, and no single client did anything wrong.

## Outline

- how correct individual behaviour still adds up to a synchronised spike
- jitter, and why it has to be mandatory rather than optional
- the retry audit, due this Friday
