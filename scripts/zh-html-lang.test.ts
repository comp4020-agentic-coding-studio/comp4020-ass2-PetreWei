import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { zhHtmlLang } from "./zh-html-lang.ts";

// The hook does real file I/O against a build output directory, so these
// tests build a scratch `dist/`-shaped directory rather than mocking the
// filesystem --- the thing worth checking is that it finds the right files
// on disk and leaves everything else untouched.
describe("zhHtmlLang", () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), "zh-html-lang-"));
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it("is a named astro integration", () => {
    expect(zhHtmlLang().name).toBe("zh-html-lang");
  });

  it("rewrites lang to zh-Hans only on pages under zh/, leaving other pages untouched", async () => {
    await mkdir(join(dir, "zh"), { recursive: true });
    await writeFile(join(dir, "zh", "index.html"), '<html lang="en"><body>你好</body></html>');
    await writeFile(join(dir, "index.html"), '<html lang="en"><body>hello</body></html>');

    const logger = { warn: vi.fn() };
    const done = zhHtmlLang().hooks["astro:build:done"];
    await done?.({
      pages: [{ pathname: "zh/" }, { pathname: "" }],
      dir: pathToFileURL(`${dir}/`),
      assets: new Map(),
      // @ts-expect-error -- only the fields the hook reads are supplied
      logger,
    });

    expect(await readFile(join(dir, "zh", "index.html"), "utf8")).toContain('<html lang="zh-Hans"');
    expect(await readFile(join(dir, "index.html"), "utf8")).toContain('<html lang="en"');
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it("warns and leaves the file alone when the expected lang attribute isn't found", async () => {
    await mkdir(join(dir, "zh"), { recursive: true });
    await writeFile(join(dir, "zh", "index.html"), "<html><body>no lang attribute here</body></html>");

    const logger = { warn: vi.fn() };
    const done = zhHtmlLang().hooks["astro:build:done"];
    await done?.({
      pages: [{ pathname: "zh/" }],
      dir: pathToFileURL(`${dir}/`),
      assets: new Map(),
      // @ts-expect-error -- only the fields the hook reads are supplied
      logger,
    });

    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(await readFile(join(dir, "zh", "index.html"), "utf8")).toBe(
      "<html><body>no lang attribute here</body></html>",
    );
  });
});
