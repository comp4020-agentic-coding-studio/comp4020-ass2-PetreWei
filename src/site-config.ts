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

// Nav for the Chinese pilot page (`/zh/`). Labels are translated; hrefs still
// point at the existing English pages, since only the home page is
// translated so far. The language switch itself is a separate icon button
// (LangSwitch.astro), not a list entry — see that file for why.
//
// These are the terms a Chinese course site would actually use, not the
// dictionary's first gloss: 讲座 is a one-off guest talk and 课堂 is the
// room rather than the teaching, 评估 reads as evaluating a system rather
// than assessing students, and 人员 reads like an org chart.
export const zhLinks: NavLink[] = [
  { text: "讲义", href: "/lectures/" },
  { text: "实验", href: "/sessions/" },
  { text: "考核", href: "/assessments/" },
  { text: "教学团队", href: "/people/" },
  { text: "课程规定", href: "/policies/" },
];
