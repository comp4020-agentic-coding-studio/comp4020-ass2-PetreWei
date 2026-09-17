---
title: Nobody is waiting for your third attempt
description: "What a deadline bounds that an attempt count cannot, and why only the caller knows whether an answer is still wanted."
week: 9
date: 2027-05-03
teachers:
  - marisol-quaye
slides: /decks/week-09/
related:
  - sessions/09-retrying-into-an-empty-room
image: ./week-09.avif
imageAlt: A telephone ringing on a desk in an empty room, its chair pushed back and empty
---

An attempt count bounds how many times you try. A deadline bounds when you stop, and only one of the two has anything to do with the person waiting. Propagating a deadline means passing down the absolute time it expires rather than a fresh duration, so a call entered with 300 ms left runs for 300 ms instead of starting another thirty-second clock. gRPC and Go's `context.Context` do this by default; most HTTP clients do not. The deliberate consequence is cancelling work that was about to finish: a deadline set too tight kills requests the user would have waited for, and there is no version of the bound that avoids that.

## Outline

- what a deadline bounds that an attempt count does not
- propagating the time remaining instead of starting a fresh timeout
- cancelling work that was about to succeed, on purpose
