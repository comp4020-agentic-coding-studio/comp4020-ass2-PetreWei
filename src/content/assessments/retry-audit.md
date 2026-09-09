---
title: Retry audit
description: "Find every retry in a real codebase and diagnose it against the four weeks that got you here — safe to repeat, backed off, jittered, and honest about what each fix costs."
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
  - each proposed fix names what it trades away, in the same terms the weeks used
  - submitted by the deadline, as a single document with one entry per retry site
related:
  - sessions/04-synchronising-a-herd
---

## The brief

> Pick a codebase with retry logic in it and find out whether it survives its own week 4.

You have four weeks of failure modes to check against: does a retry site distinguish a read from a write, does it back off, does it jitter, and would it survive being one of ten thousand identical clients recovering at once. Most retry logic was written before anyone asked these questions, which is what makes it worth auditing rather than inventing a toy example.

## What you submit

One entry per retry site you find: where it is, which of the four failure modes it's exposed to (if any), what you'd change, and what that change would cost. Every fix in this course so far has traded something — latency, storage, a predictable worst case — and an entry that proposes a fix without naming its price has only done half the diagnosis. A retry site that already handles everything correctly is a legitimate finding, not a gap in your search, so say so and explain why it holds up.

## How it's marked

The criteria above weight coverage below correctness deliberately: a shallow audit of every site scores worse than a careful audit of most of them, but a careful audit that stops at the first three retry loops it finds is still an audit that missed the point.
