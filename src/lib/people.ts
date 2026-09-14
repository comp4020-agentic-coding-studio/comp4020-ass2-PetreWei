export const roleOrder: Record<string, number> = {
  convenor: 0,
  tutor: 1,
  guest: 2,
  other: 3,
};

// Map the role enum (convenor|tutor|guest|other) to display labels rather than
// rendering the raw lowercase value. "other" has no entry, so it renders no label.
const roleLabels: Partial<Record<string, string>> = {
  convenor: "Convenor",
  tutor: "Tutor",
  guest: "Guest lecturer",
};

export function roleLabelFor(role: string | undefined): string | undefined {
  return role ? roleLabels[role] : undefined;
}
