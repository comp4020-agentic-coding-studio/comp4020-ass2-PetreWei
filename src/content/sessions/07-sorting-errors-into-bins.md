---
title: Sorting errors into bins
description: "A 400 and a 429 arrive from the same endpoint in the same afternoon, and a client that treats them the same gets both wrong."
week: 7
date: 2027-04-19
teachers:
  - marisol-quaye
failure_scenario: A client retries a 400 it will never pass and retries a 429 immediately, before the server's requested wait has elapsed.
decided_by: library
---

## The situation

Two different error codes come back from the same endpoint in the same afternoon: a 400, saying the request itself is wrong, and a 429, saying to slow down.

## The naive retry

Treat every non-2xx response the same way and retry it, since a status code is just a number until someone reads it.

## What it costs

The 400 is retried forever for no gain, since the request will fail the same way every time, and the 429 is retried before the requested wait, which is the exact behaviour the server was asking the client to stop.

## Who decides

`library`. Classifying a status code as retryable or not is a judgement worth making once, correctly, for the whole client rather than re-deciding at every call site that happens to see a 4xx.

## In the studio

Students are given a log of mixed error codes and asked to sort them into retryable and not, then wire that classification into a client and confirm the 400 stops being retried while the 429 waits out its `Retry-After`.
