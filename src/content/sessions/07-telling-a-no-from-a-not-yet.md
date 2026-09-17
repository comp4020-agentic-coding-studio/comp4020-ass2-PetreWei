---
title: Telling a no from a not yet
description: "A 400 and a malformed message look exactly like a timeout at the moment they fail. Classifying failures before retrying them, and what goes wrong when the classification is wrong."
week: 7
date: 2027-04-19
teachers:
  - marisol-quaye
failure_scenario: "A queue consumer retries a malformed message forever and a client retries a 400 it will never pass, because neither can tell a permanent failure from a transient one."
decided_by: library
image: ./07-telling-a-no-from-a-not-yet.avif
imageAlt: An envelope caught between two mail slots side by side, one bricked shut, the other open
---

## Two errors, one retry loop

Two failures that will never succeed however often they are repeated: a malformed message a queue consumer cannot parse, and a `400` saying the request itself is wrong. At the instant they fail, both look like the transient faults every earlier week retried successfully.

## Retrying everything that failed

The retry wrapper does not read the failure. An exception is an exception and a status code is an integer, so both go round again.

## Retrying a 400 forever

The malformed message goes back onto the queue, blocks the messages behind it, and occupies the consumer for as long as anyone lets it. The `400` draws down week 5's shared budget and will never succeed. Meanwhile a `429` in the same batch — the one response explicitly asking the client to slow down — gets retried immediately, which is the opposite of what it asked for.

## Classifying before retrying

Read the failure before deciding. A status code already carries the classification: `5xx` and `429` are worth retrying, `400`, `403` and `422` are not, and a `429`'s `Retry-After` should override whatever schedule the client had planned. A message that has failed a bounded number of times goes to a dead-letter queue rather than back onto the main one.

Two limits. You are now depending on somebody else's server using status codes correctly, and a dependency that answers `400` for a transient fault will fail permanently on the first attempt. And a dead-letter queue only fixes something if a person reads it; unread, it is the same poison message with better filing.

## Why the client library decides

`library`. A consumer sees one message and a call site sees one response, so neither has the memory to notice it is looping. The library is where the attempt count and the classification table both live long enough to be right, and it is the only place where correcting the table corrects every caller at once.

## In the lab

Sort a log of mixed failures — malformed payloads, `400`s, `429`s, timeouts — into retryable and not. Wire the classification into both a consumer and a client, then confirm the poison message reaches the dead-letter queue and the `429` waits out its `Retry-After`.
