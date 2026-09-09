---
title: Feeding the poison queue
description: "A malformed message cannot be fixed by trying again, and a consumer that does not know that will try forever."
week: 6
date: 2027-04-12
teachers:
  - idris-fenn
failure_scenario: A malformed message is retried by a queue consumer forever, because it will never process successfully no matter how many times it is tried.
decided_by: library
---

## The situation

A message reaches a queue that cannot be processed, not because of a transient fault, but because the message itself is wrong.

## The naive retry

Retry it the same way every other failed message is retried, since the consumer has no way to tell the two kinds of failure apart at the point of retrying.

## What it costs

A poison message retried forever blocks the queue behind it, or burns the consumer's time indefinitely, for a failure no number of attempts will fix.

## Who decides

`library`. Recognising a message as unretriable and routing it to a dead-letter queue instead is exactly the kind of judgement worth encoding once, in the retry library, rather than re-deciding at every consumer.

## In the studio

Students feed a malformed message into a naive consumer and watch it loop forever, then add a dead-letter queue and a retry ceiling and watch the same message get set aside after a bounded number of attempts.
