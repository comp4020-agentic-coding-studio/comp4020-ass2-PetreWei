---
title: Telling a no from a not yet
description: "Telling a failure that might pass from one that never will, and paying for guessing wrong in either direction."
week: 7
date: 2027-04-19
teachers:
  - marisol-quaye
failure_scenario: "A queue consumer retries a malformed message forever and a client retries a 400 it will never pass, because neither can tell a permanent failure from a transient one."
decided_by: library
---

## The situation

Two failures that will never succeed: a malformed message a queue consumer cannot process, and a 400 saying the request itself is wrong. At the moment of failing, both look exactly like the transient faults every earlier week retried successfully.

## The reflex

Retry both the way everything else has been retried, since an exception and a status code are just values until somebody reads them.

## What it costs

The poison message blocks the queue behind it or burns the consumer indefinitely, and the 400 spends a retry budget for no gain. A 429 in the same batch gets retried immediately, which is the precise behaviour the server sent a 429 to ask the client to stop.

## The fix, and what it trades

Read the failure before retrying it: a status code already says which bucket it is in, and a message that has failed a bounded number of times goes to a dead-letter queue instead of back onto the queue. It trades certainty for a guess about somebody else's server — a dependency that returns 400 for a transient fault will now fail permanently on the first attempt — and a dead-letter queue is only a fix if a person actually reads it.

## Who decides

`library`. A consumer sees one message and a call site sees one response, so neither can notice it is looping; the library is where the attempt count and the classification table both live long enough to be right.

## In the studio

Students sort a log of mixed failures — malformed payloads, 400s, 429s, timeouts — into retryable and not, wire the classification into both a consumer and a client, then confirm the poison message reaches the dead-letter queue and the 429 waits out its `Retry-After`.
