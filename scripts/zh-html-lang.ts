import { readFile, writeFile } from "node:fs/promises";
import type { AstroIntegration } from "astro";

// BaseLayout.astro (astro-theme-university) hardcodes `<html lang="en">` with
// no prop to override it, so every page --- including the `/zh/` pilot page
// --- builds as English per WCAG 3.1.1 and to every search engine. This
// can't be fixed by passing a prop: the theme is fixed and BaseLayoutProps
// has no `lang` field at all (confirmed by reading the theme's source).
//
// Patching the built HTML string is the cheapest correct fix: a static `lang`
// attribute only needs setting once, at build time, rather than on every
// page load via a runtime script. Warns rather than throws when the expected
// markup isn't found, so a future theme upgrade that changes this attribute
// fails loudly here instead of silently leaving `/zh/` pages mislabeled.
const EN_LANG_ATTR = '<html lang="en"';
const ZH_LANG_ATTR = '<html lang="zh-Hans"';

/** Rewrites `<html lang="en">` to `zh-Hans` on every built page under `/zh/`. */
export function zhHtmlLang(): AstroIntegration {
  return {
    name: "zh-html-lang",
    hooks: {
      "astro:build:done": async ({ pages, dir, logger }) => {
        const zhPages = pages.filter((page) => page.pathname.startsWith("zh/"));

        for (const page of zhPages) {
          const fileUrl = new URL(`${page.pathname}index.html`, dir);
          const html = await readFile(fileUrl, "utf8");

          if (!html.includes(EN_LANG_ATTR)) {
            logger.warn(`expected ${EN_LANG_ATTR} in ${fileUrl.pathname}, found none --- left unchanged`);
            continue;
          }

          await writeFile(fileUrl, html.replace(EN_LANG_ATTR, ZH_LANG_ATTR), "utf8");
        }
      },
    },
  };
}
