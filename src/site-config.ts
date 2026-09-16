import type { NavLink } from "astro-theme-university/types";
import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";
import { courseMeta } from "./course-config";

// The underlying collection and URL remain `sessions`; these labels are the
// language students see.
export const sessionLabels = {
  singular: "Lab",
  plural: "Labs",
} as const;

export const graphCollections = ["sessions", "assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",

  links: [
    { text: "Lectures", href: "/lectures/" },
    { text: sessionLabels.plural, href: "/sessions/" },
    { text: "Assessments", href: "/assessments/" },
    { text: "People", href: "/people/" },
    { text: "Policies", href: "/policies/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
  socialImage: "/src/assets/images/card.jpg",
  socialImageAlt: `A preview card for ${courseMeta.code}: ${courseMeta.title}`,
});

// Nav for the English home page: the site's usual links plus a trailing
// switcher into the Chinese pilot page.
export const homeLinks: NavLink[] = [...(siteConfig.links ?? []), { text: "中文", href: "/zh/" }];

// Nav for the Chinese pilot page (`/zh/`). Labels are translated; hrefs still
// point at the existing English pages, since only the home page is
// translated so far. Trailing entry switches back to the English home page.
export const zhLinks: NavLink[] = [
  { text: "讲座", href: "/lectures/" },
  { text: "实验", href: "/sessions/" },
  { text: "评估", href: "/assessments/" },
  { text: "人员", href: "/people/" },
  { text: "政策", href: "/policies/" },
  { text: "EN", href: "/" },
];
