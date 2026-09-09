---
title: Counting to twenty-seven
description: "Three layers of a call stack each retry independently, and the retries multiply rather than add."
week: 5
date: 2027-03-22
teachers:
  - marisol-quaye
failure_scenario: Three layers of a call stack each retry a failing downstream call three times, independently.
decided_by: platform
---

## The situation

A request passes through three services stacked on top of each other, and the innermost one starts failing intermittently.

## The naive retry

Let each layer retry the call below it up to three times, since three retries at any one layer seems modest.

## What it costs

Twenty-seven requests reach the failing dependency for the one the user made, because the retries compound multiplicatively up the stack rather than adding.

## Who decides

`platform`. A per-layer retry count can only ever see its own three attempts; keeping the total sane needs a shared budget the whole call chain draws from, which is a platform concern rather than something any one layer can enforce alone.

## In the studio

Students trace a three-layer call stack with independent per-layer retries, count the amplification by hand, then replace the per-layer counts with one shared retry budget and confirm the total drops to three.
