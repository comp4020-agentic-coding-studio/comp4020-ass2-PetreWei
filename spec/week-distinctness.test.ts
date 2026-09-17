import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Read the sources rather than dist/api/index.json: these assertions are about
// the markdown a writer edits, and two of them cover `src/pages/` and
// `src/decks/`, which are not collections and so never reach the course API.

const SESSION_DIR = "src/content/sessions";
const PROSE_DIRS = ["src/content", "src/decks", "src/pages"];
const PROSE_EXTENSIONS = [".md", ".mdx", ".astro"];

// The one heading allowed to repeat across weeks. Every other heading argues
// something specific to its week; this one only tells a student where the
// practical work starts, so a predictable label is worth more than variety.
const SHARED_HEADING = "## In the lab";

const walk = (dir: string): string[] =>
  readdirSync(resolve(dir)).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(resolve(path)).isDirectory()) return walk(path);
    return PROSE_EXTENSIONS.some((ext) => entry.endsWith(ext)) ? [path] : [];
  });

const sessionFiles = walk(SESSION_DIR).filter((path) => path.endsWith(".md")).sort();
const read = (path: string) => readFileSync(resolve(path), "utf8");

// Everything after the closing frontmatter fence.
const bodyOf = (source: string) => source.split(/^---$/m).slice(2).join("---");

const headingsOf = (source: string) =>
  bodyOf(source)
    .split("\n")
    .filter((line) => /^## \S/.test(line))
    .map((line) => line.trim());

describe("weeks are distinguishable", () => {
  it("gives every week at least five headings of its own", () => {
    expect(sessionFiles.length, "no session files found").toBe(12);
    for (const path of sessionFiles) {
      const headings = headingsOf(read(path));
      expect(
        headings.length,
        `${path} has ${headings.length} \`##\` headings; a week needs at least five`,
      ).toBeGreaterThanOrEqual(5);
    }
  });

  it("writes each week's headings in that week's own terms", () => {
    const seen = new Map<string, string>();
    for (const path of sessionFiles) {
      for (const heading of headingsOf(read(path))) {
        if (heading === SHARED_HEADING) continue;
        const firstSeenIn = seen.get(heading);
        expect(
          firstSeenIn,
          `${path} and ${firstSeenIn} share the heading "${heading}"; only "${SHARED_HEADING}" may repeat across weeks`,
        ).toBeUndefined();
        seen.set(heading, path);
      }
    }
  });

  // A forbid-only assertion, and it is paired with the two above on purpose:
  // on its own it would be satisfied by a blank page. It also cannot judge
  // whether the replacement prose is any good — that stays a reader's job.
  //
  // `budget` and `worth` are deliberately absent from this list. A retry
  // budget is week 5's actual mechanism, and the assessments legitimately say
  // what each one is worth in marks; banning either would make this check
  // wrong rather than strict.
  it("keeps the retired transaction vocabulary out of the course's prose", () => {
    const retired = [
      "cost",
      "costs",
      "costly",
      "trade",
      "trades",
      "traded",
      "price",
      "priced",
      "bought",
      "buys",
      "spends",
      "afford",
    ];
    const pattern = new RegExp(`\\b(${retired.join("|")})\\b`, "i");

    for (const path of PROSE_DIRS.flatMap(walk).sort()) {
      const lines = read(path).split("\n");
      lines.forEach((line, index) => {
        const match = pattern.exec(line);
        expect(
          match?.[1],
          `${path}:${index + 1} says "${match?.[1]}" — retrying is not a transaction, so this vocabulary is retired: ${line.trim()}`,
        ).toBeUndefined();
      });
    }
  });
});
