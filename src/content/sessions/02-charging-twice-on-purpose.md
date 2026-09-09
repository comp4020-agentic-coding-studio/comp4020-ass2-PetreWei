---
title: Charging twice on purpose
description: "The same retry, aimed at a write: one charge becomes two, and the client cannot tell whether it already worked."
week: 2
date: 2027-03-01
teachers:
  - idris-fenn
failure_scenario: "A payment write times out after the charge has already been committed server-side, and the client retries it."
decided_by: client
---

## The situation

A write request, the kind that moves money, times out. Unlike week 1, the server may already have done the work; the client just never heard back.

## The reflex

Apply week 1's reflex unchanged: the timeout looks the same from the outside, so retry.

## What it costs

A second charge. The client cannot tell a lost response from a lost request, so the same retry that was free last week is expensive this week.

## The fix, and what it trades

Send an idempotency key with the write and have the server check it before it commits, so a repeated request lands on the same charge instead of a new one. It trades storage and a decision nobody enjoys making: the server now has to remember every key for as long as a client might plausibly retry, and getting that window wrong turns the safety mechanism into either a slow leak or a false duplicate.

## Who decides

`client`, again, which is the point of putting this week straight after week 1. Nothing about the interface warned the client the decision had become dangerous.

## In the studio

Students build the naive retry against a payment stub that silently commits before replying, produce a double charge on purpose, then fix it with an idempotency key and confirm the same retry now costs nothing.
