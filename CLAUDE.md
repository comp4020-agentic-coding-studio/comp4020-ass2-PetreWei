# COMP4020 course site

This file is yours, and it arrives with no rules in it on purpose --- this note is all there is, and it goes when you write your own. The rules you hold the agent to are part of what gets marked, so they should be rules you decided on.

The [course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/) publishes this deliverable's brief and spec, and this repo's name tells you which deliverable applies. Read both before you plan or build.

This repo builds the Slop University course site with Astro: four content collections under `src/content/`, slide decks in `src/decks/`, and a generated JSON API. `README.md` documents the platform, which is fixed. The deployed site is what gets marked, not this repo.

## The checks

`pnpm check` runs them, and `pnpm check:evidence` is the extra gate before you ship. CI runs the same plus secrets and the deploy.

A local pre-commit hook (`.githooks/pre-commit`, installed by `pnpm install`) blocks any commit that looks like it contains an API key. It's the sensor that actually matters for secrets --- CI's scan only sees a key after it's already pushed.

Shipping makes the whole repo public, not just the site: source, commit history, CI logs and this file. Write every commit message and every rule here as something a reader outside the course will see.

`spec/README.md` and `PROCESS.md` are in this repo and say what they are for. `reflections/` is unused here: an assignment's written account is `PROCESS.md`, and `check:evidence` expects no reflection file in this repo.

## This deliverable

Assignment 2: design the course you wish existed, and build the site that runs it. The published brief and spec are the contract, so read them there rather than from a copy. Of its six lines, `spec/course-promises.test.ts` holds the ones about the course's shape, `pnpm check:evidence` holds the one about process evidence, and CI's deploy job is the only thing that checks the site is actually live. Whether twelve weeks add up to a course is nobody's check but the marker's.

Three criteria: legibility of process 45%, working deployed artefact 20%, response to the brief 35%. Process carries the most weight deliberately, and corroboration is the floor of a band rather than the top --- what lifts it is what no commit alone shows: why a decision beat the alternative, and how you knew the result was right before accepting it. Failures fixed at the harness level count for more than failures retried.

## Writing the course

- **One idea, carried all the way.** The course is a single narrow subject explored across twelve weeks, not a survey of a field. A page that would sit equally well in a different course isn't finished.
- **Weeks are read side by side, not in order.** Before writing a week, read the ones it will be opened next to. Two weeks that could be swapped without anyone noticing are a defect, not variety.
- **Cohering the chunks is the work.** The agent produces content-shaped pieces; making the site's twenty-odd pages agree with each other --- on the thesis, the voice, the names, the dates --- is what the agent can't do for you.
- **No catalogue filler.** Prose that could describe any course ("students will gain a comprehensive understanding of...") is a defect, not a placeholder. The site should read in one voice with a point of view.
- **Never write a plausible-looking guess.** An invented incident, statistic or citation that reads as real is worse than an honest omission — and a course pointing at real failures is exactly where a fabricated one does the most damage.
- **Every curricular decision has to be visible on the site.** There is no separate syllabus document; if a decision isn't on a page, it wasn't made.
- **Save a generated image the moment you make it.** The course key's image allowance runs for the semester and the returned URLs expire, so download the file into the repo, record where it came from, and commit it. `check:evidence` hashes the four starter images and fails on them — the artwork has to be yours.

## This course's own promises

These are decisions about SLOP3092, not requirements of the brief. `spec/course-promises.test.ts` enforces them; this section says why they exist.

- **Every session declares a `failure_scenario`.** A short, concrete sentence naming the specific failure that week is built around — "an HTTP client retries a request that already succeeded server-side", not "reliability". The field is this course's own convention, passed through by the `.loose()` content schemas, so the check is its only enforcement.
- **No two weeks name the same failure scenario.** The course asks one question twelve times about twelve different situations; a repeated situation is the repetition the brief warns against.
- **Tags name this course's slice, not the field around it.** A tag built from a broad signal word — `systems`, `engineering`, `reliability`, `resilience`, `computing`, `architecture` — claims territory the twelve weeks don't cover.
- **An assessment falls due inside the week it claims.** On or after that week's session, and before the next week's. An assessment pointing at a week no session is scheduled for is a scheduling error, not a late deadline.

## Working practices

- **Start each deliverable with the `start` skill.** It fetches the spec and turns its checkable lines into tests.
- **Argue with the plan before building.** Ask the agent what's ambiguous, what it assumed, what it missed, and which choice the spec requires versus merely prefers.
- **Build the slice the plan describes, and stop there.** Arguing with the plan only settles what to build; nothing holds that line during the work. Unrequested extras are drift even when they're improvements — propose them separately.
- **Check the baseline first.** Run `pnpm check` before changing anything; a red baseline means the failure isn't yours to fix.
- **Return evidence, not a claim.** Drive the page in a real browser rather than reasoning about it from source, and produce the screenshot, console output, response body, DOM state, numbers or exit code — not a judgement by eye. "The form submits correctly" is not verification when the observed response is `{"error":"unknown port"}`.
- **The screenshot and the console fail independently.** A perfect screenshot can sit on top of a 404, a failed parse and placeholder values. Read both, and neither one alone counts as verified.
- **Verify the deployed site, not the dev server.** `ASTRO-DEV-TOOLBAR` in the tab order means you tested the dev server by mistake, and `astro preview` may run on a different port if 4321 is busy — read the printed port. Even a correct preview isn't the deployment: GitHub Pages serves the site under a subpath, so a base-path or asset bug can look fine locally and only 404 once live.
- **Reproduce before fixing.** For a bug found by hand, add a failing test first, confirm it fails for the right reason, then fix.
- **Keep output pristine.** Leave no ignored errors, warnings, or backtraces in logs.
- **Never rewrite the spec to match the build.** A disagreement between them is a decision to flag, not a diff to resolve quietly.
- **Use the cheapest recovery available.** `Esc` interrupts, `/rewind` undoes in-session, `git revert` undoes a commit.

## Sensors and checks

- **Ask whether a person is needed before writing a check.** "Exactly one top-level heading" is mechanical; "make it look good" needs a reader. A check for something only a person can settle is theatre, and deciding which is which is the third question `PROCESS.md` has to answer.
- **Write the sensor before the change.** When a judgement is worth keeping, encode it as a check first, then make the work pass it — the contract then outlives the edit and rejects future drift on its own.
- **Say what a sensor doesn't cover.** A check that states its blind spots is trustworthy; one that implies it proves more than it does is not.
- **Treat a red check as correct until proven otherwise.** Read it before changing anything. Update a check when the contract it encodes has genuinely changed; never weaken one to fit output you didn't intend.
- **A permanently red check is not a sensor.** If a check stays red without being actionable, repair or remove it — a check that never turns green just teaches everyone to ignore it.
- **A check that cannot fail is not a sensor either.** Before writing one, confirm the failure it describes can actually reach it — if the build, the schema or the type checker already rejects that state, the test only ever reports green.
- **A browser tool that doesn't respond is evidence to investigate, not a verdict on the site.** Synthetic input can miss what a real interaction would catch — a key press dispatched and released inside one frame never registers as held. Check the tool's assumptions against the page's actual behaviour before believing a red result.
- **Workflow files are harness, not spec.** Edit `.github/workflows/` only to restore a check that drifted from the initial commit's intent — diff against that commit first.

## Git and CI

- **Commit small and often, and say why in the message.** The commit trail is evidence of process, not just the final diff, and a single dump before the deadline is the weakest version of it. The diff already shows what changed; the message is the only place the reason survives.
- **Commit only on green, then push immediately.** Stage files by name, never force, and read the CI run afterward — a local green is not a green deploy.
- **Read a red CI run properly.** `gh run watch`, then `gh run view --log-failed` — hand the agent the actual failing command, output, and expected-vs-actual, not just "the build failed."
- **Commit the updated lockfile after any dependency change.** CI installs with `--frozen-lockfile`, so a stale `pnpm-lock.yaml` breaks the build there even though it works locally.

## PROCESS.md

- **400 to 600 words, one narrative.** A first-person account of getting from the brief to the harness and the workflow — not a run of fixes with a commit hash apiece.
- **Its spine is three questions.** What did you decide a good course looks like; which of those decisions became a rule here or a check in `spec/`; and which you deliberately left to human judgement instead of encoding.
- **Cite commits inline, as links whose text is the hash or range.** An uncited claim is not evidence and is discounted — markers follow citations rather than hunting the repo for material you didn't point at.
- **Don't narrate past the evidence.** Filenames, dates, diffs and counts are evidence; a label for a phase, or a claim about what the work proves, is interpretation. Notice the seam where the citations stop and the story starts.
- **Check the rendered file on GitHub before shipping.** Images need relative paths and nothing verifies that they render.

## Grading conditions

- **The submission is the deployed state of the last commit pushed to `main`.** Due noon Monday 21 September 2026, with a fifteen-minute grace — noon means 12:15pm. Nothing later counts, so ship early and treat `/ship` as repeatable rather than a deadline ritual.
- **Markers read the site as a prospective student, for about ten minutes.** The home page, a few non-adjacent weeks, an assessment, the deck. They generally don't build it — the deployed site is the evidence.
- **They test conditions no test suite covers.** Chrome at 1920×1080 and 390×844, by keyboard alone — Tab order, arrow keys, Enter or Space — as readily as by mouse. The top band is about holding up under use it wasn't designed for: keyboard only, a resize mid-interaction, a slow connection.
- **Restyling is not the artefact criterion.** Whether the site works decides that mark, not how it looks — keeping the starter's appearance can still reach the top band if the course itself reads as coherent and compelling.
- **Green does not mean good.** A passing suite establishes only what it checks. Qualities like coherence or whether the thing is worth having need a person — before calling a change done, show it to someone who has not seen it before.

## Markdown

- When creating or modifying Markdown files, follow `markdownlint` except `MD013`, and keep each prose paragraph on a single line — a hard-wrapped rewrap diffs every line and buries the sentence that changed.
- After creating or modifying Markdown files, run `markdownlint-cli2 --config ~/.markdownlint-cli2.yaml` on the changed files and fix all reported problems before finishing.

## Maintaining this file

- **Delete, don't append.** Write down what you learn as you go, and remove anything here the moment it is stale or contradicted.
- **A recurring correction belongs in a sensor, not here.** Add a check instead of lengthening this list.
