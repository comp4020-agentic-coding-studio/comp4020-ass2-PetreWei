---
title: Some failures cannot be retried into success
description: "How a status code and a poison message are the same problem, and where the judgement that separates them has to live."
week: 7
date: 2027-04-19
teachers:
  - marisol-quaye
related:
  - sessions/07-telling-a-no-from-a-not-yet
---

A dead-letter queue and a status-code table are the same idea in two containers: somewhere to put a failure once the odds of the next attempt succeeding are indistinguishable from zero. The hard part is never the container, it's the telling — a malformed payload and a momentarily unreachable database can throw the identical exception, whereas HTTP has already done the classification for you if the client reads the code instead of treating every non-2xx response as one undifferentiated failure. A 400 is a no. A 429 is a not yet, and it usually names how long for.

## Outline

- transient failure, permanent failure, and the failures that look like both
- reading `Retry-After` instead of guessing
- dead-letter queues, and who is supposed to read them
