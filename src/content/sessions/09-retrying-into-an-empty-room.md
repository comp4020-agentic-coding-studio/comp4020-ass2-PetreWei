---
title: Retrying into an empty room
description: "The work finishes; the person who asked closed the tab ninety seconds ago."
week: 9
date: 2027-05-03
teachers:
  - marisol-quaye
failure_scenario: "A request is retried for ninety seconds against a caller that gave up after three, and the successful attempt returns to a connection that has already closed."
decided_by: client
image: ./09-retrying-into-an-empty-room.avif
imageAlt: A telephone ringing on a desk in an empty room, its chair pushed back and empty
---

## The caller stopped waiting

A user taps a button, waits three seconds, sees nothing happen and closes the tab. The request they made is still being retried.

## The retry goes ahead anyway

The retry policy counts attempts. Nothing in it asks whether anybody is still waiting, and nothing in the call stack has been told the connection is gone.

## Ninety seconds of work with nowhere to go

A thirty-second timeout with two retries is ninety seconds. For all of it a worker thread, a connection slot and a row lock are held, to produce an answer that gets written to a closed socket. The abandoned attempts also queue ahead of new requests that somebody is waiting for, and they hold their resources longer than a live request does — so under load the share of the machine doing work for nobody grows rather than settling.

## Carrying a deadline through the call

Put an absolute deadline on the request — a timestamp, not a duration — and propagate it. Check the time remaining before each attempt and before each inner call, so a call entered with 300 ms left gets 300 ms instead of helping itself to a fresh thirty seconds. gRPC and Go's `context.Context` carry one by default; most HTTP clients do not.

Two limits. Work gets cancelled that was about to succeed: a dependency that is slow but healthy now has requests pulled out from under it, and a deadline set 200 ms too tight fails requests the user would happily have waited for. And you are trusting every layer to propagate it — one layer that starts a fresh timeout restores the old behaviour for everything beneath it, silently.

## Why the caller sets it

`client`. Weeks 1 and 2 asked the client whether a retry was safe; this week asks the same client whether it is still wanted. Only the caller knows how long the person on the other end will wait. A library sees attempt counts and the platform sees load, and neither can see a closed tab.

## In the lab

Instrument a request path so every attempt logs the time left on the caller's deadline, and watch attempts continue past zero. Add deadline propagation, rerun, and count the attempts. Then set the deadline 200 ms too tight and count the requests it kills that would have succeeded.
