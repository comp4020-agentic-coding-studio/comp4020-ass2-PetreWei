---
title: Retry audit
description: "Find every retry in a real codebase and diagnose each one against the four weeks that got you here: safe to repeat, backed off, jittered, and survivable when ten thousand clients recover at once."
week: 4
due: 2027-03-19T12:00:00+10:00
weight: 25
marking:
  mode: weighted
  criteria:
    - name: Coverage of retry sites
      weight: 30
    - name: Correctness of each diagnosis
      weight: 40
    - name: Clarity of the proposed fix
      weight: 30
spec:
  - every retry site the codebase actually contains is found, not a sample of the obvious ones
  - each site is diagnosed against the specific failure modes named in weeks 1 to 4, not a generic checklist
  - a fix is proposed for each site that fails a check, and the fix is one this course has actually covered
  - each proposed fix names its own limit — the latency, the storage, or the predictability it takes away from somebody
  - submitted by the deadline, as a single document with one entry per retry site
related:
  - sessions/04-synchronising-a-herd
image: ./retry-audit.avif
imageAlt: A magnifying glass held over a tangled knot of cord
---

## The brief

> Pick a codebase with retry logic in it and find out whether it survives its own week 4.

You have four weeks of failure modes to check against: does a retry site distinguish a read from a write, does it back off, does it jitter, and would it survive being one of ten thousand identical clients recovering at once. Most retry logic was written before anyone asked these questions, which is what makes it worth auditing rather than inventing a toy example.

## What you submit

One entry per retry site you find: where it is, which of the four failure modes it is exposed to (if any), what you would change, and what that change does to everything around it. Every fix in this course so far arrives with a limit attached. Backoff adds latency to requests that were about to succeed. An idempotency key needs storage and a client that remembers it. Jitter means no single client can state its own worst-case wait. Say which of those your fix brings with it, because an entry that stops at "add backoff" has read the site without reading what happens next. A retry site that already handles all four correctly is a legitimate finding — say so, and explain what makes it hold up.

## How it's marked

The criteria above weight coverage below correctness deliberately: a shallow audit of every site scores worse than a careful audit of most of them, but a careful audit that stops at the first three retry loops it finds is still an audit that missed the point.
