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

An irreversible step doesn't fail differently to a reversible one, it just can't be undone once it has run, which means the fix isn't in how you retry it, it's in when it runs. Put the email and the lock release last in the sequence, after every step that can still fail safely, and a retry of the whole operation either never reaches them or reaches them exactly once, on the attempt that actually succeeds. This is the one week where none of client, library, platform, operator or product gets to make a retry decision, because the ordering choice already made it for them, upstream of the failure.

## Outline

- why some steps have no retry decision to make
- ordering an operation so the irreversible step comes last
- compensating actions, for when the ordering is not yours
