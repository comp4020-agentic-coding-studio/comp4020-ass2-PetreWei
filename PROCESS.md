# Process overview

## 1 What I built

SLOP3092 *Try Again, Later*: twelve weeks on one decision, asked in a new context each week — something failed, should you try again, and how? It should exist because retrying is the commonest response to failure and the least examined: it looks like diligence, and retrying what the server already committed charges twice.

## 2 How I got here

### 2.1 What I decided a good course looks like, and who checks it

Twelve weeks means twelve situations, not twelve topics; `spec/` is where that stops being a slogan.

- **Situation.** The obvious shape is escalating complexity, every systems course's shape, so it argues nothing.
- **Task.** Choose a structure that argues something, and put the promises where violations fail the build.
- **Action.** I planned all twelve weeks before writing any ([`79ab4e6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/79ab4e6)): five structures compared, four rejected with reasons. Escalation lost because by week 8 it drifts into the distributed-systems territory my own tag check refuses. Every session carries the same slots, so any two compare at a glance. Three became checks ([`bc5a4be`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/bc5a4be)): twelve dated weeks, a distinct `failure_scenario` per session, narrow tags. A fourth ([`805be48`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/805be48)) asserts the closed `decided_by` vocabulary in two halves, since presence alone passes twelve weeks that all ask the client.
- **Result.** Nine checks, each confirmed to fail for the right reason — collapsing week 11 reports `no week hands the decision to: nobody`.

### 2.2 The turning point: an inherited harness, not the generated one

The turning point was inheriting a harness instead of patching the generated one, then hardening it against a subagent that pushed to `main`. A line in `CLAUDE.md` is not a control.

- **Situation.** Two things governed the agent: the `CLAUDE.md` it generated, and whatever my prompt said. I trusted both.
- **Task.** Get the rules no check can hold from somewhere better than my first draft.
- **Action.** I replaced it with the previous crit's harness, unedited ([`9c25807`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/9c25807)), then adapted it from the lecture notes and the tutor's feedback, including the STAR form used here ([`dae225f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/dae225f)). When a subagent told not to edit anything committed to `main` and pushed ([`b458a90`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/b458a90)), I constrained subagents structurally, not by instruction ([`d47ded0`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/d47ded0)): the prompt was never the control, since one inherits Bash, while `Explore` has no Write and a worktree keeps commits off `main`. Then I cut that rule ([`da3c8cf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/da3c8cf)).
- **Result.** The diff settled the first: most of what I was patching re-derived the inherited file's rules. `git status` caught the second, not the subagent's report. The artefact is replaced each deliverable; the harness accumulates.

### 2.3 What no check could catch

Reading the twelve weeks side by side found what eight green checks could not.

- **Situation.** The checks were green and the weeks written, but a marker opens non-adjacent ones side by side.
- **Task.** Read them that way myself and fix what only a reader sees.
- **Action.** Every lecture body was its session's sentences pasted verbatim ([`be38af6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/be38af6)). Worse, eleven of twelve priced the naive retry but not the fix — the course committing the reflex it criticises — so I revised the plan, not the pages ([`dbb17b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/dbb17b6)): every session gained a fifth slot, the fix and what it trades. Two weeks were one idea twice; merging them freed a slot the course needed. The same argument shaped the policies ([`e654924`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/e654924)): late penalties escalate for the reason a retry backs off. Code review caught two image savings I had called free ([`1d9f4fa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/1d9f4fa)).
- **Result.** Twelve weeks that argue one thing; whether they add up is the marker's call, so I re-read the site end to end.
