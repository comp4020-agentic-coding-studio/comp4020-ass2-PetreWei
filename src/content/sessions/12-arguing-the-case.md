---
title: Arguing the case
description: "Eleven weeks of costs, one case read cold, and a position you have to defend."
week: 12
date: 2027-05-24
teachers:
  - idris-fenn
failure_scenario: "A described outage where the retries were the cause, read cold by students who must argue for or against having retried at all."
decided_by: product
related:
  - assessments/case-against-retrying
---

## The situation

A failure from earlier in the semester is handed back with the outcome removed: something failed, somebody retried, and the account stops before saying whether that helped.

## The reflex

Assume the retry was the villain, since eleven weeks of this course have mostly been about retries going wrong.

## What it costs

A verdict reached without doing the work. Eleven weeks in, the reflex to distrust retrying can be every bit as unexamined as the reflex to trust it was in week 1.

## The fix, and what it trades

There is no fix to hand you this week: the trade is the assessment. Name what retrying bought, name what it cost in the units the last eleven weeks have used, and say which you would have chosen knowing only what was knowable at the time. It trades the comfort of hedging — you have to commit to a position you can be wrong about, in front of somebody assigned to argue the other side.

## Who decides

`product`. Whether retrying was worth it is finally a call about what the business was willing to trade, latency against correctness, user experience against load, which is a product decision dressed up as a technical one for eleven weeks.

## In the studio

Students take the case, argue for or against having retried, name what they would measure to know if they were right, and defend the argument against a partner assigned to take the opposite side.
