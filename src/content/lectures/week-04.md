---
title: Ten thousand correct clients make one spike
description: "How individually correct backoff still adds up to a synchronised spike, and why jitter has to be mandatory rather than optional."
week: 4
date: 2027-03-15
teachers:
  - idris-fenn
slides: /decks/week-04/
related:
  - sessions/04-synchronising-a-herd
image: ./week-04.avif
imageAlt: A tight cluster of identical alarm clocks, all their hands at the same hour, ringing together
---

Every client in week 3's fleet waits the right amount of time, and every one of them starts waiting at the same moment: the second the dependency stopped answering. So the second attempts arrive together, and the tenth attempts arrive together 51.2 seconds in. Jitter randomises where inside each window a client actually fires, spreading the attempts across the window instead of stacking them on its edge. It has to be drawn again on every attempt — randomise only the first wait and the fleet keeps whatever formation that first draw gave it. No single client can fix this by being more careful, because each one is already correct on its own terms, which is why the randomisation has to be in the shared library rather than a recommendation in its documentation.

## Outline

- how correct individual behaviour still adds up to a synchronised spike
- jitter, and why it has to be mandatory rather than optional
- the retry audit, due this Friday
