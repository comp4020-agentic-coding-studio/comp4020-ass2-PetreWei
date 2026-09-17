# Process overview

## 1 What I Built

SLOP3092 *Try Again, Later*: twelve weeks on one decision, in a new situation each week — something failed, should you try again, and how? It should exist because retrying is the commonest response to failure and the least examined: it looks like diligence, and charges the customer twice when the server already committed.

## 2 How I Got Here

### 2.1 A Structure That Argues Something

- **Situation.** Twelve empty weeks and a build that passes whatever it is given. I needed a structure that argues something, with its promises where violations fail the build.
- **Action.** I planned all twelve weeks before writing any ([`79ab4e6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/79ab4e6)): five structures compared, four rejected, escalation lost because by week 8 it drifts into distributed-systems territory my tag check refuses. Three promises became checks ([`bc5a4be`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/bc5a4be)); a fourth ([`805be48`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/805be48)) splits the `decided_by` vocabulary in half, since presence alone passes twelve weeks that all ask the client.
- **Result.** Collapsing week 11 reports `no week hands the decision to: nobody`.

### 2.2 Which Rules Survived

- **Situation.** The starter `CLAUDE.md` arrives empty on purpose, so the agent's own account of this repo governed it.
- **Action.** I took the previous crit's version ([`9c25807`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/9c25807)) and adapted it from lecture notes ([`86ed47d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/86ed47d)) and tutor feedback ([`dae225f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/dae225f)) instead of generating rules, most of which were weaker copies. A subagent I had told not to edit anything committed to `main` and pushed ([`b458a90`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/b458a90)), so I stopped relying on instructions and removed its Write tool ([`d47ded0`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/d47ded0)), then deleted even that rule ([`da3c8cf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/da3c8cf)). The client twice called the survivors too long; the file went from 3397 words to 2588 ([`a2aeb97`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/a2aeb97), [`43812b0`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/43812b0)).
- **Result.** `git status` caught the push; the subagent's report did not.

### 2.3 The Turning Point

- **Situation.** Eleven of twelve weeks explained what the naive retry breaks and nothing about the fix. I decided the missing piece was that every fix is a trade, and made it structural ([`dbb17b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/dbb17b6)): a fifth slot on twelve sessions, a pricing requirement in three assessments ([`e654924`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/e654924)).
- **Task.** The client rejected the premise and the voice together: retrying is a decision about state you cannot observe, and the prose was performing.
- **Action.** The sensor went first, red on purpose ([`c3b4261`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/c3b4261)): five headings per session, no shared heading between weeks, a ban list of the retired words. Then nine commits against it ([`ad08e28...1595b2f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/compare/ad08e28...1595b2f)), `CLAUDE.md` last, because its maxims were where the cadence came from.
- **Result.** The vocabulary is gone from `src/`. I had enforced an organising idea nobody asked for across twelve weeks.

### 2.4 What the Build Could Not Check

- **Situation.** `pnpm check` covers 49 pages for accessibility and links, and says nothing about whether a page looks right or reads right.
- **Action.** The client drove the rendered site and found four defects. Nav links went missing between 640 and 960px, "Policies" from 915px down, because the theme hides the overflow scrollbar ([`6caee0d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/6caee0d)); the crest sat 17.9px off the content rule ([`cf19ef2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/cf19ef2)). A review at 390, 768 and 1440 found `/lectures/`, `/assessments/` and `/people/` rendering with no `<h1>` while every check stayed green ([`ddc4d5c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/ddc4d5c)). A per-deck course mark was judged useless and reverted with its sensor ([`f2c1410`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/f2c1410), [`7c961fb`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/7c961fb)). A Chinese reader called the first `/zh/` pass 生硬 and the second wrong in register — 处境 is a predicament, not a technical situation — so the third was written in 书面语 from the course's argument, not translated ([`fe2b12b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/fe2b12b), [`b3b0c1e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-PetreWei/commit/b3b0c1e)).
- **Result.** I had planned for one of the four. The other three I had called verified on a green suite.
