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

Retry it the same way every other failed message is retried, since the consumer has no way to tell the two kinds of failure apart at the point of retrying. A poison message retried forever blocks the queue behind it, or burns the consumer's time indefinitely, for a failure no number of attempts will fix.

## Outline

- transient failure versus failure that retrying cannot fix
- dead-letter queues, and why deciding when to stop is a product decision
- welcome back: what changed over the break
