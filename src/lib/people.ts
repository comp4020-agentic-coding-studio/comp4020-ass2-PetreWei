export const roleOrder: Record<string, number> = {
  convenor: 0,
  tutor: 1,
  guest: 2,
  other: 3,
};

// Map the role enum (convenor|tutor|guest|other) to display labels rather than
// rendering the raw lowercase value.
export const roleLabels: Record<string, string> = {
  convenor: "Convenor",
  tutor: "Tutor",
  guest: "Guest lecturer",
  other: "",
};
