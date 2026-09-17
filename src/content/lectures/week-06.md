---
title: A runbook fails the same ways a retry library does
description: "Why some weeks have no client, library or platform to hand the decision to, and what a runbook has in common with a retry library."
week: 6
date: 2027-04-12
teachers:
  - idris-fenn
slides: /decks/week-06/
related:
  - sessions/06-two-people-one-payout
image: ./week-06.avif
imageAlt: Two hands, each dropping an identical coin into the same slot at once
---

Every mechanism so far has lived in a client, a library or a platform, because there was code between the failure and the second attempt. Take the code out and the failure modes are unchanged. Two operators working the same incident from the same runbook have no idempotency check, no backoff and no shared state, so both of them issue the payout. What they need is what the code needed, in a different medium: a runbook line saying who acts, a wait-and-check step before anybody acts again, and one incident channel both people are reading. A runbook is a retry policy executed by a person, which is why it can be wrong in the same ways, and why nothing in your logs records it happening.

## Outline

- welcome back: why the course restarts on a week with no code in it
- runbooks as the retry policy for people instead of code
- what a lock looks like when the resource is a spreadsheet
