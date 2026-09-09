---
title: Not every error deserves the same response
description: "Why classifying a status code as retryable or not is a judgement worth making once, in the library, for the whole client."
week: 7
date: 2027-04-19
teachers:
  - marisol-quaye
related:
  - sessions/07-sorting-errors-into-bins
---

Treat every non-2xx response the same way and retry it, since a status code is just a number until someone reads it. The 400 is retried forever for no gain, since the request will fail the same way every time, and the 429 is retried before the requested wait, which is the exact behaviour the server was asking the client to stop.

## Outline

- a taxonomy of failure: which errors are worth a second attempt
- reading `Retry-After` instead of guessing
- the retry policy assessment, due next week
