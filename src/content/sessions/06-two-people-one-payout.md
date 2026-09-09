---
title: Two people, one payout
description: "The same failure with no code in it: two people, one payout, and a runbook standing in for a lock."
week: 6
date: 2027-04-12
teachers:
  - idris-fenn
failure_scenario: "A failed payout is retried at 3am by two on-call operators working the same incident independently, with no queue or lock between them."
decided_by: operator
---

## The situation

A payout fails at 3am. Two people are paged for the same incident, neither aware the other is awake, and both have access to the button that resends it.

## The reflex

Whoever gets there first just resends the payout, since that is what fixing it has always meant.

## What it costs

Two payouts, from two people who each did the reasonable thing alone. There is no code to blame and no retry loop to point at; the failure has the same shape as every earlier week's, with the state living in a spreadsheet instead of a queue.

## The fix, and what it trades

A runbook line that makes the resend one person's job for the duration of the incident, checked against the payout log and announced in the incident channel before the button is pressed. It trades speed for a guarantee weaker than any of the code fixes so far: a written step is slower than a button at 3am, and it only works if the person holding the pager has read it and follows it while tired.

## Who decides

`operator`. There is no client or platform to make this decision, because there is no code between the failure and the fix; the judgement sits with whoever is holding the pager, which is exactly why it needs a runbook as much as any library does.

## In the studio

Students are given the incident as a role-play, two people, one spreadsheet, one payout, and asked to write the runbook line that would have stopped the second resend before it happened.
