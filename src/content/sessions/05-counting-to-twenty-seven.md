---
title: Counting to twenty-seven
description: "Twenty-seven attempts for one request, and why no single layer can see it happening."
week: 5
date: 2027-03-22
teachers:
  - marisol-quaye
failure_scenario: "Three layers of a call stack each retry a failing downstream call three times, independently."
decided_by: platform
image: ./05-counting-to-twenty-seven.avif
imageAlt: A pressure gauge with its needle pinned into a red zone near the top of the dial
---

## One user request, three layers

A user hits an endpoint. That service calls a second, which calls a third, and the third starts failing on about one request in three.

## Every layer retries on its own

Each layer retries three times. Three is a modest number. Every team picked it independently, in three separate pull requests, and every one of them was being careful.

## Why three retries become twenty-seven

Retries compose multiplicatively, not additively. The innermost call gets three attempts. The middle layer retries that whole sequence three times, which is nine. The outer layer retries that, which is twenty-seven. Twenty-seven requests reach a struggling dependency for one thing the user asked for, and no layer's own logs show a number larger than three.

## A budget the whole call shares

Give the call chain a single retry budget, expressed as a ratio — retries as a fraction of recent requests, ten percent or so — rather than a count per layer. Attach it to the request and decrement it as the request travels, so retries throttle themselves as the ratio approaches the cap.

Two limits. Locality goes: a layer that would have recovered on its second attempt is sometimes refused that attempt, because a layer above it drew the budget down first. And the reason a call was not retried now lives in a request header rather than in the code the person debugging it is reading.

## Why the platform enforces it

`platform`. A per-layer count can only ever see its own three attempts, so no layer can detect the amplification from where it sits. A shared budget needs every layer to agree on one mechanism and to propagate it, and that agreement is infrastructure rather than a choice any single service can make.

## In the lab

Trace a three-layer call stack with independent per-layer retries and count the attempts arriving at the bottom by hand. Replace the per-layer counts with one shared budget, rerun, and confirm the count at the bottom is three.
