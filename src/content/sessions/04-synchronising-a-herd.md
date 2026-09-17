---
title: Synchronising a herd
description: "Ten thousand clients, each correct alone, that fall over the dependency together the moment it recovers."
week: 4
date: 2027-03-15
teachers:
  - idris-fenn
failure_scenario: "Ten thousand clients, each backing off correctly on its own, all retry on the same second."
decided_by: platform
related:
  - assessments/retry-audit
image: ./04-synchronising-a-herd.avif
imageAlt: A tight cluster of identical alarm clocks, all their hands at the same hour, ringing together
---

## Ten thousand clients, one recovery

A dependency comes back after a four-minute outage. Ten thousand clients failed during it, and all of them are about to retry.

## Everyone waits correctly

Every client does what week 3 asked: exponential backoff, doubling from 100 ms. Reviewed one at a time, in ten thousand separate pull requests, each client is correct.

## Why they all return on the same second

They failed at the same instant — when the dependency went down — and they are running the same schedule from that instant. The tenth wait is 51.2 seconds for every one of them, so the tenth attempt lands in the same second for every one of them. Deterministic backoff preserves that alignment rather than breaking it, and the dependency that just came back goes down again under a synchronised spike.

## Randomising inside the window

Draw each wait uniformly at random from inside the backoff window instead of taking the window's edge, and redraw on every attempt rather than only the first. The ten thousand attempts then spread across the window instead of stacking on its boundary.

The limit is that a client can no longer state its own worst-case wait, only the distribution the wait is drawn from. That is a genuine loss for whoever has to write the latency SLO, and it is the main reason jitter is the line missing from otherwise careful retry code.

## Why no single client can fix it

`platform`. One client cannot see the other 9,999, and adding jitter to your client alone changes nothing measurable — it moves your request around inside a spike that is still a spike. The fix only works if every client does it, which makes it a rule the platform enforces rather than a courtesy any one team can volunteer.

## In the lab

Run a simulated recovery with ten clients on identical deterministic backoff and watch the attempts land in the same bucket. Add jitter to each client independently, rerun, and plot the arrival histogram both times.
