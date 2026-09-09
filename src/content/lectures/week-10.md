---
title: A green dashboard can be hiding a slow decline
description: "Why success rate alone cannot show a retry's cost, and what a dashboard has to measure instead to surface a decline early."
week: 10
date: 2027-05-10
teachers:
  - idris-fenn
related:
  - sessions/10-reading-past-the-dashboard
---

Success rate answers whether a request eventually got a good response; it says nothing about how many attempts that took or how long the client waited for it. A retry that succeeds on the third try is invisible to that metric and expensive to the person waiting on it, which is why a dashboard built only on success rate can watch a dependency decline for six weeks and never move. The fix is measuring the thing retries are built to hide, retried latency and retry rate, tracked alongside success rate rather than instead of it.

## Outline

- why success rate alone hides a retry's cost
- counting the second attempt, not just the eventual outcome
- what to measure so retrying stops being invisible
