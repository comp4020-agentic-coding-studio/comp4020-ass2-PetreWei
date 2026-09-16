import { defineConfig } from "astro/config";
import courseGraph from "astro-course-university";
import universityTheme from "astro-theme-university";
import { astromotion, deckRemarkPlugins } from "astromotion";
import { courseMeta } from "./src/course-config.ts";
import { courseApiCollections } from "./src/site-config.ts";
import { gitOrigin, resolveDeployment } from "./scripts/pages-base.ts";
import { skipLinkFocus } from "./scripts/skip-link-focus.ts";
import { zhHtmlLang } from "./scripts/zh-html-lang.ts";

// Derived, never hardcoded --- see scripts/pages-base.ts for why.
const { site, base } = resolveDeployment(process.env, gitOrigin);

export default defineConfig({
  site,
  base,
  // Pages build as directories, so every route URL ends in a slash. Saying so
  // explicitly makes Astro emit matching links, which keeps the canonical URL
  // and what a visitor clicks in agreement --- otherwise each click costs a
  // 301 on GitHub Pages.
  trailingSlash: "always",
  // English is unprefixed at the root; only the Chinese pilot page lives
  // under a locale prefix (`/zh/`). Only the home page is translated so far
  // --- no `fallback` is set, so an untranslated `/zh/*` URL 404s rather than
  // silently serving English content under a URL that implies it's
  // translated.
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    universityTheme({
      defaultLayout: "src/layouts/PageLayout.astro",
      // The whole brand choice: three colour tokens and a set of lockups. Keep
      // institutional brand packages and assets out of this fictional site.
      // The entries after the first are ours, not the brand's: scoped fixes
      // for pre-existing theme bugs — a nav flex-wrap bug and an unguarded
      // footer separator (see each file for why) — loaded the same way so
      // they stay outside node_modules.
      brandCss: [
        "astro-theme-slop/slop.css",
        "/src/styles/nav-overrides.css",
        "/src/styles/footer-overrides.css",
      ],
      imageFormat: "avif",
      llmsTxt: true,
      // The theme owns the markdown plugin chain, so astromotion's slide
      // plugins (slide breaks, classes, backgrounds, notes, QR codes) are
      // handed to it rather than registered separately. Each one gates on
      // `.deck.mdx`, so ordinary pages are untouched.
      extraRemarkPlugins: deckRemarkPlugins,
    }),
    courseGraph({
      collections: courseApiCollections,
      timezone: "Australia/Canberra",
      course: courseMeta,
      canonicalUrl: `https://courses.slop.university/${courseMeta.code}/`,
    }),
    // Slide decks: every `.deck.mdx` under src/decks/ becomes a Reveal.js page
    // at /decks/<name>/. The theme's deck stylesheet reads the same brand
    // tokens the site does, so a deck arrives already wearing the Slop palette
    // --- see src/decks/theme.css. `fontVariables` makes the deck page emit the
    // @font-face for the theme's body font, which the deck styles ask for by
    // name.
    astromotion({
      theme: "./src/decks/theme.css",
      fontVariables: ["--font-public-sans"],
      // A deck's HTML is astromotion's, not the theme layout's, so it does not
      // inherit the site's icon and the browser falls back to a root
      // /favicon.ico that does not exist. This option takes a plain path
      // resolved against `base`, never an ImageMetadata, so the file has to
      // sit in `public/` rather than being imported from the theme:
      // `public/favicon.svg` is a byte copy of astro-theme-slop's
      // `assets/slop-crest.svg`. Re-copy it if the theme's crest ever changes.
      favicon: "/favicon.svg",
    }),
    skipLinkFocus(),
    // Runs after the theme's own a11y scan and both link checks --- none of
    // them care about `lang`, so patching it last doesn't affect what they
    // report.
    zhHtmlLang(),
  ],
});
