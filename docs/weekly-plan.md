# Weekly plan: SLOP3092 *Try Again, Later*

The plan the site gets built against, written before the content so there is something to argue with and something to check the finished thing against. It records the alternatives that lost, because the reasons they lost are what the plan is.

## 1 The response

Twelve weeks, one question: something failed — should you try again, and how? The course exists because retrying is the most common response to failure and the least examined one. It looks like diligence. A client that retries a request the server already committed is how one charge becomes two, and nobody writes that retry believing they are doing harm. So the course is twelve situations rather than twelve topics, and the recurring finding is that the obvious answer is often wrong.

## 2 Candidates, and why four of them lost

**A. Escalation by mechanism.** One request, then many clients, then classification, then people, then irreversibility. The natural teaching order, and each week needs the one before it. It lost as an organising principle because escalating complexity is the default shape of every systems course, so it expresses nothing about this course's claim — and because it drifts: by week 8 the material is distributed-systems reliability, which is territory the tag rule refuses and twelve weeks cannot cover.

**B. Organised by what retrying costs.** Money, load, latency, trust, safety, attention. The thesis sits in the axis itself: retrying always costs something. It lost because the categories blur — money, trust and attention are not separable enough to carry a week each — and because sorting by cost produces twelve essays where the brief asks for twelve situations.

**C. Organised by who decides.** The client, the library, the platform, the operator, product, nobody. The strongest anti-listicle move available, because it reframes retrying as a question about authority rather than about code. It lost as the primary axis for two reasons: there are only about six distinct deciders, so twelve weeks means doubling up, and it puts abstraction in week 1, before a student has watched a single retry go wrong.

**D. Twelve real incidents.** Each week a documented outage, read as a case. Concrete, and it would satisfy the rule about fetching facts rather than recalling them. It lost on feasibility that is really an integrity problem: twelve verifiable retry-caused incidents, sourced accurately, is not work this assignment has room for, and a fictional university citing real outages imprecisely is exactly the confabulation the harness exists to prevent. It also makes the course about history rather than about the decision.

**E. The plan below.** A's order, because teaching needs it. B's axis as a visible per-week coordinate, because it makes two weeks comparable. C's question as the closing move of every week, so authority accumulates instead of being week 1's abstraction.

## 3 The case against the chosen plan

**Markers read non-adjacent weeks, so an order that only works in sequence does not work.** This is the objection that shaped the plan. A reader landing on weeks 3 and 9 has to see the shape without reading the ten weeks between. The answer is that every session page carries the same four short slots — the situation, the naive retry, what it costs, who decides — so any two weeks read side by side show the sameness of the question and the difference of the answer immediately. The structure is the argument, which is also the answer to the tutor's note that a page should not have to be read before it makes sense.

**Twelve pages with identical headings read as a template, and a template reads as generated.** Real risk, and the mitigation is thin: keep the slots short, vary the prose between them, and accept that structural repetition is defensible here specifically because the course's claim is that it is the same question in a new context. If the built pages read as a form rather than as an argument, the slots go and the plan was wrong.

**The uniqueness checks would pass on twelve shallow weeks.** Twelve distinct `failure_scenario` values and twelve distinct lead costs are satisfiable without any week being worth attending. No check fixes this. It is why the plan schedules a full end-to-end read before shipping, and why coherence stays a human judgement rather than becoming a test that pretends to measure it.

**Week 11 arguably sits outside the course's own subject.** Irreversible operations are about idempotence and compensation more than about retries. Kept, because "you cannot retry this" is a retry question and it is where the subject ends — a course should reach its own boundary rather than stop short of it.

**Week 9 has no code in it.** A session about an operator retrying a payout at 3am could be a section of another week rather than a week. Kept as a week because the mechanism is identical and the state lives in a spreadsheet instead of a queue, which is the point: the course's claim is about the decision, not about the runtime.

## 4 The calendar

Semester 1, 2027. Twelve teaching weeks from Monday 22 February, with a two-week break covering Easter — Easter Monday 2027 is 29 March, computed rather than recalled, so the break takes the weeks of 29 March and 5 April. Week 12's Friday is 28 May, which is exactly the `endDate` already in `src/course-config.ts`.

Week 5 has no Friday: Good Friday is 26 March. Nothing is scheduled into it.

## 5 The twelve weeks

Every session states the situation, the reflex, what it costs, the fix and what it trades, and who decides. `decided_by` draws on a closed vocabulary of six — `client`, `library`, `platform`, `operator`, `product`, `nobody` — and repeats deliberately: the same authority recurring in different guises is a finding, whereas a repeated situation would be the listicle the brief warns against.

| Wk | Monday | `failure_scenario` | What retrying costs | `decided_by` |
| --- | --- | --- | --- | --- |
| 1 | 22 Feb | A read times out, you retry once, it works | Nothing, this time — and that is how the reflex is learned | `client` |
| 2 | 1 Mar | A write times out after the server has already committed it | Money: one charge becomes two | `client` |
| 3 | 8 Mar | A retry loop with no delay meets a two-second blip | Load: you are now the outage | `library` |
| 4 | 15 Mar | Ten thousand clients retry on the same second | Recovery: the herd stops the service coming back | `platform` |
| 5 | 22 Mar | Three layers each retry three times | Twenty-seven requests for one click | `platform` |
| 6 | 12 Apr | A failed payout retried at 3am by two people on call | Two payouts, and no code was involved | `operator` |
| 7 | 19 Apr | A poison message and a `400`, neither of which can ever succeed | The queue itself, and a budget spent for nothing | `library` |
| 8 | 26 Apr | A dependency is down and every request still knocks | Your own latency budget, spent waiting | `platform` |
| 9 | 3 May | A request retried for ninety seconds after the caller gave up | Work nobody is waiting for, queued ahead of work somebody is | `client` |
| 10 | 10 May | Retries succeed and hide a dependency degrading for six weeks | The truth: a green dashboard and an eleven-second p99 | `platform` |
| 11 | 17 May | The email is already sent; the lock is already released | Everything, because there is no second attempt | `nobody` |
| 12 | 24 May | An outage where retrying was the cause, read end to end | The whole system | `product` |

Each week also gets a lecture whose title is a claim rather than a topic, so the lecture list reads as an argument. The lecture teaches the general mechanism; the session stays with the one situation.

## 6 The revision, after reading twelve weeks side by side

The table above is the second version. The first was built, pushed, and then read end to end as the plan requires — and the read found three things no check in `spec/` could have caught, which is the argument for keeping that read in the build order rather than trusting the suite.

**The thesis was only stated in week 12.** The course argues that retrying is a trade, and eleven of twelve sessions named the cost of the naive retry and then handed over a fix whose own price went unmentioned — reproducing the exact reflex the course criticises. Adding a fifth slot, the fix and what it trades, puts the argument on every page instead of the last one. This was the highest-leverage change available and it is why the four-slot structure was abandoned: Assignment 1's process mark was capped for a singular concept "not quite clear enough", and a thesis that surfaces once, in the final week, is that failure with a different cause. The three alternatives considered were leaving it in prose (invisible to a marker reading one week), splitting fix and trade into two slots (six slots reads as a form, tripping this plan's own kill-condition), and folding it into "who decides" (where it had been hiding, doing neither job).

**Weeks 6 and 7 were one insight in two containers.** A poison message and a `400` are both "this will never succeed, stop trying"; the first version taught them as separate weeks, and their own lecture bodies admitted it in the connective tissue. They are now one week, and the reclaimed slot went to a genuinely absent situation: a request retried long after the caller stopped waiting. Deadline propagation is the only bound in the course a caller can reason about in a unit — seconds — that the person waiting actually shares.

**Every non-code decider sat in the last four weeks.** Because markers read non-adjacent weeks, a reader landing anywhere in the first eight saw only `client`, `library` and `platform` and would have no reason to think this course was about anything but code. The operator week moved from 9 to 6, where it also breaks up a run of three consecutive `library` weeks and gives the post-break session a change of register. The new week 9 returns the decision to `client`, which weeks 1 and 2 established: the same authority, asked whether a retry is still wanted rather than whether it is safe.

Rejected in the same pass: restructuring into four acts of three, which fails for the same reason candidate A did — acts only pay off read in sequence. And a fuller rework that also folded backoff into the jitter week to buy a second new situation, which was declined because two double-bill weeks would make the promise ten situations and two topics.

## 7 Assessments

Three, summing to 100, each due inside the week it claims.

| Assessment | Week | Due | Weight | What it asks |
| --- | --- | --- | --- | --- |
| Retry audit | 4 | Fri 19 Mar 2027 | 25 | Find every retry in a small given codebase, and for each one say what it costs and who decided it |
| A retry policy you have to defend | 8 | Fri 30 Apr 2027 | 35 | Write the policy for a given service, then defend it against a reviewer briefed to argue the opposite |
| The case against retrying | 12 | Fri 28 May 2027 | 40 | Take a failure and argue for not retrying, and say what you would measure to know you were right |

The weights load the back of the semester on purpose: the course's actual skill is refusing to retry, and that is the last thing a student learns.

All three now require the trade to be named, not just the fix — the audit prices every change it proposes, the policy prices every mechanism it adopts, and the case is nothing but a trade argued. An assessment that asked only for a working fix would have marked students on the half of the thinking the sessions had stopped teaching.

## 8 The rest of the site

- **Home page.** The thesis in one paragraph, then the twelve situations as twelve scannable lines, each linking to its week. A reader meets the argument in pieces rather than reading a block of prose to reach it.
- **Deck.** One deck, built properly, for week 2 — the sharpest week and the one a marker is most likely to open. The starter's `week-01.deck.mdx` placeholder goes.
- **People.** The two existing entries rewritten to fit the course, with their starter portraits replaced by generated images saved into the repo the moment they are made.
- **Policies.** Written in the course's own voice: a resubmission is a retry, so the policy states its own backoff and its own limit. The policy page enacting the thesis is the cheapest available proof that the course is coherent rather than merely consistent.

## 9 What this adds to `spec/`

One check, if it survives review: `decided_by` is present on every session and drawn from the closed vocabulary, and every value in that vocabulary is used at least once. The second half is the part worth having — it forces the twelve weeks to cover the authority range instead of asking the client every time. The field is this course's own convention and the content schemas pass unknown keys through, so a test is the only thing that could ever enforce it.

Nothing else here becomes a check. Whether twelve weeks add up to a course stays a human judgement.

## 10 Scope wall

Out, deliberately: new content collections, restyling beyond what coherence requires (the artefact criterion is whether the site works, not how it looks), citations of real outages, and any week thirteen. Additions that occur to me mid-build get proposed separately rather than folded in.

## 11 Build order

1. The skeleton: twelve sessions with dates, `failure_scenario` and `decided_by`, and the three assessments replacing both placeholders. This turns all three deliberately-red spec checks green.
2. Weeks 1 to 5, sessions and lectures together.
3. Weeks 6 to 12, re-read against 1 to 5 before committing, since two weeks that could be swapped are a defect.
4. The week 2 deck, the two people, the images.
5. Home page and policies, then a full end-to-end read of the site.
6. Ship, then verify the live URL at 1920×1080 and 390×844, by keyboard alone.
