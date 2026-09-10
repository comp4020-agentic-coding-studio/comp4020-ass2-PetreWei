# Process overview

## 1 What I Built

SLOP3092 *Try Again, Later*: twelve weeks on one decision, asked in a new context each week — something failed, should you try again, and how? It should exist because retrying is the commonest response to failure and the least examined: it looks like diligence, and retrying what the server already committed charges twice.

## 2 How I Got Here

### 2.1 What I Decided a Good Course Looks Like, and Who Checks It

Twelve situations, not twelve topics — and `spec/` is where that stops being a slogan.

- **Situation.** The build passes whatever content it is given: nothing in it tells a coherent course from twelve unrelated weeks.
- **Task.** Choose a structure that argues something, and put the promises where violations fail the build.
- **Action.** I planned all twelve weeks before writing any ([`79ab4e6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/79ab4e6)): five structures compared, four rejected. Escalation lost because by week 8 it drifts into distributed-systems territory my own tag check refuses. Every session carries the same slots, so any two compare at a glance. Three became checks ([`bc5a4be`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/bc5a4be)): twelve dated weeks, a distinct `failure_scenario` per session, narrow tags. A fourth ([`805be48`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/805be48)) asserts the closed `decided_by` vocabulary in two halves: presence alone passes twelve weeks that all ask the client.
- **Result.** Nine checks, each confirmed to fail for the right reason — collapsing week 11 reports `no week hands the decision to: nobody`.

### 2.2 The Turning Point: An Inherited Harness, Not the Generated One

The turning point was inheriting a harness instead of patching the generated one, then hardening it against a subagent that pushed to `main`. A line in `CLAUDE.md` is not a control.

- **Situation.** The starter `CLAUDE.md` arrives empty on purpose, so the agent's own account of this repo governed it, plus unenforced prompt text.
- **Task.** Replace the generated file with rules worth keeping, and make a subagent's limits real, not stated.
- **Action.** I replaced the generated file with the previous crit's `CLAUDE.md`, taken verbatim ([`9c25807`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/9c25807)), then adapted it from the lecture notes and the tutor's feedback, including the STAR form used here ([`dae225f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/dae225f)). A subagent I had told not to edit anything committed to `main` and pushed ([`b458a90`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/b458a90)), so I stopped relying on instructions: `Explore` has no Write, and a worktree keeps a subagent's commits off `main` ([`d47ded0`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/d47ded0)). Then I deleted even that rule ([`da3c8cf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/da3c8cf)).
- **Result.** The diff showed most of the generated rules re-derived, worse, what the inherited file had. `git status` caught the push, not the subagent's report. The artefact is replaced each deliverable; the harness accumulates.

### 2.3 What No Check Could Catch

Reading the twelve weeks side by side found what eight green checks could not.

- **Situation.** Green says nothing about whether twelve weeks argue one thing, and by then every week was written.
- **Task.** Read them as a marker does, non-adjacent, and fix what only a reader sees.
- **Action.** Every lecture body was its session's sentences pasted verbatim ([`be38af6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/be38af6)). Worse, eleven of twelve priced the naive retry but not the fix — the course committing the reflex it criticises — so I revised the plan, not the pages ([`dbb17b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/dbb17b6)): every session gained a fifth slot, the fix and what it trades. Two weeks were one idea twice; merging them freed a slot the course needed. The same argument shaped the policies ([`e654924`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/e654924)): late penalties escalate for the reason a retry backs off. Code review caught two image savings I had called free ([`1d9f4fa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/1d9f4fa)).
- **Result.** Twelve weeks that argue one thing. Whether they add up is the marker's call, so I re-read end to end.
