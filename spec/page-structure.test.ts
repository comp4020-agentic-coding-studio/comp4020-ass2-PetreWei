import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// A deck page is astromotion's HTML, not this site's: one `<h1>` per slide is
// that format's structure, so decks are out of scope for the heading rules
// below.
const pages = globSync("dist/**/*.html")
  .filter((page) => !page.includes("/decks/"))
  .sort();

// Markdown headings carry a `#` permalink the theme appends inside the
// heading itself (`a.at-heading-anchor`), so drop that element whole rather
// than only its tags — otherwise the anchor's own text joins the title.
const headings = (html: string): string[] =>
  [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map((match) =>
    match[1]
      .replace(/<a\b[^>]*class="[^"]*at-heading-anchor[^"]*"[^>]*>.*?<\/a>/gs, "")
      .replace(/<[^>]*>/g, "")
      .trim(),
  );

// What each page is entitled to call itself, taken from its own frontmatter:
// `heroTitle` for the MDX landing pages, `title` for the ones built from
// `ContentLayout`, and the literal `#` heading `/policies/` writes in its body.
// Asserting the text, not merely that some `<h1>` exists, is what stops this
// passing on a heading that belongs to a card or a grid.
const landingPages: Record<string, string> = {
  "dist/lectures/index.html": "Lectures",
  "dist/sessions/index.html": "Labs",
  "dist/assessments/index.html": "Assessments",
  "dist/people/index.html": "People",
  "dist/policies/index.html": "Policies and support",
};

describe("page structure", () => {
  it("finds pages to check", () => {
    expect(pages.length, "no built pages found — has `astro build` run?").toBeGreaterThan(20);
  });

  it("gives every page exactly one top-level heading", () => {
    for (const page of pages) {
      const found = headings(readFileSync(resolve(page), "utf8"));
      expect(found.length, `${page} has ${found.length} <h1>: ${JSON.stringify(found)}`).toBe(1);
    }
  });

  it("names each section landing page with its own title", () => {
    for (const [page, expected] of Object.entries(landingPages)) {
      const found = headings(readFileSync(resolve(page), "utf8"));
      expect(found, `${page} should be headed "${expected}"`).toEqual([expected]);
    }
  });
});
