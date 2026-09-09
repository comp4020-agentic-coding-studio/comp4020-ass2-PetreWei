# SLOP3092 — Try Again, Later

This course's thesis: every week asks the same question — something failed,
should you retry it, and how? — about a different concrete failure. The
promises below exist to keep the site honest to that thesis as content is
written. `spec/course-promises.test.ts` enforces the mechanical ones
automatically via `pnpm check`; treat a failing test there as the file
being wrong, not the test.

## Course promises

### Session convention: `failure_scenario`

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

### Scheduling

- The course runs exactly twelve teaching weeks, numbered 1–12 with no
  gaps or repeats, one session per week.
- Every assessment's `due` date must fall within the week it claims (on or
  after that week's session date, before the next week's session date).
  Don't set an assessment's `week` to a number that doesn't correspond to a
  scheduled session.

### Tags

Course tags (`src/course-config.ts`) must name this course's own narrow
slice, not the broader field it lives inside. Avoid tags built from broad
signal words — `systems`, `engineering`, `reliability`, `resilience`,
`computing`, `architecture` — even in combination (e.g. "distributed
systems", "reliability engineering"). If a tag word would work equally
well as the name of an entire existing field or discipline, it's too
broad for this course.

### Assessment weights

Assessment weights (`weight` in each assessment's frontmatter) must sum to
exactly 100 across the whole course.

## Working practices

Carried forward from earlier crits, where they earned their place.

- **Start each deliverable with the `start` skill.** It fetches the spec and
  turns its checkable lines into tests.
- **Argue with the plan before building.** Ask what's ambiguous, what it
  assumed, what it missed, and which choice the spec requires versus merely
  prefers.
- **Check the baseline first.** Run `pnpm check` before changing anything; a
  red baseline means the failure isn't yours to fix.
- **Look at the rendered page.** Open it in a browser rather than reasoning
  about it from source.
- **Treat a red check as correct until proven otherwise.** Read it before
  changing anything, and never weaken a check to reach green.
- **Reproduce before fixing.** For a bug found by hand, add a failing test
  first, confirm it fails for the right reason, then fix.
- **Keep output pristine.** Leave no ignored errors, warnings, or backtraces
  in logs.
- **Never rewrite the spec to match the build.** A disagreement between them
  is a decision to flag, not a diff to resolve quietly.
- **Use the cheapest recovery available.** `Esc` interrupts, `/rewind` undoes
  in-session, `git revert` undoes a commit.
- **Write one-line paragraphs.** A hard-wrapped rewrap diffs every line and
  buries the sentence that changed.
- **Lint Markdown before committing it.** Run
  `markdownlint-cli2 --config ~/.markdownlint-cli2.yaml`.
- **Commit small and often.** The commit trail is evidence of process, not
  just the final diff; a single dump before the deadline is the weakest
  version of it.
- **Commit only on green, then push immediately.** Stage files by name,
  never force, and read the CI run afterward — a local green is not a green
  deploy.

## Grading conditions

- **Markers test conditions no test suite covers.** They drive the deployed
  site in Chrome at two fixed viewports, by keyboard alone — Tab order,
  arrow keys, Enter or Space — as readily as by mouse.
- **Grading is time-boxed.** Checks must be green by the deadline; a check
  still running counts as not green.
- **Green does not mean good.** A passing suite establishes only what it
  checks. Qualities like clarity or coherence need a person — before calling
  a change done, show it to someone who hasn't seen it before.

## Lessons from failures

- **Workflow files are harness, not spec.** Edit `.github/workflows/` only
  to restore a check that drifted from the initial commit's intent — diff
  against that commit first. Never weaken a check the spec requires.
- **Verify against the built site, not the dev server.** `astro preview`
  may run on a different port if 4321 is busy; read the printed port.
- **Check the deployed URL, not just `pnpm preview`.** GitHub Pages serves
  the site under a subpath; a base-path or asset bug can look fine locally
  and only 404 once live.
- **Commit the updated lockfile after any dependency change.** CI installs
  with `--frozen-lockfile`, so a stale `pnpm-lock.yaml` breaks the build
  there even though it works locally.
- **Never show a plausible-looking guess.** Fail visibly, or show nothing.
- **Measure before claiming an outcome.** Get numbers before judging by eye.

## Maintaining this file

- **Delete, don't append.** Write down what you learn as you go, and remove
  anything here the moment it is stale or contradicted.
- **A recurring correction belongs in a sensor, not here.** Add a check
  instead of lengthening this list.
