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

Read success rate as the health of the system, since that is the number the dashboard shows and it has not moved. The truth: a dashboard reporting success while the retried p99 latency has climbed to eleven seconds, because the metric that would have shown the decline was never being measured in the first place.

## Outline

- why success rate alone hides a retry's cost
- counting the second attempt, not just the eventual outcome
- what to measure so retrying stops being invisible
