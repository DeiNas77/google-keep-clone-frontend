export type noteColorsImportant = "normal" | "low" | "medium" | "hard";

export const colorNote: Record<noteColorsImportant, string> = {
  normal: "var(--importance-normal)",
  low: "var(--importance-low)",
  medium: "var(--importance-medium)",
  hard: "var(--importance-hard)",
};

export const importanceLabels: Record<noteColorsImportant, string> = {
  normal: "Neutra",
  low: "Baja",
  medium: "Media",
  hard: "Alta",
};

