# Process overview

## What I built

SLOP3092 *Try Again, Later*: twelve weeks on one decision, asked in a new context each week — something failed, should you try again, and how? It should exist because retrying is the commonest response to failure and the least examined: it looks like diligence, and retrying what the server already committed turns one charge into two.

## How I got here

### What had to stay true, and who checks it

A course is a set of promises; I wanted mine written where they could fail.

- **Situation.** The platform checks the site builds, links resolve and pages pass axe — not whether the course is the one I designed.
- **Task.** Encode the course-design decisions that had to survive twelve weeks of agent-drafted content.
- **Action.** Three became checks before any content existed ([`bc5a4be`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/bc5a4be)): twelve dated weeks, a distinct `failure_scenario` per session, tags no broader than the course. `failure_scenario` is my own field, and that check alone enforces it. I threw away the tag blocklist — it catches only phrasings I thought of — for one matching signal words. I declined a ninth: the build already rejects a dangling `related:`, and a check that cannot fail is not a sensor. The `decided_by` check ([`805be48`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/805be48)) asserts two halves: presence alone passes twelve weeks that all ask the client.
- **Result.** Nine checks that name the file at fault, each confirmed to fail for the right reason.

### The turning point: an inherited harness, not the generated one

The turning point was inheriting a harness instead of patching the generated one, then hardening it against a subagent that pushed to `main`. Neither was about wording: a line in `CLAUDE.md` is not a control.

- **Situation.** The `CLAUDE.md` I started from was the agent's own description of this repo; patching it was the obvious move.
- **Task.** Get rules that hold across deliverables, not ones I re-derive each time.
- **Action.** I replaced it with the previous crit's harness, unedited ([`9c25807`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/9c25807)), then adapted it from the lecture notes ([`86ed47d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/86ed47d)) and the tutor's Assignment 1 feedback, including the STAR form used here ([`dae225f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/dae225f)). When a subagent told not to edit anything committed to `main` and pushed ([`b458a90`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/b458a90)), I reverted ([`dcef0d2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/dcef0d2)) and constrained subagents structurally, not by instruction ([`d47ded0`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/d47ded0)) — one inherits Bash, while `Explore` has no Write and a worktree keeps commits off `main`. Then I cut that rule too ([`da3c8cf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/da3c8cf)).
- **Result.** The diff settled it: most of what I was patching re-derived the inherited file's own rules. The artefact is replaced each deliverable; the harness accumulates.

### What no check could catch

Reading the twelve weeks side by side found what eight green checks could not, and left one thing I chose not to encode.

- **Situation.** The checks were green and the weeks written, but a marker opens non-adjacent ones side by side.
- **Task.** Read them that way myself and fix what only a reader sees.
- **Action.** Every lecture body was its session's sentences pasted verbatim ([`be38af6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/be38af6)). Worse, eleven of twelve weeks priced the naive retry but not the fix — the course committing the reflex it criticises. I revised the plan, not the pages ([`dbb17b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/dbb17b6)), every session gained a fifth slot, the fix and what it trades. Prose was rejected: invisible to a marker reading one week. Two weeks were one idea twice; merging them freed a slot the course needed. Code review then caught two image savings I had called free ([`1d9f4fa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/1d9f4fa)).
- **Result.** Twelve weeks that argue one thing; whether they add up is the marker's call, so I re-read the site end to end.
