---
title: Counting to twenty-seven
description: "Twenty-seven attempts for one request, and why no single layer can see it happening."
week: 5
date: 2027-03-22
teachers:
  - marisol-quaye
failure_scenario: "Three layers of a call stack each retry a failing downstream call three times, independently."
decided_by: platform
---

## The situation

A request passes through three services stacked on top of each other, and the innermost one starts failing intermittently.

## The reflex

Let each layer retry the call below it up to three times, since three retries at any one layer seems modest.

## What it costs

Twenty-seven requests reach the failing dependency for the one the user made, because the retries compound multiplicatively up the stack rather than adding.

## The fix, and what it trades

One retry budget shared by the whole call chain, held as a fraction of recent calls rather than a count per layer, so retries throttle themselves as the ratio approaches the cap. It trades locality for a sane total: a layer that would have recovered on its second attempt is sometimes refused it because another layer spent the budget first, and the reason a call was not retried now lives somewhere the person debugging it is not looking.

## Who decides

`platform`. A per-layer retry count can only ever see its own three attempts; keeping the total sane needs a shared budget the whole call chain draws from, which is a platform concern rather than something any one layer can enforce alone.

## In the studio

Students trace a three-layer call stack with independent per-layer retries, count the amplification by hand, then replace the per-layer counts with one shared retry budget and confirm the total drops to three.
