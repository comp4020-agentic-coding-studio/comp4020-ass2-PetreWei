# COMP4020 course site

This file is yours, and it arrives with no rules in it on purpose --- this note is all there is, and it goes when you write your own. The rules you hold the agent to are part of what gets marked, so they should be rules you decided on.

The [course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/) publishes this deliverable's brief and spec, and this repo's name tells you which deliverable applies. Read both before you plan or build.

This repo builds the Slop University course site with Astro: four content collections under `src/content/`, slide decks in `src/decks/`, and a generated JSON API. `README.md` documents the platform, which is fixed. The deployed site is what gets marked, not this repo.

## The checks

`pnpm check` runs them, and `pnpm check:evidence` is the extra gate before you ship. CI runs the same plus secrets and the deploy.

A local pre-commit hook (`.githooks/pre-commit`, installed by `pnpm install`) blocks any commit that looks like it contains an API key. It's the sensor that actually matters for secrets --- CI's scan only sees a key after it's already pushed.

`spec/README.md`, `PROCESS.md` and `reflections/README.md` are in this repo and say what they are for.

## Working practices

- **Start each deliverable with the `start` skill.** It fetches the spec and turns its checkable lines into tests.
- **Argue with the plan before building.** Ask the agent what's ambiguous, what it assumed, what it missed, and which choice the spec requires versus merely prefers.
- **Check the baseline first.** Run `pnpm check` before changing anything; a red baseline means the failure isn't yours to fix.
- **Look at the rendered page.** Drive it in a real browser rather than reasoning about it from source.
- **Return evidence, not a claim.** Verification produces the screenshot, console output, response body, DOM state, numbers or exit code — not a judgement by eye. "The form submits correctly" is not verification when the observed response is `{"error":"unknown port"}`.
- **Reproduce before fixing.** For a bug found by hand, add a failing test first, confirm it fails for the right reason, then fix.
- **Keep output pristine.** Leave no ignored errors, warnings, or backtraces in logs.
- **Never rewrite the spec to match the build.** A disagreement between them is a decision to flag, not a diff to resolve quietly.
- **Use the cheapest recovery available.** `Esc` interrupts, `/rewind` undoes in-session, `git revert` undoes a commit.

## Sensors and checks

- **Write the sensor before the change.** When a judgement is worth keeping, encode it as a check first, then make the work pass it — the contract then outlives the edit and rejects future drift on its own.
- **Say what a sensor doesn't cover.** A check that states its blind spots is trustworthy; one that implies it proves more than it does is not.
- **Treat a red check as correct until proven otherwise.** Read it before changing anything. Update a check when the contract it encodes has genuinely changed; never weaken one to fit output you didn't intend.
- **A permanently red check is not a sensor.** If a check stays red without being actionable, repair or remove it — a check that never turns green just teaches everyone to ignore it.
- **A stuck automated test is evidence to investigate, not a verdict on the artefact.** Check the test's assumptions against the artefact's actual behaviour before trusting a red result.
- **Workflow files are harness, not spec.** Edit `.github/workflows/` only to restore a check that drifted from the initial commit's intent — diff against that commit first.

## Git and CI

- **Commit small and often.** The commit trail is evidence of process, not just the final diff; a single dump before the deadline is the weakest version of it.
- **Commit only on green, then push immediately.** Stage files by name, never force, and read the CI run afterward — a local green is not a green deploy.
- **Read a red CI run properly.** `gh run watch`, then `gh run view --log-failed` — hand the agent the actual failing command, output, and expected-vs-actual, not just "the build failed."
- **Commit the updated lockfile after any dependency change.** CI installs with `--frozen-lockfile`, so a stale `pnpm-lock.yaml` breaks the build there even though it works locally.

## Grading conditions

- **Markers test conditions no test suite covers.** They drive the deployed site in Chrome at 1920×1080 and 390×844, by keyboard alone — Tab order, arrow keys, Enter or Space — as readily as by mouse.
- **Green does not mean good.** A passing suite establishes only what it checks. Qualities like coherence or whether the thing is worth having need a person — before calling a change done, show it to someone who has not seen it before.

## Lessons from failures

- **Verify against the built site, not the dev server.** `astro preview` may run on a different port if 4321 is busy; read the printed port. `ASTRO-DEV-TOOLBAR` in the tab order means you tested the dev server by mistake.
- **Check the deployed URL, not just `pnpm preview`.** GitHub Pages serves the site under a subpath; a base-path or asset bug can look fine locally and only 404 once live.
- **Never render a plausible-looking guess.** When the real value is missing, the page fails visibly or shows nothing — a fabricated placeholder that looks like data is worse than an empty state.

## Markdown

- When creating or modifying Markdown files, follow `markdownlint` except `MD013`, and keep each prose paragraph on a single line — a hard-wrapped rewrap diffs every line and buries the sentence that changed.
- After creating or modifying Markdown files, run `markdownlint-cli2 --config ~/.markdownlint-cli2.yaml` on the changed files and fix all reported problems before finishing.

## Maintaining this file

- **Delete, don't append.** Write down what you learn as you go, and remove anything here the moment it is stale or contradicted.
- **A recurring correction belongs in a sensor, not here.** Add a check instead of lengthening this list.
