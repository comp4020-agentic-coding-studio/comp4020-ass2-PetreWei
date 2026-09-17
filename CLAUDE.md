# COMP4020 course site

This is the working agreement for the repository: each rule, and the reason it exists. The rules are part of what gets marked, so they are decisions I made rather than defaults I inherited.

`README.md` documents the platform, which is fixed and is not restated here. Read it before the first change under `src/` in a session, and again whenever a platform fact bears on a decision.

## 1 This Deliverable

Assignment 2: design the course you wish existed, and build the site that runs it. The published brief and spec are the contract, so read them at the source. Of their six lines, `spec/course-promises.test.ts` holds the ones about the course's shape, `pnpm check:evidence` holds the one about process evidence, and CI's deploy job checks the site is live. Whether twelve weeks add up to a course is the marker's judgement, and nothing here measures it.

Three criteria: legibility of process 45%, working deployed artefact 20%, response to the brief 35%. Commits that corroborate the account put a submission at the floor of a band; what lifts it is why a decision beat the alternative and how I knew the result was right. A failure fixed in the harness counts for more than the same failure retried.

- **The submission is the deployed state of the last commit pushed to `main`.** Due noon Monday 21 September 2026, with a fifteen-minute grace. Ship early and treat `/ship` as repeatable.
- **Markers read the site as a prospective student, for about ten minutes.** The home page, a few non-adjacent weeks, an assessment, a deck. They generally do not build it, so the deployed site is the evidence.
- **They test conditions no test suite covers.** Chrome at 1920×1080 and 390×844, by keyboard alone: Tab order, arrow keys, Enter or Space. The top band asks for a resize mid-interaction and a slow connection too.
- **The artefact mark is about whether the site works.** Restyling does not earn it, and keeping the starter's appearance can still reach the top band.

## 2 The Course

SLOP3092, *Try Again, Later*. One decision, asked in a new situation every week: something failed, should you try again, and how? The obvious answer is often wrong, because retrying looks like diligence and can make things worse without anyone noticing. Twelve situations, which is a different thing from twelve topics.

The promises below are decisions about this course. `spec/course-promises.test.ts` enforces them; this section says why they exist.

- **Every session declares a `failure_scenario`.** One concrete sentence: "an HTTP client retries a request that already succeeded server-side" instead of "reliability". The field is this course's own convention, so the check is the only thing enforcing it.
- **No two weeks name the same failure scenario.** A repeated situation is the repetition the brief warns against.
- **Every session declares `decided_by`, and all six values are in use.** `client`, `library`, `platform`, `operator`, `product`, `nobody`. Weeks 11 and 12 are the only holders of `nobody` and `product`, so either one drifting fails the check.
- **Tags name this course's slice.** A tag built from a broad signal word — `systems`, `engineering`, `reliability`, `resilience`, `computing`, `architecture` — claims territory the twelve weeks do not cover.
- **An assessment falls due inside the week it claims.** On or after that week's session, and before the next week's.

## 3 Working Practices

- **Write the plan down before building.** So there is something to argue with, and something the finished work can be checked against. It states the response, the scope wall, and what is deliberately out.
- **Review the plan adversarially before building.** Ask what is ambiguous, what was assumed, and which choice the spec requires as against merely prefers; then ask for the weaknesses and alternatives by name. Agreement is not review: "you're absolutely right" means the prompt left no room for a disagreement to surface.
- **List the plan's premises separately from its steps.** Mark each as the brief's, the client's, or mine. Reviewing only the steps cannot find an error the plan and the reviewer share.
- **Correct a wrong premise before acting on it.** Say so first and work from the corrected version; building quietly on the mistake buries it in the result.
- **Build the slice the plan describes, and stop there.** Unrequested extras are drift even when they improve something, so propose them separately.
- **Keep output pristine.** Leave no ignored errors, warnings or backtraces in logs.
- **Never rewrite the spec to match the build.** A disagreement between the two is a decision to flag.

## 4 Writing the Course

- **Say where a rule or a framing came from.** The brief, the spec, tutor feedback, or my own judgement. An invented convention that reads as an inherited one cannot be argued with.
- **Retrying is a decision about state you cannot observe.** A timeout does not tell you whether the server already committed, so the course does not describe it as a purchase or an exchange; `spec/week-distinctness.test.ts` holds the retired word list. The limits those words carried are stated as mechanism instead: backoff delays requests that were about to succeed, an open breaker refuses calls that would have worked, a deadline discards work that was nearly finished.
- **Write plainly and specifically.** Concrete numbers, endpoints, error codes and durations are wanted. Avoid the performing register: the `X, not Y` antithesis used as a template, a bare aphorism as a heading or a closer, three clauses built to a beat, a double negative standing in for a conclusion.
- **One idea, carried the whole way, and legible from outside.** A reader who sees the home page and one week should be able to say what the course argues without assembling it themselves.
- **Carry the idea through structure.** If a page needs a long stretch of prose to land its point, the structure is not doing the work. This rule and the one above it restate Assignment 1 tutor feedback; `git log -S` finds the original wording at `dae225f` and `9d990cd`.
- **Weeks are read side by side.** Before writing a week, read the ones it will be opened next to. Two weeks that could be swapped without anyone noticing are a defect.
- **A sentence that counts pages or points at another page is a claim the build does not check.** Adding decks falsified "Five of the twelve come with a full deck" in two places at once. Where a count or a cross-reference earns its place, a check owns it.
- **Cohering the pieces is the work.** Every page can be defensible while the course drifts out of focus, and nothing in the build measures that, so re-read the site end to end from time to time.
- **No catalogue filler.** Prose that could describe any course ("students will gain a comprehensive understanding of…") is a defect.
- **Fetch every fact from its source, and say which source.** A confabulated detail arrives fluent and confident, and does more damage than an honest omission in a course resting on things that really happened.
- **Ground "today" in the machine clock.** Run `date +%Y-%m-%d` before reasoning about the twelve weeks, a due date or the deadline.
- **Every curricular decision has to be visible on the site.** There is no separate syllabus document, so a decision that is not on a page was not made.
- **`/zh/` is a pilot covering the home page and the nav.** There is no i18n `fallback`, so an untranslated `/zh/*` URL 404s; every Chinese card pointing at an English page carries `（该页面暂为英文）`; the tag gloss is display-only against `src/course-config.ts`. Write the Chinese from the course's ideas rather than translating, and have a reader of Chinese judge it.
- **Save a generated image the moment you make it.** The returned URLs expire, so download the file into the repo, record where it came from in `docs/images.md`, and commit it.

## 5 Verification

- **Check the baseline first.** Run `pnpm check` before changing anything, so a later failure belongs to the change. Some of this repo's baseline is red on purpose, so read what is failing before assuming red was inherited.
- **Return the evidence itself.** Drive the page in a real browser and produce the screenshot, console output, response body, DOM state or exit code. "The form submits correctly" is not verification when the observed response is `{"error":"unknown port"}`.
- **The screenshot and the console fail independently.** A perfect screenshot can sit on top of a 404, a failed parse and placeholder values. Read both.
- **Verify the deployed site.** `ASTRO-DEV-TOOLBAR` in the tab order means the dev server got tested by mistake, and `astro preview` may not be on 4321, so read the printed port from `astro preview logs`. A correct preview is still not the deployment.
- **Spend verification where the pages differ.** Drive the one or two pages that are genuinely distinct and let `pnpm check` cover the rest. Read the console once, extract the value needed instead of capturing the whole page, and do not re-observe what has not changed.
- **Reproduce before fixing.** For a bug found by hand, add a failing test first, confirm it fails for the right reason, then fix.
- **A passing suite establishes only what it checks.** The axe sweep reuses cached results for unchanged pages, so read how many pages it actually re-checked before quoting the number. Coherence needs a person: before calling a change done, show it to someone who has not seen it.

## 6 Sensors and Checks

- **Ask whether a person is needed before writing a check.** "Exactly one top-level heading" is mechanical; "make it look good" needs a reader. A check for something only a person can settle is theatre.
- **Write the sensor before the change.** The contract then outlives the edit and rejects later drift on its own.
- **Write the assertion so it can only pass for the right reason.** Assert that the thing is used, because a forbid-only check is satisfied by an empty page. Give a compound promise one assertion per claim, and name the offending value in the message. A one-off script reports its denominator too: one built on a field that did not exist reported clean having swept 7 pages of 42.
- **Say what changed in order to make a check pass.** Whatever the edit gave up is invisible in a green run.
- **Expect a check to become the target.** Twelve weeks can hold twelve distinct failure scenarios and still be twelve shallow weeks, so ask what a check would let through as well as what it would catch.
- **Say what a sensor does not cover.** A check that states its blind spots can be trusted.
- **Treat a red check as correct until proven otherwise.** Update one when the contract it encodes has genuinely changed, and never weaken one to fit output you did not intend.
- **Repair or remove a check that stays red without being actionable.** A check that never turns green teaches everyone to ignore it.
- **Confirm the failure a check describes can actually reach it.** If the build, the schema or the type checker already rejects that state, the test only ever reports green.
- **Treat `.github/workflows/` as harness.** Edit it only to restore a check that drifted from the initial commit's intent, and diff against that commit first.

## 7 Git and CI

The pre-commit hook is the sensor that matters for secrets: CI's scan only sees a key once it has already been pushed.

Shipping makes the whole repo public, not just the site. Source, commit history, CI logs and this file are all readable, so write every commit message and every rule here for someone outside the course.

- **Commit small and often, and say why in the message.** The diff shows what changed; the message is the only place the reason survives.
- **Commit only on green, then push immediately.** Stage files by name and read the CI run afterwards. The one exception is a check written ahead of the thing that satisfies it: red on purpose, and the message says which and why.
- **Never rewrite history.** No force pushes, no amending what is already pushed. Correct it in the next commit; the log should show the mistakes too.
- **Read a red CI run properly.** `gh run watch`, then `gh run view --log-failed`, for the actual failing command and its output instead of "the build failed".
- **Only put a number in a commit message you have just measured.** Read it from the command output in the same step as writing the message.
- **Commit the updated lockfile after any dependency change.** CI installs with `--frozen-lockfile`, so a stale `pnpm-lock.yaml` breaks the build there even though it works locally.

## 8 PROCESS.md

This is the assignment's whole written account. `reflections/` is unused here, and `check:evidence` expects no reflection file in this repo.

- **400 to 600 words, one narrative.** A first-person account of getting from the brief to the harness and the workflow, as against a run of fixes with a commit hash apiece.
- **Write each moment in STAR form, weighted.** Situation 20%, Task 10%, Action 60%, Result 10%. The weighting is the rule: an even split recounts events, and most of the words belong on what I did, why, and the alternatives I rejected.
- **Its spine is three questions.** What I decided a good course looks like; which of those decisions became a rule here or a check in `spec/`; and which I deliberately left to human judgement.
- **Say why this course should exist.** Sincere, speculative or satirical are all allowed, and the reason is a stated requirement of the brief.
- **Cite the discarded work too.** A deletion, a reverted commit, a rule added and then cut: judgement shows there, and successes alone read as a clean run that never happened.
- **Carry one identifiable turning point, with a before and after.** The week 7 retrospective is built from this file, so the moment has to be findable here.
- **Cite commits inline, as links whose text is the hash or range.** An uncited claim is discounted, and markers follow citations instead of hunting the repo.
- **Do not narrate past the evidence.** Filenames, dates, diffs and counts are evidence; a label for a phase is interpretation. Notice the seam where the citations stop and the story starts.
- **Check the rendered file on GitHub before shipping.** Images need relative paths and nothing verifies that they render.

## 9 Markdown

- Follow `markdownlint` except `MD013`, and keep each prose paragraph on a single line. A hard-wrapped rewrap diffs every line and buries the sentence that changed.
- After creating or modifying Markdown files, run `markdownlint-cli2 --config ~/.markdownlint-cli2.yaml` on the changed files and fix everything it reports. Two errors are deliberate and stay: `MD033` on `src/pages/lectures/index.mdx`, which needs `<LecturesGrid />`, and `MD025` on `src/pages/policies/index.mdx`, whose heading text is asserted at `spec/page-structure.test.ts:33`.
- **Number document subheadings, and set them in Title Case.** `## 1 Heading Level 2`, then `### 1.1 Heading Level 3` beneath it, so a section can be cited by number; the `# Title` itself is not numbered. Articles, conjunctions and prepositions of three letters or fewer stay lower case unless one leads. This applies to `CLAUDE.md`, `PROCESS.md` and `docs/`, and never under `src/`, where the headings are the site's own prose.

## 10 Maintaining This File

- **Remove what is stale instead of writing a correction beside it.** This file says what is true now, and Git keeps the history.
- **Only what is short and always true belongs here.** A decision that applies to one session belongs in the prompt.
- **Keep each rule to the rule and one reason.** A second justification, a restatement or a closing generalisation makes the list slower to read without making it more binding.
- **A recurring correction belongs in a sensor or a skill.** Write a check when the lesson is deterministic, a skill when it is a procedure worth reusing, and lengthen this list only when it is neither.
