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

A 400 says the request is malformed, which no number of attempts will fix; a 429 says slow down, and usually names exactly how long for in a `Retry-After` header. Sorting an error into retryable or not is where week 6's transient-versus-permanent distinction gets a concrete shape: a status code, unlike a raw exception, already tells you which bucket it's in, if the client bothers to read it instead of treating every non-2xx response as the same undifferentiated failure.

## Outline

- a taxonomy of failure: which errors are worth a second attempt
- reading `Retry-After` instead of guessing
- the retry policy assessment, due next week
