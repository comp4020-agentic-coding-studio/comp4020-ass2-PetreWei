# Image provenance

Every image in this repo that is not part of the starter template was generated on 2026-09-10 with OpenAI `gpt-image-2.5-flare`, through the course API key, and downloaded into the repo in the same step that made it — the returned URLs expire, so an image that is not saved immediately is an image that has to be paid for twice.

All four share one prompt preamble, which is what makes the site read as one printed object rather than four unrelated pictures:

> Two-ink risograph print using only warm gold and black ink on warm off-white cream paper. Flat solid shapes, visible halftone grain, and deliberate slight misregistration where the two ink layers overlap. Bold, graphic, printmaking aesthetic. Absolutely no text, no letters, no numbers, no words anywhere in the image.

The misregistration is not decoration. Risograph printing goes wrong by laying the same image down twice, slightly out of line, which is the course's subject rendered in its own medium — so the house style and the thesis are the same idea.

| File | Subject | Delivered | Saved as |
| --- | --- | --- | --- |
| `src/assets/images/hero-home.avif` | One push-button pressed five times, each impression further out of register as it recedes | 1536×1024 | 2560×1086 AVIF, centre crop |
| `src/assets/images/card.png` | Three concentric rings of arrows chasing each other, each ring off-register with the one beneath | 1536×1024 | 1200×630 PNG, centre crop |
| `src/content/people/marisol-quaye.avif` | Three-quarter portrait, short cropped hair, round glasses | 1024×1024 | 800×800 AVIF |
| `src/content/people/idris-fenn.avif` | Front-on portrait, short beard, long hair tied back | 1024×1024 | 800×800 AVIF |

The first crop of the card and hero used sharp's `position: "attention"`, which cropped the card's outer ring off the top of the frame. Both were re-cropped from the saved raw files with `position: "centre"` — which is the reason the raws are worth keeping until a build has been looked at, rather than deleting them once the AVIF exists.

The two portraits are of invented people. They are stylised prints rather than photographs, which is the honest form for a fictional teaching team: nothing here should read as a photograph of a real person who could be looked up.
