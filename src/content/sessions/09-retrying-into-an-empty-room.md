---
title: Retrying into an empty room
description: "The work finishes; the person who asked closed the tab ninety seconds ago."
week: 9
date: 2027-05-03
teachers:
  - marisol-quaye
failure_scenario: "A request is retried for ninety seconds against a caller that gave up after three, and the successful attempt returns to a connection that has already closed."
decided_by: client
---

## The situation

A user taps a button, waits three seconds, sees nothing happen and closes the tab. The request they made is still being retried.

## The reflex

Keep retrying until the call succeeds, because the retry policy is written in terms of attempts and not in terms of whether anybody is still waiting.

## What it costs

Ninety seconds of a worker, a connection slot and a row lock spent finishing work whose answer has nowhere to go — and the abandoned retries queue ahead of newer requests that somebody is still waiting for.

## The fix, and what it trades

Pass a deadline down with the request and check the time remaining before each attempt, so an inner call inherits three hundred milliseconds rather than helping itself to a fresh thirty seconds. It trades work that would have succeeded: a slow-but-healthy dependency now gets requests cancelled out from under it, on purpose, because finishing late and not finishing at all are worth the same to a caller who has gone.

## Who decides

`client`. Weeks 1 and 2 asked the client whether a retry was safe; this week asks the same client whether it is still wanted, and it is the only party who can tell — a library sees attempts and a platform sees load, and neither can see the person who closed the tab.

## In the studio

Students instrument a request path so every attempt logs the time left on the caller's deadline, watch attempts continue long past zero, then add deadline propagation and confirm the loop stops on the clock rather than on the attempt count.
