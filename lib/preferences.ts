export type Theme = "light" | "dark" | "system";
export type FontSize = "sm" | "md" | "lg" | "xl";

export interface Preferences {
  theme: Theme;
  focus: boolean;
  calm: boolean;
  vision: boolean;
  dyslexic: boolean;
  fontSize: FontSize;
}

export const DEFAULT_PREFERENCES: Preferences = {
  theme: "system",
  focus: false,
  calm: false,
  vision: false,
  dyslexic: false,
  fontSize: "md",
};

export const PREFERENCES_COOKIE = "hf_prefs";

export function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
}

export function applyPreferences(prefs: Preferences) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const resolved = resolveTheme(prefs.theme);

  root.setAttribute("data-theme", resolved);
  root.setAttribute("data-focus", String(prefs.focus));
  root.setAttribute("data-calm", String(prefs.calm));
  root.setAttribute("data-vision", String(prefs.vision));
  root.setAttribute("data-dyslexic", String(prefs.dyslexic));
  root.setAttribute("data-fontsize", prefs.fontSize);
  root.style.colorScheme = resolved;
}