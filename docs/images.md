# Image provenance

Every image in this repo that is not part of the starter template was generated on 2026-09-10 with OpenAI `gpt-image-2.5-flare`, through the course API key, and downloaded into the repo in the same step that made it — the returned URLs expire, so an image that is not saved immediately is an image that has to be paid for twice.

All four share one prompt preamble, which is what makes the site read as one printed object rather than four unrelated pictures:

> Two-ink risograph print using only warm gold and black ink on warm off-white cream paper. Flat solid shapes, visible halftone grain, and deliberate slight misregistration where the two ink layers overlap. Bold, graphic, printmaking aesthetic. Absolutely no text, no letters, no numbers, no words anywhere in the image.

The misregistration is not decoration. Risograph printing goes wrong by laying the same image down twice, slightly out of line, which is the course's subject rendered in its own medium — so the house style and the thesis are the same idea.

| File | Subject | Delivered | Saved as | On disk |
| --- | --- | --- | --- | --- |
| `src/assets/images/hero-home.avif` | One push-button pressed five times, each impression further out of register as it recedes | 1536×1024 | 2560×1086 AVIF q72 | 195 KB |
| `src/assets/images/card.jpg` | Three concentric rings of arrows chasing each other, each ring off-register with the one beneath | 1536×1024 | 1200×630 JPEG q88, centre crop | 96 KB |
| `src/content/people/marisol-quaye.avif` | Three-quarter portrait, short cropped hair, round glasses | 1024×1024 | 800×800 AVIF q55 | 68 KB |
| `src/content/people/idris-fenn.avif` | Front-on portrait, short beard, long hair tied back | 1024×1024 | 800×800 AVIF q55 | 76 KB |

The first crop of the card and hero used sharp's `position: "attention"`, which cropped the card's outer ring off the top of the frame. Both were re-cropped from the saved raw files with `position: "centre"` — which is the reason the raws are worth keeping until a build has been looked at, rather than deleting them once the final file exists.

The compression settings took three passes, and the middle one is the instructive failure. The first wrote the card as an unquantised PNG and the portraits as AVIF q72, which came to 1.5 MB across the three — the card alone was 1.2 MB, fifty times the starter image it replaced. The second pass cut that to 359 KB and claimed the saving was free. It was not, and both halves of the claim turned out to be measurable rather than arguable:

- **The card is not free, it is cheap.** The theme's `OpenGraph.astro` re-encodes whatever it is given at `width: 1200, format: "jpeg", quality: 70`, so the source encoding does propagate. Reproducing those exact settings: the PNG source delivered 67,712 bytes, the q88 JPEG source delivers 71,200 — which is the byte size of the built `dist/_astro/card.*.jpeg`. So the JPEG source costs a visitor 3.5 KB on a card only social scrapers ever fetch, and saves every clone 154 KB. That is a good trade, but it is a trade.
- **The portraits at q40 were not "indistinguishable".** The largest delivered variant is 768w against an 800×800 source, so there is essentially no downscale to hide compression in — the artefacts show at close to 1:1. Compared side by side at that size, q40 visibly muddies the halftone grain, and on a site whose whole visual argument is a risograph print, the grain is the thing worth paying for. They sit at q55 now, which delivers 54.7 KB against q72's 56.3 KB: within three percent of the quality ceiling for half the source weight.

The card is a JPEG rather than a PNG because the artwork is grainy rather than flat, which is the case PNG is worst at — quantised, it was still 250 KB.

The two portraits are of invented people. They are stylised prints rather than photographs, which is the honest form for a fictional teaching team: nothing here should read as a photograph of a real person who could be looked up.
