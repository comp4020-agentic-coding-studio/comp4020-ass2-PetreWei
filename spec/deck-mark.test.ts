import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Every deck signs off with the course mark, so the list is derived from the
// decks that exist rather than hardcoded: a sixth deck added without the mark
// should fail this, not pass by omission.
const deckSlugs = readdirSync(resolve("src/decks"))
  .filter((file) => file.endsWith(".deck.mdx"))
  .map((file) => file.replace(/\.deck\.mdx$/, ""))
  .sort();

const markup = new Map(
  deckSlugs.map((slug) => [slug, readFileSync(resolve("dist/decks", slug, "index.html"), "utf8")]),
);

// The one slide class in astro-theme-university's deck.css that runs edge to
// edge. Captures the slide's own markup so every other assertion is scoped to
// it, not satisfied by something elsewhere on the page.
const LOGO_SLIDE = /<section[^>]*\bclass="[^"]*\blogo-slide\b[^"]*"[^>]*>([\s\S]*?)<\/section>/g;

// The crest's own grid pitch, measured off astro-theme-slop's slop-crest.svg
// (the spacing of its three steam plumes). The mark's second impression is
// offset by exactly this, which is what makes it the same drawing language
// rather than an arbitrary nudge.
const CREST_PITCH = "4.535";

describe("the course mark on the decks", () => {
  it("finds a deck to check at all", () => {
    expect(deckSlugs.length, "no .deck.mdx files under src/decks").toBeGreaterThan(0);
  });

  for (const slug of deckSlugs) {
    describe(slug, () => {
      const slides = () => Array.from(markup.get(slug)!.matchAll(LOGO_SLIDE), (match) => match[1]);

      it("signs off on exactly one full-bleed mark slide", () => {
        expect(slides().length, "expected one `logo-slide` section in this deck").toBe(1);
      });

      // Assert the theme's contract is actually driving the mark, not merely
      // that the slide exists: .logo-svg does the full-bleed sizing, and
      // .logo-group and the two rules are the classes deck.css animates. A
      // mark that renders without them is a mark the theme isn't carrying.
      it("hands the mark to the theme's own classes", () => {
        const [slide = ""] = slides();
        for (const hook of ["logo-svg", "logo-group", "logo-rule-top", "logo-rule-bottom"]) {
          expect(slide, `the mark slide never uses \`${hook}\``).toContain(hook);
        }
      });

      it("takes its colour from the brand tokens, not a copied hex", () => {
        const [slide = ""] = slides();
        expect(slide).toContain("var(--at-primary)");
        expect(slide).toContain("var(--at-secondary)");
        // slop.css owns these values. A literal here is a second copy that
        // stops tracking the brand the moment the package changes.
        expect(slide).not.toMatch(/#b97d1c|#8a5c13/i);
      });

      it("offsets the second impression by the crest's grid pitch", () => {
        const [slide = ""] = slides();
        expect(slide, `the doubled impression isn't offset by ${CREST_PITCH}u`).toContain(CREST_PITCH);
      });

      // The slide carries no text, so the SVG's own accessible name is the
      // only thing a screen reader has to go on. axe's svg-img-alt wants a
      // <title> under role="img"; asserting both means a future edit can't
      // quietly drop one and stay green.
      it("names itself for a screen reader", () => {
        const [slide = ""] = slides();
        expect(slide).toContain('role="img"');
        expect(slide).toMatch(/<title[^>]*>[^<]+<\/title>/);
      });
    });
  }
});
