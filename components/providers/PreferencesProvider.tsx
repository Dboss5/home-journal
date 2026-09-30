"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  Preferences,
  DEFAULT_PREFERENCES,
  PREFERENCES_COOKIE,
  applyPreferences,
} from "@/lib/preferences";

interface Ctx {
  prefs: Preferences;
  setPref: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
  reset: () => void;
}

const PreferencesContext = createContext<Ctx | null>(null);

export function PreferencesProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: Partial<Preferences>;
}) {
  const [prefs, setPrefs] = useState<Preferences>({
    ...DEFAULT_PREFERENCES,
    ...initial,
  });

  // Apply to <html> on every change
  useEffect(() => {
    applyPreferences(prefs);
    document.cookie = `${PREFERENCES_COOKIE}=${encodeURIComponent(
      JSON.stringify(prefs)
    )}; path=/; max-age=31536000; samesite=lax`;
  }, [prefs]);

  // React to system theme changes when theme === "system"
  useEffect(() => {
    if (prefs.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyPreferences(prefs);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [prefs]);

  const setPref = useCallback(
    <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
      setPrefs((p) => ({ ...p, [key]: value }));
    },
    []
  );

  const reset = useCallback(() => setPrefs(DEFAULT_PREFERENCES), []);

  return (
    <PreferencesContext.Provider value={{ prefs, setPref, reset }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be inside PreferencesProvider");
  return ctx;
}