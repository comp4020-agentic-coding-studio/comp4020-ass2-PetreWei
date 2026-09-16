import type { AstroIntegration } from "astro";

// The theme's skip link (`<a href="#main">`, in BaseLayout.astro) jumps the
// scroll position to `#main` but leaves keyboard focus on `<body>`, because
// `<main id="main">` carries no `tabindex` --- an unfocusable fragment target
// doesn't receive focus on activation, per the HTML spec.
//
// This can't be fixed by listening for `hashchange`: the site runs Astro's
// `<ClientRouter>` for view transitions, which intercepts the anchor click
// and updates the URL through the History API rather than a native fragment
// navigation, so `hashchange` never fires (confirmed in a real browser). A
// `click` listener on the link itself is unaffected: `ClientRouter` calling
// `preventDefault()` on the click stops the browser's own navigation, not
// other listeners, so this still runs. The target is re-queried on every
// click, not cached, because `ClientRouter` swaps in a fresh `#main` on each
// navigation.
const SKIP_LINK_FOCUS_SCRIPT = `
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href="#main"]');
    if (!link) return;
    const target = document.getElementById("main");
    if (!target) return;
    target.setAttribute("tabindex", "-1");
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
