import { describe, expect, it, vi } from "vitest";
import { skipLinkFocus } from "./skip-link-focus.ts";

// The behaviour itself only runs in a browser (it listens for clicks and
// moves DOM focus), so this checks the one thing a unit test can: the
// integration wires the hook astro actually calls, and the script it injects
// still contains the logic the fix depends on, not just that some script
// landed there.
describe("skipLinkFocus", () => {
  it("is a named astro integration", () => {
    expect(skipLinkFocus().name).toBe("skip-link-focus");
  });

  it("injects a page-stage script on astro:config:setup", () => {
    const injectScript = vi.fn();
    const setup = skipLinkFocus().hooks["astro:config:setup"];
    // @ts-expect-error -- only the one argument this hook reads is supplied
    setup?.({ injectScript });

    expect(injectScript).toHaveBeenCalledTimes(1);
    expect(injectScript).toHaveBeenCalledWith("page", expect.any(String));
  });

  it("keeps the skip link's target selector, the tabindex fix and the focus call in the injected script", () => {
    let script = "";
    const setup = skipLinkFocus().hooks["astro:config:setup"];
    // @ts-expect-error -- only the one argument this hook reads is supplied
    setup?.({ injectScript: (_stage: string, code: string) => (script = code) });

    expect(script).toContain('a[href="#main"]');
    expect(script).toContain('getElementById("main")');
    expect(script).toContain('setAttribute("tabindex", "-1")');
    expect(script).toContain(".focus()");
  });
});
