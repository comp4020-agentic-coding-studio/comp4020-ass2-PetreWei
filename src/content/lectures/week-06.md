---
title: Some failures cannot be retried into success
description: "Why recognising a message as unretriable belongs in the queue library, and why deciding when to stop is a product call."
week: 6
date: 2027-04-12
teachers:
  - idris-fenn
related:
  - sessions/06-feeding-the-poison-queue
---

A dead-letter queue is where a message goes once it's failed enough times that the odds of the next attempt succeeding are indistinguishable from zero, set aside rather than retried, so it stops costing anyone anything while a person decides what to do with it. Telling transient and permanent failure apart is a judgement about the failure, not the message; a malformed payload and a database that's momentarily unreachable can throw the exact same exception, which is why that judgement needs a place to live that isn't guesswork from an error string after the fact.

## Outline

- transient failure versus failure that retrying cannot fix
- dead-letter queues, and why deciding when to stop is a product decision
- welcome back: what changed over the break
