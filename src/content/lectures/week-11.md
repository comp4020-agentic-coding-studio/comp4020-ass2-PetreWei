---
title: Some steps only happen once, by design
description: "Why an irreversible step has no retry decision to make, and why the real fix is ordering it to run last instead."
week: 11
date: 2027-05-17
teachers:
  - marisol-quaye
related:
  - sessions/11-finding-the-point-of-no-return
---

Retry the whole operation from the start, the way every other failure this semester has been handled. Everything the naive retry assumes: it repeats the steps that were never a problem and cannot touch the two that already happened, so retrying does not fix the failure and may duplicate the email on top of it.

## Outline

- why some steps have no retry decision to make
- ordering an operation so the irreversible step comes last
- what changes when a decision has already been made for you
