---
title: Charging twice on purpose
description: "The reflex from week 1, aimed at a write instead of a read, produces the semester's sharpest failure: one charge becomes two."
week: 2
date: 2027-03-01
teachers:
  - idris-fenn
failure_scenario: A payment write times out after the charge has already been committed server-side, and the client retries it.
decided_by: client
---

## The situation

A write request, the kind that moves money, times out. Unlike week 1, the server may already have done the work; the client just never heard back.

## The naive retry

Apply week 1's reflex unchanged: the timeout looks the same from the outside, so retry.

## What it costs

A second charge. The client cannot tell a lost response from a lost request, so the same retry that was free last week is expensive this week.

## Who decides

`client`, again, which is the point of putting this week straight after week 1. Nothing about the interface warned the client the decision had become dangerous.

## In the studio

Students build the naive retry against a payment stub that silently commits before replying, produce a double charge on purpose, then fix it with an idempotency key and confirm the same retry now costs nothing.
