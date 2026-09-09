import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { code: string; tags: string[] };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

// Assigned to this repo when it was provisioned; only the level digit is ours to choose.
const ASSIGNED_DIGITS = "092";

describe("course promises", () => {
  it("keeps the three digits this repo was assigned", () => {
    expect(api.course.code.endsWith(ASSIGNED_DIGITS)).toBe(true);
  });

  it("runs across exactly twelve dated teaching weeks, one each", () => {
    const weeks = api.nodes.filter((node) => node.type === "sessions").map((node) => node.meta?.week);
    expect(new Set(weeks).size, "no week should be scheduled twice").toBe(weeks.length);
    expect(weeks.slice().sort((a, b) => (a as number) - (b as number))).toEqual(
      Array.from({ length: 12 }, (_, i) => i + 1),
    );
  });

  it("links at least one lecture to a deck that exists on disk", () => {
    const decked = api.nodes.filter(
      (node) => node.type === "lectures" && typeof node.meta?.slides === "string",
    );
    expect(decked.length, "no lecture links a deck via `slides`").toBeGreaterThan(0);

    const resolves = decked.some((node) => {
      const slug = (node.meta!.slides as string).replace(/^\/decks\//, "").replace(/\/$/, "");
      return existsSync(resolve("src/decks", `${slug}.deck.mdx`));
    });
    expect(resolves, "the linked deck's source file doesn't exist").toBe(true);
  });

  it("weights every assessment so the course sums to 100%", () => {
    const total = api.nodes
      .filter((node) => node.type === "assessments")
      .reduce((sum, node) => sum + (Number(node.meta?.weight) || 0), 0);
    expect(total).toBe(100);
  });

  // The course's actual promise: every week is the same question — something
  // failed, was retrying the right call? — asked about a different situation.
  // A `failure_scenario` frontmatter field per session is this course's own
  // convention, not part of the fixed content schema.
  it("names a distinct failure scenario every week, none repeated", () => {
    const sessions = api.nodes.filter((node) => node.type === "sessions");
    for (const node of sessions) {
      const failureScenario = node.meta?.failure_scenario;
      expect(
        typeof failureScenario === "string" && failureScenario.trim().length > 0,
        `${node.id} has no \`failure_scenario\` naming the week's situation`,
      ).toBe(true);
    }
    const failureScenarios = sessions.map((node) => node.meta?.failure_scenario);
    expect(new Set(failureScenarios).size, "two or more weeks name the same failure scenario").toBe(
      failureScenarios.length,
    );
  });

  // The other half of the same promise: the situation changes every week, but
  // the authority deciding is drawn from a closed set and recurs on purpose.
  // Both halves are asserted, because presence alone would pass on twelve weeks
  // that all ask the client — which is the shallow version of this course.
  it("hands the decision to one of six authorities, and uses all six", () => {
    const vocabulary = ["client", "library", "platform", "operator", "product", "nobody"];
    const sessions = api.nodes.filter((node) => node.type === "sessions");
    for (const node of sessions) {
      const decidedBy = node.meta?.decided_by;
      expect(
        vocabulary.includes(decidedBy as string),
        `${node.id} has \`decided_by: ${String(decidedBy)}\`, which is outside the closed vocabulary`,
      ).toBe(true);
    }
    const used = new Set(sessions.map((node) => node.meta?.decided_by));
    const unused = vocabulary.filter((value) => !used.has(value));
    expect(unused, `no week hands the decision to: ${unused.join(", ")}`).toEqual([]);
  });

  it("keeps every assessment due inside the teaching week it claims", () => {
    const weekStarts = new Map<number, Date>(
      api.nodes
        .filter((node) => node.type === "sessions")
        .map((node) => [node.meta?.week as number, new Date(node.meta?.date as string)]),
    );
    const assessments = api.nodes.filter((node) => node.type === "assessments");
    for (const node of assessments) {
      const week = node.meta?.week as number;
      const due = new Date(node.meta?.due as string);
      const weekStart = weekStarts.get(week);
      expect(weekStart, `${node.id} claims week ${week}, but no session is scheduled for it`).toBeDefined();
      if (!weekStart) continue;
      expect(due >= weekStart, `${node.id} is due before its own week ${week} begins`).toBe(true);
      const nextStart = weekStarts.get(week + 1);
      if (nextStart) {
        expect(due < nextStart, `${node.id} is due after week ${week + 1} has already begun`).toBe(true);
      }
    }
  });

  it("keeps its tags as narrow as the course actually is", () => {
    // Broad field-names a course could reach for instead of naming its own
    // narrow slice. Matching on these words (not fixed phrases) catches
    // "distributed systems", "reliability engineering", "fault-tolerant
    // computing" and other phrasings of the same overreach.
    const broadSignalWords = ["systems", "engineering", "reliability", "resilience", "computing", "architecture"];
    for (const tag of api.course.tags) {
      const words = tag.toLowerCase().split(/\s+/);
      expect(
        words.some((word) => broadSignalWords.includes(word)),
        `tag "${tag}" reaches for a broad field name instead of this course's own slice`,
      ).toBe(false);
    }
  });
});
