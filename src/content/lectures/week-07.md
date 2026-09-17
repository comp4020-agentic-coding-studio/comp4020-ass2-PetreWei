---
title: Not every failure can be retried away
description: "How a status code and a poison message are the same problem, and where the judgement that separates them has to live."
week: 7
date: 2027-04-19
teachers:
  - marisol-quaye
slides: /decks/week-07/
related:
  - sessions/07-telling-a-no-from-a-not-yet
image: ./week-07.avif
imageAlt: An envelope caught between two mail slots side by side, one bricked shut, the other open
---

A malformed payload and a momentarily unreachable database can raise the identical exception, and a loop that catches `Exception` and retries treats them identically: the malformed payload is retried to the attempt limit every time it arrives, forever. HTTP has already done the classification — a 400 means the request is wrong and will be wrong on the next attempt, a 429 means try later and usually says how much later in `Retry-After` — but only for a client that reads the status code instead of treating every non-2xx response as one undifferentiated failure. Where there is no status code, the equivalent is a dead-letter queue: somewhere to put a message once further attempts are pointless, which does nothing at all unless somebody reads the queue.

## Outline

- transient failure, permanent failure, and the failures that look like both
- reading `Retry-After` instead of guessing
- dead-letter queues, and who is supposed to read them
