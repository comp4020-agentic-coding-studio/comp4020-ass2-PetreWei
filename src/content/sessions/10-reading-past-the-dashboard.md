---
title: Reading past the dashboard
description: "Retries can absorb six weeks of decline without a dashboard moving, if nobody measures what they cost."
week: 10
date: 2027-05-10
teachers:
  - idris-fenn
failure_scenario: "Retries quietly absorb a dependency degrading over six weeks, and the dashboard stays green while the retried latency climbs unmeasured."
decided_by: platform
---

## The situation

A dependency has been getting slower for six weeks. Every individual request still succeeds, because retries are catching the failures before a user ever sees one.

## The reflex

Read success rate as the health of the system, since that is the number the dashboard shows and it has not moved.

## What it costs

A dashboard reporting success while the retried p99 latency has climbed to eleven seconds, because the metric that would have shown the decline was never being measured in the first place.

## The fix, and what it trades

Measure the thing retries exist to hide: retry rate and retried latency, reported next to success rate rather than instead of it. It trades two more metrics to maintain and one more way to be paged, and it surfaces a decline nobody has to act on yet — which is how a real signal gets tuned out long before the week it finally matters.

## Who decides

`platform`. No single request can tell you it took three attempts to succeed; that fact only exists in aggregate, which puts it in whoever owns the dashboard's definition, not in the code path that already moved on once it got its answer.

## In the studio

Students are given six weeks of request logs where the success rate never drops, asked to find the actual decline using only the data available, and then asked what single metric would have surfaced it three weeks earlier.
