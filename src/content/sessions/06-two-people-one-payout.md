---
title: Two people, one payout
description: "The same failure with no code in it: two people, one payout, and a runbook standing in for a lock."
week: 6
date: 2027-04-12
teachers:
  - idris-fenn
failure_scenario: "A failed payout is retried at 3am by two on-call operators working the same incident independently, with no queue or lock between them."
decided_by: operator
image: ./06-two-people-one-payout.avif
imageAlt: Two hands, each dropping an identical coin into the same slot at once
---

## A payout that did not go out

A scheduled payout fails at 3am. Two people are paged for the same alert. Neither knows the other is awake, and both can reach the button that resends it.

## Two people, no code between them

Whoever gets there first resends the payout, because resending it is what fixing this has always meant. The second person arrives four minutes later, sees a failed payout on the dashboard, and does the same.

## The retry no system logged

Two payouts leave the account. There is no retry loop involved, no idempotency key to add, nothing in an exception handler to change. The shape is week 2 exactly — the second actor could not tell whether the work had already been done — except that the state lived on a dashboard and in a group chat rather than in a database.

## Making the handoff explicit

A runbook step naming one person as the only one who presses resend for the duration of the incident, who checks the payout log first and says in the incident channel that they are about to press it.

The limit is that this is a weaker guarantee than any of the code fixes so far. A written step is slower than a button at 3am, and it holds only if a tired person reads it and follows it. There is no enforcement anywhere: it is an agreement between two people, and agreements fail differently from locks.

## Why this one is not a code fix

`operator`. There is no client and no platform in this failure, because there is no code between the failure and the resend. The decision belongs to whoever is holding the pager, which is the argument for writing it down — the parts of a system made of people need the same treatment as the parts made of code, and usually get less.

## In the lab

Run the incident as a role-play: two people, one dashboard, one failed payout, no communication outside the incident channel. Then write the runbook line that would have stopped the second resend, and hand it to a pair who have not seen the scenario to see whether it survives contact with them.
