import type { Role } from "../content.config";

export const roleOrder: Record<Role, number> = {
  convenor: 0,
  tutor: 1,
  guest: 2,
  other: 3,
};

// Map the role enum to a display label rather than rendering the raw lowercase
// value. "other" has no entry, so it renders no label.
const roleLabels: Partial<Record<Role, string>> = {
  convenor: "Convenor",
  tutor: "Tutor",
  guest: "Guest lecturer",
};

export function roleLabelFor(role: Role): string | undefined {
  return roleLabels[role];
}
