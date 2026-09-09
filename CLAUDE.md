# COMP4020 course site

This file is yours, and it arrives with no rules in it on purpose — this note is all there is, and it goes when you write your own. The rules you hold the agent to are part of what gets marked, so they should be rules you decided on.

`README.md` documents the platform, and the platform is fixed. Nothing about it is restated here, so read it before the first change under `src/` in a session, and whenever a platform fact bears on a decision — rather than trusting a copy in this file.

## This deliverable

Assignment 2: design the course you wish existed, and build the site that runs it. The published brief and spec are the contract, so read them there rather than from a copy. Of its six lines, `spec/course-promises.test.ts` holds the ones about the course's shape, `pnpm check:evidence` holds the one about process evidence, and CI's deploy job is the only thing that checks the site is actually live. Whether twelve weeks add up to a course is nobody's check but the marker's.

Three criteria: legibility of process 45%, working deployed artefact 20%, response to the brief 35%. Process carries the most weight deliberately, and corroboration is the floor of a band rather than the top — what lifts it is what no commit alone shows: why a decision beat the alternative, and how you knew the result was right before accepting it. Failures fixed at the harness level count for more than failures retried.

- **The submission is the deployed state of the last commit pushed to `main`.** Due noon Monday 21 September 2026, with a fifteen-minute grace — noon means 12:15pm. Nothing later counts, so ship early and treat `/ship` as repeatable rather than a deadline ritual.
- **Markers read the site as a prospective student, for about ten minutes.** The home page, a few non-adjacent weeks, an assessment, the deck. They generally don't build it — the deployed site is the evidence.
- **They test conditions no test suite covers.** Chrome at 1920×1080 and 390×844, by keyboard alone — Tab order, arrow keys, Enter or Space — as readily as by mouse. The top band is about holding up under use it wasn't designed for: keyboard only, a resize mid-interaction, a slow connection.
- **Restyling is not the artefact criterion.** Whether the site works decides that mark, not how it looks — keeping the starter's appearance can still reach the top band if the course itself reads as coherent and compelling.

## The course

SLOP3092, *Try Again, Later*: one decision asked in a new context every week — something failed, should you try again, and how? What keeps it from being a listicle is that the obvious answer is often wrong; retrying looks like diligence and can quietly make things worse. Twelve weeks means twelve situations, not twelve topics.

The promises below are decisions about this course, not requirements of the brief. `spec/course-promises.test.ts` enforces them; this section says why they exist.

- **Every session declares a `failure_scenario`.** A short, concrete sentence naming the specific failure that week is built around — "an HTTP client retries a request that already succeeded server-side", not "reliability". The field is this course's own convention, so the check is the only thing enforcing it.
- **No two weeks name the same failure scenario.** A repeated situation is exactly the repetition the brief warns against.
- **Tags name this course's slice, not the field around it.** A tag built from a broad signal word — `systems`, `engineering`, `reliability`, `resilience`, `computing`, `architecture` — claims territory the twelve weeks don't cover.
- **An assessment falls due inside the week it claims.** On or after that week's session, and before the next week's. An assessment pointing at a week no session is scheduled for is a scheduling error, not a late deadline.

## Writing the course

- **One idea, carried all the way.** A page that would sit equally well in a different course isn't finished.
- **Weeks are read side by side, not in order.** Before writing a week, read the ones it will be opened next to. Two weeks that could be swapped without anyone noticing are a defect, not variety.
- **Cohering the chunks is the work.** The agent produces content-shaped pieces; making the site's twenty-odd pages agree with each other — on the thesis, the voice, the names, the dates — is what the agent can't do for you. Every page can be defensible and still let the course drift out of focus, and nothing in the build measures that, so re-read the site end to end from time to time rather than only the page in hand.
- **No catalogue filler.** Prose that could describe any course ("students will gain a comprehensive understanding of...") is a defect, not a placeholder. The site should read in one voice with a point of view.
- **Fetch the fact, don't recall it.** A date, a figure, an outage, the order things happened in: get it from the source and say which source. A confabulated detail arrives fluent and confident, and an invented incident or citation that reads as real is worse than an honest omission — in a course resting on things that really happened, that is where the damage is worst.
- **Ground "today" in the machine clock.** `date +%Y-%m-%d` before reasoning about the twelve weeks, a due date or the deadline — never an assumed today.
- **Every curricular decision has to be visible on the site.** There is no separate syllabus document; if a decision isn't on a page, it wasn't made.
- **Save a generated image the moment you make it.** The course key's image allowance runs for the semester and the returned URLs expire, so download the file into the repo, record where it came from, and commit it.

## Working practices

- **Write the plan down before building.** Not for the marker — so there is something to argue with, and something the finished work can be checked against. It states the response, the scope wall, and what is deliberately out.
- **Argue with the plan before building.** Ask the agent what's ambiguous, what it assumed, what it missed, and which choice the spec requires versus merely prefers.
- **Correct a wrong premise before acting on it.** If an instruction contains a factual error, say so first and work from the corrected version. Quietly building on the mistake buries it in the result.
- **Build the slice the plan describes, and stop there.** Arguing with the plan only settles what to build; nothing holds that line during the work. Unrequested extras are drift even when they're improvements — propose them separately.
- **Keep output pristine.** Leave no ignored errors, warnings, or backtraces in logs.
- **Never rewrite the spec to match the build.** A disagreement between them is a decision to flag, not a diff to resolve quietly.
- **Use the cheapest recovery available.** `Esc` interrupts, `/rewind` undoes in-session, `git revert` undoes a commit.

## Verification

- **Check the baseline first.** Run `pnpm check` before changing anything, so a later failure is known to belong to the change. Some of this repo's baseline is red on purpose — checks waiting on content that doesn't exist yet — so read what is failing rather than assuming red means inherited.
- **Return evidence, not a claim.** Drive the page in a real browser rather than reasoning about it from source, and produce the screenshot, console output, response body, DOM state, numbers or exit code — not a judgement by eye. "The form submits correctly" is not verification when the observed response is `{"error":"unknown port"}`.
- **The screenshot and the console fail independently.** A perfect screenshot can sit on top of a 404, a failed parse and placeholder values. Read both, and neither one alone counts as verified.
- **Verify the deployed site, not the dev server.** `ASTRO-DEV-TOOLBAR` in the tab order means you tested the dev server by mistake, and `astro preview` may run on a different port if 4321 is busy — read the printed port. Even a correct preview isn't the deployment — open the live URL.
- **Reproduce before fixing.** For a bug found by hand, add a failing test first, confirm it fails for the right reason, then fix.
- **Green does not mean good.** A passing suite establishes only what it checks, and the axe sweep in `pnpm build` is one automated pass, not proof the page works without a mouse. Coherence, and whether the thing is worth having, need a person — before calling a change done, show it to someone who has not seen it before.

## Sensors and checks

- **Ask whether a person is needed before writing a check.** "Exactly one top-level heading" is mechanical; "make it look good" needs a reader. A check for something only a person can settle is theatre, and deciding which is which is the third question `PROCESS.md` has to answer.
- **Write the sensor before the change.** When a judgement is worth keeping, encode it as a check first, then make the work pass it — the contract then outlives the edit and rejects future drift on its own.
- **Write the assertion so it can only pass for the right reason.** Assert the thing is used, not merely that the wrong thing is absent, since a forbid-only check is satisfied by an empty page. Give a compound promise one assertion per claim, or it passes on the easy half. Name the offending value in the message, so a failure says what to go and look at.
- **Say what passing cost.** When you change the work to satisfy a check, report what the change gave up. A constraint met is not the same as the thing improved, and the loss is invisible in a green run.
- **Expect a check to become the target.** The spec is the measure and the agent is the optimiser, so the most mechanical criterion is the easiest one to satisfy hollowly — twelve weeks can hold twelve distinct failure scenarios and still be twelve shallow weeks. Ask what the check would let through, not only what it would catch.
- **Say what a sensor doesn't cover.** A check that states its blind spots is trustworthy; one that implies it proves more than it does is not.
- **Treat a red check as correct until proven otherwise.** Read it before changing anything. Update a check when the contract it encodes has genuinely changed; never weaken one to fit output you didn't intend.
- **A permanently red check is not a sensor.** If a check stays red without being actionable, repair or remove it — a check that never turns green just teaches everyone to ignore it.
- **A check that cannot fail is not a sensor either.** Before writing one, confirm the failure it describes can actually reach it — if the build, the schema or the type checker already rejects that state, the test only ever reports green.
- **A browser tool that doesn't respond is evidence to investigate, not a verdict on the site.** Check the tool's own assumptions against the page's actual behaviour before believing a red result.
- **Workflow files are harness, not spec.** Edit `.github/workflows/` only to restore a check that drifted from the initial commit's intent — diff against that commit first.

## Git and CI

The pre-commit hook is the sensor that actually matters for secrets: CI's scan only sees a key once it has already been pushed.

Shipping makes the whole repo public, not just the site: source, commit history, CI logs and this file. Write every commit message and every rule here as something a reader outside the course will see.

- **Commit small and often, and say why in the message.** The commit trail is evidence of process, not just the final diff, and a single dump before the deadline is the weakest version of it. The diff already shows what changed; the message is the only place the reason survives.
- **Commit only on green, then push immediately.** Stage files by name and read the CI run afterward — a local green is not a green deploy. The one exception is a check written ahead of the thing that satisfies it: those are red on purpose, and the commit message says which and why.
- **Never rewrite history.** No force pushes, no amending what is already pushed, no tidying a mislabelled commit away — correct it in the next one instead. The log should show the mistakes too.
- **Read a red CI run properly.** `gh run watch`, then `gh run view --log-failed` — hand the agent the actual failing command, output, and expected-vs-actual, not just "the build failed."
- **Commit the updated lockfile after any dependency change.** CI installs with `--frozen-lockfile`, so a stale `pnpm-lock.yaml` breaks the build there even though it works locally.

## PROCESS.md

This is the assignment's whole written account: `reflections/` is unused here, and `check:evidence` expects no reflection file in this repo.

- **400 to 600 words, one narrative.** A first-person account of getting from the brief to the harness and the workflow — not a run of fixes with a commit hash apiece.
- **Its spine is three questions.** What did you decide a good course looks like; which of those decisions became a rule here or a check in `spec/`; and which you deliberately left to human judgement instead of encoding.
- **Say why this course should exist.** Sincere, speculative or satirical are all allowed, but the reason has to be on the page — it is a stated requirement, not an optional flourish.
- **Cite the discarded work too.** A deletion, a reverted commit, a rule added and then cut: those are where judgement shows, and the top band asks for it. Successes alone read as a clean run that never happened.
- **Carry one identifiable turning point, with a before and after.** The week 7 retrospective is built from this file — it asks for the specific change that made the assignment click, so the moment needs to be findable here rather than reconstructed later.
- **Cite commits inline, as links whose text is the hash or range.** An uncited claim is not evidence and is discounted — markers follow citations rather than hunting the repo for material you didn't point at.
- **Don't narrate past the evidence.** Filenames, dates, diffs and counts are evidence; a label for a phase, or a claim about what the work proves, is interpretation. Notice the seam where the citations stop and the story starts.
- **Check the rendered file on GitHub before shipping.** Images need relative paths and nothing verifies that they render.

## Markdown

- When creating or modifying Markdown files, follow `markdownlint` except `MD013`, and keep each prose paragraph on a single line — a hard-wrapped rewrap diffs every line and buries the sentence that changed.
- After creating or modifying Markdown files, run `markdownlint-cli2 --config ~/.markdownlint-cli2.yaml` on the changed files and fix all reported problems before finishing.

## Maintaining this file

- **Delete, don't append.** Write down what you learn as you go, and remove anything here the moment it is stale or contradicted. This file says what is true now; Git keeps the history, so nothing has to be preserved here for the record.
- **Only what is short and always true belongs here.** A decision that applies to this session belongs in the prompt, not in a standing rule — copying it up here makes it outlive the situation that justified it.
- **A recurring correction belongs in a sensor or a skill, not here.** Write a check when the lesson is deterministic, a skill when it's a procedure worth reusing, and lengthen this list only when it is neither.
