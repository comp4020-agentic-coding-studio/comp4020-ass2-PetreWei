---
title: Charging twice on purpose
description: "The same retry, aimed at a write: one charge becomes two, and the client cannot tell whether it already worked."
week: 2
date: 2027-03-01
teachers:
  - idris-fenn
failure_scenario: "A payment write times out after the charge has already been committed server-side, and the client retries it."
decided_by: client
image: ./02-charging-twice-on-purpose.avif
imageAlt: A rubber stamp striking the same receipt twice, the second impression landing just off the first
---

## Two timeouts that look identical

A `POST /payments` times out after thirty seconds. Two things could have happened. The request never arrived, or it arrived, the charge committed, and the response was lost coming back.

## The retry that charges again

Week 1's three lines, unchanged. The timeout looks the same from the client, so the client does the same thing and sends the request again. If the charge already committed, the customer has now been debited twice for one order.

## Why you cannot tell them apart

A timeout has no field that distinguishes the two cases. What the client observed was the absence of a response, and absence has one shape. Reading the error more carefully will not help: the fact you need is on the far side of a connection that just dropped.

## Making the second attempt a no-op

Have the client generate an idempotency key and send it with the write. The server stores the key in the same transaction that commits the charge, and a request carrying a key it has seen before returns the original result instead of charging again. The retry stops meaning "do this" and starts meaning "did you already do this?".

The limit worth knowing is the retention window. The server has to keep each key for at least as long as something might still retry that request — seconds for an inline loop, days if a dead-letter queue can replay it next Monday. Too short and a late retry reads as a new order. Too long and the key table grows for the rest of time.

## Where the key has to live

`client`, again, which is why this week sits directly after week 1. Only the caller knows that attempt 2 is a repeat of attempt 1, so only the caller can generate the key; the server is what enforces it. Nothing in the shape of the API warned the client that the call it was retrying had changed category.

## In the lab

Aim last week's retry at a payment stub that commits before it replies, and produce a double charge on purpose. Then add an idempotency key and run the identical retry, confirming the second attempt comes back with the first charge's ID.
