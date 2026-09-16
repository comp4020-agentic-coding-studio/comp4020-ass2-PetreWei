import type { AstroIntegration } from "astro";

// The theme's skip link (`<a href="#main">`, in BaseLayout.astro) jumps the
// scroll position to `#main` but leaves keyboard focus on `<body>`, because
// `<main id="main">` carries no `tabindex` --- an unfocusable fragment target
// doesn't receive focus on activation, per the HTML spec. A sighted keyboard
// user who activates the link lands back at the top of the tab order instead
// of just past the nav, which defeats the link's whole purpose.
//
// This can't be fixed by listening for `hashchange`: the site runs Astro's
// `<ClientRouter>` for view transitions, which intercepts the anchor click
// and updates the URL through the History API rather than a native fragment
// navigation, so `hashchange` never fires (confirmed in a real browser --- a
// listener attached before activating the link saw zero events even though
// the URL bar gained `#main`). A `click` listener on the link itself is
// unaffected: `ClientRouter` calling `preventDefault()` on the click stops
// the browser's own navigation, not other listeners, so this still runs.
//
// Not a platform bug to carry upstream: the fix is two DOM calls, made from
// this repo, that any site built on the theme would want regardless of
// brand. See README.md's "the platform is fixed" --- this changes nothing
// under `node_modules/`.
const SKIP_LINK_FOCUS_SCRIPT = `
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href="#main"]');
    if (!link) return;
    const target = document.getElementById("main");
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus();
  });
`;

/** Gives the skip link's `#main` target real keyboard focus on activation. */
export function skipLinkFocus(): AstroIntegration {
  return {
    name: "skip-link-focus",
    hooks: {
      "astro:config:setup": ({ injectScript }) => {
        injectScript("page", SKIP_LINK_FOCUS_SCRIPT);
      },
    },
  };
}
