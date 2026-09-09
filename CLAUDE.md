# SLOP3092 — Try Again, Later

This course's thesis: every week asks the same question — something failed,
should you retry it, and how? — about a different concrete failure. The
rules below exist to keep the site honest to that thesis as content is
written. `spec/course-promises.test.ts` enforces the mechanical ones
automatically via `pnpm check`; treat a failing test there as the file
being wrong, not the test.

## Session convention: `failure_scenario`

Every session's frontmatter must include a `failure_scenario` field: a short,
concrete sentence naming the specific failure that week's session is built
around (e.g. `failure_scenario: "an HTTP client retries a request that
already succeeded server-side"`). This is a course-specific convention, not
part of the fixed content schema (sessions are `.loose()`, so any string
field passes validation) — its only enforcement is the spec test.

- No two sessions may share a `failure_scenario`. Twelve weeks means twelve
  distinct situations, not the same situation restated.
- Name a specific failure, not a category. "A retry causes a duplicate
  charge" is a scenario; "reliability" or "error handling" is not.

## Scheduling

- The course runs exactly twelve teaching weeks, numbered 1–12 with no
  gaps or repeats, one session per week.
- Every assessment's `due` date must fall within the week it claims (on or
  after that week's session date, before the next week's session date).
  Don't set an assessment's `week` to a number that doesn't correspond to a
  scheduled session.

## Tags

Course tags (`src/course-config.ts`) must name this course's own narrow
slice, not the broader field it lives inside. Avoid tags built from broad
signal words — `systems`, `engineering`, `reliability`, `resilience`,
`computing`, `architecture` — even in combination (e.g. "distributed
systems", "reliability engineering"). If a tag word would work equally
well as the name of an entire existing field or discipline, it's too
broad for this course.

## Assessment weights

Assessment weights (`weight` in each assessment's frontmatter) must sum to
exactly 100 across the whole course.
