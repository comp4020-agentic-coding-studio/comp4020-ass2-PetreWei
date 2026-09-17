# Image provenance

Every image in this repo that is not part of the starter template was generated with OpenAI `gpt-image-2.5-flare`, through the course API key, and downloaded into the repo in the same step that made it, because the returned URLs expire and an image that is not saved immediately has to be generated again. The hero, card and two portraits were generated on 2026-09-10; the eight weekly and assessment illustrations were generated on 2026-09-15, once every lecture, session and assessment collection gained an optional image field; the remaining seven weekly illustrations, covering every week the first pass had skipped, were generated later the same day.

All nineteen share one prompt preamble, which is what makes the site read as one printed object rather than nineteen unrelated pictures:

> Two-ink risograph print using only warm gold and black ink on warm off-white cream paper. Flat solid shapes, visible halftone grain, and deliberate slight misregistration where the two ink layers overlap. Bold, graphic, printmaking aesthetic. Absolutely no text, no letters, no numbers, no words anywhere in the image.

The misregistration is deliberate. A risograph fails by laying the same image down twice and landing the second pass slightly off the first, which is the same shape as the failure this course is about, so the house style illustrates the subject without anybody having to say so on the page.

| File | Subject | Delivered | Saved as | On disk |
| --- | --- | --- | --- | --- |
| `src/assets/images/hero-home.avif` | One push-button pressed five times, each impression further out of register as it recedes | 1536×1024 | 2560×1086 AVIF q72 | 195 KB |
| `src/assets/images/card.jpg` | Three concentric rings of arrows chasing each other, each ring off-register with the one beneath | 1536×1024 | 1200×630 JPEG q88, centre crop | 96 KB |
| `src/content/people/marisol-quaye.avif` | Three-quarter portrait, short cropped hair, round glasses | 1024×1024 | 800×800 AVIF q55 | 68 KB |
| `src/content/people/idris-fenn.avif` | Front-on portrait, short beard, long hair tied back | 1024×1024 | 800×800 AVIF q55 | 76 KB |
| `src/content/lectures/week-01.avif`, `src/content/sessions/01-reproducing-the-reflex.avif` | A boomerang mid-flight, curving back toward the open hand that threw it | 1024×1024 | 800×800 AVIF q55 | 41.0 KB |
| `src/content/lectures/week-02.avif`, `src/content/sessions/02-charging-twice-on-purpose.avif` | A rubber stamp striking the same receipt twice, the second impression landing just off the first | 1024×1024 | 800×800 AVIF q55 | 68.2 KB |
| `src/content/lectures/week-03.avif`, `src/content/sessions/03-becoming-the-outage.avif` | A single tap turned fully open, overflowing a basin faster than the drain can take it | 1024×1024 | 800×800 AVIF q55 | 75.7 KB |
| `src/content/lectures/week-04.avif`, `src/content/sessions/04-synchronising-a-herd.avif` | A tight cluster of identical alarm clocks, all ringing at the same moment | 1024×1024 | 800×800 AVIF q55 | 79.5 KB |
| `src/content/lectures/week-05.avif`, `src/content/sessions/05-counting-to-twenty-seven.avif` | A pressure gauge with its needle pinned into a red zone near the top of the dial | 1024×1024 | 800×800 AVIF q55 | 65.0 KB |
| `src/content/lectures/week-06.avif`, `src/content/sessions/06-two-people-one-payout.avif` | Two hands, each dropping an identical coin into the same slot at once | 1024×1024 | 800×800 AVIF q55 | 87.1 KB |
| `src/content/lectures/week-07.avif`, `src/content/sessions/07-telling-a-no-from-a-not-yet.avif` | An envelope caught between two mail slots side by side, one bricked shut, the other open | 1024×1024 | 800×800 AVIF q55 | 112.7 KB |
| `src/content/lectures/week-08.avif`, `src/content/sessions/08-watching-a-breaker-trip.avif` | An industrial circuit-breaker switch lever caught half-thrown | 1024×1024 | 800×800 AVIF q55 | 90.1 KB |
| `src/content/lectures/week-09.avif`, `src/content/sessions/09-retrying-into-an-empty-room.avif` | A telephone ringing on a desk in an empty room, its chair pushed back and empty | 1024×1024 | 800×800 AVIF q55 | 101.5 KB |
| `src/content/lectures/week-10.avif`, `src/content/sessions/10-reading-past-the-dashboard.avif` | A house of cards standing perfectly still on a table that is visibly tilting to one side beneath it | 1024×1024 | 800×800 AVIF q55 | 55.9 KB |
| `src/content/lectures/week-11.avif`, `src/content/sessions/11-finding-the-point-of-no-return.avif` | A row of dominoes with the last one already fallen, out of order ahead of the ones still standing | 1024×1024 | 800×800 AVIF q55 | 35.1 KB |
| `src/content/lectures/week-12.avif`, `src/content/sessions/12-arguing-the-case.avif` | A wooden signpost whose two blank arms are the same size and point in opposite directions | 1024×1024 | 800×800 AVIF q55 | 35.2 KB |
| `src/content/assessments/retry-audit.avif` | A magnifying glass held over a tangled knot of cord | 1024×1024 | 800×800 AVIF q55 | 83.1 KB |
| `src/content/assessments/retry-policy.avif` | A wax seal stamped twice onto the same document, the second impression doubled over the first | 1024×1024 | 800×800 AVIF q55 | 100.9 KB |
| `src/content/assessments/case-against-retrying.avif` | A gavel resting on a closed case file | 1024×1024 | 800×800 AVIF q55 | 56.0 KB |

The first crop of the card and hero used sharp's `position: "attention"`, which cropped the card's outer ring off the top of the frame. Both were re-cropped from the saved raw files with `position: "centre"` — which is the reason the raws are worth keeping until a build has been looked at, rather than deleting them once the final file exists.

The compression settings took three passes, and the middle one is the instructive failure. The first wrote the card as an unquantised PNG and the portraits as AVIF q72, which came to 1.5 MB across the three — the card alone was 1.2 MB, fifty times the starter image it replaced. The second pass cut that to 359 KB and recorded the saving as having no downside at all. Both halves of that claim turned out to be measurable:

- **The card's source encoding reaches the visitor.** The theme's `OpenGraph.astro` re-encodes whatever it is given at `width: 1200, format: "jpeg", quality: 70`, so the source encoding does propagate. Reproducing those exact settings: the PNG source delivered 67,712 bytes, the q88 JPEG source delivers 71,200 — which is the byte size of the built `dist/_astro/card.*.jpeg`. So the JPEG source sends a visitor 3.5 KB more on a card that only social scrapers ever fetch, and takes 154 KB out of every clone of the repo.
- **The portraits at q40 were not "indistinguishable".** The largest delivered variant is 768w against an 800×800 source, so there is essentially no downscale to hide compression in — the artefacts show at close to 1:1. Compared side by side at that size, q40 visibly muddies the halftone grain, and on a site whose whole visual argument is a risograph print, the grain is the thing that has to survive. They sit at q55 now, which delivers 54.7 KB against q72's 56.3 KB: within three percent of the quality ceiling for half the source weight.

The card is a JPEG rather than a PNG because the artwork is grainy rather than flat, which is the case PNG is worst at — quantised, it was still 250 KB.

The two portraits are of invented people. They are stylised prints rather than photographs, which is the honest form for a fictional teaching team: nothing here should read as a photograph of a real person who could be looked up.

All twelve weeks now carry an illustration, extending the first pass's five (2, 4, 5, 8, 12) to full coverage; each subject is still grounded in that week's own `failure_scenario` rather than a generic retry image, so no two weeks share a metaphor. Each weekly subject is generated once and saved twice: `sessions` and `lectures` are separate content collections that each resolve their own relative image paths, so the same AVIF bytes are copied into both directories under each collection's own filename rather than referenced across a directory boundary.

The second batch's week 10 image was regenerated once: the first attempt rendered its traffic-light subject with actual green ink, breaking the two-ink gold-and-black rule, and was caught by inspection before being saved into the repo. The subject was replaced with a house of cards on a tilting table, which carries the same "still standing, about to fail" idea without depending on colour to read.

Week 12's image was regenerated on 2026-09-18, for a different reason. Its first subject was a two-pan balance scale weighing one coin against a stack, which drew the course as an exchange of one good for another. That framing was wrong and has been removed from the writing, so the picture of it went as well. The replacement is a signpost with two blank arms of equal size pointing opposite ways, which is week 12's actual situation: every mechanism in the policy can be measured, the measurements point both directions, and none of them decides.
