# COMP4020 course site

This is the working agreement for the repository: the rules I hold the agent to, and for each one the reason it exists. The rules are part of what gets marked, so they are decisions I made rather than defaults I inherited.

`README.md` documents the platform, and the platform is fixed. Nothing about it is restated here. Read it before the first change under `src/` in a session, and again whenever a platform fact bears on a decision, instead of trusting a copy in this file.

## 1 This Deliverable

Assignment 2: design the course you wish existed, and build the site that runs it. The published brief and spec are the contract, so read them at the source. Of their six lines, `spec/course-promises.test.ts` holds the ones about the course's shape, `pnpm check:evidence` holds the one about process evidence, and CI's deploy job is the only thing that checks the site is live. Whether twelve weeks add up to a course is the marker's judgement, and nothing here measures it.

Three criteria: legibility of process 45%, working deployed artefact 20%, response to the brief 35%. Process carries the most weight deliberately. Commits that corroborate the account put a submission at the floor of a band; what lifts it is the part no commit shows on its own, which is why a decision beat the alternative and how I knew the result was right before accepting it. A failure fixed in the harness counts for more than the same failure retried.

- **The submission is the deployed state of the last commit pushed to `main`.** Due noon Monday 21 September 2026, with a fifteen-minute grace, so noon means 12:15pm. Nothing later counts. Ship early and treat `/ship` as repeatable.
- **Markers read the site as a prospective student, for about ten minutes.** The home page, a few non-adjacent weeks, an assessment, a deck. They generally do not build it, so the deployed site is the evidence.
- **They test conditions no test suite covers.** Chrome at 1920×1080 and 390×844, by keyboard alone: Tab order, arrow keys, Enter or Space. The top band is about holding up under use the site was not designed for, including a resize mid-interaction and a slow connection.
- **The artefact mark is about whether the site works.** Restyling does not earn it. Keeping the starter's appearance can still reach the top band if the course itself reads as coherent.

## 2 The Course

SLOP3092, *Try Again, Later*. One decision, asked in a new situation every week: something failed, should you try again, and how? The obvious answer is often wrong, because retrying looks like diligence and can make things worse without anyone noticing. Twelve weeks carry twelve situations, which is a different thing from twelve topics.

The promises below are decisions about this course. `spec/course-promises.test.ts` enforces them; this section says why they exist.

- **Every session declares a `failure_scenario`.** One concrete sentence naming the specific failure that week is built around: "an HTTP client retries a request that already succeeded server-side" instead of "reliability". The field is this course's own convention, so the check is the only thing enforcing it.
- **No two weeks name the same failure scenario.** A repeated situation is the repetition the brief warns against.
- **Every session declares `decided_by`, and all six values are in use.** `client`, `library`, `platform`, `operator`, `product`, `nobody`. Naming who owns the decision is half of what the course teaches. Weeks 11 and 12 are the only holders of `nobody` and `product`, so either one drifting fails the check.
- **Tags name this course's slice.** A tag built from a broad signal word — `systems`, `engineering`, `reliability`, `resilience`, `computing`, `architecture` — claims territory the twelve weeks do not cover.
- **An assessment falls due inside the week it claims.** On or after that week's session, and before the next week's. An assessment pointing at a week with no session is a scheduling error.

## 3 Working Practices

- **Write the plan down before building.** Not for the marker: so there is something to argue with, and something the finished work can be checked against. It states the response, the scope wall, and what is deliberately out.
- **Review the plan adversarially before building.** Ask what is ambiguous, what was assumed, what is missing, and which choice the spec requires as against merely prefers. Then ask for the weaknesses and the alternatives by name, and for what each alternative would have made harder. Agreement is not review: "you're absolutely right" means the prompt left no room for a disagreement to surface, so put the case against the plan and answer it. This is the last point at which changing a decision is an edit to a plan file rather than a rewrite of finished work.
- **Correct a wrong premise before acting on it.** If an instruction contains a factual error, say so first and work from the corrected version. Building quietly on the mistake buries it in the result.
- **Build the slice the plan describes, and stop there.** Arguing with the plan settles what to build, and then nothing holds that line during the work. Unrequested extras are drift even when they improve something, so propose them separately.
- **Keep output pristine.** Leave no ignored errors, warnings or backtraces in logs.
- **Never rewrite the spec to match the build.** A disagreement between the two is a decision to flag; resolving it quietly as a diff hides the decision.
- **Reach for the smallest recovery that works.** `Esc` interrupts, `/rewind` undoes in-session, `git revert` undoes a commit.

## 4 Writing the Course

- **Retrying is a decision about state you cannot observe.** A timeout does not tell you whether the server already committed. The course does not describe that as a purchase or an exchange, so `cost`, `trade`, `price`, `buys` and `spends` are retired from the site's prose, and `spec/week-distinctness.test.ts` enforces their absence. The engineering limits those words used to carry are still stated, as facts about mechanism: backoff delays requests that were about to succeed, an open breaker refuses calls that would have worked, a deadline discards work that was nearly finished.
- **Write plainly and specifically.** Concrete numbers, endpoints, error codes and durations are wanted. The register to avoid is the performing one: the `X, not Y` antithesis used as a template, a bare aphorism serving as a heading or a closer, three clauses built to a beat, and a double negative standing in for a conclusion. Be an engineer about it.
- **One idea, carried the whole way, and legible from outside.** A page that would sit equally well in a different course is not finished. The thesis existing is not sufficient: a reader who sees the home page and one week should be able to say what the course argues without assembling it themselves.
- **Carry the idea through structure.** If a page needs a long stretch of prose to land its point, the structure is not doing the work. A reader should meet the argument in pieces while moving through the site. This rule and the one above it restate Assignment 1 tutor feedback; `git log -S` finds the original wording at `dae225f` and `9d990cd`.
- **Weeks are read side by side.** Before writing a week, read the ones it will be opened next to. Two weeks that could be swapped without anyone noticing are a defect.
- **Cohering the pieces is the work.** The agent produces content-shaped chunks, and making twenty-odd pages agree on the thesis, the voice, the names and the dates is the part it cannot do. Every page can be defensible while the course drifts out of focus, and nothing in the build measures that, so re-read the site end to end from time to time.
- **No catalogue filler.** Prose that could describe any course ("students will gain a comprehensive understanding of…") is a defect. The site should read in one voice with a point of view.
- **Fetch every fact from its source, and say which source.** A date, a figure, an outage, the order things happened in. A confabulated detail arrives fluent and confident, and an invented incident or citation that reads as real does more damage than an honest omission, particularly in a course resting on things that really happened.
- **Ground "today" in the machine clock.** Run `date +%Y-%m-%d` before reasoning about the twelve weeks, a due date or the deadline.
- **Every curricular decision has to be visible on the site.** There is no separate syllabus document. A decision that is not on a page was not made.
- **Save a generated image the moment you make it.** The course key's image allowance runs for the semester and the returned URLs expire, so download the file into the repo, record where it came from in `docs/images.md`, and commit it.

## 5 Verification

- **Check the baseline first.** Run `pnpm check` before changing anything, so a later failure is known to belong to the change. Some of this repo's baseline is red on purpose, being checks waiting on content that does not exist yet, so read what is failing before assuming red was inherited.
- **Return the evidence itself.** Drive the page in a real browser instead of reasoning about it from source, and produce the screenshot, console output, response body, DOM state, numbers or exit code. "The form submits correctly" is not verification when the observed response is `{"error":"unknown port"}`.
- **The screenshot and the console fail independently.** A perfect screenshot can sit on top of a 404, a failed parse and placeholder values. Read both; neither one alone counts as verified.
- **Verify the deployed site.** `ASTRO-DEV-TOOLBAR` in the tab order means the dev server got tested by mistake, and `astro preview` may run on a different port if 4321 is busy, so read the printed port from `astro preview logs`. A correct preview is still not the deployment, so open the live URL.
- **Reproduce before fixing.** For a bug found by hand, add a failing test first, confirm it fails for the right reason, then fix.
- **A passing suite establishes only what it checks.** The axe sweep in `pnpm build` is one automated pass, and it reuses cached results for unchanged pages, so read how many pages it actually re-checked before quoting the number. Coherence, and whether the thing is worth having, need a person: before calling a change done, show it to someone who has not seen it.

## 6 Sensors and Checks

- **Ask whether a person is needed before writing a check.** "Exactly one top-level heading" is mechanical; "make it look good" needs a reader. A check for something only a person can settle is theatre, and deciding which is which is the third question `PROCESS.md` has to answer.
- **Write the sensor before the change.** When a judgement is worth keeping, encode it as a check first and then make the work pass it. The contract then outlives the edit and rejects later drift on its own.
- **Write the assertion so it can only pass for the right reason.** Assert that the thing is used, because a forbid-only check is satisfied by an empty page. Give a compound promise one assertion per claim, or it passes on the easy half. Name the offending value in the message, so a failure says what to go and look at.
- **Say what changed in order to make a check pass.** A constraint satisfied is not the same as the work improved, and whatever the edit gave up is invisible in a green run.
- **Expect a check to become the target.** The spec is the measure and the agent is the optimiser, so the most mechanical criterion is the easiest one to satisfy hollowly: twelve weeks can hold twelve distinct failure scenarios and still be twelve shallow weeks. Ask what the check would let through as well as what it would catch.
- **Say what a sensor does not cover.** A check that states its blind spots can be trusted; one that implies it proves more than it does cannot.
- **Treat a red check as correct until proven otherwise.** Read it before changing anything. Update a check when the contract it encodes has genuinely changed, and never weaken one to fit output you did not intend.
- **Repair or remove a check that stays red without being actionable.** A check that never turns green teaches everyone to ignore it.
- **Confirm the failure a check describes can actually reach it.** If the build, the schema or the type checker already rejects that state, the test only ever reports green.
- **A browser tool that does not respond is evidence to investigate.** Check the tool's own assumptions against the page's actual behaviour before believing a red result.
- **Treat `.github/workflows/` as harness.** Edit it only to restore a check that drifted from the initial commit's intent, and diff against that commit first.

## 7 Git and CI

The pre-commit hook is the sensor that matters for secrets: CI's scan only sees a key once it has already been pushed.

Shipping makes the whole repo public, not just the site. Source, commit history, CI logs and this file are all readable, so write every commit message and every rule here for someone outside the course.

- **Commit small and often, and say why in the message.** The commit trail is evidence of process, and a single dump before the deadline is the weakest version of it. The diff shows what changed; the message is the only place the reason survives.
- **Commit only on green, then push immediately.** Stage files by name and read the CI run afterwards, because a local green is not a green deploy. The one exception is a check written ahead of the thing that satisfies it: those are red on purpose, and the message says which and why.
- **Never rewrite history.** No force pushes, no amending what is already pushed, no tidying a mislabelled commit away. Correct it in the next commit. The log should show the mistakes too.
- **Read a red CI run properly.** `gh run watch`, then `gh run view --log-failed`, so the agent gets the actual failing command, its output and expected-versus-actual instead of "the build failed".
- **Only put a number in a commit message you have just measured.** Word counts, file sizes, test counts: read them from the command output in the same step as writing the message. A predicted number is a claim the repository quietly contradicts.
- **Commit the updated lockfile after any dependency change.** CI installs with `--frozen-lockfile`, so a stale `pnpm-lock.yaml` breaks the build there even though it works locally.

## 8 PROCESS.md

This is the assignment's whole written account. `reflections/` is unused here, and `check:evidence` expects no reflection file in this repo.

- **400 to 600 words, one narrative.** A first-person account of getting from the brief to the harness and the workflow, as against a run of fixes with a commit hash apiece.
- **Write each moment in STAR form, weighted.** Situation 20%: the specific difficulty, not the general state of things. Task 10%: what had to be achieved, where a target I set myself says more than one handed to me. Action 60%: what I did, why I did it, and what the alternatives were. Result 10%: the outcome, measured where it can be, and what I learned. The weighting is the rule. An even split recounts events, and putting most of the words on my own actions and the alternatives I rejected is what makes a capability visible. Name the method as well as its outcome.
- **Its spine is three questions.** What I decided a good course looks like; which of those decisions became a rule here or a check in `spec/`; and which I deliberately left to human judgement.
- **Say why this course should exist.** Sincere, speculative or satirical are all allowed, and the reason is a stated requirement of the brief.
- **Cite the discarded work too.** A deletion, a reverted commit, a rule added and then cut: judgement shows there, and the top band asks for it. Successes alone read as a clean run that never happened.
- **Carry one identifiable turning point, with a before and after.** The week 7 retrospective is built from this file and asks for the specific change that made the assignment click, so the moment has to be findable here.
- **Cite commits inline, as links whose text is the hash or range.** An uncited claim is discounted, and markers follow citations instead of hunting the repo for material nobody pointed at.
- **Do not narrate past the evidence.** Filenames, dates, diffs and counts are evidence; a label for a phase, or a claim about what the work proves, is interpretation. Notice the seam where the citations stop and the story starts.
- **Check the rendered file on GitHub before shipping.** Images need relative paths and nothing verifies that they render.

## 9 Markdown

- Follow `markdownlint` except `MD013`, and keep each prose paragraph on a single line. A hard-wrapped rewrap diffs every line and buries the sentence that changed.
- After creating or modifying Markdown files, run `markdownlint-cli2 --config ~/.markdownlint-cli2.yaml` on the changed files and fix everything it reports.
- **Number document subheadings, and set them in Title Case.** `## 1 Heading Level 2`, then `### 1.1 Heading Level 3` beneath it, so a section can be cited by number instead of by quoting its title. The `# Title` itself is not numbered. Capitalise the principal words, leaving articles, conjunctions and prepositions of three letters or fewer in lower case unless one leads. This applies to documents: `CLAUDE.md`, `PROCESS.md`, `docs/`. It never applies under `src/`, where a session's headings and a deck's slide titles are the site's own prose and the numbering would read as a form.

## 10 Maintaining This File

- **Remove what is stale instead of writing a correction beside it.** Note what you learn as you go, and delete anything here the moment it is contradicted. This file says what is true now, and Git keeps the history.
- **Only what is short and always true belongs here.** A decision that applies to one session belongs in the prompt. Copying it up here makes it outlive the situation that justified it.
- **A recurring correction belongs in a sensor or a skill.** Write a check when the lesson is deterministic, a skill when it is a procedure worth reusing, and lengthen this list only when it is neither.
